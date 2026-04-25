function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .competency-item, .experience-card, .tech-item').forEach(el => {
    observer.observe(el);
  });
}

function updateAriaPressed(isLight) {
  themeToggle.setAttribute('aria-pressed', isLight.toString());
}

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme, false);
}

function setTheme(theme, shouldUpdateAria = true) {
  if (theme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
    if (shouldUpdateAria) updateAriaPressed(true);
  } else {
    htmlElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
    if (shouldUpdateAria) updateAriaPressed(false);
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

initializeTheme();
observeAnimations();

function initHero() {
  const hero = document.querySelector('.hero');
  const container = document.getElementById('heroFragments');
  if (!hero || !container) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

  const words = [
    '学AI', '副业', '减肥', '做自媒体', '考证', '整理作品集', '做个人博客', '学剪辑',
    '健身', '读书', '学英语', '做PPT', '写SOP', '搭知识库', '学Agent', '开源',
    'Notion', 'Obsidian', '飞书', '复盘'
  ];

  const count = isMobile ? 10 : 18;
  const picked = [];
  for (let i = 0; i < count; i++) picked.push(words[i % words.length]);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function layout() {
    const rect = hero.getBoundingClientRect();
    const maxR = Math.min(rect.width, rect.height) * (isMobile ? 0.35 : 0.42);
    const innerR = maxR * 0.55;
    const startR = Math.min(rect.width, rect.height) * (isMobile ? 0.75 : 0.9);
    const centerY = isMobile ? 40 : 10;

    container.innerHTML = '';

    picked.forEach((text, i) => {
      const el = document.createElement('span');
      el.className = 'hero-fragment';
      el.textContent = text;

      const a0 = (i / picked.length) * Math.PI * 2 + rand(-0.18, 0.18);
      const r0 = startR + rand(-40, 40);
      const x0 = Math.cos(a0) * r0;
      const y0 = Math.sin(a0) * r0 + centerY;

      const ring = i % 2 === 0 ? innerR : maxR;
      const a1 = (i / picked.length) * Math.PI * 2 + rand(-0.12, 0.12);
      const r1 = ring + rand(-18, 18);
      const x1 = Math.cos(a1) * r1;
      const y1 = Math.sin(a1) * r1 + centerY;

      el.style.setProperty('--x', x0.toFixed(1));
      el.style.setProperty('--y', y0.toFixed(1));
      el.style.setProperty('--tx', x1.toFixed(1));
      el.style.setProperty('--ty', y1.toFixed(1));
      el.style.setProperty('--s', rand(0.92, 1.06).toFixed(2));
      el.style.setProperty('--o', rand(0.38, 0.62).toFixed(2));
      el.style.setProperty('--to', isMobile ? rand(0.10, 0.18).toFixed(2) : rand(0.18, 0.28).toFixed(2));
      el.style.setProperty('--d', (i * 26).toFixed(0));
      el.style.setProperty('--fd', rand(0, 1800).toFixed(0));

      container.appendChild(el);
    });
  }

  layout();

  if (prefersReducedMotion) {
    hero.classList.add('is-ready');
    hero.classList.add('is-assembled');
    return;
  }

  requestAnimationFrame(() => {
    hero.classList.add('is-ready');
    window.setTimeout(() => {
      hero.classList.add('is-assembled');
    }, 520);
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      layout();
      hero.classList.add('is-ready');
      hero.classList.add('is-assembled');
    }, 120);
  });
}

initHero();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
