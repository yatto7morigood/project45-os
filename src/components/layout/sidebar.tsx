"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <nav className="space-y-1">{navigation.map((item) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    return <Link key={item.href} href={item.href} onClick={onNavigate} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors", isActive ? "bg-primary text-primary-foreground" : "text-slate-400 hover:bg-white/5 hover:text-slate-100")}><Icon size={18} />{item.label}</Link>;
  })}</nav>;
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  return <>
    <button onClick={() => setOpen(true)} className="fixed left-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-slate-950 text-slate-100 lg:hidden" aria-label="メニューを開く"><Menu size={20} /></button>
    {open && <button aria-label="メニューを閉じる" onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden" />}
    <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#080c16] px-4 py-6 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="mb-8 flex items-center justify-between px-3"><Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-bold text-primary-foreground">45</span><span><span className="block font-semibold">Project45</span><span className="block text-xs text-slate-500">COACH OS v1.0</span></span></Link><button onClick={() => setOpen(false)} className="text-slate-400 lg:hidden" aria-label="メニューを閉じる"><X size={20} /></button></div>
      <div className="flex-1 overflow-y-auto"><p className="mb-3 px-3 text-xs font-medium uppercase tracking-widest text-slate-600">Workspace</p><NavigationLinks onNavigate={() => setOpen(false)} /></div>
      <div className="mt-4 rounded-lg border border-blue-400/15 bg-blue-500/5 p-3 text-xs text-slate-400"><p className="font-medium text-slate-200">今週のフォーカス</p><p className="mt-1 leading-relaxed">「前進」の原則をすべての練習に接続する。</p></div>
    </aside>
  </>;
}
