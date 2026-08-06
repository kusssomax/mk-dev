---
name: shadcn-ui-conventions
description: Use this skill whenever creating new UI, modifying existing UI, or implementing any new feature/component that involves UI logic in this Next.js project — e.g. "add a modal", "create a form", "make a settings page", "build a card component", "change the button style", "add a dropdown". Enforces project conventions for shadcn/ui component usage, Tailwind-only styling, and design-token colors instead of hardcoded values. Always consult this skill before writing or editing any .tsx/.jsx file that renders UI, even for small changes like adding a single button or badge.
---

# shadcn/ui + Tailwind Conventions

These rules are mandatory for any UI work in this project: new components, edits to existing ones, new features with UI logic. The goal is to avoid reinventing things that shadcn/ui already provides, and to avoid hardcoding styles when design tokens already exist.

## 1. Always check shadcn/ui first

Before writing a `<button>`, `<input>`, `<select>`, modal, dropdown, tooltip, tab, accordion, etc. as a **plain HTML element**, first check whether a corresponding component already exists in shadcn/ui.

Order of operations:

1. Check whether the component already exists in the project: `components/ui/` (path may differ — check `components.json`).
2. If it's not in the project but exists in shadcn/ui — install it via the CLI, don't hand-copy the code and don't write your own:
   ```bash
   npx shadcn@latest add <component-name>
   ```
   (or `pnpm dlx shadcn@latest add <component-name>` / `bunx --bun shadcn@latest add <component-name>` — check the lockfile to see which package manager the project uses).
3. Only if there's truly no matching component in shadcn/ui (e.g. very specific domain logic) — write a custom component, reusing already-installed primitives from `components/ui/` as much as possible (e.g. build a custom `Combobox` on top of the already-installed `Popover` + `Command`).

**Never use plain elements when a shadcn equivalent exists:**

| Instead of | Use |
|---|---|
| `<button>` | `<Button>` |
| `<input>` | `<Input>` |
| `<textarea>` | `<Textarea>` |
| `<select>` | `<Select>` |
| custom modal/`<dialog>` | `<Dialog>` / `<AlertDialog>` |
| custom dropdown | `<DropdownMenu>` |
| custom tooltip | `<Tooltip>` |
| custom tabs | `<Tabs>` |
| custom checkbox | `<Checkbox>` |
| custom toggle | `<Switch>` / `<Toggle>` |
| card container | `<Card>` |
| badge/chip | `<Badge>` |

If unsure whether shadcn/ui has the component you need, check the registry (https://ui.shadcn.com/docs/components) before writing a custom implementation.

## 2. Styling — Tailwind only

- All styles are written as Tailwind utility classes in JSX/TSX.
- **Inline styles (`style={{ ... }}`) or a new class in `globals.css`** are the exception — only when something genuinely cannot be expressed with Tailwind utility classes (e.g. a complex keyframe animation, a specific grid-template, a dynamically computed CSS variable).
  - If the style will be **reused in multiple places** — extract it into a global class in `globals.css`.
  - If the style is **one-off and local** — an inline style is acceptable, but only when Tailwind truly can't express it.
- Don't create new global classes "just in case" — that's exactly the kind of clutter this skill exists to prevent.

## 3. Colors, shadows, and other tokenized values — never hardcode

When a Tailwind class sets a color, shadow, border, background, etc. — hardcoding values is **forbidden**:

❌ Wrong:
```
text-white
bg-[#000000]
border-[#e5e5e5]
shadow-[0_2px_4px_rgba(0,0,0,0.1)]
```

✅ Correct — first check `globals.css` (the CSS variables / `@theme` / `:root` section) and use the matching design token:
```
text-foreground
bg-background
border-border
text-muted-foreground
bg-primary text-primary-foreground
shadow-sm
```

Algorithm to follow before writing any color/shadow/border:

1. Open `app/globals.css` (or `styles/globals.css`) and check which tokens are already defined (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--destructive`, `--accent`, etc.).
2. Use the matching Tailwind class for that token (`bg-background`, `text-muted-foreground`, `border-border`, `bg-destructive text-destructive-foreground`, etc.).
3. Hardcode a value (`text-[#...]`, `bg-white`, an arbitrary shadow) **only if** `globals.css` genuinely has no matching token for this case. If it's a new color/shadow that will be reused, add a token to `globals.css` first, then use it as a class — don't hardcode it at every call site.

## 4. Merging classes and conditional styling — always via `cn()`

For combining classes, conditional styles, and variants, always use `cn()` (`clsx` + `tailwind-merge`) instead of template strings or manual concatenation:

❌ Wrong:
```tsx
className={`flex items-center ${isActive ? 'bg-primary' : 'bg-muted'} ${className}`}
```

✅ Correct:
```tsx
import { cn } from "@/lib/utils"

className={cn(
  "flex items-center",
  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
  className,
)}
```

If `cn()` isn't already imported in the file you're working in where conditional/merged classes are needed, import it from `@/lib/utils` (the standard shadcn setup). If the `cn` utility doesn't exist in the project, check `lib/utils.ts`/`lib/utils.tsx` first, and only if it's truly missing, create it following the standard shadcn pattern (`clsx` + `twMerge`) — don't write your own custom class-merging logic.

## 5. Checklist before shipping any UI code

Before finishing any UI task, run through this list:

- [ ] Are all interactive/structural elements taken from shadcn/ui rather than written as plain HTML?
- [ ] Were any new shadcn components installed via `npx shadcn@latest add ...`, rather than hand-copied?
- [ ] Are all styles Tailwind classes? If there's an inline style / global.css class, is it genuinely something Tailwind can't express, and is the local-vs-global choice correct?
- [ ] Is no color/shadow/border hardcoded (`text-white`, `bg-[#...]`, `shadow-[...]`) — are they all pulled from `globals.css` tokens instead?
- [ ] Is class merging and conditional styling going through `cn()`?
