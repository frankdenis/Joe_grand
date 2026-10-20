// Joe Grand — Interactions + Performance (optimized)
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const toastEl = document.getElementById('toast');

  // Fast toast
  function showToast(msg){
    if(!toastEl) { if(window.jgToast) window.jgToast(msg); return; }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>toastEl.classList.remove('show'),2600);
  }
  window.showToast = showToast;

  // Hamburger - fast tap, no delay
  if(ham && nav){
    ham.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
      if(open) ham.textContent='✕'; else ham.textContent='☰';
    }, {passive:true});
    // close on outside click / escape
    document.addEventListener('click', (e)=>{
      if(!nav.contains(e.target) && !ham.contains(e.target) && nav.classList.contains('open')){
        nav.classList.remove('open'); ham.setAttribute('aria-expanded','false'); ham.textContent='☰';
      }
    });
    document.addEventListener('keydown', e=>{
      if(e.key==='Escape' && nav.classList.contains('open')){ nav.classList.remove('open'); ham.setAttribute('aria-expanded','false'); ham.textContent='☰'; }
    });
  }

  // Search toggle - instant
  if(searchToggle && searchBar){
    searchToggle.addEventListener('click', ()=>{
      const open = searchBar.classList.toggle('open');
      if(open && searchInput) requestAnimationFrame(()=>searchInput.focus());
    }, {passive:true});
    // click outside to close? keep open until close button
  }

  // Debounce helper - fast scrolling/clicking improvement
  function debounce(fn, ms){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); }; }

  // Search: debounced, filters posters and info cells - fast
  if(searchInput){
    const doFilter = debounce(()=>{
      const q = searchInput.value.toLowerCase().trim();
      const els = document.querySelectorAll('.poster-card, .info-cell');
      // use rAF for batched DOM
      requestAnimationFrame(()=>{
        els.forEach(el=>{
          const text = (el.textContent||'').toLowerCase();
          el.style.display = (!q || text.includes(q)) ? '' : 'none';
          if(!q) el.style.opacity='1';
        });
      });
      if(q) showToast(`Filtering for: "${q}"`);
    }, 220);
    searchInput.addEventListener('input', doFilter, {passive:true});
    searchInput.addEventListener('keydown', e=>{
      if(e.key==='Escape'){ searchBar.classList.remove('open'); searchInput.value=''; doFilter(); }
    });
  }

  // Coming soon handler
  document.querySelectorAll('[data-comingsoon]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const href = el.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        showToast('Coming soon — stay tuned for Hacker Planet!');
      }
    }, {passive:true});
  });

  // Smooth scroll with offset - optimized with rAF and passive
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({top:y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
          if(nav) { nav.classList.remove('open'); if(ham){ ham.setAttribute('aria-expanded','false'); ham.textContent='☰'; } }
        }
      }
    });
  });

  // Reveal on scroll - optimized: rootMargin, threshold, will-change
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('in');
          obs.unobserve(ent.target);
        }
      });
    },{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(el=>{ el.style.willChange='transform, opacity'; obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }

  // Current year
  const yEl = document.getElementById('year');
  if(yEl) yEl.textContent = new Date().getFullYear();

  // Chips filter - fast delegated
  const chips = document.querySelectorAll('.chip');
  if(chips.length){
    chips.forEach(ch=>{
      ch.addEventListener('click', ()=>{
        const group = ch.closest('.filter-bar') || document;
        group.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        ch.classList.add('active');
        const filter = ch.dataset.filter;
        requestAnimationFrame(()=>{
          document.querySelectorAll('[data-cat]').forEach(card=>{
            card.style.display = (!filter || filter==='all' || card.dataset.cat===filter) ? '' : 'none';
          });
        });
      }, {passive:true});
    });
  }

  // Copy email - fast
  const emailBtn = document.getElementById('copyEmail');
  if(emailBtn){
    emailBtn.addEventListener('click', e=>{
      e.preventDefault();
      const email='contact@grandideastudio.com';
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(email).then(()=>showToast('Email copied: '+email)).catch(()=>showToast(email));
      } else {
        showToast(email);
      }
    });
  }

  // Performance: lazy load non-critical images with loading="lazy" already set, but add decode async
  document.querySelectorAll('img[loading="lazy"]').forEach(img=>{ img.decoding='async'; });

  // Fast click: ensure no 300ms delay - CSS touch-action manipulation already via style
  // Add passive scroll listener for header shadow
  let ticking=false;
  const topNav = document.querySelector('.top-nav');
  if(topNav){
    window.addEventListener('scroll', ()=>{
      if(!ticking){
        window.requestAnimationFrame(()=>{
          if(window.scrollY > 8) topNav.style.boxShadow='0 4px 18px rgba(0,0,0,.35)';
          else topNav.style.boxShadow='';
          ticking=false;
        });
        ticking=true;
      }
    }, {passive:true});
  }

  // Prefetch hover for internal pages - makes clicking feel instant
  document.querySelectorAll('a[href^="pages/"], a[href^="../"], a[href="index.html"]').forEach(a=>{
    let prefetched=false;
    a.addEventListener('mouseenter', ()=>{
      if(prefetched) return;
      const url = a.getAttribute('href');
      if(!url || url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto')) return;
      const link = document.createElement('link');
      link.rel='prefetch'; link.href=url; document.head.appendChild(link);
      prefetched=true;
    }, {passive:true});
  });

});
