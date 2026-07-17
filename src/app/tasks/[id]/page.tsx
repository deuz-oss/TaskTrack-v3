"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ObjectPageLayout } from "@/modules/pages/ObjectPageLayout";
import { RelatedSection } from "@/modules/pages/RelatedSection";
import { PropertyPanel } from "@/modules/properties/PropertyPanel";
import { PROPERTY_SCHEMAS } from "@/modules/properties/schemas";
import { BlockEditor } from "@/modules/editor/BlockEditor";
import { Block } from "@/modules/blocks/types";

const initialBlocks: Block[] = [
  { id: "b1", type: "paragraph", content: "This is a Task page — not a popup. Every object in the workspace (Task, Meeting, Project, Client, Employee...) opens like this." },
  { id: "b2", type: "callout", content: "Type \"/\" on a new line to insert headings, checklists, quotes, and more." },
  { id: "b3", type: "heading2", content: "Notes" },
  { id: "b4", type: "checklist", content: "Draft the layout", checked: true },
  { id: "b5", type: "checklist", content: "Wire up the property panel", checked: false },
];

/**
 * Phase 1 demo: in-memory state only. Phase 2 replaces this with a
 * TanStack Query hook (e.g. useTask(id)) reading/writing Supabase.
 */
export default function TaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Ship the landing page");
  const [properties, setProperties] = useState<Record<string, string | null>>({
    status: "in_progress",
    priority: "high",
    due_date: "2026-07-20",
    category: "Ops",
  });
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  return (
    <ObjectPageLayout
      icon="✅"
      typeLabel="Task"
      title={title}
      onTitleChange={setTitle}
      onBack={() => router.push("/")}
      properties={
        <PropertyPanel
          schema={PROPERTY_SCHEMAS.task}
          values={properties}
          onChange={(key, value) => setProperties((p) => ({ ...p, [key]: value as string }))}
        />
      }
      relatedSections={
        <>
          <RelatedSection title="Related Tasks" count={2}>
            <div className="text-sm text-neutral-500">Fix login redirect · Write QA checklist</div>
          </RelatedSection>
          <RelatedSection title="Meeting">
            <div className="text-sm text-neutral-500">Weekly sync — Jul 21, 10:00</div>
          </RelatedSection>
          <RelatedSection title="Files">
            <div className="text-sm text-neutral-500">No files attached yet.</div>
          </RelatedSection>
          <RelatedSection title="Comments" count={0}>
            <div className="text-sm text-neutral-500">No comments yet.</div>
          </RelatedSection>
          <RelatedSection title="History" defaultOpen={false}>
            <div className="text-sm text-neutral-500">Brian created this task.</div>
          </RelatedSection>
        </>
      }
    >
      <BlockEditor blocks={blocks} onChange={setBlocks} />
    </ObjectPageLayout>
  );
}
