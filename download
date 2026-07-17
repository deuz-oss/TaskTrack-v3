"use client";

import { useState } from "react";
import { Block, BlockType, emptyBlock } from "@/modules/blocks/types";
import { BlockRenderer } from "@/modules/blocks/BlockRenderer";
import { SlashMenu } from "@/modules/blocks/SlashMenu";

export interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
  /** Set by the host page (e.g. TaskPage) once persistence is wired up. */
  readOnly?: boolean;
}

/**
 * The reusable Block Editor used by every object page (Task, Meeting,
 * Project, Client, ...). Content is always a Block[] tree persisted as
 * JSON — never raw HTML, never a <textarea>.
 */
export function BlockEditor({ blocks, onChange, readOnly }: BlockEditorProps) {
  const [focusId, setFocusId] = useState<string | null>(null);
  const [slashForBlock, setSlashForBlock] = useState<string | null>(null);

  const updateBlock = (id: string, patch: Partial<Block>) => {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const insertAfter = (id: string, type: BlockType = "paragraph") => {
    const idx = blocks.findIndex((b) => b.id === id);
    const next = emptyBlock(type);
    const copy = [...blocks];
    copy.splice(idx + 1, 0, next);
    onChange(copy);
    setFocusId(next.id);
  };

  const removeBlock = (id: string) => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx <= 0) return; // keep at least one block
    const prev = blocks[idx - 1];
    onChange(blocks.filter((b) => b.id !== id));
    setFocusId(prev.id);
  };

  const changeType = (id: string, type: BlockType) => {
    updateBlock(id, { type, content: "" });
    setSlashForBlock(null);
    setFocusId(id);
  };

  return (
    <div className="space-y-0.5">
      {blocks.map((block) => (
        <div key={block.id} className="group relative">
          <BlockRenderer
            block={block}
            readOnly={readOnly}
            autoFocus={focusId === block.id}
            onChange={(patch) => updateBlock(block.id, patch)}
            onEnter={() => insertAfter(block.id)}
            onBackspaceEmpty={() => removeBlock(block.id)}
            onSlashOpen={() => setSlashForBlock(block.id)}
            onSlashClose={() => setSlashForBlock(null)}
          />
          {slashForBlock === block.id && (
            <SlashMenu
              query={block.content.startsWith("/") ? block.content.slice(1) : ""}
              onPick={(type) => changeType(block.id, type)}
            />
          )}
        </div>
      ))}
      {!readOnly && (
        <div
          onClick={() => insertAfter(blocks[blocks.length - 1]?.id)}
          className="cursor-text px-1 py-1.5 text-sm text-neutral-400"
        >
          Click to continue, or type &quot;/&quot; for commands
        </div>
      )}
    </div>
  );
}
