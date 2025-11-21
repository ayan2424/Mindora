/*
  Course Indexer
  - Scans /courses/<Category>/**.html
  - Extracts metadata from <meta> tags inside course pages
  - Renders modern cards into any container

  Usage:
    CourseIndex.scanAll().then(courses => {
      CourseIndex.renderModernGrid('#courseGrid', courses);
    })
*/
(function(){
  const CourseIndex = {
    categories: ['Hypertension','Anxiety','Glucose'],
    // Discover course pages by convention
    async discover(){
      const discovered = [];
      for(const cat of this.categories){
        const list = await this.listCategory(cat);
        for(const href of list){ discovered.push({ href, category: cat }); }
      }
      return discovered;
    },

    // Static list fallback; in real setup you might list via API or sitemap
    async listCategory(category){
      const base = `/courses/${category}`;
      const known = {
        Hypertension: [`${base}/low-impact-cardio-breathing.html`],
        Anxiety: [`${base}/mindful-aerobics-calm-breath.html`],
        Glucose: [`${base}/moderate-intervals-mobility.html`]
      };
      return known[category] || [];
    },

    // Fetch and parse meta from a course page
    async fetchMeta(href){
      try{
        const res = await fetch(href);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const pick = (name, def='') => (doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content')) || def;
        const title = doc.querySelector('title')?.textContent?.trim() || 'Untitled course';
        const description = pick('description','');
        const duration = pick('duration','');
        const level = pick('level','');
        const condition = pick('condition','');
        const lessons = pick('lessons','');
        const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '/assets/img/featured/1.jpeg';
        return { href, title, description, duration, level, condition, lessons, image };
      }catch(err){
        console.error('CourseIndex.fetchMeta error', href, err);
        return { href, title: href.split('/').pop(), description: '', duration: '', level: '', condition: '', lessons: '', image: '/assets/img/featured/1.jpeg' };
      }
    },

    async scanAll(){
      const items = await this.discover();
      const metas = await Promise.all(items.map(i => this.fetchMeta(i.href)));
      return metas;
    },

    renderCard(course){
      const chips = [course.level || '', course.duration || ''].filter(Boolean)
        .map(c => `<span class="badge text-bg-secondary">${c}</span>`).join('');
      const condition = course.condition || '';
      return `
        <div class="col-12 col-sm-6 col-md-4">
          <a href="${course.href}" class="text-decoration-none">
            <div class="card h-100 glass course-card">
              <div class="card-media ratio ratio-16x9">
                <img src="${course.image}" alt="${course.title}">
                ${condition ? `<div class="badge-position"><span class="badge text-bg-primary">${condition}</span></div>` : ''}
              </div>
              <div class="card-body">
                <h5 class="mb-1">${course.title}</h5>
                <p class="text-muted small mb-2">${course.description}</p>
                <div class="meta">
                  ${course.duration ? `<span><i class="bi bi-clock me-1"></i>${course.duration}</span>` : ''}
                  ${course.level ? `<span><i class="bi bi-activity me-1"></i>${course.level}</span>` : ''}
                </div>
                <div class="chips">${chips}</div>
              </div>
            </div>
          </a>
        </div>`;
    },

    renderModernGrid(containerSelector, courses){
      const el = document.querySelector(containerSelector);
      if(!el) return;
      el.classList.add('row','g-4','blogs-grid');
      const html = courses.map(c => this.renderCard(c)).join('');
      el.innerHTML = html;
    }
  };

  window.CourseIndex = CourseIndex;
})();