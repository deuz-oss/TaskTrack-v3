/**
 * Block architecture — every piece of content in TaskTrack is a Block,
 * stored as JSON (never HTML). This file defines the base block types
 * for Phase 1. Smart blocks (/task, /meeting, /employee, /approval, ...)
 * extend this union in Phase 3 once the Relation System exists.
 */
export type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "checklist"
  | "bulleted_list"
  | "numbered_list"
  | "toggle"
  | "quote"
  | "callout"
  | "divider"
  | "code"
  | "image"
  | "file"
  | "bookmark"
  | "video";

export interface Block {
  id: string;
  type: BlockType;
  /** Plain text content for text-like blocks. */
  content: string;
  /** For checklist blocks. */
  checked?: boolean;
  /** For toggle blocks — nested child blocks. */
  children?: Block[];
  /** For image/file/video/bookmark blocks. */
  url?: string;
  /** For code blocks. */
  language?: string;
}

export function emptyBlock(type: BlockType = "paragraph"): Block {
  return { id: crypto.randomUUID(), type, content: "" };
}

export const BLOCK_LIBRARY: { type: BlockType; label: string; hint: string }[] = [
  { type: "paragraph", label: "Text", hint: "Just start writing with plain text." },
  { type: "heading1", label: "Heading 1", hint: "Big section heading." },
  { type: "heading2", label: "Heading 2", hint: "Medium section heading." },
  { type: "heading3", label: "Heading 3", hint: "Small section heading." },
  { type: "checklist", label: "To-do list", hint: "Track tasks with a checklist." },
  { type: "bulleted_list", label: "Bulleted list", hint: "Simple bulleted list." },
  { type: "numbered_list", label: "Numbered list", hint: "List with numbering." },
  { type: "toggle", label: "Toggle list", hint: "Collapsible content." },
  { type: "quote", label: "Quote", hint: "Capture a quote." },
  { type: "callout", label: "Callout", hint: "Make text stand out." },
  { type: "divider", label: "Divider", hint: "Visually divide blocks." },
  { type: "code", label: "Code", hint: "Code snippet with syntax formatting." },
];
