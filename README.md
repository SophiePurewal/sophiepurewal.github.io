# Financial Services Platform Case Study (Private Working Copy)

This private repository contains a standalone working copy of the Financial Services Platform case study from Sophie Purewal’s portfolio.

It is intended for private editing, source-screenshot storage and anonymised portfolio mock-up preparation only. GitHub Pages and public deployment are not enabled in this repository.

## Included files

- `index.html` — standalone case-study page.
- `assets/css/case-study.css` — required styles for the page layout, responsive behaviour, dark mode, focus states and navigation.
- `assets/js/case-study.js` — required navigation and dark-mode interactions.
- `assets/icons/favicon.svg` — local favicon used by the page.
- `assets/screenshots/reference/` — private source screenshots; do not publish client-sensitive or non-anonymised images.
- `assets/images/portfolio/` — anonymised portfolio-ready mock-ups and visual assets.

## Preview locally

From the repository root, run a local static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

You can also open `index.html` directly in a browser, but a local server is preferred because it more closely matches browser behaviour for static assets.

## Editing notes

- Keep this repository private.
- Do not enable GitHub Pages or any public deployment.
- Store non-anonymised reference screenshots only in `assets/screenshots/reference/`.
- Store anonymised, portfolio-safe mock-ups only in `assets/images/portfolio/`.
- Preserve semantic HTML, visible focus styles, keyboard navigation, responsive layout and dark-mode behaviour when editing.
