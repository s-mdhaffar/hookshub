/**
 * EditorialHero — the "big editorial" hero variant.
 *
 * Magazine-masthead energy in the warm-console theme: an oversized
 * `font-display` statement headline (clamp-scaled), a `font-sans` deck, and the
 * live stats rendered as a rule-separated editorial stat line in mono.
 *
 * LAYOUT DEVIATION: unlike the baseline Hero (a sticky top band), this variant
 * is NON-STICKY — a large full-width `<section>` that leans on the drafting
 * grid. It also uses an `<h2>` (not `<h1>`) because the page's HeroDemo below
 * already owns the single `<h1>`. Server component, static.
 */

type HeroProps = {
  totalHooks: number;
  categories: number;
};

export default function EditorialHero({ totalHooks, categories }: HeroProps) {
  return (
    <section className="w-full border-b border-[var(--line)] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="bracket inline-block font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
          The React hooks field guide
        </p>

        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.2rem,8vw,5rem)] font-semibold leading-[1.02] tracking-tight text-[color:var(--ink)]">
          Every hook,
          <br />
          <span className="text-[color:var(--muted)]">destructured.</span>
        </h2>

        <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-[color:var(--ink-dim)] sm:text-lg">
          A working reference for React&apos;s built-in hooks — each with its
          real signature and a runnable example. No prose padding, just the
          console you&apos;d actually reach for.
        </p>

        {/* editorial stat line — rule-separated figures, mono */}
        <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-6 font-mono">
          <div className="flex items-baseline gap-2">
            <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Hooks
            </dt>
            <dd className="text-2xl font-medium text-[color:var(--accent)] tabular-nums">
              {totalHooks}
            </dd>
          </div>

          <span aria-hidden="true" className="h-8 w-px bg-[var(--line-strong)]" />

          <div className="flex items-baseline gap-2">
            <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Categories
            </dt>
            <dd className="text-2xl font-medium text-[color:var(--ink-dim)] tabular-nums">
              {categories}
            </dd>
          </div>

          <span
            aria-hidden="true"
            className="ml-auto hidden font-display text-lg font-semibold tracking-tight text-[color:var(--ink)] sm:inline"
          >
            Hooks<span className="text-[color:var(--accent)]">Hub</span>
          </span>
        </dl>
      </div>
    </section>
  );
}
