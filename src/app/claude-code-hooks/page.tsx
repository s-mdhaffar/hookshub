import type { Metadata } from "next";
import Link from "next/link";
import {
  claudeCodeHookRepos,
  singlePurposeNotes,
  topicUrl,
} from "@/app/_data/claudeCodeHooks";

export const metadata: Metadata = {
  title: "Claude Code hooks — a repo survey | HooksHub",
  description:
    "The top GitHub repos built around Claude Code's hooks feature — config packs, discovery lists, and hook-focused references, ranked roughly by stars.",
};

const CATEGORY_COLOR: Record<string, string> = {
  "Config packs": "var(--cat-state)",
  "Discovery lists": "var(--cat-context)",
  "Hook-focused": "var(--cat-effects)",
};

export default function ClaudeCodeHooksPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-3">
          <Link
            href="/"
            className="font-mono text-xs text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)]"
          >
            ← React hooks
          </Link>
          <span className="ml-auto font-display text-sm font-semibold tracking-tight text-[color:var(--ink)]">
            Hooks<span className="text-[color:var(--accent)]">Hub</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <section className="pt-4">
          <p className="font-display text-lg italic tracking-tight text-[color:var(--ink-dim)]">
            The other kind of hooks
          </p>

          <h1 className="mt-4 font-display text-[clamp(1.9rem,5.5vw,3.25rem)] font-semibold leading-[1.15] tracking-tight text-[color:var(--ink)]">
            Claude Code hooks, catalogued
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-[15px] leading-relaxed text-[color:var(--ink-dim)]">
            The top GitHub repos built around Claude Code&apos;s hooks feature
            (<span className="font-mono text-sm">PreToolUse</span>,{" "}
            <span className="font-mono text-sm">PostToolUse</span>,{" "}
            <span className="font-mono text-sm">SessionStart</span>,{" "}
            <span className="font-mono text-sm">UserPromptSubmit</span>, and
            friends) — split into all-in-one config packs, discovery lists,
            and repos that focus on hooks specifically. Ranked roughly by
            stars.
          </p>
        </section>

        <div className="mt-16 space-y-14">
          {claudeCodeHookRepos.map((group) => {
            const color = CATEGORY_COLOR[group.category] ?? "var(--accent)";
            return (
              <section key={group.category} className="space-y-5">
                <div className="border-b border-[var(--line)] pb-3">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 self-center rounded-full"
                      style={{ background: color }}
                      aria-hidden
                    />
                    <h2 className="font-display text-xl font-semibold tracking-tight text-[color:var(--ink)]">
                      {group.category}
                    </h2>
                    <span className="font-mono text-xs text-[color:var(--muted)]">
                      {group.items.length} repo
                      {group.items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="mt-1.5 font-sans text-[13px] text-[color:var(--muted)]">
                    {group.blurb}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {group.items.map((repo) => (
                    <a
                      key={repo.slug}
                      href={`https://github.com/${repo.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 outline-none transition-all hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] hover:shadow-[0_12px_28px_-16px_#1f1e1b40] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-[3px] opacity-60 transition-opacity group-hover:opacity-100"
                        style={{ background: color }}
                        aria-hidden
                      />

                      <p className="font-mono text-sm font-medium">
                        <span className="text-[color:var(--muted)]">[ </span>
                        <span style={{ color }}>{repo.name}</span>
                        <span className="text-[color:var(--muted)]"> ]</span>
                      </p>

                      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 font-mono text-xs text-[color:var(--muted)]">
                        <span>{repo.slug}</span>
                        {repo.stars !== "—" && (
                          <>
                            <span className="text-[color:var(--line-strong)]">·</span>
                            <span>{repo.stars}</span>
                          </>
                        )}
                      </p>

                      <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-[color:var(--ink-dim)]">
                        {repo.desc}
                      </p>

                      {repo.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {repo.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex gap-2 font-mono text-[11px] leading-relaxed text-[color:var(--muted)]"
                            >
                              <span style={{ color }}>·</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <span className="mt-3 inline-block font-mono text-xs text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100">
                        view on GitHub{" "}
                        <span className="text-[color:var(--accent)]">→</span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-14 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <h2 className="font-display text-lg font-semibold tracking-tight text-[color:var(--ink)]">
            Also worth noting
          </h2>
          <p className="mt-1.5 font-sans text-[13px] text-[color:var(--muted)]">
            Sharp single-purpose hook repos from the{" "}
            <a
              href={topicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--accent)] underline decoration-[var(--line-strong)] underline-offset-2 hover:decoration-[var(--accent)]"
            >
              claude-code-hooks topic page
            </a>
            :
          </p>
          <ul className="mt-3 space-y-1.5">
            {singlePurposeNotes.map((note) => (
              <li
                key={note}
                className="flex gap-2 font-sans text-[13px] leading-relaxed text-[color:var(--ink-dim)]"
              >
                <span className="text-[color:var(--accent)]">–</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-10 font-mono text-xs text-[color:var(--muted)]">
          <span>
            <span className="text-[color:var(--accent)]">return</span> &lt;HooksHub
            /&gt;;
          </span>
          <span className="text-[color:var(--line-strong)]">
            Next.js 16 · React 19
          </span>
        </div>
      </footer>
    </div>
  );
}
