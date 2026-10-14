/* Lightweight, accessible progressive reveal effects across portfolio pages. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const home = document.body.classList.contains('home-page');
  const targets = [];
  const seen = new Set();
  function add(el, delay = 0, image = false) {
    if (!el || seen.has(el)) return;
    seen.add(el);
    el.classList.add('motion-reveal');
    if (image) el.classList.add('motion-image');
    if (delay) el.style.setProperty('--motion-delay', delay + 'ms');
    targets.push(el);
  }
  if (home) {
    add(document.querySelector('.intro-statement h1'));
    document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => add(el, (i % 2) * 110));
    document.querySelectorAll('.global-experience__copy, .global-experience__map-wrap, .impact-section').forEach(el => add(el));
  } else {
    // Animate section headings, text blocks and media separately so images enter naturally.
    document.querySelectorAll('.case-study-hero h1, .case-study-hero .project-subtitle, .case-study-hero .project-intro, .case-study-section h2, .case-study-section h3, .case-study-section__body, .case-study-section > p, .summary-grid').forEach(el => add(el));
    document.querySelectorAll('.case-study figure, .case-study video, .case-study .hero-visual, .case-study .ds-chart, .case-study .ds-process').forEach(el => {
      // Prevent duplicating nested figure animations.
      if (!el.closest('figure') || el.tagName.toLowerCase() === 'figure') add(el, 0, true);
    });
  }
  if (!targets.length) return;
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -24px 0px', threshold: 0.05 });
  targets.forEach(el => observer.observe(el));
  // Ensure content never stays invisible after tab restore or a stalled observer.
  window.addEventListener('pageshow', e => {
    if (e.persisted) targets.forEach(el => el.classList.add('motion-visible'));
  });
  reduced.addEventListener?.('change', e => {
    if (e.matches) {
      targets.forEach(el => el.classList.add('motion-visible'));
      observer.disconnect();
    }
  });
})();
