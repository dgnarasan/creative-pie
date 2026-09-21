"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DirectImage } from "./direct-image";
import { articles } from "./site-data";
import { SmartLink } from "./site-chrome";

type Study = {
  number: string;
  title: string;
  discipline: string;
  description: string;
  image: string;
  alt: string;
  position: string;
};

const studies: Study[] = [
  {
    number: "01",
    title: "Night movement",
    discipline: "Motion direction / editorial",
    description: "A location study built around pace, street light and the shape a moving frame leaves behind.",
    image: "/assets/cp-culture-cut-hero.webp",
    alt: "People crossing a Lagos street at night in an editorial motion study",
    position: "center 62%",
  },
  {
    number: "02",
    title: "Working edit",
    discipline: "Creative direction / process",
    description: "Physical proofs are used to decide crop, sequence and hierarchy before a campaign system expands.",
    image: "/assets/cp-culture-cut-process.webp",
    alt: "Hands arranging printed campaign proofs on a worn studio table",
    position: "center center",
  },
  {
    number: "03",
    title: "Material study",
    discipline: "Fashion direction / image system",
    description: "Colour, texture and gesture are tested as one visual language before the final production is planned.",
    image: "/assets/cp-culture-cut-material.webp",
    alt: "Textured fabric being pinned and adjusted in a working fashion studio",
    position: "center center",
  },
  {
    number: "04",
    title: "Object study",
    discipline: "Still life / launch content",
    description: "A restrained object world designed to hold up across a hero image, short film and social cut-downs.",
    image: "/assets/cp-culture-cut-object.webp",
    alt: "Editorial object and packaging still life on a practical studio set",
    position: "center center",
  },
];

const serviceEntries = [
  {
    number: "01",
    title: "Creative direction",
    short: "Positioning, concepts and a visual system that can guide production.",
    detail: "Research, campaign territories, art direction, styling language, shot planning and production leadership.",
    image: studies[1].image,
    alt: studies[1].alt,
  },
  {
    number: "02",
    title: "Campaigns + content",
    short: "Still and moving work for launches, advertising and social channels.",
    detail: "Campaign systems, film direction, social cut-downs, product storytelling, AI-assisted production and post-production.",
    image: studies[0].image,
    alt: studies[0].alt,
  },
  {
    number: "03",
    title: "Brand systems",
    short: "Identity and rollout decisions that make the brand easier to recognise.",
    detail: "Identity refinement, typography, image rules, templates, launch toolkits and practical brand guidance.",
    image: studies[2].image,
    alt: studies[2].alt,
  },
  {
    number: "04",
    title: "Digital experiences",
    short: "Websites planned around the client journey and built for every screen.",
    detail: "Site strategy, UX, interface design, motion direction, responsive development, commerce and launch support.",
    image: studies[3].image,
    alt: studies[3].alt,
  },
];

const processSteps = [
  ["01", "Brief + research", "We define the audience, problem, timing and practical constraints."],
  ["02", "Concept + direction", "One clear route sets the type, image, motion and production language."],
  ["03", "Production + review", "The system is made, tested and edited against the agreed direction."],
  ["04", "Launch + handover", "Final assets, working files and usage guidance are prepared for the team."],
];

const ease = [0.16, 1, 0.3, 1] as const;

function StudyImage({ study, eager = false }: { study: Study; eager?: boolean }) {
  return (
    <motion.img
      key={study.image}
      src={study.image}
      alt={study.alt}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      style={{ objectPosition: study.position }}
      initial={{ opacity: 0, scale: 1.045, x: "2%" }}
      animate={{ opacity: 1, scale: 1.01, x: "0%" }}
      exit={{ opacity: 0, scale: 1.02, x: "-1.5%" }}
      transition={{ duration: 0.72, ease }}
    />
  );
}

export function CultureCutHome() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [journalIndex, setJournalIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [processIndex, setProcessIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (heroPaused || reducedMotion) return;
    const timer = window.setInterval(() => setHeroIndex((value) => (value + 1) % studies.length), 5400);
    return () => window.clearInterval(timer);
  }, [heroPaused, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    let cancelled = false;
    let context: { revert: () => void } | undefined;
    let mm: { add: (condition: string, callback: () => void) => void; revert: () => void } | undefined;

    async function prepareMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        mm = gsap.matchMedia();
        mm.add("(min-width: 900px)", () => {
          gsap.to(".cc-hero__film", {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: ".cc-hero", start: "top top", end: "bottom bottom", scrub: 0.8 },
          });
          gsap.to(".cc-hero__headline", {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: ".cc-hero", start: "top top", end: "bottom bottom", scrub: 0.8 },
          });
        });
        gsap.fromTo(
          ".cc-work__heading > *",
          { opacity: 0, y: 42 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".cc-work__heading", start: "top 78%", once: true } },
        );
        gsap.fromTo(
          ".cc-services__preview",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut", scrollTrigger: { trigger: ".cc-services", start: "top 70%", once: true } },
        );
        gsap.fromTo(
          ".cc-studio__media",
          { yPercent: 8 },
          { yPercent: -5, ease: "none", scrollTrigger: { trigger: ".cc-studio", start: "top bottom", end: "bottom top", scrub: 0.9 } },
        );
        gsap.fromTo(
          ".cc-journal__row",
          { opacity: 0, x: 36 },
          { opacity: 1, x: 0, stagger: 0.09, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: ".cc-journal__list", start: "top 78%", once: true } },
        );
      }, rootRef);
    }

    prepareMotion();
    return () => {
      cancelled = true;
      mm?.revert();
      context?.revert();
    };
  }, [reducedMotion]);

  function changeWork(direction: number) {
    setWorkIndex((value) => (value + direction + studies.length) % studies.length);
  }

  const activeHero = studies[heroIndex];
  const activeWork = studies[workIndex];
  const activeService = serviceEntries[serviceIndex];

  return (
    <div className="cc-home" ref={rootRef}>
      <section className="cc-hero" aria-labelledby="cc-hero-title">
        <div className="cc-hero__pin">
          <div className="cc-hero__topline">
            <span>Creative studio / Lagos + worldwide</span>
            <span>Culture Cut / {activeHero.number}</span>
          </div>

          <div className="cc-hero__layout">
            <div className="cc-hero__copy">
              <span className="cc-kicker">Strategy / Direction / Production / Digital</span>
              <h1 className="cc-hero__headline" id="cc-hero-title">
                <span>We make</span>
                <span>culture</span>
                <span>worth</span>
                <span>stopping for.</span>
              </h1>
              <p>Creative direction, campaigns, content and digital experiences for brands with something worth saying.</p>
              <SmartLink href="/contact" className="cc-text-link">Start a project <i>↗</i></SmartLink>
            </div>

            <div
              className="cc-hero__film"
              onPointerEnter={() => setHeroPaused(true)}
              onPointerLeave={() => setHeroPaused(false)}
            >
              <figure>
                <AnimatePresence mode="wait" initial={false}>
                  <StudyImage study={activeHero} eager />
                </AnimatePresence>
                <figcaption><span>Studio study {activeHero.number}</span><span>{heroPaused ? "Paused" : "Playing"}</span></figcaption>
              </figure>
              <div className="cc-hero__film-meta">
                <span>{activeHero.discipline}</span>
                <strong>{activeHero.title}</strong>
              </div>
              <div className="cc-hero__progress" aria-hidden="true">
                {studies.map((study, index) => <i key={study.number} className={index === heroIndex ? "is-active" : ""} />)}
              </div>
            </div>

            <div className="cc-hero__service-index" aria-label="Creative Pie services">
              {serviceEntries.map((service, index) => (
                <button key={service.number} type="button" className={index === heroIndex ? "is-active" : ""} onClick={() => setHeroIndex(index)}>
                  <span>{service.number}</span><strong>{service.title}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="cc-hero__base"><span>Independent studio</span><span>Scroll to enter work ↓</span><span>© 2026</span></div>
        </div>
      </section>

      <section className="cc-work" id="work" aria-labelledby="cc-work-title">
        <div className="cc-work__heading">
          <span>01 / Selected studies</span>
          <h2 id="cc-work-title">One idea.<br /><em>Full frame.</em></h2>
          <p>Original Creative Pie studies showing how a visual direction can move across image, film and digital. They are clearly marked as studio work.</p>
        </div>

        <article className="cc-work__stage">
          <div className="cc-work__copy">
            <div><span>Studio study / {activeWork.number}</span><span>{activeWork.discipline}</span></div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeWork.title} initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -14 }} transition={{ duration: reducedMotion ? 0 : 0.45, ease }}>
                <h3>{activeWork.title}</h3>
                <p>{activeWork.description}</p>
              </motion.div>
            </AnimatePresence>
            <SmartLink href="/work">Open work index <i>↗</i></SmartLink>
          </div>

          <motion.figure className="cc-work__media" key={`work-${activeWork.number}`} drag={reducedMotion ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 55) changeWork(info.offset.x > 0 ? -1 : 1); }}>
            <AnimatePresence mode="wait" initial={false}>
              <StudyImage study={activeWork} />
            </AnimatePresence>
            <figcaption><span>Original studio study</span><span>Not client work</span></figcaption>
          </motion.figure>

          <div className="cc-work__controls">
            <button type="button" onClick={() => changeWork(-1)} aria-label="Previous study">←</button>
            <span>{activeWork.number} / 04</span>
            <button type="button" onClick={() => changeWork(1)} aria-label="Next study">→</button>
          </div>
          <div className="cc-work__track" role="tablist" aria-label="Choose a studio study">
            {studies.map((study, index) => <button key={study.number} role="tab" aria-selected={index === workIndex} onClick={() => setWorkIndex(index)}><span>{study.number}</span>{study.title}</button>)}
          </div>
        </article>
      </section>

      <section className="cc-services" id="services" aria-labelledby="cc-services-title">
        <div className="cc-services__title">
          <span>02 / Services</span>
          <h2 id="cc-services-title">Clear scope.<br />One lead direction.</h2>
          <p>Choose the part you need or bring us in from the first brief through launch.</p>
        </div>

        <div className="cc-services__layout">
          <div className="cc-services__rows">
            {serviceEntries.map((service, index) => (
              <button key={service.number} type="button" className={index === serviceIndex ? "is-active" : ""} aria-expanded={index === serviceIndex} onClick={() => setServiceIndex(index)} onPointerEnter={() => setServiceIndex(index)}>
                <span>{service.number}</span>
                <strong>{service.title}</strong>
                <p>{service.short}</p>
                <i>{index === serviceIndex ? "−" : "+"}</i>
                <motion.b initial={false} animate={{ height: index === serviceIndex ? "auto" : 0, opacity: index === serviceIndex ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.36, ease }}>{service.detail}</motion.b>
              </button>
            ))}
          </div>

          <figure className="cc-services__preview">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={activeService.image} src={activeService.image} alt={activeService.alt} initial={reducedMotion ? false : { opacity: 0, y: "7%", scale: 1.04 }} animate={{ opacity: 1, y: "0%", scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, y: "-5%" }} transition={{ duration: reducedMotion ? 0 : 0.6, ease }} />
            </AnimatePresence>
            <figcaption><span>Example output</span><strong>{activeService.title}</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="cc-studio" id="studio" aria-labelledby="cc-studio-title">
        <figure className="cc-studio__media">
          <DirectImage src="/assets/cp-culture-cut-process.webp" alt="Hands editing physical campaign proofs at a studio work table" />
          <figcaption>Working session / natural light</figcaption>
        </figure>

        <div className="cc-studio__copy">
          <span>03 / How projects run</span>
          <h2 id="cc-studio-title">Small team.<br />Direct process.</h2>
          <p>One lead direction from the first brief through production and handover.</p>
          <div className="cc-studio__steps">
            {processSteps.map(([number, title, detail], index) => (
              <button key={number} type="button" className={index === processIndex ? "is-active" : ""} aria-expanded={index === processIndex} onClick={() => setProcessIndex(index)}>
                <span>{number}</span><strong>{title}</strong><i>{index === processIndex ? "−" : "+"}</i>
                <AnimatePresence initial={false}>{index === processIndex && <motion.p initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reducedMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: reducedMotion ? 0 : 0.32, ease }}>{detail}</motion.p>}</AnimatePresence>
              </button>
            ))}
          </div>
          <SmartLink href="/studio" className="cc-text-link">About the studio <i>↗</i></SmartLink>
        </div>
      </section>

      <section className="cc-journal" id="journal" aria-labelledby="cc-journal-title">
        <div className="cc-journal__head"><span>04 / Journal</span><h2 id="cc-journal-title">Notes from<br />the work.</h2></div>
        <figure className="cc-journal__preview">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img key={journalIndex} src={studies[(journalIndex + 1) % studies.length].image} alt="Creative Pie studio process detail" initial={reducedMotion ? false : { opacity: 0, x: "5%" }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: "-3%" }} transition={{ duration: reducedMotion ? 0 : 0.5, ease }} />
          </AnimatePresence>
          <figcaption>Selected note / 0{journalIndex + 1}</figcaption>
        </figure>
        <div className="cc-journal__list">
          {articles.map((article, index) => (
            <SmartLink key={article.slug} href={`/journal/${article.slug}`} className={`cc-journal__row${index === journalIndex ? " is-active" : ""}`} onMouseEnter={() => setJournalIndex(index)} onFocus={() => setJournalIndex(index)}>
              <span>{article.number} / {article.readTime}</span><h3>{article.title}</h3><i>↗</i>
            </SmartLink>
          ))}
        </div>
      </section>

      <section className="cc-contact" aria-labelledby="cc-contact-title">
        <span>05 / Have a project?</span>
        <h2 id="cc-contact-title">Tell us what<br />you’re making.</h2>
        <SmartLink href="/contact">Start a project <i>↗</i></SmartLink>
        <div><span>Lagos / worldwide</span><span>Direction / content / brand / digital</span><a href="mailto:hello@creativepie.studio">hello@creativepie.studio</a></div>
      </section>
    </div>
  );
}
