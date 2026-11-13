# schlau.app

German-language math practice web app ("Mathe by Doing") for grades 7–10.
Students get randomly generated tasks with help, solution and step-by-step
explainer. Signed-in students collect badges, join a class with a 6-digit
code and appear pseudonymously on a class leaderboard. Teachers (via invite
code) create classes and manage their roster.

## Stack
- Next.js 16 (App Router), React 18, Tailwind CSS 3
- Supabase: Postgres, Auth (email one-time code, Google OAuth), Realtime
- MathJax via `better-react-mathjax`, sanitized HTML via `dompurify`
- Task generation runs entirely in the browser (`src/components/*.js`,
  registered in `src/taskTypes.js`)

## Run locally
Requires Node.js 20.9 or newer.

1. `npm install`
2. Create `.env.local` with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. `npm run dev`, then open http://localhost:3000

Other scripts: `npm run build`, `npm run lint`.

Database schema lives in `supabase/migrations/` and is applied to the
Supabase project by hand, in numeric order.

## Branches and deploys
- `main` is the only production branch; Vercel deploys from it. Never
  commit to it directly.
- Work happens on feature branches; each push gets a Vercel preview URL.
  Changes reach `main` only via a squash-merged PR.
