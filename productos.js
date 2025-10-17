// 🔹 Lista de productos (podés traerla de un JSON o de tu backend)
const products = [
  {
    name: "Bermuda Swell",
    price: 60000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3639.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3638.PNG",
    urlBuy: "#",
    urlView: "#"
  },
  {
    name: "Bermuda Bay",
    price: 60000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3635.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3634.PNG",
    urlBuy: "#",
    urlView: "#"
  },
  {
    name: "Bermuda Tide",
    price: 60000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3637.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3636.PNG",
    urlBuy: "#",
    urlView: "#"
  },
  {
    name: "Remera Set",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3619.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3620.PNG",
    urlBuy: "#",
    urlView: "#"
  },
    {
    name: "Remera Sunset Palm",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3613.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3614.PNG",
    urlBuy: "#",
    urlView: "#"
  },
    {
    name: "Remera Ocean Palm",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3621.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3616.PNG",
    urlBuy: "#",
    urlView: "#"
  },
    {
    name: "Remera Dune",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Almost Home/IMG_3617.PNG",
    imgBack: "assets/PrendasDigitales/Almost Home/IMG_3618.PNG",
    urlBuy: "#",
    urlView: "#"
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
    urlBuy: "#",
    urlView: "#"
  },
    {
    name: "Remera Kaya",
    price: 35000,
    imgFront: "assets/PrendasDigitales/Lost in the city/IMG_3290.PNG",
    imgBack: "assets/PrendasDigitales/Lost in the city/IMG_3291.PNG",
    urlBuy: "#",
    urlView: "#"
  },
  // ...agregá todos los que quieras
];

const $grid = document.getElementById("productGrid");
const currencyFmt = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 });

function render() {
  $grid.innerHTML = products.map(p => cardHTML(p)).join("");
  document.getElementById('year').textContent = new Date().getFullYear();

  // Soporte para dispositivos táctiles: tap para alternar imagen
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

function cardHTML(p) {
  return `
  <article class="product-card">
    <!-- opcional: <span class="badge">NEW</span> -->
    <div class="thumb">
      <img class="front" src="${p.imgFront}" alt="${p.name}" loading="lazy">
      <img class="back"  src="${p.imgBack}"  alt="${p.name} (vista 2)" loading="lazy">
      <div class="hover-ui">
        <a class="btn primary" href="${p.urlBuy}" aria-label="Comprar ${p.name}">COMPRAR</a>
        <a class="btn ghost"   href="${p.urlView}" aria-label="Ver ${p.name}">👁 VER</a>
      </div>
      <div class="sep" aria-hidden="true"></div>
    </div>
    <div class="info">
      <h3 class="name">${p.name}</h3>
      <div class="price">${currencyFmt.format(p.price)}</div>
    </div>
  </article>`;
}


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
render()
