import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, ThemeScript } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import { connectDB } from "@/lib/db";

type GlobalWithPackage = typeof globalThis & { packageName?: string };

{
  const g = globalThis as GlobalWithPackage;
  if (typeof g !== "undefined" && !g.packageName) {
    g.packageName = "@clerk/clerk-react";
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillConnect",
  description: "A freelance marketplace powered by Clerk & MongoDB",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  void connectDB();

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeScript />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        >
          <ThemeProvider>
            {children}
            <ScrollToTop />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
