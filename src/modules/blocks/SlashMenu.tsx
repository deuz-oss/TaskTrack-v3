"use client";

import { BLOCK_LIBRARY, BlockType } from "./types";

export interface SlashMenuProps {
  query: string;
  onPick: (type: BlockType) => void;
}

/**
 * Basic block command menu (Phase 1). Smart blocks (/task, /meeting,
 * /employee, /approval, /invoice, /payroll, /document, /knowledge,
 * /embed-dashboard) plug into this same component in Phase 3, once the
 * Relation System exists to back them with real data.
 */
export function SlashMenu({ query, onPick }: SlashMenuProps) {
  const filtered = BLOCK_LIBRARY.filter((b) =>
    b.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute left-5 top-7 z-50 w-72 rounded-lg border border-neutral-200 bg-white py-1.5 shadow-lg">
      <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
        Basic blocks
      </div>
      {filtered.length === 0 && (
        <div className="px-3 py-2 text-sm text-neutral-400">No results</div>
      )}
      {filtered.map((b) => (
        <button
          key={b.type}
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(b.type);
          }}
          className="flex w-full items-center gap-3 px-3 py-1.5 text-left hover:bg-neutral-50"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-600">
            {b.label.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-sm text-neutral-800">{b.label}</div>
            <div className="text-xs text-neutral-400">{b.hint}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
