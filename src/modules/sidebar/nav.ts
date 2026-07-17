import {
  Home,
  Inbox,
  CheckSquare,
  Users2,
  Building2,
  UserSquare2,
  BookOpen,
  FolderClosed,
  Archive,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Inbox", href: "/inbox", icon: Inbox },
];

export const WORKSPACE_NAV: NavItem[] = [
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Meetings", href: "/meetings", icon: Users2 },
  { label: "Projects", href: "/projects", icon: FolderClosed },
  { label: "Clients", href: "/clients", icon: Building2 },
  { label: "Employees", href: "/employees", icon: UserSquare2 },
  { label: "Knowledge Base", href: "/knowledge", icon: BookOpen },
];

export const FOOTER_NAV: NavItem[] = [
  { label: "Archive", href: "/archive", icon: Archive },
  { label: "Settings", href: "/settings", icon: Settings },
];
