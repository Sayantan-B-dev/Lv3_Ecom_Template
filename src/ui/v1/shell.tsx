import { StoreProvider } from "@/lib/store-context";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function V1Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <StoreProvider>
        <SiteHeader />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </StoreProvider>
    </>
  );
}
