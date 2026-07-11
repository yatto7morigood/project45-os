import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Rating } from "@/lib/player-types";

export function RatingStars({ rating, size = "sm", showValue = false }: { rating: Rating; size?: "sm" | "md"; showValue?: boolean }) {
  const iconSize = size === "sm" ? 13 : 15;
  return <span className="inline-flex items-center gap-0.5" aria-label={rating + " out of 5"}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={iconSize} className={cn(index < rating ? "fill-amber-300 text-amber-300" : "text-slate-700")} />)}{showValue && <span className="ml-1 text-xs font-semibold text-slate-300">{rating}.0</span>}</span>;
}
