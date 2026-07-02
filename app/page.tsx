import type { Metadata } from "next";
import ThemeSwitch from "./ThemeSwitch";

export const metadata: Metadata = {
  title: "Dmytrii Tamurov",
  description: "Dmytrii Tamurov.",
  alternates: {
    canonical: "https://dmytriitamurov.com",
  },
  openGraph: {
    url: "https://dmytriitamurov.com",
    title: "Dmytrii Tamurov",
    description: "Dmytrii Tamurov.",
    siteName: "Dmytrii Tamurov",
  },
};

const tiles = [
  { label: "Journal", href: "/journal" },
  { label: "Nexessary", href: "https://nexessary.com" },
  { label: "Cybersecurity", href: "/cybersecurity" },
  { label: "Library", href: "/library" },
  { label: "Soon", disabled: true },
  { label: "Soon", disabled: true },
];

export default function HomePage() {
  return (
    <main className="landing-page" aria-label="Dmytrii Tamurov">
      <ThemeSwitch />
      <section className="landing-shell">
        <h1>Dmytrii Tamurov</h1>

        <nav className="tile-grid" aria-label="Primary">
          {tiles.map((tile, index) => {
            const className = "tile-button";
            const style = { animationDelay: `${180 + index * 70}ms` };

            if (!tile.href) {
              return (
                <button
                  key={`${tile.label}-${index}`}
                  className={className}
                  type="button"
                  aria-disabled={tile.disabled ? "true" : undefined}
                  style={style}
                >
                  {tile.label}
                </button>
              );
            }

            return (
              <a
                key={tile.label}
                className={className}
                href={tile.href}
                target={tile.href.startsWith("http") ? "_blank" : undefined}
                rel={tile.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={style}
              >
                {tile.label}
              </a>
            );
          })}
        </nav>
      </section>
    </main>
  );
}
