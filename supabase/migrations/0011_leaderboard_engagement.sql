-- Phase 5 leaderboard: replace the raw explainer_count column with a
-- computed "engagement" score.
--
-- explainer_count was a bare count of category='b3' rows, gameable by
-- spamming the explainer button for free - it wasn't weighted against
-- any other signal. Engagement instead combines help usage, explainer
-- usage, and solution ("=") usage, all read from the same period-scoped
-- daily_progress rows activity_count already draws from:
--   HE = (Help_count + Explainer_count) / 2
--   Engagement = sqrt(Result_count * HE)
-- Help_count and Result_count are recovered the same way activity_count
-- reads a1-a9 tier codes below: accumulator.js's bump() only ever
-- increments the CURRENT tier per click (b1/b2 for help, b4/b5/b6 for
-- solutions), so no single tier code holds the true period count, but the
-- sum across a group does.
--
-- Return type is changing (explainer_count bigint -> engagement double
-- precision), which create-or-replace can't do in place - drop first.
drop function if exists public.get_class_leaderboard(uuid, text);

create function public.get_class_leaderboard(p_class_id uuid, p_period text)
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
        ) as engagement
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
