-- increment_daily_progress: atomic upsert-and-add for one or more
-- categories on a given date, in a single round trip. Used by the
-- client-side write-batching accumulator (src/lib/rewards/accumulator.js)
-- once per flush, covering every category that changed since the last
-- flush (e.g. an activity tier plus a topic code from the same click).
--
-- Runs as security definer so it can bypass daily_progress's RLS write
-- policies, but manually scopes every write to auth.uid() - a caller can
-- only ever increment their own rows, never anyone else's.
create or replace function public.increment_daily_progress(
  p_date date,
  p_deltas jsonb
)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_category text;
  v_amount int;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  for v_category, v_amount in select key, value::int from jsonb_each_text(p_deltas)
  loop
    insert into public.daily_progress (user_id, date, category, count)
    values (auth.uid(), p_date, v_category, v_amount)
    on conflict (user_id, date, category)
    do update set count = daily_progress.count + excluded.count;
  end loop;
end;
$$;

grant execute on function public.increment_daily_progress(date, jsonb) to authenticated;
