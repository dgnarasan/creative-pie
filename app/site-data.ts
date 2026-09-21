export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  type: string;
  year: string;
  summary: string;
  challenge: string;
  response: string;
  result: string;
  services: string[];
  image: string;
  imageAlt: string;
  tone: "paper" | "ink" | "red" | "sand";
  statement: string;
  chapters: Array<{ number: string; title: string; copy: string }>;
  gallery: Array<{ src: string; alt: string; caption: string }>;
};

export const projects: Project[] = [
  {
    slug: "second-skin",
    index: "001",
    title: "Second Skin",
    client: "Independent fragrance concept",
    type: "Campaign / Film / AI Visuals",
    year: "2026",
    summary:
      "A nocturnal fragrance world told through silk, smoke, skin and the slow reveal of an object worth remembering.",
    challenge:
      "Create a luxury launch language that feels intimate and sensory before the audience ever smells the fragrance.",
    response:
      "We built a six-part visual ritual around touch, veil, emergence and memory, with every frame designed to work as both film and still campaign material.",
    result:
      "A modular launch system that moves coherently across film, social, product storytelling and editorial placements.",
    services: ["Creative direction", "Campaign system", "AI film", "Post-production"],
    image: "/assets/second-skin-bottle.webp",
    imageAlt: "Second Skin After Hours fragrance bottle wrapped in illuminated silk",
    tone: "ink",
    statement: "The fragrance is never explained. It is approached through atmosphere, touch and the memory left after the frame ends.",
    chapters: [
      { number: "01", title: "A language of proximity", copy: "We removed the usual perfume shorthand and built the campaign around the distance between skin, silk, smoke and glass. Every composition feels close enough to touch but controlled enough to remain mysterious." },
      { number: "02", title: "One ritual, many formats", copy: "Six visual beats create a modular story: presence, touch, veil, emergence, ritual and memory. Each beat can live alone as a still or connect into a short moving sequence." },
      { number: "03", title: "Product as the final discovery", copy: "The bottle enters late. Light, material and motion prepare the audience first, so the reveal feels like the answer to a mood rather than an interruption by a pack shot." },
    ],
    gallery: [
      { src: "/assets/second-skin-bottle.webp", alt: "Second Skin After Hours bottle beneath translucent amber silk", caption: "Veil / product emergence" },
      { src: "/assets/second-skin-ritual.webp", alt: "Second Skin After Hours fragrance ritual in warm amber light", caption: "Ritual / skin and atmosphere" },
    ],
  },
  {
    slug: "anagen-paris",
    index: "002",
    title: "Anagen Paris",
    client: "Hair care",
    type: "Beauty / Art Direction / Content",
    year: "2026",
    summary:
      "A close, tactile beauty campaign celebrating different hair languages through one consistent premium world.",
    challenge:
      "Give a growing hair-care product the warmth and visual precision of an international beauty launch without losing human texture.",
    response:
      "We developed a cast-led image system balancing intimate group compositions, natural skin, product clarity and varied hair texture.",
    result:
      "A flexible library of hero, social and product-led material with one recognizable campaign identity.",
    services: ["Campaign reconstruction", "Creative direction", "Product visuals", "Content system"],
    image: "/assets/anagen-trio.webp",
    imageAlt: "Three models presenting Anagen Paris Hair Serum",
    tone: "sand",
    statement: "Different hair languages belong to one premium world when casting, light, gesture and product clarity follow the same visual grammar.",
    chapters: [
      { number: "01", title: "Cast for contrast, directed as one", copy: "The visual system celebrates distinct hair textures without separating the women into disconnected stories. Close group compositions create intimacy, confidence and a recognisable campaign silhouette." },
      { number: "02", title: "Beauty without the plastic finish", copy: "Soft frontal light keeps skin luminous while retaining pores, flyaways and natural material behavior. The aim is premium polish with enough reality to make the product world believable." },
      { number: "03", title: "Product integrated by touch", copy: "Bottle and box are held through natural shared gestures rather than pasted into empty corners. Hands, labels and faces remain legible inside the same composition." },
    ],
    gallery: [
      { src: "/assets/anagen-trio.webp", alt: "Three models presenting Anagen Paris Hair Serum", caption: "Together / campaign anchor" },
      { src: "/assets/anagen-application.webp", alt: "Model applying Anagen Paris Hair Serum to natural hair", caption: "Ritual / application" },
      { src: "/assets/anagen-hair.webp", alt: "Anagen Paris Hair Serum framed by flowing dark hair", caption: "Texture / product integration" },
      { src: "/assets/anagen-flatlay.webp", alt: "Anagen Paris Hair Serum bottles arranged in a graphic flat lay", caption: "Object / product system" },
    ],
  },
];

export const services = [
  {
    number: "01",
    title: "Branding",
    summary: "A clear identity for your brand, from how it looks to how it speaks.",
    detail: "Brand positioning, logos, colour, typography, tone of voice, brand guidelines and templates for a consistent presence.",
  },
  {
    number: "02",
    title: "Creative Direction",
    summary: "Campaign concepts, visual systems and production direction.",
    detail: "Campaign concepts, visual systems, launch direction, photography language, styling, storyboards and production leadership.",
  },
  {
    number: "03",
    title: "Content Creation + SMM",
    summary: "Content creation and social media management, from the first idea to the published post.",
    detail: "Content calendars, model sourcing, shoot production, photography, video, editing, captions, scheduling and day-to-day account management.",
  },
  {
    number: "04",
    title: "Web Design + Development",
    summary: "Website strategy, UX, interface design and custom development.",
    detail: "Strategy, UX, interface design, motion direction, custom development, responsive systems, CMS and launch support.",
  },
  {
    number: "05",
    title: "Ongoing Creative Support",
    summary: "Creative direction and production support after launch.",
    detail: "Campaign extensions, content planning, design support, production management and regular brand reviews.",
  },
];

export const articles = [
  {
    slug: "attention-without-noise",
    number: "J—01",
    title: "How we edit brand systems",
    category: "Point of view",
    date: "27.07.26",
    readTime: "5 min read",
    intro: "A practical note on reducing clutter and building a consistent brand system.",
  },
  {
    slug: "motion-that-earns-its-place",
    number: "J—02",
    title: "Designing motion for websites",
    category: "Digital",
    date: "12.07.26",
    readTime: "6 min read",
    intro: "How motion can support navigation, hierarchy and feedback without slowing the page down.",
  },
  {
    slug: "new-production-literacy",
    number: "J—03",
    title: "Using AI in image production",
    category: "Practice",
    date: "28.06.26",
    readTime: "6 min read",
    intro: "A practical overview of references, consistency, quality control and human review in AI-assisted production.",
  },
];
