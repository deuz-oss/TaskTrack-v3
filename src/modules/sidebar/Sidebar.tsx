"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { PRIMARY_NAV, WORKSPACE_NAV, FOOTER_NAV, NavItem } from "./nav";

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        active ? "bg-neutral-200/70 text-neutral-900" : "text-neutral-600 hover:bg-neutral-200/40"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

/**
 * Primary workspace navigation. Collapses to icon-only via the Zustand
 * store so page components never need to know about sidebar state.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, setCommandPaletteOpen } = useWorkspaceStore();

  if (sidebarCollapsed) {
    return (
      <div className="flex h-screen w-12 flex-col items-center border-r border-neutral-200 bg-neutral-50 py-3">
        <button onClick={toggleSidebar} className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-200/50">
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-60 flex-col border-r border-neutral-200 bg-neutral-50 px-2 py-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">
            T
          </div>
          <span className="text-sm font-semibold text-neutral-800">TaskTrack</span>
        </div>
        <button onClick={toggleSidebar} className="rounded-md p-1 text-neutral-400 hover:bg-neutral-200/50">
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-500 hover:bg-neutral-200/40"
      >
        <Search className="h-4 w-4" />
        Search
        <span className="ml-auto rounded border border-neutral-300 px-1 text-[10px] text-neutral-400">
          Ctrl K
        </span>
      </button>

      <div className="mt-1 space-y-0.5">
        {PRIMARY_NAV.map((item) => (
          <NavRow key={item.href} item={item} active={pathname === item.href} />
        ))}
      </div>

      <div className="mt-4 px-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
        Workspace
      </div>
      <div className="mt-1 space-y-0.5">
        {WORKSPACE_NAV.map((item) => (
          <NavRow key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}
      </div>

      <div className="mt-auto space-y-0.5 border-t border-neutral-200 pt-2">
        {FOOTER_NAV.map((item) => (
          <NavRow key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-500 hover:bg-neutral-200/40">
          <Plus className="h-4 w-4" />
          Quick Create
        </button>
      </div>
    </div>
  );
}
