"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { DirectImage } from "./direct-image";
import { SmartLink } from "./site-chrome";

const projects = [
  {
    slug: "anagen-paris",
    index: "01",
    title: "Anagen Paris",
    discipline: "Beauty / Art direction / AI production",
    color: "lime",
    copy: "A tactile hair-care world with product clarity, human texture and one recognisable visual grammar.",
    images: ["/assets/anagen-trio.webp", "/assets/anagen-application.webp", "/assets/anagen-flatlay.webp"],
    positions: ["center 22%", "center 25%", "center 48%"],
  },
  {
    slug: "second-skin",
    index: "02",
    title: "Second Skin",
    discipline: "Fragrance / Campaign film / AI visuals",
    color: "coral",
    copy: "A nocturnal fragrance ritual built from silk, smoke, skin and a product revealed slowly.",
    images: ["/assets/second-skin-bottle.webp", "/assets/second-skin-ritual.webp", "/assets/second-skin-bottle.webp"],
    positions: ["center 52%", "center 38%", "center 72%"],
  },
];

export function LivingHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeStart = useRef<number | null>(null);
  const project = projects[active];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 7600);
    return () => window.clearInterval(timer);
  }, [paused]);

  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function endSwipe(event: PointerEvent<HTMLDivElement>) {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 44) setActive((current) => (current + (distance < 0 ? 1 : -1) + projects.length) % projects.length);
  }

  return (
    <section
      className={`living-hero living-hero--${project.color}`}
      aria-labelledby="living-hero-title"
      onPointerMove={move}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="living-hero__grain" aria-hidden="true" />
      <div className="living-hero__eyebrow">
        <span>Creative Pie / Lagos + Worldwide</span>
        <span>Independent creative studio / 2026</span>
      </div>

      <div className="living-hero__grid">
        <div className="living-hero__copy">
          <p>Strategy, image and technology—edited into one clear point of view.</p>
          <h1 id="living-hero-title">
            <span>Ideas,</span>
            <em>cut to</em>
            <span>stay.</span>
          </h1>
          <div className="living-hero__intro">
            <span>CP—001</span>
            <p>We build campaign worlds and digital experiences people choose to spend time with.</p>
          </div>
        </div>

        <div
          className="living-hero__edit"
          onPointerDown={startSwipe}
          onPointerUp={endSwipe}
          onPointerCancel={() => { swipeStart.current = null; }}
        >
          <div className="living-hero__frames" key={project.slug}>
            <figure className="living-frame living-frame--lead">
              <DirectImage src={project.images[0]} alt="" priority style={{ objectPosition: project.positions[0] }} />
            </figure>
            <figure className="living-frame living-frame--detail">
              <DirectImage src={project.images[1]} alt="" priority style={{ objectPosition: project.positions[1] }} />
            </figure>
            <figure className="living-frame living-frame--object">
              <DirectImage src={project.images[2]} alt="" priority style={{ objectPosition: project.positions[2] }} />
            </figure>
            <div className="living-frame__cross" aria-hidden="true"><i /><b /></div>
            <p className="living-frame__note">Move / swipe<br />to change the edit</p>
          </div>

          <div className="living-hero__project">
            <div>
              <span>{project.index} / 02</span>
              <p>{project.discipline}</p>
            </div>
            <h2>{project.title}</h2>
            <p>{project.copy}</p>
            <SmartLink href={`/work/${project.slug}`}>Enter project <i>↗</i></SmartLink>
          </div>

          <div className="living-hero__controls" role="tablist" aria-label="Featured projects">
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
              >
                <span>{item.index}</span>
                <b>{item.title}</b>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="living-hero__foot">
        <SmartLink href="/work">Selected work <i>↘</i></SmartLink>
        <div><span>Creative direction</span><span>Campaigns</span><span>AI visuals</span><span>Digital experiences</span></div>
        <SmartLink href="/contact">Start something <i>↗</i></SmartLink>
      </div>
    </section>
  );
}
