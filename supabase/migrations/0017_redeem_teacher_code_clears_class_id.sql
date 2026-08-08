-- redeem_teacher_code() promoted the caller to 'teacher' but left
-- profiles.class_id untouched, so a student who redeemed a code kept
-- whatever class they'd previously joined as a leftover. That's not just
-- stale data - buildNavItems() in AuthControls.js only branches on
-- hasClass for non-teachers, but a teacher whose client-side session is
-- still showing a stale (pre-promotion) role would fall into that branch
-- and see hasClass driving "Change Class" + a Leaderboard tab, since the
-- leftover class_id makes hasClass true. Clearing class_id on promotion
-- removes that leftover at the source, so this can't happen for any
-- future teacher regardless of what a stale client session does.
--
-- Return type is unchanged from 0014, so create-or-replace is enough.
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
  set role = 'teacher', class_id = null
  where id = auth.uid() and role <> 'admin';

  insert into public.code_redemptions (teacher_id, code_id)
  values (auth.uid(), v_id);
end;
$$;

grant execute on function public.redeem_teacher_code(text) to authenticated;
