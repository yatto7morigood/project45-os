import { SectionPage } from "@/components/pages/section-page";

export function generateStaticParams() {
  return ["match-analysis", "training-planner", "players", "notebook", "learning", "german", "physical", "nutrition", "journal", "goals", "settings"].map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SectionPage slug={slug} />;
}
