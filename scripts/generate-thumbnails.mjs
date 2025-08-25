import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputDir = 'src/assets/Testimonials';
const outputDir = 'src/assets/Testimonials/thumbnails';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter(file => 
  /\.(jpg|jpeg|png)$/i.test(file)
);

console.log('Found image files:', imageFiles);

// Process each image
for (const file of imageFiles) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, `thumb_${file}`);
  
  try {
    await sharp(inputPath)
      .resize(120, 120, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 90,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);
    
    console.log(`✅ Generated thumbnail: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
}

console.log('Thumbnail generation complete!');
