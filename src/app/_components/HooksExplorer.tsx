"use client";

import { useMemo, useState } from "react";
import type { HookCategory, HookItem } from "@/app/_data/hooks";
import { categoryColor } from "@/app/_data/categoryColors";
import HookModal from "./HookModal";

type Selected = { hook: HookItem; category: HookCategory } | null;

export default function HooksExplorer({ hooks }: { hooks: HookCategory[] }) {
  const [selected, setSelected] = useState<Selected>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hooks;

    return hooks.reduce<HookCategory[]>((acc, category) => {
      const categoryMatches = category.category.toLowerCase().includes(q);
      const items = categoryMatches
        ? category.items
        : category.items.filter(
            (hook) =>
              hook.name.toLowerCase().includes(q) ||
              hook.desc.toLowerCase().includes(q),
          );

      if (items.length > 0) acc.push({ ...category, items });
      return acc;
    }, []);
  }, [hooks, query]);

  return (
    <>
      <div className="space-y-12">
        {/* Search */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-[color:var(--accent)]">
            /
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter hooks"
            placeholder="filter hooks by name or behavior"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] py-3.5 pl-9 pr-4 font-mono text-sm text-[color:var(--ink)] placeholder:text-[color:var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm text-[color:var(--muted)]">
            <span className="text-[color:var(--accent)]">0</span> hooks match
            &ldquo;{query.trim()}&rdquo;
          </p>
        ) : (
          filtered.map((category) => {
            const color = categoryColor(category.category);
            return (
              <section key={category.category} className="space-y-5">
                <div className="flex items-baseline gap-3 border-b border-[var(--line)] pb-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 self-center rounded-full"
                    style={{ background: color }}
                    aria-hidden
                  />
                  <h2 className="font-display text-xl font-semibold tracking-tight text-[color:var(--ink)]">
                    {category.category}
                  </h2>
                  <span className="font-mono text-xs text-[color:var(--muted)]">
                    {category.items.length} hook
                    {category.items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((hook) => (
                    <button
                      key={hook.name}
                      type="button"
                      onClick={() => setSelected({ hook, category })}
                      className="group relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 text-left outline-none transition-all hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      {/* category color spine */}
                      <span
                        className="absolute inset-y-0 left-0 w-[3px] opacity-60 transition-opacity group-hover:opacity-100"
                        style={{ background: color }}
                        aria-hidden
                      />
                      <p className="font-mono text-sm font-medium">
                        <span className="text-[color:var(--muted)]">[ </span>
                        <span style={{ color }}>{hook.name}</span>
                        <span className="text-[color:var(--muted)]"> ]</span>
                      </p>
                      <p className="mt-2.5 line-clamp-3 font-sans text-[13px] leading-relaxed text-[color:var(--ink-dim)]">
                        {hook.desc}
                      </p>
                      <span className="mt-3 inline-block font-mono text-xs text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100">
                        signature &amp; example{" "}
                        <span className="text-[color:var(--accent)]">→</span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      <HookModal selected={selected} onClose={() => setSelected(null)} />
    </>
  );
}
