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
  title: {
    default: "Dmytrii Tamurov | SOC Analyst Cybersecurity Portfolio",
    template: "%s | Dmytrii Tamurov",
  },
  description:
    "SOC Analyst-focused cybersecurity portfolio of Dmytrii Tamurov: SIEM-style investigation, network detection, incident reporting, Linux security automation, vulnerability research, and secure development projects.",
  authors: [{ name: "Dmytrii Tamurov", url: "https://dmytriitamurov.com" }],
  creator: "Dmytrii Tamurov",
  publisher: "Dmytrii Tamurov",
  alternates: {
    canonical: "https://dmytriitamurov.com",
  },
  keywords: [
    "Dmytrii Tamurov",
    "Dmytrii Tamurov portfolio",
    "cybersecurity portfolio",
    "SOC analyst portfolio",
    "entry level SOC analyst",
    "cybersecurity analyst portfolio",
    "SIEM investigation",
    "network security projects",
    "Snort lab",
    "Bash threat detection",
    "cybersecurity research",
    "threat intelligence",
    "vulnerability research",
    "SOC analysis",
    "incident response",
    "threat detection",
    "cybersecurity architecture path",
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
    title: "Dmytrii Tamurov | SOC Analyst Cybersecurity Portfolio",
    description:
      "SOC Analyst-focused cybersecurity portfolio of Dmytrii Tamurov: SIEM-style investigation, network detection, incident reporting, Linux security automation, vulnerability research, and secure development projects.",
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
    title: "Dmytrii Tamurov | SOC Analyst Cybersecurity Portfolio",
    description:
      "Cybersecurity portfolio focused on SOC analysis, threat detection, incident reporting, network defense, Linux automation, and secure development.",
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
