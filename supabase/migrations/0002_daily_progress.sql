-- daily_progress: per-user, per-day, per-category unit counts.
-- category holds any icon code (activity tiers a1-a9, per-subtype topic
-- codes like "times5", or bonus codes b1-b6) - an open set, not enumerated
-- here since topic codes are generated per task subtype.
-- Writes are upsert-based:
--   insert into public.daily_progress (user_id, date, category, count)
--   values ($1, $2, $3, 1)
--   on conflict (user_id, date, category)
--   do update set count = daily_progress.count + 1;
-- date is supplied by the app, not defaulted here, so it reflects the
-- user's local day rather than the server's.
create table if not exists public.daily_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  category text not null,
  count integer not null default 0,
  primary key (user_id, date, category)
);

alter table public.daily_progress enable row level security;

create policy "Users can view their own progress"
  on public.daily_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.daily_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.daily_progress for update
  using (auth.uid() = user_id);
