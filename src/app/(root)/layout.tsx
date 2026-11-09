import "../globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SiteShell } from "@/components/SiteShell";

export const viewport: Viewport = { themeColor: "#0c1626" };

/** "/" serves the English site directly — English is the default language. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
