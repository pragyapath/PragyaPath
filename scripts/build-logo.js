/**
 * Builds logo + favicon files from assets/brand/logo-original.webp
 * (orange logo on a white background).
 *
 * White is turned into transparency, so the logo sits cleanly on any background.
 * Outputs (public/images/brand/):
 *   logo-mark.png / .webp      lotus symbol only (navbar)
 *   logo-full.png / .webp      lotus + PRAGYA PATH + tagline (orange)
 *   logo-full-white.png        same, white (dark footer)
 *   favicon-32.png, favicon-192.png, apple-touch-icon.png
 */
const path = require('path');
const fs = require('fs-extra');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'assets', 'brand', 'logo-original.webp');
const OUT = path.join(__dirname, '..', 'public', 'images', 'brand');
const BRAND = [236, 122, 49]; // #EC7A31
const WHITE = [255, 255, 255];
const INK = 49; // darkest channel of the brand orange (blue)
const PAPER = 240; // source background is off-white (~250); treat >= this as fully clear

/** Turn the white background into alpha and paint all ink in one solid colour. */
async function knockout(color) {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let p = 0, i = 0; p < info.width * info.height; p++, i += 3) {
    const darkest = Math.min(data[i], data[i + 1], data[i + 2]);
    const alpha = Math.max(0, Math.min(255, Math.round(((PAPER - darkest) / (PAPER - INK)) * 255)));
    out.set([...color, alpha], p * 4);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

// Lotus occupies rows ~319-889 of the 1584px source
const LOTUS = { left: 420, top: 300, width: 744, height: 610 };

async function main() {
  await fs.ensureDir(OUT);
  const orange = await knockout(BRAND);
  const white = await knockout(WHITE);

  // sharp runs trim() before extract() in one pipeline, so crop first, then trim
  const lotus = await sharp(orange).extract(LOTUS).toBuffer();
  const mark = await sharp(lotus).trim().toBuffer();
  await sharp(mark).resize({ width: 256 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo-mark.png'));
  await sharp(mark).resize({ width: 256 }).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-mark.webp'));

  const full = await sharp(orange).trim().toBuffer();
  await sharp(full).resize({ width: 800 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo-full.png'));
  await sharp(full).resize({ width: 800 }).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-full.webp'));
  await sharp(white).trim().resize({ width: 800 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo-full-white.png'));

  // Favicons: lotus centred on a square. Small sizes get a transparent background,
  // the apple icon gets white (iOS shows black behind transparency).
  const icon = (size, bg) =>
    sharp(mark)
      .resize(Math.round(size * 0.84), Math.round(size * 0.84), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: Math.floor(size * 0.08), bottom: Math.ceil(size * 0.08),
        left: Math.floor(size * 0.08), right: Math.ceil(size * 0.08),
        background: bg,
      })
      .resize(size, size)
      .png();
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  await icon(32, clear).toFile(path.join(OUT, 'favicon-32.png'));
  await icon(192, clear).toFile(path.join(OUT, 'favicon-192.png'));
  await icon(180, { r: 255, g: 255, b: 255, alpha: 1 }).toFile(path.join(OUT, 'apple-touch-icon.png'));

  console.log('[logo] brand files written to public/images/brand');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
