import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = { title: "Project45 OS", description: "Personal operating system for football coaches" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja" className="dark"><body><AppShell>{children}</AppShell></body></html>;
}
