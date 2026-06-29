export type HookItem = {
  name: string;
  desc: string;
  signature: string;
  example: string;
};

export type HookCategory = {
  category: string;
  color: string;
  accent: string;
  border: string;
  items: HookItem[];
};

export const hooks: HookCategory[] = [
  {
    category: "State",
    color: "bg-blue-50 dark:bg-blue-950/30",
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900",
    items: [
      {
        name: "useState",
        desc: "Add local state to a function component. Returns the current state value and a setter function. Re-renders the component whenever the state changes.",
        signature: `function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]`,
        example: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`,
      },
      {
        name: "useReducer",
        desc: "Manage complex state with a reducer function — similar to Redux but local to a component. Preferred over useState when the next state depends on multiple sub-values or complex logic.",
        signature: `function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>]`,
        example: `type Action = { type: 'inc' } | { type: 'dec' } | { type: 'reset' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'inc': return state + 1;
    case 'dec': return state - 1;
    case 'reset': return 0;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  return <button onClick={() => dispatch({ type: 'inc' })}>{count}</button>;
}`,
      },
    ],
  },
  {
    category: "Effects",
    color: "bg-purple-50 dark:bg-purple-950/30",
    accent: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-900",
    items: [
      {
        name: "useEffect",
        desc: "Synchronize a component with an external system — fetch data, subscribe to events, or set up timers. Runs after paint. Return a cleanup function to cancel subscriptions or timers.",
        signature: `function useEffect(effect: EffectCallback, deps?: DependencyList): void`,
        example: `function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data);
    });
    return () => { cancelled = true; };
  }, [userId]);

  return <div>{user?.name}</div>;
}`,
      },
      {
        name: "useLayoutEffect",
        desc: "Fires synchronously after DOM mutations but before the browser paints. Use it to read layout (e.g. element dimensions) and synchronously re-render to avoid visual flicker. Prefer useEffect when possible.",
        signature: `function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void`,
        example: `function Tooltip({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  return <div ref={ref}>{children} — height: {height}px</div>;
}`,
      },
      {
        name: "useInsertionEffect",
        desc: "Fires before any DOM mutations — intended for CSS-in-JS libraries to inject styles before layout effects read them. Not intended for application code; use useEffect or useLayoutEffect instead.",
        signature: `function useInsertionEffect(effect: EffectCallback, deps?: DependencyList): void`,
        example: `// Intended for CSS-in-JS library authors only
function useCSSRule(rule: string) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = rule;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [rule]);
}`,
      },
    ],
  },
  {
    category: "Context & Refs",
    color: "bg-amber-50 dark:bg-amber-950/30",
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-900",
    items: [
      {
        name: "useContext",
        desc: "Read and subscribe to a React context. The component re-renders whenever the context value changes. Replaces the Context.Consumer render-prop pattern.",
        signature: `function useContext<T>(context: Context<T>): T`,
        example: `const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button className={theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white'}>
      Current theme: {theme}
    </button>
  );
}`,
      },
      {
        name: "useRef",
        desc: "Hold a mutable value that persists across renders without triggering re-renders. Commonly used to reference a DOM node, but works for any value you want to persist without causing re-renders.",
        signature: `function useRef<T>(initialValue: T): MutableRefObject<T>
function useRef<T>(initialValue: T | null): RefObject<T>
function useRef<T = undefined>(): MutableRefObject<T | undefined>`,
        example: `function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    videoRef.current?.play();
  }

  return (
    <>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={handlePlay}>Play</button>
    </>
  );
}`,
      },
      {
        name: "useImperativeHandle",
        desc: "Customise the handle exposed via a ref to a parent component. Selectively expose methods instead of the entire DOM node. In React 19 the ref arrives as a regular prop — no forwardRef needed.",
        signature: `function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList
): void`,
        example: `function FancyInput({ ref }: { ref?: Ref<{ focus(): void }> }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  return <input ref={inputRef} />;
}`,
      },
    ],
  },
  {
    category: "Performance",
    color: "bg-green-50 dark:bg-green-950/30",
    accent: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-900",
    items: [
      {
        name: "useMemo",
        desc: "Cache the result of an expensive calculation between renders. Only recomputes when one of the dependencies changes. Do not use for side effects — use useEffect for those.",
        signature: `function useMemo<T>(factory: () => T, deps: DependencyList): T`,
        example: `function ProductList({ products, filter }: Props) {
  const filtered = useMemo(
    () => products.filter(p => p.category === filter),
    [products, filter]
  );

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}`,
      },
      {
        name: "useCallback",
        desc: "Cache a function definition between renders so it keeps the same reference. Useful when passing callbacks to memoised child components or as dependencies in useEffect.",
        signature: `function useCallback<T extends Function>(callback: T, deps: DependencyList): T`,
        example: `function SearchPage() {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((term: string) => {
    setQuery(term);
    analytics.track('search', { term });
  }, []); // stable reference — analytics never changes

  return <SearchBar onSearch={handleSearch} />;
}`,
      },
      {
        name: "useTransition",
        desc: "Mark a state update as non-urgent so React can interrupt it to handle more urgent updates (e.g. typing). Returns [isPending, startTransition] — use isPending to show a loading indicator.",
        signature: `function useTransition(): [isPending: boolean, startTransition: TransitionStartFunction]`,
        example: `function TabSwitcher({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isPending, startTransition] = useTransition();

  function selectTab(tab: Tab) {
    startTransition(() => setActiveTab(tab));
  }

  return (
    <>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => selectTab(tab)}>{tab.label}</button>
      ))}
      {isPending ? <Spinner /> : <TabContent tab={activeTab} />}
    </>
  );
}`,
      },
      {
        name: "useDeferredValue",
        desc: "Defer re-rendering a non-critical part of the UI. React will keep showing the stale value while rendering the new one in the background, preventing the UI from freezing during expensive updates.",
        signature: `function useDeferredValue<T>(value: T, initialValue?: T): T`,
        example: `function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <SlowResultsList query={deferredQuery} />
    </div>
  );
}`,
      },
    ],
  },
  {
    category: "Utilities",
    color: "bg-rose-50 dark:bg-rose-950/30",
    accent: "text-rose-600 dark:text-rose-400",
    border: "border-rose-100 dark:border-rose-900",
    items: [
      {
        name: "useId",
        desc: "Generate a unique, stable ID that is consistent between the server and client. Use it to associate form labels with inputs via htmlFor/id — do not use it as a React list key.",
        signature: `function useId(): string`,
        example: `function EmailField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}`,
      },
      {
        name: "useSyncExternalStore",
        desc: "Subscribe to an external store (e.g. Zustand, Redux, browser APIs) in a way that is safe for concurrent rendering. Preferred over useEffect-based subscriptions for external state.",
        signature: `function useSyncExternalStore<T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T
): T`,
        example: `function useOnlineStatus() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('online', cb);
      window.addEventListener('offline', cb);
      return () => {
        window.removeEventListener('online', cb);
        window.removeEventListener('offline', cb);
      };
    },
    () => navigator.onLine,
    () => true // server snapshot
  );
}`,
      },
      {
        name: "useDebugValue",
        desc: "Add a label to a custom hook so it appears in React DevTools. Accepts an optional formatter function that is only called when DevTools is open, avoiding expensive formatting in production.",
        signature: `function useDebugValue<T>(value: T, format?: (value: T) => unknown): void`,
        example: `function useAuth() {
  const user = useUser();
  useDebugValue(user, u => u ? \`Logged in as \${u.email}\` : 'Logged out');
  return user;
}`,
      },
      {
        name: "useActionState",
        desc: "Track the state returned by a form action (React 19+). Returns [state, formAction, isPending]. Replaces the useFormState pattern from the react-dom package.",
        signature: `function useActionState<State>(
  action: (state: Awaited<State>, payload: FormData) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string
): [state: Awaited<State>, dispatch: (payload: FormData) => void, isPending: boolean]`,
        example: `async function submitForm(prev: string, data: FormData) {
  const name = data.get('name') as string;
  await saveName(name);
  return \`Saved: \${name}\`;
}

function Form() {
  const [message, action, isPending] = useActionState(submitForm, '');
  return (
    <form action={action}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      {message && <p>{message}</p>}
    </form>
  );
}`,
      },
      {
        name: "useOptimistic",
        desc: "Show a temporary optimistic value while an async action is in progress (React 19+). Automatically reverts to the real value once the action settles.",
        signature: `function useOptimistic<State, Action>(
  state: State,
  updateFn: (currentState: State, optimisticValue: Action) => State
): [optimisticState: State, addOptimistic: (action: Action) => void]`,
        example: `function LikeButton({ post }: { post: Post }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (current, delta: number) => current + delta
  );

  async function handleLike() {
    addOptimisticLike(1);
    await likePost(post.id);
  }

  return <button onClick={handleLike}>{optimisticLikes} likes</button>;
}`,
      },
    ],
  },
];
