-- Phase 5 leaderboard prep: role-based accounts and teacher invite codes.
-- school_id is a nullable anchor for future licensing/classroom grouping
-- (see classes.school_id, not yet created).
alter table profiles add column role text not null default 'student'
  check (role in ('student', 'teacher', 'admin'));

-- profiles' existing "update own profile" policy (0001) has no column
-- restriction, so without this a signed-in user could self-promote via a
-- plain client update (UPDATE profiles SET role = 'admin' WHERE id =
-- auth.uid()). This trigger silently reverts any change to `role` made
-- directly by a client request (running as the anon/authenticated
-- Postgres role under PostgREST). A future invite-redemption RPC should
-- be security definer - same pattern as increment_daily_progress - which
-- runs as the function owner, not anon/authenticated, so it's unaffected
-- by this guard and can set role normally after validating a code.
create or replace function public.prevent_role_self_escalation()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role and current_user in ('anon', 'authenticated') then
    new.role := old.role;
  end if;
  return new;
end;
$$;

create trigger prevent_profiles_role_self_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_self_escalation();

create table teacher_invite_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  school_id uuid,              -- nullable, same future-licensing anchor as classes.school_id
  active boolean default true,
  created_at timestamptz default now()
);

-- No policies beyond the admin one below: deny-by-default. A future
-- invite-redemption flow (teacher signs up with a code) should go through
-- a security definer RPC - same pattern as increment_daily_progress - that
-- validates/consumes a code without ever exposing this table's rows
-- directly to anon/authenticated clients.
alter table teacher_invite_codes enable row level security;

create policy "Admins can manage invite codes"
  on teacher_invite_codes for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
