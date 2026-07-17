# TaskTrack V3 — Operational Workspace (Phase 1)

This is the foundation of TaskTrack's rewrite from a task tracker into an
"Operational Workspace for Manpower & Outsourcing Companies" — a
Notion/Linear/ClickUp/Attio-style workspace, purpose-built for outsourcing
operations.

**This is a brand-new codebase**, separate from the original TaskTrack
(FastAPI + plain React). It does not share code, data, or deployment with
the old app. Nothing about the old app has been touched or removed.

## What Phase 1 delivers

Per the spec's phased plan, Phase 1 is the architecture foundation only:

- ✅ **Workspace shell** — sidebar + main content area (`modules/workspace`)
- ✅ **Sidebar** — collapsible, with Home/Inbox/Tasks/Meetings/Projects/
  Clients/Employees/Knowledge Base/Archive/Settings (`modules/sidebar`)
- ✅ **Object Page Layout** — the *one* layout every object type (Task,
  Meeting, Project, Client, Employee, ...) will render through — no more
  big edit popups (`modules/pages/ObjectPageLayout.tsx`)
- ✅ **Property Panel** — inline, always-editable properties at the top of
  a page, driven by a per-object-type schema (`modules/properties`)
- ✅ **Block Editor** — reusable, Notion-style block architecture (not a
  textarea): paragraph, heading 1–3, checklist, bulleted/numbered list,
  toggle, quote, callout, divider, code. Content is stored as a `Block[]`
  JSON tree, never HTML (`modules/editor`, `modules/blocks`)
- ✅ Slash (`/`) command menu to insert/change block types
- ✅ A working demo route (`/tasks/[id]`) proving all of the above render
  together correctly

## What Phase 1 deliberately does NOT include yet

Per your own phased plan, these come later:

- Real Supabase data (Task/Meeting pages currently use in-memory mock
  state — Phase 2)
- Smart blocks (`/task`, `/meeting`, `/employee`, `/approval`, etc.) and
  the Relation System (Phase 3)
- Database views (Table/Board/Calendar/Timeline/Gallery/List), Global
  Search (Ctrl+K), Activity Timeline, Comments, AI-ready hooks (Phase 4)

The Supabase client (`services/supabase.ts`) and TanStack Query provider
are already wired up and ready for Phase 2 to start using immediately.

## Architecture

```
src/
  app/                 Next.js routes (App Router)
  components/ui/       Reusable primitives (Button, Badge, Separator) —
                        hand-authored in shadcn/ui's exact convention, so
                        `npx shadcn add <component>` will work later
                        without conflicts (see note below)
  modules/
    workspace/          WorkspaceShell, QueryProvider
    sidebar/            Sidebar, nav config
    pages/              ObjectPageLayout, RelatedSection, shared types
    properties/         PropertyPanel + per-object-type schemas
    editor/              BlockEditor (orchestrates a page's Block[])
    blocks/             Block types, BlockRenderer, SlashMenu
    relations/          (empty — Phase 3)
    activity/           (empty — Phase 4)
    comments/           (empty — Phase 4)
    files/              (empty — Phase 4)
    database/           (empty — Phase 3, for Table/Board/Calendar views)
    search/             (empty — Phase 4, for Ctrl+K)
  hooks/                (empty — Phase 2+)
  store/                useWorkspaceStore.ts (Zustand — UI state only)
  services/             supabase.ts (Supabase client)
```

### A note on shadcn/ui

The `shadcn` CLI needs to reach `ui.shadcn.com` to fetch component source,
which wasn't reachable from the sandbox this was built in. The three
primitives included (`Button`, `Badge`, `Separator`) were hand-written
using the exact same conventions shadcn/ui generates (same file shape,
same `cn()` utility, same `cva` variant pattern), so from your own machine
you can run e.g. `npx shadcn add dialog` and it'll drop right in
alongside these without any conflicts.

## Run it locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Try `/tasks/demo-task-1` to see the full
Phase 1 architecture in action: object page layout, editable property
panel, and the block editor (type `/` on any line).

## Environment variables (for Phase 2)

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The app runs fine without these for now (Phase 1 doesn't touch Supabase
yet), but Phase 2 will need them.

## Deploying to Vercel

1. Push this to a GitHub repo.
2. On [vercel.com](https://vercel.com), import the repo — Vercel
   auto-detects Next.js, no build config needed.
3. Add the two Supabase env vars above under Project Settings →
   Environment Variables.
4. Deploy. Vercel gives you a free `.vercel.app` URL.

## Next steps (Phase 2, per your plan)

1. Wire `services/supabase.ts` into real `useTask`, `useMeeting` hooks
   (TanStack Query) in `hooks/`.
2. Replace the in-memory mock state in `app/tasks/[id]/page.tsx` with
   those hooks.
3. Add a Meeting object page using the same `ObjectPageLayout`.
4. Remove the concept of a "New Task" modal entirely in favor of Quick
   Create → object page (this scaffolding is ready for it; Quick Create
   itself is a Phase 2/4 item).
