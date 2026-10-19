import { Manrope } from "next/font/google";
import { site } from "@/config/content";
import type { UITheme } from "../contract";
import meta from "./theme.json";
import { sharedPages } from "../shared/pages";
import { V1Home } from "./home";
import { V1Shell } from "./shell";
import "./styles/theme.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const v1: UITheme = {
  id: "v1",
  label: meta.label,
  description: meta.description,
  locale: "en-US",
  metadata: {
    title: site.title,
    description: site.description,
  },
  fontClassName: manrope.variable,
  Shell: V1Shell,
  pages: {
    ...sharedPages,
    Home: V1Home,
  },
};

export default v1;
