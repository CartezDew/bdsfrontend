import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const inputDir = new URL('../public/hero_images/', import.meta.url);
const outputDir = new URL('../src/Assets/Hero/', import.meta.url);
const images = [
  ['1-Young-clients', [480, 800, 1440]],
  ['2-small-business-owners', [240, 480, 720]],
  ['3-coworkers', [240, 480, 720]],
  ['4-retires', [240, 480, 720]],
  ['5-excited-customer', [240, 480, 720]],
];

await mkdir(outputDir, { recursive: true });

// Preserve the originals; Vite fingerprints these smaller display assets for caching.
for (const [name, widths] of images) {
  for (const width of widths) {
    const { size } = await sharp(fileURLToPath(new URL(`${name}.jpg`, inputDir)))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 84, effort: 6 })
      .toFile(fileURLToPath(new URL(`${name}-${width}.webp`, outputDir)));
    console.log(`${name}-${width}.webp: ${(size / 1024).toFixed(1)} KB`);
  }
}
