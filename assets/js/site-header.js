(() => {
  const darkModeStorageKey = 'sophie-theme';

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

  const initSiteHeader = () => {
    const siteHeader = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('#dropdown-menu');
    const themeToggle = document.querySelector('.theme-toggle');
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
