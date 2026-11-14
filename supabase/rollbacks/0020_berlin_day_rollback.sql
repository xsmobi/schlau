-- Rollback for supabase/migrations/0020_berlin_day.sql.
--
-- Kept outside supabase/migrations/ on purpose: migrations are applied by
-- hand in numeric order, and this file must never run as part of that.
--
-- Restores the function definitions exactly as they were before 0020:
--   ensure_daily_pseudonym   -> 0010 (uses the client-supplied p_date)
--   increment_daily_progress -> 0010 (uses the client-supplied p_date)
--   get_class_leaderboard    -> 0012 (uses the database's current_date)
-- then drops berlin_today(). No data is changed: rows written while 0020
-- was active keep their Berlin dates.

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
  v_class_id uuid;
  v_candidate text;
  v_attempt int := 0;
begin
  if auth.uid() is null then
    return;
  end if;

  if exists (
    select 1 from public.daily_pseudonyms where user_id = auth.uid() and date = p_date
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
      where dpn.date = p_date
        and dpn.pseudonym = v_candidate
        and v_class_id is not null
        and pm.class_id = v_class_id
    );
  end loop;

  insert into public.daily_pseudonyms (user_id, date, pseudonym)
  values (auth.uid(), p_date, v_candidate)
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
  v_category text;
  v_amount int;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  perform public.ensure_daily_pseudonym(p_date);

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

drop function if exists public.berlin_today();
