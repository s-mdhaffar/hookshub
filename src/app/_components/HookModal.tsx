"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import type { CSSProperties, ReactNode } from "react";
import type { HookCategory, HookItem } from "@/app/_data/hooks";
import { categoryHex } from "@/app/_data/categoryColors";

type Props = {
  selected: { hook: HookItem; category: HookCategory } | null;
  onClose: () => void;
};

const SURFACE = "#1c1a15";
const LINE = "#322e26";
const INK = "#ece7da";
const INK_DIM = "#b6ae9c";
const MUTED = "#8c8472";

export default function HookModal({ selected, onClose }: Props) {
  const accent = selected ? categoryHex(selected.category.category) : "#ff6a3d";

  return (
    <Dialog
      open={!!selected}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: { sx: { backgroundColor: "#0a0908cc", backdropFilter: "blur(2px)" } },
        paper: {
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: SURFACE,
            backgroundImage: "none",
            color: INK,
            border: `1px solid ${LINE}`,
            boxShadow: "0 24px 80px -20px #000000cc",
          },
        },
      }}
    >
      {selected && (
        <>
          {/* category color rule along the top */}
          <div style={{ height: 3, background: accent }} aria-hidden />

          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              px: 3,
              py: 2.25,
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: MUTED }}>[ </span>
                <span style={{ color: accent }}>{selected.hook.name}</span>
                <span style={{ color: MUTED }}> ]</span>
              </span>
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
            <IconButton
              onClick={onClose}
              aria-label="Close"
              size="small"
              sx={{ color: MUTED, "&:hover": { color: INK, background: "#ffffff14" } }}
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
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ px: 3, pt: 2.5, pb: 3.25 }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: INK_DIM,
                marginBottom: "1.75rem",
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
          </DialogContent>
        </>
      )}
    </Dialog>
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
        background: "#100f0c",
        border: `1px solid ${LINE}`,
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
