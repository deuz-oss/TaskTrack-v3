import Link from "next/link";

const SECTIONS = [
  { title: "Today's Focus", items: ["Ship the landing page", "Send status update"] },
  { title: "Upcoming Meetings", items: ["Weekly sync — 10:00", "Client review — 14:00"] },
  { title: "Recent Documents", items: ["Onboarding SOP", "Q3 Ops Report"] },
  { title: "My Projects", items: ["Ops", "Client Onboarding"] },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-10 py-10">
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
        Workspace
      </div>
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Home</h1>

      <div className="grid grid-cols-2 gap-5">
        {SECTIONS.map((s) => (
          <div key={s.title} className="rounded-lg border border-neutral-200 p-5">
            <div className="mb-3 text-sm font-semibold text-neutral-800">{s.title}</div>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
        This is the Phase 1 foundation — try the{" "}
        <Link href="/tasks/demo-task-1" className="font-medium text-neutral-800 underline">
          demo Task page
        </Link>{" "}
        to see the shared object-page layout, editable Property Panel, and block editor in action.
      </div>
    </div>
  );
}
