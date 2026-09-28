import { pageMetadata } from "../seo";
import { ResponsiveImage } from "../responsive-image";
import { SmartLink } from "../site-chrome";

export const metadata = pageMetadata("Selected Work", "Explore Creative Pie campaign imagery for Anagen Paris, Vonne X2X, Pie Bar and KAYCLO. Beauty, fashion and product stories from our Lagos studio.", "/work");

const work = [
  {
    id: "anagen", number: "001", title: "Anagen Paris", category: "Beauty / Haircare", theme: "Texture. Ritual. Identity.",
    summary: "A closer look at haircare: portraits, application and product details, brought together through texture.",
    images: [
      ["project-anagen-textures.webp", "Anagen Paris Hair Serum framed by different hair textures", "Product / Texture"],
      ["project-anagen-group.webp", "Three models presenting Anagen Paris Hair Serum", "Portrait / Together"],
      ["project-anagen-application.webp", "Model applying Anagen Paris Hair Serum", "Detail / Application"],
      ["project-anagen-flatlay.webp", "Anagen Paris Hair Serum product flat lay", "Still life / Product"],
    ],
  },
  {
    id: "vonne", number: "002", title: "Vonne X2X", category: "Fashion / Swimwear", theme: "A little attitude. A lot of colour.",
    summary: "Metallic swimwear, bold styling and the signature fur bag. A collection of playful fashion frames with a distinct point of view.",
    images: [
      ["project-vonne-car.webp", "Orange Vonne X2X bikini styled against a silver car", "Campaign / On location"],
      ["project-vonne-blue.webp", "Metallic blue Vonne X2X bikini", "Product / Metallic blue"],
      ["project-vonne-campaign-board.webp", "Vonne X2X campaign board with models, swimwear and fur-bag styling", "Collection / The edit"],
      ["project-vonne-fur-bag.webp", "Vonne X2X fur bag product layout", "Detail / The fur bag"],
    ],
  },
  {
    id: "piebar", number: "003", title: "Pie Bar", category: "Drinks / Product content", theme: "Good colour. Good company.",
    summary: "Juice takes centre stage in bright portraits and paired model shots. People, product and colour share the frame.",
    images: [
      ["project-piebar-duo.webp", "Two models presenting Pie Bar juice bottles", "Portrait / In good company"],
      ["project-piebar-product.webp", "Model presenting a Pie Bar juice bottle", "Product / Up close"],
      ["project-piebar-bottles.webp", "Model holding two Pie Bar juice flavours", "Colour / Pick your flavour"],
    ],
  },
  {
    id: "kayclo", number: "004", title: "KAYCLO", category: "Fashion / Womenswear", theme: "Made to mix. Styled to match.",
    summary: "The Mix Match Collection, seen through coordinated silhouettes and portrait studies in butter yellow, cocoa and soft pink.",
    images: [
      ["project-kayclo-collection.webp", "KAYCLO Mix Match Collection in butter yellow, cocoa and soft pink", "Collection / Mix Match"],
      ["project-kayclo-cocoa.webp", "KAYCLO cocoa lounge set shown from the front and back", "Look / Cocoa"],
      ["project-kayclo-butter.webp", "KAYCLO butter-yellow lounge set with portrait and full-length styling", "Look / Butter yellow"],
    ],
  },
];

export default function WorkPage() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-hero">
        <span className="subpage-eyebrow">Work / Index 001</span>
        <h1>Selected<br /><em>work.</em></h1>
        <div className="portfolio-hero__intro"><p>Different brands.<br />Distinct worlds.</p><p>Campaign imagery across beauty, fashion and drinks. Explore the details, the portraits and the full picture.</p></div>
        <nav className="portfolio-jump" aria-label="Jump to a campaign">{work.map((project) => <a key={project.id} href={`#${project.id}`}><span>{project.number}</span>{project.title}<i aria-hidden="true">↘︎</i></a>)}</nav>
      </header>
      {work.map((project) => (
        <section className={`portfolio-project portfolio-project--${project.id}`} id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
          <header className="portfolio-project__header"><span className="subpage-eyebrow">{project.number} / {project.category}</span><h2 id={`${project.id}-title`}>{project.title}</h2></header>
          <div className="portfolio-project__body">
            <figure className="portfolio-project__lead"><ResponsiveImage src={`/assets/${project.images[0][0]}`} alt={project.images[0][1]} sizes="(max-width: 700px) 92vw, 53vw" /><figcaption>{project.images[0][2]}</figcaption></figure>
            <div className="portfolio-project__story"><h3>{project.theme}</h3><p>{project.summary}</p><span className="subpage-eyebrow">Campaign imagery / Creative Pie</span></div>
            <div className={`portfolio-project__details portfolio-project__details--${project.images.length}`}>{project.images.slice(1).map(([image, alt, caption]) => <figure key={image}><ResponsiveImage src={`/assets/${image}`} alt={alt} sizes="(max-width: 700px) 44vw, 21vw" /><figcaption>{caption}</figcaption></figure>)}</div>
          </div>
        </section>
      ))}
      <section className="subpage-invitation"><span className="subpage-eyebrow">Your brand, next.</span><h2>Let’s make<br /><em>your next move.</em></h2><SmartLink href="/contact">Talk about your project <i aria-hidden="true">↗︎</i></SmartLink></section>
    </main>
  );
}
