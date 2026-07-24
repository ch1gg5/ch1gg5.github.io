// ================================================================
//  DC_DEV Portfolio — Terminal Animation, Nav, Scroll Effects
// ================================================================

(function () {
  'use strict';

  // ---------- Terminal Typing Animation ----------
  async function initTerminal() {
    const body = document.getElementById('terminal-body');
    if (!body) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if CV exists
    let cvExists = false;
    try {
      const res = await fetch('Daniel_Chigbu_CV.pdf', { method: 'HEAD', cache: 'no-store' });
      cvExists = res.ok;
    } catch (e) {
      cvExists = false;
    }

    // Update CV link if not available
    const cvLink = document.getElementById('cv-link');
    if (!cvExists && cvLink) {
      cvLink.setAttribute('aria-disabled', 'true');
      cvLink.href = '#';
      cvLink.textContent = 'Resume coming soon';
    }

    const lines = [
      { text: '> whoami', cls: 'plain' },
      { text: '', cls: '' },
      { text: '  Full-stack Developer & CS Student.', cls: 'accent' },
      { text: '  Building things that scale.', cls: 'accent' },
      { text: '', cls: '' },
      { text: '> ./fetch_skills.sh', cls: 'plain' },
      { text: '', cls: '' },
      { text: '  [✓] Java | Spring Boot | Spring Security', cls: 'check' },
      { text: '  [✓] Python | FastAPI | SQLAlchemy', cls: 'check' },
      { text: '  [✓] React | TypeScript | Gemini API', cls: 'check' },
      { text: '  [✓] PostgreSQL | Docker | Kafka', cls: 'check' },
      { text: '', cls: '' },
      cvExists
        ? { text: '  System status: Optimal.', cls: 'dim' }
        : { text: '  System status: Online.', cls: 'dim' },
    ];

    if (reduceMotion) {
      // Show everything instantly
      body.innerHTML = lines
        .map(l => `<span class="${l.cls}">${l.text}</span>`)
        .join('\n');
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      body.appendChild(document.createTextNode('\n  > '));
      body.appendChild(cursor);
      return;
    }

    // Typed animation, line by line
    for (const line of lines) {
      if (line.text === '') {
        body.innerHTML += '\n';
        continue;
      }
      await typeLine(body, line.text, line.cls);
      body.innerHTML += '\n';
    }

    // Blinking cursor at the end
    const promptSpan = document.createTextNode('\n  > ');
    body.appendChild(promptSpan);
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    body.appendChild(cursor);
  }

  function typeLine(el, text, cls) {
    return new Promise(resolve => {
      const span = document.createElement('span');
      span.className = cls;
      el.appendChild(span);
      let i = 0;
      const speed = 16;
      const tick = () => {
        span.textContent += text[i];
        i++;
        if (i < text.length) {
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  // ---------- Mobile Nav Toggle ----------
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Active Nav Highlighting (Intersection Observer) ----------
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('data-section') === id);
            });
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  // ---------- Scroll Fade-In Animations ----------
  function initScrollAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  // ---------- Skill Bar Animations ----------
  function initSkillBars() {
    const bars = document.querySelectorAll(
      '.lang-bar-fill, .profile-metric-bar-fill, .metric-bar-fill'
    );
    if (!bars.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bars.forEach(bar => {
        bar.style.width = (bar.dataset.width || 0) + '%';
      });
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.dataset.width || 0;
            setTimeout(() => {
              bar.style.width = width + '%';
            }, 200);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(bar => observer.observe(bar));
  }

  // ---------- Metric Counter Animation ----------
  function initMetricCounters() {
    const values = document.querySelectorAll('.metric-value[data-target]');
    if (!values.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    values.forEach(v => observer.observe(v));
  }

  function animateCounter(el, target, suffix) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = target + suffix;
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + (progress >= 1 ? suffix : '');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // ---------- Smooth scroll for anchor links ----------
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

  // ---------- Init Everything ----------
  function init() {
    initTerminal();
    initMobileNav();
    initActiveNav();
    initScrollAnimations();
    initSkillBars();
    initMetricCounters();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
