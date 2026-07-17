"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ObjectType } from "@/modules/pages/types";
import { OBJECT_ICON, OBJECT_LABEL, defaultBlocksFor, defaultPropertiesFor } from "@/modules/pages/defaults";
import { useObjectList } from "@/hooks/useObjectList";

export function ObjectListPage({ type, basePath }: { type: ObjectType; basePath: string }) {
  const router = useRouter();
  const { objects, isLoading, error, create, isCreating } = useObjectList(type);
  const [quickTitle, setQuickTitle] = useState("");

  const handleQuickCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    const created = await create({
      title: quickTitle,
      icon: OBJECT_ICON[type],
      properties: defaultPropertiesFor(type),
      blocks: defaultBlocksFor(type),
    });
    setQuickTitle("");
    router.push(`${basePath}/${created.id}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-10 py-10">
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
        Workspace
      </div>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">{OBJECT_LABEL[type]}s</h1>

      {/* Quick Create — no modal: typing + Enter creates the object and
          navigates straight into its page. */}
      <form onSubmit={handleQuickCreate} className="mb-6 flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5">
        <Plus className="h-4 w-4 text-neutral-400" />
        <input
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          placeholder={`New ${OBJECT_LABEL[type].toLowerCase()}... press Enter`}
          disabled={isCreating}
          className="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </form>

      {isLoading && <div className="text-sm text-neutral-400">Loading…</div>}
      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          Couldn&apos;t load {type}s. Check your Supabase env vars are set.
        </div>
      )}

      <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
        {objects.length === 0 && !isLoading && (
          <div className="px-4 py-6 text-sm text-neutral-400">
            No {type}s yet — create your first one above.
          </div>
        )}
        {objects.map((obj) => (
          <button
            key={obj.id}
            onClick={() => router.push(`${basePath}/${obj.id}`)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50"
          >
            <span className="text-lg">{obj.icon}</span>
            <span className="text-sm font-medium text-neutral-800">{obj.title || "Untitled"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
