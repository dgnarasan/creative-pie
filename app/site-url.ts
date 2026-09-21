// Vercel supplies deployment domains at build time. An explicit URL can be
// provided when a custom domain becomes the primary address.
export const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://creative-pie-studio.ni-ne-gb-9.chatgpt.site")
).replace(/\/$/, "");
