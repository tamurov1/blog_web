import type { Metadata } from "next";
import Link from "next/link";
import RegulatoryWorldMap from "../../RegulatoryWorldMap";

export const metadata: Metadata = {
  title: "Global Privacy Regulation Atlas — Research",
  description: "An interactive atlas of country-level privacy frameworks and regulatory models.",
};

export default function PrivacyRegulationResearchPage() {
  return <main className="case-study-page regulatory-research-page">
    <article className="case-study-shell">
      <header className="case-study-header">
        <Link className="case-study-back" href="/#researches">← Back to researches</Link>
        <h1>Global Privacy Regulation Atlas</h1>
        <p className="case-study-lead">An exploratory, country-level reference for comparing privacy frameworks and regulatory models. Select countries on the map to inspect each jurisdiction.</p>
        <dl className="case-study-facts">
          <div><dt>Focus</dt><dd>Privacy and data-protection regulation</dd></div>
          <div><dt>Coverage</dt><dd>Global jurisdictions, keyed by ISO alpha-3 codes</dd></div>
          <div><dt>Interaction</dt><dd>Hover, tap, zoom, pan, and reset</dd></div>
        </dl>
      </header>
      <section className="research-map-section" aria-label="Interactive atlas">
        <RegulatoryWorldMap />
      </section>
    </article>
  </main>;
}
