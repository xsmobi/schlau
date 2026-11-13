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

See [ARCHITECTURE.md](ARCHITECTURE.md) for routes, database, auth flow and
data logging.

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
- `main` is the Vercel production branch. Never commit to it directly.
- `master` is a legacy branch from the Netlify setup, kept in sync with
  `main`. Always push both, then verify with
  `git ls-remote origin main master` that both point to the same commit.
- Netlify is retired: its old webhook still fires on pushes to `master` but
  deploys nothing.
- Work happens on feature branches; each gets a Vercel preview URL.
