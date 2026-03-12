import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SiteShell } from "../components/site-shell";
import { StoreProvider } from "../components/store-provider";
import { brand } from "../lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: brand.seo.title,
    template: `%s | ${brand.name}`
  },
  description: brand.seo.description,
  openGraph: {
    title: brand.name,
    description: brand.seo.description,
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--brand-navy": brand.theme.navy,
            "--brand-navy-dark": brand.theme.navyDark,
            "--brand-navy-light": brand.theme.navyLight,
            "--brand-red": brand.theme.red,
            "--brand-red-dark": brand.theme.redDark,
            "--brand-amber": brand.theme.amber,
            "--brand-gold": brand.theme.gold,
            "--brand-surface": brand.theme.surface,
            "--brand-ink": brand.theme.ink
          } as CSSProperties
        }
      >
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
