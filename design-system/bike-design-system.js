const docs = [
  { group: 'Foundations', items: [
    ['overview','Overview','The system translates the bike hire prototype into reusable foundations, components and product patterns.','<div class="hero-preview"><span>Design tokens</span><strong>Confident, rounded and practical.</strong><p>Warm portfolio surfaces frame product UI examples without copying external design-system branding.</p></div>', ['Start with foundations before composing cards and flows.', 'Use the documentation as a prototype source of truth, not a production component library.'], ['Page surface #EFEFEF','Portfolio accent #C0414E','Bike CTA #C0414E'] ],
    ['brand','Brand','A friendly city-mobility voice with clear booking actions and trustworthy provider details.','<div class="brand-board"><div><b>Helpful</b><span>Guides discovery</span></div><div><b>Local</b><span>Supports provider choice</span></div><div><b>Direct</b><span>Makes booking clear</span></div></div>', ['Keep copy short and action-led.', 'Prioritise availability, distance and confidence signals.']],
    ['logo','Logo','Use a simple wordmark treatment for documentation and give product marks generous clear space.','<div class="logo-row"><div class="bike-logo">Dude, Where’s My Bike?</div><div class="bike-logo inverse">Dude, Where’s My Bike?</div></div>', ['Do not crowd the wordmark in cards.', 'Use dark text on light portfolio surfaces whenever possible.']],
    ['colours','Colours','A restrained palette bridges the portfolio style with the bike app’s status colours.','<div class="swatches"><div><i style="background:#C0414E"></i><b>Portfolio red</b><code>#C0414E</code></div><div><i style="background:#EFEFEF"></i><b>Portfolio grey</b><code>#EFEFEF</code></div><div><i style="background:#0C0D0F"></i><b>Ink</b><code>#0C0D0F</code></div><div><i style="background:#23856D"></i><b>Available</b><code>#23856D</code></div><div><i style="background:#B7791F"></i><b>Low stock</b><code>#B7791F</code></div><div><i style="background:#B42318"></i><b>Unavailable</b><code>#B42318</code></div></div>', ['Use portfolio red for documentation accents and primary actions.', 'Reserve semantic colours for status only.'], ['--brand: #C0414E','--surface: #EFEFEF','--ink: #0C0D0F']],
    ['gradients','Gradients','Gradients are subtle and editorial, supporting previews rather than overwhelming documentation.','<div class="gradient-grid"><div class="grad-a">Portfolio wash</div><div class="grad-b">Booking warmth</div><div class="grad-c">Map depth</div></div>', ['Use gradients in preview containers or hero moments.', 'Avoid making every component gradient-led.']],
    ['typography','Typography','Inter carries the portfolio and product UI with strong display headings and readable product labels.','<div class="type-card"><h1>Find bikes nearby</h1><h2>Compare trusted providers</h2><p>Book city, hybrid, cargo and e-bikes with clear pricing and availability.</p><label>Label text</label><small>Caption · Open until 7pm</small><button class="ds-btn primary">Button text</button></div>', ['Use tight letter spacing on large headings.', 'Keep labels concise and high contrast.'], ['Display 56/0.94','Body 16/1.6','Label 12 uppercase'] ],
    ['spacing','Spacing','An 8px-led rhythm keeps dense booking UI neat while matching the portfolio’s generous breathing room.','<div class="token-grid"><span>4</span><span>8</span><span>16</span><span>24</span><span>40</span><span>64</span></div>', ['Use larger spacing between documentation regions.', 'Use compact spacing inside product cards.'], ['4px','8px','16px','24px','40px','64px']],
    ['radius','Radius','Rounded cards and pill controls create a soft, approachable rental experience.','<div class="radius-grid"><span class="r8">8px</span><span class="r16">16px</span><span class="r28">28px</span><span class="pill">Pill</span></div>', ['Use pills for actions and chips.', 'Use 24–28px radius for major cards.']],
    ['shadows','Shadows','Soft shadows separate panels from the grey portfolio surface without feeling heavy.','<div class="shadow-grid"><span class="s1">Card</span><span class="s2">Floating</span><span class="s3">Sheet</span></div>', ['Keep shadows subtle and consistent.', 'Pair elevation with borders for accessibility.']],
    ['iconography','Iconography','Use simple rounded icons as support, never as the only label for critical actions.','<div class="icons"><span>⌕</span><span>⌖</span><span>★</span><span>✓</span><span>♡</span><span>↗</span></div>', ['Pair primary navigation icons with text.', 'Use consistent stroke weight in final product assets.']]
  ]},
  { group: 'Components', items: [
    ['buttons','Buttons','Actions are clear, tactile and aligned to booking priority.','<div class="button-stack"><button class="ds-btn primary">Primary button</button><button class="ds-btn secondary">Secondary button</button><button class="ds-btn ghost">Ghost button</button><button class="ds-btn" disabled>Disabled button</button></div>', ['Use one primary button per panel.', 'Minimum touch target height is 44px.', 'Disabled states must remain readable.']],
    ['inputs','Inputs','Inputs use visible labels, clear borders and accessible focus states.','<div class="form-demo"><label><span>Pickup location</span><input value="Brighton Station"></label><label class="error"><span>Promo code</span><input value="EXPIRED"><em>Try another code.</em></label></div>', ['Always show a label.', 'Put validation copy close to the input.']],
    ['search','Search','Search anchors discovery and supports location, provider and category queries.','<div class="search-demo"><span>Search location or provider</span><button class="ds-btn primary">Search</button></div>', ['Keep placeholder copy specific.', 'Provide a visible submit action on larger screens.']],
    ['filter-chips','Filter chips','Filters are compact controls for narrowing discovery results.','<div class="chips"><button class="chip active">Open now</button><button class="chip">Under £20</button><button class="chip">Verified</button><button class="chip" disabled>Child seats</button></div>', ['Show a strong selected state.', 'Allow horizontal scroll on narrow screens.']],
    ['category-chips','Category chips','Bike categories combine a short label and optional icon cue.','<div class="chips"><button class="chip active">City</button><button class="chip">E-bike</button><button class="chip">Family</button><button class="chip">Trail</button></div>', ['Use nouns rather than long descriptions.', 'Keep categories mutually understandable.']],
    ['badges','Badges','Badges communicate compact status details inside cards.','<div class="badges"><span class="badge ok">Verified</span><span class="badge good">8 available</span><span class="badge warn">2 left</span><span class="badge bad">Unavailable</span><span class="badge family">Family-friendly</span></div>', ['Use badges for status, not primary actions.', 'Keep badge text short.']],
    ['availability-states','Availability states','Availability states set expectation before a booking action appears.','<div class="state-grid"><span class="available">Available</span><span class="low">Low availability</span><span class="unavailable">Unavailable</span><span class="verified">Verified</span><span class="family">Family-friendly</span></div>', ['Use the same wording across cards and summaries.', 'Do not rely on colour alone.']],
    ['provider-cards','Provider cards','Provider cards compare trust, distance, ratings and the next action.','<div class="card-grid"><article class="provider"><b>Harbour Cycle Hub</b><small>0.4 mi · ★ 4.9</small><span class="badge good">12 bikes</span><button class="ds-btn primary">Book now</button></article><article class="provider verified"><b>Trailhead Rentals</b><small>1.1 mi · ★ 4.7</small><span class="badge ok">Verified</span><button class="ds-btn secondary">View details</button></article><article class="provider low-card"><b>Old Town Bikes</b><small>0.8 mi · ★ 4.5</small><span class="badge warn">Low availability</span></article><article class="provider unavailable-card"><b>Station Cycles</b><small>Closed today</small><span class="badge bad">Unavailable</span></article></div>', ['Lead with provider name, distance and availability.', 'Make unavailable cards visibly subdued but still legible.']],
    ['bike-cards','Bike cards','Bike cards show type, fit and price at a glance.','<div class="card-grid"><article class="mini-card selected"><b>Hybrid bike</b><p>Comfort city option.</p><strong>£14/day</strong></article><article class="mini-card"><b>E-bike</b><p>Assisted longer routes.</p><strong>£28/day</strong></article><article class="mini-card disabled"><b>Cargo</b><p>Currently unavailable.</p><strong>£32/day</strong></article></div>', ['Show price and availability together.', 'Use selected state before moving to booking.']],
    ['booking-cards','Booking cards','Booking cards summarise the selected bike, provider and pickup time.','<article class="booking-card"><b>Hybrid bike reserved</b><p>Harbour Cycle Hub · Today 10:00–18:00</p><button class="ds-btn secondary">Edit booking</button></article>', ['Support quick editing.', 'Keep the provider name prominent.']],
    ['price-summary','Price summary','Price summaries make fees transparent before confirmation.','<div class="price-card"><div><span>Bike hire</span><b>£14</b></div><div><span>Helmet</span><b>£3</b></div><div><span>Total</span><b>£17</b></div></div>', ['Place totals after line items.', 'Avoid hiding required fees.']],
    ['navigation','Navigation','Product navigation uses clear labels and a visible active destination.','<nav class="bottom-nav"><a class="active">Search</a><a>Map</a><a>Saved</a><a>Trips</a></nav>', ['Use text labels with icons in production.', 'Keep the active state unmistakable.']],
    ['map-pins','Map pins','Pins distinguish availability and verified providers on discovery maps.','<div class="map-demo"><span class="pin p1">8</span><span class="pin p2">✓</span><span class="pin p3">2</span></div>', ['Use numbers for available inventory.', 'Keep tap targets larger than the visual pin.']],
    ['bottom-sheets','Bottom sheets','Bottom sheets reveal contextual actions over map or search screens.','<div class="sheet-demo"><div class="sheet"><b>Harbour Cycle Hub</b><p>12 bikes available · 0.4 mi away</p><button class="ds-btn primary">Reserve</button></div></div>', ['Use a clear drag handle in the app.', 'Do not trap content below the fold.']],
    ['empty-states','Empty states','Empty states help users recover from no results or saved items.','<div class="empty"><b>No bikes match those filters</b><p>Try a wider pickup area or remove a filter.</p><button class="ds-btn secondary">Reset filters</button></div>', ['Explain what happened.', 'Offer one useful next step.']]
  ]},
  { group: 'Patterns', items: [
    ['search-discovery','Search and discovery','Discovery starts broad, then helps users refine by location, category and availability.','<div class="pattern-flow"><span>Search</span><span>Browse</span><span>Compare</span></div>', ['Keep search, filters and results visually connected.']],
    ['filtering','Filtering','Filtering should make the result set feel more useful, not hidden or confusing.','<div class="chips"><button class="chip active">Open now</button><button class="chip active">Verified</button><button class="chip">Family</button></div>', ['Show selected filters near results.', 'Provide a quick reset.']],
    ['provider-comparison','Provider comparison','Comparison prioritises availability, rating and distance before deeper details.','<div class="compare"><b>Provider</b><b>Status</b><b>Rating</b><span>Harbour Cycle Hub</span><span>12 bikes</span><span>★ 4.9</span><span>Trailhead Rentals</span><span>2 left</span><span>★ 4.7</span></div>', ['Make scannable differences obvious.', 'Do not over-weight rating over availability.']],
    ['booking-flow','Booking flow','The booking flow moves from bike choice to accessories, price review and confirmation.','<ol class="steps"><li>Choose</li><li>Customise</li><li>Review</li><li>Confirm</li></ol>', ['Confirm the user selection at each step.', 'Allow edits before payment or reservation.']],
    ['confirmation-flow','Confirmation flow','Confirmation pages reassure users and give them their next practical action.','<article class="booking-card"><b>Booking confirmed</b><p>Your hybrid bike is reserved for today at 10:00.</p><button class="ds-btn secondary">Add to calendar</button></article>', ['State what is booked and when.', 'Provide directions or calendar actions.']],
    ['saved-providers','Saved providers','Saved providers speed up repeat booking and create a trusted local shortlist.','<article class="mini-card selected"><b>♡ Harbour Cycle Hub</b><p>Saved · 12 bikes available today</p></article>', ['Use saved state consistently across cards and detail pages.']],
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
const menuToggle = document.querySelector('.portfolio-menu-toggle');
const header = document.querySelector('.site-header');
const dropdown = document.querySelector('#dropdown-menu');

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
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  header.classList.toggle('menu-open', !open);
  dropdown.classList.toggle('is-open', !open);
});

dropdown.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    header.classList.remove('menu-open');
    dropdown.classList.remove('is-open');
  }
});

renderSection(location.hash.replace('#', '') || 'overview');
