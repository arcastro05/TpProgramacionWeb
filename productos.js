/* ===== NAV MOBILE & SEARCH ===== */
const navToggle = document.getElementById('navToggle');
const navLeft   = document.querySelector('.nav-left');
const backdrop  = document.getElementById('navBackdrop');

function closeMenu(){
  navLeft?.classList.remove('open');
  document.body.classList.remove('nav-open');
  if (backdrop) backdrop.hidden = true;
}

navToggle?.addEventListener('click', () => {
  const willOpen = !navLeft?.classList.contains('open');
  if (willOpen){
    navLeft?.classList.add('open');
    document.body.classList.add('nav-open');
    if (backdrop) backdrop.hidden = false;
  } else {
    closeMenu();
  }
});

backdrop?.addEventListener('click', closeMenu);

navLeft?.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (a) closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// 🔹 Lista de productos 
const products = [
  {
    name: "Bermuda Swell",
    price: 60000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3639.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3638.PNG",
    urlBuy: "#"
  },
  {
    name: "Bermuda Bay",
    price: 60000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3635.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3634.PNG",
    urlBuy: "#"
  },
  {
    name: "Bermuda Tide",
    price: 60000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3637.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3636.PNG",
    urlBuy: "#"
  },
  {
    name: "Remera Set",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3619.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3620.PNG",
    urlBuy: "#"
  },
    {
    name: "Remera Sunset Palm",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3613.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3614.PNG",
    urlBuy: "#"
  },
    {
    name: "Remera Ocean Palm",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3621.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3616.PNG",
    urlBuy: "#"
  },
    {
    name: "Remera Dune",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3617.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3618.PNG",
    urlBuy: "#"
  },
    {
    name: "Remera Zion",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Lost in the city/IMG_3292.PNG",
    imgBack: "assets/PrendasDigitales/Lost in the city/IMG_3291.PNG",
    urlBuy: "#",
    urlView: "#"
  },
    {
    name: "Remera Nalu",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Lost in the city/IMG_3286.PNG",
    imgBack: "assets/PrendasDigitales/Lost in the city/IMG_3287.PNG",
    urlBuy: "#"
  },
    {
    name: "Remera Kaya",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Lost in the city/IMG_3290.PNG",
    imgBack: "assets/PrendasDigitales/Lost in the city/IMG_3291.PNG",
    urlBuy: "#"
  },
];

const $grid = document.getElementById("productGrid");
const currencyFmt = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 });

function render() {
  $grid.innerHTML = products.map(p => cardHTML(p)).join("");
  document.getElementById('year').textContent = new Date().getFullYear();

  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    const front = card.querySelector("img.front");
    const back  = card.querySelector("img.back");
    let toggled = false;

    card.addEventListener("touchstart", () => {
      toggled = !toggled;
      front.style.opacity = toggled ? "0" : "1";
      back.style.opacity  = toggled ? "1" : "0";
    }, { passive:true });
  });
}
render();


function slugify(str){
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function cardHTML(p) {
  const id = slugify(p.name);
  return `
    <article class="product-card"
            data-id="${id}"
            data-name="${p.name}"
            data-price="${p.price}"
            data-sku="${id}"
            data-img="${p.imgFront}">
      <div class="thumb">
        <img class="front" src="${p.imgFront}" alt="${p.name}" loading="lazy">
        <img class="back"  src="${p.imgBack}"  alt="${p.name} (vista 2)" loading="lazy">
        <div class="hover-ui">
          <button
            type="button"
            class="btn primary add-to-cart"
            data-id="${id}"
            data-name="${p.name}"
            data-price="${p.price}"
            data-sku="${id}"
            data-img="${p.imgFront}"
            aria-label="Agregar ${p.name} al carrito"
          >AGREGAR</button>
        </div>
        <div class="sep" aria-hidden="true"></div>
      </div>
      <div class="info">
        <h3 class="name">${p.name}</h3>
        <div class="price">${currencyFmt.format(p.price)}</div>
      </div>
    </article>`;
}



/* ====== CARRITO ====== */
(() => {
  const fmt = new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS' });

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('rels_cart') || '[]');
  } catch (_) { cart = []; }
  
if (Array.isArray(cart)) {
  let touched = false;
  cart = cart.map(it => {
    if (!it.name) touched = true;
    return { ...it, name: it?.name || it?.sku || 'Producto' };
  });
  if (touched) localStorage.setItem('rels_cart', JSON.stringify(cart));
}



  // UI refs
  const btnOpen   = document.getElementById('cartBtn');
  const btnClose  = document.getElementById('cartClose');
  const panel     = document.getElementById('cartPanel');
  const backdrop  = document.getElementById('cartBackdrop');
  const itemsBox  = document.getElementById('cartItems');
  const totalEl   = document.getElementById('cartTotal');
  const badgeEl   = document.getElementById('cartBadge');
  const btnBuy    = document.getElementById('cartCheckout');
  const btnClear  = document.getElementById('cartClear');

  const save = () => localStorage.setItem('rels_cart', JSON.stringify(cart));

  const qtyTotal = () => cart.reduce((s,i)=> s + i.qty, 0);
  const moneyTotal = () => cart.reduce((s,i)=> s + i.qty * i.price, 0);

  const updateBadge = () => { if (badgeEl) badgeEl.textContent = qtyTotal(); };

  const render = () => {
    if (!itemsBox) return;
    if (!cart.length) {
      itemsBox.innerHTML = `<p style="color:#666">Tu carrito está vacío.</p>`;
    } else {
      itemsBox.innerHTML = cart.map((it, idx) => `
        <div class="cart-item">
          <div class="ci-left">
            <div class="ci-thumb" aria-hidden="true" style="width:56px;height:56px;border:1px solid #eee;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;">
              ${it.img ? `<img src="${it.img}" alt="${it.name}" style="max-width:100%;max-height:100%;">` : ''}
            </div>

            <div class="ci-info" style="margin-left:12px;">
              <h4 class="ci-name" style="margin:0 0 4px 0;font-weight:600;">${it.name}</h4>
              <div class="cart-meta" style="color:#555;margin-bottom:8px;">${fmt.format(it.price)} c/u</div>

              <div class="cart-qty">
                <button class="ci-btn ci-minus" data-idx="${idx}" aria-label="Menos">−</button>
                <span class="ci-count">${it.qty}</span>
                <button class="ci-btn ci-plus"  data-idx="${idx}" aria-label="Más">+</button>
                <button class="ci-del" data-idx="${idx}" aria-label="Quitar">🗑️</button>
              </div>
            </div>
          </div>

          <div class="ci-sub" style="margin-left:auto;text-align:right;font-weight:700;">
            ${fmt.format(it.qty * it.price)}
          </div>
        </div>
      `).join('');

    }
    const total = moneyTotal(); 
    const totalBox = document.querySelector('.cart-total');
    if (totalBox) totalBox.style.display = 'flex'; 
    if (totalEl) {
    try { totalEl.textContent = fmt.format(total); }
    catch { totalEl.textContent = total.toLocaleString('es-AR', {style:'currency', currency:'ARS'}); }
  }
  updateBadge();
  };

  // ——— SINCRONIZAR UI DE CARDS CON EL CARRITO ———
const syncProductCards = () => {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const pid   = card.dataset.id;
    const name  = card.dataset.name || 'Producto';
    const price = parseFloat(card.dataset.price || '0');
    const btnArea = card.querySelector('.hover-ui');
    if (!pid || !btnArea) return;

    const found = cart.find(i => i.id === pid);

    if (found) {
      btnArea.innerHTML = `
        <div class="card-qty" data-id="${pid}">
          <button class="cq-btn cq-minus" aria-label="Menos">−</button>
          <span class="cq-num">${found.qty}</span>
          <button class="cq-btn cq-plus" aria-label="Más">+</button>
        </div>`;
    } else {
      btnArea.innerHTML = `
        <button
          type="button"
          class="btn primary add-to-cart"
          data-id="${pid}"
          data-name="${name}"
          data-price="${price}"
          data-sku="${pid}">
          AGREGAR
        </button>`;
    }
  });
};


  const open = () => {
    panel?.classList.add('open');
    panel?.removeAttribute('hidden');
    backdrop?.removeAttribute('hidden');
  };
  const close = () => {
    panel?.classList.remove('open');
    panel?.setAttribute('hidden','');
    backdrop?.setAttribute('hidden','');
  };



  // Listeners UI
  btnOpen?.addEventListener('click', open);
  btnClose?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  btnClear?.addEventListener('click', () => {
    if (!cart.length) return;
    cart = [];
    save(); render();
  });

  btnBuy?.addEventListener('click', () => {
    if (!cart.length) { alert('Tu carrito está vacío.'); return; }
    alert('¡Gracias por tu compra! 🏄‍♂️');
    cart = [];
    save(); render(); close();
  });

  // Delegación: + / − / quitar
  itemsBox?.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const i = Number(b.dataset.idx);
    if (Number.isNaN(i) || !cart[i]) return;

    if (b.classList.contains('ci-plus'))  cart[i].qty++;
    if (b.classList.contains('ci-minus')) cart[i].qty = Math.max(1, cart[i].qty - 1);
    if (b.classList.contains('ci-del'))   cart.splice(i,1);

    save(); render();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;

    const id    = btn.dataset.id    || crypto.randomUUID();
    const name  = btn.dataset.name  || 'Producto';
    const price = parseFloat(btn.dataset.price || '0');
    const sku   = btn.dataset.sku   || id;
    const card  = btn.closest('.product-card');
    const img   = btn.dataset.img
    || card?.dataset.img
    || card?.querySelector('.front')?.src
    || '';

    if (!price) { alert('Precio inválido'); return; }

    const found = cart.find(p => p.id === id);
    if (found) found.qty++;
    else cart.push({ id, name, price, qty: 1, sku, img });

    save(); render(); open();syncProductCards(); 

  });
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cq-btn');
  if (!btn) return;

  const wrap = btn.closest('.card-qty');
  const pid  = wrap?.dataset.id;
  if (!pid) return;

  let it = cart.find(i => i.id === pid);
  if (!it) {
    const card  = btn.closest('.product-card');
    const name  = card?.dataset.name || 'Producto';
    const price = parseFloat(card?.dataset.price || '0');
    const img   = card?.dataset.img
    || card?.querySelector('.front')?.src
    || '';
    it = { id: pid, name, price, qty: 0, sku: pid, img };
    cart.push(it);
  }

  if (btn.classList.contains('cq-plus'))   it.qty++;
  if (btn.classList.contains('cq-minus')) {
    it.qty = Math.max(0, it.qty - 1);
    if (it.qty === 0) cart = cart.filter(x => x.id !== pid);
  }

  save();
  render();
  syncProductCards();
  open(); 

});
  render();
  syncProductCards();


})();


/* ===== NEWSLETTER ===== */
const form = document.getElementById('newsletterForm');
const msg = document.getElementById('formMsg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = (document.getElementById('email').value || '').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    setMsg('Ingresá un email válido', false); return;
  }



  setMsg('¡Gracias! Te sumamos a la comunidad 🙌', true);
  form.reset();
});
function setMsg(text, ok){
  msg.textContent = text;
  msg.style.color = ok ? '#7CFFB2' : '#FF8B8B';
}
render();
