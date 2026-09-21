"use client";

import { PointerEvent, ReactNode, useEffect, useRef } from "react";

export function CultureHeroMotion({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
        hero.style.setProperty("--hero-scroll", progress.toFixed(4));
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--hero-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--hero-y", y.toFixed(3));
  }

  function resetPointer(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--hero-x", "0");
    event.currentTarget.style.setProperty("--hero-y", "0");
  }

  return (
    <section
      ref={heroRef}
      className="hero culture-hero"
      aria-labelledby="hero-title"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      {children}
    </section>
  );
}
