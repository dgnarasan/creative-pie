import type { Metadata } from "next";
import { SmartLink } from "../site-chrome";
import { CapabilitiesAccordion } from "./capabilities-accordion";

export const metadata: Metadata = { title: "Capabilities", description: "Creative Pie capabilities.", alternates: { canonical: "/capabilities" } };

export default function CapabilitiesPage() {
  return (
    <main className="index-page">
      <header className="page-hero page-hero--services">
        <span>Capabilities / Index 002</span>
        <h1>Creative services<br /><em>and production.</em></h1>
        <p>Full-service, social-first support: creative direction, content creation, social media management, branding and websites.</p>
        <div className="page-ring" aria-hidden="true" />
      </header>
      <CapabilitiesAccordion />
      <section className="working-modes ruled-section">
        <div className="section-label"><span>03</span><p>Ways to work</p><p>Project / Launch / Ongoing</p></div>
        <div>
          <article data-reveal><span>01</span><h3>Project</h3><p>A defined campaign, identity, website or strategy assignment.</p></article>
          <article data-reveal><span>02</span><h3>Launch</h3><p>Strategy, production and digital delivery for a new launch.</p></article>
          <article data-reveal><span>03</span><h3>Ongoing support</h3><p>Regular content creation, social media management and creative support.</p></article>
        </div>
        <SmartLink href="/contact" className="section-link">Start a conversation <i>↗︎</i></SmartLink>
      </section>
    </main>
  );
}
