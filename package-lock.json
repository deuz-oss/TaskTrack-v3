"use client";

import { ReactNode, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RelatedSectionProps {
  title: string;
  count?: number;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** One collapsible block (Related Tasks, Meeting, Files, Comments, History, ...). */
export function RelatedSection({ title, count, children, defaultOpen = true }: RelatedSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-neutral-100 pt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-semibold text-neutral-700"
      >
        <ChevronRight className={cn("h-3.5 w-3.5 text-neutral-400 transition-transform", open && "rotate-90")} />
        {title}
        {typeof count === "number" && <span className="text-neutral-400">({count})</span>}
      </button>
      {open && <div className="mt-3 pl-5">{children}</div>}
    </div>
  );
}
