/* ==========================================================================
   Aletheia — Main JS
   Handles: nav scroll, mobile menu, scroll reveals, hero parallax,
            floating chip drift, waitlist forms, cookie consent, cursor halo
   ========================================================================== */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     Lucide icons
  -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (window.lucide) {
      lucide.createIcons();
    }

    initNav();
    initScrollReveal();
    initHeroParallax();
    initWaitlistForms();
    initCookieBanner();
    initCursorHalo();
    initTOC();
  });

  /* --------------------------------------------------------------------------
     NAV — sticky scroll class + mobile hamburger
  -------------------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Scroll class
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile hamburger
    const hamburger = nav.querySelector('.nav-hamburger');
    const overlay   = nav.querySelector('.nav-mobile-overlay') || document.querySelector('.nav-mobile-overlay');
    if (!hamburger || !overlay) return;

    const toggleMenu = (open) => {
      hamburger.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      overlay.style.display = open ? 'flex' : '';
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      toggleMenu(!isOpen);
    });

    // Close on overlay nav link click
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        toggleMenu(false);
        hamburger.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (prefersReduced) {
      revealEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     HERO PARALLAX — mouse position → phone + chip movement
  -------------------------------------------------------------------------- */
  function initHeroParallax() {
    if (prefersReduced) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const phoneWraps = hero.querySelectorAll('.phone-wrap[data-parallax]');
    const chipWraps  = hero.querySelectorAll('.chip-wrap[data-parallax]');

    let raf;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width  / 2) / rect.width;
      targetY = (e.clientY - rect.top  - rect.height / 2) / rect.height;

      if (!raf) {
        raf = requestAnimationFrame(updateParallax);
      }
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(updateParallax);
    });

    function updateParallax() {
      raf = null;
      // Smooth lerp
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08;

      phoneWraps.forEach(el => {
        const factor = parseFloat(el.dataset.parallax) || 0;
        const tx = currentX * factor * 60;
        const ty = currentY * factor * 30;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      chipWraps.forEach(el => {
        const factor = parseFloat(el.dataset.parallax) || 0;
        const tx = currentX * factor * 120;
        const ty = currentY * factor * 40;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        raf = requestAnimationFrame(updateParallax);
      }
    }
  }

  /* --------------------------------------------------------------------------
     WAITLIST FORMS
  -------------------------------------------------------------------------- */
  function initWaitlistForms() {
    document.querySelectorAll('form[data-waitlist]').forEach(form => {
      form.addEventListener('submit', handleWaitlistSubmit);
    });
  }

  async function handleWaitlistSubmit(e) {
    e.preventDefault();

    const form       = e.currentTarget;
    const emailInput = form.querySelector('[type="email"]');
    const cityInput  = form.querySelector('[name="city"]');
    const submitBtn  = form.querySelector('[type="submit"]');
    const successEl  = form.querySelector('.waitlist-success');

    if (!emailInput || !submitBtn) return;

    const email = emailInput.value.trim();
    const city  = cityInput ? cityInput.value.trim() : '';

    // Basic client-side validation
    if (!email.includes('@')) {
      emailInput.focus();
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Stub endpoint — logs to console, returns success
      console.log('[Aletheia Waitlist]', { email, city });

      // Simulate network
      await new Promise(resolve => setTimeout(resolve, 600));

      // Success state
      const inputGroup = form.querySelector('.waitlist-input-group');
      if (inputGroup) inputGroup.style.display = 'none';
      if (successEl) successEl.classList.add('visible');

      // Re-init lucide icons inside success
      if (window.lucide) lucide.createIcons();

    } catch {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  /* --------------------------------------------------------------------------
     COOKIE CONSENT BANNER
  -------------------------------------------------------------------------- */
  function initCookieBanner() {
    const banner  = document.getElementById('cookie-banner');
    if (!banner) return;

    const STORAGE_KEY = 'aletheia_cookie_consent';
    const consent = localStorage.getItem(STORAGE_KEY);

    if (consent) {
      banner.hidden = true;
      if (consent === 'accepted') loadAnalytics();
      return;
    }

    banner.hidden = false;

    banner.querySelector('.cookie-accept').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      banner.hidden = true;
      loadAnalytics();
    });

    banner.querySelector('.cookie-decline').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'declined');
      banner.hidden = true;
    });
  }

  function loadAnalytics() {
    // Stub Plausible — swap domain when live
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = 'aletheia.app';
    script.src = 'https://plausible.io/js/plausible.js';
    document.head.appendChild(script);
  }

  /* --------------------------------------------------------------------------
     CURSOR HALO (desktop only)
  -------------------------------------------------------------------------- */
  function initCursorHalo() {
    if (prefersReduced) return;

    const halo = document.querySelector('.cursor-halo');
    if (!halo) return;

    let cx = -300, cy = -300;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      halo.style.left = cx + 'px';
      halo.style.top  = cy + 'px';
    });

    document.addEventListener('mouseleave', () => {
      halo.style.left = '-300px';
      halo.style.top  = '-300px';
    });
  }

  /* --------------------------------------------------------------------------
     TRUST PAGE — sticky TOC active state
  -------------------------------------------------------------------------- */
  function initTOC() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const tocLinks = toc.querySelectorAll('.toc-link[href^="#"]');
    if (!tocLinks.length) return;

    const sections = Array.from(tocLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id   = '#' + entry.target.id;
        const link = toc.querySelector(`.toc-link[href="${id}"]`);
        if (!link) return;
        link.classList.toggle('active', entry.isIntersecting);
      });
    }, {
      rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72px'} 0px -60% 0px`,
      threshold: 0
    });

    sections.forEach(s => observer.observe(s));
  }

  /* --------------------------------------------------------------------------
     SMOOTH hash navigation (for TOC links)
  -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 24;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

})();
