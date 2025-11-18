## Audit Summary
- JavaScript (pure JS):
  - Theme toggle `addEventListener` aur `localStorage` in `index.html:110–119`
  - Header/Footer injection via `fetch(...).then(...)` in `index.html:122–127`
- CSS (custom styles):
  - Inline style block `index.html:7–76` with classes: `.nav`, `.nav-links`, `.brand`, `.btn-signup`, `.hero`, `.footer-content`, `.theme-toggle`, etc.
- Markup components:
  - Header HTML (custom nav) `components/header.html:1–24`
  - Footer HTML (custom grid) `components/footer.html:1–27`

## Conversion Strategy
- Bootstrap + jQuery ko CDN se include karna (minified + SRI):
  - `<link>`: Bootstrap 5.3 CSS (head)
  - `<script>`: jQuery 3.7 (before closing `</body>`), Bootstrap 5.3 JS (after jQuery)
- JavaScript ko jQuery mein rewrite aur modularize:
  - Theme toggle: `$('#themeToggle').on('click', ...)` with `data-bs-theme` (Bootstrap 5.3 dark mode) + `localStorage`
  - Component injection: `$('#header').load('components/header.html')` and `$('#footer').load('components/footer.html')`
  - JS ko `assets/js/main.js` mein move; `index.html` se inline `<script>` remove
- CSS ko Bootstrap classes se replace karna:
  - Layout: `container`, `row`, `col`, `d-flex`, `gap-*`, `rounded-*`, `shadow`, `border`, `sticky-top`
  - Navbar: `navbar`, `navbar-expand-lg`, `navbar-brand`, `navbar-nav`, `nav-item`, `nav-link`, `btn`
  - Footer: `container`, `row`, `col`, `nav`, `list-unstyled`, `text-muted`
  - Custom visuals (gradient background, lotus logo fill, floating toggle) ko `assets/css/custom.css` mein shift karna aur minimally maintain karna
- Responsive design:
  - Navbar collapse (hamburger) enable with Bootstrap toggler
  - Footer links ko responsive grid mein organize

## File & Folder Organization
- New directories:
  - `assets/js/main.js` (all site JS)
  - `assets/css/custom.css` (overrides + bespoke visuals)
- Update files:
  - `index.html`: CDN includes, remove inline `<style>`/`<script>`, Bootstrap grid for hero, mount points `#header`, `#footer` remain
  - `components/header.html`: Bootstrap navbar markup + signup as `btn btn-primary`
  - `components/footer.html`: Bootstrap container/row/col structure + links as `nav`/`nav-link`
- Naming conventions:
  - BEM-style custom classes only where Bootstrap se cover nahi hota
  - Logical sections par comments (JS/CSS) add

## Detailed Steps
1. Head mein Bootstrap CSS add; body end se pehle jQuery + Bootstrap JS add
2. Inline CSS ko `assets/css/custom.css` mein move, Bootstrap utility classes apply karke bloat reduce
3. Inline JS ko `assets/js/main.js` mein move; jQuery equivalents likhna:
   - Theme toggle: `data-bs-theme` switch + persist
   - Components load: jQuery `load()`
4. Header ko Bootstrap navbar mein refactor; links: Home, Poses, Courses, Meditation, Blog, About; CTA: Sign up (gradient optional via custom CSS)
5. Footer ko Bootstrap grid + nav mein refactor; current year JS se set
6. Accessibility: aria-labels, focus states, color contrast verify
7. Comments/documentation: JS functions ke upar doc comments; CSS sections ke upar brief notes

## Testing Plan
- Cross-browser: Chrome, Firefox, Edge
- Mobile responsiveness: iPhone/Android viewport widths; navbar collapse/toggle behavior
- Functional tests:
  - Theme toggle persists aur Bootstrap dark mode ke sath compatible (`data-bs-theme`)
  - Header/Footer load without CORS errors
  - Links focus/hover states consistent

## Performance & Delivery
- CDN minified assets with SRI + `crossorigin` set
- Unused custom CSS/JS remove
- Lighthouse pass: Performance, Accessibility, Best Practices
- Optional: images/SVGs ko optimize

## Acceptance Criteria
- Pure JS → jQuery; inline scripts/styles removed
- Bootstrap classes drive layout; custom CSS sirf visuals/brand ke liye
- Mobile-first responsive navbar + grid
- Theme toggle works with Bootstrap `data-bs-theme` and persists
- Clear comments in JS/CSS; modular, maintainable structure