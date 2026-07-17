import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/modules/workspace/QueryProvider";
import { WorkspaceShell } from "@/modules/workspace/WorkspaceShell";

export const metadata: Metadata = {
  title: "TaskTrack — Operational Workspace",
  description: "Operational workspace for manpower & outsourcing companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full font-sans text-neutral-900">
        <QueryProvider>
          <WorkspaceShell>{children}</WorkspaceShell>
        </QueryProvider>
      </body>
    </html>
  );
}
