# Anti-patterns to flag in review

## 1. Shared code importing from a feature
```ts
// src/components/Header/Header.tsx
import { useMagnetic } from "@/features/home/hooks/useMagnetic"; // ❌
```
`Header` is shared (rendered on every page); `features/home` is one page's
domain. If `Header` depends on it, either the hook isn't actually
home-specific (promote it to `src/hooks/`), or `Header` shouldn't be using
home-specific behavior at all.

Fix: promote the dependency to the shared layer, update all importers,
delete the feature-local copy.

## 2. Feature importing another feature
```ts
// src/features/checkout/components/PromoBanner.tsx
import { useWishlist } from "@/features/wishlist/hooks/useWishlist"; // ❌
```
Compose at the `app` layer instead — pass wishlist data down as props, or
lift the shared bit to `shared`/a state layer both features consume.

## 3. Everything-barrel per feature
```ts
// src/features/checkout/index.ts
export * from "./components/CheckoutForm";
export * from "./hooks/useCart";
export * from "./lib/calculateTotals";
// ... 20 more lines
```
Kills tree-shaking, makes grep-for-usages unreliable, invites accidental
circular imports. Import the concrete file instead.

## 4. Premature promotion ("just in case" shared code)
A one-off animation variant, a single-use formatter, a constant used in one
place — dropped straight into `src/lib/` or `src/utils/` on creation. Over
time these folders become undifferentiated junk drawers where nobody can
tell what's actually shared vs. what one component happens to still use.
Colocate first; promote only on the second real consumer.

## 5. Type-based folders at the top level once features exist
```
src/
  components/   ← 40 files, unrelated features mixed together
  hooks/        ← 25 files, unrelated features mixed together
  utils/        ← 30 files, unrelated features mixed together
```
If most of these only serve one feature each, this is the exact structure
feature-based organization is meant to replace. Top-level type folders
should only contain code with 2+ feature consumers (see decision tree in
SKILL.md).

## 6. Deep nesting inside a single feature
```
features/checkout/components/summary/line-items/row/RowPrice.tsx
```
4+ levels deep for one feature is a sign the feature is doing too much and
should be split into two features, not nested further.

## 7. Fat `app/**/page.tsx`
Business logic, data transformation, or large inline JSX living directly in
a route file instead of being composed from `features/`. Route files should
mostly be composition + routing/layout concerns.
