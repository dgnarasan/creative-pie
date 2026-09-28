import type { ReactNode } from "react";
import Link from "next/link";
import { contactLabel, contactUrl } from "./contact-details";
export const policyDate = "28 September 2026";
export function BusinessContact() {
  return <p>Creative Pie · Creative services · Lagos, Nigeria.<br />Business, privacy and rights enquiries: <a href={contactUrl} target="_blank" rel="noopener noreferrer">{contactLabel} on Instagram (opens a new tab)</a>.</p>;
}
export function LegalLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <main className="legal-page">
    <header className="page-intro legal-intro"><span>Creative Pie / Policies</span><h1>{title}</h1><p>{intro}</p><p className="policy-date">Effective {policyDate}</p></header>
    <div className="legal-layout">
      <nav className="legal-nav" aria-label="Website policies"><Link href="/privacy">Privacy &amp; cookies</Link><Link href="/terms">Terms &amp; conditions</Link><Link href="/terms#cancellations">Cancellations &amp; refunds</Link><Link href="/contact">Contact Creative Pie</Link></nav>
      <article className="legal-copy">{children}<section><h2>Contact Creative Pie</h2><BusinessContact /></section></article>
    </div>
  </main>;
}
