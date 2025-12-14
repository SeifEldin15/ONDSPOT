const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function createOGImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Fill with light/white background (matching your logo images)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 1200, 630);
    
    try {
        // Try to load one of your logo files
        let logo;
        const logoFiles = [
            './logo2.png',
            './68791f7a013d29cc194e25ea_brandmark-design (6).png',
            './logo-optimized.webp',
            './logo2.webp'
        ];
        
        for (const file of logoFiles) {
            try {
                logo = await loadImage(file);
                console.log(`Loaded logo from: ${file}`);
                break;
            } catch (e) {
                continue;
            }
        }
        
        if (!logo) throw new Error('No logo found');
        
        // Calculate dimensions to fit logo prominently
        const maxWidth = 800;
        const maxHeight = 450;
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
        
        console.log('Logo dimensions:', width, 'x', height);
        
    } catch (err) {
        console.error('Error loading logo:', err.message);
        
        // Simple fallback with just "ON" text
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 180px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ON', 600, 315);
    }
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./og-image.png', buffer);
    console.log('✓ Created og-image.png');
    
    // Save as JPEG (better for og:image)
    const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync('./og-image.jpg', jpegBuffer);
    console.log('✓ Created og-image.jpg (1200x630)');
}

createOGImage().catch(err => {
    console.error('Error:', err.message);
});
