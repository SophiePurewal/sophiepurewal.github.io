(() => {
  const darkModeStorageKey = 'sophie-theme';

  const caseStudyIntroConfigs = {
    'chartstudio-page': {
      eyebrow: 'Product design and interactive prototype',
      summary: 'A self-initiated Figma plugin concept that helps product designers create consistent, accessible charts without rebuilding them manually. I designed the workflow, interface, responsive presets and accessibility rules, then directed the AI-assisted prototype implementation.',
      boxes: [
        ['Role', 'Product design, UX and UI'],
        ['Focus', 'Accessible data visualisation'],
        ['Format', 'Interactive Figma plugin prototype'],
      ],
      hideHeroVisual: true,
    },
    'antelope-page': {
      eyebrow: 'Fintech product design case study',
      summary: 'A self-initiated fintech onboarding concept exploring how a personal-finance product can build trust from the first interaction through goal-led onboarding, plain-language permissions and a calm first money snapshot.',
      boxes: [
        ['Role', 'Product design, UX and UI'],
        ['Focus', 'Trust-led wealth onboarding'],
        ['Format', 'Interactive mobile prototype'],
      ],
    },
    'dude-page': {
      eyebrow: 'Mobile product design case study',
      summary: 'A mobile-first bike-hire concept that helps people find nearby bikes, understand availability and move from reservation to ride with minimal friction, supported by a reusable visual language and documented design system.',
      boxes: [
        ['Role', 'Product design, UX and UI'],
        ['Focus', 'Mobile bike hire and design systems'],
        ['Format', 'Interactive prototype and design system'],
      ],
    },
  };

  const getStoredMode = () => {
    try {
      return window.localStorage.getItem(darkModeStorageKey);
    } catch (error) {
      return null;
    }
  };

  if (getStoredMode() === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }

  const setStoredMode = (mode) => {
    try {
      window.localStorage.setItem(darkModeStorageKey, mode);
    } catch (error) {
      // Keep the current in-page theme if storage is unavailable.
    }
  };

  const getCaseStudyIntroConfig = () => {
    return Object.entries(caseStudyIntroConfigs).find(([className]) => {
      return document.body.classList.contains(className);
    })?.[1] || null;
  };

  const loadCaseStudyIntroStyles = () => {
    if (document.querySelector('link[data-case-study-hero-summary]')) return;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '../assets/css/case-study-hero-summary.css';
    stylesheet.dataset.caseStudyHeroSummary = '';
    document.head.append(stylesheet);
  };

  const initCaseStudyIntro = () => {
    const config = getCaseStudyIntroConfig();
    if (!config) return;

    const hero = document.querySelector('.case-study-hero');
    const copy = hero?.querySelector('.case-study-hero__copy');
    if (!hero || !copy || copy.querySelector('.portfolio-hero-summary')) return;

    loadCaseStudyIntroStyles();

    hero.classList.add('portfolio-summary-hero');
    copy.classList.add('case-study-hero__copy--wide');

    const kicker = copy.querySelector('.project-kicker');
    const subtitle = copy.querySelector('.project-subtitle');
    const heroVisual = hero.querySelector('.hero-visual');

    if (kicker) kicker.textContent = config.eyebrow;
    if (subtitle) subtitle.textContent = config.summary;

    copy.querySelectorAll('.project-intro').forEach((paragraph) => paragraph.remove());

    if (config.hideHeroVisual && heroVisual) {
      heroVisual.hidden = true;
    }

    const summary = document.createElement('dl');
    summary.className = 'portfolio-hero-summary';
    summary.setAttribute('aria-label', 'Project summary');

    config.boxes.forEach(([label, value]) => {
      const item = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');

      term.textContent = label;
      description.textContent = value;
      item.append(term, description);
      summary.append(item);
    });

    copy.append(summary);
  };

  const initSiteHeader = () => {
    initCaseStudyIntro();

    const siteHeader = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('#dropdown-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const siteTitleHomeLink = document.querySelector('.site-title__home-link');
    const dropdownInactivityDelayMs = 5000;
    let dropdownInactivityTimer = null;

    const syncHeaderMenuState = () => {
      if (!siteHeader || !dropdownMenu) return;
      siteHeader.classList.toggle('menu-open', dropdownMenu.classList.contains('open'));
    };

    const toggleHeaderState = () => {
      if (!siteHeader) return;
      siteHeader.classList.toggle('scrolled', window.scrollY > 24);
      syncHeaderMenuState();
    };

    const closeDropdownMenu = () => {
      if (!dropdownMenu || !menuToggle) return;
      dropdownMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      syncHeaderMenuState();
      if (dropdownInactivityTimer) {
        clearTimeout(dropdownInactivityTimer);
        dropdownInactivityTimer = null;
      }
    };

    const resetDropdownInactivityTimer = () => {
      if (!dropdownMenu || !dropdownMenu.classList.contains('open')) return;
      if (dropdownInactivityTimer) clearTimeout(dropdownInactivityTimer);
      dropdownInactivityTimer = window.setTimeout(closeDropdownMenu, dropdownInactivityDelayMs);
    };

    const syncThemeToggleLabel = (isDarkMode) => {
      if (!themeToggle) return;
      themeToggle.setAttribute('aria-pressed', String(isDarkMode));
      themeToggle.setAttribute('aria-label', isDarkMode ? 'Deactivate dark mode' : 'Activate dark mode');
      themeToggle.title = isDarkMode ? 'Deactivate dark mode' : 'Activate dark mode';
    };

    const applyTheme = (mode) => {
      const isDarkMode = mode === 'dark';
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      document.body.classList.toggle('dark-mode', isDarkMode);
      syncThemeToggleLabel(isDarkMode);
    };

    applyTheme(getStoredMode() === 'dark' ? 'dark' : 'light');

    if (siteTitleHomeLink) {
      siteTitleHomeLink.addEventListener('click', (event) => {
        const targetUrl = new URL(siteTitleHomeLink.href, window.location.href);

        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
        const targetPath = targetUrl.pathname.replace(/\/index\.html$/, '/');

        const isCurrentHomepage = currentPath === targetPath && document.body.classList.contains('home-page');

        if (!isCurrentHomepage) {
          return;
        }

        event.preventDefault();

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.history.replaceState(null, '', targetUrl.pathname);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      });
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const nextMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextMode);
        setStoredMode(nextMode);
      });
    }

    if (menuToggle && dropdownMenu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = dropdownMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        syncHeaderMenuState();
        if (isOpen) resetDropdownInactivityTimer();
        else if (dropdownInactivityTimer) {
          clearTimeout(dropdownInactivityTimer);
          dropdownInactivityTimer = null;
        }
      });

      dropdownMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeDropdownMenu);
      });

      ['pointermove', 'click', 'keydown', 'focusin', 'touchstart'].forEach((eventName) => {
        dropdownMenu.addEventListener(eventName, resetDropdownInactivityTimer, { passive: eventName !== 'keydown' });
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeDropdownMenu();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dropdownMenu.classList.contains('open')) {
          closeDropdownMenu();
          menuToggle.focus();
        }
      });

      document.addEventListener('pointerdown', (event) => {
        if (!dropdownMenu.classList.contains('open')) return;
        if (!dropdownMenu.contains(event.target) && !menuToggle.contains(event.target)) closeDropdownMenu();
      });

      window.addEventListener('scroll', () => {
        if (dropdownMenu.classList.contains('open')) closeDropdownMenu();
      }, { passive: true });
    }

    window.addEventListener('scroll', toggleHeaderState, { passive: true });
    toggleHeaderState();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteHeader);
  } else {
    initSiteHeader();
  }
})();