import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background"><Sidebar /><main className="min-h-screen px-4 pb-10 pt-20 lg:ml-72 lg:px-8 lg:pt-8">{children}</main></div>;
}
