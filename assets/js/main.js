;(function(){
window.__skipHeroInit=true;
try{var k='mindora:theme',s=localStorage.getItem(k)||'',sys=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches,init=s==='dark'?'dark':s==='light'?'light':(sys?'dark':'light');document.documentElement.setAttribute('data-bs-theme',init);var btn=document.getElementById('themeToggle');if(btn){btn.addEventListener('click',function(){var cur=document.documentElement.getAttribute('data-bs-theme')||'light',next=cur==='light'?'dark':'light';document.documentElement.setAttribute('data-bs-theme',next);try{localStorage.setItem(k,next)}catch(e){}})}}catch(e){document.documentElement.setAttribute('data-bs-theme','light')}
if(window.Components&&typeof window.Components.init==='function'){window.Components.init()}
(function(){var sel='.hero-image[data-bg], .page-hero .hero-media[data-bg]',targets=[].slice.call(document.querySelectorAll(sel));if(!targets.length)return;function applyBg(n){var src=n.getAttribute('data-bg');if(!src)return;var layer='radial-gradient(600px 300px at 20% 20%, rgba(124,58,237,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(34,211,238,.35), transparent 60%)';n.style.backgroundImage=layer+', url('+src+')'}if('IntersectionObserver'in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(ent){if(ent.isIntersecting){applyBg(ent.target);io.unobserve(ent.target)}})},{root:null,threshold:0.15});targets.forEach(function(n){io.observe(n)})}else{targets.forEach(applyBg)}})();
(function(){var input=document.getElementById('poseSearch'),btn=document.getElementById('poseSearchBtn');if(!input||!btn)return;var segs=window.location.pathname.split('/').filter(Boolean),base=(window.location.hostname.endsWith('github.io')&&segs.length?('/'+segs[0]):'');function go(){var q=(input.value||'').toLowerCase(),dest='/pages/poses.html',anchor='';if(/low|march/.test(q))anchor='#poses-by-type';else if(/step/.test(q))anchor='#poses-by-type';else if(/high.*knee|high-knee|knee march/.test(q))anchor='#poses-by-type';else if(/stress|relief/.test(q))anchor='#poses-by-benefit';else if(/heart|cardio/.test(q))anchor='#poses-by-benefit';else if(/arm|heel|reach/.test(q))anchor='#poses-general';else if(/core|leg|back|anatomy|knee lift/.test(q))anchor='#poses-by-anatomy';window.location.href=base+dest+(anchor||'')}btn.addEventListener('click',function(e){e.preventDefault();go()});input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();go()}});var suggest=document.getElementById('poseSuggest');if(!suggest)return;var data=[{label:'Low-impact march',anchor:'#poses-by-type'},{label:'Step-touch',anchor:'#poses-by-type'},{label:'High-knee march',anchor:'#poses-by-type'},{label:'Stress relief flow',anchor:'#poses-by-benefit'},{label:'Heart-health intervals',anchor:'#poses-by-benefit'},{label:'Arm circles',anchor:'#poses-general'},{label:'Heel digs',anchor:'#poses-general'},{label:'Standing knee lifts',anchor:'#poses-by-anatomy'}];function render(items){var html=items.map(function(it){var url=base+'/pages/poses.html'+it.anchor;return'<a class="item" href="'+url+'"><span>'+it.label+'</span><i class="bi bi-arrow-right"></i></a>'}).join('');suggest.innerHTML=html}function update(){var q=(input.value||'').trim().toLowerCase();if(!q){render(data.slice(0,6));return}var items=data.filter(function(d){return d.label.toLowerCase().indexOf(q)>=0}).slice(0,6);if(!items.length)items=data.slice(0,4);render(items)}update();input.addEventListener('input',update)})();
(function(){var hero=document.getElementById('hero');function update(){var mobile=window.matchMedia('(max-width: 767.98px)').matches,narrow=(window.innerWidth/window.innerHeight)<(9/16);if(hero){if(mobile||narrow){hero.classList.add('compact-hero')}else{hero.classList.remove('compact-hero')}}}update();window.addEventListener('resize',update);window.addEventListener('orientationchange',update)})();
if(window.Swiper){var el=document.querySelector('.hero-carousel');if(el){var isMobile=window.matchMedia('(max-width: 767px)').matches||('ontouchstart'in window)||navigator.maxTouchPoints>0;var opts={loop:true,speed:800,parallax:true,autoplay:{delay:5000,disableOnInteraction:false,pauseOnMouseEnter:true},a11y:{enabled:true,prevSlideMessage:'Previous slide',nextSlideMessage:'Next slide',slideLabelMessage:'{{index}} of {{slidesLength}}'},allowTouchMove:isMobile,keyboard:{enabled:true,onlyInViewport:true},pagination:{el:'.hero-pagination',clickable:true,dynamicBullets:true},navigation:{nextEl:'.hero-next',prevEl:'.hero-prev'},on:{init:function(sw){var slides=el.querySelectorAll('.swiper-slide');slides.forEach(function(s,i){s.setAttribute('role','group');s.setAttribute('aria-label',(i+1)+' of '+slides.length)})}}};var swiper=new Swiper(el,opts);window.addEventListener('resize',function(){isMobile=window.matchMedia('(max-width: 767px)').matches||('ontouchstart'in window)||navigator.maxTouchPoints>0;swiper.allowTouchMove=isMobile});swiper.on('init',function(sw){var slides=el.querySelectorAll('.swiper-slide');slides.forEach(function(s,i){s.setAttribute('role','group');s.setAttribute('aria-label',(i+1)+' of '+slides.length)})})}var quotesEl=document.querySelector('.quotes-swiper');if(quotesEl){var fraction=quotesEl.querySelector('.quotes-fraction'),wrapper=quotesEl.querySelector('.swiper-wrapper'),totalReal=quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)').length;if(!totalReal&&wrapper){wrapper.innerHTML='<div class="swiper-slide"><div class="quote-card"><p class="lead mb-0">No testimonials available yet.</p></div></div>';totalReal=1}var ds=quotesEl.dataset||{},autoplayEnabled=String(ds.autoplay||'true')==='true',delayAttr=parseInt(ds.autoplayDelay,10),delay=isNaN(delayAttr)?4500:Math.max(1500,delayAttr),paginationEnabled=String(ds.pagination||'true')==='true',navigationEnabled=String(ds.navigation||'true')==='true',spMobile=parseInt(ds.slidesMobile||'1',10),spTablet=parseInt(ds.slidesTablet||'2',10),spDesktop=parseInt(ds.slidesDesktop||'3',10),space=parseInt(ds.space||'24',10),optsQ={loop:true,loopAdditionalSlides:3,speed:600,autoplay:autoplayEnabled?{delay:delay,disableOnInteraction:false,pauseOnMouseEnter:true}:false,centeredSlides:false,slidesPerView:1,slidesPerGroup:1,spaceBetween:space,grabCursor:true,keyboard:{enabled:true,onlyInViewport:true},a11y:{enabled:true,prevSlideMessage:'Previous testimonial',nextSlideMessage:'Next testimonial',paginationBulletMessage:'Go to testimonial {{index}}'},resistanceRatio:0.85,longSwipesMs:250,longSwipesRatio:0.3,threshold:8,preloadImages:false,lazy:{loadOnTransitionStart:true},watchSlidesProgress:true,observer:true,observeParents:true,touchReleaseOnEdges:true,pagination:paginationEnabled?{el:'.quotes-swiper .swiper-pagination',clickable:true}:false,navigation:navigationEnabled?{nextEl:'.quotes-next',prevEl:'.quotes-prev'}:false,breakpoints:{768:{slidesPerView:spTablet,slidesPerGroup:spTablet},1024:{slidesPerView:spDesktop,slidesPerGroup:spDesktop}},on:{init:function(sw){quotesEl.classList.remove('is-loading');quotesEl.removeAttribute('aria-busy');var total=quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)').length,cur=(sw.realIndex||0)+1;if(fraction)fraction.textContent=cur+'/'+total;var realSlides=quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)');realSlides.forEach(function(slide,i){slide.setAttribute('role','group');slide.setAttribute('aria-label',(i+1)+' of '+total)})},slideChange:function(sw){var total=quotesEl.querySelectorAll('.swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)').length,cur=(sw.realIndex||0)+1;if(fraction)fraction.textContent=cur+'/'+total},touchStart:function(){quotesEl.classList.add('is-interacting')},touchEnd:function(){quotesEl.classList.remove('is-interacting')}}};new Swiper(quotesEl,optsQ)}}
(function(){var segs=window.location.pathname.split('/').filter(Boolean),base=(window.location.hostname.endsWith('github.io')&&segs.length?('/'+segs[0]):''),our=document.getElementById('ourBlogsRow');if(!our)return;function fallback(){var items=[{title:'Getting Started: Aerobics & Breath',category:'Aerobics',excerpt:'Gentle rhythm and paced breathing for beginners.',url:base+'/pages/blog.html#start',image:base+'/assets/img/posts/1.jpeg'},{title:'Meditation Before Cardio',category:'Meditation',excerpt:'Calm breath warm‑up improves pacing and enjoyment.',url:base+'/posts/Meditation/meditation-before-cardio.html',image:base+'/assets/img/posts/2.jpeg'},{title:'Nutrition for Training',category:'Nutrition',excerpt:'Fueling and hydration basics for comfortable sessions.',url:base+'/posts/Nutrition/nutrition-for-cardio-training.html',image:base+'/assets/img/posts/3.jpeg'}];var html=items.map(function(p){var aria=p.title;return'<div class="col-12 col-md-6 col-lg-4"><a class="text-decoration-none" href="'+p.url+'"><div class="blog-card"><div class="blog-card-img" role="img" aria-label="'+aria+'" style="background-image:url('+p.image+')"></div><div class="blog-card-body"><span class="badge text-bg-primary mb-2">'+p.category+'</span><h3 class="h6 mb-1">'+p.title+'</h3><p class="text-muted mb-0">'+p.excerpt+'</p></div></div></a></div>'}).join('');our.innerHTML=html}try{if(window.Blog&&typeof Blog.loadAll==='function'){Blog.loadAll().then(function(posts){if(posts&&posts.length){Blog.renderModernGrid('#ourBlogsRow',posts.slice(0,3))}else{fallback()}}).catch(fallback)}else{fallback()}}catch(e){fallback()}})();
})();
(function(){
  var frames=[].slice.call(document.querySelectorAll('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]'));
  if(!frames.length) return;
  function getId(src){var m=(src||'').match(/embed\/([a-zA-Z0-9_-]{11})/);return m?m[1]:''}
  function normalize(iframe,idx){
    var id=getId(iframe.getAttribute('src')||''); if(!id) return;
    var origin=window.location.origin,
        params='rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin='+encodeURIComponent(origin),
        newSrc='https://www.youtube-nocookie.com/embed/'+id+'?'+params;
    iframe.src=newSrc;
    iframe.setAttribute('loading','lazy');
    iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
    iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen','');
    if(!iframe.getAttribute('title')) iframe.setAttribute('title','YouTube video');
    iframe.id=iframe.id||('yt-player-'+idx);
    var overlay=iframe.parentElement&&iframe.parentElement.querySelector('.play-overlay');
    if(overlay){ overlay.style.pointerEvents='none'; }
  }
  frames.forEach(normalize);
  function initPlayers(){
    frames.forEach(function(iframe){
      try{
        new YT.Player(iframe.id,{
          events:{
            onReady:function(){
              var overlay=iframe.parentElement&&iframe.parentElement.querySelector('.play-overlay');
              if(overlay){ overlay.style.opacity='0'; overlay.style.visibility='hidden'; }
            },
            onError:function(){
              var c=iframe.closest('.video-card')||iframe.parentElement; if(!c) return;
              var id=getId(iframe.src);
              var msg=document.createElement('div');
              msg.className='p-3 text-center';
              msg.innerHTML='<div class="text-danger">Video unavailable</div><a class="btn btn-outline-primary rounded-pill mt-2" href="https://www.youtube.com/watch?v='+id+'" target="_blank" rel="noopener">Open on YouTube</a>';
              c.appendChild(msg);
            }
          }
        });
      }catch(e){}
    });
  }
  var hasApiScript = !!document.querySelector('script[src*="youtube.com/iframe_api"]');
  if (window.YT && typeof window.YT.Player==='function'){
    // API already available; initialize immediately
    initPlayers();
  } else {
    // Set callback for when API becomes ready
    window.onYouTubeIframeAPIReady = initPlayers;
    // Inject API script only if not already present
    if(!hasApiScript){
      var tag=document.createElement('script');
      tag.src='https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }
})();
