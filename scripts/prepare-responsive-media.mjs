import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

// Run when campaign assets change. Commit the output so both hosts serve the
// same pre-sized originals, without an image service or runtime transformation.
const home = await readFile(new URL("../app/reference-led-home.tsx", import.meta.url), "utf8");
const paths = [...new Set(home.match(/\/assets\/[a-z0-9-]+\.webp/g))];
const root = new URL("../public/", import.meta.url);
await mkdir(new URL("assets/responsive/", root), { recursive: true });
const manifest = {};
let originalBytes = 0, mobileBytes = 0;
for (const path of paths) {
  const bytes = await readFile(new URL(path.slice(1), root));
  const { width, height } = await sharp(bytes).metadata();
  const stem = path.split("/").pop().replace(".webp", "");
  const candidates = [];
  for (const size of [240, 480, 800]) {
    if (size >= width) continue;
    const output = await sharp(bytes).resize({ width: size, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    const hash = createHash("sha256").update(output).digest("hex").slice(0, 10);
    const url = `/assets/responsive/${stem}-${size}-${hash}.webp`;
    await writeFile(new URL(url.slice(1), root), output);
    candidates.push(`${url} ${size}w`);
    if (size === 480) mobileBytes += output.length;
  }
  candidates.push(`${path} ${width}w`);
  manifest[path] = { width, height, srcSet: candidates.join(", ") };
  originalBytes += bytes.length;
}
await writeFile(new URL("../app/responsive-media.json", import.meta.url), JSON.stringify(manifest, null, 2) + "\n");

const fonts = [
  ["@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2", "archivo-latin-v1.woff2"],
  ["@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2", "bodoni-latin-v1.woff2"],
  ["@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", "plex-mono-latin-v1.woff2"],
];
await mkdir(new URL("fonts/", root), { recursive: true });
for (const [source, target] of fonts) {
  await copyFile(new URL(`../node_modules/${source}`, import.meta.url), new URL(`fonts/${target}`, root));
}
for (const [source, target] of [["@fontsource-variable/archivo", "archivo"], ["@fontsource-variable/bodoni-moda", "bodoni"], ["@fontsource/ibm-plex-mono", "plex-mono"]]) {
  await copyFile(new URL(`../node_modules/${source}/LICENSE`, import.meta.url), new URL(`fonts/${target}-LICENSE.txt`, root));
}
console.log(JSON.stringify({ images: paths.length, originalBytes, mobile480Bytes: mobileBytes }));
