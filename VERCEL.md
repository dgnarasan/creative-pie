# Creative Pie on Vercel

This repository preserves the approved Creative Pie site and its image assets.

## Import from GitHub

1. Import this repository as a Vercel project.
2. Keep the root directory at the repository root.
3. Use Node.js 22.x or newer. `vercel.json` selects Next.js, `npm ci`,
   `npx next build`, and the `.next` output directory.
4. Deploy. No database or application secrets are required for the existing site.

The existing `npm run build` script is the original Sites/Cloudflare build.
Vercel uses the explicit override in `vercel.json`; do not change the Vercel
build command to `npm run build`.

Vercel's supplied deployment domain is used for canonical URLs, social metadata,
and the sitemap. Set `SITE_URL` to the full HTTPS address if you want a custom
domain to take precedence, then redeploy.

The contact form opens the visitor's email application addressed to
`hello@creativepie.studio`; it does not send or store messages on a server.

## Local Next.js verification

```sh
npm ci
npx next build
npx next start
```

The original Sites configuration and scripts are retained for continuity.
Do not commit `.env` files, `node_modules`, `.next`, or `.vercel`.
