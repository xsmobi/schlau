-- Phase 5 leaderboard: Realtime Broadcast authorization.
-- Channel/topic convention: 'leaderboard:{class_id}'. Payloads are
-- content-free (no student data) - broadcast is only a "something
-- changed, refetch the leaderboard" signal. These policies control who
-- may subscribe to (select) or send (insert) on a given class's channel:
-- the class's teacher, or a student currently enrolled in that class
-- (public.profiles.class_id = classes.id).
--
-- realtime.topic() returns the topic of the current realtime request and
-- is how Supabase's private-channel authorization check works - it is not
-- reading a column off a real row, so it applies the same way to both the
-- select (subscribe) and insert (send) checks below.
create policy "Class members can receive leaderboard broadcasts"
on realtime.messages
for select
to authenticated
using (
  extension = 'broadcast'
  and realtime.topic() like 'leaderboard:%'
  and exists (
    select 1 from public.classes c
    where c.id::text = split_part(realtime.topic(), ':', 2)
      and (
        c.teacher_id = auth.uid()
        or exists (
          select 1 from public.profiles p
          where p.id = auth.uid() and p.class_id = c.id
        )
      )
  )
);

create policy "Class members can send leaderboard broadcasts"
on realtime.messages
for insert
to authenticated
with check (
  extension = 'broadcast'
  and realtime.topic() like 'leaderboard:%'
  and exists (
    select 1 from public.classes c
    where c.id::text = split_part(realtime.topic(), ':', 2)
      and (
        c.teacher_id = auth.uid()
        or exists (
          select 1 from public.profiles p
          where p.id = auth.uid() and p.class_id = c.id
        )
      )
  )
);
