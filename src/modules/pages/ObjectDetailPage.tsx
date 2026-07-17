"use client";

import { useRouter } from "next/navigation";
import { ObjectPageLayout } from "@/modules/pages/ObjectPageLayout";
import { RelatedSection } from "@/modules/pages/RelatedSection";
import { PropertyPanel } from "@/modules/properties/PropertyPanel";
import { PROPERTY_SCHEMAS } from "@/modules/properties/schemas";
import { BlockEditor } from "@/modules/editor/BlockEditor";
import { ObjectType } from "@/modules/pages/types";
import { OBJECT_LABEL } from "@/modules/pages/defaults";
import { useObject } from "@/hooks/useObject";

export function ObjectDetailPage({ type, id, basePath }: { type: ObjectType; id: string; basePath: string }) {
  const router = useRouter();
  const { object, isLoading, error, setTitle, setProperty, setBlocks, isSaving } = useObject(id);

  if (isLoading) {
    return <div className="mx-auto max-w-3xl px-10 py-10 text-sm text-neutral-400">Loading...</div>;
  }
  if (error || !object) {
    return (
      <div className="mx-auto max-w-3xl px-10 py-10 text-sm text-red-600">
        Couldn&apos;t load this {type}. Check your Supabase env vars are set, and that the
        object still exists.
      </div>
    );
  }

  return (
    <ObjectPageLayout
      icon={object.icon}
      typeLabel={`${OBJECT_LABEL[type]}${isSaving ? " - saving..." : ""}`}
      title={object.title}
      onTitleChange={setTitle}
      onBack={() => router.push(basePath)}
      properties={
        <PropertyPanel
          schema={PROPERTY_SCHEMAS[type]}
          values={object.properties}
          onChange={setProperty}
        />
      }
      relatedSections={
        <>
          <RelatedSection title="Related Tasks" defaultOpen={false}>
            <div className="text-sm text-neutral-400">Coming in Phase 3 (Relation System).</div>
          </RelatedSection>
          <RelatedSection title="Files" defaultOpen={false}>
            <div className="text-sm text-neutral-400">Coming in Phase 4.</div>
          </RelatedSection>
          <RelatedSection title="Comments" defaultOpen={false}>
            <div className="text-sm text-neutral-400">Coming in Phase 4.</div>
          </RelatedSection>
          <RelatedSection title="History" defaultOpen={false}>
            <div className="text-sm text-neutral-400">
              Last updated {new Date(object.updatedAt).toLocaleString()}
            </div>
          </RelatedSection>
        </>
      }
    >
      <BlockEditor blocks={object.blocks} onChange={setBlocks} />
    </ObjectPageLayout>
  );
}
