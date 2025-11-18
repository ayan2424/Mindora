;(function(global){
  var LS_KEY = 'mindora:courses';
  function read(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||'[]'); }catch(e){ return []; } }
  function write(v){ try{ localStorage.setItem(LS_KEY, JSON.stringify(v||[])); }catch(e){} }
  function merge(base){ var local = read(); var map = {}; base.forEach(function(c){ map[c.id]=c; }); local.forEach(function(c){ map[c.id]=c; }); return Object.keys(map).map(function(k){ return map[k]; }); }
  function list(){ return fetch('/assets/data/courses.json').then(function(r){ return r.json(); }).then(function(base){ return merge(base); }).catch(function(){ return merge([]); }); }
  function create(course){ var cur = read(); cur.push(course); write(cur); return Promise.resolve(course); }
  function update(course){ var cur = read(); var idx = cur.findIndex(function(c){ return c.id===course.id; }); if (idx>-1) cur[idx]=course; else cur.push(course); write(cur); return Promise.resolve(course); }
  function remove(id){ var cur = read().filter(function(c){ return c.id!==id; }); write(cur); return Promise.resolve(true); }
  function init(gridSel, filterSel){ list().then(function(courses){
      var grid = document.querySelector(gridSel);
      var filters = document.querySelector(filterSel);
      if (!grid || !filters) return;
      function percent(a,b){ return Math.round((Math.max(0,a)/Math.max(1,b))*100); }
      function srcsetFor(img){ var m = (img||'').match(/picsum\.photos\/seed\/[^/]+\/(\d+)\/(\d+)/); if (m){ var w = parseInt(m[1],10), h = parseInt(m[2],10); var twoX = img.replace(/\/\d+\/\d+$/, '/' + (w*2) + '/' + (h*2)); return img + ' 1x, ' + twoX + ' 2x'; } return ''; }
      function renderCard(c, prog){ var p = prog ? percent((prog.completedLessons||[]).length, c.lessons.length) : 0; var btnText = prog ? (p===100?'Review':'Resume') : 'Enroll'; var badgeClass = c.condition.indexOf('Hypertension')>-1?'text-bg-warning':c.condition.indexOf('Diabetes')>-1?'text-bg-info':c.condition.indexOf('Anxiety')>-1?'text-bg-success':c.condition.indexOf('Back')>-1?'text-bg-secondary':c.condition.indexOf('Obesity')>-1?'text-bg-danger':'text-bg-primary'; var img = c.image || 'https://picsum.photos/seed/course-'+c.id+'/800/450'; var ss = srcsetFor(img); var imgAttrs = 'class="card-img-top" src="'+img+'" alt="'+c.title+'" loading="lazy" decoding="async" sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"'; if (ss) imgAttrs += ' srcset="'+ss+'"'; return '<div class="card h-100 glass course-card" data-id="'+c.id+'"><img '+imgAttrs+'><div class="card-body"><span class="badge '+badgeClass+' mb-2">'+c.condition+'</span><h3 class="h6">'+c.title+'</h3><p class="text-muted">'+c.description+'</p><p class="text-muted mb-2"><small>'+c.duration+' • '+c.level+'</small></p><div class="progress rounded-pill mb-2" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p+'"><div class="progress-bar" style="width:'+p+'%"></div></div><button class="btn btn-primary rounded-pill">'+btnText+'</button></div></div>'; }
      var cats = {}; courses.forEach(function(c){ cats[c.condition]=true; });
      filters.innerHTML = ['<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn active" data-filter="all">All</a>'].concat(Object.keys(cats).map(function(c){ return '<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn" data-filter="'+c+'">'+c+'</a>'; })).join('');
      var html = courses.map(function(c){ return '<div class="col-12 col-md-6 col-lg-4">'+renderCard(c)+'</div>'; }).join('');
      grid.innerHTML = html;
      filters.addEventListener('click', function(e){ var t=e.target; if (!t.matches('.filter-btn')) return; e.preventDefault(); var f=t.getAttribute('data-filter'); Array.prototype.forEach.call(filters.querySelectorAll('.filter-btn'), function(x){ x.classList.remove('active'); }); t.classList.add('active'); Array.prototype.forEach.call(grid.children, function(col){ var cond = col.querySelector('.badge')?.textContent || ''; col.style.display = (f==='all'||cond===f)?'':'none'; }); });
      grid.addEventListener('click', function(e){ var t=e.target; if (t && t.matches('button.btn-primary')){ var id = t.closest('.course-card')?.getAttribute('data-id'); if (id && global.Accounts && typeof global.Accounts.enroll==='function'){ global.Accounts.enroll(id); t.textContent='Resume'; } } });
    }); }
  global.CourseStore = { list:list, create:create, update:update, remove:remove };
  // prefer local store rendering on courses page
  if (document.querySelector('#courseGrid') && document.querySelector('#courseFilters')){ init('#courseGrid','#courseFilters'); }
})(window);
