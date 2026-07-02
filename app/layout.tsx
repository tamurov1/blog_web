import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dmytriitamurov.com"),
  applicationName: "Dmytrii Tamurov",
  title: {
    default: "Dmytrii Tamurov",
    template: "%s",
  },
  description: "Dmytrii Tamurov.",
  authors: [{ name: "Dmytrii Tamurov", url: "https://dmytriitamurov.com" }],
  creator: "Dmytrii Tamurov",
  publisher: "Dmytrii Tamurov",
  alternates: {
    canonical: "https://dmytriitamurov.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "none",
      "max-snippet": 32,
      "max-video-preview": 0,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://dmytriitamurov.com",
    title: "Dmytrii Tamurov",
    description: "Dmytrii Tamurov.",
    siteName: "Dmytrii Tamurov",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Dmytrii Tamurov",
    description: "Dmytrii Tamurov.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f1dc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
