const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const dropdownMenu = document.querySelector('#dropdown-menu');
const themeToggle = document.querySelector('.theme-toggle');
const darkModeStorageKey = 'sophie-theme';
const dropdownInactivityDelayMs = 5000;
let dropdownInactivityTimer = null;

const safeGetStoredMode = () => {
  try {
    return localStorage.getItem(darkModeStorageKey);
  } catch {
    return null;
  }
};

const safeSetStoredMode = (mode) => {
  try {
    localStorage.setItem(darkModeStorageKey, mode);
  } catch {
    // Ignore storage failures and keep the current in-memory theme state.
  }
};

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
  if (dropdownInactivityTimer) {
    clearTimeout(dropdownInactivityTimer);
  }
  dropdownInactivityTimer = setTimeout(() => {
    closeDropdownMenu();
  }, dropdownInactivityDelayMs);
};

const syncThemeToggleLabel = (isDarkMode) => {
  if (!themeToggle) return;
  themeToggle.setAttribute('aria-pressed', String(isDarkMode));
  themeToggle.setAttribute('aria-label', isDarkMode ? 'Deactivate dark mode' : 'Activate dark mode');
  themeToggle.title = isDarkMode ? 'Deactivate dark mode' : 'Activate dark mode';
};

const applyTheme = (mode) => {
  const isDarkMode = mode === 'dark';
  document.body.classList.toggle('dark-mode', isDarkMode);
  syncThemeToggleLabel(isDarkMode);
};

const initThemeToggle = () => {
  if (!themeToggle) return;
  const storedMode = safeGetStoredMode();
  applyTheme(storedMode === 'dark' ? 'dark' : 'light');

  themeToggle.addEventListener('click', () => {
    const willBeDarkMode = !document.body.classList.contains('dark-mode');
    const nextMode = willBeDarkMode ? 'dark' : 'light';
    applyTheme(nextMode);
    safeSetStoredMode(nextMode);
  });
};

if (menuToggle && dropdownMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = dropdownMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    syncHeaderMenuState();
    if (isOpen) {
      resetDropdownInactivityTimer();
    } else if (dropdownInactivityTimer) {
      clearTimeout(dropdownInactivityTimer);
      dropdownInactivityTimer = null;
    }
  });

  dropdownMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDropdownMenu);
  });

  ['pointermove', 'click', 'keydown', 'focusin', 'touchstart'].forEach((eventName) => {
    dropdownMenu.addEventListener(eventName, resetDropdownInactivityTimer, {
      passive: eventName !== 'keydown'
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeDropdownMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dropdownMenu.classList.contains('open')) {
      closeDropdownMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!dropdownMenu.classList.contains('open')) return;
    const clickedInsideDropdown = dropdownMenu.contains(event.target);
    const clickedMenuToggle = menuToggle.contains(event.target);
    if (!clickedInsideDropdown && !clickedMenuToggle) {
      closeDropdownMenu();
    }
  });

  window.addEventListener('scroll', () => {
    if (dropdownMenu.classList.contains('open')) {
      closeDropdownMenu();
    }
  }, { passive: true });
}

window.addEventListener('scroll', toggleHeaderState, { passive: true });
toggleHeaderState();
initThemeToggle();


document.querySelectorAll('[data-prototype-frame]').forEach((frame) => {
  const iframe = frame.querySelector('iframe');
  if (!iframe) return;

  const fallbackDelayMs = Number(frame.dataset.fallbackDelayMs || 4500);
  let loaded = false;

  const fallbackTimer = window.setTimeout(() => {
    if (!loaded) {
      frame.classList.add('is-fallback');
    }
  }, fallbackDelayMs);

  iframe.addEventListener('load', () => {
    loaded = true;
    window.clearTimeout(fallbackTimer);
    frame.classList.remove('is-fallback');
  });
});

// Dude, Where's My Bike design system documentation (moved from legacy design-system/bike-design-system.js).

const iconPaths = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V21h5v-6h4v6h5V10.5"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><path d="M9 3v15"/><path d="M15 6v15"/>',
  bookmark: '<path d="M6 4h12v17l-6-4-6 4V4z"/>',
  calendar: '<path d="M7 3v4"/><path d="M17 3v4"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  filter: '<path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/>',
  pin: '<path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z"/><circle cx="12" cy="10" r="2"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  bolt: '<path d="m13 2-8 12h7l-1 8 8-12h-7l1-8z"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l-3 5m-4 0 3-5H9m1 5H7l-1.5 6.5M10 11l4 6.5"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  warning: '<path d="m12 3 10 18H2L12 3z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>'
};

const icon = (name, label, classes = '') => `<svg class="${classes}" viewBox="0 0 24 24" role="img" aria-label="${label}">${iconPaths[name]}</svg>`;
const logoMarkup = (variant = '') => `<div class="product-logo-card ${variant}" aria-label="Hey Dude Where's My Bike logo"><p class="product-logo__eyebrow">Hey Dude</p><p class="product-logo__title">Where’s My Bike?</p></div>`;
const iconInventory = [
  ['home','Home','Bottom navigation'], ['map','Map','Map tab and map view'], ['bookmark','Saved','Saved/bookings badge'], ['calendar','Bookings','Booking navigation'], ['user','Profile','Account screen'], ['search','Search','Search fields'], ['filter','Filter','Results filters'], ['pin','Location pin','Location and provider cards'], ['back','Back arrow','Header controls'], ['chevron','Forward chevron','Directional rows'], ['close','Close','Dismiss controls'], ['star','Rating star','Reviews and ratings','filled-star'], ['shield','Verified shield','Provider verification'], ['globe','Globe','Worldwide coverage'], ['bolt','Lightning','Live availability and e-bikes'], ['bike','Bike','Bike quality and empty states'], ['list','List view','List/map toggle'], ['menu','Menu','Navigation menu'], ['info','Information','Deposit and help states'], ['warning','Warning','Low/closed/error states'], ['bell','Notifications','Home alerts'], ['send','Current location','Use current location'], ['clock','Opening hours','Provider detail'], ['users','Users','Solo, couples, family']
].map(([name,label,usage,classes = '']) => `<div class="icon-tile"><span aria-hidden="true">${icon(name, label, classes)}</span><b>${label}</b><span>${usage}</span></div>`).join('');

const screens = [
  ['01-welcome.png', 'Welcome'],
  ['02-home.png', 'Home'],
  ['03-search-results.png', 'Search Results'],
  ['04-map-view.png', 'Map View'],
  ['05-provider-detail.png', 'Provider Detail'],
  ['06-bike-selection.png', 'Bike Selection'],
  ['07-booking-summary.png', 'Booking Summary'],
  ['08-confirmation.png', 'Confirmation'],
  ['09-my-bookings.png', 'My Bookings'],
  ['10-profile.png', 'Profile']
];

const screenGrid = (assetBase = 'assets/') => `<div class="screen-grid">${screens.map(([file, label]) => `
  <figure class="screen-card">
    <div class="app-screen-frame screen-card__frame">
      <img src="${assetBase}${file}" alt="${label} screen from the Dude, Where's My Bike? prototype" loading="lazy" decoding="async">
    </div>
    <figcaption>${label}</figcaption>
  </figure>`).join('')}</div>`;

const getDocs = (assetBase = 'assets/') => [
  { group: 'Foundations', items: [
    ['overview','Overview','A practical mobile-first system for discovering local bike hire, comparing trusted providers and completing a booking with confidence.','<div class="hero-preview"><span>Dude, Where’s My Bike?</span><strong>Book a bike without the runaround.</strong><p>Warm orange, coral, pink and purple gradients give the app its distinctive personality; white cards and dark purple type keep booking tasks clear.</p><div class="button-stack"><button class="ds-btn primary">Find bikes nearby</button><button class="ds-btn secondary">View map</button></div></div>', ['Every app component preview uses the bike app tokens and Nunito Sans.', 'Prototype screenshots are included as the source-of-truth reference.'], ['Font: Nunito Sans','Palette: warm orange, coral, pink, purple, dark purple','Shape language: large cards, pills and bottom sheets'] ],
    ['brand','Brand','The brand is friendly, direct and energetic, balancing playful language with clear trust and availability signals.','<div class="brand-board"><div><b>Warm</b><span>Sunset gradients and cream surfaces make the utility app feel local and welcoming.</span></div><div><b>Useful</b><span>Location, availability, ratings and prices are surfaced before decorative content.</span></div><div><b>Trust-led</b><span>Verified badges, reviews and clear booking summaries reduce uncertainty.</span></div></div>', ['Use expressive colour for discovery and confirmation moments.', 'Keep copy short, human and task-focused.']],
    ['logo','Logo','The production wordmark is live text: a tracked uppercase “Hey Dude” eyebrow above the heavy Nunito Sans “Where’s My Bike?” title.', `<div class="product-logo-demo">${logoMarkup()}${logoMarkup('gradient')}<div class="logo-guidance"><div><b>Primary logo</b><span>Use the stacked Hey Dude / Where’s My Bike? lockup exactly as shown.</span></div><div><b>Clear space</b><span>Keep at least the height of the eyebrow text around the lockup.</span></div><div><b>Backgrounds</b><span>Use dark ink on white or white on the app sunset gradient.</span></div></div></div>`, ['Do not replace “Hey Dude” with “Dude,” or add a comma.', 'Preserve the two-line text relationship, Nunito Sans 900 weight and app red/ink colours.', 'Do not stretch, recolour or screenshot the wordmark.'], ['Eyebrow: Hey Dude, uppercase, Nunito Sans 900, tracked', 'Title: Where’s My Bike?, Nunito Sans 900', 'Source audited: deployed prototype screenshots/assets']],
    ['colours','Colours','The app palette is led by warm orange, coral, pink, purple and dark purple, with semantic colours reserved for availability.','<div class="swatches"><div><i style="background:#FF9F1C"></i><b>Warm orange</b><code>#FF9F1C</code></div><div><i style="background:#FF6B5F"></i><b>Coral</b><code>#FF6B5F</code></div><div><i style="background:#FF4F9A"></i><b>Pink</b><code>#FF4F9A</code></div><div><i style="background:#7B2CBF"></i><b>Purple</b><code>#7B2CBF</code></div><div><i style="background:#4B1D67"></i><b>Deep purple</b><code>#4B1D67</code></div><div><i style="background:#251238"></i><b>Ink</b><code>#251238</code></div><div><i style="background:#FFF7ED"></i><b>Cream</b><code>#FFF7ED</code></div><div><i style="background:#159A72"></i><b>Available</b><code>#159A72</code></div><div><i style="background:#B85C00"></i><b>Low availability</b><code>#B85C00</code></div><div><i style="background:#C9364C"></i><b>Unavailable</b><code>#C9364C</code></div></div>', ['Do not introduce portfolio red into app components.', 'Semantic colours must include text labels, not colour alone.'], ['--app-orange: #FF9F1C','--app-coral: #FF6B5F','--app-pink: #FF4F9A','--app-purple: #7B2CBF','--app-deep-purple: #4B1D67','--app-ink: #251238'] ],
    ['gradients','Gradients','Gradients provide the app’s signature energy for hero moments, CTAs, map washes and selected navigation.','<div class="gradient-grid"><div style="background:var(--app-gradient);color:white"><b>Primary sunset</b><code>orange → purple</code></div><div style="background:var(--app-map-gradient)"><b>Map wash</b><code>soft warm route</code></div><div style="background:linear-gradient(135deg,#251238,#4B1D67);color:white"><b>Dark summary</b><code>ink → deep purple</code></div></div>', ['Use gradients where screenshots show expressive app surfaces.', 'Keep paragraphs on solid cards for readability.']],
    ['typography','Typography','Bike app UI uses Nunito Sans for friendly, rounded, readable mobile components.','<div class="type-spec"><div class="type-card display"><label>Display heading</label><h1>Find your ride</h1></div><div class="type-card"><label>Screen title</label><h2>Nearby bikes</h2></div><div class="type-card"><label>Section title</label><h3>Popular providers</h3></div><div class="type-card"><label>Body copy</label><p>Compare availability, price and pickup details before you reserve.</p></div><div class="type-card"><label>Small body copy</label><small>Open until 7pm · 0.4 mi away</small></div><div class="type-card"><label>Label</label><span class="ui-label">Pickup location</span></div><div class="type-card"><label>Caption</label><span class="caption">Includes helmet and lock</span></div><div class="type-card"><label>Button text</label><button class="ds-btn primary">Reserve bike</button></div></div>', ['Use Nunito Sans for app previews, not Inter.', 'Use 800/900 weights for titles, labels, badges and buttons.'], ['Display: Nunito Sans 900','Title: Nunito Sans 800','Body: Nunito Sans 600','Caption: Nunito Sans 700'] ],
    ['spacing','Spacing','Spacing follows a compact mobile rhythm with roomy cards and touch-friendly controls.','<div class="spacing-scale"><span>4</span><span>8</span><span>12</span><span>16</span><span>20</span><span>24</span><span>32</span></div>', ['Use 16–24px internal card padding.', 'Keep at least 12px between stacked touch controls.']],
    ['radius','Radius','The prototype uses generous rounded cards, fully pill-shaped controls and soft sheet corners.','<div class="radius-grid"><span style="border-radius:14px">14px controls</span><span style="border-radius:20px">20px chips</span><span style="border-radius:28px">28px cards</span><span style="border-radius:999px">pill CTAs</span></div>', ['Cards and bottom sheets should feel soft and app-like.', 'Use pill radius for chips, badges and buttons.']],
    ['shadows','Shadows','Elevation is soft and purple-tinted, lifting cards, CTAs and sheets without harsh contrast.','<div class="shadow-grid"><span style="box-shadow:0 8px 20px rgba(75,29,103,.08)">Card</span><span style="box-shadow:var(--app-shadow)">Featured card</span><span style="box-shadow:0 -18px 40px rgba(75,29,103,.18)">Bottom sheet</span></div>', ['Use stronger elevation for overlays and selected cards.', 'Avoid grey generic shadows.']],
    ['iconography','Iconography','The product uses a rounded outline icon language consistent with Lucide-style strokes, with filled states for saved hearts and rating stars.', `<div class="icon-inventory">${iconInventory}</div>`, ['Pair icons with visible text wherever possible.', 'Use filled variants only where the product uses them for state, such as saved hearts and ratings.', 'Keep the 2.5px rounded stroke, optical sizing and app red active state consistent across navigation and controls.'], ['Unique audited icons: Home, Map, Saved/bookmark, Calendar, Profile/user, Search, Filter, Location pin, Back arrow, Forward chevron, Close, Star/rating, Shield/verified, Globe, Lightning/live availability, Bike, List view, Menu, Information, Warning/status, Bell, Current location, Clock, Users']]
  ]},
  { group: 'Components', items: [
    ['buttons','Buttons','Buttons are pill-shaped, bold and gradient-led for primary actions.','<div class="state-demo"><div class="state-sample"><span>Default</span><button class="ds-btn primary">Reserve bike</button></div><div class="state-sample"><span>Hover</span><button class="ds-btn primary is-hover">Reserve bike</button></div><div class="state-sample"><span>Active</span><button class="ds-btn primary is-active">Reserve bike</button></div><div class="state-sample"><span>Focus</span><button class="ds-btn primary is-focus">Reserve bike</button></div><div class="state-sample"><span>Secondary</span><button class="ds-btn secondary">View details</button></div><div class="state-sample"><span>Disabled</span><button class="ds-btn is-disabled" disabled>Unavailable</button></div></div>', ['Primary CTAs use the sunset gradient and warm shadow.', 'Disabled buttons remain labelled and subdued.']],
    ['inputs','Inputs','Inputs are rounded white fields with persistent labels and clear values.','<div class="form-demo"><label><span>Default</span><input value="Brighton Pier"></label><label class="is-focus"><span>Focus</span><input value="Today, 10:00"></label><label class="is-error"><span>Error</span><input value="" aria-invalid="true" aria-describedby="pickup-error"><small id="pickup-error" class="field-error">Choose a pickup location.</small></label><label class="disabled"><span>Disabled</span><input value="8 hours" disabled></label></div>', ['Labels stay visible above values.', 'Fields use large tap targets and high-contrast text.']],
    ['search','Search','Search is a raised, rounded control that combines location intent with a clear action.','<div class="state-demo"><div class="state-sample"><span>Default</span><div class="search-demo"><span>⌕ Search location or provider</span><button class="ds-btn primary">Search</button></div></div><div class="state-sample"><span>Focus</span><div class="search-demo is-focus"><span>⌕ Brighton Pier</span><button class="ds-btn primary is-focus">Search</button></div></div><div class="state-sample"><span>Error</span><div class="search-demo is-error"><span>Choose a valid location</span><button class="ds-btn primary">Search</button></div></div></div>', ['Make search easy to identify at the top of discovery screens.', 'Do not rely on placeholder text alone.']],
    ['filter-chips','Filter chips','Filter chips refine search results with white defaults and dark-purple selected states.','<div class="state-demo"><div class="state-sample"><span>Default</span><button class="chip">Open now</button></div><div class="state-sample"><span>Hover</span><button class="chip is-hover">Open now</button></div><div class="state-sample"><span>Active</span><button class="chip active">Verified</button></div><div class="state-sample"><span>Focus</span><button class="chip is-focus">E-bike</button></div><div class="state-sample"><span>Disabled</span><button class="chip is-disabled" disabled>Unavailable</button></div></div>', ['Selected states change fill, text colour and border.', 'Disabled chips stay readable.']],
    ['category-chips','Category chips','Category chips represent bike types and browsing categories.','<div class="state-demo"><div class="state-sample"><span>Default</span><button class="chip">⚡ E-bike</button></div><div class="state-sample"><span>Selected</span><button class="chip active">🚲 City</button></div><div class="state-sample"><span>Hover</span><button class="chip is-hover">👨‍👩‍👧 Family</button></div><div class="state-sample"><span>Focus</span><button class="chip is-focus">📦 Cargo</button></div></div>', ['Use short labels that scan quickly.', 'Selected categories should be visually obvious.']],
    ['badges','Badges','Badges show availability, trust and category status using semantic fills and text.','<div class="badges"><span class="badge available">✓ Available</span><span class="badge low">2 left · Low availability</span><span class="badge unavailable">Unavailable</span><span class="badge verified">✓ Verified</span><span class="badge family">Family-friendly</span></div>', ['Always include text, not colour alone.', 'Use badges sparingly on dense cards.']],
    ['availability-states','Availability states','Availability is represented consistently across badges, cards and map pins.','<div class="state-grid"><span class="good">✓ 12 available</span><span class="warn">2 left</span><span class="bad">Unavailable</span><article class="mini-card"><b>Ready today</b><span class="badge available">Available</span></article><article class="mini-card"><b>Almost gone</b><span class="badge low">Low availability</span></article><article class="mini-card disabled"><b>Not bookable</b><span class="badge unavailable">Unavailable</span></article></div>', ['Availability states must appear in words.', 'Low availability should prompt action without panic.']],
    ['provider-cards','Provider cards','Provider cards combine image-like colour blocks, name, rating, distance, availability and CTA.','<div class="card-grid"><article class="provider" tabindex="0"><b>Harbour Cycle Hub</b><small>0.4 mi · ★ 4.9 · Open until 7pm</small><span class="badge available">12 bikes available</span><button class="ds-btn primary">Reserve</button></article><article class="provider selected is-focus" tabindex="0"><b>Trailhead Rentals</b><small>1.1 mi · ★ 4.7</small><span class="badge verified">✓ Verified provider</span><button class="ds-btn secondary">View details</button></article><article class="provider unavailable-card" aria-disabled="true"><b>Station Cycles</b><small>Closed today</small><span class="badge unavailable">Unavailable</span></article></div>', ['Lead with provider name and immediate availability.', 'Unavailable cards explain why they are subdued.']],
    ['bike-cards','Bike cards','Bike cards show bike type, use case, status and price in compact rounded cards.','<div class="card-grid"><article class="mini-card selected is-focus" tabindex="0"><b>Hybrid bike</b><p>Comfort city option.</p><span class="badge available">Available</span><strong>£14/day</strong></article><article class="mini-card is-hover" tabindex="0"><b>E-bike</b><p>Assisted longer routes.</p><span class="badge low">3 left</span><strong>£28/day</strong></article><article class="mini-card disabled" aria-disabled="true"><b>Cargo bike</b><p>Family and shopping trips.</p><span class="badge unavailable">Unavailable</span><strong>£32/day</strong></article></div>', ['Show price with availability.', 'Selected cards need both border and shadow changes.']],
    ['booking-cards','Booking cards','Booking cards summarise the selected provider, bike and pickup window with edit actions.','<article class="booking-card"><b>Hybrid bike reserved</b><p>Harbour Cycle Hub · Today 10:00–18:00</p><span class="badge verified">✓ Helmet included</span><button class="ds-btn secondary">Edit booking</button></article>', ['Keep booking details in one glanceable card.', 'Use secondary actions for edits after selection.']],
    ['price-summary','Price summary','Price summaries use dark purple contrast, clear line items and a prominent total.','<div class="price-card"><div><span>Hybrid bike</span><b>£14</b></div><div><span>Helmet</span><b>£3</b></div><div><span>Service fee</span><b>£0</b></div><div><span>Total</span><b>£17</b></div></div>', ['Place totals after line items.', 'Avoid hiding required fees.']],
    ['navigation','Navigation','Mobile navigation uses rounded tabs with a gradient active state.','<nav class="bottom-nav" aria-label="App preview navigation states"><a href="#" class="active">Search</a><a href="#" class="is-hover">Map</a><a href="#" class="is-focus">Saved</a><a href="#" class="is-disabled" aria-disabled="true">Trips</a></nav>', ['Use text labels with icons in production.', 'Keep the active state unmistakable.']],
    ['map-pins','Map pins','Map pins use saturated status colours and inventory labels for nearby providers.','<div class="map-demo"><span class="pin p1">8</span><span class="pin p2">✓</span><span class="pin p3">2</span></div>', ['Use numbers for available inventory.', 'Keep tap targets larger than the visual pin.']],
    ['bottom-sheets','Bottom sheets','Bottom sheets reveal contextual provider actions over map and search screens.','<div class="sheet-demo"><div class="sheet"><b>Harbour Cycle Hub</b><p>12 bikes available · 0.4 mi away · ★ 4.9</p><button class="ds-btn primary">Reserve bike</button></div></div>', ['Use a clear sheet treatment over map content.', 'Do not hide critical content below the fold.']],
    ['empty-states','Empty states','Empty states keep the warm app voice while giving a clear next step.','<div class="empty"><div class="empty-icon">🚲</div><b>No bikes match these filters</b><p>Try widening your distance or clearing one filter.</p><button class="ds-btn secondary">Reset filters</button></div>', ['Explain what happened in plain language.', 'Offer one practical recovery action.']]
  ]},
  { group: 'Patterns', items: [
    ['search-discovery','Search and discovery','Discovery starts broad, then narrows by location, map view, category and availability.','<div class="pattern-flow"><span>Search location</span><span>Scan providers</span><span>Open detail</span></div>', ['Keep search, filters and results visually connected.']],
    ['filtering','Filtering','Filtering improves confidence by making selected criteria visible and easy to remove.','<div class="chips"><button class="chip active">Open now</button><button class="chip active">Verified</button><button class="chip">Family</button><button class="chip">E-bike</button></div>', ['Show selected filters near results.', 'Provide a quick reset.']],
    ['provider-comparison','Provider comparison','Comparison prioritises availability, rating and distance before deeper details.','<div class="compare"><b>Provider</b><b>Status</b><b>Rating</b><span>Harbour Cycle Hub</span><span>12 bikes</span><span>★ 4.9</span><span>Trailhead Rentals</span><span>2 left</span><span>★ 4.7</span></div>', ['Make scannable differences obvious.', 'Do not over-weight rating over availability.']],
    ['booking-flow','Booking flow','Booking moves from bike choice to review and confirmation with editable summaries.','<ol class="steps"><li>Choose bike</li><li>Add extras</li><li>Review price</li><li>Confirm</li></ol>', ['Confirm the selection at each step.', 'Allow edits before payment or reservation.']],
    ['confirmation-flow','Confirmation flow','Confirmation reassures users and gives them practical next actions.','<article class="booking-card confirmation"><b>Booking confirmed</b><p>Your hybrid bike is reserved for today at 10:00.</p><button class="ds-btn secondary">Add to calendar</button></article>', ['State what is booked and when.', 'Provide directions or calendar actions.']],
    ['saved-providers','Saved providers','Saved providers create a repeat-booking shortlist of trusted local shops.','<article class="mini-card selected"><b>♡ Harbour Cycle Hub</b><p>Saved · 12 bikes available today</p><span class="badge available">Available</span></article>', ['Use saved state consistently across cards and detail pages.']],
    ['reviews-ratings','Reviews and ratings','Reviews add confidence alongside concrete provider details such as availability and opening hours.','<div class="review"><strong>★ 4.9</strong><p>Friendly team, quick pickup, child seat ready.</p><small>Based on 128 rides</small></div>', ['Summarise review sentiment.', 'Do not replace safety or availability details with ratings.']]
  ]},
  { group: 'Prototype', items: [
    ['app-screens','App screens','Uploaded prototype screenshots are displayed alongside the component documentation as the visual source of truth.', screenGrid(assetBase), ['Use these screens to compare colour, spacing, card shapes and navigation treatments.', 'Captions are inferred from file names and visible prototype flow.']]
  ]}
];


function designSystemDocsTemplate() {
  return `
    <header class="case-study-section ds-section-heading design-system-docs__intro">
      <p class="eyebrow">Design system</p>
      <h2>Designing form and function as one system</h2>
    </header>

    <section class="docs-layout design-system-docs__layout" aria-label="Design system documentation">
      <aside class="docs-sidebar design-system-docs__nav" aria-label="Design system sections">
        <label class="section-select-label" for="section-select">Browse documentation</label>
        <select id="section-select" class="section-select"></select>
        <nav class="docs-nav" id="docs-nav" aria-label="Foundations, components and patterns"></nav>
      </aside>

      <section class="docs-panel design-system-docs__content" aria-live="polite">
        <div class="panel-meta" id="panel-category">Foundation</div>
        <h2 id="panel-title"></h2>
        <p id="panel-description" class="panel-description"></p>
        <div id="panel-preview" class="panel-preview"></div>
        <div class="panel-notes">
          <h3>Usage notes</h3>
          <ul id="panel-notes"></ul>
        </div>
        <div id="panel-tokens" class="token-callout" hidden></div>
      </section>
    </section>`;
}

function initDesignSystemDocs(root) {
  if (!root) return;
  const assetBase = root.dataset.assetBase || 'assets/';
  root.classList.add('design-system-docs');
  root.innerHTML = designSystemDocsTemplate();

  const docs = getDocs(assetBase);
  const nav = root.querySelector('#docs-nav');
  const select = root.querySelector('#section-select');
  const title = root.querySelector('#panel-title');
  const category = root.querySelector('#panel-category');
  const description = root.querySelector('#panel-description');
  const preview = root.querySelector('#panel-preview');
  const notes = root.querySelector('#panel-notes');
  const tokens = root.querySelector('#panel-tokens');
  const flatDocs = docs.flatMap(section => section.items.map(item => ({ group: section.group, id: item[0], title: item[1], description: item[2], preview: item[3], notes: item[4] || [], tokens: item[5] || [] })));

  docs.forEach(section => {
    const group = document.createElement('section');
    group.className = 'nav-group';
    group.innerHTML = `<h2>${section.group}</h2>`;
    section.items.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'docs-nav-link';
      button.dataset.section = item[0];
      button.textContent = item[1];
      button.addEventListener('click', () => renderSection(item[0], true));
      group.append(button);
      const option = document.createElement('option');
      option.value = item[0];
      option.textContent = `${section.group} — ${item[1]}`;
      select.append(option);
    });
    nav.append(group);
  });

  function renderSection(id, updateHash = false) {
    const doc = flatDocs.find(item => item.id === id) || flatDocs[0];
    category.textContent = doc.group;
    title.textContent = doc.title;
    description.textContent = doc.description;
    preview.innerHTML = doc.preview;
    notes.innerHTML = doc.notes.map(note => `<li>${note}</li>`).join('');
    tokens.hidden = !doc.tokens.length;
    tokens.innerHTML = doc.tokens.length ? `<h3>Token values</h3>${doc.tokens.map(token => `<code>${token}</code>`).join('')}` : '';
    root.querySelectorAll('.docs-nav-link').forEach(link => {
      const active = link.dataset.section === doc.id;
      link.classList.toggle('is-active', active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });
    select.value = doc.id;
    if (updateHash) history.replaceState(null, '', `#${doc.id}`);
  }

  select.addEventListener('change', event => renderSection(event.target.value, true));
  window.addEventListener('hashchange', () => renderSection(location.hash.replace('#', '') || 'overview'));
  renderSection(location.hash.replace('#', '') || 'overview');
}

document.querySelectorAll('[data-design-system-docs]').forEach(initDesignSystemDocs);
