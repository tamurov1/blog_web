import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dmytrii Tamurov's Portfolio",
  description: "Created by the biggest brains in the world.",
  authors: [{ name: "Dmytrii Tamurov", url: "https://dmytriitamurov.com" }],
  keywords: [
    "Dmytrii Tamurov",
    "portfolio",
    "TMK",
    "personal website",
    "tech blog",
    "ideas",
    "research",
    "frontend",
    "cybersecurity",
    "dmytrii",
    "tamurov",
    "dmytrii tamurov"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-black dark:bg-[#111] dark:text-white">
      <body
        className={`antialiased ${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
