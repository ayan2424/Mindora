self.addEventListener('install',event=>{
  event.waitUntil(caches.open('mindora-v1').then(cache=>cache.addAll([
    '/assets/css/app.min.css',
    '/assets/js/app.min.js',
    '/components/header.html',
    '/components/footer.html',
    '/index.html'
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
