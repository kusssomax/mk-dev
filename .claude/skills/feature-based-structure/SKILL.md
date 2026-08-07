---
name: feature-based-structure
description: |
  Organize a React (or Next.js) codebase using feature-based / screaming architecture instead of grouping by file type. Covers the shared → features → app layering rule, colocation vs. promotion decisions, where hooks/utils/types/constants should live, avoiding cross-feature imports, and when NOT to create a "features" folder at all.

  Use when: setting up a new React/Next.js project's folder structure, refactoring a "components/hooks/utils grouped by type" project into feature folders, deciding where a new file (hook, constant, type, util) should live, a component has grown too many inline helpers/constants and needs to be split, reviewing whether a PR put code in the right place, or the user says "clean up this component", "where should this live", "feature folder structure", "is this the right place for this file".

  Not for: component visual/styling conventions (that's a project's own UI convention skill), state-management library choice, or monorepo/workspace-package boundaries (this is about a single app's `src/` tree).
---

# Feature-Based Folder Structure

## Core idea

Group code by **domain/feature**, not by technical type. A "type-based" tree
(`components/`, `hooks/`, `utils/`, `types/` all at the top level, each full of
unrelated things) forces you to open five folders to understand one feature.
A "feature-based" tree keeps everything one feature needs inside that
feature's folder, and reserves the top-level type folders for code that is
**genuinely shared** across features.

This is sometimes called *Screaming Architecture*: opening `src/` should tell
you what the app **does** (`checkout`, `auth`, `dashboard`), not what
framework it's written in.

## The three layers, and the one rule that matters most

```
src/
  app/          # routing / pages only — thin, composes features
  features/     # one folder per domain, self-contained
  <shared>/     # components/, lib/, hooks/, types/ — used by 2+ features
```

**Unidirectional flow: `shared → features → app`.**

- `shared` code must never import from `features/*`.
- A feature must never import from another feature (`features/checkout`
  importing from `features/cart` is a smell). Compose multiple features
  together at the `app` layer instead.
- `app` can import from anywhere (it's the composition root).

Violating this is the #1 real-world bug in "feature-based" codebases: a
shared `Header` or `Layout` component quietly starts importing a hook from
`features/home` because that's where the hook happened to get written first.
Now `Header` — used on *every* page — drags in all of the `home` feature's
code, and the layering is fiction. If you're auditing an existing repo,
`grep` for this specifically:

```bash
grep -rn "from \"@/features/" src/components src/lib src/hooks src/app 2>/dev/null
```
Any hit is a layering violation — the file living under `features/` needs to
move up to shared, or the shared file needs to stop depending on it.

## Standard structure

```
src/
  app/                        # Next.js App Router: routes only, no business logic
    layout.tsx
    page.tsx
    (marketing)/about/page.tsx

  components/                 # shared, cross-feature UI only
    Header/
      Header.tsx
      MobileMenu.tsx
      MobileMenu.animations.ts   # colocated, used only by MobileMenu
    ui/                        # design-system primitives (shadcn/ui, buttons, inputs)

  features/
    <feature-name>/
      components/              # components used only within this feature
      hooks/                   # hooks used only within this feature
      lib/                     # feature-local helpers/constants
      data/                    # static content, config used only by this feature
      types/                   # types local to this feature
      # NOTE: no index.ts barrel by default — see "Barrel files" below

  lib/                        # generic, app-wide utilities — no feature knowledge
    utils.ts                  # e.g. cn(), formatDate()
    easing.ts                 # e.g. shared animation curves

  hooks/                      # generic, reusable hooks — no feature knowledge
    useMagnetic.ts
    useMediaQuery.ts

  types/                      # global/app-wide types (rarely needed; prefer colocation)
```

Keep nesting to **2–3 levels max** inside any given folder. If
`features/checkout/components/summary/line-items/` needs a fourth level,
that's usually a sign the feature itself should be split, not nested deeper.

## Decision tree: where does this file go?

Ask in this order:

1. **Is it used by exactly one component?**
   → Colocate it next to that component (`Thing.tsx` + `Thing.animations.ts`
   / `Thing.hooks.ts` in the same folder). Don't promote it "just in case."
   This is the fix most components need when they feel cluttered — most
   inline constants/variants/small helpers just need to move one file over,
   not into a shared lib.

2. **Is it used by multiple components, but only within one feature?**
   → `features/<feature>/{hooks,lib,components,types}/`.

3. **Is it used across features, or by a shared/layout component (Header,
   Footer, providers)?**
   → Promote to top-level `lib/`, `hooks/`, or `types/`. This is exactly the
   `easing.ts` / `useMagnetic.ts` situation: a hook written inside
   `features/home` turned out to be needed by the shared `Header` too, so it
   graduated to `src/hooks/`.

4. **Is it a route/page composition with no reusable logic of its own?**
   → `app/`. Keep `app/**/page.tsx` thin: import feature components, wire
   them together, no business logic inline.

Don't jump straight to step 3 "to be safe" — premature promotion to shared
is how `lib/` and `hooks/` turn into junk drawers. Start colocated (step 1),
promote only when a second real consumer appears.

## Barrel files (`index.ts` re-exports)

Avoid a feature-wide `features/<name>/index.ts` that re-exports everything.
It feels convenient but:
- defeats tree-shaking in Vite/Next/webpack for large features,
- creates fake circular-import risk,
- makes "who actually uses this" unsearchable (everything routes through one
  file).

Import directly from the file: `@/features/checkout/hooks/useCart`, not
`@/features/checkout`. A small `types/index.ts` for a feature's own shared
types is fine — the ban is on re-exporting components/hooks/lib in bulk.

## When NOT to bother with a `features/` folder

Small apps (a handful of pages, one real "feature") don't need the
ceremony. If there's only one feature, `features/home/` is just
`components/` with extra steps. Signals it's time to introduce
`features/`:
- a second distinct domain/page appears with its own components+hooks+data,
- a top-level `components/`/`hooks/` folder is accumulating files that
  clearly only serve one page/flow,
- two unrelated pages start needing near-duplicate logic and you can't tell
  where the canonical version should live.

Until then, `components/`, `hooks/`, `lib/` flat at the top level is fine —
don't force the feature split before there's a second feature to justify it.

## Naming conventions

- Colocated helper files: `<Component>.<purpose>.ts` —
  `MobileMenu.animations.ts`, `Form.validation.ts`, `Table.columns.ts`.
- Hooks: `useX.ts`, one hook per file, named export.
- Feature folders: lowercase-kebab or lowercase single word matching the
  domain (`checkout`, `user-settings`), not `Checkout` or `checkoutStuff`.
- Don't suffix shared folders with the framework/library name
  (`components/`, not `react-components/`).

## Refactor checklist (extracting logic out of a "dirty" component)

1. Identify what's not JSX-rendering-flow: variants/config objects, pure
   helper functions, magic numbers/strings used more than once, effects
   that could be a custom hook.
2. Run the decision tree above for each piece independently — don't move
   everything to the same destination by default. A component's inline
   constants often split across "colocate this" and "promote that."
3. Move, update imports, delete the original.
4. `grep` for other consumers of anything you moved before deleting the old
   path (an old file assumed feature-local often has 2-3 other importers).
5. Typecheck (`tsc --noEmit`) after moving — path-alias typos are the most
   common breakage.

See `references/nextjs-app-router.md` for App Router-specific notes and
`references/anti-patterns.md` for a longer list of smells to flag in review.
