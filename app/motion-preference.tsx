"use client";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
const MotionContext = createContext(false);
export function MotionPreferences({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const reduced = Boolean(systemReduced);
  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(reduced);
    return () => { delete document.documentElement.dataset.reduceMotion; };
  }, [reduced]);
  return <MotionContext.Provider value={reduced}>{children}</MotionContext.Provider>;
}
export function useSiteReducedMotion() { return useContext(MotionContext); }
