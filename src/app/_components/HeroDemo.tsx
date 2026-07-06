"use client";

import { useState } from "react";

/**
 * The hero is itself a working useState demo: clicking the value calls the
 * setter, cycles to the next hook name, and bumps a real render counter —
 * the page opens by demonstrating its own subject.
 */
export default function HeroDemo({ names }: { names: string[] }) {
  const pool = names.length ? names : ["useState"];
  const [index, setIndex] = useState(0);
  const [calls, setCalls] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1) % pool.length);
    setCalls((c) => c + 1);
  };

  return (
    <section className="pt-4">
      <p className="font-display text-lg italic tracking-tight text-[color:var(--ink-dim)]">
        A field guide to React hooks
      </p>

      <h1 className="mt-7 font-mono text-[clamp(1.6rem,6vw,3.75rem)] font-medium leading-[1.15] tracking-tight">
        <span className="text-[color:var(--muted)]">const </span>
        <span className="text-[color:var(--accent)]">[ </span>
        <span className="text-[color:var(--ink)]">hook</span>
        <span className="text-[color:var(--muted)]">, </span>
        <span className="text-[color:var(--ink-dim)]">setHook</span>
        <span className="text-[color:var(--accent)]"> ]</span>
        <span className="text-[color:var(--muted)]"> = </span>
        <span className="text-[color:var(--cat-state)]">useState</span>
        <span className="text-[color:var(--muted)]">(</span>
        <button
          type="button"
          onClick={next}
          aria-label="Call setHook to cycle the value and re-render"
          className="group relative mx-1 rounded-md px-2 py-0.5 text-[color:var(--cat-utilities)] outline-none transition-colors hover:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span className="text-[color:var(--muted)]">&quot;</span>
          {pool[index]}
          <span className="text-[color:var(--muted)]">&quot;</span>
        </button>
        <span className="text-[color:var(--muted)]">)</span>
      </h1>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="max-w-md font-sans text-[15px] leading-relaxed text-[color:var(--ink-dim)]">
          Every built-in hook, with its real signature and a runnable example.
          Tap the value above — that&apos;s a live{" "}
          <span className="font-mono text-[color:var(--cat-state)]">useState</span>{" "}
          re-rendering this page.
        </p>
        <span
          aria-live="polite"
          className="shrink-0 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[color:var(--muted)]"
        >
          setHook called{" "}
          <span className="text-[color:var(--accent)]">{calls}×</span>
        </span>
      </div>
    </section>
  );
}
