-- One definition of "day" for everyone: the Europe/Berlin calendar date,
-- computed on the server.
--
-- Before this migration, daily_progress.date and daily_pseudonyms.date came
-- from the client (p_date, the device's local date via
-- accumulator.js todayLocalDate()), while get_class_leaderboard filtered by
-- the database's current_date (session time zone, UTC on Supabase). Between
-- 00:00 and 01:00 Berlin time (02:00 in summer), new activity carried the
-- new Berlin date while the leaderboard still showed the previous UTC day,
-- so it was missing from "day"/"week" and the new pseudonym was skipped.
-- p_date was also unvalidated, so a modified client could write to any date.
--
-- berlin_today() is now the only source of "today":
--   - increment_daily_progress keeps its (p_date, p_deltas) signature so the
--     current client keeps working unchanged, but p_date is IGNORED.
--   - ensure_daily_pseudonym keeps its (p_date) signature for the same
--     reason, but also ignores p_date, so pseudonym rotation uses the same
--     day no matter who calls it.
--   - get_class_leaderboard uses berlin_today() for the day window, the
--     Monday-start week window and the "latest pseudonym" lookup.
--
-- Existing rows are not touched (no UPDATE/DELETE). Rollback:
-- supabase/rollbacks/0020_berlin_day_rollback.sql.

create or replace function public.berlin_today()
returns date
language sql
stable
set search_path = public
as $$
  select (now() at time zone 'Europe/Berlin')::date;
$$;

grant execute on function public.berlin_today() to authenticated;

create or replace function public.ensure_daily_pseudonym(p_date date)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  adjectives text[] := array[
    'Atomic','Astro','Binary','Chill','Cobalt','Cosmic','Crimson','Cyber',
    'Electric','Emerald','Epic','Frozen','Giga','Glitch','Golden','Hyper',
    'Infinite','Iron','Lunar','Matrix','Mega','Mystic','Nano','Neon',
    'Omega','Phantom','Prime','Quantum','Radio','Retro','Rogue','Salty',
    'Secret','Shadow','Silent','Silver','Solar','Sonic','Starlight','Static',
    'Steel','Turbo','Ultra','Vector','Velvet','Zero','Alpha','Drift',
    'Vivid','Zen'
  ];
  nouns text[] := array[
    'Agent','Architect','Beacon','Bit','Bot','Byte','Captain','Chaser',
    'Cipher','Circuit','Coder','Comet','Core','Drifter','Engine','Expert',
    'Explorer','Gamer','Ghost','Guardian','Hacker','Hero','Knight','Master',
    'Nexus','Ninja','Node','Nova','Orbit','Pilot','Pioneer','Pixel',
    'Pulse','Radar','Ranger','Rider','Runner','Scout','Seeker','Signal',
    'Spark','Spectre','Strategist','Titan','Viper','Vortex','Voyager',
    'Wizard','Pro','Legend'
  ];
  v_date date := public.berlin_today(); -- p_date is ignored, see header
  v_class_id uuid;
  v_candidate text;
  v_attempt int := 0;
begin
  if auth.uid() is null then
    return;
  end if;

  if exists (
    select 1 from public.daily_pseudonyms where user_id = auth.uid() and date = v_date
  ) then
    return;
  end if;

  select class_id into v_class_id from public.profiles where id = auth.uid();

  loop
    v_candidate := adjectives[1 + floor(random() * array_length(adjectives, 1))::int]
                || nouns[1 + floor(random() * array_length(nouns, 1))::int];
    v_attempt := v_attempt + 1;

    exit when v_attempt >= 20 or not exists (
      select 1
      from public.daily_pseudonyms dpn
      join public.profiles pm on pm.id = dpn.user_id
      where dpn.date = v_date
        and dpn.pseudonym = v_candidate
        and v_class_id is not null
        and pm.class_id = v_class_id
    );
  end loop;

  insert into public.daily_pseudonyms (user_id, date, pseudonym)
  values (auth.uid(), v_date, v_candidate)
  on conflict (user_id, date) do nothing;
end;
$$;

create or replace function public.increment_daily_progress(
  p_date date,
  p_deltas jsonb
)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_date date := public.berlin_today(); -- p_date is ignored, see header
  v_category text;
  v_amount int;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  perform public.ensure_daily_pseudonym(v_date);

  for v_category, v_amount in select key, value::int from jsonb_each_text(p_deltas)
  loop
    insert into public.daily_progress (user_id, date, category, count)
    values (auth.uid(), v_date, v_category, v_amount)
    on conflict (user_id, date, category)
    do update set count = daily_progress.count + excluded.count;
  end loop;
end;
$$;

grant execute on function public.increment_daily_progress(date, jsonb) to authenticated;

create or replace function public.get_class_leaderboard(p_class_id uuid, p_period text)
returns table (pseudonym text, activity_count bigint, engagement double precision)
language plpgsql
security definer set search_path = public
as $$
declare
  v_today date := public.berlin_today();
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
    v_start := v_today;
    v_end := v_today;
  elsif p_period = 'week' then
    v_start := date_trunc('week', v_today)::date;
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
        where dpn.user_id = mem.id and dpn.date <= v_today
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
