import { Fraunces, Inter } from "next/font/google";
import { brand } from "@/config/brand";
import { editorialContent, site } from "@/config/content";
import type { UITheme } from "../contract";
import { sharedPages } from "../shared/pages";
import meta from "./theme.json";
import { V2Home } from "./home";
import { V2Shell } from "./shell";
import "./styles/theme.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const v2: UITheme = {
  id: "v2",
  label: meta.label,
  description: meta.description,
  locale: "en-US",
  metadata: {
    title: `${brand.name} — ${editorialContent.title}`,
    description: site.description,
  },
  fontClassName: `${inter.variable} ${fraunces.variable}`,
  Shell: V2Shell,
  pages: {
    ...sharedPages,
    Home: V2Home,
  },
};

export default v2;
