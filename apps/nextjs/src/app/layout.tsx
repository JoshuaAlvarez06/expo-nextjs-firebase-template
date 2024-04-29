import type { Metadata, Viewport } from "next";
import { cn } from "@pawrty/ui";
import { ThemeProvider, ThemeToggle } from "@pawrty/ui/theme";
import { Toaster } from "@pawrty/ui/toast";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { AuthProvider } from "~/providers";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_ENV === "production"
      ? "https://pawrty.app"
      : "http://localhost:3000",
  ),
  title: "Pawrty",
  description: "Pawrty is a social media platform for pets.",
  openGraph: {
    title: "Pawrty",
    description: "Pawrty is a social media platform for pets.",
    url: "https://pawrty.app",
    siteName: "Pawrty",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <AuthProvider>{props.children}</AuthProvider>
          </TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
