const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function createOGImageFromAttachment() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Fill with light background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 1200, 630);
    
    try {
        // Use the provided image file name
        const logo = await loadImage('./ondspot-biz-attachment.png');
        console.log(`✓ Loaded logo: ${logo.width}x${logo.height}`);
        
        // Calculate dimensions to fit nicely
        const maxWidth = 900;
        const maxHeight = 500;
        let width = logo.width;
        let height = logo.height;
        
        // Scale to fit
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width = width * scale;
        height = height * scale;
        
        // Center the logo
        const x = (1200 - width) / 2;
        const y = (630 - height) / 2;
        
        ctx.drawImage(logo, x, y, width, height);
        
        console.log(`✓ Resized to: ${Math.round(width)}x${Math.round(height)}`);
        
        // Save as JPEG
        const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
        fs.writeFileSync('./og-image.jpg', jpegBuffer);
        console.log('✓ Created og-image.jpg (1200x630)');
        
        // Save as PNG
        const pngBuffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./og-image.png', pngBuffer);
        console.log('✓ Created og-image.png');
        
        console.log('\n✅ Done! Upload og-image.jpg to your server');
        
    } catch (err) {
        console.error('❌ Error:', err.message);
        console.log('\nPlease save the provided image as "ondspot-biz-attachment.png" in this folder first');
    }
}

createOGImageFromAttachment();
