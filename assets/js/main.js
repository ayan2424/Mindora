(function(){
  document.documentElement.setAttribute('data-bs-theme', 'light');

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
      var opts = { loop: true, speed: 800, autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }, a11y: { enabled: true }, allowTouchMove: isMobile, keyboard: { enabled: true, onlyInViewport: true }, pagination: { el: '.hero-pagination', clickable: true, dynamicBullets: true }, navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' } };
      var swiper = new Swiper(el, opts);

      window.addEventListener('resize', function(){ isMobile = window.matchMedia('(max-width: 767px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0; swiper.allowTouchMove = isMobile; });
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
    var our = document.getElementById('ourBlogsRow');
    if (!our) return;
    function fallback(){
      var items = [
        { title: 'Getting Started: Aerobics & Breath', category: 'Aerobics', excerpt: 'Gentle rhythm and paced breathing for beginners.', url: '/pages/blog.html#start', image: 'https://picsum.photos/seed/blog-fallback-1/800/400' },
        { title: 'Meditation Before Cardio', category: 'Meditation', excerpt: 'Calm breath warm‑up improves pacing and enjoyment.', url: '/posts/Meditation/meditation-before-cardio.html', image: 'https://picsum.photos/seed/blog-fallback-2/800/400' },
        { title: 'Nutrition for Training', category: 'Nutrition', excerpt: 'Fueling and hydration basics for comfortable sessions.', url: '/posts/Nutrition/nutrition-for-cardio-training.html', image: 'https://picsum.photos/seed/blog-fallback-3/800/400' }
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
