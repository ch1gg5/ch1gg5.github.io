// ================================================================
//  Blueprint: nav, scroll effects, schematic draw-on
// ================================================================

(function () {
  'use strict';

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Mobile nav toggle ----------
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Scroll fade-in ----------
  function initScrollAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    if (reduceMotion()) {
      fadeEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  // ---------- Same-page smooth scroll ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---------- Skill dimension-meter fill ----------
  function initSkillBars() {
    const bars = document.querySelectorAll('.lang-bar-fill');
    if (!bars.length) return;

    if (reduceMotion()) {
      bars.forEach(bar => { bar.style.width = (bar.dataset.width || 0) + '%'; });
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            setTimeout(() => { bar.style.width = (bar.dataset.width || 0) + '%'; }, 150);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(bar => observer.observe(bar));
  }

  // ---------- Hero schematic draw-on ----------
  function initSchematicDrawOn() {
    const lines = document.querySelectorAll('.schematic-diagram .draw-line');
    if (!lines.length) return;

    if (reduceMotion()) return; // leave fully drawn (no dasharray applied)

    lines.forEach(path => {
      const len = path.getTotalLength();
      path.style.setProperty('--len', len);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => path.classList.add('drawn'));
      });
    });
  }

  function init() {
    initMobileNav();
    initScrollAnimations();
    initSmoothScroll();
    initSkillBars();
    initSchematicDrawOn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
