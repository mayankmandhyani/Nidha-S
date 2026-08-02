/* ==================================================================
   NIDHA'S — demo data + interactions
   This file simulates what will later come from Supabase:
   PRODUCTS  ->  `products` table (joined with categories/images/variants)
   Everything else is plain UI wiring so the look & flow can be judged
   before any backend is built.

   BUSINESS MODEL NOTE: Nidha's sells unstitched fabric, by design —
   each "product" below is one print/embroidery design, sold ONLY as
   the complete set of its 4 colourways together. There is no size
   selection (nothing is pre-stitched) and no single-colour purchase.
   That's reflected in the data shape (colors: exactly 4, no sizes
   field at all) and enforced in the copy on every product card and
   the product detail page, not just mentioned once and forgotten.
   ================================================================== */

/* ---------------- CONFIG ---------------- */
const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with Nidha's real WhatsApp Business number
const BRAND_NAME = "Nidha's";

/* ---------------- DEMO PRODUCT DATA ----------------
   Product names stay in English always (per Nidha's — catalogue/style
   names aren't translated even when the UI is switched to Hindi).
   "colors" is always exactly 4: the full set. "price" is the price
   for that complete set of 4, not a single piece.                  */
const PRODUCTS = [
  { id: "p1", name: "Rani Pink Chikankari Design", category: "Chikankari", fabric: "Pure Cotton", price: 4999, mrp: 6499, colors: ["#c05a72","#f3e7d8","#8a9a7c","#e3b7ae"], badge: "bestseller", hue: 350, rating: 4.8, reviews: 62, tags:["chikankari","anarkali","festive"] },
  { id: "p2", name: "Ivory Georgette Sharara Design", category: "Festive Wear", fabric: "Georgette", price: 6299, mrp: 7999, colors: ["#efe7da","#c9a860","#c05a72","#3a342b"], badge: "new", hue: 42, rating: 4.6, reviews: 24, tags:["sharara","festive","party"] },
  { id: "p3", name: "Sage Green Straight Kurta Design", category: "Kurta Sets", fabric: "Cotton Silk", price: 3299, mrp: null, colors: ["#8a9a7c","#3a342b","#e3b7ae","#f3e7d8"], badge: null, hue: 100, rating: 4.7, reviews: 88, tags:["kurta","casual","daily"] },
  { id: "p4", name: "Midnight Blue Bridal Design", category: "Bridal", fabric: "Raw Silk", price: 18999, mrp: 23999, colors: ["#2a3355","#c86b2a","#6b2635","#1f5c4a"], badge: "bestseller", hue: 225, rating: 5.0, reviews: 19, tags:["bridal","lehenga","wedding"] },
  { id: "p5", name: "Blush Chanderi Palazzo Design", category: "Festive Wear", fabric: "Chanderi Silk", price: 5499, mrp: null, colors: ["#e3b7ae","#eee3d0","#8a9a7c","#c05a72"], badge: null, hue: 12, rating: 4.5, reviews: 31, tags:["palazzo","festive"] },
  { id: "p6", name: "Charcoal Chikankari Design", category: "Chikankari", fabric: "Pure Cotton", price: 2899, mrp: 3499, colors: ["#3a342b","#ffffff","#8a9a7c","#e3b7ae"], badge: null, hue: 30, rating: 4.4, reviews: 47, tags:["chikankari","kurta","daily"] },
  { id: "p7", name: "Mustard Silk Anarkali Design", category: "Festive Wear", fabric: "Art Silk", price: 7499, mrp: 8999, colors: ["#c9922e","#3a342b","#6b2635","#f3e7d8"], badge: "new", hue: 40, rating: 4.7, reviews: 15, tags:["anarkali","gown","party"] },
  { id: "p8", name: "Ivory & Rust Bridal Design", category: "Bridal", fabric: "Silk Blend", price: 21999, mrp: null, colors: ["#efe7da","#c86b2a","#2a3355","#6b2635"], badge: "bestseller", hue: 45, rating: 4.9, reviews: 11, tags:["bridal","sharara","wedding"] },
  { id: "p9", name: "Coral Cotton Co-ord Design", category: "Kurta Sets", fabric: "Cotton", price: 2599, mrp: 2999, colors: ["#d97e63","#f3e7d8","#8a9a7c","#3a342b"], badge: "new", hue: 18, rating: 4.3, reviews: 54, tags:["coord","casual","daily"] },
  { id: "p10", name: "Wine Velvet Festive Design", category: "Festive Wear", fabric: "Velvet", price: 8299, mrp: 9999, colors: ["#6b2635","#c86b2a","#2a3355","#f3e7d8"], badge: "bestseller", hue: 350, rating: 4.8, reviews: 28, tags:["velvet","festive","winter"] },
  { id: "p11", name: "White Chikankari Palazzo Design", category: "Chikankari", fabric: "Cotton Lawn", price: 3799, mrp: null, colors: ["#ffffff","#8a9a7c","#e3b7ae","#c05a72"], badge: "new", hue: 60, rating: 4.6, reviews: 33, tags:["chikankari","palazzo","daily"] },
  { id: "p12", name: "Emerald Silk Bridal Design", category: "Bridal", fabric: "Pure Silk", price: 19499, mrp: 24999, colors: ["#1f5c4a","#c86b2a","#efe7da","#2a3355"], badge: null, hue: 155, rating: 4.9, reviews: 9, tags:["bridal","anarkali","wedding"] },
];

const money = (n) => "\u20B9" + n.toLocaleString("en-IN");
const tt = (key, vars) => (typeof t === "function" ? t(key, vars) : key);

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
  return `<div class="placeholder-media ${extraClass}" style="--ph-h:${hue}" data-mono="N" role="img" aria-label="Placeholder photo for ${product.name}"><span class="placeholder-tag" data-i18n="media.sampleImage">${tt("media.sampleImage")}</span></div>`;
}

const heartIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-8-4.9-8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8 3.5c0 6.1-8 11-8 11z"/></svg>`;

/* ---------------- Product card ---------------- */
function productCard(p) {
  const active = Wishlist.has(p.id) ? "is-active" : "";
  const badgeKey = p.badge === "bestseller" ? "badge.bestseller" : p.badge === "new" ? "badge.new" : null;
  const badge = badgeKey ? `<span class="product-badge ${p.badge === "bestseller" ? "bestseller" : ""}" data-i18n="${badgeKey}">${tt(badgeKey)}</span>` : "";
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
      <a href="product.html?id=${p.id}" class="product-quickview" data-i18n="card.viewDetails">${tt("card.viewDetails")}</a>
    </div>
    <div class="product-info">
      <p class="p-category">${p.category}</p>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-price">${priceHtml}</div>
      <div class="swatch-row">${swatches}</div>
      <p class="set-note" data-i18n="card.setOf4">${tt("card.setOf4")}</p>
    </div>
  </article>`;
}

function renderGrid(container, products) {
  if (!container) return;
  container.innerHTML = products.length
    ? products.map(productCard).join("")
    : `<p class="no-results" data-i18n="shop.noResults">${tt("shop.noResults")}</p>`;
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
      showToast(tt(nowActive ? "toast.added" : "toast.removed", { name: product.name }));
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
    body.innerHTML = `<div class="drawer-empty" data-i18n-html="drawer.empty">${tt("drawer.empty")}</div>`;
    if (foot) foot.innerHTML = "";
    return;
  }

  body.innerHTML = items.map(p => `
    <div class="drawer-item">
      ${placeholderMedia(p)}
      <div>
        <h4>${p.name}</h4>
        <p class="meta">${p.category} · ${p.fabric}</p>
        <p class="meta" data-i18n="card.setOf4">${tt("card.setOf4")}</p>
        <p class="price">${money(p.price)}</p>
      </div>
      <button class="drawer-remove" data-wishlist="${p.id}" data-i18n="drawer.remove">${tt("drawer.remove")}</button>
    </div>
  `).join("");
  bindWishlistButtons(body);

  if (foot) {
    const link = buildWhatsAppLink(
      items.map(p => `${p.name} — ${tt("card.setOf4")} (${money(p.price)})`),
      tt("wa.savedIntro")
    );
    foot.innerHTML = `
      <p>${tt("drawer.footNote", { count: items.length })}</p>
      <a class="btn btn-whatsapp btn-block" href="${link}" target="_blank" rel="noopener">${whatsappIcon} <span data-i18n="cta.whatsappEnquire">${tt("cta.whatsappEnquire")}</span></a>`;
  }
}

function whatsappUrl(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
function buildWhatsAppLink(lines, intro) {
  const text = `Hi ${BRAND_NAME}! ${intro}\n\n` + lines.map((l, i) => `${i + 1}. ${l}`).join("\n") + `\n\n${tt("wa.closing")}`;
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
    if (msg) msg.textContent = tt("newsletter.success");
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
  let timer = setInterval(() => show((i + 1) % slides.length), 5500);
  wrap.addEventListener("mouseenter", () => clearInterval(timer));
  wrap.addEventListener("mouseleave", () => {
    timer = setInterval(() => show((i + 1) % slides.length), 5500);
  });
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
