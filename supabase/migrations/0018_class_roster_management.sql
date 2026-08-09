-- Phase 5: roster management - student self-leave, teacher removes a
-- member, teacher lists a class's roster.
--
-- prevent_class_id_self_assignment (0005) blocks ANY direct client write
-- to profiles.class_id, not just self-assignment to a guessed class - so
-- both leaving and removing a member need security definer RPCs, same
-- pattern as join_class(). Neither wipes any other data: this only
-- unlinks class_id, leaving daily_progress/daily_pseudonyms/badges
-- untouched so a student can rejoin later without losing progress.
--
-- profiles' RLS only permits selecting your own row ("Users can view
-- their own profile", 0001), so a teacher can't list their students'
-- profiles directly from the client either - get_class_members() is
-- security definer for the same reason get_class_leaderboard() is.

-- Student leaves their own current class. No-op (not an error) if they
-- weren't in a class - same "idempotent unlink" shape as there being
-- nothing to regenerate if you're not a teacher of any class yet.
create or replace function public.leave_class()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  update public.profiles set class_id = null where id = auth.uid();
end;
$$;

grant execute on function public.leave_class() to authenticated;

-- Teacher removes a specific student from their own class. Checks the
-- student's CURRENT class_id belongs to the calling teacher before
-- unlinking - this also naturally rejects removing a student who isn't
-- in any of the caller's classes (or isn't in a class at all).
create or replace function public.remove_class_member(p_student_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_class_id uuid;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  select class_id into v_class_id from public.profiles where id = p_student_id;

  if v_class_id is null or not exists (
    select 1 from public.classes where id = v_class_id and teacher_id = auth.uid()
  ) then
    raise exception 'not authorized to remove this member';
  end if;

  update public.profiles set class_id = null where id = p_student_id;
end;
$$;

grant execute on function public.remove_class_member(uuid) to authenticated;

-- Roster listing for the "Members" view - real identities (email), not
-- the leaderboard's anonymous rotating pseudonyms, since a teacher
-- managing their own roster is expected to know who's who and needs a
-- stable identifier to act on (unlike the leaderboard, which is
-- deliberately anonymous even to the teacher).
create or replace function public.get_class_members(p_class_id uuid)
returns table (id uuid, email text)
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  if not exists (
    select 1 from public.classes where id = p_class_id and teacher_id = auth.uid()
  ) then
    raise exception 'not authorized for this class';
  end if;

  return query
    select p.id, p.email
    from public.profiles p
    where p.class_id = p_class_id
    order by p.email;
end;
$$;

grant execute on function public.get_class_members(uuid) to authenticated;
