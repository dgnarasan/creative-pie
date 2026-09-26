import type { Metadata } from "next";
import { DirectImage } from "../direct-image";
import { SmartLink } from "../site-chrome";

export const metadata: Metadata = { title: "Work", description: "Selected Creative Pie campaign work across beauty, fashion and drinks.", alternates: { canonical: "/work" } };

const work = [
  {
    number: "001",
    title: "Anagen Paris",
    type: "Hair serum / Campaign visuals",
    summary: "Product detail, application, texture and a multi-model beauty portrait developed as one connected image set.",
    image: "/assets/project-anagen-textures.webp",
    alt: "Anagen Paris Hair Serum framed by different hair textures",
    fit: "contain" as const,
    position: "center center",
  },
  {
    number: "002",
    title: "Vonne X2X",
    type: "Swimwear / Campaign content",
    summary: "A playful social-first campaign connecting bikinis, personal styling and the signature fur bag.",
    image: "/assets/project-vonne-blue.webp",
    alt: "Metallic blue Vonne X2X swimwear shown in full",
    fit: "contain" as const,
    position: "center center",
  },
  {
    number: "003",
    title: "Pie Bar",
    type: "Juice / Campaign content",
    summary: "Bright, direct product imagery designed as a clear and flexible social campaign system.",
    image: "/assets/project-piebar-duo.webp",
    alt: "Two models presenting Pie Bar juice bottles",
    fit: "contain" as const,
    position: "center 30%",
  },
  {
    number: "004",
    title: "KAYCLO",
    type: "Womenswear / Campaign content",
    summary: "The Mix Match Collection: fitted lounge sets, coordinated silhouettes and portrait studies in butter yellow, cocoa and soft pink.",
    image: "/assets/project-kayclo-collection.webp",
    alt: "KAYCLO Mix Match Collection showing three coordinated looks in butter yellow, cocoa and soft pink",
    fit: "contain" as const,
    position: "center center",
  },
];

export default function WorkPage() {
  return (
    <main className="cc-work-index">
      <header className="cc-work-index__hero">
        <span>Work / Index 001</span>
        <h1>Selected<br />work.</h1>
        <p>Campaign visuals across beauty, fashion and drinks, presented as complete image systems rather than isolated posts.</p>
      </header>

      <section className="cc-work-index__list" aria-label="Creative Pie selected work">
        {work.map((entry) => (
          <article key={entry.number}>
            <div>
              <span>{entry.number} / Project</span>
              <h2>{entry.title}</h2>
              <p>{entry.type}</p>
              <b>{entry.summary}</b>
              <SmartLink href="/contact">Discuss a related project <i>↗︎</i></SmartLink>
            </div>
            <figure className={`cc-work-index__media cc-work-index__media--${entry.fit}`}><DirectImage src={entry.image} alt={entry.alt} style={{ objectPosition: entry.position }} /></figure>
          </article>
        ))}
      </section>
    </main>
  );
}
