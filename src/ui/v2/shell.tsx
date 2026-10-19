import { StoreProvider } from "@/lib/store-context";
import { V2Footer } from "./footer";
import { V2Header } from "./header";

export function V2Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <StoreProvider>
        <V2Header />
        <main id="main" className="site-main">
          {children}
        </main>
        <V2Footer />
      </StoreProvider>
    </>
  );
}
