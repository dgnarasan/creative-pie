"use client";

import { contactLabel, contactUrl } from "./contact-details";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { useSiteReducedMotion } from "./motion-preference";
import { SmartLink } from "./site-chrome";
import { ResponsiveImage, campaignImageSizes, heroImageSizes, imageDetails } from "./responsive-image";

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
  layout: "anagen" | "vonne" | "piebar" | "kayclo";
  images: ProjectImage[];
};

const heroTopFrames: HeroFrame[] = [
  {
    image: "/assets/project-anagen-textures.webp",
    alt: "Anagen Paris Hair Serum framed by different hair textures",
  },
  {
    image: "/assets/project-kayclo-butter.webp",
    alt: "KAYCLO butter-yellow lounge set, with portrait and full-length styling",
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
    image: "/assets/project-kayclo-collection.webp",
    alt: "KAYCLO Mix Match Collection in butter yellow, cocoa and soft pink",
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
    image: "/assets/project-kayclo-cocoa.webp",
    alt: "KAYCLO cocoa lounge set shown from the front and back",
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

// Alternate brands across the desktop strip; each campaign image appears once
// before the seamless repeat. Mobile keeps two independent opposing rows.
const heroDesktopFrames = [
  heroTopFrames[0], heroTopFrames[1], heroTopFrames[4],
  heroBottomFrames[0], heroBottomFrames[2], heroBottomFrames[1],
  heroTopFrames[2], heroTopFrames[3], heroBottomFrames[3],
  heroTopFrames[5], heroBottomFrames[4], heroTopFrames[6],
  heroBottomFrames[5], heroTopFrames[7],
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
  {
    number: "04",
    title: "KAYCLO",
    type: "Womenswear / Campaign content",
    note: "The Mix Match Collection. Fitted lounge sets in butter yellow, cocoa and soft pink.",
    layout: "kayclo",
    images: [
      { image: "/assets/project-kayclo-collection.webp", alt: "Three looks from KAYCLO’s Mix Match Collection in butter yellow, cocoa and soft pink" },
      { image: "/assets/project-kayclo-cocoa.webp", alt: "KAYCLO cocoa co-ord with a long-sleeved top and flared trousers, shown front and back" },
      { image: "/assets/project-kayclo-butter.webp", alt: "KAYCLO butter-yellow co-ord shown in a seated portrait and full-length look" },
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
  ["04", "Handover", "You receive the agreed final deliverables and clear guidance for using them."],
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
  "project-kayclo-cocoa.webp": [1080, 1350],
  "project-kayclo-butter.webp": [1080, 1350],
  "project-kayclo-collection.webp": [1080, 1350],
};

function dimensions(image: string) {
  return imageSizes[image.split("/").pop()!] ?? [4, 5];
}

function HeroMediaRow({ frames, reverse = false, desktop = false }: { frames: HeroFrame[]; reverse?: boolean; desktop?: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    const viewport = window.matchMedia(desktop ? "(min-width: 601px)" : "(max-width: 600px)");
    async function prepareRow() {
      const row = rowRef.current;
      if (!viewport.matches || !row) return;
      const images = Array.from(row.querySelectorAll("img"));
      const decode = (image: HTMLImageElement) => image.decode().catch(() => undefined);
      // Show the opening frames first. Warm the rest at low priority before
      // moving the strip so a slow connection never scrolls into empty frames.
      await Promise.all(images.filter((image) => image.loading === "eager").map(decode));
      if (disposed || !viewport.matches) return;
      images.filter((image) => image.loading !== "eager").forEach((image) => {
        image.fetchPriority = "low";
        image.loading = "eager";
      });
      await Promise.all(images.map(decode));
      if (!disposed && viewport.matches) setReady(true);
    }
    void prepareRow();
    viewport.addEventListener("change", prepareRow);
    return () => { disposed = true; viewport.removeEventListener("change", prepareRow); };
  }, [desktop]);

  return (
    <div ref={rowRef} className={`rl-hero-strip${reverse ? " is-reverse" : ""}${desktop ? " is-desktop" : " is-mobile"}${ready ? " is-ready" : ""}`}>
      {[0, 1].map((set) => (
        <div className="rl-hero-strip__set" key={set} aria-hidden={set > 0 || undefined}>
          {frames.map((frame, index) => (
            <figure className="rl-hero-frame" style={{ "--photo-ratio": dimensions(frame.image)[0] / dimensions(frame.image)[1] } as CSSProperties} key={`${set}-${frame.image}`}>
              <ResponsiveImage src={frame.image} width={dimensions(frame.image)[0]} height={dimensions(frame.image)[1]} alt={set === 0 ? frame.alt : ""}
                sizes={heroImageSizes} hiddenMedia={desktop ? "(max-width: 600px)" : "(min-width: 601px)"}
                loading={set === (reverse ? 1 : 0) && index < (desktop ? 6 : 4) ? "eager" : "lazy"}
                fetchPriority={set === (reverse ? 1 : 0) && index === 0 ? "high" : "auto"} />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

function CampaignCollage({ project, reduced, reveal }: { project: ProjectItem; reduced: boolean; reveal: boolean }) {
  const order = project.layout === "anagen" ? [1, 0, 2, 3] : project.layout === "vonne" ? [0, 1, 3, 2] : [1, 0, 2];
  return (
    <div className={`rl-work__collage rl-work__collage--${project.layout}`} aria-label={`${project.title} photographs`}>
      {order.map((imageIndex, index) => {
        const asset = project.images[imageIndex];
        return (
          <motion.figure key={asset.image} className={`rl-work__photo rl-work__photo--${index + 1}`} style={{ "--image-ratio": dimensions(asset.image)[0] / dimensions(asset.image)[1] } as CSSProperties}
            initial={reduced || !reveal ? false : { clipPath: "inset(0 0 100% 0)", y: 10 }} animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }} transition={{ duration: reduced ? 0 : 0.65, delay: index * 0.07, ease }}>
            <ResponsiveImage src={asset.image} sizes={campaignImageSizes} width={dimensions(asset.image)[0]} height={dimensions(asset.image)[1]} alt={asset.alt} draggable={false} />
          </motion.figure>
        );
      })}
    </div>
  );
}

function ServiceFolders() {
  const deckRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSiteReducedMotion();

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
  const elapsedRef = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const progress = useMotionValue(0);
  const workVisible = useInView(workRef, { amount: 0.55 });
  const [workPaused, setWorkPaused] = useState(false);
  const [workHeld, setWorkHeld] = useState(false);
  const [keyboardReading, setKeyboardReading] = useState(false);
  const [workIndex, setWorkIndex] = useState(0);
  const [workHasChanged, setWorkHasChanged] = useState(false);
  const reducedMotion = useSiteReducedMotion();

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

    // The motion below the fold must not compete with the opening images/fonts.
    const motionObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      motionObserver.disconnect();
      void mountMotion();
    }, { rootMargin: "300px" });
    rootRef.current.querySelectorAll(".rl-process, .rl-contact").forEach((section) => motionObserver.observe(section));
    return () => {
      cancelled = true;
      motionObserver.disconnect();
      match?.revert();
      context?.revert();
    };
  }, [reducedMotion]);

  const activeWork = projects[workIndex];
  const playbackStopped = workPaused || Boolean(reducedMotion);
  function selectProject(index: number) {
    elapsedRef.current = 0;
    progress.set(0);
    if ((index + projects.length) % projects.length !== workIndex) setWorkHasChanged(true);
    setWorkIndex((index + projects.length) % projects.length);
  }

  useEffect(() => {
    if (!workVisible) return;
    // Warm only the next spread, at the same responsive size as its actual img.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || connection?.effectiveType?.includes("2g")) return;
    const timer = window.setTimeout(() => {
      projects[(workIndex + 1) % projects.length].images.forEach((asset) => {
        const image = new Image();
        image.fetchPriority = "low";
        image.sizes = campaignImageSizes;
        image.srcset = imageDetails(asset.image)?.srcSet ?? "";
        image.src = asset.image;
      });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [workVisible, workIndex]);

  useEffect(() => {
    if (!workVisible || playbackStopped || workHeld || keyboardReading) return;
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
          setWorkHasChanged(true);
          setWorkIndex((current) => (current + 1) % projects.length);
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", resetClock);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", resetClock); };
  }, [workVisible, playbackStopped, workHeld, keyboardReading, workIndex, progress]);


  return (
    <div className="rl-home" ref={rootRef}>
      <section className="rl-hero" aria-labelledby="rl-hero-title">
        <div className="rl-hero__topline"><span>Creative Pie / Lagos + worldwide</span><span>Social-first creative agency</span></div>
        <div className="rl-hero__canvas">
          <div className="rl-hero__media-field" aria-label="Moving selection of Creative Pie campaign media">
            <HeroMediaRow frames={heroDesktopFrames} desktop />
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
        <div className="rl-hero__base"><span>© 2026</span><span>Scroll to see the work</span></div>
      </section>

      <section className="rl-work" id="work" aria-labelledby="rl-work-title">
        <header className="rl-work__heading">
          <span className="rl-label">01 / Portfolio</span>
          <h2 id="rl-work-title">Selected work.</h2>
        </header>

        <div className="rl-work__stage" ref={workRef}
          onFocusCapture={(event) => { if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setKeyboardReading(true); }}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setKeyboardReading(false); }}>
          <div className="rl-work__toolbar">
            <div className="rl-work__board" aria-label="Choose a project" style={{ "--project-count": projects.length } as CSSProperties}>
              {projects.map((item, index) => (
                <button key={item.number} type="button" className={index === workIndex ? "is-active" : ""} onClick={() => selectProject(index)} aria-pressed={index === workIndex} aria-controls="rl-project-spread">
                  <span>{item.number}</span><b>{item.title}</b>
                  <span className="rl-work__project-progress" aria-hidden="true">{index === workIndex && <motion.i style={{ scaleX: progress }} />}</span>
                </button>
              ))}
            </div>
            <div className="rl-work__controls">
              {!reducedMotion && <button className="rl-work__playback" type="button" onClick={() => { setWorkPaused((current) => !current); setKeyboardReading(false); }} aria-label={workPaused ? "Play project sequence" : "Pause project sequence"}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">{workPaused ? <path d="M4 2.5v11L13 8z" /> : <><rect x="3" y="2.5" width="3" height="11" /><rect x="10" y="2.5" width="3" height="11" /></>}</svg>{workPaused ? "Play projects" : "Pause projects"}
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
            <motion.article key={activeWork.number} className={`rl-work__spread rl-work__spread--${activeWork.layout}`} initial={reducedMotion || !workHasChanged ? false : { opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.45 }}>
              <div className="rl-work__page--copy">
                <span>{activeWork.number} / Creative Pie</span>
                <h3>{activeWork.title.split(" ").map((word) => <span key={word}>{word}</span>)}</h3>
                <p>{activeWork.note}</p>
                <small>{activeWork.type}</small>
              </div>
              <CampaignCollage project={activeWork} reduced={Boolean(reducedMotion)} reveal={workHasChanged} />
            </motion.article>
            <div className="rl-work__folio"><span>{activeWork.title} / {activeWork.layout === "kayclo" ? "Mix Match Collection" : "Campaign collection"}</span><span>{activeWork.number} / {String(projects.length).padStart(2, "0")}</span></div>
          </div>
        </div>

      </section>

      <section className="rl-services-opener" aria-labelledby="rl-services-title">
        <figure className="rl-services-opener__image"><ResponsiveImage src="/assets/cp-services-seat-v3.webp" sizes="100vw" alt="A coral project folder placed on a single oxblood-red seat in an ivory auditorium" /></figure>
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
          <figure className="rl-process__vehicle"><ResponsiveImage src="/assets/cp-strategy-truck-branded-v3.webp" alt="Illustrative Creative Pie-branded truck concept at a city intersection" /></figure>
          <div className="rl-process__route" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
        <div className="rl-process__steps">
          {steps.map(([number, title, detail]) => <article key={number} className="rl-reveal"><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className="rl-studio" id="studio" aria-labelledby="rl-studio-title">
        <figure className="rl-studio__portrait"><ResponsiveImage src="/assets/cp-studio-bts.webp" width="1536" height="2048" alt="Behind the scenes at a Creative Pie shoot: a model on set between studio lights" /><figcaption>Creative Pie / Behind the scenes</figcaption></figure>
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
        <div className="rl-contact__mouth" aria-hidden="true"><ResponsiveImage src="/assets/cp-halftone-mouths-v2.webp" sizes="100vw" alt="" /><i /></div>
        <span className="rl-label">05 / Contact</span>
        <h2 id="rl-contact-title">Tell us about<br />the project.</h2>
        <SmartLink href="/contact">Start a project <i>↗︎</i></SmartLink>
        <div className="rl-contact__details"><span>Lagos / working worldwide</span><span>Creative direction / Content + SMM / Branding / Websites</span><a href={contactUrl} target="_blank" rel="noopener noreferrer">{contactLabel}</a></div>
      </section>
    </div>
  );
}
