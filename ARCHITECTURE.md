# schlau.app — Architecture (current state)

Snapshot of branch `dev/nextjs-migration` as of 2026-11-13 (last commit `fd3564e`).
Written only from what is in the repo. The live Supabase project, Vercel/Netlify
dashboards and email templates were **not** inspected; anything that depends on
them is marked **UNVERIFIED**.

Stack: Next.js 16 (App Router, `app/`), React 18, Tailwind 3, `@supabase/ssr` +
`@supabase/supabase-js`, MathJax via `better-react-mathjax`. Task generation is
still fully client-side (`src/components/*.js`, registered in `src/taskTypes.js`).
`src/App.js` is loaded client-only (`app/AppClient.js`, `dynamic(..., { ssr: false })`).

Note: `CLAUDE.md`'s "Current architecture" section (CRA, `_templates.js`,
`?atype=`, positional arrays) is outdated relative to this code. `README.md` is
still the stock Create React App README.

---

## 1. Routes / pages

Access: "public" means anyone can open it. Pages marked "signed-in" show a
"Bitte melde dich an" stub to anonymous visitors. Role checks happen in the
page or RPC, not in middleware (`proxy.js` only refreshes the session cookie).

| Route | Purpose | Access |
|---|---|---|
| `/` | Practice app, default task type `lin1` | public (progress recorded only when signed in) |
| `/[type]` | Practice app for one task type from `taskTypes` (statically generated; unknown → 404) | public |
| `/[type]/[subtype]` | Same, preselected sub-topic for `hasFilter` types (addsub, times, prop, prozent, potenzen) | public |
| `/auth/callback` (route handler) | OAuth PKCE `code` → session exchange, then redirect to `?next` or `/` | public |
| `/auth/confirm` | Magic-link landing page: "Sign In" button calls `verifyOtp({token_hash,type})` | public (see §5) |
| `/auth/auth-code-error` | Generic "Sign-In Failed" page | public |
| `/badges` | Student's own badge totals from `daily_progress` | signed-in (any role) |
| `/join` | Look up a 6-digit class code, confirm, join; leave the current class | signed-in (student flow; nav shows it to non-teachers) |
| `/leaderboard` | Pseudonymous class leaderboard, live-updated; `?class=` preselects for teachers | signed-in; student sees own class, teacher sees own classes |
| `/class` | Teacher: list own classes with join codes, regenerate code, create class | signed-in; useful only for `role='teacher'` |
| `/class/members?class=<id>` | Teacher: roster (emails) of one own class, remove member | signed-in teacher owning that class |
| `/redeem` | Redeem a teacher invite code (promotes to teacher) | signed-in; not linked in the nav |
| `/impressum` | Legal notice | public |
| `/datenschutz` | Privacy policy | public |
| `/mathe-app-docs/*` | Static marketing/docs HTML in `public/` | public |

Global UI: `AuthControls` (in `app/layout.js`) renders the sign-in bar or the
role-based nav (student: My Badges / Join or Change Class / Leaderboard;
teacher: My Badges / My Class) plus `MobileTabBar`. It renders nothing on `/auth/confirm`.

## 2. Database (Supabase Postgres, from `supabase/migrations/`)

### Tables

| Table | Key columns | RLS (one line) |
|---|---|---|
| `profiles` | `id` (PK → auth.users, cascade), `email`, `created_at`, `role` (`student`/`teacher`/`admin`, default student), `class_id` (→ classes, set null) | Select/update own row only. No insert/delete policy. `role` and `class_id` changes from clients are silently reverted by triggers |
| `daily_progress` | PK (`user_id`, `date`, `category`), `count` int | Select/insert/update own rows only. No delete |
| `teacher_invite_codes` | `id`, `code` (unique), `label`, `active` (default true), `school_id` (unused), `created_at` | Admins only (all ops); no other access |
| `classes` | `id`, `teacher_id` (→ auth.users), `name`, `join_code` (6 digits, unique, default generated), `school_id` (unused), `created_at` | Teacher: select/update/delete own; teacher/admin can insert own; student can select the class they're enrolled in |
| `daily_pseudonyms` | PK (`user_id`, `date`), `pseudonym` | RLS on, **no policies** → no client access; only via security definer functions |
| `code_redemptions` | `id`, `teacher_id`, `code_id` (→ teacher_invite_codes), `redeemed_at` | Admin select only; written only by `redeem_teacher_code` |
| `realtime.messages` (policies only) | — | Broadcast on topic `leaderboard:{class_id}`: select/insert allowed for that class's teacher or enrolled students |

### Functions / RPCs (all `security definer` unless noted; all RPCs granted to `authenticated`)

| Function | Purpose |
|---|---|
| `handle_new_user()` (trigger fn) | Inserts a `profiles` row on new `auth.users` row |
| `prevent_role_self_escalation()` (trigger fn, invoker) | Reverts `profiles.role` changes made as `anon`/`authenticated` |
| `prevent_class_id_self_assignment()` (trigger fn, invoker) | Reverts `profiles.class_id` changes made as `anon`/`authenticated` |
| `generate_unique_join_code()` (invoker) | Random unused 6-digit code; used as `classes.join_code` default |
| `increment_daily_progress(p_date, p_deltas jsonb)` | Ensures today's pseudonym, then upsert-adds counts per category for `auth.uid()` |
| `ensure_daily_pseudonym(p_date)` | Assigns an Adjective+Noun pseudonym for the day (avoids same-day collisions inside the class, max 20 tries) |
| `get_class_leaderboard(p_class_id, p_period 'day'/'week')` | Per-member pseudonym, `activity_count`, `engagement = sqrt(results × (help+explainer)/2)`; teacher or member only |
| `join_class(p_code)` | Sets caller's `class_id` from a join code (overwrites any previous class) |
| `lookup_class_by_code(p_code)` | Read-only preview (id, name) before joining |
| `regenerate_join_code(p_class_id)` | Owner teacher gets a new code; existing members unaffected |
| `create_class(p_name)` | Teacher/admin creates a class and generates its code |
| `redeem_teacher_code(p_code)` | Validates active invite code → role `teacher` (admins untouched), clears `class_id`, logs `code_redemptions` |
| `leave_class()` | Caller sets own `class_id` to null |
| `remove_class_member(p_student_id)` | Teacher unlinks a student from one of their own classes |
| `get_class_members(p_class_id)` | Teacher gets roster `(student_id, email)` of own class |

### Triggers
- `on_auth_user_created` — after insert on `auth.users` → `handle_new_user()`
- `prevent_profiles_role_self_escalation` — before update on `profiles`
- `prevent_profiles_class_id_self_assignment` — before update on `profiles`

### Migrations (`supabase/migrations/`)
0001_profiles · 0002_daily_progress · 0003_increment_daily_progress ·
0004_teacher_roles_and_invites · 0005_classes · 0006_leaderboard_broadcast ·
0007_backfill_missing_profiles · 0008_class_join_codes · 0009_lookup_class_by_code ·
0010_leaderboard · 0011_leaderboard_engagement · 0012_leaderboard_engagement_cast_fix ·
0013_redeem_teacher_code · 0014_teacher_invite_labels_and_log · 0015_create_class ·
0016_create_class_ambiguous_column_fix · 0017_redeem_teacher_code_clears_class_id ·
0018_class_roster_management · 0019_get_class_members_ambiguous_column_fix

Whether all 19 are applied to the live project: **UNVERIFIED** (no migration
tooling config such as `supabase/config.toml` in the repo; they appear to be run by hand).

## 3. Auth flow, roles, teacher invite codes

**Sign-in (all in `src/components/AuthControls.js`):**
1. *Email code (OTP):* `signInWithOtp({ email })` without `emailRedirectTo`, so
   Supabase emails a 6–8-digit code. User types it; client tries
   `verifyOtp({type:'email'})`, then falls back to `type:'signup'` for first-time
   addresses. On success it reloads the page. "Resend Code" has a 30 s cooldown.
2. *Google OAuth:* `signInWithOAuth({ provider: 'google', redirectTo: <origin>/auth/callback })`;
   `/auth/callback` exchanges the code and redirects.
3. *Magic link:* `/auth/confirm` handles `token_hash` + `type`. Nothing in the
   code requests a link, so it is only reached if the Supabase email template
   points there (**UNVERIFIED**).

Sessions use cookies (`@supabase/ssr`). `proxy.js` (Next 16 middleware) calls
`updateSession` on every non-static request. Server pages use `src/lib/supabase/server.js`,
client code uses `client.js`. Signing up = first sign-in. `handle_new_user` creates the
profile. No password flow exists.

**Roles** (`profiles.role`): `student` (default), `teacher`, `admin`.
- Clients can't change `role` or `class_id` directly (triggers). Changes go only through the RPCs above.
- `admin` is only settable via SQL. It grants access to `teacher_invite_codes` / `code_redemptions`
  via RLS. There is no admin UI.
- Layout reads `role`/`class_id` once server-side. Role changes need a reload (forms do `window.location`).

**Teacher invite codes:**
- Rows in `teacher_invite_codes` are created/deactivated **by hand in SQL**
  (`insert ... (code, label, active)`; `update ... set active=false`). Codes are reusable,
  not per-person, and have no expiry. `label` tags the cohort for admin bookkeeping.
- A signed-in user opens `/redeem` (link shared out-of-band, also shown to teachers on `/class` as
  "Invite a colleague"). `RedeemTeacherCodeForm` calls `redeem_teacher_code`. Invalid and inactive codes
  both return "code not found". On success: role → teacher, `class_id` → null,
  one `code_redemptions` row.
- Teachers then create classes on `/class`. Each class gets a 6-digit join code that students
  redeem on `/join` (preview via `lookup_class_by_code`, then `join_class`). One class per student.

## 4. External services and env var names

| Service | Use | Evidence |
|---|---|---|
| Supabase | Postgres, Auth (email OTP, Google), Realtime Broadcast | `src/lib/supabase/*`, migrations; privacy page says region eu-west-1 |
| Google OAuth | Social login via Supabase | `AuthControls.js`; provider config in Supabase **UNVERIFIED** |
| Vercel | Production from `main`, a preview for each feature branch | `README.md`; no `vercel.json` in repo, settings **UNVERIFIED** |
| Netlify | Legacy: webhook still fires on `master` (kept in sync with `main`) but deploys nothing | `README.md`, `public/_redirects`; config **UNVERIFIED** |
| Matomo Cloud | Tag Manager script loaded on every page (`cdn.matomo.cloud/schlau.matomo.cloud/...`) | `app/layout.js` |
| Resend | **UNVERIFIED** — not referenced anywhere in the code. If used, it would be Supabase custom SMTP configured in the dashboard |
| `docs.schlau.app` | External docs link in footer | `src/App.js` |

Env vars referenced in code (names only):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These are the only two in `.env.local` and the only `process.env.*` uses. No
service-role key and no server-only secrets are used by the app. Any Resend/SMTP or
Google OAuth secrets would live in the Supabase dashboard (**UNVERIFIED**).

## 5. Known gaps, dead code, TODOs

- **`/auth/confirm`** — no code path sends magic links (OTP codes are used instead).
  Whether any Supabase email template still links here is **UNVERIFIED**. Likely dead.
- **`leaderboardChannel.js` header comment** says the subscribe side is "not yet built".
  It is now built in `src/components/Leaderboard.js`. The comment is stale.
- **Privacy text vs. code:** `/datenschutz` says "keine Tracking-Tools Dritter", but
  `app/layout.js` loads Matomo Tag Manager on every page. It also doesn't mention Google
  as an OAuth processor in the hosting section, or Vercel hosting.
- **Admin role is half-supported:** `/class` and `/leaderboard` check `role === 'teacher'` only.
  An admin is treated like a student there and can't see the create-class UI, although
  `create_class` allows admins.
- **Leaderboard day boundary:** `daily_progress.date` is the client's local date, but
  `get_class_leaderboard` uses server `current_date` (UTC presumably, **UNVERIFIED**) for
  'day'/'week' windows. Late-evening activity in Germany may count toward the wrong day.
- **Reward counting quirks (`src/App.js`):** `recordHelp()` / `recordExplainer()` fire on
  every toggle, including closing the panel, and have no reward cooldown ("+" and "=" have
  1.5 s cooldowns). Engagement can therefore be inflated by open/close.
- **No account deletion / data export flow**. There are no DELETE policies on `profiles`/`daily_progress`.
  Deletion relies on removing the `auth.users` row (cascade) by hand.
- **`school_id`** columns on `classes` and `teacher_invite_codes` are unused placeholders.
- **`classes` direct insert policy** exists but is unsafe to use (join-code default is RLS-blind, see 0015).
  The UI correctly uses `create_class`.
- **0018 comment mentions a `badges` table** that does not exist (badges are derived from `daily_progress`).
- **`src/taskTypes.js`:** `lin3`/`lin2`/`frac` get hardcoded args their generators mostly ignore (noted
  in-file as a follow-up). `prop` and `prozent` share keyboard shortcut `g`.
- `FilterContext.js`/`TaskMenu.js` and `src/components/_templates.js` no longer exist. `menu_display` in
  `src/Task.js` is assigned but never rendered (the sub-topic menu lives in `App.js`).
- No explicit `TODO`/`FIXME` markers were found in `app/`, `src/`, or `proxy.js`.
- Untracked `docs-export/` (schueler.md, lehrer.md, mathespiel.md, img/) is not part of the build.

## 6. Data stored per student and per task event

**Per student (DB):**
- `auth.users` (Supabase-managed): email, auth metadata, Google identity if used. Exact fields are
  Supabase-internal (**UNVERIFIED**).
- `profiles`: id, email (copied at signup), created_at, role, class_id.
- `daily_pseudonyms`: one pseudonym per active day (history kept, never deleted).
- `code_redemptions`: only for users who redeemed a teacher code (who, which code, when).

**Per task event — what IS logged:** only aggregated daily counters in `daily_progress`
(`user_id`, local `date`, `category`, `count`). Events are buffered client-side
(`src/lib/rewards/accumulator.js`) and flushed via `increment_daily_progress` every 20 s,
after 10 actions, or on tab hide/pagehide. Failed flushes are retried. Only signed-in users are recorded.
- "+" (new task): +1 on the topic code (`type` or `type+subtype`, e.g. `times5`), plus +1 on the
  current lifetime activity tier code `a1`–`a9`. Throttled to once per 1.5 s.
- Help opened/closed: +1 on current help tier `b1`/`b2`.
- Explainer opened/closed: +1 on `b3`.
- Solution ("="): +1 on current solution tier `b4`/`b5`/`b6`. Throttled to once per 1.5 s.
- After a successful flush, a content-free `activity` broadcast goes to `leaderboard:{class_id}`.

**What is NOT logged:**
- No per-event rows and no timestamps finer than a day.
- The generated task content, its parameters, the expected answer and the student's
  answer are not stored. The app never collects answers, so correctness is not tracked.
- Time spent per task, sequence of actions, and which sub-step of help was viewed are not stored.
- Anonymous (signed-out) usage is not stored in Supabase. Matomo may record page views separately
  (scope **UNVERIFIED**).
- Text-to-speech usage is not stored.
- Leaderboards expose only pseudonym + aggregates. Teachers see real emails only on `/class/members`.
