import { StoreProvider } from "@/lib/store-context";
import { V3Footer } from "./footer";
import { V3Header } from "./header";

export function V3Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <StoreProvider>
        <V3Header />
        <main id="main" className="site-main">
          {children}
        </main>
        <V3Footer />
      </StoreProvider>
    </>
  );
}
