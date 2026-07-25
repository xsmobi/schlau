# schlau.app

German-language math practice web app ("Mathe by Doing") for grades 7–10.
Currently Create React App + Tailwind CSS, no backend — task generation is
entirely client-side.

## Branching / deploy safety
- `master` = production, auto-deployed to Netlify on push. NEVER commit or
  push directly to master.
- All work happens on feature branches (currently: dev/nextjs-migration).
- Before starting work in a new session, confirm current branch.

## Current architecture (as of this migration's start)
- src/App.js: single component holding a hardcoded `types` array (task
  types), selectedType state, and inline submenu/filter logic.
- src/components/_templates.js: flat list of template objects, `type` field
  used as dispatch key.
- src/CreateTask.js: switch(type) dispatching to generator functions in
  src/components/*.js (add.js, lin1.js, prop.js, quad.js, potenzen.js, etc.)
- Generators return POSITIONAL arrays:
  [aufgabe, lösung, help, explainer, headerclass, menu, speak, speakhelp,
  speakexplainer, tutor]
  — fragile, planned to convert to named objects.
- src/Task.js: renders task (MathJax via better-react-mathjax, sanitized
  HTML via dompurify, magic-marker visual aids in help strings).
- src/FilterContext.js and src/TaskMenu.js: DEAD CODE, not wired into App.
  Do not assume these are active; do not build on them without an explicit
  decision to revive them first.
- Navigation: no router in active use (react-router-dom is installed but
  unused). Current "navigation" = button clicks + a single `?atype=`
  query param written via window.history.pushState.
- hasFilter task types (times, prop, prozent, quad, potenzen) have a
  sub-topic dropdown; generator's return[5] supplies the dropdown options.

## Migration plan (in order — do not skip ahead)
1. Refactor generator return values from positional arrays to named objects
   ({text, answer, help, explainer, headerclass, menu, speak, speakhelp,
   speakexplainer, tutor}). Must be behavior-preserving — no visible change
   to the app.
2. Introduce a lightweight task-type registry so adding a new type requires
   editing/adding one file, not three separate locations.
3. Migrate to Next.js (App Router), replacing the query-param navigation
   hack with real routes. Decide fate of FilterContext/TaskMenu as part of
   this, don't carry the dead code forward silently.
4. Add auth (social login only, no password reset flow).
5. Add backend/database for points, rewards, streaks, leaderboards.

## Working style
- Prefer small, reviewable, behavior-preserving steps over large rewrites.
- Flag any step that touches more than one concern (e.g. don't mix the
  positional-array refactor with routing changes in the same commit).
- Ask before making decisions that affect the migration plan's order.

