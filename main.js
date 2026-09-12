/* ─── main.js — Ozkan Bulut Portfolio ─── */

/* Year */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ═══════════════════════════════════
   REVEAL ON SCROLL (Intersection Observer)
═══════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 60;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.max(0, delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════
   NAV — SCROLL EFFECT
═══════════════════════════════════ */
const header = document.getElementById('site-header');

const handleScroll = () => {
  if (window.scrollY > 60) {
    header.style.top = '8px';
  } else {
    header.style.top = '16px';
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });

/* ═══════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  navLinks.classList.toggle('open', isOpen);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }
});

/* ═══════════════════════════════════
   ACTIVE NAV LINK (Scroll spy)
═══════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
      });
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'var(--fg)';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => spyObserver.observe(s));

/* ═══════════════════════════════════
   SMOOTH SCROLL (fallback for older browsers)
═══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════
   MICRO-SHEEN: button hover effect
═══════════════════════════════════ */
document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .service-card, .contact-card').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  });
});

/* ═══════════════════════════════════
   FAB — HIDE when footer visible
═══════════════════════════════════ */
const fab = document.getElementById('fab-wa');
const footer = document.querySelector('.site-footer');

if (fab && footer) {
  const fabObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      fab.style.opacity = entry.isIntersecting ? '0' : '1';
      fab.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    });
  }, { threshold: 0.1 });
  fabObserver.observe(footer);
}

/* ═══════════════════════════════════
   GALLERY — lightbox-style scale on click (mobile)
═══════════════════════════════════ */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.style.cursor = 'zoom-in';
});
