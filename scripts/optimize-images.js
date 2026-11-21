/**
 * Builds web-ready images from the originals in assets/images.
 *
 *   assets/images/<name>.png            -> public/images/<slug>.webp          (max 1600px)
 *   assets/images/gallery/<name>.jpg    -> public/images/gallery/<slug>.webp     (max 1600px, lightbox)
 *                                       -> public/images/gallery/<slug>-sm.webp  (max 600px, grid thumbs)
 *   assets/images/hero.png              -> public/images/hero.webp (max 2000px) + og-image.jpg (1200x630)
 *
 * Usage: npm run images   (skips outputs that are newer than their source)
 */
const path = require('path');
const fs = require('fs-extra');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'assets', 'images');
const OUT = path.join(__dirname, '..', 'public', 'images');
const EXT = /\.(png|jpe?g)$/i;

const slugify = (file) =>
  path.basename(file, path.extname(file)).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function isFresh(src, out) {
  try {
    const [s, o] = await Promise.all([fs.stat(src), fs.stat(out)]);
    return o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function build(src, out, width, format = 'webp', extra = {}) {
  if (await isFresh(src, out)) return false;
  let img = sharp(src).rotate(); // respect EXIF orientation
  img = extra.cover
    ? img.resize(extra.cover.width, extra.cover.height, { fit: 'cover', position: 'attention' })
    : img.resize({ width, withoutEnlargement: true });
  img = format === 'jpeg' ? img.jpeg({ quality: 80, mozjpeg: true }) : img.webp({ quality: extra.quality || 78 });
  await img.toFile(out);
  return true;
}

async function main() {
  await fs.ensureDir(path.join(OUT, 'gallery'));
  let built = 0;

  for (const file of (await fs.readdir(SRC)).filter((f) => EXT.test(f))) {
    const src = path.join(SRC, file);
    const slug = slugify(file);
    // Transparent cut-outs (e.g. singing bowl) keep alpha automatically in WebP
    built += await build(src, path.join(OUT, `${slug}.webp`), slug === 'hero' ? 2000 : 1600);
    if (slug === 'hero') {
      built += await build(src, path.join(OUT, 'og-image.jpg'), null, 'jpeg', { cover: { width: 1200, height: 630 } });
    }
  }

  const gallerySrc = path.join(SRC, 'gallery');
  for (const file of (await fs.readdir(gallerySrc)).filter((f) => EXT.test(f))) {
    const src = path.join(gallerySrc, file);
    const slug = slugify(file);
    built += await build(src, path.join(OUT, 'gallery', `${slug}.webp`), 1600);
    built += await build(src, path.join(OUT, 'gallery', `${slug}-sm.webp`), 600, 'webp', { quality: 72 });
  }

  console.log(`[images] ${built} file(s) written to public/images`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
