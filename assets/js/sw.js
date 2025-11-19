self.addEventListener('install',event=>{
  const segs = self.location.pathname.split('/').filter(Boolean);
  const base = (self.location.hostname.endsWith('github.io') && segs.length>0) ? ('/' + segs[0]) : '';
  event.waitUntil(caches.open('mindora-v1').then(cache=>cache.addAll([
    base + '/assets/css/style.css',
    base + '/assets/css/color.css',
    base + '/assets/css/dark.css',
    base + '/assets/js/app.min.js',
    base + '/components/header.html',
    base + '/components/footer.html',
    base + '/index.html'
  ])));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  event.respondWith(
    caches.match(req).then(cached=>{
      const fetchPromise=fetch(req).then(res=>{
        const copy=res.clone();
        if(req.url.includes('/assets/')&&res.ok){
          caches.open('mindora-v1').then(cache=>cache.put(req,copy));
        }
        return res;
      }).catch(()=>cached);
      return cached||fetchPromise;
    })
  );
});
