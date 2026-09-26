import { pageMetadata } from "../seo";
import { ContactForm } from "../site-chrome";
import { contactLabel, contactUrl } from "../contact-details";

export const metadata = pageMetadata('Start a Project', 'Tell Creative Pie about your next campaign, brand, website or content project. Based in Lagos and available worldwide.', "/contact");

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header>
        <span>Contact / Index 005</span>
        <h1>Tell us about<br /><em>your project.</em></h1>
        <p>Share what you need, your timing and a useful budget range. A rough outline is enough.</p>
        <div className="page-ring" aria-hidden="true" />
      </header>
      <section className="contact-layout">
        <ContactForm />
        <aside>
          <div><span>Instagram / Direct messages</span><a href={contactUrl} target="_blank" rel="noopener noreferrer">{contactLabel}</a></div>
          <div><span>Base</span><p>Lagos, Nigeria<br />Available worldwide</p></div>
          <div><span>Good to include</span><p>The problem<br />The desired outcome<br />Your timing<br />A useful budget range</p></div>
        </aside>
      </section>
    </main>
  );
}
