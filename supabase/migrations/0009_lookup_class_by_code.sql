-- Phase 5 leaderboard prep: read-only preview for the join-code flow.
-- join_class() (0008) commits immediately on call, so the UI needs a
-- separate lookup step to show "Join [class name]?" before the student
-- commits - otherwise a typo that happens to match a different real
-- class's code would silently enroll them in the wrong class.
-- Security definer for the same reason as join_class(): the "Students can
-- view their enrolled class" RLS policy on classes only covers classes
-- the caller is already a member of, so an unenrolled student has no
-- direct select access to the class row they're about to preview.
create or replace function public.lookup_class_by_code(p_code text)
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

  return query select v_class_id, v_class_name;
end;
$$;

grant execute on function public.lookup_class_by_code(text) to authenticated;
