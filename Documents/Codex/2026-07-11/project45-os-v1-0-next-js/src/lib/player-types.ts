export const abilityGroups = {
  Technical: ["firstTouch", "passing", "dribbling", "shooting", "crossing"],
  Tactical: ["positioning", "decisionMaking", "vision", "gameUnderstanding"],
  Physical: ["speed", "acceleration", "stamina", "strength", "agility"],
  Mental: ["leadership", "communication", "workRate", "confidence", "discipline"],
} as const;

export type AbilityCategory = keyof typeof abilityGroups;
export type AbilityKey = (typeof abilityGroups)[AbilityCategory][number];
export type Rating = 1 | 2 | 3 | 4 | 5;
export type Position = "GK" | "RB" | "CB" | "LB" | "DM" | "CM" | "AM" | "RW" | "LW" | "ST";
export type PlayerCondition = "Good" | "Normal" | "Recovery" | "Watch";

export type PlayerRatings = Record<AbilityKey, Rating>;

export type GrowthRecord = {
  id: string;
  date: string;
  ability: AbilityKey;
  from: Rating;
  to: Rating;
};

export type TrainingRecord = {
  id: string;
  date: string;
  theme: string;
  coach: string;
  note: string;
};

export type MatchRecord = {
  id: string;
  date: string;
  opponent: string;
  minutes: number;
  position: Position;
  rating: number;
  mvp: boolean;
};

export type CoachNote = {
  id: string;
  body: string;
  tags: string[];
  updatedAt: string;
};

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  preferredFoot: "Right" | "Left" | "Both";
  heightCm: number;
  weightKg: number;
  club: string;
  category: "U-15" | "U-17";
  squad: string;
  number: number;
  position: Position;
  secondaryPositions: Position[];
  overallRating: Rating;
  condition: PlayerCondition;
  favorite: boolean;
  avatarTone: "blue" | "cyan" | "violet" | "emerald" | "orange";
  ratings: PlayerRatings;
  growthHistory: GrowthRecord[];
  trainingHistory: TrainingRecord[];
  matchHistory: MatchRecord[];
  coachNote: CoachNote;
};

export const abilityLabels: Record<AbilityKey, string> = {
  firstTouch: "First Touch",
  passing: "Passing",
  dribbling: "Dribbling",
  shooting: "Shooting",
  crossing: "Crossing",
  positioning: "Positioning",
  decisionMaking: "Decision Making",
  vision: "Vision",
  gameUnderstanding: "Game Understanding",
  speed: "Speed",
  acceleration: "Acceleration",
  stamina: "Stamina",
  strength: "Strength",
  agility: "Agility",
  leadership: "Leadership",
  communication: "Communication",
  workRate: "Work Rate",
  confidence: "Confidence",
  discipline: "Discipline",
};

export function getPlayerAge(birthDate: string, referenceDate = new Date()): number {
  const birth = new Date(`${birthDate}T00:00:00`);
  let age = referenceDate.getFullYear() - birth.getFullYear();
  const monthDifference = referenceDate.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && referenceDate.getDate() < birth.getDate())) age -= 1;
  return age;
}
