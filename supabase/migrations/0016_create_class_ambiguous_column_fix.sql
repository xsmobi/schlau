-- Fixes 0015: create_class's RETURNS TABLE columns (id, name, join_code)
-- share names with classes' own columns. plpgsql treats RETURNS TABLE
-- columns as implicitly-declared OUT variables visible everywhere in the
-- function body, so `where id = auth.uid()` in the profiles authorization
-- check was ambiguous - it could mean the OUT parameter `id` or
-- profiles.id - and every call failed with:
--   42702 column reference "id" is ambiguous
-- join_class (0008) avoided this by naming its OUT columns class_id/
-- class_name rather than id/name. Matching that convention here instead
-- of just qualifying the one ambiguous reference, so no future edit to
-- this function can silently reintroduce the same bug.
--
-- Return type is changing, so create-or-replace can't be used - drop
-- first. The frontend (CreateClassForm.js) only checks for an error and
-- never reads the returned row, so this rename needs no client change.
drop function if exists public.create_class(text);

create function public.create_class(p_name text)
returns table (class_id uuid, class_name text, class_join_code text)
language plpgsql
security definer set search_path = public
as $$
declare
  v_id uuid;
  v_code text;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  if not exists (
    select 1 from public.profiles where profiles.id = auth.uid() and profiles.role in ('teacher', 'admin')
  ) then
    raise exception 'not authorized to create a class';
  end if;

  insert into public.classes (teacher_id, name)
  values (auth.uid(), p_name)
  returning classes.id into v_id;

  v_code := public.regenerate_join_code(v_id);

  return query select v_id, p_name, v_code;
end;
$$;

grant execute on function public.create_class(text) to authenticated;
