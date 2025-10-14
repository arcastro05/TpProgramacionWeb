/* ===== NAV MOBILE & SEARCH ===== */
const navToggle = document.getElementById('navToggle');
const openSearchBtn = document.getElementById('openSearch');
const closeSearchBtn = document.getElementById('closeSearch');
const searchbar = document.getElementById('searchbar');

navToggle?.addEventListener('click', () => {
  document.querySelector('.nav-left')?.classList.toggle('open');
});

openSearchBtn?.addEventListener('click', () => {
  searchbar.hidden = false;
  searchbar.querySelector('input')?.focus();
});
closeSearchBtn?.addEventListener('click', () => {
  searchbar.hidden = true;
});

/* ===== YEAR FOOTER ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== CAROUSEL (HERO) ===== */
const track = document.getElementById('cTrack');
const slides = Array.from(track.querySelectorAll('.c-slide'));
const prev = document.querySelector('.c-prev');
const next = document.querySelector('.c-next');
const dotsWrap = document.getElementById('cDots');

let index = 0;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  if(i === 0) b.classList.add('is-active');
  b.addEventListener('click', ()=>goTo(i));
  dotsWrap.appendChild(b);
});
const dots = Array.from(dotsWrap.querySelectorAll('button'));

function goTo(i){
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d=>d.classList.remove('is-active'));
  dots[index].classList.add('is-active');
}
prev?.addEventListener('click', ()=> goTo(index - 1));
next?.addEventListener('click', ()=> goTo(index + 1));

let auto = setInterval(()=>goTo(index + 1), 5000);
['mouseenter','focusin'].forEach(ev => track.addEventListener(ev, ()=>clearInterval(auto)));
['mouseleave','focusout'].forEach(ev => track.addEventListener(ev, ()=>auto = setInterval(()=>goTo(index + 1), 5000)));

import { products } from "productos.js";

// selecciona solo los primeros 4 o 8
const featured = products.slice(0, 4);
const grid = document.querySelector("#newInGrid");

function renderCards(list) {
  grid.innerHTML = list.map(p => `
    <article class="card">
      <div class="thumb">
        <img class="front" src="${p.imgFront}" alt="${p.name}">
        <img class="back" src="${p.imgBack}" alt="${p.name}">
      </div>
      <div class="sep"></div>
      <h3 class="name">${p.name}</h3>
      <div class="price">$${p.price.toLocaleString('es-AR')}</div>
    </article>
  `).join("");
}
renderCards(featured);


/* ===== SHOP THE LOOK – HSCROLL ARROWS ===== */
const hwrap = document.querySelector('.hwrap');
document.querySelector('.hs-prev')?.addEventListener('click', ()=> hwrap.scrollBy({left:-400, behavior:'smooth'}));
document.querySelector('.hs-next')?.addEventListener('click', ()=> hwrap.scrollBy({left:400, behavior:'smooth'}));

/* ===== NEWSLETTER DEMO ===== */
const form = document.getElementById('newsletterForm');
const msg = document.getElementById('formMsg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = (document.getElementById('email').value || '').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    setMsg('Ingresá un email válido', false); return;
  }

  // TODO: conectar a tu Apps Script o backend:
  // fetch('TU_WEBHOOK', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email}) })

  setMsg('¡Gracias! Te sumamos a la comunidad 🙌', true);
  form.reset();
});
function setMsg(text, ok){
  msg.textContent = text;
  msg.style.color = ok ? '#7CFFB2' : '#FF8B8B';
}
(function(){
  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbw1ZiIt5_zJcrPTe6OtRdVlssFc3ElFPQHg3IYdPsuUzUZzmO35oQqf980wZaR_Y9wC/exec";

  const overlay = document.getElementById('popup-rels');
  const form    = document.getElementById('rels-form');
  const close   = document.getElementById('rels-close');
  const toast   = document.getElementById('mensaje-exito');

  function cerrar(){ if(overlay){ overlay.style.opacity=0; overlay.style.pointerEvents='none'; } }
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg; toast.style.display = 'block';
    setTimeout(()=> toast.style.display='none', 4000);
  }

  if (close) close.addEventListener('click', cerrar);
  if (overlay) overlay.addEventListener('click', e => { if(e.target === overlay) cerrar(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') cerrar(); });

  if (form){
    form.addEventListener('submit', async e=>{
      e.preventDefault();
      const data = new FormData(form);
      const nombre = form.nombre?.value || '';
      try{
        const res  = await fetch(WEBAPP_URL, { method:'POST', body:data });
        const json = await res.json().catch(()=>({ok:true}));
        if (json.ok !== false){
          form.reset(); cerrar();
          showToast(`¡Bienvenido a la comunidad Rels, ${nombre}!`);
        } else { alert('Error al enviar. Probá más tarde.'); }
      }catch(_){ alert('Hubo un problema. Probá más tarde.'); }
    });
  }
})();
/* ===== INSTAGRAM FEED REAL (opcional)
   Para un feed automático necesitás usar la Graph API de Instagram (Meta) con un Access Token.
   Flujo típico:
   1) Crear App en Meta for Developers
   2) Permisos instagram_basic, pages_show_list, etc.
   3) Obtener User Token y (opcional) Long-Lived Token
   4) GET https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type&access_token=TOKEN
   5) Renderizar las imágenes/permalinks acá.
   Por la política de CORS/seguridad, conviene llamarlo desde tu backend y entregar JSON al front.
*/