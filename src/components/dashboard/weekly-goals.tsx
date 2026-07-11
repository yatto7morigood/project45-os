import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSectionHeading } from "@/components/dashboard/dashboard-section-heading";
import type { WeeklyGoal } from "@/lib/dashboard-types";

export function WeeklyGoals({ goals }: { goals: WeeklyGoal[] }) {
  const completed = goals.reduce((total, goal) => total + goal.current, 0);
  const target = goals.reduce((total, goal) => total + goal.target, 0);
  const totalRate = Math.round((completed / target) * 100);

  return <Card><CardContent className="p-5 sm:p-6"><DashboardSectionHeading eyebrow="Momentum" title="Weekly Goals" action={<Target size={18} className="text-blue-300" />} /><div className="mt-5 space-y-5">{goals.map((goal) => { const rate = Math.min(100, Math.round((goal.current / goal.target) * 100)); return <div key={goal.id}><div className="flex items-center justify-between gap-3"><p className="text-sm text-slate-200">{goal.title}</p><p className="shrink-0 text-xs text-slate-500"><span className="font-semibold text-slate-300">{goal.current}</span> / {goal.target}{goal.unit}</p></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-blue-500" style={{ width: `${rate}%` }} /></div></div>; })}</div><div className="mt-6 flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] px-3.5 py-3"><span className="text-xs text-slate-400">今週全体の達成率</span><span className="text-sm font-semibold text-blue-200">{totalRate}%</span></div></CardContent></Card>;
}
