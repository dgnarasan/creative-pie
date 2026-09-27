import Link from "next/link";
import { pageMetadata } from "../seo";
import { LegalLayout } from "../legal-layout";
export const metadata = pageMetadata("Cookie Policy", "Cookies, browser storage and tracking on the Creative Pie website.", "/cookies");
export default function CookiesPage() {
 return <LegalLayout title="Cookie policy." intro="A clear account of the storage and services used by this website.">
  <section><h2>Our current setup</h2><p>The Creative Pie website code does not set cookies or use local storage, session storage or a visitor identifier. It does not enable analytics, advertising pixels, session replay or social-media embeds. Images and fonts are served with the site.</p><p>Hosting and security infrastructure may process request information or use strictly necessary technology to deliver the website and protect it from misuse. These services are separate from advertising or visitor profiling.</p></section>
  <section><h2>Preferences and project drafts</h2><p>Project playback choices and dismissal of the privacy notice are held in page memory only. They reset when the page is loaded again. The site also respects your device’s reduced-motion preference. A project brief is also held in page memory; it is not automatically saved.</p><p>The “Copy project brief” action uses your device clipboard only after you choose it. Clipboard history is managed by your browser or operating system, not a website cookie.</p></section>
  <section><h2>Do you need to accept cookies?</h2><p>We have no optional tracking cookies to ask you to accept. Dismissing the privacy notice is an acknowledgement of the notice, not consent to advertising or analytics. You can browse and prepare an enquiry without accepting optional tracking.</p><p>If optional cookies or similar tracking are introduced, we will identify their providers and purposes, keep them off until any required consent is given, offer a clear rejection choice, and provide an easy way to withdraw consent.</p></section>
  <section><h2>External websites</h2><p>Instagram is an external link, not an embedded feed. If you open it, Instagram’s own cookie and privacy choices apply. The same applies to other external sites linked from our policies.</p></section>
  <section><h2>Your browser controls</h2><p>You can use your browser settings to inspect or clear cookies and site data. Blocking technology needed for hosting or security may affect access. See the <Link href="/privacy">privacy policy</Link> for information about technical logs, enquiries and your rights.</p></section>
 </LegalLayout>;
}
