"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalStatus } from "@/components/dashboard/personal-status";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { TodaysFocus } from "@/components/dashboard/todays-focus";
import { TodaysSchedule } from "@/components/dashboard/todays-schedule";
import { WeeklyGoals } from "@/components/dashboard/weekly-goals";
import {
  initialFocusTasks,
  personalStatus,
  quickActions,
  recentActivities,
  todaysSchedule,
  weeklyGoals,
} from "@/lib/dashboard-data";

export function DashboardView() {
  const [focusTasks, setFocusTasks] = useState(initialFocusTasks);
  const focusCompletion = useMemo(() => Math.round((focusTasks.filter((task) => task.completed).length / focusTasks.length) * 100), [focusTasks]);
  const dateLabel = new Intl.DateTimeFormat("ja-JP", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

  function toggleFocusTask(taskId: string) {
    setFocusTasks((tasks) => tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));
  }

  return <div className="mx-auto max-w-7xl pb-6"><header className="mb-7 flex flex-col gap-5 border-b border-white/8 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-300"><CalendarDays size={14} />{dateLabel}</div><h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">おはよう、Coach.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">今日の一つひとつの準備が、次のゲームと選手の成長を変える。</p></div><div className="flex items-center gap-3"><div className="hidden rounded-lg border border-white/8 bg-white/[0.025] px-3.5 py-2.5 sm:block"><p className="text-[11px] text-slate-500">TODAY'S FOCUS</p><p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-200"><CheckCircle2 size={14} className="text-blue-300" />{focusCompletion}% 完了</p></div><Button><Plus size={16} />新規作成</Button></div></header>

    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(370px,0.88fr)]"><TodaysFocus tasks={focusTasks} onToggle={toggleFocusTask} /><TodaysSchedule items={todaysSchedule} /></section>
    <section className="mt-5"><QuickActions actions={quickActions} /></section>
    <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(370px,0.88fr)]"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"><WeeklyGoals goals={weeklyGoals} /><PersonalStatus status={personalStatus} /></div><RecentActivity activities={recentActivities} /></section>
  </div>;
}
