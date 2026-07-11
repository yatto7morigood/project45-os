"use client";

import { Check, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSectionHeading } from "@/components/dashboard/dashboard-section-heading";
import type { FocusTask } from "@/lib/dashboard-types";
import { cn } from "@/lib/utils";

type TodaysFocusProps = {
  tasks: FocusTask[];
  onToggle: (taskId: string) => void;
};

export function TodaysFocus({ tasks, onToggle }: TodaysFocusProps) {
  const completed = tasks.filter((task) => task.completed).length;
  const completionRate = Math.round((completed / tasks.length) * 100);

  return <Card className="overflow-hidden"><CardContent className="p-5 sm:p-6"><DashboardSectionHeading eyebrow="Today" title="Today's Focus" action={<span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-200">{completed}/{tasks.length} 完了</span>} /><div className="mt-5 space-y-1">{tasks.map((task) => <label key={task.id} className="group flex cursor-pointer items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-white/[0.035]"><input className="sr-only" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} /><span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors", task.completed ? "border-primary bg-primary text-white" : "border-slate-600 text-transparent group-hover:border-blue-300")} aria-hidden="true">{task.completed ? <Check size={14} strokeWidth={3} /> : <Circle size={11} fill="currentColor" />}</span><span className="min-w-0 flex-1"><span className={cn("block text-sm font-medium transition-colors", task.completed ? "text-slate-500 line-through" : "text-slate-100")}>{task.title}</span><span className="mt-1 block text-xs text-slate-500">{task.context}</span></span></label>)}</div><div className="mt-5"><div className="flex items-center justify-between text-xs"><span className="text-slate-500">今日の達成率</span><span className="font-medium text-blue-200">{completionRate}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300" style={{ width: `${completionRate}%` }} /></div></div></CardContent></Card>;
}
