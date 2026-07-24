import type { Metadata } from "next";
import ThemeSwitch from "./ThemeSwitch";

export const metadata: Metadata = {
  title: "Dmytrii Tamurov",
  description: "This site is currently being developed.",
  alternates: {
    canonical: "https://dmytriitamurov.com",
  },
  openGraph: {
    url: "https://dmytriitamurov.com",
    title: "Dmytrii Tamurov",
    description: "This site is currently being developed.",
    siteName: "Dmytrii Tamurov",
  },
};

export default function HomePage() {
  return (
    <main className="landing-page development-page" aria-label="Dmytrii Tamurov">
      <ThemeSwitch />
      <section className="development-shell">
        <h1>Dmytrii Tamurov</h1>
        <div className="development-notice">
          <p>This site is currently being developed.</p>
        </div>
      </section>
    </main>
  );
}
