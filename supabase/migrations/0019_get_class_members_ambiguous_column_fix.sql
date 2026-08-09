-- Fixes 0018: get_class_members's RETURNS TABLE column `id` collides with
-- classes.id. Same bug class as create_class (0015/0016): plpgsql treats
-- RETURNS TABLE columns as implicitly-declared OUT variables visible
-- throughout the function body, so the authorization check's unqualified
-- `where id = p_class_id` was ambiguous between the OUT parameter and
-- classes.id - failing every call from a real authenticated teacher with
--   42702 column reference "id" is ambiguous
-- This went unnoticed longer than create_class's version of the same bug
-- because an unauthenticated probe call returns early at the
-- `auth.uid() is null` check, before ever reaching the ambiguous line -
-- "the function exists and responds" isn't proof the rest of it runs.
--
-- get_class_leaderboard never had this problem: its own authorization
-- check already fully qualifies every column via table aliases (c.id,
-- c.teacher_id, p.id, p.class_id), and its OUT columns (pseudonym/
-- activity_count/engagement) don't collide with anything regardless.
--
-- Renamed the OUT column id -> student_id (matching join_class/
-- create_class's class_id/class_name naming rather than bare column
-- names) instead of just qualifying the one reference, so no future edit
-- to this function can silently reintroduce the same bug. Also qualified
-- the classes table via alias for defense in depth, matching
-- get_class_leaderboard's style. Return type is changing, so drop first -
-- create-or-replace can't do that.
--
-- The frontend (app/class/members/page.js) also silently discarded any
-- error from this RPC call, showing "no members" instead of surfacing
-- the failure - fixed separately in that file, not in this migration.
drop function if exists public.get_class_members(uuid);

create function public.get_class_members(p_class_id uuid)
returns table (student_id uuid, email text)
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  if not exists (
    select 1 from public.classes c where c.id = p_class_id and c.teacher_id = auth.uid()
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
