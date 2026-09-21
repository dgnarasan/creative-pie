"use client";

import { useEffect, useState } from "react";
import { DirectImage } from "./direct-image";
import { SmartLink } from "./site-chrome";

const slides = [
  {
    id: "culture",
    label: "Selected work",
    href: "/work",
    beauty: "/assets/culture-beauty-clean.webp",
    stilllife: "/assets/culture-stilllife-clean.webp",
    orbit: "/assets/culture-orbit-clean.webp",
    beautyPosition: "center",
    stilllifePosition: "center",
    orbitPosition: "center",
  },
  {
    id: "second-skin",
    label: "Second Skin",
    href: "/work/second-skin",
    beauty: "/assets/second-skin-ritual.webp",
    stilllife: "/assets/second-skin-bottle.webp",
    orbit: "/assets/second-skin-ritual.webp",
    beautyPosition: "center 42%",
    stilllifePosition: "center 58%",
    orbitPosition: "center 38%",
  },
  {
    id: "anagen-paris",
    label: "Anagen Paris",
    href: "/work/anagen-paris",
    beauty: "/assets/anagen-trio.webp",
    stilllife: "/assets/anagen-flatlay.webp",
    orbit: "/assets/anagen-application.webp",
    beautyPosition: "center 24%",
    stilllifePosition: "center 48%",
    orbitPosition: "center 28%",
  },
];

const services = [
  "Creative direction",
  "Content creation",
  "Branding",
  "AI visuals",
  "Social media management",
];

export function CultureHeroStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[active];

  const select = (next: number) => setActive((next + slides.length) % slides.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="culture-hero__stage"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="culture-hero__glow" aria-hidden="true" />

      <div className={`culture-hero__media culture-hero__media--${slide.id}`} key={slide.id} aria-hidden="true">
        <figure className="culture-hero__beauty">
          <DirectImage src={slide.beauty} alt="" priority style={{ objectPosition: slide.beautyPosition }} />
        </figure>
        <figure className="culture-hero__stilllife">
          <DirectImage src={slide.stilllife} alt="" priority style={{ objectPosition: slide.stilllifePosition }} />
        </figure>
        <figure className="culture-hero__orbit">
          <DirectImage src={slide.orbit} alt="" priority style={{ objectPosition: slide.orbitPosition }} />
        </figure>
      </div>

      <h1 id="hero-title" className="culture-hero__title">
        <span className="culture-hero__we">We make</span>
        <span className="culture-hero__culture">culture</span>
        <span className="culture-hero__worth">worth</span>
        <span className="culture-hero__stopping">stopping for.</span>
      </h1>

      <div className="culture-hero__orbit-scrim" aria-hidden="true" />
      <SmartLink className="culture-hero__project-link" href={slide.href} aria-label={`View ${slide.label}`}>
        <span className="culture-hero__project-arrow" aria-hidden="true" />
      </SmartLink>
      <div className="culture-hero__project-controls" aria-label="Featured work carousel">
        <span aria-live="polite"><b>{String(active + 1).padStart(2, "0")}</b> / {String(slides.length).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => select(active - 1)} aria-label="Previous featured project">←</button>
          <button type="button" onClick={() => select(active + 1)} aria-label="Next featured project">→</button>
        </div>
        <SmartLink href={slide.href}>{slide.label} <i>↗</i></SmartLink>
      </div>

      <div className="culture-hero__copy">
        <p>Before they spend money,<br />they spend attention.</p>
        <SmartLink href="/contact">Start a project <i>→</i></SmartLink>
      </div>

      <div className="culture-hero__rail" aria-label={`Creative Pie services: ${services.join(", ")}`}>
        <span className="culture-hero__rail-arrow" aria-hidden="true" />
        <div className="culture-hero__rail-viewport">
          <div className="culture-hero__rail-track">
            {[0, 1].map((copy) => (
              <div className="culture-hero__rail-group" key={copy} aria-hidden={copy === 1}>
                {services.map((service) => (
                  <SmartLink href="/capabilities" key={`${copy}-${service}`}>{service}<b>•</b></SmartLink>
                ))}
              </div>
            ))}
          </div>
        </div>
        <span className="culture-hero__rail-arrow culture-hero__rail-arrow--next" aria-hidden="true" />
      </div>
    </div>
  );
}
