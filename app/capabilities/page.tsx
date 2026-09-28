import { pageMetadata } from "../seo";
import { SmartLink } from "../site-chrome";
import { ResponsiveImage } from "../responsive-image";
import { CapabilitiesAccordion } from "./capabilities-accordion";

export const metadata = pageMetadata("Creative Services in Lagos", "Creative direction, content creation, social media management, branding and website design from Creative Pie. One-off projects, launches and ongoing support.", "/capabilities");

export default function CapabilitiesPage() {
  return (
    <main className="services-page">
      <header className="services-hero">
        <div><span className="subpage-eyebrow">Capabilities / Index 002</span><h1>Creative services.<br /><em>From idea<br />to out there.</em></h1><p>A brand to build. A campaign to shoot. A website to launch. Bring us the brief; we’ll help shape the work.</p><a className="subpage-text-link" href="#service-index">Explore our services <i aria-hidden="true">↓</i></a></div>
        <figure><ResponsiveImage src="/assets/cp-studio-bts.webp" alt="Behind the scenes on a Creative Pie studio shoot" sizes="(max-width: 700px) 92vw, 42vw" loading="eager" /><figcaption>Creative Pie / Behind the work</figcaption></figure>
      </header>
      <div className="services-section-intro"><span className="subpage-eyebrow">What we do</span><p>Choose the support your brand needs.</p></div>
      <CapabilitiesAccordion />
      <section className="engagements" aria-labelledby="engagements-title">
        <header><span className="subpage-eyebrow">How we work together</span><h2 id="engagements-title">One project.<br />A launch.<br /><em>The long run.</em></h2><p>The services above are what we do. These are the ways we can bring them together for you.</p></header>
        <div className="engagements__options">
          <article><span className="subpage-eyebrow">A defined brief</span><h3>One-off project</h3><p>A campaign, brand identity, website or content shoot with an agreed scope and handover.</p></article>
          <article><span className="subpage-eyebrow">A new beginning</span><h3>Brand or product launch</h3><p>Bring direction, production and digital work together around one launch.</p></article>
          <article><span className="subpage-eyebrow">A continuing partnership</span><h3>Ongoing support</h3><p>Regular content, social media management or design support, with the scope agreed together.</p></article>
        </div>
      </section>
      <section className="services-close"><p>Not sure where to start?</p><h2>Tell us what<br /><em>you have in mind.</em></h2><SmartLink href="/contact">Find the right service <i aria-hidden="true">↗︎</i></SmartLink></section>
    </main>
  );
}
