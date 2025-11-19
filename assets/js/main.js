(function(){
  window.__skipHeroInit = true;
  try{
    var key='mindora:theme';
    var saved = localStorage.getItem(key)||'';
    var sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initial = saved==='dark' ? 'dark' : saved==='light' ? 'light' : (sysDark?'dark':'light');
    document.documentElement.setAttribute('data-bs-theme', initial);
    var btn = document.getElementById('themeToggle');
    if (btn){ btn.addEventListener('click', function(){ var cur=document.documentElement.getAttribute('data-bs-theme')||'light'; var next=cur==='light'?'dark':'light'; document.documentElement.setAttribute('data-bs-theme', next); try{ localStorage.setItem(key, next); }catch(e){} }); }
  }catch(e){ document.documentElement.setAttribute('data-bs-theme','light'); }

  if (window.Components && typeof window.Components.init === 'function'){ window.Components.init(); }

  (function(){
    var sel = '.hero-image[data-bg], .page-hero .hero-media[data-bg]';
    var targets = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!targets.length) return;
    function applyBg(node){ var src = node.getAttribute('data-bg'); if (!src) return; var layer = 'radial-gradient(600px 300px at 20% 20%, rgba(124,58,237,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(34,211,238,.35), transparent 60%)'; node.style.backgroundImage = layer + ', url(' + src + ')'; }
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){ entries.forEach(function(ent){ if (ent.isIntersecting){ applyBg(ent.target); io.unobserve(ent.target); } }); }, { root: null, threshold: 0.15 });
      targets.forEach(function(n){ io.observe(n); });
    } else { targets.forEach(applyBg); }
  })();

  (function(){
    var hero = document.getElementById('hero');
    function update(){
      var mobileWidth = window.matchMedia('(max-width: 767.98px)').matches;
      var narrowAspect = (window.innerWidth / window.innerHeight) < (9/16);
      if (hero){ if (mobileWidth || narrowAspect){ hero.classList.add('compact-hero'); } else { hero.classList.remove('compact-hero'); } }
    }
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
  })();

  if (window.Swiper){
    var el = document.querySelector('.hero-carousel');
    if (el){
      var isMobile = window.matchMedia('(max-width: 767px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      var opts = { loop: true, speed: 800, parallax: true, autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }, a11y: { enabled: true, prevSlideMessage: 'Previous slide', nextSlideMessage: 'Next slide', slideLabelMessage: '{{index}} of {{slidesLength}}' }, allowTouchMove: isMobile, keyboard: { enabled: true, onlyInViewport: true }, pagination: { el: '.hero-pagination', clickable: true, dynamicBullets: true }, navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' }, on: { init: function(sw){ var slides = el.querySelectorAll('.swiper-slide'); slides.forEach(function(s,i){ s.setAttribute('role','group'); s.setAttribute('aria-label', (i+1)+' of '+slides.length); }); } } };
      var swiper = new Swiper(el, opts);
      window.addEventListener('resize', function(){ isMobile = window.matchMedia('(max-width: 767px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0; swiper.allowTouchMove = isMobile; });
      swiper.on('init', function(sw){ var slides = el.querySelectorAll('.swiper-slide'); slides.forEach(function(s,i){ s.setAttribute('role','group'); s.setAttribute('aria-label', (i+1)+' of '+slides.length); }); });
    }
    var quotesEl = document.querySelector('.quotes-swiper');
    if (quotesEl){
      var fraction = quotesEl.querySelector('.quotes-fraction');
      var wrapper = quotesEl.querySelector('.swiper-wrapper');
      var totalReal = quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)').length;
      if (!totalReal && wrapper){ wrapper.innerHTML = '<div class="swiper-slide"><div class="quote-card"><p class="lead mb-0">No testimonials available yet.</p></div></div>'; totalReal = 1; }
      var ds = quotesEl.dataset || {};
      var autoplayEnabled = String(ds.autoplay||'true') === 'true';
      var delayAttr = parseInt(ds.autoplayDelay, 10);
      var delay = isNaN(delayAttr) ? 4500 : Math.max(1500, delayAttr);
      var paginationEnabled = String(ds.pagination||'true') === 'true';
      var navigationEnabled = String(ds.navigation||'true') === 'true';
      var spMobile = parseInt(ds.slidesMobile||'1', 10);
      var spTablet = parseInt(ds.slidesTablet||'2', 10);
      var spDesktop = parseInt(ds.slidesDesktop||'3', 10);
      var space = parseInt(ds.space||'24', 10);
      var optsQ = { loop: true, loopAdditionalSlides: 3, speed: 600, autoplay: autoplayEnabled ? { delay: delay, disableOnInteraction: false, pauseOnMouseEnter: true } : false, centeredSlides: false, slidesPerView: 1, slidesPerGroup: 1, spaceBetween: space, grabCursor: true, keyboard: { enabled: true, onlyInViewport: true }, a11y: { enabled: true, prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial', paginationBulletMessage: 'Go to testimonial {{index}}' }, resistanceRatio: 0.85, longSwipesMs: 250, longSwipesRatio: 0.3, threshold: 8, preloadImages: false, lazy: { loadOnTransitionStart: true }, watchSlidesProgress: true, observer: true, observeParents: true, touchReleaseOnEdges: true, pagination: paginationEnabled ? { el: '.quotes-swiper .swiper-pagination', clickable: true } : false, navigation: navigationEnabled ? { nextEl: '.quotes-next', prevEl: '.quotes-prev' } : false, breakpoints: { 768: { slidesPerView: spTablet, slidesPerGroup: spTablet }, 1024: { slidesPerView: spDesktop, slidesPerGroup: spDesktop } }, on: { init: function(sw){ quotesEl.classList.remove('is-loading'); quotesEl.removeAttribute('aria-busy'); var total = quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)').length; var cur = (sw.realIndex||0)+1; if (fraction) fraction.textContent = cur + '/' + total; var realSlides = quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)'); realSlides.forEach(function(slide, i){ slide.setAttribute('role','group'); slide.setAttribute('aria-label', (i+1)+' of '+total); }); }, slideChange: function(sw){ var total = quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)').length; var cur = (sw.realIndex||0)+1; if (fraction) fraction.textContent = cur + '/' + total; }, touchStart: function(){ quotesEl.classList.add('is-interacting'); }, touchEnd: function(){ quotesEl.classList.remove('is-interacting'); } } };
      new Swiper(quotesEl, optsQ);
    }
  }

  (function(){
    var segs = window.location.pathname.split('/').filter(Boolean);
    var base = (window.location.hostname.endsWith('github.io') && segs.length>0) ? ('/' + segs[0]) : '';
    var our = document.getElementById('ourBlogsRow');
    if (!our) return;
    function fallback(){
      var items = [
        { title: 'Getting Started: Aerobics & Breath', category: 'Aerobics', excerpt: 'Gentle rhythm and paced breathing for beginners.', url: base + './pages/blog.html#start', image: './assets/img/posts/1.jpeg' },
        { title: 'Meditation Before Cardio', category: 'Meditation', excerpt: 'Calm breath warm‑up improves pacing and enjoyment.', url: base + './posts/Meditation/meditation-before-cardio.html', image: './assets/img/posts/2.jpeg' },
        { title: 'Nutrition for Training', category: 'Nutrition', excerpt: 'Fueling and hydration basics for comfortable sessions.', url: base + './posts/Nutrition/nutrition-for-cardio-training.html', image: './assets/img/posts/3.jpeg' }
      ];
      var html = items.map(function(p){ var aria = p.title; return '<div class="col-12 col-md-6 col-lg-4"><a class="text-decoration-none" href="'+p.url+'"><div class="blog-card"><div class="blog-card-img" role="img" aria-label="'+aria+'" style="background-image:url('+p.image+')"></div><div class="blog-card-body"><span class="badge text-bg-primary mb-2">'+p.category+'</span><h3 class="h6 mb-1">'+p.title+'</h3><p class="text-muted mb-0">'+p.excerpt+'</p></div></div></a></div>'; }).join('');
      our.innerHTML = html;
    }
    try{
      if (window.Blog && typeof Blog.loadAll==='function'){
        Blog.loadAll().then(function(posts){ if (posts && posts.length){ Blog.renderModernGrid('#ourBlogsRow', posts.slice(0,6)); } else { fallback(); } }).catch(fallback);
      } else { fallback(); }
    } catch(e){ fallback(); }
  })();
})();

(function(){
  var frames = Array.prototype.slice.call(document.querySelectorAll('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]'));
  if (!frames.length) return;
  function getId(src){ var m = (src||'').match(/embed\/([a-zA-Z0-9_-]{11})/); return m ? m[1] : ''; }
  function normalize(iframe, idx){
    var id = getId(iframe.getAttribute('src')||'');
    if (!id) return;
    var origin = window.location.origin;
    var params = 'rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin='+encodeURIComponent(origin);
    var newSrc = 'https://www.youtube-nocookie.com/embed/'+id+'?'+params;
    iframe.src = newSrc;
    iframe.setAttribute('loading','lazy');
    iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
    iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen','');
    if (!iframe.getAttribute('title')) iframe.setAttribute('title','YouTube video');
    iframe.id = iframe.id || ('yt-player-'+idx);
    var overlay = iframe.parentElement && iframe.parentElement.querySelector('.play-overlay');
    if (overlay){ overlay.style.pointerEvents = 'none'; }
  }
  frames.forEach(normalize);
  var tag = document.createElement('script'); tag.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = function(){
    frames.forEach(function(iframe){
      try{
        new YT.Player(iframe.id, {
          events: {
            'onReady': function(){ var overlay = iframe.parentElement && iframe.parentElement.querySelector('.play-overlay'); if (overlay){ overlay.style.opacity='0'; overlay.style.visibility='hidden'; } },
            'onError': function(){ var c = iframe.closest('.video-card') || iframe.parentElement; if (!c) return; var id = getId(iframe.src); var msg = document.createElement('div'); msg.className = 'p-3 text-center'; msg.innerHTML = '<div class="text-danger">Video unavailable</div><a class="btn btn-outline-primary rounded-pill mt-2" href="https://www.youtube.com/watch?v='+id+'" target="_blank" rel="noopener">Open on YouTube</a>'; c.appendChild(msg); }
          }
        });
      } catch(e){}
    });
  };
})();
