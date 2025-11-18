# Troubleshooting

## Common Issues
- 404 for `/@vite/client`
  - Cause: Dev client requested by preview environment
  - Resolution: No action; not referenced in production assets

- Blog grid empty
  - Cause: `Blog.loadAll()` returns an empty list in demo
  - Resolution: Implement data source or statically list posts

- Courses not rendering
  - Cause: Missing `assets/data/courses.json`
  - Resolution: Add JSON file; validate fields `id,title,description,duration,level,condition,image,lessons`

- Theme toggle not persisting
  - Cause: LocalStorage disabled
  - Resolution: Falls back to light theme; enable storage or polyfill

## Diagnostics
- Check browser console for fetch errors
- Confirm network responses for `/assets/css/app.min.css`, `/assets/js/app.min.js`, `/assets/js/sw.js`
- Use Lighthouse for performance and accessibility
