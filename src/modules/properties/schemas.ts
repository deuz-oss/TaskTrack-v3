import { ObjectType, PropertyDef } from "@/modules/pages/types";

/**
 * Each object type declares which properties appear in its Property
 * Panel, in order. Phase 1 ships the Task schema fully; other object
 * types get a minimal schema now and grow in Phase 2.
 */
export const PROPERTY_SCHEMAS: Record<ObjectType, PropertyDef[]> = {
  task: [
    {
      key: "status",
      label: "Status",
      kind: "status",
      options: [
        { value: "pending", label: "Pending", color: "default" },
        { value: "in_progress", label: "In Progress", color: "blue" },
        { value: "done", label: "Done", color: "green" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      kind: "priority",
      options: [
        { value: "low", label: "Low", color: "green" },
        { value: "medium", label: "Medium", color: "amber" },
        { value: "high", label: "High", color: "red" },
      ],
    },
    { key: "assignee", label: "Assignee", kind: "relation", relationType: "employee" },
    { key: "due_date", label: "Due Date", kind: "date" },
    { key: "category", label: "Category", kind: "text" },
  ],
  meeting: [
    { key: "start_time", label: "Start", kind: "date" },
    { key: "end_time", label: "End", kind: "date" },
    { key: "attendees", label: "Attendees", kind: "relation", relationType: "employee" },
    { key: "project", label: "Project", kind: "relation", relationType: "project" },
  ],
  project: [
    { key: "status", label: "Status", kind: "status", options: [
      { value: "active", label: "Active", color: "blue" },
      { value: "on_hold", label: "On Hold", color: "amber" },
      { value: "completed", label: "Completed", color: "green" },
    ] },
    { key: "client", label: "Client", kind: "relation", relationType: "client" },
    { key: "lead", label: "Project Lead", kind: "relation", relationType: "employee" },
  ],
  client: [
    { key: "industry", label: "Industry", kind: "text" },
    { key: "account_owner", label: "Account Owner", kind: "relation", relationType: "employee" },
  ],
  employee: [
    { key: "department", label: "Department", kind: "text" },
    { key: "role", label: "Role", kind: "text" },
    { key: "active_projects", label: "Active Projects", kind: "relation", relationType: "project" },
  ],
  knowledge: [{ key: "category", label: "Category", kind: "text" }],
  document: [{ key: "owner", label: "Owner", kind: "relation", relationType: "employee" }],
  sop: [{ key: "department", label: "Department", kind: "text" }],
  announcement: [{ key: "audience", label: "Audience", kind: "text" }],
  policy: [{ key: "effective_date", label: "Effective Date", kind: "date" }],
  note: [],
};
