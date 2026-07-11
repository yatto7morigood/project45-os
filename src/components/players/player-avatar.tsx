import { cn } from "@/lib/utils";
import type { Player } from "@/lib/player-types";

const avatarTones = {
  blue: "from-blue-500 to-blue-700",
  cyan: "from-cyan-500 to-sky-700",
  violet: "from-violet-500 to-indigo-700",
  emerald: "from-emerald-500 to-teal-700",
  orange: "from-orange-400 to-rose-600",
};

type PlayerAvatarProps = {
  player: Pick<Player, "firstName" | "lastName" | "avatarTone">;
  size?: "sm" | "md" | "lg";
};

export function PlayerAvatar({ player, size = "md" }: PlayerAvatarProps) {
  const sizes = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm", lg: "h-16 w-16 text-lg" };
  const initials = [player.firstName[0], player.lastName[0]].join("");
  return <div className={cn("grid shrink-0 place-items-center rounded-xl bg-gradient-to-br font-semibold text-white shadow-inner shadow-white/10", sizes[size], avatarTones[player.avatarTone])} aria-label={player.firstName + " " + player.lastName}>{initials}</div>;
}
