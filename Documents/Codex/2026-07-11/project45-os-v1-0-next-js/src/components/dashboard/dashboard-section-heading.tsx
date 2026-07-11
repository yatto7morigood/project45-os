import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DashboardSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
};

export function DashboardSectionHeading({ eyebrow, title, action, className }: DashboardSectionHeadingProps) {
  return <div className={cn("flex items-start justify-between gap-4", className)}><div>{eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">{eyebrow}</p>}<h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-100">{title}</h2></div>{action}</div>;
}
