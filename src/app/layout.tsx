import type { Metadata } from "next";
import { site } from "@/config/content";
import { StoreProvider } from "@/lib/store-context";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="site-body">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StoreProvider>
          <SiteHeader />
          <main id="main" className="site-main">
            {children}
          </main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
