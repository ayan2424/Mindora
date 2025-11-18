;(function(global){
  var root = global.document;
  function percent(a,b){ return Math.round((Math.max(0,a)/Math.max(1,b))*100); }
  function srcsetFor(img){ var m = (img||'').match(/picsum\.photos\/seed\/[^/]+\/(\d+)\/(\d+)/); if (m){ var w = parseInt(m[1],10), h = parseInt(m[2],10); var twoX = img.replace(/\/\d+\/\d+$/, '/' + (w*2) + '/' + (h*2)); return img + ' 1x, ' + twoX + ' 2x'; } return ''; }
  function renderCard(c, prog){
    var p = prog ? percent((prog.completedLessons||[]).length, c.lessons.length) : 0;
    var btnText = prog ? (p===100?'Review':'Resume') : 'Enroll';
    var badgeClass = c.condition.indexOf('Hypertension')>-1?'text-bg-warning':c.condition.indexOf('Diabetes')>-1?'text-bg-info':c.condition.indexOf('Anxiety')>-1?'text-bg-success':c.condition.indexOf('Back')>-1?'text-bg-secondary':c.condition.indexOf('Obesity')>-1?'text-bg-danger':'text-bg-primary';
    var img = c.image || 'https://picsum.photos/seed/course-'+c.id+'/800/450';
    var ss = srcsetFor(img);
    var imgAttrs = 'class="card-img-top" src="'+img+'" alt="'+c.title+'" loading="lazy" decoding="async" sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"';
    if (ss) imgAttrs += ' srcset="'+ss+'"';
    return '<div class="card h-100 glass course-card" data-id="'+c.id+'"><img '+imgAttrs+'><div class="card-body"><span class="badge '+badgeClass+' mb-2">'+c.condition+'</span><h3 class="h6">'+c.title+'</h3><p class="text-muted">'+c.description+'</p><p class="text-muted mb-2"><small>'+c.duration+' • '+c.level+'</small></p><div class="progress rounded-pill mb-2" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p+'"><div class="progress-bar" style="width:'+p+'%"></div></div><button class="btn btn-primary rounded-pill">'+btnText+'</button></div></div>';
  }
  function init(gridSel, filterSel){
    var grid = root.querySelector(gridSel);
    var filters = root.querySelector(filterSel);
    fetch('/assets/data/courses.json').then(function(r){ return r.json(); }).then(function(courses){
      var html = courses.map(function(c){ return '<div class="col-12 col-md-6 col-lg-4">'+renderCard(c)+'</div>'; }).join('');
      grid.innerHTML = html;
      var cats = {};
      courses.forEach(function(c){ cats[c.condition]=true; });
      var allCats = Object.keys(cats);
      filters.innerHTML = ['<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn active" data-filter="all">All</a>'].concat(allCats.map(function(c){ return '<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn" data-filter="'+c+'">'+c+'</a>'; })).join('');
      grid.addEventListener('click', function(e){ var t = e.target; if (t && t.matches('button.btn-primary')){ e.preventDefault(); /* enroll/resume placeholder */ } });
      filters.addEventListener('click', function(e){ var t=e.target; if (!t.matches('.filter-btn')) return; e.preventDefault(); var f=t.getAttribute('data-filter'); Array.prototype.forEach.call(filters.querySelectorAll('.filter-btn'), function(x){ x.classList.remove('active'); }); t.classList.add('active'); var items = grid.querySelectorAll('.col-12'); Array.prototype.forEach.call(items, function(col){ var cond = col.querySelector('.badge')?.textContent || ''; col.style.display = (f==='all' || cond===f)?'':'none'; }); });
    }).catch(function(){ grid.innerHTML = '<div class="text-muted">No courses available.</div>'; });
  }
  global.Courses = { init: init };
})(window);
