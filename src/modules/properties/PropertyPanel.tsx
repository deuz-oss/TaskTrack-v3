"use client";

import { PropertyDef } from "@/modules/pages/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PropertyPanelProps {
  schema: PropertyDef[];
  values: Record<string, string | string[] | null>;
  onChange: (key: string, value: string | string[] | null) => void;
  readOnly?: boolean;
}

const badgeColor = (color?: string) =>
  ({
    default: "default",
    blue: "blue",
    green: "green",
    amber: "amber",
    red: "red",
    purple: "purple",
  }[color ?? "default"] as "default" | "blue" | "green" | "amber" | "red" | "purple");

/**
 * Properties always render inline at the top of the object page — never
 * in a modal. Each row is directly editable.
 */
export function PropertyPanel({ schema, values, onChange, readOnly }: PropertyPanelProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2 border-b border-neutral-100 pb-5">
      {schema.map((prop) => {
        const value = values[prop.key];
        return (
          <div key={prop.key} className="contents">
            <div className="flex items-center text-sm text-neutral-400">{prop.label}</div>
            <div>
              {(prop.kind === "status" || prop.kind === "priority") && prop.options ? (
                <select
                  disabled={readOnly}
                  value={(value as string) ?? ""}
                  onChange={(e) => onChange(prop.key, e.target.value)}
                  className="rounded-md border-0 bg-transparent px-1 py-0.5 text-sm hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                >
                  {prop.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : prop.kind === "date" ? (
                <input
                  type="date"
                  disabled={readOnly}
                  value={(value as string) ?? ""}
                  onChange={(e) => onChange(prop.key, e.target.value)}
                  className={cn(
                    "rounded-md border-0 bg-transparent px-1 py-0.5 text-sm hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                  )}
                />
              ) : prop.kind === "relation" ? (
                <button
                  disabled={readOnly}
                  className="rounded-md px-1 py-0.5 text-sm text-neutral-500 hover:bg-neutral-50"
                >
                  {value ? String(value) : `+ Link ${prop.relationType}`}
                </button>
              ) : (
                <input
                  disabled={readOnly}
                  value={(value as string) ?? ""}
                  onChange={(e) => onChange(prop.key, e.target.value)}
                  placeholder="Empty"
                  className="w-full rounded-md border-0 bg-transparent px-1 py-0.5 text-sm hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              )}
              {prop.kind === "status" && value && (
                <Badge variant={badgeColor(prop.options?.find((o) => o.value === value)?.color)} className="ml-2">
                  {prop.options?.find((o) => o.value === value)?.label}
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
