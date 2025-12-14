const fs = require('fs');
const { createCanvas } = require('canvas');

// Create the "ON" logo exactly like the ones you provided
function createONLogo() {
    // Create a square canvas for the logo
    const logoCanvas = createCanvas(640, 640);
    const ctx = logoCanvas.getContext('2d');
    
    // Light gray background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 640, 640);
    
    // Draw the "ON" text in bold black
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 280px Arial Black, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ON', 320, 320);
    
    return logoCanvas;
}

async function createOGImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Fill with light background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 1200, 630);
    
    // Create and draw the ON logo
    const logo = createONLogo();
    
    // Calculate dimensions - make logo prominent
    const maxWidth = 900;
    const maxHeight = 500;
    let width = 640;
    let height = 640;
    
    // Scale to fit
    const scale = Math.min(maxWidth / width, maxHeight / height);
    width = width * scale;
    height = height * scale;
    
    // Center the logo
    const x = (1200 - width) / 2;
    const y = (630 - height) / 2;
    
    ctx.drawImage(logo, x, y, width, height);
    
    console.log(`✓ Created "ON" logo at ${Math.round(width)} x ${Math.round(height)}`);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./og-image.png', buffer);
    console.log('✓ Created og-image.png');
    
    // Save as JPEG
    const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync('./og-image.jpg', jpegBuffer);
    console.log('✓ Created og-image.jpg (1200x630)');
    console.log('\n✅ Done! Your "ON" logo is now in the og-image');
}

createOGImage().catch(err => {
    console.error('Error:', err.message);
});
