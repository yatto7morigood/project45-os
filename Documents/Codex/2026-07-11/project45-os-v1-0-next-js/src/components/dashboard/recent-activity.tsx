import { BookMarked, ClipboardList, UsersRound, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSectionHeading } from "@/components/dashboard/dashboard-section-heading";
import type { ActivityItem } from "@/lib/dashboard-types";

const activityMeta = {
  analysis: { icon: Video, label: "MATCH ANALYSIS", className: "bg-violet-400/10 text-violet-200" },
  training: { icon: ClipboardList, label: "TRAINING", className: "bg-sky-400/10 text-sky-200" },
  player: { icon: UsersRound, label: "PLAYER", className: "bg-emerald-400/10 text-emerald-200" },
  note: { icon: BookMarked, label: "NOTE", className: "bg-amber-400/10 text-amber-200" },
};

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  return <Card><CardContent className="p-5 sm:p-6"><DashboardSectionHeading eyebrow="Feed" title="Recent Activity" /><div className="mt-5 space-y-0">{activities.map((activity, index) => { const meta = activityMeta[activity.type]; const Icon = meta.icon; return <div key={activity.id} className="relative flex gap-3 pb-5 last:pb-0"><div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-slate-300"><Icon size={15} /></div>{index < activities.length - 1 && <div className="absolute left-4 top-8 h-[calc(100%-1.25rem)] w-px bg-white/8" />}<div className="min-w-0 flex-1 pt-0.5"><div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"><p className="text-sm font-medium text-slate-100">{activity.title}</p><time className="text-[11px] text-slate-600">{activity.relativeTime}</time></div><p className="mt-1 text-xs text-slate-500">{activity.detail}</p><span className={`mt-2 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider ${meta.className}`}>{meta.label}</span></div></div>; })}</div></CardContent></Card>;
}
