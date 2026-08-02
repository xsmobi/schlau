-- Phase 5: rotating-pseudonym classroom leaderboard.
--
-- daily_pseudonyms: one PascalCase adjective+noun pseudonym per user per
-- day (2500 possible combinations - 50 adjectives x 50 nouns). Deny-by-
-- default RLS: no client-facing select/insert policies at all, same as
-- teacher_invite_codes in 0004. The whole point is anonymity on the
-- leaderboard, so the user_id <-> pseudonym mapping must never be
-- directly queryable by a client - all access goes through the security
-- definer functions below.
create table public.daily_pseudonyms (
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  pseudonym text not null,
  primary key (user_id, date)
);

alter table public.daily_pseudonyms enable row level security;

-- Assigns today's (or p_date's) pseudonym for the caller if they don't
-- already have one, avoiding a same-day collision with any classmate's
-- pseudonym (so two students in the same class never look identical on
-- the leaderboard that day). Users not in a class skip collision-checking
-- entirely - they won't appear on any leaderboard anyway.
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

-- Redefines increment_daily_progress (0003) to also ensure the caller has
-- a pseudonym for p_date - "first activity of the day" is exactly when
-- this already fires, so no separate call site is needed anywhere else.
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

-- Activity volume = sum of bare topic-code rows (every '+' click,
-- unconditionally bumped) - NOT a1-a9, which only fire on the day a
-- lifetime tier threshold is newly crossed and would make for a sparse,
-- misleading leaderboard. Explainer usage = b3, bumped on every explainer
-- open. Window is either today ('day') or the current ISO week, Monday-
-- start ('week'). Each row's displayed pseudonym is the caller's most
-- recent one as of today, independent of which day in the window their
-- activity happened, so a student active earlier in the week but not
-- today still appears under a name they'd recognize as theirs.
create or replace function public.get_class_leaderboard(p_class_id uuid, p_period text)
returns table (pseudonym text, activity_count bigint, explainer_count bigint)
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
        coalesce(agg.explainer_count, 0)::bigint as explainer_count
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
          sum(dp.count) filter (where dp.category = 'b3') as explainer_count
        from public.daily_progress dp
        where dp.user_id = mem.id and dp.date between v_start and v_end
      ) agg on true
      where mem.class_id = p_class_id
    )
    select scored.pseudonym, scored.activity_count, scored.explainer_count
    from scored
    where scored.activity_count > 0 or scored.explainer_count > 0
    order by scored.activity_count desc, scored.explainer_count desc;
end;
$$;

grant execute on function public.get_class_leaderboard(uuid, text) to authenticated;
