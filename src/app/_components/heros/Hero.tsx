type HeroProps = {
  /** Total number of hooks across all categories. */
  totalHooks: number;
  /** Number of hook categories. */
  categories: number | any;
};

/**
 * Site header / hero band. Sticky, translucent, with the wordmark on the
 * left and a live count on the right.
 *
 * This is the baseline hero — variants live alongside it in this directory
 * and share the same prop contract (see hero.specs.md).
 */
export default function Hero({ totalHooks, categories }: HeroProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-semibold tracking-tight">
          Hooks<span className="text-[color:var(--accent)]">Hub</span>
        </span>
        <span className="font-mono text-xs text-[color:var(--muted)]">
          <span className="text-[color:var(--accent)]">{totalHooks}</span> hooks
          {" · "}
          <span className="text-[color:var(--ink-dim)]">{categories}</span>{" "}
          categories
        </span>
      </div>
    </header>
  );
}
