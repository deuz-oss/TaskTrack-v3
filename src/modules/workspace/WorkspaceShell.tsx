"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/modules/sidebar/Sidebar";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
