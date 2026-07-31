/* ==================================================================
   NIDHA'S — demo data + interactions
   This file simulates what will later come from Supabase:
   PRODUCTS  ->  `products` table (joined with categories/images/variants)
   Everything else is plain UI wiring so the look & flow can be judged
   before any backend is built.
   ================================================================== */

/* ---------------- CONFIG ---------------- */
const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with Nidha's real WhatsApp Business number
const BRAND_NAME = "Nidha's";

/* ---------------- DEMO PRODUCT DATA ---------------- */
const PRODUCTS = [
  { id: "p1", name: "Rani Pink Chikankari Anarkali Set", category: "Chikankari", fabric: "Pure Cotton", price: 4999, mrp: 6499, colors: ["#c05a72","#f3e7d8"], sizes: ["S","M","L","XL"], badge: "bestseller", hue: 350, rating: 4.8, reviews: 62, tags:["chikankari","anarkali","festive"] },
  { id: "p2", name: "Ivory Georgette Sharara Set", category: "Festive Wear", fabric: "Georgette", price: 6299, mrp: 7999, colors: ["#efe7da","#c9a860"], sizes: ["S","M","L"], badge: "new", hue: 42, rating: 4.6, reviews: 24, tags:["sharara","festive","party"] },
  { id: "p3", name: "Sage Green Straight Kurta Set", category: "Kurta Sets", fabric: "Cotton Silk", price: 3299, mrp: null, colors: ["#8a9a7c","#3a342b"], sizes: ["XS","S","M","L","XL"], badge: null, hue: 100, rating: 4.7, reviews: 88, tags:["kurta","casual","daily"] },
  { id: "p4", name: "Midnight Blue Bridal Lehenga Set", category: "Bridal", fabric: "Raw Silk", price: 18999, mrp: 23999, colors: ["#2a3355","#a7822e"], sizes: ["S","M","L"], badge: "bestseller", hue: 225, rating: 5.0, reviews: 19, tags:["bridal","lehenga","wedding"] },
  { id: "p5", name: "Blush Chanderi Palazzo Set", category: "Festive Wear", fabric: "Chanderi Silk", price: 5499, mrp: null, colors: ["#e3b7ae","#eee3d0"], sizes: ["S","M","L","XL"], badge: null, hue: 12, rating: 4.5, reviews: 31, tags:["palazzo","festive"] },
  { id: "p6", name: "Charcoal Chikankari Kurta", category: "Chikankari", fabric: "Pure Cotton", price: 2899, mrp: 3499, colors: ["#3a342b","#ffffff"], sizes: ["S","M","L","XL","XXL"], badge: null, hue: 30, rating: 4.4, reviews: 47, tags:["chikankari","kurta","daily"] },
  { id: "p7", name: "Mustard Silk Anarkali Gown", category: "Festive Wear", fabric: "Art Silk", price: 7499, mrp: 8999, colors: ["#c9922e","#3a342b"], sizes: ["S","M","L"], badge: "new", hue: 40, rating: 4.7, reviews: 15, tags:["anarkali","gown","party"] },
  { id: "p8", name: "Ivory & Gold Bridal Sharara", category: "Bridal", fabric: "Silk Blend", price: 21999, mrp: null, colors: ["#efe7da","#a7822e"], sizes: ["S","M","L","XL"], badge: "bestseller", hue: 45, rating: 4.9, reviews: 11, tags:["bridal","sharara","wedding"] },
  { id: "p9", name: "Coral Cotton Co-ord Set", category: "Kurta Sets", fabric: "Cotton", price: 2599, mrp: 2999, colors: ["#d97e63","#f3e7d8"], sizes: ["XS","S","M","L"], badge: "new", hue: 18, rating: 4.3, reviews: 54, tags:["coord","casual","daily"] },
  { id: "p10", name: "Wine Velvet Festive Suit", category: "Festive Wear", fabric: "Velvet", price: 8299, mrp: 9999, colors: ["#6b2635","#a7822e"], sizes: ["S","M","L","XL"], badge: "bestseller", hue: 350, rating: 4.8, reviews: 28, tags:["velvet","festive","winter"] },
  { id: "p11", name: "White Chikankari Palazzo Set", category: "Chikankari", fabric: "Cotton Lawn", price: 3799, mrp: null, colors: ["#ffffff","#8a9a7c"], sizes: ["S","M","L","XL"], badge: "new", hue: 60, rating: 4.6, reviews: 33, tags:["chikankari","palazzo","daily"] },
  { id: "p12", name: "Emerald Silk Bridal Anarkali", category: "Bridal", fabric: "Pure Silk", price: 19499, mrp: 24999, colors: ["#1f5c4a","#a7822e"], sizes: ["S","M","L"], badge: null, hue: 155, rating: 4.9, reviews: 9, tags:["bridal","anarkali","wedding"] },
];

const money = (n) => "\u20B9" + n.toLocaleString("en-IN");

/* ---------------- WISHLIST (localStorage) ---------------- */
const Wishlist = {
  KEY: "nidhas_wishlist",
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },
  has(id) { return this.get().includes(id); },
  toggle(id) {
    let list = this.get();
    const has = list.includes(id);
    list = has ? list.filter(x => x !== id) : [...list, id];
    localStorage.setItem(this.KEY, JSON.stringify(list));
    document.dispatchEvent(new CustomEvent("wishlist:change"));
    return !has;
  },
  count() { return this.get().length; },
};

/* ---------------- Placeholder media helper ---------------- */
function placeholderMedia(product, extraClass = "", alt = false) {
  const hue = alt ? (product.hue + 18) % 360 : product.hue;
  return `<div class="placeholder-media ${extraClass}" style="--ph-h:${hue}" data-mono="N" role="img" aria-label="Placeholder photo for ${product.name}"><span class="placeholder-tag">Sample image</span></div>`;
}

const heartIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-8-4.9-8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8 3.5c0 6.1-8 11-8 11z"/></svg>`;

/* ---------------- Product card ---------------- */
function productCard(p) {
  const active = Wishlist.has(p.id) ? "is-active" : "";
  const badge = p.badge ? `<span class="product-badge ${p.badge === "bestseller" ? "bestseller" : ""}">${p.badge === "bestseller" ? "Bestseller" : "New"}</span>` : "";
  const priceHtml = `<span class="now">${money(p.price)}</span>${p.mrp ? `<span class="mrp">${money(p.mrp)}</span>` : ""}`;
  const swatches = p.colors.map(c => `<span class="swatch" style="background:${c}"></span>`).join("");
  return `
  <article class="product-card reveal">
    <div class="product-media">
      ${badge}
      <button class="wishlist-btn ${active}" data-wishlist="${p.id}" aria-pressed="${Wishlist.has(p.id)}" aria-label="Save ${p.name} to favourites">${heartIcon}</button>
      <a href="product.html?id=${p.id}" aria-label="View ${p.name}">
        ${placeholderMedia(p)}
        ${placeholderMedia(p, "alt", true)}
      </a>
      <a href="product.html?id=${p.id}" class="product-quickview">View details</a>
    </div>
    <div class="product-info">
      <p class="p-category">${p.category}</p>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-price">${priceHtml}</div>
      <div class="swatch-row">${swatches}</div>
    </div>
  </article>`;
}

function renderGrid(container, products) {
  if (!container) return;
  container.innerHTML = products.length
    ? products.map(productCard).join("")
    : `<p class="no-results">No pieces match those filters yet. Try clearing one or two.</p>`;
  bindWishlistButtons(container);
  observeReveals(container);
}

/* ---------------- Wishlist button binding ---------------- */
function bindWishlistButtons(scope = document) {
  scope.querySelectorAll("[data-wishlist]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-wishlist");
      const nowActive = Wishlist.toggle(id);
      btn.classList.toggle("is-active", nowActive);
      btn.setAttribute("aria-pressed", String(nowActive));
      const product = PRODUCTS.find(p => p.id === id);
      showToast(nowActive ? `Added "${product.name}" to favourites` : `Removed "${product.name}" from favourites`);
    });
  });
}

/* ---------------- Toast ---------------- */
let toastTimer;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8 3.5c0 6.1-8 11-8 11z"/></svg><span></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector("span").textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

/* ---------------- Wishlist count badge ---------------- */
function updateWishlistBadges() {
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    const c = Wishlist.count();
    el.textContent = c;
    el.style.display = c > 0 ? "flex" : "none";
  });
}
document.addEventListener("wishlist:change", () => {
  updateWishlistBadges();
  renderDrawer();
});

/* ---------------- Wishlist drawer ---------------- */
function renderDrawer() {
  const body = document.querySelector("[data-drawer-body]");
  const foot = document.querySelector("[data-drawer-foot]");
  if (!body) return;
  const items = Wishlist.get().map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (!items.length) {
    body.innerHTML = `<div class="drawer-empty">No favourites yet.<br>Tap the heart on any piece to save it here, then send them all to us on WhatsApp in one go.</div>`;
    if (foot) foot.innerHTML = "";
    return;
  }

  body.innerHTML = items.map(p => `
    <div class="drawer-item">
      ${placeholderMedia(p)}
      <div>
        <h4>${p.name}</h4>
        <p class="meta">${p.category} · ${p.fabric}</p>
        <p class="price">${money(p.price)}</p>
      </div>
      <button class="drawer-remove" data-wishlist="${p.id}">Remove</button>
    </div>
  `).join("");
  bindWishlistButtons(body);

  if (foot) {
    const link = buildWhatsAppLink(items.map(p => `${p.name} (${money(p.price)})`), "I'd love more details on these saved pieces from Nidha's:");
    foot.innerHTML = `
      <p>${items.length} piece${items.length > 1 ? "s" : ""} saved. We'll help with sizing, fabric and pricing over WhatsApp.</p>
      <a class="btn btn-whatsapp btn-block" href="${link}" target="_blank" rel="noopener">${whatsappIcon} Enquire on WhatsApp</a>`;
  }
}

function whatsappUrl(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
function buildWhatsAppLink(lines, intro) {
  const text = `Hi ${BRAND_NAME}! ${intro}\n\n` + lines.map((l, i) => `${i + 1}. ${l}`).join("\n") + `\n\nCould you share availability and next steps?`;
  return whatsappUrl(WHATSAPP_NUMBER, text);
}
const whatsappIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.7 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 20.2 12 8.2 8.2 0 0 1 12 20.2z"/></svg>`;

function initDrawer() {
  const overlay = document.querySelector("[data-drawer-overlay]");
  const drawer = document.querySelector("[data-drawer]");
  const openers = document.querySelectorAll("[data-drawer-open]");
  const closers = document.querySelectorAll("[data-drawer-close]");
  const open = () => { overlay?.classList.add("is-open"); drawer?.classList.add("is-open"); document.body.style.overflow = "hidden"; renderDrawer(); };
  const close = () => { overlay?.classList.remove("is-open"); drawer?.classList.remove("is-open"); document.body.style.overflow = ""; };
  openers.forEach(b => b.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  closers.forEach(b => b.addEventListener("click", close));
  overlay?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ---------------- Mobile nav ---------------- */
function initMobileNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-mobile-nav-close]");
  toggle?.addEventListener("click", () => { nav?.classList.add("is-open"); document.body.style.overflow = "hidden"; });
  closeBtn?.addEventListener("click", () => { nav?.classList.remove("is-open"); document.body.style.overflow = ""; });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("is-open"); document.body.style.overflow = ""; }));
}

/* ---------------- Newsletter (fake submit) ---------------- */
function initNewsletter() {
  const form = document.querySelector("[data-newsletter]");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.querySelector("[data-form-msg]");
    const input = form.querySelector("input[type=email]");
    if (!input.value.trim()) return;
    if (msg) msg.textContent = "You're on the list — welcome to the Nidha's circle.";
    form.reset();
  });
}

/* ---------------- Testimonials carousel ---------------- */
function initTestimonials() {
  const wrap = document.querySelector("[data-testi]");
  if (!wrap) return;
  const slides = [...wrap.querySelectorAll(".testi-slide")];
  const dots = [...wrap.querySelectorAll(".testi-dot")];
  let i = 0;
  const show = (n) => {
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === n));
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === n));
    i = n;
  };
  dots.forEach((d, idx) => d.addEventListener("click", () => show(idx)));
  setInterval(() => show((i + 1) % slides.length), 5500);
}

/* ---------------- Reveal on scroll ---------------- */
function observeReveals(scope = document) {
  const els = scope.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ---------------- Shared init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Note: wishlist buttons only ever exist inside dynamically rendered
  // product grids / the favourites drawer, and renderGrid()/renderDrawer()
  // already bind their own listeners — binding again here would double-fire.
  updateWishlistBadges();
  initDrawer();
  initMobileNav();
  initNewsletter();
  initTestimonials();
  observeReveals();
});
