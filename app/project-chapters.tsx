import { DirectImage } from "./direct-image";
import { SmartLink } from "./site-chrome";

const projects = [
  {
    index: "01",
    title: "Anagen Paris",
    slug: "anagen-paris",
    className: "project-chapter--anagen",
    eyebrow: "Hair care / Beauty / 2026",
    statement: "One beauty world. Every texture invited.",
    copy: "We directed distinct faces, hair languages and product moments into a campaign system that feels warm, premium and unmistakably connected.",
    media: ["/assets/anagen-trio.webp", "/assets/anagen-application.webp", "/assets/anagen-hair.webp", "/assets/anagen-flatlay.webp"],
  },
  {
    index: "02",
    title: "Second Skin",
    slug: "second-skin",
    className: "project-chapter--second-skin",
    eyebrow: "Fragrance / Film / 2026",
    statement: "The product arrives after the feeling.",
    copy: "A campaign told through proximity: silk becomes veil, smoke becomes memory, and the bottle is discovered instead of announced.",
    media: ["/assets/second-skin-bottle.webp", "/assets/second-skin-ritual.webp", "/assets/second-skin-bottle.webp", "/assets/second-skin-ritual.webp"],
  },
];

export function ProjectChapters() {
  return (
    <section className="project-chapters" aria-labelledby="project-chapters-title">
      <header className="project-chapters__header ruled-section">
        <span>01 / Selected work</span>
        <h2 id="project-chapters-title">The work is<br /><em>the interface.</em></h2>
        <p>Open a campaign by moving through it—not by reading around it.</p>
      </header>

      {projects.map((project) => (
        <article className={`project-chapter ${project.className}`} key={project.slug}>
          <div className="project-chapter__copy">
            <div><span>{project.index} / 02</span><span>{project.eyebrow}</span></div>
            <h3>{project.title}</h3>
            <blockquote>{project.statement}</blockquote>
            <p>{project.copy}</p>
            <SmartLink href={`/work/${project.slug}`}>View full case study <i>↗</i></SmartLink>
          </div>
          <div className="project-chapter__media" aria-label={`${project.title} campaign preview`}>
            <figure className="project-chapter__a"><DirectImage src={project.media[0]} alt={`${project.title} campaign frame one`} /></figure>
            <figure className="project-chapter__b"><DirectImage src={project.media[1]} alt={`${project.title} campaign frame two`} /></figure>
            <figure className="project-chapter__c"><DirectImage src={project.media[2]} alt={`${project.title} campaign detail`} /></figure>
            <figure className="project-chapter__d"><DirectImage src={project.media[3]} alt={`${project.title} campaign object study`} /></figure>
          </div>
        </article>
      ))}
    </section>
  );
}
