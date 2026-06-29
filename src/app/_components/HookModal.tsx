"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { HookCategory, HookItem } from "@/app/_data/hooks";
import { categoryHex } from "@/app/_data/categoryColors";
import { INK_DIM, MUTED } from "@/app/_data/theme";

type Props = {
  selected: { hook: HookItem; category: HookCategory } | null;
  onClose: () => void;
};

/**
 * Native <dialog> — gives us focus trapping, focus restore, Escape-to-close,
 * and inert background for free, with no UI dependency. Styling lives in
 * globals.css (.hook-dialog + ::backdrop).
 */
export default function HookModal({ selected, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    else if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const accent = selected ? categoryHex(selected.category.category) : "#ff6a3d";

  return (
    <dialog
      ref={ref}
      className="hook-dialog"
      onClose={onClose}
      onClick={(e) => {
        // a click whose target is the dialog itself landed on the backdrop
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="hook-dialog-title"
    >
      {selected && (
        <div>
          <div style={{ height: 3, background: accent }} aria-hidden />

          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "18px 24px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <h2
                id="hook-dialog-title"
                style={{
                  margin: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: MUTED }}>[ </span>
                <span style={{ color: accent }}>{selected.hook.name}</span>
                <span style={{ color: MUTED }}> ]</span>
              </h2>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.04em",
                  color: accent,
                  background: `${accent}1f`,
                  border: `1px solid ${accent}3a`,
                  borderRadius: 999,
                  padding: "2px 9px",
                  whiteSpace: "nowrap",
                }}
              >
                {selected.category.category}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="hook-dialog-close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="15" y2="15" />
                <line x1="15" y1="3" x2="3" y2="15" />
              </svg>
            </button>
          </header>

          <div style={{ padding: "20px 24px 26px" }}>
            <p
              style={{
                margin: "0 0 1.75rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: INK_DIM,
              }}
            >
              {selected.hook.desc}
            </p>

            <SectionLabel accent={accent}>Signature</SectionLabel>
            <CodeBlock>{selected.hook.signature}</CodeBlock>

            <SectionLabel accent={accent} style={{ marginTop: "1.5rem" }}>
              Example
            </SectionLabel>
            <CodeBlock>{selected.hook.example}</CodeBlock>
          </div>
        </div>
      )}
    </dialog>
  );
}

function SectionLabel({
  children,
  accent,
  style,
}: {
  children: ReactNode;
  accent: string;
  style?: CSSProperties;
}) {
  return (
    <h3
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: MUTED,
        margin: "0 0 0.65rem",
        ...style,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
      {children}
    </h3>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre
      style={{
        background: "var(--bg-deep)",
        border: "1px solid var(--line)",
        borderRadius: "10px",
        padding: "1rem 1.1rem",
        overflowX: "auto",
        margin: 0,
      }}
    >
      <code
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.75,
          color: "#d8d2c4",
          whiteSpace: "pre",
        }}
      >
        {children}
      </code>
    </pre>
  );
}
