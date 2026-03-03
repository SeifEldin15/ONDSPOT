const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const NEW_API_URL = "https://api.ondspot.biz";

let totalUpdated = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    // Direct string replacements for single and double quotes
    const endpoints = [
        'book-appointment',
        'subscribe',
        'ppf-quote',
        'service-quote',
        'christmas-lights-quote'
    ];

    endpoints.forEach(endpoint => {
        // Single quotes
        content = content.split(`fetch('/${endpoint}'`).join(`fetch('${NEW_API_URL}/${endpoint}'`);
        // Double quotes
        content = content.split(`fetch("/${endpoint}"`).join(`fetch("${NEW_API_URL}/${endpoint}"`);
    });
    
    // Update API_BASE_URL in index.html and index2.html if present
    content = content.split(`const API_BASE_URL = 'http://18.144.57.80:3000';`).join(`const API_BASE_URL = '${NEW_API_URL}';`);
    content = content.split(`const API_BASE_URL = "http://18.144.57.80:3000";`).join(`const API_BASE_URL = "${NEW_API_URL}";`);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
        totalUpdated++;
    }
});

console.log(`Finished updating ${totalUpdated} files.`);
