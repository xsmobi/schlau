-- Phase 5: teacher invite-code redemption.
--
-- Same pattern as join_class() (0008): security definer means this runs
-- as the function owner, not anon/authenticated, so it's unaffected by
-- prevent_role_self_escalation (0004) and can set profiles.role after
-- validating a code - the only path allowed to write that column besides
-- direct admin/SQL action. It also runs as an owner that bypasses RLS,
-- which is what lets it read teacher_invite_codes at all despite that
-- table's deny-by-default "admins only" policy (0004) - exactly the
-- redemption flow that policy's comment already called out.
--
-- One reusable code is fine for now (not per-teacher, not single-use):
-- just match on code + active, no consumption/expiry bookkeeping.
--
-- Invalid and inactive codes return the same "code not found" error
-- (rather than distinguishing them) so a client can't use the error to
-- probe whether a deactivated code used to be valid.
--
-- Guards against downgrading an existing admin to teacher if they happen
-- to redeem this - role only moves to 'teacher' from something lower.
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
end;
$$;

grant execute on function public.redeem_teacher_code(text) to authenticated;
