# Deployment Guide

## Prerequisites
- Static hosting supports `robots.txt`, `sitemap.xml`, and service workers
- HTTPS enabled (required for service workers)

## Build Artifacts
- CSS: `assets/css/app.min.css` (tokens, typography, spacing, components)
- JS: `assets/js/app.min.js` (header/footer loader, theme, hero, blog, accounts, courses)
- SW: `assets/js/sw.js` (cache-first for core assets)
- Data: `assets/data/courses.json`

## Steps
- Upload project root to hosting
- Ensure MIME types for `.css`, `.js`, `.json`, `.xml` are correct
- Verify `robots.txt` and `sitemap.xml` served from root
- Confirm service worker registration on `/index.html` and valid scope `/`

## Cache Busting
- Update query version `?v=1` on `app.min.css` and `app.min.js` when changes are published
- Bump SW cache name (e.g., `mindora-v2`) to force refresh

## Verification
- Open `/` and check:
  - Hero autoplay and controls
  - Header/footer load
  - Blog filters and search
  - Courses grid with filters and search
- Run PageSpeed Insights; aim for >85 mobile and desktop

## Rollback
- Keep previous build snapshot to restore if issues occur
