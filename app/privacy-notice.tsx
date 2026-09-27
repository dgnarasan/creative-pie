"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export function PrivacyNotice() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  if (!open || pathname !== "/") return null;
  return <aside className="privacy-notice" aria-labelledby="privacy-notice-title">
    <h2 id="privacy-notice-title">Your privacy, simply.</h2>
    <p>Project briefs stay on this page until you choose to copy and send them. Read how we handle enquiries, hosting information and browser storage.</p>
    <p><Link href="/privacy">Privacy policy</Link><span aria-hidden="true"> · </span><Link href="/cookies">Cookies &amp; storage</Link></p>
    <button type="button" onClick={() => setOpen(false)}>Dismiss privacy notice</button>
  </aside>;
}
