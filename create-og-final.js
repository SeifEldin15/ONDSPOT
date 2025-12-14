const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function createOGImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Fill with light background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 1200, 630);
    
    try {
        // Try to load the user-provided logo images
        let logo;
        const logoFiles = [
            './on-logo-1.png',
            './on-logo-2.png',
        ];
        
        for (const file of logoFiles) {
            try {
                if (fs.existsSync(file)) {
                    logo = await loadImage(file);
                    console.log(`✓ Loaded logo from: ${file}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!logo) {
            throw new Error('Please save one of the provided logo images as "on-logo-1.png" or "on-logo-2.png"');
        }
        
        // Calculate dimensions - make logo large and prominent
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
        
        console.log(`✓ Logo dimensions: ${Math.round(width)} x ${Math.round(height)}`);
        
    } catch (err) {
        console.error('❌ Error:', err.message);
        console.log('\nPlease:');
        console.log('1. Save one of your "ON" logo images');
        console.log('2. Name it "on-logo-1.png"');
        console.log('3. Place it in this folder');
        console.log('4. Run this script again');
        process.exit(1);
    }
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./og-image.png', buffer);
    console.log('✓ Created og-image.png');
    
    // Save as JPEG
    const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync('./og-image.jpg', jpegBuffer);
    console.log('✓ Created og-image.jpg (1200x630)');
    console.log('\n✅ Done! Upload og-image.jpg to your server');
}

createOGImage().catch(err => {
    console.error('Error:', err.message);
});
