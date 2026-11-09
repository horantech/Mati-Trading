import { Montserrat, Noto_Sans_Ethiopic } from "next/font/google";

/**
 * Brand typeface (Sibu Trading PLC identity): Montserrat for everything —
 * ExtraBold wordmark, SemiBold tracked descriptor, Bold headlines, Regular body.
 */
export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Amharic (Ge'ez script) — Montserrat has no Ethiopic glyphs. */
export const ethiopicSans = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-ethiopic-sans",
  display: "swap",
  preload: false,
});

export const fontVariables = [montserrat.variable, ethiopicSans.variable].join(" ");
