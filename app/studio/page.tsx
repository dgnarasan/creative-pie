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
        <div className="studio-feature__image"><DirectImage src="/assets/cp-culture-cut-process.webp" alt="Hands editing printed campaign proofs at a Creative Pie working session" priority /></div>
        <div className="studio-feature__copy" data-reveal>
          <span>CP / Independent since 2024</span>
          <h2>One studio.<br /><em>Flexible teams.</em></h2>
          <p>We bring branding, creative direction, content production, social media management and websites together. Each project is staffed according to its scope.</p>
        </div>
      </section>
      <section className="belief-ledger">
        <article data-reveal><span>01</span><h3>Define the problem.</h3><p>We agree on the audience, objective and practical constraints before production.</p></article>
        <article data-reveal><span>02</span><h3>Set the direction.</h3><p>Typography, imagery, pacing and tone are established before assets are multiplied.</p></article>
        <article data-reveal><span>03</span><h3>Use motion carefully.</h3><p>Movement supports navigation, hierarchy and feedback.</p></article>
        <article data-reveal><span>04</span><h3>Choose the right method.</h3><p>Photography, film, AI, design and code are selected according to the assignment.</p></article>
      </section>
      <section className="studio-close" data-reveal>
        <span>Lagos + Worldwide</span><h2>Based in Lagos.<br />Working worldwide.</h2><SmartLink href="/contact">Contact the studio <i>↗︎</i></SmartLink>
      </section>
    </main>
  );
}
