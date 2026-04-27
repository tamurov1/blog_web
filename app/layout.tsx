import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ADSENSE_CLIENT_ID } from "@/data/adsense";
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
  metadataBase: new URL("https://dmytriitamurov.com"),
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
  title: {
    default: "Dmytrii Tamurov",
    template: "%s | Dmytrii Tamurov",
  },
  description:
    "Cybersecurity and IT research by Dmytrii Tamurov: threat intelligence, vulnerability analysis, SOC notes, and secure development.",
  authors: [{ name: "Dmytrii Tamurov", url: "https://dmytriitamurov.com" }],
  creator: "Dmytrii Tamurov",
  publisher: "Dmytrii Tamurov",
  alternates: {
    canonical: "https://dmytriitamurov.com",
  },
  keywords: [
    "Dmytrii Tamurov",
    "Dmytrii Tamurov Nexessary",
    "Nexessary",
    "Nexessary founder",
    "TMK",
    "cybersecurity research",
    "threat intelligence",
    "vulnerability research",
    "SOC analysis",
    "incident response",
    "secure development",
    "IT security",
    "cybersecurity",
    "dmytrii",
    "tamurov",
    "dmytrii tamurov",
    "cybersecurity",
    "tamurov project",
    "tamurov cybersecurity",
  ],
  openGraph: {
    type: "website",
    url: "https://dmytriitamurov.com",
    title: "Dmytrii Tamurov",
    description:
      "Cybersecurity and IT research by Dmytrii Tamurov: threat intelligence, vulnerability analysis, SOC notes, and secure development.",
    siteName: "Dmytrii Tamurov",
    images: [
      {
        url: "/pic-ava.png",
        width: 150,
        height: 150,
        alt: "Dmytrii Tamurov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dmytrii Tamurov",
    description:
      "Cybersecurity and IT research by Dmytrii Tamurov.",
    images: ["/pic-ava.png"],
  },
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
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
