// Curated GitHub repos built around Claude Code's hooks feature (PreToolUse,
// PostToolUse, SessionStart, UserPromptSubmit, etc) — as distinct from the
// React hooks this site otherwise catalogs. Grouped the way they were
// surveyed: big all-in-one config packs, pure discovery/index lists, and
// repos that focus specifically on hooks.

export type RepoItem = {
  name: string;
  slug: string; // "owner/repo" on GitHub
  stars: string;
  desc: string;
  highlights: string[];
};

export type RepoCategory = {
  category: string;
  blurb: string;
  items: RepoItem[];
};

export const claudeCodeHookRepos: RepoCategory[] = [
  {
    category: "Config packs",
    blurb:
      "All-in-one bundles that ship hooks alongside agents, skills, and slash commands.",
    items: [
      {
        name: "Everything Claude Code",
        slug: "affaan-m/everything-claude-code",
        stars: "~32K–170K ★ (reported inconsistently)",
        desc: "Grew out of an Anthropic hackathon project into the largest pack of the bunch — 48 agents, 184 skills, hooks, rules, and security scanning.",
        highlights: [
          "PreToolUse hooks block --no-verify git flags",
          'Detects secrets in prompts (patterns like "sk-", "ghp_", "AKIA")',
          "Stops agents from editing linter configs instead of fixing code",
          "hooks.json wires PreToolUse, PostToolUse, SessionStart, SessionEnd",
        ],
      },
      {
        name: "awesome-claude-code-toolkit",
        slug: "rohitg00/awesome-claude-code-toolkit",
        stars: "—",
        desc: "An installable pack, not just a link list — 135 agents, 35 curated skills, 42 commands, 176+ plugins, 20 hooks, 15 rules, 7 templates, 14 MCP configs.",
        highlights: ["Working hooks you can drop in immediately"],
      },
      {
        name: "claude-code-best-practice",
        slug: "shanraisshan/claude-code-best-practice",
        stars: "~26.5K ★",
        desc: "A living reference implementation of Claude Code configuration patterns — commands, agents, skills, hooks, and orchestration workflows with working examples.",
        highlights: ["Covers hook patterns among other orchestration concerns"],
      },
      {
        name: "claude-code-ultimate-guide",
        slug: "FlorianBruniaux/claude-code-ultimate-guide",
        stars: "—",
        desc: "A documentation-heavy repo — 225 production-ready templates, 9 custom AI personas, 26 slash commands, 31 hooks, 14 skills. More learning resource than plug-in pack.",
        highlights: [],
      },
    ],
  },
  {
    category: "Discovery lists",
    blurb: "Best for browsing hook repos by category rather than installing one directly.",
    items: [
      {
        name: "awesome-claude-code",
        slug: "hesreallyhim/awesome-claude-code",
        stars: "~42K+ ★",
        desc: "The canonical curated list, with dedicated sections for skills, hooks, and orchestrators. The best-maintained index — the curator cuts tools that don't work.",
        highlights: [],
      },
    ],
  },
  {
    category: "Hook-focused",
    blurb: "Repos explicitly scoped to hooks rather than a full agent/skill bundle.",
    items: [
      {
        name: "awesome-claude-code",
        slug: "pascalporedda/awesome-claude-code",
        stars: "—",
        desc: "A smaller repo explicitly trying to be a hub just for hooks. A good, minimal, readable reference for how hooks are wired.",
        highlights: [
          "Notification, Stop, and SubagentStop hooks",
          "Event logging",
          "Cross-platform sound support",
        ],
      },
    ],
  },
];

// Mentioned without a specific repo slug — listed for context, not linked.
export const singlePurposeNotes: string[] = [
  "A PreToolUse hook that scans tool inputs for secrets before the AI sees them.",
  "A UserPromptSubmit hook that routes prompts to the right memory files instead of carpet-bombing context.",
];

export const topicUrl = "https://github.com/topics/claude-code-hooks?o=desc&s=stars";
