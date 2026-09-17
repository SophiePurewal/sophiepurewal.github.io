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

  const initPlacePathCaseStudy = () => {
    if (!document.body.classList.contains('placepath-page')) return;

    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    const addPlacePathEvidence = () => {
      const assetBase = '../assets/case-studies/placepath/';

      if (!document.querySelector('style[data-placepath-evidence-styles]')) {
        const style = document.createElement('style');
        style.dataset.placepathEvidenceStyles = '';
        style.textContent = `
          .placepath-evidence {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr);
            gap: clamp(28px, 4vw, 52px);
            align-items: center;
            margin: 32px 0 28px;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
          }

          .placepath-evidence__copy {
            max-width: 38rem;
          }

          .placepath-evidence__eyebrow {
            margin: 0 0 10px !important;
            color: var(--brand) !important;
            font-size: 12.48px;
            line-height: 19.968px;
            font-weight: 700;
            letter-spacing: 1.6224px;
            text-transform: uppercase;
          }

          .placepath-evidence h3 {
            margin: 0 0 14px;
            color: var(--text);
            font-size: clamp(1.45rem, 2.4vw, 2rem);
            line-height: 1.15;
            letter-spacing: -0.035em;
          }

          .placepath-evidence__copy > p:not(.placepath-evidence__eyebrow) {
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
          }

          .placepath-evidence figure {
            margin: 0;
            min-width: 0;
          }

          .placepath-evidence img {
            display: block;
            width: 100%;
            height: auto;
            border: 1px solid var(--line);
            border-radius: 8px;
            background: #fff;
          }

          .placepath-evidence figcaption {
            margin-top: 12px;
            color: var(--text);
            font-size: .94rem;
            line-height: 1.55;
            font-weight: 600;
          }

          .placepath-evidence__flow {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 9px;
            margin-top: 22px;
            color: var(--text);
            font-size: .9rem;
            font-weight: 700;
          }

          .placepath-evidence__flow i {
            color: var(--muted);
            font-style: normal;
            font-weight: 500;
          }

          .placepath-evidence--steps {
            display: block;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
          }

          .placepath-process-step {
            display: grid;
            grid-template-columns: minmax(220px, .55fr) minmax(0, 1.45fr);
            gap: clamp(28px, 5vw, 64px);
            align-items: start;
            padding: clamp(28px, 4vw, 48px) 0;
            border-top: 1px solid var(--line);
          }

          .placepath-process-step:first-child {
            border-top: 0;
            padding-top: 0;
          }

          .placepath-process-step__copy {
            max-width: 30rem;
            padding-top: 6px;
          }

          .placepath-process-step figure {
            margin: 0;
          }

          .placepath-process-step img {
            width: 100%;
            height: auto;
          }

          @media (max-width: 820px) {
            .placepath-process-step {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }

          body.dark-mode .placepath-evidence__eyebrow {
            color: #fff !important;
          }

          body.dark-mode .placepath-evidence {
            background: transparent;
          }

          @media (max-width: 820px) {
            .placepath-evidence {
              grid-template-columns: 1fr;
            }

            .placepath-evidence__copy {
              max-width: none;
            }
          }
        `;
        document.head.append(style);
      }

      const mvpSection = document.querySelector('section[aria-labelledby="mvp-title"]');
      if (mvpSection && !mvpSection.querySelector('[data-placepath-evidence="scope"]')) {
        const evidence = document.createElement('div');
        evidence.className = 'placepath-evidence';
        evidence.dataset.placepathEvidence = 'scope';
        evidence.innerHTML = `
          <div class="placepath-evidence__copy">
            <p class="placepath-evidence__eyebrow">The decision</p>
            <h3>Focus the first release on running a placement</h3>
            <p>The brief contained more capability than the first product needed. I prioritised the workflows placement teams needed day to day, and moved valuable but non-essential capabilities into later phases.</p>
          </div>
          <figure>
            <img src="../Placepath_UserStories.png" alt="PlacePath user stories showing the requirements used to define the first release" loading="lazy" decoding="async">
            <figcaption><strong>Starting point:</strong> user stories described the required capabilities; my role was to decide what belonged in the first release.</figcaption>
          </figure>
        `;

        const priorityGrid = mvpSection.querySelector('.placepath-priority-grid');
        if (priorityGrid) priorityGrid.before(evidence);
        else mvpSection.append(evidence);
      }

      const evolutionSection = document.querySelector('section[aria-labelledby="evolution-title"]');
      if (evolutionSection) {
        const lowFiImage = evolutionSection.querySelector('.placepath-lowfi-image');
        if (lowFiImage) {
          lowFiImage.src = `${assetBase}placepath-low-fidelity-plan-placement.webp`;
          lowFiImage.alt = 'Annotated low-fidelity PlacePath planning wireframe translating the Plan a placement requirement into navigation, fields, objectives, preview and save actions';
          const lowFiCaption = lowFiImage.closest('figure')?.querySelector('figcaption');
          if (lowFiCaption) lowFiCaption.innerHTML = '<strong>Low fidelity:</strong> translate the requirement into information hierarchy, navigation and actions.';
        }

        if (!evolutionSection.querySelector('[data-placepath-evidence="structure"]')) {
          const evidence = document.createElement('div');
          evidence.className = 'placepath-evidence';
          evidence.dataset.placepathEvidence = 'structure';
          evidence.classList.add('placepath-evidence--steps');
          evidence.innerHTML = `
            <div class="placepath-process-step">
              <div class="placepath-process-step__copy">
                <p class="placepath-evidence__eyebrow">Step 1</p>
                <h3>Planning the user flow</h3>
                <p>I mapped the placement journey and how the key roles connected across it.</p>
              </div>
              <figure>
                <img src="${assetBase}placepath-user-story-plan-placement.webp" alt="PlacePath planning user flow" loading="lazy" decoding="async">
              </figure>
            </div>
            <div class="placepath-process-step">
              <div class="placepath-process-step__copy">
                <p class="placepath-evidence__eyebrow">Step 2</p>
                <h3>Low fidelity: navigation and screen behaviour</h3>
                <p>I explored the information architecture, navigation and core interactions before adding visual detail.</p>
              </div>
              <figure>
                <img src="${assetBase}placepath-low-fidelity-plan-placement.webp" alt="PlacePath low-fidelity placement planning wireframe" loading="lazy" decoding="async">
              </figure>
            </div>
            <div class="placepath-process-step">
              <div class="placepath-process-step__copy">
                <p class="placepath-evidence__eyebrow">Step 3</p>
                <h3>High fidelity: refine the experience</h3>
                <p>I developed the journey into a polished interface ready for responsive delivery.</p>
              </div>
              <figure>
                <img src="${assetBase}placepath-high-fidelity-preview-plan.webp" alt="PlacePath high-fidelity placement planning interface" loading="lazy" decoding="async">
              </figure>
            </div>
          `;

          const evolutionGrid = evolutionSection.querySelector('.placepath-evolution');
          if (evolutionGrid) evolutionGrid.before(evidence);
          else evolutionSection.append(evidence);
        }
      }
    };

    document.title = 'PlacePath: From User Stories to a Responsive Product | Sophie Purewal';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'PlacePath product design case study: turning user stories into connected product journeys and responsive UI across mobile, tablet and desktop.';
    }

    setText('.placepath-hero .project-kicker', 'End-to-end product design case study · Education technology');
    setText('.placepath-hero .project-subtitle', 'Turning a set of user stories into a complete, role-based product experience across placement teams, employers and students.');
    setText('.placepath-hero .project-intro', 'There was no existing interface or established product journey. As Lead Product Design Consultant, I defined how the requirements connected, mapped the core journeys and designed the experience from low to high fidelity across mobile, tablet and desktop.');

    setText('.placepath-summary .summary-item:nth-child(3) dd', 'New responsive placement management product');
    setText('.placepath-summary .summary-item:nth-child(4) dd', 'Product definition, journeys, wireframes, UI and handoff');

    setText('.placepath-prototype-feature .section-label', 'Product outcome');
    setText('#prototype-title', 'Explore the product I defined');
    setText('#prototype-title + p', 'I translated disconnected user stories into a connected, role-based product, defining how placement coordinators, employers and students moved through the service rather than inheriting an established workflow.');

    setText('section[aria-labelledby="challenge-title"] > .section-label', '01 · Starting point');
    setText('#challenge-title', 'Start with requirements, not an existing product');
    setText('section[aria-labelledby="challenge-title"] .case-study-section__body > p', 'PlacePath began with user stories but no existing interface, information architecture or established journeys. The stories described individual needs across learning providers, employers and students; they did not define how those needs should connect into one coherent product.');
    setText('section[aria-labelledby="challenge-title"] .placepath-question span', 'Product challenge');
    setText('section[aria-labelledby="challenge-title"] .placepath-question p', 'How do I turn separate requirements across multiple roles into one understandable, connected placement experience?');

    setText('section[aria-labelledby="mvp-title"] > .section-label', '02 · Decision 01 · Scope');
    setText('#mvp-title', 'Turn a broad brief into a focused MVP');
    setText('#mvp-title + p', 'I prioritised the workflows placement teams needed to run the service day to day, then separated valuable but non-essential capabilities into later phases.');

    setText('section[aria-labelledby="evolution-title"] > .section-label', '03 · Decision 02 · Structure');
    setText('#evolution-title', 'Create a product model from the requirements');
    setText('#evolution-title + p', 'I mapped how individual user stories connected across roles, then worked the placement-planning journey through low and medium fidelity before committing to the final interface.');
    setText('section[aria-labelledby="evolution-title"] .placepath-decision .placepath-card-label', 'Product decision');
    setText('section[aria-labelledby="evolution-title"] .placepath-decision p:last-child', 'The requirements did not prescribe the interaction model. I moved away from one dense form and organised the journey around a create–review–manage lifecycle. That introduced clearer stages while keeping the full complexity of the placement record intact.');

    setText('section[aria-labelledby="workflow-title"] > .section-label', '04 · Decision 03 · Review');
    setText('#workflow-title', 'Make review a deliberate part of the journey');
    setText('#workflow-title + p', 'I chose not to make submission the immediate next step after editing. Coordinators could build a plan progressively, review the complete record, return to amend it and only then submit or share it.');

    setText('section[aria-labelledby="records-title"] > .section-label', '05 · Decision 04 · Context');
    setText('#records-title', 'Keep employer activity attached to the placement');
    setText('#records-title + p', 'Employer details, contacts, conversations and placement activity could easily become separate mini-flows. I used reusable record patterns to keep that context connected, so users could move through the work without losing the relationship between an employer and a placement.');

    setText('section[aria-labelledby="delivery-title"] > .section-label', '06 · Outcome · Deliver');
    setText('#delivery-title', 'Take the journeys from user stories to developer handoff');
    setText('#delivery-title + p', 'I carried the product from requirements through low- and mid-fidelity exploration to responsive high-fidelity UI for mobile, tablet and desktop, then delivered the clickable prototype, style guidance and production assets for developer handoff.');
    setText('section[aria-labelledby="delivery-title"] > p:last-child', 'The phase established the interaction model, responsive patterns and core coordinator journeys required for implementation. Further validation would focus on the highest-risk workflows and measure task completion, clarity and status comprehension.');

    addPlacePathEvidence();
  };

  const initHomepageImpact = () => {
    if (!document.body.classList.contains('home-page')) return;

    const recommendationsLink = document.querySelector('.recommendations-link .text-link');
    if (recommendationsLink) {
      recommendationsLink.href = 'https://www.linkedin.com/in/sophiepurewal/details/recommendations/?detailScreenTabIndex=0';
    }

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
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          min-width: 0;
        }

        body.home-page .impact-card__value,
        body.home-page .impact-card__description {
          margin-left: 0;
          margin-right: 0;
          max-width: 100%;
        }

        body.home-page .impact-card__value {
          white-space: normal;
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
            padding: 32px;
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
    initPlacePathCaseStudy();
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
