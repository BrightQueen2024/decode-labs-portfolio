const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🔍 Running executive build & syntax verification...\n');

let errorCount = 0;

// 1. Validate JS Files
const jsFiles = [
    path.join(__dirname, '..', 'public', 'script.js'),
    path.join(__dirname, '..', 'script.js'),
    path.join(__dirname, '..', 'server.js')
];

for (const filePath of jsFiles) {
    const relPath = path.relative(path.join(__dirname, '..'), filePath);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        new vm.Script(content);
        console.log(`✅ [JS] Syntax verified: ${relPath}`);
    } catch (err) {
        console.error(`❌ [JS] Syntax Error in ${relPath}:`, err.message);
        errorCount++;
    }
}

// 2. Validate CSS Files
const cssFiles = [
    path.join(__dirname, '..', 'public', 'style.css'),
    path.join(__dirname, '..', 'style.css')
];

for (const filePath of cssFiles) {
    const relPath = path.relative(path.join(__dirname, '..'), filePath);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Basic brace balance check
        const openBraces = (content.match(/{/g) || []).length;
        const closeBraces = (content.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
            throw new Error(`Mismatched braces: ${openBraces} open vs ${closeBraces} close.`);
        }
        console.log(`✅ [CSS] Syntax verified: ${relPath} (${openBraces} rules balanced)`);
    } catch (err) {
        console.error(`❌ [CSS] Error in ${relPath}:`, err.message);
        errorCount++;
    }
}

// 3. Validate HTML & Core Asset Availability
const htmlFiles = [
    path.join(__dirname, '..', 'public', 'index.html'),
    path.join(__dirname, '..', 'index.html')
];

for (const filePath of htmlFiles) {
    const relPath = path.relative(path.join(__dirname, '..'), filePath);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('<!DOCTYPE html>') || !content.includes('</html>')) {
            throw new Error('Malformed HTML structure.');
        }
        console.log(`✅ [HTML] Verified document integrity: ${relPath}`);
    } catch (err) {
        console.error(`❌ [HTML] Error in ${relPath}:`, err.message);
        errorCount++;
    }
}

// 4. Validate Critical Platform Images
const requiredImages = [
    'nexaverse.jpg',
    'trading.jpg',
    'awsoli.jpg',
    'taila.jpg',
    'savilinks.jpg',
    'defenzio.jpg',
    'kingdomconnect.jpg',
    'profile.jpg.jpeg',
    'profile.png'
];

for (const imgName of requiredImages) {
    const pubImg = path.join(__dirname, '..', 'public', 'images', imgName);
    const pubProfile = path.join(__dirname, '..', 'public', imgName);
    const pubAssets = path.join(__dirname, '..', 'public', 'assets', imgName);
    const rootImg = path.join(__dirname, '..', 'images', imgName);
    const rootProfile = path.join(__dirname, '..', imgName);
    const rootAssets = path.join(__dirname, '..', 'assets', imgName);
    const exists = fs.existsSync(pubImg) || fs.existsSync(pubProfile) || fs.existsSync(pubAssets) || fs.existsSync(rootImg) || fs.existsSync(rootProfile) || fs.existsSync(rootAssets);
    if (exists) {
        console.log(`✅ [ASSET] Image exists: ${imgName}`);
    } else {
        console.error(`❌ [ASSET] Missing image: ${imgName}`);
        errorCount++;
    }
}

// 5. Validate High-Resolution Verified Certificates
const requiredCertificates = [
    'walmart-advanced-engineering.png',
    'aws-ai-practitioner.png',
    'uopeople-emotional-intelligence.jpg'
];

for (const certName of requiredCertificates) {
    const pubCert = path.join(__dirname, '..', 'public', 'assets', 'certificates', certName);
    const rootCert = path.join(__dirname, '..', 'assets', 'certificates', certName);
    const exists = fs.existsSync(pubCert) && fs.existsSync(rootCert);
    if (exists) {
        console.log(`✅ [CERTIFICATE] Verified asset exists: ${certName}`);
    } else {
        console.error(`❌ [CERTIFICATE] Missing certificate asset: ${certName}`);
        errorCount++;
    }
}

// 6. Validate Executive Technical Resume PDF
const resumeFile = 'Ayuba_Garba_Resume.pdf';
const pubResume = path.join(__dirname, '..', 'public', 'assets', resumeFile);
const rootResume = path.join(__dirname, '..', 'assets', resumeFile);

if (fs.existsSync(pubResume) && fs.existsSync(rootResume)) {
    const pubSize = fs.statSync(pubResume).size;
    const rootSize = fs.statSync(rootResume).size;
    if (pubSize > 1000 && rootSize > 1000) {
        console.log(`✅ [RESUME] Executive PDF verified: ${resumeFile} (Root: ${rootSize}B, Public: ${pubSize}B)`);
    } else {
        console.error(`❌ [RESUME] Resume PDF file is too small or corrupt: ${resumeFile}`);
        errorCount++;
    }
} else {
    console.error(`❌ [RESUME] Missing resume PDF in root or public assets: ${resumeFile}`);
    errorCount++;
}

console.log('\n----------------------------------------');
if (errorCount === 0) {
    console.log('✨ Build verification SUCCESS: 0 errors detected. Production ready.');
    process.exit(0);
} else {
    console.error(`💥 Build verification FAILED: ${errorCount} error(s) found.`);
    process.exit(1);
}
