import type {
  ActivityItem,
  FocusTask,
  PersonalStatus,
  QuickAction,
  ScheduleItem,
  WeeklyGoal,
} from "@/lib/dashboard-types";

export const initialFocusTasks: FocusTask[] = [
  { id: "focus-1", title: "水曜の練習メニューを仕上げる", context: "前進の原則 / U-15", completed: false },
  { id: "focus-2", title: "FC Blau戦の映像をレビューする", context: "守備ブロックの崩し方", completed: false },
  { id: "focus-3", title: "ドイツ語を20分学習する", context: "守備のコーチング用語", completed: true },
];

export const todaysSchedule: ScheduleItem[] = [
  { id: "schedule-1", time: "10:00", title: "週次レビュー", category: "Personal", detail: "先週の振り返りと今週の設計" },
  { id: "schedule-2", time: "19:00", title: "U-15 トレーニング", category: "Training", detail: "前進の原則と3rdマン" },
  { id: "schedule-3", time: "21:00", title: "FC Blau 戦術レビュー", category: "Match", detail: "相手の守備ブロックを確認" },
  { id: "schedule-4", time: "21:40", title: "ドイツ語学習", category: "Study", detail: "守備のコーチング表現" },
];

export const weeklyGoals: WeeklyGoal[] = [
  { id: "goal-1", title: "練習プランを作成する", current: 3, target: 4, unit: "本" },
  { id: "goal-2", title: "試合を分析する", current: 2, target: 3, unit: "試合" },
  { id: "goal-3", title: "学習時間を積み上げる", current: 95, target: 180, unit: "分" },
];

export const quickActions: QuickAction[] = [
  { id: "quick-analysis", label: "新しい試合分析", description: "映像・戦術メモ", href: "/match-analysis", icon: "analysis" },
  { id: "quick-training", label: "新しい練習メニュー", description: "セッションを設計", href: "/training-planner", icon: "training" },
  { id: "quick-player", label: "新しい選手登録", description: "プロフィールを追加", href: "/players", icon: "player" },
  { id: "quick-journal", label: "日誌を書く", description: "今日を振り返る", href: "/journal", icon: "journal" },
  { id: "quick-german", label: "ドイツ語学習開始", description: "今日のレッスン", href: "/german", icon: "german" },
];

export const personalStatus: PersonalStatus = {
  sleepHours: 7.5,
  weightKg: 71.8,
  condition: "Good",
  learningStreakDays: 12,
};

export const recentActivities: ActivityItem[] = [
  { id: "activity-1", type: "analysis", title: "vs. SV Nord を分析", detail: "トランジション場面を7件タグ付け", relativeTime: "45分前" },
  { id: "activity-2", type: "training", title: "水曜の練習メニューを作成", detail: "前進の原則 / 75分", relativeTime: "2時間前" },
  { id: "activity-3", type: "player", title: "L. Weber を登録", detail: "スプリントと左足の育成目標", relativeTime: "昨日" },
  { id: "activity-4", type: "note", title: "ハーフタイムの伝え方を追記", detail: "Coach Notebook", relativeTime: "昨日" },
];
