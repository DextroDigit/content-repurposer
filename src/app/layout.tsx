import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Repurposer — Turn one post into 15+ social posts",
  description:
    "Paste a blog post or article URL and get optimized social media posts for Twitter, LinkedIn, Instagram, Facebook, and TikTok — powered by AI.",
  openGraph: {
    title: "Content Repurposer",
    description:
      "One blog post → 15+ social posts. AI-powered content repurposing for Twitter, LinkedIn, Instagram, Facebook, and TikTok.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-white">{children}</body>
    </html>
  );
}
