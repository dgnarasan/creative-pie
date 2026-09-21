"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { SmartLink } from "./site-chrome";

type HeroFrame = {
  image: string;
  alt: string;
};

type ProjectImage = {
  image: string;
  alt: string;
  position?: string;
};

type ProjectItem = {
  number: string;
  title: string;
  type: string;
  note: string;
  layout: "anagen" | "vonne" | "piebar";
  images: ProjectImage[];
};

const heroTopFrames: HeroFrame[] = [
  {
    image: "/assets/project-anagen-textures.webp",
    alt: "Anagen Paris Hair Serum framed by different hair textures",
  },
  {
    image: "/assets/project-vonne-campaign-board.webp",
    alt: "Vonne X2X campaign board with models, swimwear and fur-bag styling",
  },
  {
    image: "/assets/project-piebar-product.webp",
    alt: "Model presenting a Pie Bar juice bottle",
  },
  {
    image: "/assets/project-vonne-car.webp",
    alt: "Orange Vonne X2X bikini styled against a silver car",
  },
  {
    image: "/assets/project-vonne-fur-bag.webp",
    alt: "Vonne X2X fur bag product layout",
  },
  {
    image: "/assets/project-piebar-bottles.webp",
    alt: "Model holding two Pie Bar juice flavours",
  },
];

const heroBottomFrames: HeroFrame[] = [
  {
    image: "/assets/project-piebar-duo.webp",
    alt: "Two models presenting Pie Bar juice bottles",
  },
  {
    image: "/assets/project-anagen-group.webp",
    alt: "Three models presenting Anagen Paris Hair Serum",
  },
  {
    image: "/assets/project-vonne-blue.webp",
    alt: "Metallic blue Vonne X2X bikini product frame",
  },
  {
    image: "/assets/project-anagen-application.webp",
    alt: "Model applying Anagen Paris Hair Serum",
  },
  {
    image: "/assets/project-anagen-flatlay.webp",
    alt: "Anagen Paris Hair Serum product flat lay",
  },
];

const projects: ProjectItem[] = [
  {
    number: "01",
    title: "Anagen Paris",
    type: "Hair serum / Campaign visuals",
    note: "Haircare portraits, product details and hair textures.",
    layout: "anagen",
    images: [
      { image: "/assets/project-anagen-textures.webp", alt: "Anagen Paris Hair Serum surrounded by different hair textures", position: "center center" },
      { image: "/assets/project-anagen-group.webp", alt: "Three models presenting Anagen Paris Hair Serum", position: "center 18%" },
      { image: "/assets/project-anagen-application.webp", alt: "Model applying Anagen Paris Hair Serum", position: "center 12%" },
      { image: "/assets/project-anagen-flatlay.webp", alt: "Anagen Paris Hair Serum product flat lay" },
    ],
  },
  {
    number: "02",
    title: "Vonne X2X",
    type: "Swimwear / Campaign content",
    note: "Swimwear, personal styling and the signature fur bag.",
    layout: "vonne",
    images: [
      { image: "/assets/project-vonne-blue.webp", alt: "Metallic blue Vonne X2X bikini product frame" },
      { image: "/assets/project-vonne-car.webp", alt: "Orange Vonne X2X bikini styled against a silver car" },
      { image: "/assets/project-vonne-fur-bag.webp", alt: "What is in my Vonne X2X fur bag product layout" },
      { image: "/assets/project-vonne-campaign-board.webp", alt: "Vonne X2X campaign board with models, swimwear and fur-bag styling" },
    ],
  },
  {
    number: "03",
    title: "Pie Bar",
    type: "Juice / Campaign content",
    note: "Colourful juice portraits and paired model shots.",
    layout: "piebar",
    images: [
      { image: "/assets/project-piebar-duo.webp", alt: "Two models presenting Pie Bar juice bottles", position: "center 30%" },
      { image: "/assets/project-piebar-product.webp", alt: "Model presenting a Pie Bar juice bottle" },
      { image: "/assets/project-piebar-bottles.webp", alt: "Model holding two Pie Bar juice flavours" },
    ],
  },
];

const services = [
  {
    number: "01",
    title: "Creative direction",
    summary: "The central idea and the visual rules for carrying it through.",
    detail: "Research, campaign concepts, art direction, styling, shot planning and production leadership.",
  },
  {
    number: "02",
    title: "Content Creation + SMM",
    summary: "Content creation and social media management, from the first idea to the published post.",
    detail: "Content calendars, model sourcing, shoot production, photography, video, editing, captions, scheduling and day-to-day account management.",
  },
  {
    number: "03",
    title: "Branding",
    summary: "A clear identity for your brand, from how it looks to how it speaks.",
    detail: "Brand positioning, logos, colour, typography, tone of voice, brand guidelines and templates for a consistent presence.",
  },
  {
    number: "04",
    title: "Websites",
    summary: "Clear digital experiences designed for desktop and mobile.",
    detail: "Site strategy, UX, interface design, responsive development, motion and launch support.",
  },
];

const steps = [
  ["01", "Brief", "We agree on the audience, objective, deliverables, timing and budget."],
  ["02", "Direction", "We present one clear route for the image, type, motion and production."],
  ["03", "Production", "We make, review and edit the agreed work across the required formats."],
  ["04", "Handover", "You receive final files, working assets and clear guidance for using them."],
];

const ease = [0.16, 1, 0.3, 1] as const;

// Intrinsic proportions are part of the art direction, not viewport-dependent crops.
const imageSizes: Record<string, [number, number]> = {
  "project-anagen-textures.webp": [1122, 1402],
  "project-anagen-group.webp": [1005, 1800],
  "project-anagen-application.webp": [1005, 1800],
  "project-anagen-flatlay.webp": [1005, 1800],
  "project-vonne-campaign-board.webp": [1102, 1458],
  "project-vonne-blue.webp": [960, 1280],
  "project-vonne-car.webp": [960, 1280],
  "project-vonne-fur-bag.webp": [1024, 1280],
  "project-piebar-duo.webp": [1024, 1280],
  "project-piebar-product.webp": [1024, 1280],
  "project-piebar-bottles.webp": [1024, 1280],
};

function dimensions(image: string) {
  return imageSizes[image.split("/").pop()!] ?? [4, 5];
}

function HeroMediaRow({ frames, reverse = false, desktop = false }: { frames: HeroFrame[]; reverse?: boolean; desktop?: boolean }) {
  return (
    <div className={`rl-hero-strip${reverse ? " is-reverse" : ""}${desktop ? " is-desktop" : " is-mobile"}`}>
      {[0, 1].map((set) => (
        <div className="rl-hero-strip__set" key={set} aria-hidden={set > 0 || undefined}>
          {frames.map((frame) => (
            <figure className="rl-hero-frame" style={{ "--photo-ratio": dimensions(frame.image)[0] / dimensions(frame.image)[1] } as CSSProperties} key={`${set}-${frame.image}`}>
              <img src={frame.image} width={dimensions(frame.image)[0]} height={dimensions(frame.image)[1]} alt={set === 0 ? frame.alt : ""} />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

function CampaignCollage({ project, reduced }: { project: ProjectItem; reduced: boolean }) {
  const order = project.layout === "anagen" ? [1, 0, 2, 3] : project.layout === "vonne" ? [0, 1, 3, 2] : [1, 0, 2];
  return (
    <div className={`rl-work__collage rl-work__collage--${project.layout}`} aria-label={`${project.title} photographs`}>
      {order.map((imageIndex, index) => {
        const asset = project.images[imageIndex];
        return (
          <motion.figure key={asset.image} className={`rl-work__photo rl-work__photo--${index + 1}`} style={{ "--image-ratio": dimensions(asset.image)[0] / dimensions(asset.image)[1] } as CSSProperties}
            initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.65, delay: index * 0.07, ease }}>
            <img src={asset.image} width={dimensions(asset.image)[0]} height={dimensions(asset.image)[1]} alt={asset.alt} draggable={false} />
          </motion.figure>
        );
      })}
    </div>
  );
}

function ServiceFolders() {
  const deckRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || reducedMotion) return;
    const folders = Array.from(deck.querySelectorAll<HTMLElement>(".rl-folder"));
    const slots = Array.from(deck.querySelectorAll<HTMLElement>(".rl-folder-slot"));
    let frame = 0;
    let disposed = false;

    const measure = () => {
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 84;
      const start = headerHeight + 24;
      const viewportHeight = document.documentElement.clientHeight;
      const heights = folders.map((folder) => folder.offsetHeight);
      const headings = folders.map((folder) => folder.querySelector<HTMLElement>(".rl-folder__heading")!.offsetHeight);
      let cursor = start;
      const fullOffsets = headings.map((height) => {
        const offset = cursor;
        cursor += height + 2;
        return offset;
      });
      const fits = (offsets: number[]) => offsets.every((offset, index) => offset + heights[index] <= viewportHeight - 24);
      const tabOffsets = folders.map((_, index) => start + index * 20);
      const offsets = fits(fullOffsets) ? fullOffsets : tabOffsets;
      // Short screens and enlarged text keep ordinary document scrolling.
      // No service copy is clipped to force the animation to fit.
      if (!fits(offsets)) {
        delete deck.dataset.stack;
      } else {
        deck.dataset.stack = offsets === fullOffsets ? "headings" : "tabs";
        deck.style.setProperty("--folder-rows", heights.map((height) => `${height}px`).join(" "));
        const stackBottom = Math.max(...offsets.map((offset, index) => offset + heights[index]));
        slots.forEach((slot, index) => {
          slot.style.setProperty("--folder-top", `${offsets[index]}px`);
          // Equal bottom edges let the complete stack leave together.
          slot.style.setProperty("--folder-track-height", `${stackBottom - offsets[index]}px`);
        });
      }
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    folders.forEach((folder) => observer.observe(folder));
    window.addEventListener("resize", scheduleMeasure);
    document.fonts.ready.then(() => { if (!disposed) scheduleMeasure(); });
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      delete deck.dataset.stack;
      deck.style.removeProperty("--folder-rows");
      slots.forEach((slot) => {
        slot.style.removeProperty("--folder-top");
        slot.style.removeProperty("--folder-track-height");
      });
    };
  }, [reducedMotion]);

  return (
    <section className="rl-services" id="services" aria-labelledby="rl-service-folders-title">
      <div className="rl-services__intro">
        <h2 id="rl-service-folders-title">Choose a service</h2>
        <p>Scroll to explore what’s included. <span aria-hidden="true">↓</span></p>
      </div>
      <div className="rl-services__deck" ref={deckRef}>
        {services.map((service, index) => (
          <div key={service.number} className="rl-folder-slot" style={{ zIndex: index + 1 }}>
            <article className="rl-folder" aria-labelledby={`service-title-${service.number}`}>
              <header className="rl-folder__heading">
                <span>{service.number}</span>
                <h3 id={`service-title-${service.number}`}>{service.title}</h3>
              </header>
              <div className="rl-folder__body" id={`service-panel-${service.number}`}>
                <p>{service.summary}</p>
                <p>{service.detail}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReferenceLedHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDialogElement>(null);
  const elapsedRef = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const progress = useMotionValue(0);
  const workVisible = useInView(workRef, { amount: 0.55 });
  const [workPaused, setWorkPaused] = useState(false);
  const [workHeld, setWorkHeld] = useState(false);
  const [keyboardReading, setKeyboardReading] = useState(false);
  const [workIndex, setWorkIndex] = useState(0);
  const [proofOpen, setProofOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    let cancelled = false;
    let context: { revert: () => void } | undefined;
    let match: { add: (condition: string, callback: () => void) => void; revert: () => void } | undefined;

    async function mountMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        match = gsap.matchMedia();
        match.add("(min-width: 900px)", () => {
          gsap.to(".rl-process__vehicle", {
            xPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: ".rl-process", start: "top bottom", end: "bottom top", scrub: 0.9 },
          });
        });
        gsap.fromTo(".rl-contact__mouth img", { xPercent: -4, rotate: -1.5 }, {
          xPercent: 4,
          rotate: 1.5,
          ease: "none",
          scrollTrigger: { trigger: ".rl-contact", start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      }, rootRef);
    }

    mountMotion();
    return () => {
      cancelled = true;
      match?.revert();
      context?.revert();
    };
  }, [reducedMotion]);

  const activeWork = projects[workIndex];
  const playbackStopped = workPaused || Boolean(reducedMotion);
  function selectProject(index: number) {
    elapsedRef.current = 0;
    progress.set(0);
    setWorkIndex((index + projects.length) % projects.length);
  }

  useEffect(() => {
    if (!workVisible) return;
    const images = projects.flatMap((project) => project.images).map((asset) => {
      const image = new Image();
      image.src = asset.image;
      return image;
    });
    return () => images.forEach((image) => { image.onload = null; });
  }, [workVisible]);

  useEffect(() => {
    if (!workVisible || playbackStopped || workHeld || keyboardReading || proofOpen) return;
    let frame = 0;
    let previous = performance.now();
    const resetClock = () => { previous = performance.now(); };
    const tick = (now: number) => {
      const delta = Math.max(now - previous, 0);
      previous = now;
      if (!document.hidden && !document.body.classList.contains("menu-open")) {
        elapsedRef.current += delta;
        progress.set(Math.min(elapsedRef.current / 6500, 1));
        if (elapsedRef.current >= 6500) {
          elapsedRef.current = 0;
          progress.set(0);
          setWorkIndex((current) => (current + 1) % projects.length);
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", resetClock);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", resetClock); };
  }, [workVisible, playbackStopped, workHeld, keyboardReading, proofOpen, workIndex, progress]);

  useEffect(() => {
    const dialog = proofRef.current;
    if (proofOpen && dialog && !dialog.open) dialog.showModal();
    if (!proofOpen && dialog?.open) dialog.close();
    if (!proofOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [proofOpen]);

  return (
    <div className="rl-home" ref={rootRef}>
      <section className="rl-hero" aria-labelledby="rl-hero-title">
        <div className="rl-hero__topline"><span>Creative Pie / Lagos + worldwide</span><span>Social-first creative agency</span></div>
        <div className="rl-hero__canvas">
          <div className="rl-hero__media-field" aria-label="Moving selection of Creative Pie campaign media">
            <HeroMediaRow frames={[heroTopFrames[0], heroTopFrames[3], heroBottomFrames[0], heroBottomFrames[1], heroTopFrames[1], heroTopFrames[2], heroBottomFrames[2], heroBottomFrames[3], heroTopFrames[4], heroBottomFrames[4], heroTopFrames[5]]} desktop />
            <HeroMediaRow frames={heroTopFrames} />
            <HeroMediaRow frames={heroBottomFrames} reverse />
          </div>
          <div className="rl-hero__statement">
            <span className="rl-label">Strategy / Direction / Production / Digital</span>
            <h1 id="rl-hero-title"><span className="rl-hero__opening">We make </span><em>culture </em><span className="rl-hero__worth">worth </span><span className="rl-hero__last-words">stopping for.</span></h1>
            <div className="rl-hero__intro">
              <p>A full-service, social-first marketing agency. We build brands through creative direction, content, social media, branding and websites.</p>
              <SmartLink className="rl-link" href="/contact">Start a project <i>↗︎</i></SmartLink>
            </div>
          </div>
        </div>
        <div className="rl-hero__base"><span>© 2026</span><span>Scroll to see the work</span><span>CP—01</span></div>
      </section>

      <section className="rl-work" id="work" aria-labelledby="rl-work-title">
        <header className="rl-work__heading">
          <span className="rl-label">01 / Portfolio</span>
          <h2 id="rl-work-title">Selected work.</h2>
          <p>Beauty, fashion and drinks.</p>
        </header>

        <aside className="rl-performance" aria-label="Creative Pie performance proof">
          <button className="rl-performance__summary" type="button" aria-haspopup="dialog" aria-expanded={proofOpen} aria-controls="rl-performance-proof" onClick={() => setProofOpen(true)}>
            <span>Creative Pie / Channel views</span>
            <strong><span>29,086</span><i aria-hidden="true">→</i><span>136,797</span><small>views</small></strong>
            <em>View before &amp; after <i aria-hidden="true">↗</i></em>
          </button>
        </aside>

        <div className="rl-work__stage" ref={workRef}
          onFocusCapture={(event) => { if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setKeyboardReading(true); }}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setKeyboardReading(false); }}>
          <div className="rl-work__toolbar">
            <div className="rl-work__board" aria-label="Choose a project">
              {projects.map((item, index) => (
                <button key={item.number} type="button" className={index === workIndex ? "is-active" : ""} onClick={() => selectProject(index)} aria-pressed={index === workIndex} aria-controls="rl-project-spread">
                  <span>{item.number}</span><b>{item.title}</b>
                  <span className="rl-work__project-progress" aria-hidden="true">{index === workIndex && <motion.i style={{ scaleX: progress }} />}</span>
                </button>
              ))}
            </div>
            <div className="rl-work__controls">
              {!reducedMotion && <button className="rl-work__playback" type="button" onClick={() => { setWorkPaused((current) => !current); setKeyboardReading(false); }} aria-label={workPaused ? "Play project sequence" : "Pause project sequence"}>
                <span aria-hidden="true">{workPaused ? "▶" : "Ⅱ"}</span>{workPaused ? "Play projects" : "Auto / Pause"}
              </button>}
              <button type="button" onClick={() => selectProject(workIndex - 1)} aria-label="Previous project"><span aria-hidden="true">←</span></button>
              <button type="button" onClick={() => selectProject(workIndex + 1)} aria-label="Next project"><span aria-hidden="true">→</span></button>
            </div>
          </div>

          <div className={`rl-work__book rl-work__book--${activeWork.layout}`} id="rl-project-spread" tabIndex={0} aria-label={`${activeWork.title} magazine spread. Swipe or use arrow keys to change projects.`}
            onPointerDown={(event) => { if (event.pointerType !== "mouse") { dragStart.current = { x: event.clientX, y: event.clientY }; setWorkHeld(true); } }}
            onPointerUp={(event) => {
              const start = dragStart.current;
              if (start && Math.abs(event.clientX - start.x) > 45 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y) * 1.3) selectProject(workIndex + (event.clientX < start.x ? 1 : -1));
              dragStart.current = null; setWorkHeld(false);
            }}
            onPointerCancel={() => { dragStart.current = null; setWorkHeld(false); }}
            onPointerLeave={() => { dragStart.current = null; setWorkHeld(false); }}
            onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); selectProject(workIndex + (event.key === "ArrowRight" ? 1 : -1)); } }}>
            <motion.article key={activeWork.number} className={`rl-work__spread rl-work__spread--${activeWork.layout}`} initial={false} animate={{ opacity: 1 }}>
              <div className="rl-work__page--copy">
                <span>{activeWork.number} / Creative Pie</span>
                <h3>{activeWork.title.split(" ").map((word) => <span key={word}>{word}</span>)}</h3>
                <p>{activeWork.note}</p>
                <small>{activeWork.type}</small>
              </div>
              <CampaignCollage project={activeWork} reduced={Boolean(reducedMotion)} />
            </motion.article>
            <div className="rl-work__folio"><span>{activeWork.title} / Campaign collection</span><span>{activeWork.number} / 03</span></div>
          </div>
        </div>

        <dialog className="rl-performance__dialog" id="rl-performance-proof" aria-labelledby="rl-proof-title" ref={proofRef} onCancel={() => setProofOpen(false)} onClose={() => setProofOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setProofOpen(false); }}>
          <div className="rl-performance__sheet">
            <header><div><span className="rl-label">Creative Pie / Channel results</span><h2 id="rl-proof-title">Before &amp; after.</h2></div><button type="button" onClick={() => setProofOpen(false)} aria-label="Close performance snapshot">Close ×</button></header>
            <p>Views increased from 29,086 to 136,797. These are Creative Pie’s own channel results, separate from the client campaigns.</p>
            <figure><img src="/assets/cp-results-growth-v1.webp" alt="Creative Pie performance snapshot showing views increasing from 29,086 to 136,797" /></figure>
          </div>
        </dialog>
      </section>

      <section className="rl-services-opener" aria-labelledby="rl-services-title">
        <figure className="rl-services-opener__image"><img src="/assets/cp-services-seat-v3.webp" alt="A coral project folder placed on a single oxblood-red seat in an ivory auditorium" /></figure>
        <div className="rl-services-opener__scrim" />
        <span className="rl-label">02 / Services</span>
        <span className="rl-services-opener__brief" aria-hidden="true">Creative Pie / Services</span>
        <h2 id="rl-services-title"><span>What</span><span>we do</span></h2>
        <p>From brand identity and model sourcing to shoots, content and social media management. We handle the work from concept to launch.</p>
        <div className="rl-services-opener__rail" aria-hidden="true">
          <div>
            {[...services, ...services].map((service, index) => <span key={`${service.number}-${index}`}>{service.title}<i>•</i></span>)}
          </div>
        </div>
      </section>

      <ServiceFolders />

      <section className="rl-process" id="process" aria-labelledby="rl-process-title">
        <header className="rl-section-head rl-reveal">
          <span>03 / Process</span><h2 id="rl-process-title">How projects move.</h2><p>A clear sequence from the first conversation to final delivery.</p>
        </header>
        <div className="rl-process__scene">
          <figure className="rl-process__vehicle"><img src="/assets/cp-strategy-truck-branded-v3.webp" alt="Creative Pie production truck crossing a city intersection" /></figure>
          <div className="rl-process__route" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
        <div className="rl-process__steps">
          {steps.map(([number, title, detail]) => <article key={number} className="rl-reveal"><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className="rl-studio" id="studio" aria-labelledby="rl-studio-title">
        <figure className="rl-studio__portrait"><img src="/assets/cp-studio-bts.webp" width="1536" height="2048" alt="Behind the scenes at a Creative Pie shoot: a model on set between studio lights" loading="lazy" /><figcaption>Creative Pie / Behind the scenes</figcaption></figure>
        <div className="rl-studio__copy rl-reveal">
          <span className="rl-label">04 / Studio</span>
          <h2 id="rl-studio-title">Small team.<br />Direct involvement.</h2>
          <p>The people who set the direction stay involved through production and delivery. Photographers, stylists, developers and editors are added when the brief needs them.</p>
          <dl className="rl-studio__facts">
            <div><dt>Core</dt><dd>Strategy + direction</dd></div>
            <div><dt>Project team</dt><dd>Chosen for each brief</dd></div>
            <div><dt>Working range</dt><dd>Lagos + worldwide</dd></div>
          </dl>
          <SmartLink href="/studio" className="rl-link">About the studio <i>↗︎</i></SmartLink>
        </div>
      </section>

      <section className="rl-contact" aria-labelledby="rl-contact-title">
        <div className="rl-contact__mouth" aria-hidden="true"><img src="/assets/cp-halftone-mouths-v2.webp" alt="" /><i /></div>
        <span className="rl-label">05 / Contact</span>
        <h2 id="rl-contact-title">Tell us about<br />the project.</h2>
        <SmartLink href="/contact">Start a project <i>↗︎</i></SmartLink>
        <div className="rl-contact__details"><span>Lagos / working worldwide</span><span>Creative direction / Content + SMM / Branding / Websites</span><a href="mailto:hello@creativepie.studio">hello@creativepie.studio</a></div>
      </section>
    </div>
  );
}
