const hooks = [
  {
    category: "State",
    color: "bg-blue-50 dark:bg-blue-950/30",
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900",
    items: [
      { name: "useState", desc: "Add local state to a function component." },
      { name: "useReducer", desc: "Manage complex state with a reducer function." },
    ],
  },
  {
    category: "Effects",
    color: "bg-purple-50 dark:bg-purple-950/30",
    accent: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-900",
    items: [
      { name: "useEffect", desc: "Synchronize a component with an external system." },
      { name: "useLayoutEffect", desc: "Fire synchronously after DOM mutations, before paint." },
      { name: "useInsertionEffect", desc: "Insert styles before any DOM mutations." },
    ],
  },
  {
    category: "Context & Refs",
    color: "bg-amber-50 dark:bg-amber-950/30",
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-900",
    items: [
      { name: "useContext", desc: "Read and subscribe to a context value." },
      { name: "useRef", desc: "Reference a value that doesn't trigger re-renders." },
      { name: "useImperativeHandle", desc: "Customize the handle exposed by a ref." },
    ],
  },
  {
    category: "Performance",
    color: "bg-green-50 dark:bg-green-950/30",
    accent: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-900",
    items: [
      { name: "useMemo", desc: "Cache the result of an expensive calculation." },
      { name: "useCallback", desc: "Cache a function definition between renders." },
      { name: "useTransition", desc: "Update state without blocking the UI." },
      { name: "useDeferredValue", desc: "Defer re-rendering a non-critical part of the UI." },
    ],
  },
  {
    category: "Utilities",
    color: "bg-rose-50 dark:bg-rose-950/30",
    accent: "text-rose-600 dark:text-rose-400",
    border: "border-rose-100 dark:border-rose-900",
    items: [
      { name: "useId", desc: "Generate unique IDs for accessibility attributes." },
      { name: "useSyncExternalStore", desc: "Subscribe to an external store." },
      { name: "useDebugValue", desc: "Label custom hooks in React DevTools." },
      { name: "useActionState", desc: "Track state from a form action." },
      { name: "useOptimistic", desc: "Optimistically update UI during async operations." },
    ],
  },
];

export default function Home() {
  const totalHooks = hooks.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Hooks<span className="text-blue-600 dark:text-blue-400">Hub</span>
            </span>
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 font-[family-name:var(--font-geist-mono)]">
            {totalHooks} hooks
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 space-y-16">
        {/* Hero */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            React Hooks, all in one place.
          </h1>
          <p className="max-w-xl text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Browse every built-in React hook, understand when to reach for each one, and explore
            interactive demos right in the browser.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              React 19
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {hooks.length} categories
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {totalHooks} hooks
            </span>
          </div>
        </section>

        {/* Hook categories */}
        {hooks.map((category) => (
          <section key={category.category} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {category.category}
              </h2>
              <span className={`text-xs font-medium ${category.accent} font-[family-name:var(--font-geist-mono)]`}>
                {category.items.length} hook{category.items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((hook) => (
                <div
                  key={hook.name}
                  className={`group rounded-xl border ${category.border} ${category.color} p-5 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}
                >
                  <p className={`font-[family-name:var(--font-geist-mono)] text-sm font-semibold ${category.accent} mb-2`}>
                    {hook.name}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {hook.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
          HooksHub — built with Next.js 16 &amp; React 19
        </div>
      </footer>
    </div>
  );
}
