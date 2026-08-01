-- One-off backfill: accounts that signed up before the handle_new_user
-- trigger (0001) existed have no matching profiles row. Found while
-- testing Phase 5's leaderboard broadcast - accumulator.fetchClassId()
-- failed with PGRST116 ("0 rows") against profiles for a pre-existing
-- test account that is present in auth.users. Likely affects other early
-- accounts too, not just the one that surfaced it.
insert into public.profiles (id, email)
select id, email from auth.users
where id not in (select id from public.profiles)
on conflict (id) do nothing;
