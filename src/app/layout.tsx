import type { Metadata, Viewport } from "next";
import "./globals.css";
import { APP_NAME, APP_TAGLINE, SCHOOL_CONTEXT } from "@content/config";
import { AppProviders } from "@/providers/app-providers";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - ${APP_TAGLINE}`,
    template: `%s - ${APP_NAME}`,
  },
  description: `Application pédagogique de technologie, cycle 4. ${SCHOOL_CONTEXT}.`,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/icons/icon-32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/icon-180.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c2410c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-ink antialiased">
        <AppProviders>
          <SkipLink />
          <Header />
          <main id="contenu-principal" className="flex-1">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
