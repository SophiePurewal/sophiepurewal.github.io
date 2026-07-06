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

const screenGrid = `<div class="screen-grid">${screens.map(([file, label]) => `
  <figure class="screen-card">
    <img src="assets/${file}" alt="${label} screen from the Dude, Where's My Bike? prototype" loading="lazy">
    <figcaption>${label}</figcaption>
  </figure>`).join('')}</div>`;

const docs = [
  { group: 'Foundations', items: [
    ['overview','Overview','A practical mobile-first system for discovering local bike hire, comparing trusted providers and completing a booking with confidence.','<div class="hero-preview"><span>Dude, Where’s My Bike?</span><strong>Book a bike without the runaround.</strong><p>Warm orange, coral, pink and purple gradients give the app its distinctive personality; white cards and dark purple type keep booking tasks clear.</p><div class="button-stack"><button class="ds-btn primary">Find bikes nearby</button><button class="ds-btn secondary">View map</button></div></div>', ['Portfolio chrome stays in the existing Sophie Purewal style.', 'Every app component preview uses the bike app tokens and Nunito Sans.', 'Prototype screenshots are included as the source-of-truth reference.'], ['Font: Nunito Sans','Palette: warm orange, coral, pink, purple, dark purple','Shape language: large cards, pills and bottom sheets'] ],
    ['brand','Brand','The brand is friendly, direct and energetic, balancing playful language with clear trust and availability signals.','<div class="brand-board"><div><b>Warm</b><span>Sunset gradients and cream surfaces make the utility app feel local and welcoming.</span></div><div><b>Useful</b><span>Location, availability, ratings and prices are surfaced before decorative content.</span></div><div><b>Trust-led</b><span>Verified badges, reviews and clear booking summaries reduce uncertainty.</span></div></div>', ['Use expressive colour for discovery and confirmation moments.', 'Keep copy short, human and task-focused.']],
    ['logo','Logo','Use a bold, high-contrast wordmark treatment in rounded app containers.','<div class="logo-row"><div class="bike-logo"><span>Dude,<br>Where’s My Bike?</span></div><div class="bike-logo inverse"><span>Dude,<br>Where’s My Bike?</span></div></div>', ['Use the gradient mark on light surfaces.', 'Use dark purple where a calmer identity moment is needed.']],
    ['colours','Colours','The app palette is led by warm orange, coral, pink, purple and dark purple, with semantic colours reserved for availability.','<div class="swatches"><div><i style="background:#FF9F1C"></i><b>Warm orange</b><code>#FF9F1C</code></div><div><i style="background:#FF6B5F"></i><b>Coral</b><code>#FF6B5F</code></div><div><i style="background:#FF4F9A"></i><b>Pink</b><code>#FF4F9A</code></div><div><i style="background:#7B2CBF"></i><b>Purple</b><code>#7B2CBF</code></div><div><i style="background:#4B1D67"></i><b>Deep purple</b><code>#4B1D67</code></div><div><i style="background:#251238"></i><b>Ink</b><code>#251238</code></div><div><i style="background:#FFF7ED"></i><b>Cream</b><code>#FFF7ED</code></div><div><i style="background:#159A72"></i><b>Available</b><code>#159A72</code></div><div><i style="background:#B85C00"></i><b>Low availability</b><code>#B85C00</code></div><div><i style="background:#C9364C"></i><b>Unavailable</b><code>#C9364C</code></div></div>', ['Do not introduce portfolio red into app components.', 'Semantic colours must include text labels, not colour alone.'], ['--app-orange: #FF9F1C','--app-coral: #FF6B5F','--app-pink: #FF4F9A','--app-purple: #7B2CBF','--app-deep-purple: #4B1D67','--app-ink: #251238'] ],
    ['gradients','Gradients','Gradients provide the app’s signature energy for hero moments, CTAs, map washes and selected navigation.','<div class="gradient-grid"><div style="background:var(--app-gradient);color:white"><b>Primary sunset</b><code>orange → purple</code></div><div style="background:var(--app-map-gradient)"><b>Map wash</b><code>soft warm route</code></div><div style="background:linear-gradient(135deg,#251238,#4B1D67);color:white"><b>Dark summary</b><code>ink → deep purple</code></div></div>', ['Use gradients where screenshots show expressive app surfaces.', 'Keep paragraphs on solid cards for readability.']],
    ['typography','Typography','Bike app UI uses Nunito Sans for friendly, rounded, readable mobile components.','<div class="type-spec"><div class="type-card display"><label>Display heading</label><h1>Find your ride</h1></div><div class="type-card"><label>Screen title</label><h2>Nearby bikes</h2></div><div class="type-card"><label>Section title</label><h3>Popular providers</h3></div><div class="type-card"><label>Body copy</label><p>Compare availability, price and pickup details before you reserve.</p></div><div class="type-card"><label>Small body copy</label><small>Open until 7pm · 0.4 mi away</small></div><div class="type-card"><label>Label</label><span class="ui-label">Pickup location</span></div><div class="type-card"><label>Caption</label><span class="caption">Includes helmet and lock</span></div><div class="type-card"><label>Button text</label><button class="ds-btn primary">Reserve bike</button></div></div>', ['Use Nunito Sans for app previews, not Inter.', 'Use 800/900 weights for titles, labels, badges and buttons.'], ['Display: Nunito Sans 900','Title: Nunito Sans 800','Body: Nunito Sans 600','Caption: Nunito Sans 700'] ],
    ['spacing','Spacing','Spacing follows a compact mobile rhythm with roomy cards and touch-friendly controls.','<div class="spacing-scale"><span>4</span><span>8</span><span>12</span><span>16</span><span>20</span><span>24</span><span>32</span></div>', ['Use 16–24px internal card padding.', 'Keep at least 12px between stacked touch controls.']],
    ['radius','Radius','The prototype uses generous rounded cards, fully pill-shaped controls and soft sheet corners.','<div class="radius-grid"><span style="border-radius:14px">14px controls</span><span style="border-radius:20px">20px chips</span><span style="border-radius:28px">28px cards</span><span style="border-radius:999px">pill CTAs</span></div>', ['Cards and bottom sheets should feel soft and app-like.', 'Use pill radius for chips, badges and buttons.']],
    ['shadows','Shadows','Elevation is soft and purple-tinted, lifting cards, CTAs and sheets without harsh contrast.','<div class="shadow-grid"><span style="box-shadow:0 8px 20px rgba(75,29,103,.08)">Card</span><span style="box-shadow:var(--app-shadow)">Featured card</span><span style="box-shadow:0 -18px 40px rgba(75,29,103,.18)">Bottom sheet</span></div>', ['Use stronger elevation for overlays and selected cards.', 'Avoid grey generic shadows.']],
    ['iconography','Iconography','Icons are simple, rounded and paired with labels for wayfinding, search, verification and booking actions.','<div class="icon-row"><span>⌕<small>Search</small></span><span>⌖<small>Map</small></span><span>✓<small>Verified</small></span><span>♡<small>Saved</small></span><span>★<small>Rating</small></span></div>', ['Pair icons with visible text wherever possible.', 'Use icons to reinforce state, not replace labels.']]
  ]},
  { group: 'Components', items: [
    ['buttons','Buttons','Buttons are pill-shaped, bold and gradient-led for primary actions.','<div class="button-stack"><button class="ds-btn primary">Reserve bike</button><button class="ds-btn secondary">View details</button><button class="ds-btn ghost">Change filters</button><button class="ds-btn" disabled>Unavailable</button></div>', ['Primary CTAs use the sunset gradient and warm shadow.', 'Disabled buttons remain labelled and subdued.']],
    ['inputs','Inputs','Inputs are rounded white fields with persistent labels and clear values.','<div class="form-demo"><label><span>Pickup location</span><input value="Brighton Pier"></label><label><span>Date</span><input value="Today, 10:00"></label><label><span>Duration</span><input value="8 hours"></label></div>', ['Labels stay visible above values.', 'Fields use large tap targets and high-contrast text.']],
    ['search','Search','Search is a raised, rounded control that combines location intent with a clear action.','<div class="search-demo"><span>⌕ Search location or provider</span><button class="ds-btn primary">Search</button></div>', ['Make search easy to identify at the top of discovery screens.', 'Do not rely on placeholder text alone.']],
    ['filter-chips','Filter chips','Filter chips refine search results with white defaults and dark-purple selected states.','<div class="chips"><button class="chip">Open now</button><button class="chip active">Verified</button><button class="chip">E-bike</button><button class="chip active">Family-friendly</button><button class="chip" disabled>Unavailable</button></div>', ['Selected states change fill, text colour and border.', 'Disabled chips stay readable.']],
    ['category-chips','Category chips','Category chips represent bike types and browsing categories.','<div class="chips category-chips"><button class="chip active">🚲 City</button><button class="chip">⚡ E-bike</button><button class="chip">👨‍👩‍👧 Family</button><button class="chip">📦 Cargo</button><button class="chip">🏞 Trail</button></div>', ['Use short labels that scan quickly.', 'Selected categories should be visually obvious.']],
    ['badges','Badges','Badges show availability, trust and category status using semantic fills and text.','<div class="badges"><span class="badge available">✓ Available</span><span class="badge low">2 left · Low availability</span><span class="badge unavailable">Unavailable</span><span class="badge verified">✓ Verified</span><span class="badge family">Family-friendly</span></div>', ['Always include text, not colour alone.', 'Use badges sparingly on dense cards.']],
    ['availability-states','Availability states','Availability is represented consistently across badges, cards and map pins.','<div class="state-grid"><span class="good">✓ 12 available</span><span class="warn">2 left</span><span class="bad">Unavailable</span><article class="mini-card"><b>Ready today</b><span class="badge available">Available</span></article><article class="mini-card"><b>Almost gone</b><span class="badge low">Low availability</span></article><article class="mini-card disabled"><b>Not bookable</b><span class="badge unavailable">Unavailable</span></article></div>', ['Availability states must appear in words.', 'Low availability should prompt action without panic.']],
    ['provider-cards','Provider cards','Provider cards combine image-like colour blocks, name, rating, distance, availability and CTA.','<div class="card-grid"><article class="provider"><b>Harbour Cycle Hub</b><small>0.4 mi · ★ 4.9 · Open until 7pm</small><span class="badge available">12 bikes available</span><button class="ds-btn primary">Reserve</button></article><article class="provider selected"><b>Trailhead Rentals</b><small>1.1 mi · ★ 4.7</small><span class="badge verified">✓ Verified provider</span><button class="ds-btn secondary">View details</button></article><article class="provider unavailable-card"><b>Station Cycles</b><small>Closed today</small><span class="badge unavailable">Unavailable</span></article></div>', ['Lead with provider name and immediate availability.', 'Unavailable cards explain why they are subdued.']],
    ['bike-cards','Bike cards','Bike cards show bike type, use case, status and price in compact rounded cards.','<div class="card-grid"><article class="mini-card selected"><b>Hybrid bike</b><p>Comfort city option.</p><span class="badge available">Available</span><strong>£14/day</strong></article><article class="mini-card"><b>E-bike</b><p>Assisted longer routes.</p><span class="badge low">3 left</span><strong>£28/day</strong></article><article class="mini-card disabled"><b>Cargo bike</b><p>Family and shopping trips.</p><span class="badge unavailable">Unavailable</span><strong>£32/day</strong></article></div>', ['Show price with availability.', 'Selected cards need both border and shadow changes.']],
    ['booking-cards','Booking cards','Booking cards summarise the selected provider, bike and pickup window with edit actions.','<article class="booking-card"><b>Hybrid bike reserved</b><p>Harbour Cycle Hub · Today 10:00–18:00</p><span class="badge verified">✓ Helmet included</span><button class="ds-btn secondary">Edit booking</button></article>', ['Keep booking details in one glanceable card.', 'Use secondary actions for edits after selection.']],
    ['price-summary','Price summary','Price summaries use dark purple contrast, clear line items and a prominent total.','<div class="price-card"><div><span>Hybrid bike</span><b>£14</b></div><div><span>Helmet</span><b>£3</b></div><div><span>Service fee</span><b>£0</b></div><div><span>Total</span><b>£17</b></div></div>', ['Place totals after line items.', 'Avoid hiding required fees.']],
    ['navigation','Navigation','Mobile navigation uses rounded tabs with a gradient active state.','<nav class="bottom-nav" aria-label="App preview navigation"><a class="active">Search</a><a>Map</a><a>Saved</a><a>Trips</a></nav>', ['Use text labels with icons in production.', 'Keep the active state unmistakable.']],
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
    ['app-screens','App screens','Uploaded prototype screenshots are displayed alongside the component documentation as the visual source of truth.', screenGrid, ['Use these screens to compare colour, spacing, card shapes and navigation treatments.', 'Captions are inferred from file names and visible prototype flow.']]
  ]}
];

const nav = document.querySelector('#docs-nav');
const select = document.querySelector('#section-select');
const title = document.querySelector('#panel-title');
const category = document.querySelector('#panel-category');
const description = document.querySelector('#panel-description');
const preview = document.querySelector('#panel-preview');
const notes = document.querySelector('#panel-notes');
const tokens = document.querySelector('#panel-tokens');
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
  document.querySelectorAll('.docs-nav-link').forEach(link => {
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
