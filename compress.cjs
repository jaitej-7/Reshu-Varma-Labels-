const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.avif'].includes(ext)) {
        const newPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
        try {
          // Resize to max 1200px width (plenty for 20vw on a 4K screen)
          await sharp(fullPath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(newPath);
          fs.unlinkSync(fullPath); // Delete original to save space
          console.log(`Converted: ${file} -> .webp`);
        } catch (err) {
          console.error(`Failed to convert ${file}:`, err);
        }
      }
    }
  }
}

console.log('Starting image compression...');
processDirectory(assetsDir).then(() => console.log('Compression complete!'));
