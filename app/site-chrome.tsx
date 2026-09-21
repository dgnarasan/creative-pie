"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AnchorHTMLAttributes,
  FormEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const navigation = [
  ["Work", "/work"],
  ["Services", "/capabilities"],
  ["Studio", "/studio"],
];

const indexDetails = [
  ["Work", "Selected campaign work."],
  ["Services", "Services, scope and working process."],
  ["Studio", "About Creative Pie and how we work."],
  ["Contact", "Project enquiries and new business."],
];

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark__orbit" />
      <span className="brand-mark__name"><em>Creative</em><strong>Pie</strong></span>
      <span className="brand-mark__meta">Strategy + direction <i /> Lagos / Worldwide</span>
    </span>
  );
}

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

export function SmartLink({ href, children, className = "", onNavigate, ...rest }: SmartLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target === "_blank" ||
      event.currentTarget.hasAttribute("download") ||
      href.startsWith("http") ||
      href.startsWith("mailto:")
    ) return;

    event.preventDefault();
    onNavigate?.();
    if (href === pathname) {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }
    router.prefetch(href);
    document.documentElement.classList.add("is-transitioning");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 190;
    window.setTimeout(() => router.push(href), delay);
    window.setTimeout(() => document.documentElement.classList.remove("is-transitioning"), 1400);
  }

  return <Link href={href} onClick={navigate} className={className} {...rest}>{children}</Link>;
}

function ExperienceController() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-transitioning");
    document.documentElement.classList.add("motion-ready");

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealItems.forEach((item) => observer.observe(item));
    const fallback = window.setTimeout(() => revealItems.forEach((item) => item.classList.add("is-visible")), 1200);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const updateHeaderTone = () => {
      const sampleX = Math.max(0, window.innerWidth - Math.max(34, window.innerWidth * 0.035));
      const sampleY = Math.min(54, window.innerHeight * 0.07);
      const layers = document.elementsFromPoint(sampleX, sampleY);
      let dark = false;

      for (const layer of layers) {
        if (layer.closest(".site-header, .mobile-navigation")) continue;
        const color = window.getComputedStyle(layer).backgroundColor;
        const channels = color.match(/[\d.]+/g)?.map(Number) ?? [];
        if (channels.length < 3 || (channels[3] ?? 1) < 0.08) continue;
        const [red, green, blue] = channels;
        const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
        dark = luminance < 0.42;
        break;
      }

      document.documentElement.classList.toggle("header-on-dark", dark);
      document.documentElement.classList.toggle("header-on-light", !dark);
    };

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--viewport-height", `${window.innerHeight}px`);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        document.documentElement.style.setProperty("--scroll", progress.toFixed(4));
        document.documentElement.classList.toggle("is-scrolled", window.scrollY > 32);
        updateHeaderTone();
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      document.documentElement.classList.remove("header-on-dark");
      document.documentElement.classList.remove("header-on-light");
    };
  }, [pathname]);

  return null;
}

function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const closeAfterNavigation = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(closeAfterNavigation);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusable[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [open]);

  return (
    <>
      <header className={`site-header${pathname === "/" ? " site-header--home" : ""}${open ? " site-header--menu-open" : ""}`}>
        <div className="site-header__stage">
          <SmartLink href="/" className="brand-link" aria-label="Creative Pie home" onNavigate={() => setOpen(false)}>
            <BrandMark />
          </SmartLink>
          <nav className="header-desktop-nav" aria-label="Primary navigation">
            {navigation.map(([label, href]) => (
              <SmartLink key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}>{label}</SmartLink>
            ))}
          </nav>
          <button ref={buttonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="site-index" onClick={() => setOpen(!open)}>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="menu-button__label">{open ? "Close" : "Index"}</span><i aria-hidden="true" /><b aria-hidden="true" />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="site-index"
            className="site-index"
            role="dialog"
            aria-modal="true"
            aria-label="Creative Pie index"
            initial={reducedMotion ? false : "closed"}
            animate="open"
            exit={reducedMotion ? undefined : "closed"}
          >
            <div className="site-index__shutters" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <motion.i key={index} variants={{
                  closed: { scaleX: 0, transition: { duration: reducedMotion ? 0 : .42, delay: reducedMotion ? 0 : (4 - index) * .025, ease: [.16, 1, .3, 1] } },
                  open: { scaleX: 1, transition: { duration: reducedMotion ? 0 : .68, delay: reducedMotion ? 0 : index * .055, ease: [.16, 1, .3, 1] } },
                }} style={{ transformOrigin: index % 2 === 0 ? "left center" : "right center" }} />
              ))}
            </div>
            <motion.span className="site-index__scan" aria-hidden="true" variants={{
              closed: { scaleX: 0, opacity: 0, transition: { duration: reducedMotion ? 0 : .12 } },
              open: { scaleX: 1, opacity: [0, 1, 1, 0], transition: { duration: reducedMotion ? 0 : .9, delay: reducedMotion ? 0 : .38, ease: [.16, 1, .3, 1], times: [0, .18, .72, 1] } },
            }} />
            <motion.div className="site-index__intro" variants={{
              closed: { opacity: 0, y: 18, transition: { duration: reducedMotion ? 0 : .14 } },
              open: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : .48, delay: reducedMotion ? 0 : .38, ease: [.16, 1, .3, 1] } },
            }}><span>CP / Full index</span><p>Work, services, studio<br />and contact.</p></motion.div>
            <motion.nav aria-label="Primary navigation" variants={{
              closed: { opacity: 0, y: 22, transition: { duration: reducedMotion ? 0 : .16 } },
              open: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : .58, delay: reducedMotion ? 0 : .43, ease: [.16, 1, .3, 1] } },
            }}>
              {[...navigation, ["Contact", "/contact"]].map(([label, href], index) => (
                <SmartLink
                  key={href}
                  href={href}
                  tabIndex={open ? 0 : -1}
                  onNavigate={() => setOpen(false)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}
                >
                  <span>0{index + 1}</span><strong>{label}</strong><i aria-hidden="true">↗︎</i>
                </SmartLink>
              ))}
            </motion.nav>
            <motion.aside className="site-index__route" variants={{
              closed: { opacity: 0, x: 20, transition: { duration: reducedMotion ? 0 : .14 } },
              open: { opacity: 1, x: 0, transition: { duration: reducedMotion ? 0 : .54, delay: reducedMotion ? 0 : .5, ease: [.16, 1, .3, 1] } },
            }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeIndex} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -12 }} transition={{ duration: reducedMotion ? 0 : .32, ease: [.16, 1, .3, 1] }}>
                  <span>Active route / 0{activeIndex + 1}</span><b>0{activeIndex + 1}</b><strong>{indexDetails[activeIndex][0]}</strong><p>{indexDetails[activeIndex][1]}</p>
                </motion.div>
              </AnimatePresence>
            </motion.aside>
            <motion.div className="site-index__foot" variants={{
              closed: { opacity: 0, transition: { duration: reducedMotion ? 0 : .12 } },
              open: { opacity: 1, transition: { duration: reducedMotion ? 0 : .45, delay: reducedMotion ? 0 : .62 } },
            }}><a href="mailto:hello@creativepie.studio">hello@creativepie.studio</a><p>Lagos / Working worldwide</p><span>© 2026</span></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span>New business</span>
        <SmartLink href="/contact">Start a project <i>↘︎</i></SmartLink>
      </div>
      <div className="footer-wordmark" aria-label="Creative Pie">CREATIVE PIE</div>
      <div className="footer-grid">
        <div><BrandMark /></div>
        <div><span>Enquiries</span><a href="mailto:hello@creativepie.studio">hello@creativepie.studio</a></div>
        <div><span>Base</span><p>Lagos, Nigeria<br />Working worldwide</p></div>
        <div><span>Index</span><SmartLink href="/work">Work</SmartLink><SmartLink href="/capabilities">Services</SmartLink><SmartLink href="/studio">Studio</SmartLink><SmartLink href="/privacy">Privacy</SmartLink></div>
      </div>
      <div className="footer-base"><span>© Creative Pie 2026</span><span>Independent since 2024</span><span>CP—01</span></div>
    </footer>
  );
}

export function ContactForm() {
  const [draftReady, setDraftReady] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Creative Pie enquiry — ${String(data.get("name") || "New project")}`;
    const body = [
      `Name / company: ${String(data.get("name") || "")}`,
      `Email: ${String(data.get("email") || "")}`,
      `Project type: ${String(data.get("service") || "")}`,
      "",
      String(data.get("brief") || ""),
    ].join("\n");
    setDraftReady(true);
    window.location.href = `mailto:hello@creativepie.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label><span>01 / Name or company</span><input name="name" required placeholder="Your name" /></label>
      <label><span>02 / Email</span><input name="email" required type="email" placeholder="you@company.com" /></label>
      <label><span>03 / What are we making?</span><select name="service" defaultValue=""><option value="" disabled>Choose a starting point</option><option>Branding</option><option>Content Creation + SMM</option><option>Website + digital experience</option><option>Creative partnership</option><option>Something else</option></select></label>
      <label><span>04 / The brief</span><textarea name="brief" rows={5} required placeholder="The ambition, the problem, the timing…" /></label>
      <button type="submit">Prepare enquiry <i>↗︎</i></button>
      <p>This prepares an email in your own mail app. Nothing is sent until you review and send it.</p>
      {draftReady && <p role="status">Your enquiry draft is ready.</p>}
    </form>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <ExperienceController />
      <a className="skip-link" href="#site-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="page-transition" aria-hidden="true"><span>Creative Pie</span><i /></div>
      <Header />
      <div className="site-canvas" id="site-content">{children}</div>
      <Footer />
    </>
  );
}
