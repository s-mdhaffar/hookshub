// One source of truth for category accent colors, keyed by category name.
// Hues read like a syntax-highlight palette — apt for a code reference.

export const CATEGORY_COLOR: Record<string, string> = {
  State: "var(--cat-state)",
  Effects: "var(--cat-effects)",
  "Context & Refs": "var(--cat-context)",
  Performance: "var(--cat-performance)",
  Utilities: "var(--cat-utilities)",
};

export function categoryColor(name: string): string {
  return CATEGORY_COLOR[name] ?? "var(--accent)";
}

// Concrete hex equivalents — for contexts that can't resolve CSS vars
// or need alpha blends (e.g. MUI sx).
export const CATEGORY_HEX: Record<string, string> = {
  State: "#5eb1ff",
  Effects: "#c792ea",
  "Context & Refs": "#f5c451",
  Performance: "#5dd9a8",
  Utilities: "#ff7a9a",
};

export function categoryHex(name: string): string {
  return CATEGORY_HEX[name] ?? "#ff6a3d";
}
