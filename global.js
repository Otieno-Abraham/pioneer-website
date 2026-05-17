/* =====================================================
   global.js — Shared behaviour, Pioneer Outsourcing BPO
   ===================================================== */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---- Scroll progress bar ---- */
        var bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.prepend(bar);

        /* ---- Navbar scroll shrink ---- */
        var navbar = document.querySelector('.navbar');

        function onScroll() {
            var scrolled = window.scrollY;
            /* Progress bar */
            var total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
            /* Navbar */
            if (navbar) {
                navbar.classList.toggle('scrolled', scrolled > 60);
            }
            /* Back-to-top visibility */
            if (btt) {
                btt.classList.toggle('visible', scrolled > 400);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        /* ---- Mobile menu toggle ---- */
        var mobileBtn = document.getElementById('mobileMenuBtn');
        var navLinks  = document.getElementById('navLinks');

        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', function () {
                var open = navLinks.classList.toggle('active');
                var icon = mobileBtn.querySelector('i');
                if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
            });
            /* Close on outside click */
            document.addEventListener('click', function (e) {
                if (navbar && !navbar.contains(e.target)) {
                    navLinks.classList.remove('active');
                    var icon = mobileBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            });
        }

        /* ---- Back-to-top button ---- */
        var btt = document.createElement('button');
        btt.className = 'back-to-top';
        btt.setAttribute('aria-label', 'Back to top');
        btt.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btt.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btt);

        /* ---- WhatsApp floating button ---- */
        var wa = document.createElement('a');
        wa.href = 'https://wa.me/254793008677?text=Hello%20Pioneer%20Outsourcing%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.';
        wa.target  = '_blank';
        wa.rel     = 'noopener noreferrer';
        wa.className = 'wa-float';
        wa.setAttribute('aria-label', 'Chat on WhatsApp');
        wa.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(wa);

        /* ---- Scroll reveal ---- */
        var revealTargets = document.querySelectorAll(
            '.service-card, .benefit-card, .testimonial-card, ' +
            '.value-card, .mission-card, .why-item, .why-card, ' +
            '.stat-item, .stat-card, .section-header'
        );

        if ('IntersectionObserver' in window) {
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry, i) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            entry.target.classList.add('revealed');
                        }, (i % 4) * 90);
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            revealTargets.forEach(function (el) {
                el.classList.add('reveal');
                revealObserver.observe(el);
            });
        }

        /* ---- "Get a Quote" CTA nav button — smart scroll / redirect ---- */
        var ctaNav = document.getElementById('ctaNavBtn');
        if (ctaNav) {
            ctaNav.addEventListener('click', function (e) {
                var contactEl = document.getElementById('contact-form') ||
                                document.getElementById('contact');
                if (contactEl) {
                    e.preventDefault();
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                    e.preventDefault();
                    window.location.href = 'index.html#contact-form';
                }
            });
        }

    }); // DOMContentLoaded
}());
