"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
const MotionContext = createContext({ reduced: false, paused: false, toggle: () => {} });
export function MotionPreferences({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const reduced = Boolean(systemReduced) || paused;
  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(reduced);
    return () => { delete document.documentElement.dataset.reduceMotion; };
  }, [reduced]);
  return <MotionContext.Provider value={{ reduced, paused, toggle: () => setPaused((value) => !value) }}>{children}</MotionContext.Provider>;
}
export function useSiteReducedMotion() { return useContext(MotionContext).reduced; }
export function MotionToggle() {
  const { reduced, paused, toggle } = useContext(MotionContext);
  const deviceReduced = reduced && !paused;
  return <button className="motion-toggle" type="button" aria-pressed={reduced} onClick={toggle} disabled={deviceReduced} title={deviceReduced ? "Reduced motion is enabled in your device settings" : undefined}>{deviceReduced ? "Motion reduced" : paused ? "Resume motion" : "Pause motion"}</button>;
}
