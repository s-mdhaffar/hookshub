import { hooks } from "@/app/_data/hooks";
import HooksExplorer from "@/app/_components/HooksExplorer";
import HeroDemo from "@/app/_components/HeroDemo";

export default function Home() {
  const totalHooks = hooks.reduce((sum, cat) => sum + cat.items.length, 0);
  const names = hooks.flatMap((cat) => cat.items.map((h) => h.name));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-display text-lg font-semibold tracking-tight">
            Hooks<span className="text-[color:var(--accent)]">Hub</span>
          </span>
          <span className="font-mono text-xs text-[color:var(--muted)]">
            <span className="text-[color:var(--accent)]">{totalHooks}</span> hooks
            {" · "}
            <span className="text-[color:var(--ink-dim)]">{hooks.length}</span>{" "}
            categories
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <HeroDemo names={names} />

        <div className="mt-20">
          <HooksExplorer hooks={hooks} />
        </div>
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
