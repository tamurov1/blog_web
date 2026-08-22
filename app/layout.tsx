import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dmytriitamurov.com"),
  title: "Dmytrii Tamurov — Secure systems & practical ideas",
  description: "I build and maintain secure systems, explore and connect complex ideas and turn knowledge into practical solutions.",
};

export const viewport: Viewport = {
  themeColor: "#eae5dd",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${cormorant.variable} ${inter.variable}`}>{children}</body></html>;
}
