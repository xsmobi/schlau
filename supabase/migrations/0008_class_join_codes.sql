-- Phase 5 leaderboard prep: student join-code flow.
-- Kahoot-PIN style: teacher shares a 6-digit numeric code, student redeems
-- it to set their own class_id. Same self-assignment risk as profiles.role
-- in 0004 - verified directly before writing this migration that the only
-- thing currently stopping a client from writing profiles.class_id
-- directly is the prevent_class_id_self_assignment trigger from 0005 (the
-- "update own profile" policy has no column restriction). join_class()
-- below is security definer, so it runs as the function owner - not
-- anon/authenticated - and is unaffected by that trigger, same pattern as
-- increment_daily_progress.
create or replace function public.generate_unique_join_code()
returns text
language plpgsql
as $$
declare
  candidate text;
begin
  loop
    candidate := lpad((floor(random() * 1000000))::int::text, 6, '0');
    exit when not exists (select 1 from public.classes where join_code = candidate);
  end loop;
  return candidate;
end;
$$;

-- Added nullable first, then backfilled row-by-row below, then locked
-- down with NOT NULL/UNIQUE/CHECK. A DEFAULT that queries public.classes
-- for uniqueness cannot go directly on this ADD COLUMN: Postgres rewrites
-- the table as part of the ALTER, and evaluating a query against the
-- table mid-rewrite fails (confirmed: "could not read blocks... " /
-- XX001 on the first attempt at this migration).
alter table public.classes add column join_code text;

-- Row-by-row (not a single bulk UPDATE) so each call to
-- generate_unique_join_code() sees the codes assigned to earlier rows in
-- this same backfill - a bulk UPDATE's per-row function calls would all
-- share one snapshot and could collide.
do $$
declare
  r record;
begin
  for r in select id from public.classes where join_code is null loop
    update public.classes set join_code = public.generate_unique_join_code() where id = r.id;
  end loop;
end $$;

alter table public.classes
  alter column join_code set default public.generate_unique_join_code(),
  alter column join_code set not null,
  add constraint classes_join_code_unique unique (join_code),
  add constraint classes_join_code_format check (join_code ~ '^[0-9]{6}$');

-- Regenerating only updates classes.join_code going forward - it has no
-- effect on students whose profiles.class_id already points at this
-- class's id (the code is only consulted at join time, not stored on the
-- student's side).
create or replace function public.regenerate_join_code(p_class_id uuid)
returns text
language plpgsql
security definer set search_path = public
as $$
declare
  new_code text;
begin
  if not exists (
    select 1 from public.classes where id = p_class_id and teacher_id = auth.uid()
  ) then
    raise exception 'not authorized to regenerate this class''s join code';
  end if;

  new_code := public.generate_unique_join_code();
  update public.classes set join_code = new_code where id = p_class_id;
  return new_code;
end;
$$;

grant execute on function public.regenerate_join_code(uuid) to authenticated;

-- Single-step redeem: validates the code, immediately sets the caller's
-- own profiles.class_id (overwriting any previous class - one class per
-- student), and returns the class id/name so the UI can show a
-- post-join confirmation. Unknown code raises 'code not found' - a
-- future client wrapper maps this to the user-facing German copy.
create or replace function public.join_class(p_code text)
returns table (class_id uuid, class_name text)
language plpgsql
security definer set search_path = public
as $$
declare
  v_class_id uuid;
  v_class_name text;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  select id, name into v_class_id, v_class_name
  from public.classes
  where join_code = p_code;

  if v_class_id is null then
    raise exception 'code not found';
  end if;

  update public.profiles set class_id = v_class_id where id = auth.uid();

  return query select v_class_id, v_class_name;
end;
$$;

grant execute on function public.join_class(text) to authenticated;
