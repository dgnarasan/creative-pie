import { pageMetadata } from "../seo";
import { DirectImage } from "../direct-image";
import { SmartLink } from "../site-chrome";

export const metadata = pageMetadata('About the Studio', 'Meet Creative Pie, a full-service, social-first creative agency based in Lagos and working with brands worldwide.', "/studio");

export default function StudioPage() {
  return (
    <main className="index-page">
      <header className="page-hero page-hero--studio">
        <span>Studio / Index 003</span>
        <h1>About<br />Creative Pie.</h1>
        <p>Creative Pie is a full-service, social-first marketing agency based in Lagos and working worldwide.</p>
        <div className="page-ring" aria-hidden="true" />
      </header>
      <section className="studio-feature">
        <div className="studio-feature__image"><DirectImage src="/assets/cp-studio-bts.webp" alt="Behind the scenes at a Creative Pie shoot: a model between studio lights" priority /></div>
        <div className="studio-feature__copy" data-reveal>
          <span>CP / Independent creative studio</span>
          <h2>One studio.<br /><em>Flexible teams.</em></h2>
          <p>We bring branding, creative direction, content production, social media management and websites together. Each project is staffed according to its scope.</p>
        </div>
      </section>
      <section className="belief-ledger">
        <article data-reveal><span>01</span><h3>Start with your brand.</h3><p>We agree on who you want to reach, what you need to communicate and what the project needs to deliver.</p></article>
        <article data-reveal><span>02</span><h3>Find the shared idea.</h3><p>We shape the concept, references and visual direction before moving into design or production.</p></article>
        <article data-reveal><span>03</span><h3>Make the pieces connect.</h3><p>Your imagery, words and design should feel like the same brand, from a social post to your website.</p></article>
        <article data-reveal><span>04</span><h3>Plan for what comes next.</h3><p>We agree on the formats, final files and any ongoing support your team needs after the work is delivered.</p></article>
      </section>
      <section className="studio-close" data-reveal>
        <span>Lagos + Worldwide</span><h2>Based in Lagos.<br />Working worldwide.</h2><SmartLink href="/contact">Contact the studio <i>↗︎</i></SmartLink>
      </section>
    </main>
  );
}
