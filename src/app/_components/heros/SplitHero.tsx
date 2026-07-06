/**
 * SplitHero — sticky header band, two-column split.
 * Left: wordmark + tagline prose. Right: a mono "code panel" that renders the
 * live stats as a destructured object literal, syntax-highlighted with the
 * category hues. --accent stays the single signal accent.
 * Layout deviation: the inner band is a responsive grid — it stacks to a
 * single column below `sm` (mobile-first, no horizontal overflow at 360px).
 */

type HeroProps = {
  totalHooks: number;
  categories: number;
};

export default function SplitHero({ totalHooks, categories }: HeroProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-x-8 gap-y-4 px-6 py-5 sm:grid-cols-[1fr_auto]">
        {/* Left: wordmark + tagline */}
        <div className="min-w-0">
          <span className="font-display text-[clamp(1.25rem,4vw,1.75rem)] font-semibold tracking-tight">
            Hooks<span className="text-[color:var(--accent)]">Hub</span>
          </span>
          <p className="mt-1 max-w-xs font-sans text-sm leading-snug text-[color:var(--ink-dim)]">
            Every React hook, destructured — real signatures, runnable examples.
          </p>
        </div>

        {/* Right: destructured-object code panel */}
        <div className="min-w-0 rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            <span className="bracket">live</span>
          </p>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
            <code>
              <span className="text-[color:var(--muted)]">const </span>
              <span className="text-[color:var(--accent)]">{"{ "}</span>
              <span className="text-[color:var(--cat-state)]">hooks</span>
              <span className="text-[color:var(--muted)]">, </span>
              <span className="text-[color:var(--cat-effects)]">categories</span>
              <span className="text-[color:var(--accent)]">{" }"}</span>
              <span className="text-[color:var(--muted)]"> = </span>
              <span className="text-[color:var(--cat-context)]">HooksHub</span>
              {"\n"}
              <span className="text-[color:var(--cat-state)]">hooks</span>
              <span className="text-[color:var(--muted)]">{"      // "}</span>
              <span className="text-[color:var(--accent)]">{totalHooks}</span>
              {"\n"}
              <span className="text-[color:var(--cat-effects)]">categories</span>
              <span className="text-[color:var(--muted)]">{" // "}</span>
              <span className="text-[color:var(--ink-dim)]">{categories}</span>
            </code>
          </pre>
        </div>
      </div>
    </header>
  );
}
