/**
 * TerminalHero — a shell-prompt take on the sticky header band.
 * Terminal chrome (traffic-light dots + a ~/hookshub path), a "typed"
 * `npx hookshub --list` command with a CSS-only blinking caret, and the live
 * stats rendered as a terminal status/output line.
 *
 * Layout: keeps the baseline sticky-band pattern (sticky top-0 z-20, blurred
 * translucent bg, bottom hairline). Server component — no interactivity; the
 * caret is a pure CSS animation that respects the global prefers-reduced-motion
 * dampening. No <h1> (the page's HeroDemo owns it below).
 */

type HeroProps = { totalHooks: number; categories: number };

export default function TerminalHero({ totalHooks, categories }: HeroProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 py-3">
        {/* terminal chrome: traffic lights + path label + wordmark */}
        <div className="flex items-center gap-3 text-[color:var(--muted)]">
          <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--cat-utilities)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--cat-context)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--cat-performance)]/70" />
          </span>
          <span className="font-mono text-xs text-[color:var(--muted)]">~/hookshub</span>
          <span className="ml-auto font-display text-sm font-semibold tracking-tight text-[color:var(--ink)]">
            Hooks<span className="text-[color:var(--accent)]">Hub</span>
          </span>
        </div>

        {/* the prompt: a "typed" command with a blinking caret */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[clamp(0.85rem,3.5vw,1.05rem)] leading-tight">
          <span aria-hidden="true" className="select-none text-[color:var(--accent)]">
            $
          </span>
          <span className="text-[color:var(--ink)]">
            npx{" "}
            <span className="text-[color:var(--cat-state)]">hookshub</span>{" "}
            <span className="text-[color:var(--cat-context)]">--list</span>
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-[1.05em] w-[0.55ch] translate-y-[0.15em] bg-[var(--accent)] motion-safe:animate-pulse"
          />
        </div>

        {/* stats rendered as terminal output / status line */}
        <p className="mt-1.5 font-mono text-xs text-[color:var(--muted)]">
          <span aria-hidden="true" className="select-none text-[color:var(--ink-dim)]">
            ➜{" "}
          </span>
          <span className="text-[color:var(--accent)]">{totalHooks}</span> hooks
          {" · "}
          <span className="text-[color:var(--ink-dim)]">{categories}</span> categories
          {" "}
          <span className="text-[color:var(--muted)]">indexed</span>
        </p>
      </div>
    </header>
  );
}
