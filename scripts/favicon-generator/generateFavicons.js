const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Define source and output paths
const sourceImagePath = path.join(__dirname, '../../public/creolitos_sm.png');
const outputDir = path.join(__dirname, '../../public');

// Create output directory if it doesn't exist
fs.ensureDirSync(outputDir);

// Define favicon sizes (width x height in pixels)
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 64, name: 'favicon-64x64.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

// Generate ICO file (16x16 and 32x32 combined)
async function generateIco() {
  console.log('Generating favicon.ico...');
  
  try {
    // Create 16x16 and 32x32 PNG buffers with transparent background
    const buffer16 = await sharp(sourceImagePath)
      .resize(16, 16)
      .toFormat('png')
      .toBuffer();
      
    const buffer32 = await sharp(sourceImagePath)
      .resize(32, 32)
      .toFormat('png')
      .toBuffer();

    // Write favicon.ico directly using sharp
    await sharp(buffer32)
      .toFile(path.join(outputDir, 'favicon.ico'));
      
    console.log('favicon.ico generated successfully.');
  } catch (error) {
    console.error('Error generating favicon.ico:', error);
  }
}

// Generate PNG favicons at different sizes
async function generatePngFavicons() {
  console.log('Generating PNG favicons...');
  
  try {
    for (const { size, name } of faviconSizes) {
      console.log(`Generating ${name} (${size}x${size})...`);
      
      await sharp(sourceImagePath)
        .resize(size, size)
        .toFile(path.join(outputDir, name));
    }
    
    console.log('All PNG favicons generated successfully.');
  } catch (error) {
    console.error('Error generating PNG favicons:', error);
  }
}

// Generate SVG favicon
async function generateSvgFavicon() {
  console.log('Generating SVG favicon...');
  
  try {
    // Keep the SVG transparent as well
    const size = 32;
    await sharp(sourceImagePath)
      .resize(size, size)
      .toFile(path.join(outputDir, 'favicon.svg'));
      
    console.log('favicon.svg generated successfully.');
  } catch (error) {
    console.error('Error generating SVG favicon:', error);
  }
}

// Run all generation functions
async function generateAllFavicons() {
  try {
    console.log('Starting favicon generation...');
    console.log(`Source image: ${sourceImagePath}`);
    console.log(`Output directory: ${outputDir}`);

    await generatePngFavicons();
    await generateIco();
    await generateSvgFavicon();
    
    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error during favicon generation:', error);
  }
}

// Execute the script
generateAllFavicons();