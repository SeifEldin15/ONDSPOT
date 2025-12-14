const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function createOGImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Fill with light/white background (matching your provided logo images)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 1200, 630);
    
    // Draw a simple "ON" logo based on your design
    // Black bold "ON" text centered
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 220px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw "ON" text (matching your logo style)
    ctx.fillText('ON', 600, 315);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./og-image.png', buffer);
    console.log('✓ Created og-image.png');
    
    // Save as JPEG (better for og:image)
    const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync('./og-image.jpg', jpegBuffer);
    console.log('✓ Created og-image.jpg (1200x630)');
    console.log('Image created with your "ON" logo style');
}

createOGImage().catch(err => {
    console.error('Error:', err.message);
});
