-- Phase 5 leaderboard: class membership model.
-- One class per student (profiles.class_id), one teacher owns a class.
-- Enrollment flow (student joins via a class code) is not yet built -
-- class_id is set by direct admin/SQL action for now, same as
-- teacher_invite_codes in 0004.
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users (id) on delete cascade,
  school_id uuid,              -- nullable, same future-licensing anchor as teacher_invite_codes.school_id
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.classes enable row level security;

alter table public.profiles add column class_id uuid references public.classes (id) on delete set null;

-- A class is visible to the teacher who owns it and to students enrolled in it.
-- (Must come after the profiles.class_id column above - this policy's USING
-- clause references it.)
create policy "Teachers can view their own classes"
  on public.classes for select
  using (auth.uid() = teacher_id);

create policy "Students can view their enrolled class"
  on public.classes for select
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and class_id = classes.id
  ));

create policy "Teachers can create their own classes"
  on public.classes for insert
  with check (
    auth.uid() = teacher_id
    and exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
  );

create policy "Teachers can update their own classes"
  on public.classes for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

create policy "Teachers can delete their own classes"
  on public.classes for delete
  using (auth.uid() = teacher_id);

-- profiles' existing "update own profile" policy (0001) has no column
-- restriction, so without this a student could self-enroll into any class
-- via a plain client update (UPDATE profiles SET class_id = '<guessed-uuid>'
-- WHERE id = auth.uid()), exposing themselves to that class's leaderboard
-- broadcasts. Same guard pattern as prevent_role_self_escalation in 0004:
-- silently revert direct client changes; a future join-code redemption RPC
-- should be security definer and is unaffected by this trigger.
create or replace function public.prevent_class_id_self_assignment()
returns trigger
language plpgsql
as $$
begin
  if new.class_id is distinct from old.class_id and current_user in ('anon', 'authenticated') then
    new.class_id := old.class_id;
  end if;
  return new;
end;
$$;

create trigger prevent_profiles_class_id_self_assignment
  before update on public.profiles
  for each row execute function public.prevent_class_id_self_assignment();
