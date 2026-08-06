-- Fixes 0011: get_class_leaderboard declares `engagement double
-- precision`, but sqrt() on a numeric argument (bigint * numeric from the
-- "/ 2.0" division) returns numeric, not double precision. CREATE
-- FUNCTION doesn't type-check a plpgsql body's RETURN QUERY against the
-- declared OUT types, so 0011 applied without error but every call to
-- get_class_leaderboard fails at runtime with:
--   42804 structure of query does not match function result type
--   Returned type numeric does not match expected type double precision
-- Fix: cast the computed engagement expression to double precision
-- explicitly, matching the declared return column (kept as double
-- precision rather than switching the column to numeric, since numeric
-- can round-trip through PostgREST as a JSON string instead of a native
-- number, which would break the frontend's row.engagement.toFixed(1)).
-- Return type is unchanged from 0011, so create-or-replace is enough -
-- no drop needed this time.
create or replace function public.get_class_leaderboard(p_class_id uuid, p_period text)
returns table (pseudonym text, activity_count bigint, engagement double precision)
language plpgsql
security definer set search_path = public
as $$
declare
  v_start date;
  v_end date;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  if not exists (
    select 1 from public.classes c
    where c.id = p_class_id
      and (
        c.teacher_id = auth.uid()
        or exists (select 1 from public.profiles p where p.id = auth.uid() and p.class_id = c.id)
      )
  ) then
    raise exception 'not authorized for this class';
  end if;

  if p_period = 'day' then
    v_start := current_date;
    v_end := current_date;
  elsif p_period = 'week' then
    v_start := date_trunc('week', current_date)::date;
    v_end := v_start + 6;
  else
    raise exception 'invalid period';
  end if;

  return query
    with scored as (
      select
        latest.pseudonym,
        coalesce(agg.activity_count, 0)::bigint as activity_count,
        sqrt(
          coalesce(agg.result_count, 0)
          * ((coalesce(agg.help_count, 0) + coalesce(agg.explainer_count, 0)) / 2.0)
        )::double precision as engagement
      from public.profiles mem
      join lateral (
        select dpn.pseudonym
        from public.daily_pseudonyms dpn
        where dpn.user_id = mem.id and dpn.date <= current_date
        order by dpn.date desc
        limit 1
      ) latest on true
      left join lateral (
        select
          sum(dp.count) filter (
            where dp.category not in ('a1','a2','a3','a4','a5','a6','a7','a8','a9','b1','b2','b3','b4','b5','b6')
          ) as activity_count,
          sum(dp.count) filter (where dp.category in ('b1', 'b2')) as help_count,
          sum(dp.count) filter (where dp.category = 'b3') as explainer_count,
          sum(dp.count) filter (where dp.category in ('b4', 'b5', 'b6')) as result_count
        from public.daily_progress dp
        where dp.user_id = mem.id and dp.date between v_start and v_end
      ) agg on true
      where mem.class_id = p_class_id
    )
    select scored.pseudonym, scored.activity_count, scored.engagement
    from scored
    where scored.activity_count > 0 or scored.engagement > 0
    order by scored.activity_count desc, scored.engagement desc;
end;
$$;

grant execute on function public.get_class_leaderboard(uuid, text) to authenticated;
