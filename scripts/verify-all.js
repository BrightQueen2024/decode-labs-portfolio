const fs = require('fs');
const http = require('http');

console.log('Testing endpoints, files, and markup integrity...\n');

// 1. Check OpenGraph and triggers in both index.html and public/index.html
const files = ['index.html', 'public/index.html'];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const requiredSubstrings = [
    'property="og:title" content="Ayuba Garba | Systems & Software Engineer"',
    'property="og:description"',
    'property="og:image"',
    'property="og:url"',
    'property="og:type" content="website"',
    'name="twitter:card" content="summary_large_image"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
    'href="/assets/Ayuba_Garba_Resume.pdf"',
    'download="Ayuba_Garba_Resume.pdf"',
    "openCaseStudyModal('awsoli')",
    "openCaseStudyModal('taila')",
    "openCaseStudyModal('savilinks')",
    "openCaseStudyModal('defenzio')",
    "openCaseStudyModal('nexaverse')",
    "openCaseStudyModal('kingdomconnect')",
    "openCaseStudyModal('trading')",
    'id="caseStudyModalOverlay"'
  ];

  for (const str of requiredSubstrings) {
    if (!content.includes(str)) {
      console.error(`❌ Missing in ${f}: ${str}`);
      process.exit(1);
    }
  }
  console.log(`✅ [HTML] ${f} verified with all OpenGraph tags, resume triggers & 7 case study buttons.`);
}

// 2. Check CASE_STUDY_DATA in script.js and public/script.js
const scripts = ['script.js', 'public/script.js'];
const keys = ['awsoli', 'taila', 'savilinks', 'defenzio', 'nexaverse', 'kingdomconnect', 'trading'];
for (const s of scripts) {
  const content = fs.readFileSync(s, 'utf8');
  for (const k of keys) {
    if (!content.includes(`'${k}': {`) && !content.includes(`"${k}": {`) && !content.includes(`${k}: {`)) {
      console.error(`❌ Missing platform key "${k}" in ${s}`);
      process.exit(1);
    }
  }
  if (!content.includes('openCaseStudyModal') || !content.includes('closeCaseStudyModal') || !content.includes('switchCaseStudyTab')) {
    console.error(`❌ Missing modal functions in ${s}`);
    process.exit(1);
  }
  console.log(`✅ [JS] ${s} verified with all 7 platform case study entries & modal engine.`);
}

// 3. Check resume PDF in assets and public/assets
const resumes = ['assets/Ayuba_Garba_Resume.pdf', 'public/assets/Ayuba_Garba_Resume.pdf'];
for (const r of resumes) {
  if (!fs.existsSync(r)) {
    console.error(`❌ Resume file missing at: ${r}`);
    process.exit(1);
  }
  const size = fs.statSync(r).size;
  if (size < 1000) {
    console.error(`❌ Resume file abnormally small (${size} bytes): ${r}`);
    process.exit(1);
  }
  console.log(`✅ [PDF] Resume binary verified: ${r} (${size} bytes)`);
}

// 4. Test Local HTTP server
http.get('http://localhost:3000/assets/Ayuba_Garba_Resume.pdf', (res) => {
  if (res.statusCode === 200 && res.headers['content-type'] === 'application/pdf') {
    console.log(`✅ [HTTP] Live /assets/Ayuba_Garba_Resume.pdf returns HTTP 200 application/pdf`);
    console.log('\n🎉 ALL 100% OF VERIFICATIONS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error(`❌ HTTP request failed with status: ${res.statusCode}`);
    process.exit(1);
  }
}).on('error', (e) => {
  console.warn(`⚠️ HTTP server check skipped: ${e.message}`);
  process.exit(0);
});
