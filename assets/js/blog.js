<<<<<<< HEAD
;(function(g){
  function qs(s){return g.document.querySelector(s)}
  function doc(h){var d=g.document.implementation.createHTMLDocument('x');d.documentElement.innerHTML=h;return d}
  function ft(u){return g.fetch(u,{headers:{'Accept':'text/html'}}).then(function(r){return r.text()})}
  var segs=g.location.pathname.split('/').filter(Boolean),base=(g.location.hostname.endsWith('github.io')&&segs.length?('/'+segs[0]):'');

  function scanDirs(){
    return ft(base+'../../posts/').then(function(h){
      var d=doc(h);
      var a=[].slice.call(d.querySelectorAll('a'));
      var dirs=a.map(function(x){return x.getAttribute('href')||''})
        .filter(function(h){return/\/$/.test(h)})
        .map(function(h){return h.replace(/\/?$/,'')});
      return dirs;
    });
  }

  function scanFiles(dir){
    return ft(base+'../../posts/'+dir+'/').then(function(h){
      var d=doc(h);
      var a=[].slice.call(d.querySelectorAll('a'));
      var files=a.map(function(x){return x.getAttribute('href')||''})
        .filter(function(h){return/\.html?$/.test(h)});
      return files.map(function(f){return{dir:dir,file:f,url:base+'../../posts/'+dir+'/'+f}})
    });
  }

  function resolveImageUrl(img, pageUrl){
    try{ if(!img) return '';
      if(/^https?:\/\//.test(img)) return img;
      var abs=new URL(img, g.location.origin + pageUrl);
      return abs.pathname; // site-relative path
    }catch(e){ return img; }
  }

  function fetchMeta(item){
    return ft(item.url).then(function(h){
      var d=doc(h);
      var t=(d.querySelector('title')&&d.querySelector('title').textContent)||
             (d.querySelector('h1')&&d.querySelector('h1').textContent)||
             item.file.replace(/\.html?$/,'').replace(/[-_]/g,' ');
      var m=(d.querySelector('meta[name="description"]')&&d.querySelector('meta[name="description"]').getAttribute('content'))||
             (d.querySelector('p')&&d.querySelector('p').textContent)||'';
      var slug=item.file.replace(/\.html?$/,'');
      var og=(d.querySelector('meta[property="og:image"]')&&d.querySelector('meta[property="og:image"]').getAttribute('content'))||'';
      var fi=(d.querySelector('img.featured-image')&&d.querySelector('img.featured-image').getAttribute('src'))||'';
      var pi=(d.querySelector('.post-hero img')&&d.querySelector('.post-hero img').getAttribute('src'))||'';
      var any=(d.querySelector('img')&&d.querySelector('img').getAttribute('src'))||'';
      var img=og||fi||pi||any;
      img=resolveImageUrl(img, item.url);
      if(!img){ img='/assets/img/featured/placeholder.jpeg'; }
      return{title:t,category:item.dir,categories:[item.dir],url:item.url,excerpt:m,image:img};
    }).catch(function(){
      var slug=item.file.replace(/\.html?$/,'');
      return{title:slug.replace(/[-_]/g,' '),category:item.dir,categories:[item.dir],url:item.url,excerpt:'',image:'/assets/img/featured/placeholder.jpeg'}
    });
  }

  function cget(){
    try{var raw=g.localStorage.getItem('mindora:blog_index');if(!raw)return null;var obj=JSON.parse(raw);if(!obj||!obj.posts||!obj.ts)return null;var fresh=(Date.now()-obj.ts)<3600*1000;return fresh?obj.posts:null}catch(e){return null}
  }
  function cset(posts){
    try{g.localStorage.setItem('mindora:blog_index',JSON.stringify({ts:Date.now(),posts:posts||[]}))}catch(e){}
  }

  function scanPosts(){
    var cached=cget(); if(cached) return Promise.resolve(cached);
    return scanDirs().then(function(dirs){ return Promise.all(dirs.map(scanFiles)); })
      .then(function(list){ var items=[].concat.apply([],list); return Promise.all(items.map(fetchMeta)); })
      .then(function(posts){ cset(posts); return posts; })
  }

  function renderGrid(target,posts){
    var el=typeof target==='string'?qs(target):target; if(!el) return;
    var html=posts.map(function(p){
      var src=p.image||'/assets/img/featured/placeholder.jpeg';
      var src2x=(p.image2x||src);
      return '<div class="col-12 col-md-6 col-lg-4"><div class="card h-100 glass">'+
             '<img class="card-img-top" src="'+src+'" srcset="'+src+' 1x, '+src2x+' 2x" sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw" loading="lazy" decoding="async" alt="'+(p.title||'Post')+'">'+
             '<div class="card-body"><span class="badge text-bg-primary mb-2">'+(p.category||'Post')+'</span><h3 class="h6">'+(p.title||'Untitled')+'</h3><p class="text-muted">'+(p.excerpt||'')+'</p><a class="btn btn-outline-primary rounded-pill" href="'+(p.url||'#')+'">Read</a></div></div></div>';
    }).join('');
    el.innerHTML=html;
  }

  function renderTop(target,posts,n){ renderGrid(target,posts.slice(0,n||3)); }

  function renderModernGrid(target,posts){
    var el=typeof target==='string'?qs(target):target; if(!el) return;
    var html=posts.map(function(p){
      var src=p.image||'/assets/img/featured/placeholder.jpeg';
      var aria=(p.title||'Post');
      return '<div class="col-12 col-md-6 col-lg-4"><a class="text-decoration-none" href="'+(p.url||'#')+'">'+
             '<div class="blog-card"><div class="blog-card-img" role="img" aria-label="'+aria+'" style="background-image:url('+src+')"></div>'+
             '<div class="blog-card-body"><span class="badge text-bg-primary mb-2">'+(p.category||'Post')+'</span><h3 class="h6 mb-1">'+(p.title||'Untitled')+'</h3><p class="text-muted mb-0">'+(p.excerpt||'')+'</p></div></div></a></div>';
    }).join('');
    el.innerHTML=html;
  }

  function renderModernTop(target,posts,n){ renderModernGrid(target,posts.slice(0,n||3)); }

  function loadAll(){
    function fallback(){
      return [
        {title:'Aerobics Basics: Breathing and Rhythm',category:'Aerobics',categories:['Aerobics'],url:'../../posts/Aerobics/aerobics-basics.html',excerpt:'Breathing rhythm, low‑impact patterns, and gradual progressions.',image:'/assets/img/posts/1.jpeg'},
        {title:'Beginner 7-Day Aerobics Plan',category:'Aerobics',categories:['Aerobics'],url:'../../posts/Aerobics/beginner-7-day-aerobics-plan.html',excerpt:'Seven‑day structure combining gentle movement and breath.',image:'/assets/img/featured/2.jpeg'},
        {title:'Stress Relief with Breathing',category:'Breathing',categories:['Breathing'],url:'../../posts/Breathing/stress-relief-with-breathing.html',excerpt:'Paced exhale and mindful awareness to downshift stress.',image:'/assets/img/featured/3.jpeg'},
        {title:'Better Aerobic Breathing',category:'Breathing',categories:['Breathing'],url:'../../posts/Breathing/better-aerobic-breathing.html',excerpt:'Nasal inhale, longer exhale, and steady rhythm techniques.',image:'/assets/img/posts/2.jpeg'},
        {title:'Heart Health Aerobic Tips',category:'Health',categories:['Health'],url:'../../posts/Health/heart-health-aerobic-tips.html',excerpt:'Warm‑ups, gentle intervals, and breathing guidance.',image:'/assets/img/featured/1.jpeg'},
        {title:'Benefits of Meditation for Daily Life',category:'Meditation',categories:['Meditation'],url:'../../posts/Meditation/benefits-of-meditation.html',excerpt:'Reduce stress and improve focus with simple routines.',image:'/assets/img/posts/3.jpeg'},
        {title:'Meditation Before Cardio',category:'Meditation',categories:['Meditation'],url:'../../posts/Meditation/meditation-before-cardio.html',excerpt:'Calm breath warm‑up to improve pacing and enjoyment.',image:'/assets/img/posts/2.jpeg'},
        {title:'Nutrition for Cardio Training',category:'Nutrition',categories:['Nutrition'],url:'../../posts/Nutrition/nutrition-for-cardio-training.html',excerpt:'Hydration, fueling basics, and session planning.',image:'/assets/img/posts/3.jpeg'},
        {title:'Poses for Back Pain',category:'Poses',categories:['Poses'],url:'../../posts/Poses/poses-for-back-pain.html',excerpt:'Supportive movements and do’s/don’ts for relief.',image:'/assets/img/featured/4.jpeg'}
      ];
    }
    return scanPosts().then(function(posts){
      if (!posts || !posts.length) return fallback();
      return posts;
    }).catch(function(){
      return fallback();
    });
  }
  

  function getCategories(posts){ var s={}; posts.forEach(function(p){ if(p.category) s[p.category]=true; }); return Object.keys(s); }

  function renderCategoryChips(target,cats){
    var el=typeof target==='string'?qs(target):target; if(!el) return;
    var chips=['<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn active" data-filter="all">All</a>']
      .concat(cats.map(function(c){return '<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn" data-filter="'+c+'">'+c+'</a>'; }));
    el.innerHTML=chips.join('');
  }

  function addLocalPost(meta){ var cached=cget()||[]; cached.unshift(meta); cset(cached); }

  g.Blog={ loadAll:loadAll, renderGrid:renderGrid, renderTop:renderTop, renderModernGrid:renderModernGrid, renderModernTop:renderModernTop, getCategories:getCategories, renderCategoryChips:renderCategoryChips, addLocalPost:addLocalPost, scanPosts:scanPosts };
})(window);
=======
;(function(g){function qs(s){return g.document.querySelector(s)}function doc(h){var d=g.document.implementation.createHTMLDocument('x');d.documentElement.innerHTML=h;return d}function ft(u){return g.fetch(u,{headers:{'Accept':'text/html'}}).then(function(r){return r.text()})}var segs=g.location.pathname.split('/').filter(Boolean),base=(g.location.hostname.endsWith('github.io')&&segs.length?('/'+segs[0]):'');function scanDirs(){return ft(base+'/posts/').then(function(h){var d=doc(h);var a=[].slice.call(d.querySelectorAll('a'));var dirs=a.map(function(x){return x.getAttribute('href')||''}).filter(function(h){return/\/$/.test(h)}).map(function(h){return h.replace(/\/?$/,'')});return dirs})}function scanFiles(dir){return ft(base+'/posts/'+dir+'/').then(function(h){var d=doc(h);var a=[].slice.call(d.querySelectorAll('a'));var files=a.map(function(x){return x.getAttribute('href')||''}).filter(function(h){return/\.html?$/.test(h)});return files.map(function(f){return{dir:dir,file:f,url:base+'/posts/'+dir+'/'+f}})})}function fetchMeta(item){return ft(item.url).then(function(h){var d=doc(h);var t=(d.querySelector('title')&&d.querySelector('title').textContent)||(d.querySelector('h1')&&d.querySelector('h1').textContent)||item.file.replace(/\.html?$/,'').replace(/[-_]/g,' ');var m=(d.querySelector('meta[name="description"]')&&d.querySelector('meta[name="description"]').getAttribute('content'))||(d.querySelector('p')&&d.querySelector('p').textContent)||'';var slug=item.file.replace(/\.html?$/,'');var img='https://picsum.photos/seed/'+encodeURIComponent(slug)+'/800/400';return{title:t,category:item.dir,categories:[item.dir],url:item.url,excerpt:m,image:img}}).catch(function(){var slug=item.file.replace(/\.html?$/,'');return{title:slug.replace(/[-_]/g,' '),category:item.dir,categories:[item.dir],url:item.url,excerpt:'',image:'https://picsum.photos/seed/'+encodeURIComponent(slug)+'/800/400'}})}function cget(){try{var raw=g.localStorage.getItem('mindora:blog_index');if(!raw)return null;var obj=JSON.parse(raw);if(!obj||!obj.posts||!obj.ts)return null;var fresh=(Date.now()-obj.ts)<3600*1000;return fresh?obj.posts:null}catch(e){return null}}function cset(posts){try{g.localStorage.setItem('mindora:blog_index',JSON.stringify({ts:Date.now(),posts:posts||[]}))}catch(e){}}function scanPosts(){var cached=cget();if(cached)return Promise.resolve(cached);return scanDirs().then(function(dirs){return Promise.all(dirs.map(scanFiles))}).then(function(list){var items=[].concat.apply([],list);return Promise.all(items.map(fetchMeta))}).then(function(posts){cset(posts);return posts})}function renderGrid(target,posts){var el=typeof target==='string'?qs(target):target;if(!el)return;var html=posts.map(function(p){var src=p.image||'https://picsum.photos/seed/post/800/400';var src2x=(p.image2x||src.replace('/800/400','/1600/800'));return'<div class="col-12 col-md-6 col-lg-4"><div class="card h-100 glass"><img class="card-img-top" src="'+src+'" srcset="'+src+' 1x, '+src2x+' 2x" sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw" loading="lazy" decoding="async" alt="'+(p.title||'Post')+'"><div class="card-body"><span class="badge text-bg-primary mb-2">'+(p.category||'Post')+'</span><h3 class="h6">'+(p.title||'Untitled')+'</h3><p class="text-muted">'+(p.excerpt||'')+'</p><a class="btn btn-outline-primary rounded-pill" href="'+(p.url||'#')+'">Read</a></div></div></div>'}).join('');el.innerHTML=html}function renderTop(target,posts,n){renderGrid(target,posts.slice(0,n||3))}function renderModernGrid(target,posts){var el=typeof target==='string'?qs(target):target;if(!el)return;var html=posts.map(function(p){var src=p.image||'https://picsum.photos/seed/post/800/400';var aria=(p.title||'Post');return'<div class="col-12 col-md-6 col-lg-4"><a class="text-decoration-none" href="'+(p.url||'#')+'"><div class="blog-card"><div class="blog-card-img" role="img" aria-label="'+aria+'" style="background-image:url('+src+')"></div><div class="blog-card-body"><span class="badge text-bg-primary mb-2">'+(p.category||'Post')+'</span><h3 class="h6 mb-1">'+(p.title||'Untitled')+'</h3><p class="text-muted mb-0">'+(p.excerpt||'')+'</p></div></div></a></div>'}).join('');el.innerHTML=html}function renderModernTop(target,posts,n){renderModernGrid(target,posts.slice(0,n||3))}function loadAll(){return scanPosts().catch(function(){var posts=[{title:'Aerobics Basics: Breathing and Rhythm',category:'Aerobics',categories:['Aerobics'],url:'/posts/Aerobics/aerobics-basics.html',excerpt:'Breathing rhythm, low‑impact patterns, and gradual progressions.',image:'https://picsum.photos/seed/aerobics-basics/800/400'},{title:'Beginner 7-Day Aerobics Plan',category:'Aerobics',categories:['Aerobics'],url:'/posts/Aerobics/beginner-7-day-aerobics-plan.html',excerpt:'Seven‑day structure combining gentle movement and breath.',image:'https://picsum.photos/seed/aerobics-plan/800/400'},{title:'Stress Relief with Breathing',category:'Breathing',categories:['Breathing'],url:'/posts/Breathing/stress-relief-with-breathing.html',excerpt:'Paced exhale and mindful awareness to downshift stress.',image:'https://picsum.photos/seed/breathing-stress/800/400'},{title:'Better Aerobic Breathing',category:'Breathing',categories:['Breathing'],url:'/posts/Breathing/better-aerobic-breathing.html',excerpt:'Nasal inhale, longer exhale, and steady rhythm techniques.',image:'https://picsum.photos/seed/better-breathing/800/400'},{title:'Heart Health Aerobic Tips',category:'Health',categories:['Health'],url:'/posts/Health/heart-health-aerobic-tips.html',excerpt:'Warm‑ups, gentle intervals, and breathing guidance.',image:'https://picsum.photos/seed/heart-health/800/400'},{title:'Benefits of Meditation for Daily Life',category:'Meditation',categories:['Meditation'],url:'/posts/Meditation/benefits-of-meditation.html',excerpt:'Reduce stress and improve focus with simple routines.',image:'https://picsum.photos/seed/meditation-benefits/800/400'},{title:'Meditation Before Cardio',category:'Meditation',categories:['Meditation'],url:'/posts/Meditation/meditation-before-cardio.html',excerpt:'Calm breath warm‑up to improve pacing and enjoyment.',image:'https://picsum.photos/seed/meditation-before/800/400'},{title:'Nutrition for Cardio Training',category:'Nutrition',categories:['Nutrition'],url:'/posts/Nutrition/nutrition-for-cardio-training.html',excerpt:'Hydration, fueling basics, and session planning.',image:'https://picsum.photos/seed/nutrition-cardio/800/400'},{title:'Poses for Back Pain',category:'Poses',categories:['Poses'],url:'/posts/Poses/poses-for-back-pain.html',excerpt:'Supportive movements and do’s/don’ts for relief.',image:'https://picsum.photos/seed/poses-back/800/400'}];return Promise.resolve(posts)})}function getCategories(posts){var s={};posts.forEach(function(p){if(p.category)s[p.category]=true});return Object.keys(s)}function renderCategoryChips(target,cats){var el=typeof target==='string'?qs(target):target;if(!el)return;var chips=['<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn active" data-filter="all">All</a>'].concat(cats.map(function(c){return'<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn" data-filter="'+c+'">'+c+'</a>'}));el.innerHTML=chips.join('')}function addLocalPost(meta){var cached=cget()||[];cached.unshift(meta);cset(cached)}g.Blog={loadAll:loadAll,renderGrid:renderGrid,renderTop:renderTop,renderModernGrid:renderModernGrid,renderModernTop:renderModernTop,getCategories:getCategories,renderCategoryChips:renderCategoryChips,addLocalPost:addLocalPost,scanPosts:scanPosts}})(window);
>>>>>>> parent of fa62660 (new big update with more fixes part 1)
