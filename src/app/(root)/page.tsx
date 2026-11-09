import type { Metadata } from "next";
import Home from "../[locale]/page";
import { pageMetadata } from "@/lib/metadata";

// Same content as /en/; canonical points at /en/ to avoid duplicate-content issues.
export const metadata: Metadata = pageMetadata("en", "/");

export default function RootPage() {
  return <Home params={Promise.resolve({ locale: "en" as const })} />;
}
