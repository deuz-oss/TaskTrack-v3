"use client";

import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ObjectPageLayoutProps {
  icon: string;
  title: string;
  onTitleChange?: (title: string) => void;
  onBack?: () => void;
  typeLabel: string;
  properties: ReactNode;
  children: ReactNode; // block editor content
  relatedSections?: ReactNode; // Related Tasks / Meeting / Files / Comments / History
  readOnly?: boolean;
}

/**
 * Every object in TaskTrack (Task, Meeting, Project, Client, Employee,
 * Knowledge, Document, SOP, Announcement, Policy, Note) renders through
 * this same layout, so opening any object always feels like the same
 * workspace rather than a one-off screen.
 */
export function ObjectPageLayout({
  icon,
  title,
  onTitleChange,
  onBack,
  typeLabel,
  properties,
  children,
  relatedSections,
  readOnly,
}: ObjectPageLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-10 py-10">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-2 text-neutral-500">
        <ChevronLeft className="h-3.5 w-3.5" />
        Back
      </Button>

      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
        {typeLabel}
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl leading-none">{icon}</span>
        <input
          disabled={readOnly}
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          placeholder="Untitled"
          className="w-full border-0 bg-transparent text-3xl font-bold text-neutral-900 outline-none placeholder:text-neutral-300"
        />
      </div>

      <div className="mb-6">{properties}</div>

      <div className="mb-8">{children}</div>

      {relatedSections && <div className="space-y-6">{relatedSections}</div>}
    </div>
  );
}
