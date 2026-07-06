# Hero component spec

A brief for building **hero variants** for HooksHub. Each variant is a
self-contained header/hero band that can drop into `page.tsx` in place of the
baseline `Hero` (`src/app/_components/heros/Hero.tsx`) with zero other changes.

Give this file to an agent along with a one-line direction (e.g. "make a
terminal-prompt hero" or "make a big editorial hero") and it should produce a
finished component that respects everything below.

---

## Deliverable

- **One file** per variant: `src/app/_components/heros/<Name>Hero.tsx`
  (PascalCase, e.g. `TerminalHero.tsx`, `EditorialHero.tsx`, `SplitHero.tsx`).
- Default-export a React component.
- **Server component by default.** Only add `"use client"` if the variant is
  interactive (state, effects, event handlers). Prefer static.
- No new dependencies. No new files, no global CSS edits — style with Tailwind
  utilities and the existing CSS variables only.

## Prop contract (must match exactly)

```ts
type HeroProps = {
  totalHooks: number;  // total hooks across all categories
  categories: number;  // number of categories
};
```

Every variant takes these same props so they are drop-in interchangeable. A
variant may *ignore* a prop, but must not add required props (page.tsx only
passes these two). Optional props with defaults are allowed.

To use a variant, `page.tsx` swaps the import:

```tsx
import Hero from "@/app/_components/heros/TerminalHero"; // was ./heros/Hero
// ...
<Hero totalHooks={totalHooks} categories={hooks.length} />
```

## Design system — use these tokens, invent nothing

This is Next.js 16 + Tailwind v4 (`@import "tailwindcss"` in `globals.css`).
Colors come from CSS variables; reference them, don't hardcode hexes.

**Reference a variable in a Tailwind class** with the arbitrary-value syntax
already used across the codebase:
- background: `bg-[var(--surface)]`
- text color: `text-[color:var(--muted)]`
- border: `border-[var(--line)]`
- ring: `focus-visible:ring-[var(--accent)]`

### Color tokens (defined in `src/app/globals.css`)

| Token | Role |
|---|---|
| `--bg` / `--bg-deep` | page background / deeper wells |
| `--surface` / `--surface-2` | raised surfaces, chips, cards |
| `--line` / `--line-strong` | hairline borders |
| `--ink` / `--ink-dim` | primary / secondary text |
| `--muted` | tertiary text, labels |
| `--accent` | the single signal accent (warm orange) |
| `--accent-soft` | translucent accent for hover fills |
| `--cat-state` | blue — category hue |
| `--cat-effects` | purple — category hue |
| `--cat-context` | yellow — category hue |
| `--cat-performance` | green — category hue |
| `--cat-utilities` | pink — category hue |

Use **one** accent. The category hues read like syntax highlighting — reach for
them when you render code-like text, sparingly.

### Fonts (CSS vars, wired in `layout.tsx`)

- `font-display` → Space Grotesk — wordmark / large display headings
- `font-sans` → IBM Plex Sans — prose, descriptions
- `font-mono` → IBM Plex Mono — code, counts, labels, anything technical

### Motifs already in the theme (free to reuse)

- `.bracket` — wraps a label in orange `[ ]` brackets (see `globals.css`).
- Faint 64px drafting grid lives on `body`; heroes may lean on it.
- `::selection` is accent-on-dark.
- Respect `prefers-reduced-motion` (already globally dampened, but don't fight
  it with essential animation).

## Layout & structure conventions

- The current hero is a **sticky top band**: `sticky top-0 z-20`, a
  translucent `bg-[var(--bg)]/85` with `backdrop-blur-md`, and a
  `border-b border-[var(--line)]`. Keep sticky behaviour for header-style
  variants; a large "editorial" hero may instead be a non-sticky full section —
  state which in a top-of-file comment.
- Inner content is width-capped and guttered: `mx-auto max-w-5xl px-6`.
  Match this so the hero aligns with `<main>` and the footer.
- Wordmark reference: `Hooks` + accent-colored `Hub`.
- Show the live stats somewhere: `{totalHooks}` hooks · `{categories}`
  categories. Format is yours; keep the numbers accent/ink-dim tinted so they
  pop.

## Accessibility & quality bar

- Use semantic landmarks (`<header>` for header-style, `<section>` with a
  heading for hero-style). One `<h1>` at most, and only if it's the page's
  primary heading — the existing `HeroDemo` already owns an `<h1>` below, so a
  header-style variant should **not** add another `h1`.
- Interactive elements need visible `focus-visible` rings (`ring-2
  ring-[var(--accent)]`) and `aria-label`s where the text isn't self-describing.
- Must render correctly on this dark theme (there is no light mode).
- Mobile-first: no horizontal overflow at 360px; scale display type with
  `clamp()` (see `HeroDemo.tsx` `text-[clamp(...)]` for the pattern).

## Reference implementations to study first

- `src/app/_components/heros/Hero.tsx` — the baseline header band (this spec's
  canonical example).
- `src/app/_components/HeroDemo.tsx` — a *client* hero that is itself a live
  `useState` demo;
  great reference for the code-as-content voice and interactive patterns.

## Voice

HooksHub reads like a warm developer console: destructuring, real signatures,
syntax-highlight color. Copy is terse and technical. Lean into code-shaped
typography (mono, brackets, `const`, `[]`) rather than marketing prose.

## Definition of done

- [ ] File at `heros/<Name>Hero.tsx`, default export, correct prop type.
- [ ] Drop-in: works when `page.tsx` imports it instead of `Hero`.
- [ ] Only existing tokens/fonts/utilities used; no new deps or global CSS.
- [ ] `npm run lint` passes; no TypeScript errors.
- [ ] Responsive down to 360px; focus states and landmarks correct.
- [ ] Top-of-file comment names the variant and any layout deviation.
