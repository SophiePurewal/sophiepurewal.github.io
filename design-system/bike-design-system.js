const docs = [
  { group: 'Foundations', items: [
    ['overview','Overview','The system documents the live bike hire prototype as a warm, rounded, gradient-led mobile product system.','<div class="hero-preview"><span>App design language</span><strong>Warm gradients, soft cards and direct booking actions.</strong><p>Orange, coral, pink and purple create the app atmosphere while white cards keep search and booking tasks readable.</p></div>', ['Use portfolio styling for the page shell only.', 'Use Nunito Sans and app tokens inside every product component preview.'], ['App font: Nunito Sans','Gradient: #FF9F1C → #FF6B5F → #FF4F9A → #7B2CBF','Ink: #251238'] ],
    ['brand','Brand','Friendly, useful and local: the app helps people find a bike quickly without losing trust cues.','<div class="brand-board"><div><b>Warm</b><span>Gradient-led surfaces and optimistic actions.</span></div><div><b>Trustworthy</b><span>Verified providers, ratings and clear availability.</span></div><div><b>Practical</b><span>Search, compare and reserve with minimal friction.</span></div></div>', ['Keep the product tone helpful and plain-spoken.', 'Pair expressive colour with practical booking information.']],
    ['logo','Logo','The product wordmark is treated as bold app UI, with generous rounded containers and high contrast.','<div class="logo-row"><div class="bike-logo">Dude, Where’s My Bike?</div><div class="bike-logo inverse">Dude, Where’s My Bike?</div></div>', ['Use the gradient version on light documentation surfaces.', 'Use dark purple when the logo needs calmer contrast.']],
    ['colours','Colours','App tokens focus on a warm orange-to-purple palette plus semantic availability colours.','<div class="swatches"><div><i style="background:#FF9F1C"></i><b>Orange</b><code>#FF9F1C</code></div><div><i style="background:#FF6B5F"></i><b>Coral</b><code>#FF6B5F</code></div><div><i style="background:#FF4F9A"></i><b>Pink</b><code>#FF4F9A</code></div><div><i style="background:#7B2CBF"></i><b>Purple</b><code>#7B2CBF</code></div><div><i style="background:#251238"></i><b>Dark purple ink</b><code>#251238</code></div><div><i style="background:#FFF7ED"></i><b>Cream surface</b><code>#FFF7ED</code></div><div><i style="background:#159A72"></i><b>Available</b><code>#159A72</code></div><div><i style="background:#B85C00"></i><b>Low availability</b><code>#B85C00</code></div><div><i style="background:#C9364C"></i><b>Unavailable</b><code>#C9364C</code></div></div>', ['Do not use portfolio red for app components.', 'Reserve green, amber and red for status labels and supporting states.'], ['--app-orange: #FF9F1C','--app-coral: #FF6B5F','--app-pink: #FF4F9A','--app-purple: #7B2CBF','--app-ink: #251238'] ],
    ['gradients','Gradients','Primary app moments use a warm blend from orange through coral and pink into purple.','<div class="gradient-grid"><div style="background:var(--app-gradient);color:white">Primary app gradient</div><div style="background:linear-gradient(135deg,#FFE8B8,#FFD2D9 48%,#E8D7FF)">Map wash</div><div style="background:linear-gradient(135deg,#251238,#4B1D67);color:white">Dark sheet</div></div>', ['Use gradients on hero, primary buttons, pins and selected navigation.', 'Keep dense text on solid light or dark surfaces.']],
    ['typography','Typography','App components use Nunito Sans for rounded, friendly labels, cards and controls.','<div class="type-card"><h1>Find your ride</h1><h2>Compare nearby providers</h2><p>Book city, hybrid, cargo and e-bikes with visible pricing and availability.</p><label>Provider label</label><small>Open until 7pm · 0.4 mi away</small><br><button class="ds-btn primary">Reserve bike</button></div>', ['Use Nunito Sans in all app examples.', 'Use bold weights for action labels and provider names.'], ['Display: Nunito Sans 800/900','Body: Nunito Sans 400/600','Labels: Nunito Sans 900'] ],
    ['radius','Radius','Rounded corners make cards and controls feel approachable and tappable.','<div class="radius-grid"><span style="border-radius:14px">14</span><span style="border-radius:20px">20</span><span style="border-radius:28px">28</span><span style="border-radius:999px">Pill</span></div>', ['Use larger radii for cards and sheets.', 'Use pill radius for chips, badges and primary CTAs.']],
    ['elevation','Elevation','Soft purple shadows lift cards and sticky surfaces without making the UI feel heavy.','<div class="shadow-grid"><span style="box-shadow:0 8px 20px rgba(75,29,103,.08)">Card</span><span style="box-shadow:var(--app-shadow)">CTA/Card</span><span style="box-shadow:0 -18px 40px rgba(75,29,103,.18)">Bottom sheet</span></div>', ['Keep elevation soft and warm.', 'Use stronger shadows for overlays and featured cards.']]
  ]},
  { group: 'Components', items: [
    ['buttons','Buttons','Buttons are pill-shaped, bold and either gradient-filled, cream secondary or text-only.','<div class="button-stack"><button class="ds-btn primary">Reserve bike</button><button class="ds-btn secondary">View details</button><button class="ds-btn ghost">Change filters</button><button class="ds-btn" disabled>Unavailable</button></div>', ['Primary buttons use the app gradient and a warm shadow.', 'Disabled buttons are visibly muted and remain labelled.']],
    ['inputs','Inputs','Inputs use rounded white cards with warm focus surfaces and clear labels.','<div class="form-demo"><label><span>Pickup location</span><input value="Brighton Pier"></label><label><span>Date</span><input value="Today, 10:00"></label></div>', ['Make fields large enough for touch.', 'Labels stay visible above values.']],
    ['search','Search bar','The discovery search component is a raised rounded control with a clear action.','<div class="search-demo"><span>⌕ Search location or provider</span><button class="ds-btn primary">Search</button></div>', ['Keep the search action visually connected to the field.', 'Do not rely on placeholder text alone.']],
    ['filter-chips','Filter chips','Filter chips use white default states and dark purple selected states.','<div class="chips"><button class="chip">Open now</button><button class="chip active">Verified</button><button class="chip">E-bike</button><button class="chip active">Family-friendly</button><button class="chip" disabled>Unavailable</button></div>', ['Selected state must include colour and contrast change.', 'Disabled chips remain readable but cannot be mistaken for active.']],
    ['badges','Badges','Badges label trust, category and availability states with semantic colour and text.','<div class="badges"><span class="badge available">✓ Available</span><span class="badge low">2 left · Low availability</span><span class="badge unavailable">Unavailable</span><span class="badge verified">✓ Verified</span><span class="badge family">Family-friendly</span></div>', ['Always include text, not colour alone.', 'Use badges sparingly on dense cards.']],
    ['provider-cards','Provider cards','Provider cards compare availability, rating, distance, verification and the next CTA.','<div class="card-grid"><article class="provider"><b>Harbour Cycle Hub</b><small>0.4 mi · ★ 4.9 · Open until 7pm</small><span class="badge available">12 bikes available</span><button class="ds-btn primary">Reserve</button></article><article class="provider selected"><b>Trailhead Rentals</b><small>1.1 mi · ★ 4.7</small><span class="badge verified">✓ Verified provider</span><button class="ds-btn secondary">View details</button></article><article class="provider"><b>Old Town Bikes</b><small>0.8 mi · ★ 4.5</small><span class="badge low">2 bikes left</span></article><article class="provider unavailable-card"><b>Station Cycles</b><small>Closed today</small><span class="badge unavailable">Unavailable</span></article></div>', ['Lead with provider name and immediate availability.', 'Unavailable cards are subdued but still explain the state.']],
    ['bike-cards','Bike cards','Bike cards show type, use case, availability and price in compact rounded cards.','<div class="card-grid"><article class="mini-card selected"><b>Hybrid bike</b><p>Comfort city option.</p><span class="badge available">Available</span><strong>£14/day</strong></article><article class="mini-card"><b>E-bike</b><p>Assisted longer routes.</p><span class="badge low">3 left</span><strong>£28/day</strong></article><article class="mini-card disabled"><b>Cargo bike</b><p>Family and shopping trips.</p><span class="badge unavailable">Unavailable</span><strong>£32/day</strong></article></div>', ['Show price with availability.', 'Selected cards need both border and shadow changes.']],
    ['booking-cards','Booking cards','Booking cards summarise provider, bike, pickup window and edit actions.','<article class="booking-card"><b>Hybrid bike reserved</b><p>Harbour Cycle Hub · Today 10:00–18:00</p><span class="badge verified">✓ Helmet included</span><button class="ds-btn secondary">Edit booking</button></article>', ['Keep key booking details in one glanceable card.', 'Use secondary actions for edits after selection.']],
    ['price-summary','Price summary','Price summaries use a dark purple surface with clear rows and a prominent total.','<div class="price-card"><div><span>Hybrid bike</span><b>£14</b></div><div><span>Helmet</span><b>£3</b></div><div><span>Service fee</span><b>£0</b></div><div><span>Total</span><b>£17</b></div></div>', ['Place totals after line items.', 'Avoid hiding required fees.']],
    ['navigation','Navigation','Mobile navigation uses rounded tabs, simple labels and a gradient active state.','<nav class="bottom-nav"><a class="active">Search</a><a>Map</a><a>Saved</a><a>Trips</a></nav>', ['Use text labels with icons in production.', 'Keep the active state unmistakable.']],
    ['map-pins','Map pins','Pins distinguish availability, verified providers and low-stock locations on maps.','<div class="map-demo"><span class="pin p1">8</span><span class="pin p2">✓</span><span class="pin p3">2</span></div>', ['Use numbers for available inventory.', 'Keep tap targets larger than the visual pin.']],
    ['bottom-sheets','Bottom sheets','Bottom sheets reveal contextual actions over map or search screens.','<div class="sheet-demo"><div class="sheet"><b>Harbour Cycle Hub</b><p>12 bikes available · 0.4 mi away · ★ 4.9</p><button class="ds-btn primary">Reserve bike</button></div></div>', ['Use a clear draggable sheet treatment in app screens.', 'Do not trap content below the fold.']]
  ]},
  { group: 'Patterns', items: [
    ['search-discovery','Search and discovery','Discovery starts broad, then helps users refine by location, category and availability.','<div class="pattern-flow"><span>Search</span><span>Browse map</span><span>Compare providers</span></div>', ['Keep search, filters and results visually connected.']],
    ['filtering','Filtering','Filtering should make the result set feel more useful, not hidden or confusing.','<div class="chips"><button class="chip active">Open now</button><button class="chip active">Verified</button><button class="chip">Family</button><button class="chip">E-bike</button></div>', ['Show selected filters near results.', 'Provide a quick reset.']],
    ['provider-comparison','Provider comparison','Comparison prioritises availability, rating and distance before deeper details.','<div class="compare"><b>Provider</b><b>Status</b><b>Rating</b><span>Harbour Cycle Hub</span><span>12 bikes</span><span>★ 4.9</span><span>Trailhead Rentals</span><span>2 left</span><span>★ 4.7</span></div>', ['Make scannable differences obvious.', 'Do not over-weight rating over availability.']],
    ['booking-flow','Booking flow','The booking flow moves from bike choice to accessories, price review and confirmation.','<ol class="steps"><li>Choose</li><li>Customise</li><li>Review</li><li>Confirm</li></ol>', ['Confirm the user selection at each step.', 'Allow edits before payment or reservation.']],
    ['confirmation-flow','Confirmation flow','Confirmation pages reassure users and give them their next practical action.','<article class="booking-card"><b>Booking confirmed</b><p>Your hybrid bike is reserved for today at 10:00.</p><button class="ds-btn secondary">Add to calendar</button></article>', ['State what is booked and when.', 'Provide directions or calendar actions.']],
    ['saved-providers','Saved providers','Saved providers speed up repeat booking and create a trusted local shortlist.','<article class="mini-card selected"><b>♡ Harbour Cycle Hub</b><p>Saved · 12 bikes available today</p><span class="badge available">Available</span></article>', ['Use saved state consistently across cards and detail pages.']],
    ['reviews-ratings','Reviews and ratings','Reviews support confidence but should sit beside concrete provider details.','<div class="review"><strong>★ 4.9</strong><p>Friendly team, quick pickup, child seat ready.</p><small>Based on 128 rides</small></div>', ['Summarise review sentiment.', 'Avoid replacing safety or availability details with ratings.']]
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
  if (doc.tokens.length) {
    tokens.hidden = false;
    tokens.innerHTML = `<h3>Token values</h3>${doc.tokens.map(token => `<code>${token}</code>`).join('')}`;
  } else {
    tokens.hidden = true;
    tokens.innerHTML = '';
  }
  document.querySelectorAll('.docs-nav-link').forEach(link => link.classList.toggle('is-active', link.dataset.section === doc.id));
  select.value = doc.id;
  if (updateHash) history.replaceState(null, '', `#${doc.id}`);
}

select.addEventListener('change', event => renderSection(event.target.value, true));
renderSection(location.hash.replace('#', '') || 'overview');
