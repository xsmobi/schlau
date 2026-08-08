-- Phase 5: extend teacher invite codes with labels and a redemption log.
--
-- label: free-text note for tracking which code/cohort a teacher came in
-- through (e.g. 'esn2609', 'wbs', 'singapore') - never shown to whoever
-- is redeeming a code, purely for admin bookkeeping. Multiple distinct
-- reusable codes were already possible before this migration (code is
-- UNIQUE, nothing restricted the table to one row) - label just makes
-- them identifiable. Create additional codes and deactivate old ones
-- directly via SQL, same as the original seed:
--   insert into public.teacher_invite_codes (code, label, active)
--   values ('some-code', 'some-label', true);
--   update public.teacher_invite_codes set active = false where code = 'some-code';
alter table public.teacher_invite_codes add column label text;

-- code_redemptions: one row per successful redeem_teacher_code() call, so
-- "which teachers came in via code X / label Y" is answerable later.
-- Didn't exist before this migration - redemptions weren't tracked at
-- all. Same deny-by-default RLS as teacher_invite_codes (0004): only
-- redeem_teacher_code() (security definer, so it runs as an owner that
-- bypasses RLS) writes here, and only admins can read it directly.
create table public.code_redemptions (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users (id) on delete cascade,
  code_id uuid not null references public.teacher_invite_codes (id) on delete cascade,
  redeemed_at timestamptz not null default now()
);

alter table public.code_redemptions enable row level security;

create policy "Admins can view redemption history"
  on public.code_redemptions for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Redefines redeem_teacher_code (0013) to log a code_redemptions row on
-- every successful redemption - "successful" meaning the code validated,
-- regardless of whether the admin guard below actually changed the
-- caller's role. Deactivated codes still fail the same "code not found"
-- check they always did (active = true is still part of the lookup), so
-- deactivating a code - rather than deleting it - continues to fail
-- cleanly for redemption attempts while preserving the code's row, and
-- now its redemption history, for later querying. Return type is
-- unchanged from 0013, so create-or-replace is enough.
create or replace function public.redeem_teacher_code(p_code text)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_id uuid;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  select id into v_id
  from public.teacher_invite_codes
  where code = p_code and active = true;

  if v_id is null then
    raise exception 'code not found';
  end if;

  update public.profiles
  set role = 'teacher'
  where id = auth.uid() and role <> 'admin';

  insert into public.code_redemptions (teacher_id, code_id)
  values (auth.uid(), v_id);
end;
$$;

grant execute on function public.redeem_teacher_code(text) to authenticated;
