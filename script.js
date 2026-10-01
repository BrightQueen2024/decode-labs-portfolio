/**
 * OFFICE OF AYUBA GARBA — BESPOKE ARCHITECTURAL CLIENT SCRIPTS
 * 3D Glassmorphic Perspective Tilt, Radial Ambient Gold Spotlight,
 * Interactive Certificate Viewer Modal, Navigation Tracking, and Form Handlers
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. INTERACTIVE AMBIENT GOLD CURSOR SPOTLIGHT
    // ========================================================
    const updateAmbientSpotlight = (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', updateAmbientSpotlight, { passive: true });

    // ========================================================
    // 2. DYNAMIC 3D PERSPECTIVE TILT ENGINE ([data-tilt] & .card-3d)
    // ========================================================
    const tiltElements = document.querySelectorAll('.card-3d, [data-tilt]');
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (!isTouchDevice && tiltElements.length > 0) {
        tiltElements.forEach((el) => {
            let isHovered = false;

            el.addEventListener('mouseenter', () => {
                isHovered = true;
                el.style.transition = 'transform 0.08s ease-out';
            });

            el.addEventListener('mousemove', (e) => {
                if (!isHovered) return;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Max tilt angle: 6 degrees for subtle, executive physical feel
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                el.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
                
                // Track specular light spot
                el.style.setProperty('--card-mouse-x', `${x}px`);
                el.style.setProperty('--card-mouse-y', `${y}px`);
            });

            el.addEventListener('mouseleave', () => {
                isHovered = false;
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // ========================================================
    // 3. SLEEK GLASS TOAST NOTIFICATION ENGINE
    // ========================================================
    window.showGlassToast = (message, icon = '✦') => {
        const existingToast = document.querySelector('.glass-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'glass-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = `
            <span class="text-sm font-semibold text-gold-metallic">${icon}</span>
            <span class="tracking-tight text-white">${message}</span>
        `;
        
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    };

    // ========================================================
    // 4. CERTIFICATE MODAL DIALOG ENGINE
    // ========================================================
    const certModalOverlay = document.getElementById('certModalOverlay');
    const certModalContainer = document.getElementById('certModalContainer');
    const certModalClose = document.getElementById('certModalClose');

    // Certificate Records Registry
    const CERTIFICATE_DATA = {
        'walmart': {
            title: 'Advanced Software Engineering (Job Simulation)',
            issuer: 'Walmart Global Tech / Forage',
            date: 'Completed July 27, 2026',
            competencies: [
                'Advanced Data Structures',
                'Software Architecture',
                'Relational Database Design',
                'Data Munging'
            ],
            imageSrc: 'assets/certificates/walmart-advanced-engineering.png',
            enrolmentCode: 'SuwohMZHJQWeglqsk',
            userCode: '6a5b7d77d6ac6ea542da6011',
            verifyUrl: 'https://www.theforage.com/simulations/walmart/advanced-software-engineering',
            notes: 'Practical simulation evaluating relational data modeling, query optimization, high-throughput data munging pipelines, and enterprise architecture.'
        },
        'aws-ai': {
            title: 'AWS AI Practitioner Challenge',
            issuer: 'Udacity & Accenture',
            date: 'Completed May 7, 2026',
            competencies: [
                'Machine Learning Pipelines',
                'Cloud AI Services',
                'AWS Infrastructure',
                'Foundation Model Governance'
            ],
            imageSrc: 'assets/certificates/aws-ai-practitioner.png',
            verifyUrl: 'https://udacity.com/certificate/e/4961dd9a-34ba-11f1-915e-0b6773dac5dc',
            verificationCode: '4961dd9a-34ba-11f1-915e-0b6773dac5dc',
            notes: 'Verified certification validating cloud AI foundations, AWS SageMaker pipeline lifecycle, generative foundation models, and secure cloud ML infrastructure.'
        },
        'uopeople': {
            title: 'Emotional Intelligence in Teamwork',
            issuer: 'University of the People',
            date: 'Completed July 29, 2026',
            competencies: [
                'Strengthening Workplace Relationships',
                'Cross-Functional Teamwork',
                'Engineering Leadership',
                'Collaborative Architecture'
            ],
            imageSrc: 'assets/certificates/uopeople-emotional-intelligence.jpg',
            verificationCode: '466627bb-9e07-4a6e-b4a1-07b85073c5db',
            verifyUrl: null,
            notes: 'University co-curricular event focused on high-performance cross-functional collaboration, team empathy, psychological safety, and consensus-driven systems architecture.'
        }
    };

    let lastFocusedElement = null;

    const openCertificateModal = (certKey) => {
        const cert = CERTIFICATE_DATA[certKey];
        if (!cert || !certModalOverlay) return;

        lastFocusedElement = document.activeElement;

        // Populate modal fields
        const modalImg = document.getElementById('certModalImage');
        const modalTitle = document.getElementById('certModalTitle');
        const modalIssuer = document.getElementById('certModalIssuer');
        const modalDate = document.getElementById('certModalDate');
        const modalCompetencies = document.getElementById('certModalCompetencies');
        const modalVerificationDetails = document.getElementById('certModalVerificationDetails');
        const modalNotes = document.getElementById('certModalNotes');

        if (modalImg) {
            modalImg.src = cert.imageSrc;
            modalImg.alt = `${cert.title} - ${cert.issuer}`;
        }
        if (modalTitle) modalTitle.textContent = cert.title;
        if (modalIssuer) modalIssuer.textContent = cert.issuer;
        if (modalDate) modalDate.textContent = cert.date;
        if (modalNotes) modalNotes.textContent = cert.notes;

        if (modalCompetencies) {
            modalCompetencies.innerHTML = cert.competencies.map(comp => 
                `<span class="text-xs font-mono px-3 py-1 rounded bg-[#12141a] border border-[#d4af37]/30 text-gold-pale flex items-center gap-1.5">
                    <span class="text-gold-light">✦</span> ${comp}
                </span>`
            ).join('');
        }

        if (modalVerificationDetails) {
            let html = '';
            if (cert.enrolmentCode && cert.userCode) {
                html += `
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Verification Codes</div>
                        <div class="flex flex-wrap gap-2 items-center">
                            <span class="text-xs font-mono px-3 py-1.5 rounded bg-[#0a0c10] border border-white/10 text-neutral-300">
                                Enrolment: <strong class="text-gold-light font-bold">${cert.enrolmentCode}</strong>
                            </span>
                            <button class="copy-badge-btn text-[11px] px-2.5 py-1.5 rounded transition-all" onclick="navigator.clipboard.writeText('${cert.enrolmentCode}'); showGlassToast('Enrolment code copied: ${cert.enrolmentCode}', '✓');">
                                Copy Enrolment
                            </button>
                        </div>
                        <div class="flex flex-wrap gap-2 items-center pt-1">
                            <span class="text-xs font-mono px-3 py-1.5 rounded bg-[#0a0c10] border border-white/10 text-neutral-300">
                                User Code: <strong class="text-gold-light font-bold">${cert.userCode}</strong>
                            </span>
                            <button class="copy-badge-btn text-[11px] px-2.5 py-1.5 rounded transition-all" onclick="navigator.clipboard.writeText('${cert.userCode}'); showGlassToast('User code copied: ${cert.userCode}', '✓');">
                                Copy User Code
                            </button>
                        </div>
                    </div>
                `;
            } else if (cert.verificationCode) {
                html += `
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Verification Code / ID</div>
                        <div class="flex flex-wrap gap-2 items-center">
                            <span class="text-xs font-mono px-3 py-1.5 rounded bg-[#0a0c10] border border-white/10 text-neutral-300 break-all">
                                ID: <strong class="text-gold-light font-bold">${cert.verificationCode}</strong>
                            </span>
                            <button class="copy-badge-btn text-[11px] px-2.5 py-1.5 rounded transition-all" onclick="navigator.clipboard.writeText('${cert.verificationCode}'); showGlassToast('Verification ID copied to clipboard', '✓');">
                                Copy Code
                            </button>
                        </div>
                    </div>
                `;
            }

            if (cert.verifyUrl) {
                html += `
                    <div class="pt-3">
                        <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold-secondary text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5">
                            <span>Open Official Verification Gateway</span>
                            <svg class="w-3.5 h-3.5 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>
                `;
            }

            modalVerificationDetails.innerHTML = html;
        }

        // Show modal
        certModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (certModalClose) certModalClose.focus();
    };

    const closeCertificateModal = () => {
        if (!certModalOverlay) return;
        certModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    // Card trigger listeners
    document.querySelectorAll('[data-cert-key]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const certKey = trigger.getAttribute('data-cert-key');
            openCertificateModal(certKey);
        });
    });

    // Close button click
    if (certModalClose) {
        certModalClose.addEventListener('click', closeCertificateModal);
    }

    // Backdrop click dismiss
    if (certModalOverlay) {
        certModalOverlay.addEventListener('click', (e) => {
            if (e.target === certModalOverlay) {
                closeCertificateModal();
            }
        });
    }

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModalOverlay && certModalOverlay.classList.contains('active')) {
            closeCertificateModal();
        }
    });

    // ========================================================
    // 5. STICKY NAVBAR MORPH ON SCROLL
    // ========================================================
    const floatingNavbar = document.getElementById('floating-navbar');
    window.addEventListener('scroll', () => {
        if (!floatingNavbar) return;
        if (window.scrollY > 40) {
            floatingNavbar.classList.add('glass-nav-scrolled');
        } else {
            floatingNavbar.classList.remove('glass-nav-scrolled');
        }
    }, { passive: true });

    // ========================================================
    // 6. MOBILE NAVIGATION MENU TOGGLE
    // ========================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenuOverlay) {
        const toggleMobileMenu = () => {
            const isOpen = !mobileMenuOverlay.classList.contains('hidden');
            if (isOpen) {
                mobileMenuOverlay.classList.add('hidden');
                document.body.style.overflow = '';
                mobileMenuBtn.innerHTML = `
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                `;
            } else {
                mobileMenuOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                mobileMenuBtn.innerHTML = `
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                `;
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('hidden');
                document.body.style.overflow = '';
                mobileMenuBtn.innerHTML = `
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                `;
            });
        });
    }

    // ========================================================
    // 7. ACTIVE SECTION HIGHLIGHTING IN FLOATING NAVBAR
    // ========================================================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-link-item');

    const updateActiveNav = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                anchor.classList.add('text-gold-light', 'border-b-2', 'border-[#d4af37]');
                anchor.classList.remove('text-neutral-400');
            } else {
                anchor.classList.remove('text-gold-light', 'border-b-2', 'border-[#d4af37]');
                anchor.classList.add('text-neutral-400');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ========================================================
    // 8. EXECUTIVE TERMINAL & RFP INQUIRY FORM HANDLER
    // ========================================================
    const inquiryForm = document.getElementById('advisoryInquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Transmit Strategic Brief';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0a0b0e] inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Dispatching Payload...
                `;
            }

            const name = (document.getElementById('rfp-name')?.value || '').trim();
            const email = (document.getElementById('rfp-email')?.value || '').trim();
            const role = (document.getElementById('rfp-scope')?.value || '').trim();
            const message = (document.getElementById('rfp-message')?.value || '').trim();

            const fullDetails = `${role ? '[' + role + '] ' : ''}${message}`;

            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        role: fullDetails || 'Lead Architecture Consultation'
                    })
                });

                if (response.ok) {
                    showGlassToast('Architecture brief dispatched to Ayuba Garba.', '✦');
                    inquiryForm.reset();
                } else {
                    // Graceful fallback for static deployments
                    showGlassToast('Inquiry captured. Email routing fallback initiated.', '✓');
                    window.location.href = `mailto:ayubagarba.tech@gmail.com?subject=Architecture Brief from ${encodeURIComponent(name)}&body=${encodeURIComponent(fullDetails)}`;
                }
            } catch (err) {
                // Network or offline fallback
                showGlassToast('Direct inbox routing opened.', '✓');
                window.location.href = `mailto:ayubagarba.tech@gmail.com?subject=Architecture Brief from ${encodeURIComponent(name)}&body=${encodeURIComponent(fullDetails)}`;
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    }

    // ========================================================
    // 9. SMOOTH SCROLL FOR ANCHOR CTAS WITH OFFSET
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 95; // Account for floating frosted navbar
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================================
    // 10. DYNAMIC WAT LOCAL TIME IN FOOTER
    // ========================================================
    const localTimeEl = document.getElementById('office-local-time');
    if (localTimeEl) {
        const updateLocalTime = () => {
            const options = { 
                timeZone: 'Africa/Lagos', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
            };
            const formatter = new Intl.DateTimeFormat([], options);
            localTimeEl.textContent = `${formatter.format(new Date())} WAT`;
        };
        updateLocalTime();
        setInterval(updateLocalTime, 1000);
    }

    // ========================================================
    // 11. CALENDLY AUTO-RESET & POSTMESSAGE LISTENER
    // ========================================================
    window.resetCalendlyWidget = function() {
        const container = document.querySelector('.calendly-inline-widget');
        if (!container) return;

        const currentUrl = container.getAttribute('data-url');
        
        // Clear the container content
        container.innerHTML = '';
        
        // Re-initialize the widget cleanly using Calendly's global API
        if (window.Calendly) {
            window.Calendly.initInlineWidget({
                url: currentUrl,
                parentElement: container
            });
        } else {
            // Fallback: Re-inject iframe if API isn't globally exposed
            const iframe = document.createElement('iframe');
            iframe.src = currentUrl;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            container.appendChild(iframe);
        }

        if (typeof window.showGlassToast === 'function') {
            window.showGlassToast('Consultation scheduler reset to calendar view.', '✦');
        }
    };

    // Listen for Calendly completion events across window boundaries
    window.addEventListener('message', function(e) {
        if (e.data && e.data.event === 'calendly.event_scheduled') {
            console.log('Calendly booking confirmed. Scheduling widget auto-reset...');
            if (typeof window.showGlassToast === 'function') {
                window.showGlassToast('Booking confirmed! Resetting calendar in 8s...', '✓');
            }
            
            // Automatically reset back to the calendar after 8 seconds of showing confirmation
            setTimeout(() => {
                window.resetCalendlyWidget();
            }, 8000);
        }
    });

    // ========================================================
    // 12. HIGH-RESOLUTION PORTRAIT LIGHTBOX MODAL
    // ========================================================
    const portraitModal = document.getElementById('portraitModal');

    window.openPortraitModal = function(e) {
        if (e) {
            if (typeof e.preventDefault === 'function') e.preventDefault();
            if (typeof e.stopPropagation === 'function') e.stopPropagation();
        }
        const modal = document.getElementById('portraitModal');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closePortraitModal = function(e) {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        const modal = document.getElementById('portraitModal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    if (portraitModal) {
        portraitModal.addEventListener('click', (e) => {
            if (e.target === portraitModal) {
                window.closePortraitModal();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('portraitModal');
            if (modal && !modal.classList.contains('hidden')) {
                window.closePortraitModal();
            }
        }
    });

    document.querySelectorAll('.portrait-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            window.openPortraitModal(e);
        });
    });
});