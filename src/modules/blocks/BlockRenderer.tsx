"use client";

import { useEffect, useRef, useState } from "react";
import { Block } from "./types";
import { cn } from "@/lib/utils";

export interface BlockRendererProps {
  block: Block;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange: (patch: Partial<Block>) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onSlashOpen: () => void;
  onSlashClose: () => void;
}

/**
 * Renders exactly one Block. Text-like blocks use a contentEditable div
 * (not a <textarea>) so multiple block types can share one consistent,
 * inline-editable text primitive — matching the Notion-style editing
 * model requested for TaskTrack.
 */
export function BlockRenderer({
  block,
  readOnly,
  autoFocus,
  onChange,
  onEnter,
  onBackspaceEmpty,
  onSlashOpen,
  onSlashClose,
}: BlockRendererProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true); // for toggle blocks

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent ?? "";
    onChange({ content: text });
    if (text.startsWith("/")) onSlashOpen();
    else onSlashClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    } else if (e.key === "Backspace" && e.currentTarget.textContent === "") {
      e.preventDefault();
      onBackspaceEmpty();
    } else if (e.key === "Escape") {
      onSlashClose();
    }
  };

  const editableProps = readOnly
    ? {}
    : {
        contentEditable: true,
        suppressContentEditableWarning: true,
        onInput: handleInput,
        onKeyDown: handleKeyDown,
      };

  const textClass = "outline-none min-h-[1.5em] leading-relaxed";

  switch (block.type) {
    case "divider":
      return <div className="my-2 border-t border-neutral-200" />;

    case "callout":
      return (
        <div className="flex items-start gap-3 rounded-md bg-neutral-50 px-3.5 py-3">
          <span>💡</span>
          <div ref={ref} {...editableProps} className={cn(textClass, "flex-1 text-[15px] text-neutral-800")}>
            {block.content}
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="border-l-[3px] border-neutral-900 pl-3">
          <div ref={ref} {...editableProps} className={cn(textClass, "text-[15px] italic text-neutral-800")}>
            {block.content}
          </div>
        </div>
      );

    case "checklist":
      return (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={!!block.checked}
            onChange={(e) => onChange({ checked: e.target.checked })}
            className="mt-1.5 h-4 w-4 cursor-pointer accent-neutral-900"
          />
          <div
            ref={ref}
            {...editableProps}
            className={cn(
              textClass,
              "flex-1 text-[15px]",
              block.checked ? "text-neutral-400 line-through" : "text-neutral-800"
            )}
          >
            {block.content}
          </div>
        </div>
      );

    case "bulleted_list":
    case "numbered_list":
      return (
        <div className="flex gap-2">
          <span className="text-[15px] text-neutral-500">{block.type === "bulleted_list" ? "•" : "1."}</span>
          <div ref={ref} {...editableProps} className={cn(textClass, "flex-1 text-[15px] text-neutral-800")}>
            {block.content}
          </div>
        </div>
      );

    case "toggle":
      return (
        <div>
          <div className="flex items-start gap-1.5">
            <button
              onClick={() => setOpen(!open)}
              className={cn("mt-1 text-xs text-neutral-400 transition-transform", open && "rotate-90")}
            >
              ▸
            </button>
            <div ref={ref} {...editableProps} className={cn(textClass, "flex-1 text-[15px] text-neutral-800")}>
              {block.content}
            </div>
          </div>
        </div>
      );

    case "heading1":
      return (
        <div ref={ref} {...editableProps} className={cn(textClass, "text-2xl font-bold text-neutral-900")}>
          {block.content}
        </div>
      );
    case "heading2":
      return (
        <div ref={ref} {...editableProps} className={cn(textClass, "text-xl font-bold text-neutral-900")}>
          {block.content}
        </div>
      );
    case "heading3":
      return (
        <div ref={ref} {...editableProps} className={cn(textClass, "text-lg font-bold text-neutral-900")}>
          {block.content}
        </div>
      );

    case "code":
      return (
        <pre className="overflow-x-auto rounded-md bg-neutral-900 px-3.5 py-3 text-[13px] text-neutral-100">
          <div
            ref={ref}
            {...editableProps}
            className={cn(textClass, "font-mono text-neutral-100")}
          >
            {block.content}
          </div>
        </pre>
      );

    default:
      return (
        <div ref={ref} {...editableProps} className={cn(textClass, "text-[15px] text-neutral-800")}>
          {block.content}
        </div>
      );
  }
}
