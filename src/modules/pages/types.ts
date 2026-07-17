/**
 * Core object types for TaskTrack's workspace architecture.
 *
 * Every row in this union is a "page" in the workspace: it has its own
 * URL, its own property panel, its own block-based content, and can be
 * related to other objects. Phase 1 defines the shape; Phase 2+ wires
 * each one up to Supabase and gives it a real route.
 */
export type ObjectType =
  | "task"
  | "meeting"
  | "project"
  | "client"
  | "employee"
  | "knowledge"
  | "document"
  | "sop"
  | "announcement"
  | "policy"
  | "note";

export interface RelationRef {
  id: string;
  type: ObjectType;
  title: string;
  icon?: string;
}

/**
 * Generic property definition. The Property Panel renders one row per
 * PropertyDef; each object type supplies its own list (see
 * modules/properties/schemas.ts).
 */
export type PropertyKind =
  | "status"
  | "priority"
  | "person"
  | "date"
  | "text"
  | "select"
  | "relation";

export interface PropertyDef {
  key: string;
  label: string;
  kind: PropertyKind;
  options?: { value: string; label: string; color?: string }[];
  relationType?: ObjectType;
}

/**
 * Base shape every workspace object shares, regardless of type.
 * Type-specific fields (e.g. a Task's due date, a Client's company name)
 * live in `properties`, keyed by PropertyDef["key"], so the same
 * ObjectPageLayout / PropertyPanel components work for every object type.
 */
export interface WorkspaceObject {
  id: string;
  type: ObjectType;
  icon: string;
  title: string;
  properties: Record<string, string | string[] | null>;
  blocks: unknown[]; // Block[] — see modules/blocks/types.ts
  relations: RelationRef[];
  createdAt: string;
  updatedAt: string;
}
