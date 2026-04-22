import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://dmytriitamurov.com"),
  title: {
    default: "Dmytrii Tamurov",
    template: "%s | Dmytrii Tamurov",
  },
  description:
    "Official site of Dmytrii Tamurov - cybersecurity and software projects, including Nexessary.",
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
    "Dmytrii Tamurov projects",
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
      "Official site of Dmytrii Tamurov - cybersecurity and software projects, including Nexessary.",
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
      "Cybersecurity and software projects by Dmytrii Tamurov, including Nexessary.",
    images: ["/pic-ava.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" className="bg-white text-black dark:bg-[#111] dark:text-white">
      <body
        className={`antialiased ${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        {adsenseClient && (
          <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
        {children}
      </body>
    </html>
  );
}
