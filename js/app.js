// Joe Grand — Interactions + Performance (optimized)
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const toastEl = document.getElementById('toast');
  const CFG = window.JG_CONFIG || {};

  // Fast toast
  function showToast(msg){
    if(!toastEl) { if(window.jgToast) window.jgToast(msg); return; }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>toastEl.classList.remove('show'),3200);
  }
  window.showToast = showToast;

  // Hamburger - fast tap, no delay
  if(ham && nav){
    ham.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
      if(open) ham.textContent='✕'; else ham.textContent='☰';
    }, {passive:true});
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
      searchToggle.setAttribute('aria-expanded', String(open));
      if(open && searchInput) requestAnimationFrame(()=>searchInput.focus());
    }, {passive:true});
  }

  // Debounce helper
  function debounce(fn, ms){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); }; }

  // Search: debounced, filters posters, info cells, and page cards - fast
  if(searchInput){
    const doFilter = debounce(()=>{
      const q = searchInput.value.toLowerCase().trim();
      const els = document.querySelectorAll('.poster-card, .info-cell, main .card');
      requestAnimationFrame(()=>{
        els.forEach(el=>{
          const text = (el.textContent||'').toLowerCase();
          el.style.display = (!q || text.includes(q)) ? '' : 'none';
        });
      });
    }, 220);
    searchInput.addEventListener('input', doFilter, {passive:true});
    searchInput.addEventListener('keydown', e=>{
      if(e.key==='Escape'){ searchBar.classList.remove('open'); searchInput.value=''; doFilter(); }
    });
  }

  // Newsletter forms — wired via js/config.js (Buttondown / Formspree / Mailchimp-ready).
  // Until an endpoint is configured, addresses stay in the visitor's own browser — honestly.
  document.querySelectorAll('form.jg-newsletter').forEach(f=>{
    f.addEventListener('submit', async e=>{
      e.preventDefault();
      const emailEl = f.querySelector('input[type=email]');
      const consent = f.querySelector('input[data-consent]');
      if(consent && !consent.checked){ showToast('Please tick the consent box first.'); return; }
      const val = (emailEl && emailEl.value || '').trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){ showToast('That email address looks off.'); return; }
      if(CFG.newsletterEndpoint){
        try{
          const r = await fetch(CFG.newsletterEndpoint, {
            method:'POST',
            headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
            body: JSON.stringify({ email: val })
          });
          if(r.ok){ showToast('Subscribed — check your inbox to confirm.'); f.reset(); return; }
          showToast('The signup service hiccuped — try again in a moment.'); return;
        }catch(_){ showToast('Network error — try again in a moment.'); return; }
      }
      // Local-only mode: save in this browser + open a ready-made subscribe email
      try{
        const list = JSON.parse(localStorage.getItem('jg_newsletter_pending')||'[]');
        if(!list.some(x=>x.email===val)) list.push({ email: val, ts: Date.now() });
        localStorage.setItem('jg_newsletter_pending', JSON.stringify(list));
      }catch(_){}
      const subj = encodeURIComponent('Newsletter subscribe request');
      const body = encodeURIComponent('Please add '+val+' to the Joe Grand / Hacker Planet newsletter list.\n\nSent from the fan-tribute site subscribe form. Consent was ticked: '+(consent && consent.checked ? 'yes':'no'));
      showToast('Opening your email app — hit “send” to complete the subscribe request.');
      window.location.href = 'mailto:contact@grandideastudio.com?subject='+subj+'&body='+body;
      f.reset();
    });
  });

  // Click-to-play YouTube facades (youtube-nocookie; no cookies until play)
  document.querySelectorAll('.video-facade').forEach(el=>{
    const play = ()=>{
      const id = el.dataset.video; if(!id) return;
      const ifr = document.createElement('iframe');
      ifr.className = 'video-embed';
      ifr.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      ifr.title = el.getAttribute('aria-label') || 'YouTube video';
      ifr.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      ifr.allowFullscreen = true;
      el.replaceWith(ifr);
    };
    el.addEventListener('click', play);
    el.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); play(); } });
  });

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

  // Smooth scroll with offset
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

  // Reveal on scroll - rAF + IntersectionObserver
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

  // Chips filter with accessible pressed state
  const chips = document.querySelectorAll('.chip');
  if(chips.length){
    chips.forEach(ch=>{
      ch.addEventListener('click', ()=>{
        const group = ch.closest('.filter-bar') || document;
        group.querySelectorAll('.chip').forEach(c=>{ c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
        ch.classList.add('active'); ch.setAttribute('aria-pressed','true');
        const filter = ch.dataset.filter;
        if(!filter) return;
        requestAnimationFrame(()=>{
          document.querySelectorAll('[data-cat]').forEach(card=>{
            card.style.display = (filter==='all' || card.dataset.cat===filter) ? '' : 'none';
          });
        });
      }, {passive:true});
    });
  }

  // Copy email
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

  // Decode async for lazy images
  document.querySelectorAll('img[loading="lazy"]').forEach(img=>{ img.decoding='async'; });

  // Header shadow on scroll - passive + rAF
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

  // Prefetch internal pages on hover
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

  // Privacy-friendly analytics (optional, cookieless — activates only when configured in js/config.js)
  if(CFG.analyticsSrc){
    try{
      const s = document.createElement('script');
      s.defer = true;
      s.src = CFG.analyticsSrc;
      if(CFG.analyticsDomain) s.setAttribute('data-website-id', CFG.analyticsDomain), s.setAttribute('data-domain', CFG.analyticsDomain);
      document.head.appendChild(s);
    }catch(_){}
  }

});
