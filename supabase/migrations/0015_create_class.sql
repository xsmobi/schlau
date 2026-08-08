-- Phase 5: self-serve class creation.
--
-- classes already has an INSERT policy permitting a teacher to create
-- their own class row directly ("Teachers can create their own classes",
-- 0005) - verified directly that this path was never actually exercised
-- (every class so far came from elevated SQL access) before writing this
-- migration. It turns out a raw client insert would be subtly broken:
-- classes.join_code has `default public.generate_unique_join_code()`
-- (0008), and that helper is a plain (not security definer) function -
-- its own uniqueness check runs under RLS as the calling teacher, who can
-- only see their own classes per "Teachers can view their own classes",
-- not every other teacher's. A raw client insert's join_code default
-- would be checking uniqueness half-blind, surfacing as an occasional
-- confusing UNIQUE-constraint error instead of just working.
--
-- create_class() sidesteps this the same way join_class()/
-- regenerate_join_code() sidestep their own RLS-adjacent gotchas: security
-- definer runs as an owner that bypasses RLS entirely, and it explicitly
-- calls regenerate_join_code() (already proven, already security definer)
-- right after insert rather than trusting the column default - same
-- "insert then generate its code" two-step as the original manual SQL
-- flow.
create or replace function public.create_class(p_name text)
returns table (id uuid, name text, join_code text)
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
    select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin')
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
