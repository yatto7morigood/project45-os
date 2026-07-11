import { CalendarClock, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSectionHeading } from "@/components/dashboard/dashboard-section-heading";
import type { ScheduleCategory, ScheduleItem } from "@/lib/dashboard-types";
import { cn } from "@/lib/utils";

const categoryStyles: Record<ScheduleCategory, string> = {
  Training: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  Match: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  Study: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Personal: "border-slate-400/20 bg-slate-400/10 text-slate-300",
};

export function TodaysSchedule({ items }: { items: ScheduleItem[] }) {
  return <Card><CardContent className="p-5 sm:p-6"><DashboardSectionHeading eyebrow="Timeline" title="Today's Schedule" action={<CalendarClock size={18} className="text-blue-300" />} /><div className="mt-5 divide-y divide-white/7">{items.map((item) => <button key={item.id} className="group flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"><time className="w-10 shrink-0 font-mono text-xs font-medium text-blue-300">{item.time}</time><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate text-sm font-medium text-slate-100">{item.title}</p><span className={cn("rounded border px-1.5 py-0.5 text-[10px] font-medium", categoryStyles[item.category])}>{item.category}</span></div><p className="mt-1 truncate text-xs text-slate-500">{item.detail}</p></div><ChevronRight size={16} className="shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" /></button>)}</div></CardContent></Card>;
}
