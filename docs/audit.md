# Website Audit

## Project Structure
- Root pages: `index.html`, `pages/` (courses, poses, videos, meditation, blog, books, account, style-guide, redesign-comparison, presentation)
- Components: `components/header.html`, `components/footer.html`
- Assets:
  - CSS: `assets/css/app.min.css`
  - JS: `assets/js/app.min.js`, `assets/js/sw.js`
  - Images: `assets/img/...`
  - Data: `assets/data/` (expected `courses.json`)
- Posts: `posts/` with category indexes and individual articles

## JavaScript Inventory
- Theme & lazy background: `app.min.js` (theme toggle, IntersectionObserver for hero/media)
- Header/footer loader: `Components.init()` loads `components/header.html` and `components/footer.html`
- Service worker: `sw.js` for cache‑first static assets
- Blog helpers: `Blog.*` for rendering grids, filters, and search
- Accounts shim: `Accounts.*` for local profile and activity
- Courses: `Courses.init()` to render course cards from `assets/data/courses.json`
- Index inline scripts: Swiper hero slideshow; breathing coach; stat counters

## Findings
- Hero carousel: full‑height, autoplay, fade transitions, keyboard, touch gestures, pause on hover
- Lazy loading: background images for heroes; `loading="lazy"` and `srcset` for thumbnails/cards
- Accessibility: focus rings, AA color pairs, keyboard navigation on hero
- SEO: meta descriptions and canonical links added to all major pages and posts

## Issues & Reproduction
- Courses data missing
  - Steps: open `/pages/courses.html` → grid shows “No courses available.”
  - Cause: `fetch('/assets/data/courses.json')` returns 404
  - Fix: add `assets/data/courses.json` or integrate API
- Development client request in logs
  - Steps: run local preview; terminal logs show `GET /@vite/client 404`
  - Cause: environment preview integration; not referenced by site code
  - Resolution: no action needed in production

## Recommendations
- Provide real course data; replace Picsum with curated images
- Add analytics and sitemap; consider Open Graph meta for social sharing
