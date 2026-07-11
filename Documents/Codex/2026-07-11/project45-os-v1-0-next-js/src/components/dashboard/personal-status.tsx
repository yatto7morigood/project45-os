import { MoonStar, Scale, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSectionHeading } from "@/components/dashboard/dashboard-section-heading";
import type { PersonalStatus as PersonalStatusData } from "@/lib/dashboard-types";
import { cn } from "@/lib/utils";

const conditionStyles = {
  Good: "bg-emerald-400/10 text-emerald-200 ring-emerald-400/20",
  Normal: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
  Bad: "bg-rose-400/10 text-rose-200 ring-rose-400/20",
};

export function PersonalStatus({ status }: { status: PersonalStatusData }) {
  const items = [
    { label: "睡眠", value: `${status.sleepHours}h`, icon: MoonStar, note: "昨夜" },
    { label: "体重", value: `${status.weightKg}kg`, icon: Scale, note: "今朝" },
    { label: "学習連続", value: `${status.learningStreakDays}日`, icon: Zap, note: "継続中" },
  ];

  return <Card><CardContent className="p-5 sm:p-6"><DashboardSectionHeading eyebrow="Wellbeing" title="Personal Status" action={<Sparkles size={18} className="text-blue-300" />} /><div className="mt-5 grid grid-cols-3 gap-2">{items.map((item) => { const Icon = item.icon; return <div key={item.label} className="rounded-lg border border-white/8 bg-white/[0.025] p-3"><Icon size={15} className="text-slate-500" /><p className="mt-4 text-lg font-semibold text-slate-100">{item.value}</p><p className="mt-1 text-[11px] text-slate-500">{item.label} · {item.note}</p></div>; })}</div><div className="mt-4 flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] px-3.5 py-3"><span className="text-xs text-slate-400">今日の体調</span><span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", conditionStyles[status.condition])}>{status.condition}</span></div></CardContent></Card>;
}
