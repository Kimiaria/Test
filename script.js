/* ================================================================
   ALCOCK STUDIOS — DESIGNED TECHNOLOGY
   Site interactivity: nav scroll state, mobile menu, scroll
   animations, year stamp, form handling.
================================================================ */

(function () {
    'use strict';

    // ── Dynamic year in footer ──────────────────────────────────
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── Navigation scroll state ─────────────────────────────────
    const nav = document.getElementById('nav');

    function onScroll() {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Mobile menu toggle ──────────────────────────────────────
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    burger.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('open');
        burger.classList.toggle('open', isOpen);
        burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-label', 'Open menu');
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            burger.classList.remove('open');
        }
    });

    // ── Smooth scroll for all anchor links ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 72; // nav height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // ── Reveal on scroll (Intersection Observer) ────────────────
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach(function (el, i) {
            // Stagger children in the same parent grid
            el.style.transitionDelay = (i % 4) * 0.1 + 's';
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ── Quote form: handle submission ───────────────────────────
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async function (e) {
            const action = quoteForm.getAttribute('action');

            // If using Formspree (action contains formspree.io), let it submit normally
            if (action && action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
                // Real Formspree submission — intercept and handle response
                e.preventDefault();
                const data = new FormData(quoteForm);
                try {
                    const res = await fetch(action, {
                        method: 'POST',
                        body: data,
                        headers: { Accept: 'application/json' }
                    });
                    if (res.ok) {
                        quoteForm.style.display = 'none';
                        formSuccess.classList.add('show');
                    } else {
                        alert('Something went wrong. Please try emailing us directly at hello@alcockstudios.com');
                    }
                } catch {
                    alert('Something went wrong. Please try emailing us directly at hello@alcockstudios.com');
                }
                return;
            }

            // Demo / placeholder mode: show success state without actual send
            e.preventDefault();
            quoteForm.style.display = 'none';
            formSuccess.classList.add('show');
        });
    }

})();
