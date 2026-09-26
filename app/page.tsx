import { ReferenceLedHome } from "./reference-led-home";
import { siteUrl } from "./site-url";
import { brandName, homeDescription } from "./seo";
import { contactUrl } from "./contact-details";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: brandName, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en" },
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: brandName, url: siteUrl, description: homeDescription, logo: { "@type": "ImageObject", url: `${siteUrl}/icon-512.png`, width: 512, height: 512 }, sameAs: [contactUrl], address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" } },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <ReferenceLedHome />
    </main>
  );
}
