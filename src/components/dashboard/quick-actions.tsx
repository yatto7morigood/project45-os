import Link from "next/link";
import { BookOpenCheck, ClipboardPlus, Languages, UserPlus, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSectionHeading } from "@/components/dashboard/dashboard-section-heading";
import type { QuickAction } from "@/lib/dashboard-types";

const actionIcons = { analysis: Video, training: ClipboardPlus, player: UserPlus, journal: BookOpenCheck, german: Languages };

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return <Card><CardContent className="p-5 sm:p-6"><DashboardSectionHeading eyebrow="Create" title="Quick Actions" /><div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">{actions.map((action) => { const Icon = actionIcons[action.icon]; return <Link key={action.id} href={action.href} className="group rounded-lg border border-white/8 bg-white/[0.02] p-3.5 transition-colors hover:border-blue-400/35 hover:bg-blue-500/[0.07]"><span className="grid h-8 w-8 place-items-center rounded-md bg-blue-500/10 text-blue-300 transition-colors group-hover:bg-blue-500 group-hover:text-white"><Icon size={16} /></span><span className="mt-4 block text-sm font-medium text-slate-100">{action.label}</span><span className="mt-1 block text-xs text-slate-500">{action.description}</span></Link>; })}</div></CardContent></Card>;
}
