# schlau.app

German-language math practice web app ("Mathe by Doing") for grades 7–10.
Next.js (App Router) + Tailwind CSS, Supabase for auth and data. Task
generation is still entirely client-side. Full details: ARCHITECTURE.md (local file, not
committed to the public repo).

## Branching / deploy safety
- `main` is the only production branch (Vercel deploys from it; it is the
  GitHub default). NEVER commit directly to main.
- All work happens on feature branches. Each push gets a Vercel preview
  URL. Changes reach main only via a squash-merged PR.
- Before starting work in a new session, confirm current branch.

## Current architecture (short — see ARCHITECTURE.md (local file, not committed to the public repo) for details)
- Routes (app/): `/`, `/[type]`, `/[type]/[subtype]` render the practice
  app; `/badges`, `/join`, `/leaderboard`, `/class`, `/class/members`,
  `/redeem` are signed-in pages; `/auth/callback`, `/auth/confirm`,
  `/auth/auth-code-error` handle sign-in; `/impressum`, `/datenschutz`.
- src/App.js: practice UI, loaded client-only via app/AppClient.js.
  src/Task.js renders a task (MathJax via better-react-mathjax, sanitized
  HTML via dompurify, visual aids in help strings).
- src/taskTypes.js: task-type registry (single source of truth). Each entry
  has UI metadata plus `generate()`; generators in src/components/*.js
  return named objects ({text, answer, help, explainer, menu, ...}).
  src/CreateTask.js looks types up in the registry.
- hasFilter types (addsub, times, prop, prozent, potenzen) have sub-topics;
  the generator's `menu` supplies them and they map to `/[type]/[subtype]`.
- Auth: Supabase via @supabase/ssr (src/lib/supabase/*, session refresh in
  proxy.js). Email one-time code or Google OAuth, UI in
  src/components/AuthControls.js. No passwords.
- Roles in `profiles.role`: student (default), teacher (via invite code
  RPC `redeem_teacher_code`), admin (SQL only). Clients can't write `role`
  or `class_id` directly (triggers); all such changes go through security
  definer RPCs.
- Data: supabase/migrations/0001–0019 (profiles, daily_progress, classes,
  teacher_invite_codes, code_redemptions, daily_pseudonyms). Progress is
  daily per-category counters, batched by src/lib/rewards/accumulator.js
  into `increment_daily_progress`. Leaderboard is pseudonymous and live
  via Realtime Broadcast on `leaderboard:{class_id}`.
- Env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.
- FilterContext/TaskMenu and _templates.js no longer exist; react-router-dom
  and the `?atype=` query param are gone.

## Migration plan (in order — do not skip ahead)
1. DONE. Refactor generator return values from positional arrays to named
   objects ({text, answer, help, explainer, headerclass, menu, speak,
   speakhelp, speakexplainer, tutor}). Must be behavior-preserving — no
   visible change to the app.
2. DONE. Introduce a lightweight task-type registry so adding a new type
   requires editing/adding one file, not three separate locations
   (src/taskTypes.js).
3. DONE. Migrate to Next.js (App Router), replacing the query-param
   navigation hack with real routes. FilterContext/TaskMenu were removed.
4. DONE. Add auth: Google OAuth plus email one-time code (Supabase), no
   passwords and therefore no password reset flow.
5. MOSTLY BUILT. Add backend/database for points, rewards, streaks,
   leaderboards. Built: daily per-category progress counters, badge tiers
   (/badges), classes with join codes, teacher invite codes, pseudonymous
   live class leaderboard (day/week). Still missing:
   - Streaks: nothing computes or shows consecutive active days.
   - Points: there is no separate points score; "points" are the raw
     daily_progress counts behind badges and the leaderboard.

## Working style
- Prefer small, reviewable, behavior-preserving steps over large rewrites.
- Flag any step that touches more than one concern (e.g. don't mix the
  positional-array refactor with routing changes in the same commit).
- Ask before making decisions that affect the migration plan's order.

