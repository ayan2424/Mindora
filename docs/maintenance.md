# Maintenance

## Routine Tasks
- Update `assets/data/courses.json` with new courses
- Replace Picsum URLs with curated images and update `srcset`
- Review accessibility with WAVE on key pages
- Re-run PageSpeed after changes; fix regressions

## SW Cache Updates
- When assets change, update `assets/js/sw.js` cache name and re-deploy

## Content Updates
- Blog posts: maintain meta description and canonical
- Add to `sitemap.xml` when new pages/posts are added

## Troubleshooting
- Header/footer not loading: check path `/components/...` and hosting base URL
- Courses empty: ensure `assets/data/courses.json` exists and valid JSON
- Hero backgrounds not loading: confirm `data-bg` URLs and HTTPS
- Service worker not registering: confirm HTTPS and file path `/assets/js/sw.js`
