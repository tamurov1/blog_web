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
  metadataBase: new URL("https://dmytriitamurov.com"),
  applicationName: "Dmytrii Tamurov Portfolio",
  title: {
    default: "Dmytrii Tamurov Portfolio | Cybersecurity & Nexessary",
    template: "%s | Dmytrii Tamurov",
  },
  description:
    "Dmytrii Tamurov portfolio for cybersecurity, SOC analyst work, threat detection, Linux security automation, vulnerability research, secure development, and Nexessary.",
  authors: [{ name: "Dmytrii Tamurov", url: "https://dmytriitamurov.com" }],
  creator: "Dmytrii Tamurov",
  publisher: "Dmytrii Tamurov",
  category: "Cybersecurity portfolio",
  alternates: {
    canonical: "https://dmytriitamurov.com",
  },
  keywords: [
    "Dmytrii Tamurov",
    "Dmytrii Tamurov portfolio",
    "dmytriitamurov.com",
    "cybersecurity portfolio",
    "SOC analyst portfolio",
    "SOC analysis",
    "threat detection",
    "incident response",
    "network security",
    "Linux security automation",
    "vulnerability research",
    "secure development",
    "Nexessary",
    "Nexessary founder",
    "Dmytrii Tamurov Nexessary",
    "cybersecurity",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/pic-ava.png",
  },
  openGraph: {
    type: "website",
    url: "https://dmytriitamurov.com",
    title: "Dmytrii Tamurov Portfolio | Cybersecurity & Nexessary",
    description:
      "Cybersecurity portfolio for SOC analyst work, threat detection, Linux security automation, vulnerability research, secure development, and Nexessary.",
    siteName: "Dmytrii Tamurov Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/pic-ava.png",
        width: 360,
        height: 360,
        alt: "Dmytrii Tamurov cybersecurity portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dmytrii Tamurov Portfolio | Cybersecurity & Nexessary",
    description:
      "Cybersecurity portfolio focused on SOC analysis, threat detection, Linux automation, secure development, and Nexessary.",
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
        {children}
      </body>
    </html>
  );
}
