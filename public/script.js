/**
 * OFFICE OF AYUBA GARBA — BESPOKE ARCHITECTURAL CLIENT SCRIPTS
 * 3D Glassmorphic Perspective Tilt, Radial Ambient Gold Spotlight,
 * Active Nav Tracking, Terminal Inquiry Handler & Real-Time Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive Ambient Gold Cursor Spotlight
    const updateAmbientSpotlight = (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', updateAmbientSpotlight, { passive: true });

    // 2. Dynamic 3D Card Tilt Engine with Specular Shimmer
    const cards3D = document.querySelectorAll('.card-3d');
    
    // Check if device supports hover / mouse pointing
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (!isTouchDevice && cards3D.length > 0) {
        cards3D.forEach((card) => {
            let isHovered = false;

            card.addEventListener('mouseenter', () => {
                isHovered = true;
                card.style.transition = 'transform 0.08s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                if (!isHovered) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Max tilt angle: 6 degrees for subtle, executive physical feel
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
                
                // Track specular light spot
                card.style.setProperty('--card-mouse-x', `${x}px`);
                card.style.setProperty('--card-mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // 3. Sleek Toast Notification Engine
    window.showGlassToast = (message, icon = '✦') => {
        const existingToast = document.querySelector('.glass-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'glass-toast';
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

    // 4. Sticky Navbar Glass Morph on Scroll
    const floatingNavbar = document.getElementById('floating-navbar');
    window.addEventListener('scroll', () => {
        if (!floatingNavbar) return;
        if (window.scrollY > 40) {
            floatingNavbar.classList.add('glass-nav-scrolled');
        } else {
            floatingNavbar.classList.remove('glass-nav-scrolled');
        }
    }, { passive: true });

    // 5. Mobile Navigation Menu Toggle
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
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                `;
            } else {
                mobileMenuOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                `;
            });
        });
    }

    // 6. Active Section Highlighting in Floating Navbar
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

    // 7. Executive Terminal & RFP Inquiry Form Handler
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

    // 8. Smooth Scroll for Anchor CTAs with Offset
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

    // 9. Dynamic WAT Local Time in Footer
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
});