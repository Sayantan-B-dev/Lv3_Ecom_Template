import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { brand } from "@/config/brand";
import { editorialContent, site } from "@/config/content";
import type { UITheme } from "../contract";
import { sharedPages } from "../shared/pages";
import meta from "./theme.json";
import { V3Home } from "./home";
import { V3Shell } from "./shell";
import "./styles/theme.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const v3: UITheme = {
  id: "v3",
  label: meta.label,
  description: meta.description,
  locale: "en-US",
  metadata: {
    title: `${brand.name} - ${editorialContent.title}`,
    description: site.description,
  },
  fontClassName: `${grotesk.variable} ${serif.variable} ${mono.variable}`,
  Shell: V3Shell,
  pages: {
    ...sharedPages,
    Home: V3Home,
  },
};

export default v3;
