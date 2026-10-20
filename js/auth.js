// Joe Grand — Auth & Admin System (frontend-only, localStorage)
// Fast, no external deps. Production: replace with real OAuth backend.

(function(){
  const DB_USERS = 'jg_users';
  const DB_SESSION = 'jg_session';
  const DB_OTP = 'jg_otp';
  const DB_SITE = 'jg_site_data';

  // --- Utils ---
  const $ = s => document.querySelector(s);
  const uid = () => 'u_' + Math.random().toString(36).slice(2,9);
  const nowISO = () => new Date().toISOString();
  const hash = s => btoa(unescape(encodeURIComponent(s))).slice(0,32); // demo only
  const toast = (msg) => {
    let t = document.getElementById('toast');
    if(!t){ t=document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2800);
  };
  window.jgToast = toast;

  // --- Seed admin if missing ---
  function seed(){
    let users = getUsers();
    if(!users.length){
      users = [{
        id: uid(), name:'Admin', email:'admin@joegrand.com', phone:'+10000000000',
        password: hash('Admin123!'), provider:'email', role:'admin', avatar:'', createdAt: nowISO(), banned:false, phoneVerified:true
      },{
        id: uid(), name:'Joe Grand', email:'joe@grandideastudio.com', phone:'+15035551234',
        password: hash('Kingpin99'), provider:'email', role:'admin', avatar:'', createdAt: nowISO(), banned:false, phoneVerified:true
      },{
        id: uid(), name:'Alex Rivera', email:'alex@lab.example', phone:'+12125550123',
        password: hash('Test1234'), provider:'email', role:'client', avatar:'', createdAt: nowISO(), banned:false, phoneVerified:true
      }];
      localStorage.setItem(DB_USERS, JSON.stringify(users));
    }
    // seed site data
    if(!localStorage.getItem(DB_SITE)){
      localStorage.setItem(DB_SITE, JSON.stringify({
        totalViews: 12840,
        signups: users.length,
        revenue: 3420,
        heroEdits: 0
      }));
    }
  }

  function getUsers(){ try{ return JSON.parse(localStorage.getItem(DB_USERS)||'[]'); }catch(e){ return []; } }
  function setUsers(a){ localStorage.setItem(DB_USERS, JSON.stringify(a)); }
  function getSession(){ try{ return JSON.parse(localStorage.getItem(DB_SESSION)||'null'); }catch(e){ return null; } }
  function setSession(s){ if(s) localStorage.setItem(DB_SESSION, JSON.stringify(s)); else localStorage.removeItem(DB_SESSION); }
  function getCurrentUser(){
    const s = getSession();
    if(!s || new Date(s.expiresAt) < new Date()){ if(s) setSession(null); return null; }
    const users = getUsers();
    return users.find(u=>u.id===s.userId && !u.banned) || null;
  }

  // --- Mock Google accounts ---
  const MOCK_GOOGLE = [
    { name:'Emma Chen', email:'emma.chen@gmail.com', avatar:'https://i.pravatar.cc/100?img=5' },
    { name:'Hasan Ali', email:'hasan.ali@gmail.com', avatar:'https://i.pravatar.cc/100?img=8' },
    { name:'Sofia Reyes', email:'sofia.reyes@gmail.com', avatar:'https://i.pravatar.cc/100?img=9' },
  ];

  function openGooglePicker(cb){
    const overlay = document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:grid;place-items:center;padding:16px';
    overlay.innerHTML=`
      <div style="background:#fff;color:#111;border:2px solid #111;box-shadow:12px 12px 0 #000;max-width:420px;width:100%;padding:18px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7.5-11.3 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20.3-7.6 20.3-21 0-1.4-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c3.1 0 5.9 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 16.3 3 9.6 7.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 45c5.5 0 10.4-1.9 14.1-5.1l-6.6-5.1C29.2 36.6 26.7 37.5 24 37.5c-5.6 0-9.7-3.2-11.3-7.5l-6.6 5.1C9.6 40.6 16.3 45 24 45z"/><path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.7 2-2 3.7-3.8 5l6.6 5.1C42 34.6 44 29.6 44 24c0-1.4-.1-2.7-.4-3.5z"/></svg>
          <div><strong style="font-family:Anton,sans-serif;letter-spacing:.02em">Sign in with Google</strong><div style="font-size:11px;color:#555;font-family:Courier Prime,monospace">Choose an account to continue to Joe Grand</div></div>
        </div>
        ${MOCK_GOOGLE.map((a,i)=>`
          <button data-idx="${i}" class="provider-btn" style="width:100%;justify-content:flex-start;margin-bottom:8px">
            <img src="${a.avatar}" style="width:28px;height:28px;border-radius:50%"/>
            <span style="flex:1;text-align:left"><strong>${a.name}</strong><br><span style="font-size:11px;color:#555;font-weight:400">${a.email}</span></span>
            <span style="font-size:10px;background:#0F9D58;color:#fff;padding:3px 6px;border-radius:999px">GOOGLE</span>
          </button>`).join('')}
        <button id="gCancel" class="btn" style="width:100%;margin-top:6px;background:#111;color:#fff;border-color:#111">Cancel</button>
        <p style="font-size:10px;color:#777;margin-top:10px;text-align:center;font-family:Courier Prime,monospace">Demo mode — no real OAuth. Production: replace with Google Identity Services + backend verification.</p>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
    overlay.querySelector('#gCancel').onclick=()=>overlay.remove();
    overlay.querySelectorAll('[data-idx]').forEach(b=>{
      b.onclick=()=>{
        const acc = MOCK_GOOGLE[parseInt(b.dataset.idx,10)];
        overlay.remove();
        cb(acc);
      };
    });
  }

  // --- Phone OTP ---
  function requestOTP(phone){
    const code = String(Math.floor(100000 + Math.random()*900000));
    localStorage.setItem(DB_OTP, JSON.stringify({phone, code, exp: Date.now()+300000}));
    toast(`Demo OTP for ${phone}: ${code} (valid 5 min)`);
    // also log for admin
    console.log('[DEMO OTP]', phone, code);
    return code;
  }
  function verifyOTP(phone, code){
    try{
      const d = JSON.parse(localStorage.getItem(DB_OTP)||'null');
      if(!d) return false;
      if(d.phone!==phone) return false;
      if(Date.now() > d.exp) return false;
      return d.code === String(code).trim();
    }catch(e){ return false; }
  }

  // --- Auth actions ---
  function signup({name,email,phone,password,provider}){
    const users=getUsers();
    if(users.some(u=>u.email.toLowerCase()===String(email).toLowerCase())) throw new Error('Email already registered');
    if(phone && users.some(u=>u.phone===phone)) throw new Error('Phone already registered');
    const user={ id:uid(), name: name||email.split('@')[0], email: email.toLowerCase(), phone: phone||'', password: password?hash(password):hash(uid()), provider: provider||'email', role:'client', avatar:'', createdAt: nowISO(), banned:false, phoneVerified: provider==='phone' };
    users.push(user); setUsers(users);
    // increment analytics
    try{ const site=JSON.parse(localStorage.getItem(DB_SITE)); site.signups++; localStorage.setItem(DB_SITE, JSON.stringify(site)); }catch(e){}
    return user;
  }
  function login({identifier,password}){
    const users=getUsers();
    const user = users.find(u=> (u.email.toLowerCase()===String(identifier).toLowerCase() || u.phone===identifier) && !u.banned );
    if(!user) throw new Error('No account found. Please sign up.');
    if(user.banned) throw new Error('Account banned.');
    if(user.provider==='phone' && !password){
      // allow OTP login without password check if OTP verified elsewhere
      return user;
    }
    if(hash(String(password))!==user.password) throw new Error('Incorrect password');
    return user;
  }
  function createSession(user){
    const session={ userId:user.id, token:'tok_'+Math.random().toString(36).slice(2), expiresAt: new Date(Date.now()+7*24*60*60*1000).toISOString(), provider:user.provider };
    setSession(session);
    // bump views
    try{ const site=JSON.parse(localStorage.getItem(DB_SITE)); site.totalViews = (site.totalViews||0)+1; localStorage.setItem(DB_SITE, JSON.stringify(site)); }catch(e){}
    return session;
  }
  function logout(){ setSession(null); toast('Signed out'); setTimeout(()=>location.href='../index.html',600); }

  // --- Nav rendering ---
  function renderNav(){
    const user = getCurrentUser();
    const containers = document.querySelectorAll('[data-auth-nav]');
    containers.forEach(nav=>{
      if(!user){
        nav.innerHTML = `
          <a class="btn btn--yellow" href="pages/auth.html?mode=login" style="padding:8px 12px;font-size:11px">Sign In</a>
          <a class="btn" href="pages/auth.html?mode=signup">Sign Up</a>
        `;
        // normalize relative paths depending on depth
        // Fix links when on index vs pages
        const path = location.pathname;
        if(path.endsWith('/') || path.endsWith('index.html') || path.split('/').pop()===''){
          nav.querySelectorAll('a').forEach(a=>{
            if(a.getAttribute('href').startsWith('pages/')){}
            else if(a.getAttribute('href').includes('pages/auth.html')){}
          });
        }
        if(location.pathname.includes('/pages/')){
          nav.querySelectorAll('a').forEach(a=>{
            a.href = a.getAttribute('href').replace('pages/','');
          });
        }
      } else {
        const isAdmin = user.role==='admin';
        nav.innerHTML = `
          <a class="user-chip" href="${location.pathname.includes('/pages/') ? 'admin.html' : 'pages/admin.html'}" title="Dashboard">
            <img src="${user.avatar||'https://i.pravatar.cc/100?u='+encodeURIComponent(user.email)}" alt=""/>
            <span>${user.name.split(' ')[0]}</span>
            ${isAdmin?'<span class="badge badge-admin" style="font-size:9px">ADMIN</span>':''}
          </a>
          <div style="position:relative">
            <button id="userMenuBtn" class="btn" style="padding:8px 10px">▾</button>
            <div id="userMenu" style="display:none;position:absolute;right:0;top:110%;background:#fff;color:#111;border:1.5px solid #111;box-shadow:6px 6px 0 #000;min-width:180px;z-index:50">
              <div style="padding:10px 12px;border-bottom:1px solid #eee;font-size:12px"><strong>${user.name}</strong><br><span style="color:#555;font-size:11px">${user.email}</span></div>
              ${isAdmin?'<a href="'+(location.pathname.includes('/pages/') ? 'admin.html' : 'pages/admin.html')+'" style="display:block;padding:10px 12px;text-decoration:none;color:#111;font-size:12px;border-bottom:1px solid #eee">⚙ Admin Dashboard</a>':''}
              <a href="#" id="logoutBtn" style="display:block;padding:10px 12px;text-decoration:none;color:#c00;font-size:12px">Sign out</a>
            </div>
          </div>
        `;
        setTimeout(()=>{
          const btn=$('#userMenuBtn'); const menu=$('#userMenu'); if(btn&&menu){
            btn.addEventListener('click', ()=> menu.style.display = menu.style.display==='none'?'block':'none');
            document.addEventListener('click', e=>{ if(!btn.contains(e.target) && !menu.contains(e.target)) menu.style.display='none'; });
            const l=$('#logoutBtn'); if(l) l.addEventListener('click', e=>{ e.preventDefault(); logout(); });
          }
        },0);
      }
    });
    // update any dynamic profile names
    document.querySelectorAll('[data-user-name]').forEach(el=>{
      el.textContent = user ? user.name : 'Guest';
    });
  }

  // --- Admin guard ---
  function requireAdmin(){
    const user = getCurrentUser();
    if(!user){ toast('Please sign in as admin'); setTimeout(()=>location.href='auth.html?mode=login&next=admin.html',800); return null; }
    if(user.role!=='admin'){ toast('Admin access required'); setTimeout(()=>location.href='../index.html',900); return null; }
    return user;
  }

  // --- Expose ---
  window.JGAuth = {
    getUsers, setUsers, getSession, setSession, getCurrentUser, createSession, login, signup, logout, requestOTP, verifyOTP, openGooglePicker, renderNav, requireAdmin, seed, MOCK_GOOGLE, hash, toast
  };

  // Auto seed & render on load
  document.addEventListener('DOMContentLoaded', ()=>{
    seed();
    renderNav();
    // handle global logout buttons
    document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click', e=>{ e.preventDefault(); logout(); }));
  });

})();
