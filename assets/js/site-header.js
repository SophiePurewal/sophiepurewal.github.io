(() => {
  const darkModeStorageKey = 'sophie-theme';

  const caseStudyIntroConfigs = {
    'chartstudio-page': {
      eyebrow: 'Product design and interactive prototype',
      summary: 'A working Figma plugin prototype that helps designers create and insert consistent, accessible charts through a guided workflow. I conceived the product, designed its interaction model and interface, defined the chart-system and accessibility rules, and directed its AI-assisted development.',
      boxes: [
        ['Role', 'Product design, UX/UI and prototype direction'],
        ['Users', 'Product and UI designers'],
        ['Product', 'Working Figma plugin prototype'],
      ],
      hideHeroVisual: false,
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
      summary: 'Helping tourists discover, compare and book bikes from trusted local providers in unfamiliar cities.',
      boxes: [
        ['Role', 'Product design, UX and UI'],
        ['Audience', 'Tourists and occasional riders'],
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
    stylesheet.href = '../assets/css/case-study-hero-summary.css?v=20260805-chartstudio-layout-2';
    stylesheet.dataset.caseStudyHeroSummary = '';
    document.head.append(stylesheet);
  };

  const loadCaseStudyDarkModeStyles = () => {
    if (!document.body.matches('.antelope-page, .dude-page')) return;
    if (document.querySelector('style[data-case-study-dark-mode-overrides]')) return;

    const style = document.createElement('style');
    style.dataset.caseStudyDarkModeOverrides = '';
    style.textContent = `
      body.dark-mode:is(.antelope-page, .dude-page) .project-context .back-link:hover,
      body.dark-mode:is(.antelope-page, .dude-page) .project-context .back-link:focus-visible {
        color: #FFFFFF;
        text-decoration-color: #FFFFFF;
      }

      body.dark-mode:is(.antelope-page, .dude-page) .approach-list li::before {
        background: #FFFFFF;
      }

      body.dark-mode:is(.antelope-page, .dude-page) .case-study li::marker {
        color: #FFFFFF;
      }
    `;
    document.head.append(style);
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

  const initHomepageImpact = () => {
    if (!document.body.classList.contains('home-page')) return;

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      heroTitle.innerHTML = 'Senior Product Designer.<br>Design Systems &amp; AI Prototyping';
    }

    document.title = 'Sophie Purewal — Senior Product Designer, Design Systems & AI Prototyping';
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    if (openGraphTitle) {
      openGraphTitle.content = 'Sophie Purewal — Senior Product Designer, Design Systems & AI Prototyping';
    }

    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) {
      heroIntro.textContent = 'I design accessible digital products and scalable design systems for complex, regulated services. My recent work includes reusable components supporting 21,000+ Figma-tracked insertions across header, status, feedback, layout and form patterns over 12 months.';
    }

    const impactIntro = document.querySelector('.impact-copy > p:last-child');
    if (impactIntro) {
      impactIntro.textContent = 'Recent design-system work includes measurable adoption across reusable components and governed releases.';
    }

    const metrics = document.querySelector('.impact-metrics');
    if (metrics) {
      metrics.innerHTML = `
        <li class="impact-card">
          <p class="impact-card__value">21,000+</p>
          <p class="impact-card__description">Figma-tracked insertions across components I built and modernised over 12 months</p>
        </li>
        <li class="impact-card">
          <p class="impact-card__value">17 teams</p>
          <p class="impact-card__description">supported by the shared Core design-system library</p>
        </li>
        <li class="impact-card">
          <p class="impact-card__value">15</p>
          <p class="impact-card__description">redesigned Core Components progressed through peer design and engineering review into the shared Figma library</p>
        </li>
      `;
    }

    if (!document.querySelector('style[data-homepage-impact-update]')) {
      const style = document.createElement('style');
      style.dataset.homepageImpactUpdate = '';
      style.textContent = `
        body.home-page .impact-metrics {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: var(--page-border);
          align-items: stretch;
        }

        body.home-page .impact-metrics li {
          border: 0;
          background: var(--page-surface-raised);
          padding: 64px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
        }

        body.home-page .impact-card__value,
        body.home-page .impact-card__description {
          margin-left: 0;
          margin-right: 0;
        }

        @media (min-width: 901px) {
          body.home-page .hero h1 {
            font-size: clamp(3rem, 4.25vw, 3.5rem);
          }
        }

        @media (min-width: 1100px) {
          body.home-page .hero h1 {
            font-size: clamp(2.5rem, 3.25vw, 2.75rem);
            white-space: nowrap;
          }
        }

        @media (max-width: 900px) {
          body.home-page .impact-metrics {
            grid-template-columns: 1fr;
            gap: 0;
          }

          body.home-page .impact-metrics li {
            border-bottom: 1px solid var(--page-border);
            padding: 40px 32px;
          }

          body.home-page .impact-metrics li:last-child {
            border-bottom: 0;
          }
        }
      `;
      document.head.append(style);
    }
  };

  const initSiteHeader = () => {
    loadCaseStudyDarkModeStyles();
    initCaseStudyIntro();
    initHomepageImpact();

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
