import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextStep | Your AI Student Success Platform",
  description: "Skill gap analysis, AI roadmaps, weekly planner, and verified opportunities for first-generation students in India.",
  keywords: ["student platform", "skill gap", "career roadmap", "internships", "scholarships", "AI planner", "first generation students"],
  authors: [{ name: "NextStep" }],
  openGraph: {
    type: "website",
    title: "NextStep — AI-Powered Student Success Platform",
    description: "Take the skill gap quiz, get a personalized career roadmap, and discover 150+ student benefits — all for free.",
    siteName: "NextStep",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextStep — AI-Powered Student Success Platform",
    description: "Take the skill gap quiz, get a personalized career roadmap, and discover 150+ student benefits — all for free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-primary/30">
        {children}
        <Toaster theme="system" position="top-right" richColors />
      </body>
    </html>
  );
}
