export type ScheduleCategory = "Training" | "Match" | "Study" | "Personal";
export type PersonalCondition = "Good" | "Normal" | "Bad";
export type ActivityType = "analysis" | "player" | "note" | "training";

export type FocusTask = {
  id: string;
  title: string;
  context: string;
  completed: boolean;
};

export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  category: ScheduleCategory;
  detail: string;
};

export type WeeklyGoal = {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: "analysis" | "training" | "player" | "journal" | "german";
};

export type PersonalStatus = {
  sleepHours: number;
  weightKg: number;
  condition: PersonalCondition;
  learningStreakDays: number;
};

export type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  relativeTime: string;
};
