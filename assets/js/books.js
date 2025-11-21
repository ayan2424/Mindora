/* Books Index & PDF Viewer */
(function(){
  var BooksIndex = {
    // Load manifest; compute base for GitHub Pages
    load: async function(){
      var segs=window.location.pathname.split('/').filter(Boolean);
      var base=(window.location.hostname.endsWith('github.io')&&segs.length?('/'+segs[0]):'');
      var url = base + '/assets/data/books.json';
      try{
        var res = await fetch(url);
        if(!res.ok) throw new Error('HTTP '+res.status);
        var list = await res.json();
        return list.map(function(b){
          return {
            title: b.title,
            author: b.author||'',
            category: b.category||'General',
            pdf: base + (b.pdf||''),
            image: base + (b.image||'/assets/img/featured/2.jpeg'),
            description: b.description||''
          };
        });
      }catch(e){
        console.warn('BooksIndex.load fallback', e);
        return [
          { title:'Breathing Basics', author:'Mindora', category:'Breathing', pdf: base + '/assets/books/breathing-basics.pdf', image: base + '/assets/img/featured/3.jpeg', description:'Fundamentals of breath mechanics for everyday calm.' },
          { title:'Aerobic Training Guide', author:'Mindora', category:'Aerobics', pdf: base + '/assets/books/aerobic-training-guide.pdf', image: base + '/assets/img/featured/1.jpeg', description:'Safe cardio progressions with weekly plans.' },
          { title:'Meditation Primer', author:'Mindora', category:'Meditation', pdf: base + '/assets/books/meditation-primer.pdf', image: base + '/assets/img/featured/2.jpeg', description:'Gentle techniques to build a daily practice.' }
        ];
      }
    },

    renderCard: function(b){
      return [
        '<div class="col-12 col-sm-6 col-md-4">',
          '<a href="#" class="text-decoration-none js-open-pdf" data-pdf="'+b.pdf.replace(/"/g,'&quot;')+'" data-title="'+(b.title.replace(/"/g,'&quot;'))+'">',
            '<div class="card h-100 glass">',
              '<div class="card-media ratio ratio-16x9">',
                '<img src="'+b.image+'" alt="'+b.title+'">',
                '<div class="badge-position"><span class="badge text-bg-primary">PDF</span></div>',
              '</div>',
              '<div class="card-body">',
                '<h5 class="mb-1">'+b.title+'</h5>',
                '<p class="text-muted small mb-2">'+(b.author?('by '+b.author+' • '):'')+b.description+'</p>',
                '<div class="meta">',
                  '<span><i class="bi bi-book me-1"></i>'+b.category+'</span>',
                '</div>',
              '</div>',
            '</div>',
          '</a>',
        '</div>'
      ].join('');
    },

    renderGrid: function(selector, books){
      var el = document.querySelector(selector);
      if(!el) return;
      el.classList.add('row','g-4','blogs-grid');
      el.innerHTML = books.map(BooksIndex.renderCard).join('');
    },

    buildFilters: function(selector, books){
      var el = document.querySelector(selector);
      if(!el) return;
      var cats = Array.from(new Set(books.map(function(b){ return b.category||'General'; })));
      var html = ['<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn active" data-filter="all">All</a>']
        .concat(cats.map(function(c){ return '<a href="#" class="btn btn-outline-secondary rounded-pill filter-btn" data-filter="'+c+'">'+c+'</a>'; }))
        .join('');
      el.innerHTML = html;
    },

    applyFilters: function(gridSel, searchSel, filterSel){
      var $grid = $(gridSel);
      var $filters = $(filterSel);
      var term = ($(searchSel).val()||'').toLowerCase();
      var cat = ($filters.find('.filter-btn.active').data('filter')||'all');
      $grid.children().each(function(){
        var $col = $(this);
        var title = ($col.find('h5, h3').first().text()||'');
        var desc = ($col.find('.text-muted').first().text()||'');
        var text = (title+' '+desc).toLowerCase();
        var badge = ($col.find('.badge').first().text()||'PDF');
        var matchText = !term || text.indexOf(term)>-1;
        var matchCat = (cat==='all') || (desc.toLowerCase().indexOf(cat.toLowerCase())>-1);
        $col.css('display', (matchText && matchCat) ? '' : 'none');
      });
    },

    openPdf: function(url, title){
      $('#pdfTitle').text(title||'');
      $('#pdfFrame').attr('src', url);
      $('#downloadPdf').attr('href', url).attr('download', title? (title.replace(/\s+/g,'-').toLowerCase()+'.pdf') : 'book.pdf');
      var newTabUrl=url;
      $('#openInNewTab').attr('href', newTabUrl).attr('target','_blank');
      var m = new bootstrap.Modal(document.getElementById('pdfViewerModal'));
      m.show();
    },

    init: async function(gridSel, searchSel, filterSel){
      var books = await BooksIndex.load();
      BooksIndex.renderGrid(gridSel, books);
      BooksIndex.buildFilters(filterSel, books);
      // Events
      $(document).on('click', filterSel+' .filter-btn', function(e){ e.preventDefault(); $(filterSel+' .filter-btn').removeClass('active'); $(this).addClass('active'); BooksIndex.applyFilters(gridSel, searchSel, filterSel); });
      $(searchSel).on('input', function(){ BooksIndex.applyFilters(gridSel, searchSel, filterSel); });
      $(document).on('click', '.js-open-pdf', function(e){ e.preventDefault(); var url=$(this).data('pdf'); var title=$(this).data('title'); BooksIndex.openPdf(url, title); });
      // Auto-open viewer from query params (e.g., ?open=Title or ?pdf=/path/to.pdf)
      BooksIndex.autoOpenFromQuery(books);
    }
  };
  // Helper: auto open from query params
  BooksIndex.autoOpenFromQuery = function(books){
    try{
      var params = new URLSearchParams(window.location.search);
      var pdf = params.get('pdf');
      var openTitle = params.get('open');
      if(pdf){ BooksIndex.openPdf(pdf, openTitle||''); return; }
      if(openTitle){
        var match = books.find(function(b){ return (b.title||'').toLowerCase() === openTitle.toLowerCase(); });
        if(match){ BooksIndex.openPdf(match.pdf, match.title); }
      }
    }catch(e){ console.warn('BooksIndex.autoOpenFromQuery error', e); }
  };
  window.BooksIndex = BooksIndex;
})();