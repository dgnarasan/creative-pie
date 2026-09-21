"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SmartLink } from "./site-chrome";

const studies = [
  {
    number: "01",
    title: "Campaign edit",
    subtitle: "Creative direction / process",
    note: "Printed layouts are reviewed for image choice, crop, sequence and pacing before production begins.",
    image: "/assets/cp-working-edit-v2.webp",
    alt: "Hands editing photographic proofs on a worn studio worktable in natural daylight",
    position: "72% center",
  },
  {
    number: "02",
    title: "Night motion",
    subtitle: "Motion / location",
    note: "A low-light movement study focused on pacing, fabric, street lighting and the final crop.",
    image: "/assets/cp-night.webp",
    alt: "High ISO night movement study on a Lagos street",
    position: "center 66%",
  },
  {
    number: "03",
    title: "Contact sheets",
    subtitle: "Image selection / layout",
    note: "A contact-sheet study used to compare sequences, crops and tonal balance across a set of images.",
    image: "/assets/cp-process.webp",
    alt: "Worn studio table with black-and-white contact sheets and working proofs",
    position: "center center",
  },
];

const services = [
  ["01", "Creative direction", "Positioning, campaign concepts, visual systems and production direction."],
  ["02", "Campaign + motion", "Still and moving content for launches, advertising and social channels."],
  ["03", "AI image production", "Art-directed image production, consistency checks and final retouching."],
  ["04", "Digital experience", "Website strategy, interface design, motion and custom development."],
];

const rail = ["Creative direction", "Campaign films", "Brand design", "AI image production", "Web design"];

function StudyImage({ index, eager = false, reduced = false }: { index: number; eager?: boolean; reduced?: boolean }) {
  const study = studies[index];
  return (
    <motion.img
      src={study.image}
      alt={study.alt}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      style={{ objectPosition: study.position }}
      initial={reduced ? false : { opacity: 0, scale: 1.035 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, scale: 1.015 }}
      transition={{ duration: reduced ? 0 : .55, ease: [.16, 1, .3, 1] }}
    />
  );
}

export function EditorialHome() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % studies.length), 6200);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let context: { revert: () => void } | undefined;

    async function setupScrollMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.fromTo(
          ".eg-edit__intro > *",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: .75, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".eg-edit__intro", start: "top 78%", once: true } },
        );
        gsap.fromTo(
          ".eg-study__image",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut", scrollTrigger: { trigger: ".eg-study", start: "top 72%", once: true } },
        );
        gsap.fromTo(
          ".eg-service-list a",
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: .6, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".eg-service-list", start: "top 76%", once: true } },
        );
        gsap.fromTo(
          ".eg-close > *",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: .7, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".eg-close", start: "top 72%", once: true } },
        );
      }, rootRef);
    }

    setupScrollMotion();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [reducedMotion]);

  function move(direction: number) {
    setActive((value) => (value + direction + studies.length) % studies.length);
  }

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    event.currentTarget.style.setProperty("--eg-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--eg-y", y.toFixed(3));
  }

  return (
    <div className="eg-home" ref={rootRef}>
      <section
        className="eg-hero"
        aria-labelledby="eg-title"
        onPointerMove={trackPointer}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
          pointerStart.current = null;
        }}
      >
        <div className="eg-hero__grain" aria-hidden="true" />
        <div className="eg-hero__topline">
          <span>Independent creative studio / Lagos + worldwide</span>
          <span>Studio study {studies[active].number} / 03</span>
        </div>

        <div className="eg-hero__stage">
          <h1 id="eg-title" key={`title-${active}`}>
            <span>We make</span>
            <span>Culture</span>
            <span>worth</span>
            <span>stopping for.</span>
          </h1>

          <figure className="eg-gate">
            <AnimatePresence mode="wait" initial={false}>
              <StudyImage key={studies[active].image} index={active} eager reduced={Boolean(reducedMotion)} />
            </AnimatePresence>
            <span className="eg-gate__registration" aria-hidden="true">CP / {studies[active].number}</span>
            <div className="eg-gate__shutters" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
            </div>
          </figure>

          <div className="eg-hero__statement">
            <span>Services</span>
            <p>Strategy, campaigns,<br />content and websites.</p>
          </div>

          <div className="eg-hero__controls">
            <div role="tablist" aria-label="Choose a Creative Pie studio study">
              {studies.map((study, index) => (
                <motion.button
                  key={study.number}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  onClick={() => setActive(index)}
                  whileTap={reducedMotion ? undefined : { scale: .96 }}
                >
                  <span>{study.number}</span><b>{study.title}</b>
                </motion.button>
              ))}
            </div>
            <div>
              <motion.button type="button" onClick={() => move(-1)} aria-label="Previous studio study" whileTap={reducedMotion ? undefined : { scale: .9 }}>←</motion.button>
              <motion.button type="button" onClick={() => move(1)} aria-label="Next studio study" whileTap={reducedMotion ? undefined : { scale: .9 }}>→</motion.button>
            </div>
          </div>
        </div>

        <div className="eg-rail" aria-label="Creative Pie services">
          <div>
            {[...rail, ...rail].map((item, index) => (
              <span key={`${item}-${index}`} aria-hidden={index >= rail.length}>{item}<i>—</i></span>
            ))}
          </div>
        </div>
      </section>

      <section className="eg-edit" aria-labelledby="eg-edit-title">
        <div className="eg-edit__intro" data-reveal>
          <span>01 / Studio studies</span>
          <h2 id="eg-edit-title">Selected<br /><em>studio studies.</em></h2>
          <p>Three self-initiated studies used to test image selection, motion and layout. These are not client projects.</p>
        </div>

        <motion.article
          className="eg-study"
          key={`study-${active}`}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : .45 }}
        >
          <div className="eg-study__meta">
            <span>{studies[active].number} / 03</span>
            <p>{studies[active].subtitle}</p>
            <h3>{studies[active].title}</h3>
            <p>{studies[active].note}</p>
            <SmartLink href="/work">Open the work index <i>↗</i></SmartLink>
          </div>
          <figure className="eg-study__image">
            <AnimatePresence mode="wait" initial={false}>
              <StudyImage key={`study-image-${studies[active].image}`} index={active} reduced={Boolean(reducedMotion)} />
            </AnimatePresence>
            <figcaption><span>Creative Pie studio study</span><span>Not client work</span></figcaption>
          </figure>
        </motion.article>

        <div className="eg-edit__timeline" aria-hidden="true">
          {studies.map((study, index) => <i key={study.number} className={index === active ? "is-active" : ""} />)}
        </div>
      </section>

      <section className="eg-services" aria-labelledby="eg-services-title">
        <header data-reveal>
          <span>02 / Services</span>
          <h2 id="eg-services-title">Creative services<br />in one studio.</h2>
          <p>We handle strategy, creative direction, production and website delivery as one connected project.</p>
        </header>
        <div className="eg-service-list">
          {services.map(([number, title, description]) => (
            <SmartLink href="/capabilities" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <i aria-hidden="true">↗</i>
            </SmartLink>
          ))}
        </div>
      </section>

      <section className="eg-close" data-reveal>
        <span>03 / Contact</span>
        <h2>Tell us about<br /><em>your project.</em></h2>
        <p>Share what you need, your timing and a useful budget range. We will reply with the right next step.</p>
        <SmartLink href="/contact">Start a project <i>↗</i></SmartLink>
      </section>
    </div>
  );
}
