import type { Player, PlayerRatings, Rating } from "@/lib/player-types";

const baseRatings: PlayerRatings = {
  firstTouch: 3, passing: 3, dribbling: 3, shooting: 3, crossing: 3,
  positioning: 3, decisionMaking: 3, vision: 3, gameUnderstanding: 3,
  speed: 3, acceleration: 3, stamina: 3, strength: 3, agility: 3,
  leadership: 3, communication: 3, workRate: 3, confidence: 3, discipline: 3,
};

function createRatings(overrides: Partial<PlayerRatings>): PlayerRatings {
  return { ...baseRatings, ...overrides };
}

function growth(id: string, date: string, ability: keyof PlayerRatings, from: Rating, to: Rating) {
  return { id, date, ability, from, to };
}

export const players: Player[] = [
  {
    id: "player-01", firstName: "Haru", lastName: "Sato", birthDate: "2009-03-18", preferredFoot: "Right", heightCm: 174, weightKg: 63, club: "Project45 Academy", category: "U-17", squad: "U-17 First Team", number: 1, position: "GK", secondaryPositions: [], overallRating: 4, condition: "Good", favorite: true, avatarTone: "blue",
    ratings: createRatings({ positioning: 4, decisionMaking: 4, communication: 4, confidence: 4, discipline: 4, strength: 4, firstTouch: 2, speed: 2 }),
    growthHistory: [growth("g-01-1", "2026-07-10", "passing", 2, 3), growth("g-01-2", "2026-06-21", "communication", 3, 4)],
    trainingHistory: [{ id: "t-01-1", date: "2026-07-10 19:00", theme: "Build-up from the back", coach: "K. Mori", note: "判断の速さが安定。逆サイドへの配球も改善。" }, { id: "t-01-2", date: "2026-07-08 19:00", theme: "Shot stopping", coach: "K. Mori", note: "ニアゾーンでの構えが良い。" }],
    matchHistory: [{ id: "m-01-1", date: "2026-07-06", opponent: "FC Blau U-17", minutes: 80, position: "GK", rating: 7.8, mvp: true }, { id: "m-01-2", date: "2026-06-29", opponent: "SV Nord U-17", minutes: 80, position: "GK", rating: 7.1, mvp: false }],
    coachNote: { id: "n-01", body: "安定感のある守護者。ビルドアップでは一つ先の選択肢まで見せられるように促す。", tags: ["#GK", "#ビルドアップ", "#リーダー候補"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-02", firstName: "Leon", lastName: "Weber", birthDate: "2010-07-25", preferredFoot: "Right", heightCm: 168, weightKg: 57, club: "Project45 Academy", category: "U-15", squad: "U-15 First Team", number: 2, position: "RB", secondaryPositions: ["RW"], overallRating: 3, condition: "Good", favorite: false, avatarTone: "cyan",
    ratings: createRatings({ speed: 4, acceleration: 4, stamina: 4, crossing: 4, workRate: 4, dribbling: 4, strength: 2, shooting: 2 }),
    growthHistory: [growth("g-02-1", "2026-07-08", "crossing", 3, 4), growth("g-02-2", "2026-06-18", "stamina", 3, 4)],
    trainingHistory: [{ id: "t-02-1", date: "2026-07-10 19:00", theme: "Wide overload", coach: "K. Mori", note: "オーバーラップのタイミングが非常に良い。" }, { id: "t-02-2", date: "2026-07-08 19:00", theme: "1v1 defending", coach: "R. Aoki", note: "体の向きの改善を継続。" }],
    matchHistory: [{ id: "m-02-1", date: "2026-07-06", opponent: "FC Blau U-15", minutes: 70, position: "RB", rating: 7.2, mvp: false }, { id: "m-02-2", date: "2026-06-29", opponent: "SV Nord U-15", minutes: 65, position: "RB", rating: 6.8, mvp: false }],
    coachNote: { id: "n-02", body: "推進力が魅力。守備で内側を閉じる判断の精度を高めたい。", tags: ["#右SB", "#スプリンター"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-03", firstName: "Riku", lastName: "Tanaka", birthDate: "2009-11-08", preferredFoot: "Left", heightCm: 179, weightKg: 67, club: "Project45 Academy", category: "U-17", squad: "U-17 First Team", number: 4, position: "CB", secondaryPositions: ["LB"], overallRating: 4, condition: "Normal", favorite: true, avatarTone: "violet",
    ratings: createRatings({ positioning: 4, gameUnderstanding: 4, strength: 4, passing: 4, discipline: 4, communication: 4, acceleration: 2, agility: 2 }),
    growthHistory: [growth("g-03-1", "2026-07-10", "passing", 3, 4), growth("g-03-2", "2026-06-25", "leadership", 2, 3)],
    trainingHistory: [{ id: "t-03-1", date: "2026-07-10 19:00", theme: "Build-up from the back", coach: "K. Mori", note: "左足で前進させる配球が増えた。" }, { id: "t-03-2", date: "2026-07-08 19:00", theme: "Defensive line", coach: "R. Aoki", note: "ラインコントロールを主導。" }],
    matchHistory: [{ id: "m-03-1", date: "2026-07-06", opponent: "FC Blau U-17", minutes: 80, position: "CB", rating: 7.5, mvp: false }, { id: "m-03-2", date: "2026-06-29", opponent: "SV Nord U-17", minutes: 80, position: "CB", rating: 7.7, mvp: true }],
    coachNote: { id: "n-03", body: "左利きのCB候補として希少性が高い。プレッシャー下のターンを増やす。", tags: ["#左利き", "#CB候補", "#ビルドアップ"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-04", firstName: "Noah", lastName: "Schmidt", birthDate: "2010-01-14", preferredFoot: "Right", heightCm: 173, weightKg: 60, club: "Project45 Academy", category: "U-15", squad: "U-15 First Team", number: 5, position: "CB", secondaryPositions: ["DM"], overallRating: 3, condition: "Recovery", favorite: false, avatarTone: "emerald",
    ratings: createRatings({ strength: 4, positioning: 4, discipline: 4, stamina: 4, passing: 2, agility: 2, confidence: 2 }),
    growthHistory: [growth("g-04-1", "2026-07-01", "positioning", 3, 4), growth("g-04-2", "2026-06-14", "strength", 3, 4)],
    trainingHistory: [{ id: "t-04-1", date: "2026-07-10 19:00", theme: "Return to play", coach: "M. Ito", note: "負荷を抑えてメニュー復帰。" }, { id: "t-04-2", date: "2026-07-05 10:00", theme: "Core stability", coach: "M. Ito", note: "可動域に問題なし。" }],
    matchHistory: [{ id: "m-04-1", date: "2026-06-29", opponent: "SV Nord U-15", minutes: 35, position: "CB", rating: 6.6, mvp: false }, { id: "m-04-2", date: "2026-06-22", opponent: "Falken U-15", minutes: 70, position: "CB", rating: 7.0, mvp: false }],
    coachNote: { id: "n-04", body: "復帰段階。対人の強さは十分なので、プレー強度を段階的に戻す。", tags: ["#CB", "#復帰プラン"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-05", firstName: "Soma", lastName: "Kobayashi", birthDate: "2009-05-30", preferredFoot: "Left", heightCm: 170, weightKg: 58, club: "Project45 Academy", category: "U-17", squad: "U-17 First Team", number: 3, position: "LB", secondaryPositions: ["LW"], overallRating: 4, condition: "Good", favorite: false, avatarTone: "orange",
    ratings: createRatings({ crossing: 4, speed: 4, acceleration: 4, stamina: 4, firstTouch: 4, workRate: 4, strength: 2, shooting: 2 }),
    growthHistory: [growth("g-05-1", "2026-07-04", "firstTouch", 3, 4), growth("g-05-2", "2026-06-16", "crossing", 3, 4)],
    trainingHistory: [{ id: "t-05-1", date: "2026-07-10 19:00", theme: "Wide overload", coach: "K. Mori", note: "外で幅を取る判断が早い。" }, { id: "t-05-2", date: "2026-07-08 19:00", theme: "Transition game", coach: "R. Aoki", note: "奪われた後の切替が良い。" }],
    matchHistory: [{ id: "m-05-1", date: "2026-07-06", opponent: "FC Blau U-17", minutes: 75, position: "LB", rating: 7.3, mvp: false }, { id: "m-05-2", date: "2026-06-29", opponent: "SV Nord U-17", minutes: 80, position: "LB", rating: 7.4, mvp: false }],
    coachNote: { id: "n-05", body: "左足のキック精度が武器。ペナルティエリア手前でのプレー選択を磨く。", tags: ["#左利き", "#左SB", "#クロス"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-06", firstName: "Yuto", lastName: "Nakamura", birthDate: "2010-09-02", preferredFoot: "Right", heightCm: 166, weightKg: 55, club: "Project45 Academy", category: "U-15", squad: "U-15 First Team", number: 6, position: "DM", secondaryPositions: ["CB", "CM"], overallRating: 4, condition: "Good", favorite: true, avatarTone: "blue",
    ratings: createRatings({ passing: 4, vision: 4, gameUnderstanding: 4, decisionMaking: 4, positioning: 4, stamina: 4, shooting: 2, speed: 2 }),
    growthHistory: [growth("g-06-1", "2026-07-10", "decisionMaking", 3, 4), growth("g-06-2", "2026-06-20", "vision", 3, 4)],
    trainingHistory: [{ id: "t-06-1", date: "2026-07-10 19:00", theme: "Build-up from the back", coach: "K. Mori", note: "背後の確認が早く、前進を生んだ。" }, { id: "t-06-2", date: "2026-07-08 19:00", theme: "Rondo", coach: "R. Aoki", note: "立ち位置の修正を自分で行えた。" }],
    matchHistory: [{ id: "m-06-1", date: "2026-07-06", opponent: "FC Blau U-15", minutes: 70, position: "DM", rating: 7.6, mvp: true }, { id: "m-06-2", date: "2026-06-29", opponent: "SV Nord U-15", minutes: 70, position: "DM", rating: 7.2, mvp: false }],
    coachNote: { id: "n-06", body: "ゲームを落ち着かせる存在。周囲を動かす言葉を増やしたい。", tags: ["#アンカー", "#キャプテン候補", "#戦術理解"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-07", firstName: "Timo", lastName: "Keller", birthDate: "2009-02-11", preferredFoot: "Both", heightCm: 176, weightKg: 64, club: "Project45 Academy", category: "U-17", squad: "U-17 First Team", number: 8, position: "CM", secondaryPositions: ["AM"], overallRating: 4, condition: "Normal", favorite: false, avatarTone: "cyan",
    ratings: createRatings({ passing: 4, firstTouch: 4, vision: 4, stamina: 4, workRate: 4, dribbling: 4, strength: 2, discipline: 2 }),
    growthHistory: [growth("g-07-1", "2026-07-06", "dribbling", 3, 4), growth("g-07-2", "2026-06-19", "firstTouch", 3, 4)],
    trainingHistory: [{ id: "t-07-1", date: "2026-07-10 19:00", theme: "Third-man run", coach: "K. Mori", note: "前進するパスコースを作り続けた。" }, { id: "t-07-2", date: "2026-07-08 19:00", theme: "Small-sided game", coach: "R. Aoki", note: "運動量が落ちなかった。" }],
    matchHistory: [{ id: "m-07-1", date: "2026-07-06", opponent: "FC Blau U-17", minutes: 80, position: "CM", rating: 7.4, mvp: false }, { id: "m-07-2", date: "2026-06-29", opponent: "SV Nord U-17", minutes: 80, position: "CM", rating: 7.6, mvp: false }],
    coachNote: { id: "n-07", body: "両足でリズムを作れる。相手を外すターンの回数を増やす。", tags: ["#両利き", "#8番", "#ゲームメーカー"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-08", firstName: "Ren", lastName: "Fujimoto", birthDate: "2010-04-23", preferredFoot: "Right", heightCm: 162, weightKg: 52, club: "Project45 Academy", category: "U-15", squad: "U-15 First Team", number: 10, position: "AM", secondaryPositions: ["RW", "LW"], overallRating: 3, condition: "Watch", favorite: false, avatarTone: "violet",
    ratings: createRatings({ dribbling: 4, vision: 4, agility: 4, firstTouch: 4, confidence: 4, passing: 4, strength: 1, discipline: 2 }),
    growthHistory: [growth("g-08-1", "2026-07-09", "leadership", 2, 3), growth("g-08-2", "2026-06-26", "vision", 3, 4)],
    trainingHistory: [{ id: "t-08-1", date: "2026-07-10 19:00", theme: "Final third", coach: "K. Mori", note: "ラストパスの選択が良い。負荷は要観察。" }, { id: "t-08-2", date: "2026-07-08 19:00", theme: "1v1 attacking", coach: "R. Aoki", note: "相手を止めてから外す技術が向上。" }],
    matchHistory: [{ id: "m-08-1", date: "2026-07-06", opponent: "FC Blau U-15", minutes: 55, position: "AM", rating: 7.0, mvp: false }, { id: "m-08-2", date: "2026-06-29", opponent: "SV Nord U-15", minutes: 60, position: "AM", rating: 7.4, mvp: false }],
    coachNote: { id: "n-08", body: "創造性が高い。成長期の負荷と守備の切替を丁寧に扱う。", tags: ["#10番", "#クリエイター", "#負荷管理"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-09", firstName: "Kai", lastName: "Muller", birthDate: "2009-08-17", preferredFoot: "Left", heightCm: 171, weightKg: 59, club: "Project45 Academy", category: "U-17", squad: "U-17 First Team", number: 7, position: "RW", secondaryPositions: ["LW", "ST"], overallRating: 4, condition: "Good", favorite: true, avatarTone: "emerald",
    ratings: createRatings({ speed: 5, acceleration: 5, dribbling: 4, shooting: 4, confidence: 4, agility: 4, crossing: 2, strength: 2 }),
    growthHistory: [growth("g-09-1", "2026-07-07", "shooting", 3, 4), growth("g-09-2", "2026-06-23", "speed", 4, 5)],
    trainingHistory: [{ id: "t-09-1", date: "2026-07-10 19:00", theme: "Final third", coach: "K. Mori", note: "背後への飛び出しが鋭い。" }, { id: "t-09-2", date: "2026-07-08 19:00", theme: "Finishing", coach: "R. Aoki", note: "左足での決定力を確認。" }],
    matchHistory: [{ id: "m-09-1", date: "2026-07-06", opponent: "FC Blau U-17", minutes: 72, position: "RW", rating: 8.2, mvp: true }, { id: "m-09-2", date: "2026-06-29", opponent: "SV Nord U-17", minutes: 78, position: "RW", rating: 7.3, mvp: false }],
    coachNote: { id: "n-09", body: "爆発的な加速が最大の武器。逆サイドでの守備タスクも習慣化する。", tags: ["#左利き", "#ウインガー", "#フィニッシャー"], updatedAt: "2026-07-10" },
  },
  {
    id: "player-10", firstName: "Daichi", lastName: "Yamamoto", birthDate: "2010-12-04", preferredFoot: "Right", heightCm: 181, weightKg: 69, club: "Project45 Academy", category: "U-15", squad: "U-15 First Team", number: 9, position: "ST", secondaryPositions: ["LW"], overallRating: 3, condition: "Normal", favorite: false, avatarTone: "orange",
    ratings: createRatings({ shooting: 4, strength: 4, confidence: 4, workRate: 4, firstTouch: 4, speed: 3, passing: 2, vision: 2 }),
    growthHistory: [growth("g-10-1", "2026-07-10", "firstTouch", 3, 4), growth("g-10-2", "2026-06-17", "shooting", 3, 4)],
    trainingHistory: [{ id: "t-10-1", date: "2026-07-10 19:00", theme: "Finishing", coach: "K. Mori", note: "背負うプレーからの反転シュートが良い。" }, { id: "t-10-2", date: "2026-07-08 19:00", theme: "Pressing triggers", coach: "R. Aoki", note: "誘導の角度を改善中。" }],
    matchHistory: [{ id: "m-10-1", date: "2026-07-06", opponent: "FC Blau U-15", minutes: 68, position: "ST", rating: 7.4, mvp: false }, { id: "m-10-2", date: "2026-06-29", opponent: "SV Nord U-15", minutes: 70, position: "ST", rating: 7.1, mvp: false }],
    coachNote: { id: "n-10", body: "ボックス内で違いを作れる。前線からの守備を武器に育てる。", tags: ["#9番", "#ポストプレー", "#フィニッシャー"], updatedAt: "2026-07-10" },
  },
];

export const playerPositions = ["All", "GK", "RB", "CB", "LB", "DM", "CM", "AM", "RW", "LW", "ST"] as const;
export const playerCategories = ["All", "U-15", "U-17"] as const;
