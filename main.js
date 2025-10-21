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


/* ===== NEWSLETTER ===== */
const form = document.getElementById('newsletterForm');
const msg = document.getElementById('formMsg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = (document.getElementById('email').value || '').trim();
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)){
    setMsg('Ingresá un email válido', false); return;
  }

  setMsg('¡Gracias! Te sumamos a la comunidad 🙌', true);
  form.reset();
});
function setMsg(text, ok){
  msg.textContent = text;
  msg.style.color = ok ? '#7CFFB2' : '#FF8B8B';
}


/* ====== CARRITO ====== */
(() => {
  const fmt = new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS' });

  let cart = [];
  const loadCart = () => {
    try {
      cart = JSON.parse(localStorage.getItem('rels_cart') || '[]');
      if (!Array.isArray(cart)) cart = [];
    } catch { cart = []; }
  };

  const save = () => localStorage.setItem('rels_cart', JSON.stringify(cart));
  const qtyTotal = () => cart.reduce((s,i)=> s + i.qty, 0);
  const moneyTotal = () => cart.reduce((s,i)=> s + i.qty * i.price, 0);

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

  const updateBadge = () => { if (badgeEl) badgeEl.textContent = qtyTotal(); };

  const render = () => {
    loadCart();
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
      try {
        totalEl.textContent = fmt.format(total);
      } catch {
        totalEl.textContent = total.toLocaleString('es-AR', { style:'currency', currency:'ARS' });
      }
    }
    updateBadge();

  };

  const open = () => {
    render();
    panel?.classList.add('open');
    panel?.removeAttribute('hidden');
    backdrop?.removeAttribute('hidden');
  };

  const close = () => {
    panel?.classList.remove('open');
    panel?.setAttribute('hidden','');
    backdrop?.setAttribute('hidden','');
  };

  // Listeners
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

  loadCart();
  render();
})();
