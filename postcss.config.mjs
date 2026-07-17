import { ObjectType } from "./types";
import { Block, emptyBlock } from "@/modules/blocks/types";

export const OBJECT_ICON: Record<ObjectType, string> = {
  task: "✅",
  meeting: "🗓️",
  project: "📁",
  client: "🏢",
  employee: "🧑‍💼",
  knowledge: "📚",
  document: "📄",
  sop: "📋",
  announcement: "📢",
  policy: "📜",
  note: "🗒️",
};

export const OBJECT_LABEL: Record<ObjectType, string> = {
  task: "Task",
  meeting: "Meeting",
  project: "Project",
  client: "Client",
  employee: "Employee",
  knowledge: "Knowledge",
  document: "Document",
  sop: "SOP",
  announcement: "Announcement",
  policy: "Policy",
  note: "Note",
};

export function defaultBlocksFor(type: ObjectType): Block[] {
  return [emptyBlock("paragraph")];
}

export function defaultPropertiesFor(type: ObjectType): Record<string, string | null> {
  switch (type) {
    case "task":
      return { status: "pending", priority: "medium", due_date: null, category: null };
    case "meeting":
      return { start_time: null, end_time: null, attendees: null, project: null };
    default:
      return {};
  }
}
