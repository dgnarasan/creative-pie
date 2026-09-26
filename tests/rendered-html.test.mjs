import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const routes = [
  ["/", /culture worth stopping for/i],
  ["/work", /Selected.*work/is],
  ["/capabilities", /Creative services/],
  ["/studio", /Independent/],
  ["/contact", /Tell us about/],
  ["/privacy", /Privacy/],
];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

function env() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

test("renders the reference-led landing with selected campaign work", async () => {
  const worker = await loadWorker();

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    env(),
    ctx,
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<link rel="canonical" href="https:\/\/creative-pie-studio\.ni-ne-gb-9\.chatgpt\.site\/"\/>/i);
  assert.doesNotMatch(html, /src="\/assets\/culture-cut-reference\.png"/i);
  assert.doesNotMatch(html, /src="\/assets\/culture-beauty-clean\.webp"/i);
  assert.match(html, /We make/i);
  assert.match(html, /Culture/i);
  assert.match(html, /stopping for/i);
  assert.match(html, /Selected/i);
  assert.match(html, /Anagen Paris/i);
  assert.match(html, /Vonne X2X/i);
  assert.match(html, /Pie Bar/i);
  assert.match(html, /rl-hero-strip/i);
  assert.doesNotMatch(html, /rl-tile-reel/i);
  assert.match(html, /project-(?:anagen|vonne|piebar)-[a-z-]+\.webp/i);
  assert.match(html, /project-vonne-campaign-board\.webp/i);
  assert.match(html, /Creative Pie \/ Channel results/i);
  assert.match(html, /29,086.*136,797/is);
  assert.match(html, /cp-studio-bts\.webp/i);
  assert.match(html, /cp-strategy-truck-branded-v3\.webp/i);
  assert.doesNotMatch(html, /four[- ]bag/i);
  assert.doesNotMatch(html, /Second Skin/i);
  assert.doesNotMatch(html, /cp-(?:paper-collage|segmented-fashion|automotive|studio)-v2\.webp/i);
  assert.doesNotMatch(html, /href="\/journal/i);
  assert.match(html, /aria-labelledby="service-title-01"/i);
  assert.match(html, /Content calendars, model sourcing, shoot production/);
  assert.doesNotMatch(html, /Open a folder|service-button-|rl-folder__drawer/);
  assert.doesNotMatch(html, /Pause hero animation/);
  assert.match(html, /aria-label="Anagen Paris photographs"/);
  assert.match(html, /Pause project sequence/);
  assert.doesNotMatch(html, /aria-label="View photo 1:/);
  assert.match(html, /width="1122" height="1402"/);
  assert.doesNotMatch(html, /NARA Index|Owambe, Modern/i);
  assert.doesNotMatch(html, /\/_vinext\/image\?/i);
  assert.doesNotMatch(html, /name=["']codex-preview["']/i);
});

test("keeps the active layout isolated and photographs proportional", () => {
  const home = readFileSync(new URL("../app/reference-led-home.tsx", import.meta.url), "utf8");
  const globalStyles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const homeStyles = readFileSync(new URL("../app/reference-home.css", import.meta.url), "utf8");
  assert.doesNotMatch(home, /scrollIntoView|rotateY|lastWorkIndex/);
  assert.doesNotMatch(globalStyles, /\.rl-[\w-]/, "Homepage rules must live in one stylesheet");
  assert.match(homeStyles, /\.rl-hero-frame img\s*\{[^}]*object-fit: contain/);
  assert.match(homeStyles, /\.rl-work__photo img\s*\{[^}]*width: auto;[^}]*height: auto/);
  assert.match(home, /View before &amp; after/);
  assert.match(home, /aria-haspopup="dialog"/);
  assert.match(homeStyles, /prefers-reduced-motion: reduce/);
});

test("keeps unfinished case studies and the journal offline", async () => {
  const worker = await loadWorker();
  const secondSkin = await worker.fetch(new Request("http://localhost/work/second-skin", { headers: { accept: "text/html" } }), env(), ctx);
  const anagen = await worker.fetch(new Request("http://localhost/work/anagen-paris", { headers: { accept: "text/html" } }), env(), ctx);
  const journal = await worker.fetch(new Request("http://localhost/journal", { headers: { accept: "text/html" } }), env(), ctx);
  const article = await worker.fetch(new Request("http://localhost/journal/attention-without-noise", { headers: { accept: "text/html" } }), env(), ctx);
  assert.equal(secondSkin.status, 404);
  assert.equal(anagen.status, 404);
  assert.equal(journal.status, 404);
  assert.equal(article.status, 404);
});

test("renders every public content route", async () => {
  const worker = await loadWorker();

  for (const [path, expected] of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      env(),
      ctx,
    );

    assert.equal(response.status, 200, `${path} should render successfully`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, `${path} should return HTML`);
    assert.match(await response.text(), expected, `${path} should contain its route-specific content`);
  }
});

test("publishes crawler support and a real not-found response", async () => {
  const worker = await loadWorker();

  const robots = await worker.fetch(new Request("http://localhost/robots.txt"), env(), ctx);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /sitemap\.xml/i);

  const sitemap = await worker.fetch(new Request("http://localhost/sitemap.xml"), env(), ctx);
  assert.equal(sitemap.status, 200);
  const sitemapText = await sitemap.text();
  assert.doesNotMatch(sitemapText, /work\/(?:second-skin|anagen-paris|nara-index|owambe-modern)/i);
  assert.doesNotMatch(sitemapText, /\/journal/i);

  const missing = await worker.fetch(
    new Request("http://localhost/this-route-does-not-exist", { headers: { accept: "text/html" } }),
    env(),
    ctx,
  );
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Missing index/i);
});

test("publishes branded previews, accurate page metadata and a usable enquiry route", async () => {
  const worker = await loadWorker();
  for (const [path] of routes) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env(), ctx);
    const html = await response.text();
    assert.match(html, /property="og:image" content="https:\/\/[^\"]+\/og\.png"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /property="og:site_name" content="Creative Pie"/);
    assert.match(html, /rel="apple-touch-icon"/);
    assert.doesNotMatch(html, /mailto:hello@creativepie\.studio/);
    assert.doesNotMatch(html, /cp-reference-hero\.webp/);
    if (path === "/") {
      assert.match(html, /application\/ld\+json/);
      assert.match(html, /"@type":"WebSite"/);
      assert.match(html, /"@type":"Organization"/);
    } else {
      assert.ok(html.includes(`property="og:url" content="https://creative-pie-studio.ni-ne-gb-9.chatgpt.site${path}"`), `${path} must have its own share URL`);
    }
    if (path === "/contact") {
      assert.match(html, /Copy your brief/);
      assert.match(html, /https:\/\/www\.instagram\.com\/creativepie\.co\//);
    }
  }
});
