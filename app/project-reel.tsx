"use client";

import { PointerEvent, useRef, useState } from "react";
import { DirectImage } from "./direct-image";
import { SmartLink } from "./site-chrome";

const reelProjects = [
  {
    index: "01",
    title: "Second Skin",
    slug: "second-skin",
    discipline: "Campaign / Film / AI visuals",
    statement: "A nocturnal fragrance world shaped through silk, smoke and skin.",
    accent: "coral",
    media: [
      { src: "/assets/second-skin-bottle.webp", alt: "Second Skin After Hours bottle beneath illuminated silk" },
      { src: "/assets/second-skin-ritual.webp", alt: "Second Skin fragrance ritual in warm amber light" },
    ],
  },
  {
    index: "02",
    title: "Anagen Paris",
    slug: "anagen-paris",
    discipline: "Beauty / Art direction / Content",
    statement: "Different hair languages directed into one intimate beauty world.",
    accent: "lime",
    media: [
      { src: "/assets/anagen-trio.webp", alt: "Three models presenting Anagen Paris Hair Serum" },
      { src: "/assets/anagen-application.webp", alt: "Model applying Anagen Paris Hair Serum" },
      { src: "/assets/anagen-hair.webp", alt: "Anagen Paris Hair Serum framed by dark hair" },
      { src: "/assets/anagen-flatlay.webp", alt: "Anagen Paris Hair Serum product arrangement" },
    ],
  },
];

export function ProjectReel() {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const select = (index: number) => setActive((index + reelProjects.length) % reelProjects.length);

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function endSwipe(event: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    const travel = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(travel) < 42) return;
    select(active + (travel < 0 ? 1 : -1));
  }

  return (
    <section className="work-reel" aria-labelledby="work-reel-title">
      <header className="work-reel__header">
        <div><span>01</span><p>Selected work</p></div>
        <h2 id="work-reel-title">The work,<br /><em>in motion.</em></h2>
        <p>Campaign media is the navigation. Move through each visual world, then enter the full case study.</p>
      </header>

      <div
        className="work-reel__viewport"
        onPointerDown={startSwipe}
        onPointerUp={endSwipe}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {reelProjects.map((project, projectIndex) => (
          <article
            className={`work-reel__project work-reel__project--${project.accent}${active === projectIndex ? " is-active" : ""}`}
            aria-hidden={active !== projectIndex}
            key={project.slug}
          >
            <div className="work-reel__media" aria-hidden="true">
              <figure className="work-reel__media-main"><DirectImage src={project.media[0].src} alt="" priority={projectIndex === 0} /></figure>
              <figure className="work-reel__media-side"><DirectImage src={project.media[1].src} alt="" /></figure>
              <figure className="work-reel__media-detail"><DirectImage src={(project.media[2] ?? project.media[0]).src} alt="" /></figure>
            </div>
            <div className="work-reel__copy">
              <span>{project.index} / 02</span>
              <p>{project.discipline}</p>
              <h3>{project.title}</h3>
              <p>{project.statement}</p>
              <SmartLink href={`/work/${project.slug}`} tabIndex={active === projectIndex ? 0 : -1}>View case study <i>↗</i></SmartLink>
            </div>
          </article>
        ))}

        <div className="work-reel__controls">
          <div role="tablist" aria-label="Choose a project">
            {reelProjects.map((project, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Show ${project.title}`}
                onClick={() => select(index)}
                key={project.slug}
              ><span>{project.index}</span>{project.title}</button>
            ))}
          </div>
          <div>
            <button type="button" aria-label="Previous project" onClick={() => select(active - 1)}>←</button>
            <span><b>0{active + 1}</b> / 02</span>
            <button type="button" aria-label="Next project" onClick={() => select(active + 1)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
