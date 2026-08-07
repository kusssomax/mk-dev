# Next.js App Router notes

The App Router overloads `app/` as *both* the routing mechanism and a folder
name, which trips people migrating from Pages Router or plain Vite/CRA
feature-based examples. Rules specific to App Router:

- `app/` holds **routes only**: `page.tsx`, `layout.tsx`, `route.ts`,
  `loading.tsx`, `error.tsx`, `template.tsx`, and route groups `(group)/`.
  It is the innermost layer of the app composition — it should mostly import
  from `features/` and `components/`, not contain logic itself.
- Route groups (`app/(marketing)/`, `app/(dashboard)/`) are for URL/layout
  organization, not a substitute for `features/`. Don't put feature
  components inside `app/(group)/_components/` unless that component is
  genuinely one-route-only and trivial — anything with its own hooks/lib
  still belongs in `features/`.
- Private folders (prefixed `_`, e.g. `app/_lib/`) opt a folder out of
  routing. Some teams use `app/_components` for route-local UI. This is fine
  for truly page-specific, non-reusable pieces, but if the same "page-local"
  component grows hooks/lib/data of its own, it has become a feature and
  should move to `features/<name>/`.
- Server vs. Client components don't change the folder structure decision —
  colocate `"use client"` files the same way; just keep the boundary
  explicit per-file with the directive, not via folder naming.
- `middleware.ts`, `next.config.ts` etc. stay at the project root, outside
  `src/`, same as always.

## Example: mapping a route to features

```
app/
  (marketing)/
    checkout/
      page.tsx           # imports from features/checkout, thin
features/
  checkout/
    components/
      CheckoutForm.tsx
      OrderSummary.tsx
    hooks/
      useCart.ts
    lib/
      calculateTotals.ts
    data/
      shipping-options.ts
    types/
      index.ts
```

`page.tsx` composes `<CheckoutForm />` + `<OrderSummary />`; it does not
contain `calculateTotals` inline or fetch cart state itself.
