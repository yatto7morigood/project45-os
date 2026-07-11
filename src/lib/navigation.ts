import {
  Activity,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Dumbbell,
  Goal,
  Languages,
  LayoutDashboard,
  NotebookPen,
  Settings,
  ShieldCheck,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const navigation: NavigationItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, description: "今日の優先事項と指導の全体像" },
  { label: "Match Analysis", href: "/match-analysis", icon: BrainCircuit, description: "試合映像・戦術メモ・改善点" },
  { label: "Training Planner", href: "/training-planner", icon: CalendarDays, description: "セッションの設計と週間計画" },
  { label: "Player Database", href: "/players", icon: Users, description: "選手プロフィールと成長記録" },
  { label: "Coach Notebook", href: "/notebook", icon: NotebookPen, description: "アイデア、振り返り、戦術ノート" },
  { label: "Learning", href: "/learning", icon: BookOpen, description: "学習トピックと読書ログ" },
  { label: "German", href: "/german", icon: Languages, description: "指導で使うドイツ語の学習" },
  { label: "Physical", href: "/physical", icon: Dumbbell, description: "フィジカル知識とコンディショニング" },
  { label: "Nutrition", href: "/nutrition", icon: Utensils, description: "栄養の知識と食事の記録" },
  { label: "Daily Journal", href: "/journal", icon: BookOpen, description: "日々の学びと気づき" },
  { label: "Goals", href: "/goals", icon: Goal, description: "指導者としての目標と進捗" },
  { label: "Settings", href: "/settings", icon: Settings, description: "表示・通知・アカウント設定" },
];

export const secondaryNavigation = [{ label: "Project45 OS", href: "/", icon: ShieldCheck }];
