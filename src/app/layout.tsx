import ui from "ui";
import "./globals.css";

export const metadata = ui.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const Shell = ui.Shell;

  return (
    <html lang={ui.locale} className={ui.fontClassName}>
      <body className="site-body">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
