const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateResume() {
    console.log('Generating executive technical resume PDF...');
    const pdfDoc = await PDFDocument.create();

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Color Palette
    const colorDark = rgb(0.06, 0.07, 0.09);       // #0f1117
    const colorGold = rgb(0.83, 0.69, 0.22);       // #d4af37
    const colorGoldDark = rgb(0.60, 0.40, 0.08);   // #996515
    const colorTextPrimary = rgb(0.12, 0.14, 0.18);
    const colorTextSecondary = rgb(0.35, 0.40, 0.48);
    const colorLine = rgb(0.85, 0.88, 0.92);
    const colorPillBg = rgb(0.95, 0.96, 0.98);

    // Page 1: Executive Profile, Technical Matrix & Core Systems
    const page1 = pdfDoc.addPage([612, 792]); // Standard US Letter
    const { width, height } = page1.getSize();
    const margin = 40;
    let y = height - margin;

    // Header Background Accent Stripe
    page1.drawRectangle({
        x: margin,
        y: y - 72,
        width: width - (margin * 2),
        height: 72,
        color: colorDark
    });

    // Gold Top Border Line
    page1.drawLine({
        start: { x: margin, y: y },
        end: { x: width - margin, y: y },
        thickness: 3,
        color: colorGold
    });

    // Candidate Name
    page1.drawText('AYUBA GARBA', {
        x: margin + 18,
        y: y - 28,
        size: 20,
        font: fontBold,
        color: rgb(1, 1, 1)
    });

    // Candidate Title
    page1.drawText('Systems & Software Engineer | Distributed Architectures & Algorithmic Engines', {
        x: margin + 18,
        y: y - 44,
        size: 9.5,
        font: fontRegular,
        color: colorGold
    });

    // Contact & Location Bar
    page1.drawText('Email: ayubagarba605@gmail.com  |  Portfolio: ayuba-garba-portfolio.netlify.app  |  GitHub: github.com/BrightQueen2024', {
        x: margin + 18,
        y: y - 60,
        size: 8,
        font: fontRegular,
        color: rgb(0.8, 0.85, 0.9)
    });

    y -= 88;

    // Section Helper
    const drawSectionHeader = (page, title, yPos) => {
        page.drawText(title.toUpperCase(), {
            x: margin,
            y: yPos,
            size: 10,
            font: fontBold,
            color: colorGoldDark
        });
        page.drawLine({
            start: { x: margin, y: yPos - 3 },
            end: { x: width - margin, y: yPos - 3 },
            thickness: 1,
            color: colorLine
        });
        return yPos - 15;
    };

    // 1. EXECUTIVE SUMMARY
    y = drawSectionHeader(page1, 'Executive Engineering Summary', y);
    const summaryLines = [
        'Systems & Software Engineer specializing in resilient, high-concurrency distributed backends (Go, Rust), algorithmic execution',
        'engines (MQL5, C++), and cloud infrastructure. Track record architecting zero-downtime reverse proxies, deterministic row-locking',
        'ledgers with strict ACID guarantees, and sub-millisecond market routing. Vetted by Turing (Top 1%) and certified across AWS Cloud AI',
        'and Walmart Global Tech software engineering tracks.'
    ];
    for (const line of summaryLines) {
        page1.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: colorTextPrimary });
        y -= 11.5;
    }
    y -= 5;

    // 2. CORE TECHNICAL COMPETENCIES
    y = drawSectionHeader(page1, 'Core Technical Stack & Architecture Matrix', y);
    const skills = [
        { label: 'Systems & Core Languages:', val: 'Go (Golang), Rust, C++, MQL5, TypeScript, JavaScript (ESNext), Python, SQL' },
        { label: 'Distributed Systems & Concurrency:', val: 'Non-blocking I/O, Goroutine Worker Pools, Mutexes, WebSockets Multiplexing, Redis Pub/Sub' },
        { label: 'State Invariance & Databases:', val: 'PostgreSQL, TimescaleDB, Redis, SQLite, MongoDB, ACID Transactions, Row-Level Locking' },
        { label: 'Cloud, Edge & Reliability:', val: 'Cloudflare Edge Workers, AWS, Linux Kernel Tuning, Docker, CI/CD Automation, Netlify' },
        { label: 'Security & Algorithmic Engines:', val: 'zk-SNARK Biometric Circuits, RBAC Access Matrices, 3-EMA Market Pullbacks, Dynamic ATR' }
    ];

    for (const skill of skills) {
        page1.drawText(skill.label, { x: margin, y, size: 8, font: fontBold, color: colorTextPrimary });
        page1.drawText(skill.val, { x: margin + 175, y, size: 8, font: fontRegular, color: colorTextSecondary });
        y -= 12;
    }
    y -= 5;

    // 3. CORE ARCHITECTURAL SYSTEMS & PRODUCTION PLATFORMS
    y = drawSectionHeader(page1, 'Key Architectural Systems & Production Deployments', y);

    const projects = [
        {
            title: 'NeXaVerSe MVP — Distributed Super-App & Zero-Knowledge Identity',
            meta: 'Go  |  Rust  |  zk-SNARKs  |  WebSockets  |  Redis Cluster',
            bullets: [
                'Engineered an asynchronous Go reverse-proxy API gateway with non-blocking worker pools achieving <1.2ms routing latency.',
                'Designed a double-entry ACID Rust ledger implementing deterministic account row-locking to mathematically prevent deadlock conditions.',
                'Multiplexed real-time WebSocket chat and session presence across horizontal Redis pub/sub nodes with zero message drops.',
                'Integrated zero-knowledge biometric gating circuits (zk-SNARKs) verifying identity credentials without raw biometric disclosure.'
            ]
        },
        {
            title: 'Automated FX Execution Engine — MetaTrader 5 Institutional Engine',
            meta: 'MQL5  |  C++ Engine  |  3-EMA Strategy  |  TimescaleDB  |  Sub-millisecond Ticks',
            bullets: [
                'Engineered sub-millisecond algorithmic execution engine in MQL5 and C++ processing high-frequency tick data streams.',
                'Built 3-EMA structural pullback detection combined with dynamic ATR volatility position sizing to enforce strict risk controls.',
                'Deployed stepped trailing stops and automated breakeven lock logic to eliminate downside market slippage on active corridors.',
                'Integrated multi-timeframe RSI momentum validation and automated hardware circuit-breaker kill switch for abnormal spread anomalies.'
            ]
        },
        {
            title: 'KingdomConnect — Scalable Multi-Tenant Collaborative Fabric',
            meta: 'TypeScript  |  Distributed Redis  |  PostgreSQL  |  RBAC Matrix',
            bullets: [
                'Architected collaborative communication platform supporting concurrent multi-tenant community nodes with low-latency delivery.',
                'Designed granular role-based access control (RBAC) matrix isolating sensitive administrative domains and organizational scopes.',
                'Synchronized horizontal message broadcasts across distributed nodes using Redis pub/sub channel clustering.'
            ]
        },
        {
            title: 'Production Deployed Client Platforms (Awsoli, Taila, SaviLinks, Defenzio)',
            meta: 'Cloudflare Edge  |  Go  |  Node.js/TypeScript  |  PostgreSQL  |  Hardened Linux',
            bullets: [
                'Awsoli (awsoli.org): Global Cloudflare edge asset caching, sub-second routing, and responsive client typography with 99.99% uptime.',
                'Taila (taila.app): High-throughput digital product platform with sub-150ms interaction corridors and authenticated API session gateways.',
                'SaviLinks & Defenzio: Built enterprise message dispatch pipelines with DLQ retry logic and hardened Linux defense postures.'
            ]
        }
    ];

    for (const proj of projects) {
        page1.drawText(proj.title, { x: margin, y, size: 9, font: fontBold, color: colorTextPrimary });
        page1.drawText(proj.meta, { x: width - margin - fontOblique.widthOfTextAtSize(proj.meta, 7.5), y, size: 7.5, font: fontOblique, color: colorGoldDark });
        y -= 10;
        for (const b of proj.bullets) {
            page1.drawText('•', { x: margin + 6, y, size: 8, font: fontBold, color: colorGoldDark });
            page1.drawText(b, { x: margin + 16, y, size: 7.8, font: fontRegular, color: colorTextSecondary });
            y -= 10;
        }
        y -= 4;
    }

    // 4. VETTED CREDENTIALS & CERTIFICATIONS
    y = drawSectionHeader(page1, 'Vetted Credentials & Professional Accreditations', y);
    const credentials = [
        {
            name: 'Advanced Software Engineering — Walmart Global Tech (Forage)',
            date: '2024',
            detail: 'Evaluated in Java/Python microservices, relational query optimization, distributed caching, and enterprise CI/CD.'
        },
        {
            name: 'AWS Cloud AI Practitioner — Udacity / AWS (Verified Track)',
            date: '2024',
            detail: 'Evaluated on cloud-native AI pipeline deployment, sub-millisecond inference integration, and AWS security best practices.'
        },
        {
            name: 'Emotional Intelligence & Leadership — University of the People',
            date: '2024',
            detail: 'Accredited coursework in high-performance team leadership, emotional governance, and cross-functional engineering execution.'
        },
        {
            name: 'Turing Vetted Systems & Software Engineer',
            date: 'Top 1% Global',
            detail: 'Vetted across algorithmic depth, concurrent systems design, systems scalability, and production code quality.'
        }
    ];

    for (const cred of credentials) {
        page1.drawText(cred.name, { x: margin, y, size: 8.5, font: fontBold, color: colorTextPrimary });
        page1.drawText(cred.date, { x: width - margin - fontBold.widthOfTextAtSize(cred.date, 8), y, size: 8, font: fontBold, color: colorGoldDark });
        y -= 9.5;
        page1.drawText(cred.detail, { x: margin + 12, y, size: 7.5, font: fontRegular, color: colorTextSecondary });
        y -= 11.5;
    }

    // Footer
    page1.drawLine({
        start: { x: margin, y: margin + 15 },
        end: { x: width - margin, y: margin + 15 },
        thickness: 0.75,
        color: colorLine
    });
    page1.drawText('Ayuba Garba • Systems & Software Engineer • Technical Dossier', {
        x: margin,
        y: margin + 5,
        size: 7,
        font: fontRegular,
        color: colorTextSecondary
    });
    page1.drawText('Verified Executive PDF Artifact • ayuba-garba-portfolio.netlify.app', {
        x: width - margin - 220,
        y: margin + 5,
        size: 7,
        font: fontRegular,
        color: colorGoldDark
    });

    const pdfBytes = await pdfDoc.save();

    // Write to both assets/ and public/assets/
    const targetDirs = [
        path.join(__dirname, '..', 'assets'),
        path.join(__dirname, '..', 'public', 'assets')
    ];

    for (const dir of targetDirs) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, 'Ayuba_Garba_Resume.pdf');
        fs.writeFileSync(filePath, pdfBytes);
        console.log(`✅ Generated: ${filePath} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
    }
}

generateResume().catch(err => {
    console.error('Failed to generate resume PDF:', err);
    process.exit(1);
});
