import { Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageExamples } from "@/lib/dummy-data";
import { navigation } from "@/lib/navigation";

export function SectionPage({ slug }: { slug: string }) {
  const content = pageExamples[slug];
  const page = navigation.find((item) => item.href === `/${slug}`);
  if (!content || !page) notFound();
  const Icon = page.icon;
  return <div className="mx-auto max-w-6xl"><header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><Icon size={22} /></div><h1 className="text-3xl font-semibold tracking-tight text-white">{page.label}</h1><p className="mt-2 text-slate-400">{page.description}</p></div><Button><Plus size={16} />新規作成</Button></header><section className="grid gap-5 md:grid-cols-[0.7fr_1.3fr]"><Card className="bg-gradient-to-br from-blue-500/15 to-card"><CardContent className="p-6"><p className="text-sm text-slate-400">{content.metricLabel}</p><p className="mt-4 text-5xl font-semibold text-white">{content.metric}</p><p className="mt-4 text-sm text-blue-200">ダミーデータで表示中です</p></CardContent></Card><Card><CardHeader><CardTitle className="text-xl text-white">{content.heading}</CardTitle></CardHeader><CardContent><ul className="divide-y divide-white/10">{content.items.map((item, index) => <li key={item} className="flex items-center gap-4 py-4 first:pt-0"><span className="grid h-7 w-7 place-items-center rounded-full bg-slate-800 text-xs text-slate-400">{index + 1}</span><span className="text-sm text-slate-200">{item}</span></li>)}</ul></CardContent></Card></section><Card className="mt-5"><CardHeader><CardTitle className="text-base text-white">次の実装候補</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-slate-400">この画面では、一覧・詳細・作成フォームを段階的に追加できます。データ取得層を <code className="rounded bg-white/10 px-1.5 py-0.5 text-blue-200">src/features</code> に切り出すことで、ダミーデータからAPIへの置き換えにも対応できます。</CardContent></Card></div>;
}
