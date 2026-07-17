import { create } from "zustand";

interface WorkspaceState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

/**
 * Global, UI-only workspace state (not server data — that's TanStack
 * Query's job once Phase 2 wires up Supabase). Zustand only holds things
 * like "is the sidebar collapsed" and "is the command palette open".
 */
export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
