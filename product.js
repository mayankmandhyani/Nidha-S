/* Product detail page — reads ?id= and renders from the shared PRODUCTS array */
(function () {
  const root = document.querySelector("[data-pd-root]");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "p1";
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  let selectedSize = product.sizes[Math.floor(product.sizes.length / 2)];
  let selectedColorIdx = 0;

  /* ---- Breadcrumb + title ---- */
  document.title = `${product.name} — ${BRAND_NAME}`;
  document.querySelector("[data-crumb-cat]").textContent = product.category;
  document.querySelector("[data-crumb-cat]").href = `shop.html?category=${encodeURIComponent(product.category)}`;
  document.querySelector("[data-crumb-name]").textContent = product.name;

  /* ---- Gallery ---- */
  const mainWrap = document.querySelector("[data-pd-main]");
  const thumbWrap = document.querySelector("[data-pd-thumbs]");
  const shots = [0, 18, 36, 54, 72]; // hue offsets to fake 5 distinct angles
  function setMain(idx) {
    mainWrap.innerHTML = `<div class="placeholder-media" style="--ph-h:${(product.hue + shots[idx]) % 360}" data-mono="N" role="img" aria-label="Photo ${idx + 1} of ${product.name}"><span class="placeholder-tag">Sample image ${idx + 1}/5</span></div>`;
    thumbWrap.querySelectorAll(".pd-thumb").forEach((t, i) => t.classList.toggle("is-active", i === idx));
  }
  thumbWrap.innerHTML = shots.map((h, i) => `
    <button class="pd-thumb ${i === 0 ? "is-active" : ""}" data-idx="${i}" aria-label="Show image ${i + 1}">
      <div class="placeholder-media" style="--ph-h:${(product.hue + h) % 360}" data-mono="N"></div>
    </button>`).join("");
  thumbWrap.querySelectorAll(".pd-thumb").forEach(btn => btn.addEventListener("click", () => setMain(Number(btn.dataset.idx))));
  setMain(0);

  /* ---- Info block ---- */
  document.querySelector("[data-pd-category]").textContent = product.category;
  document.querySelector("[data-pd-name]").textContent = product.name;
  document.querySelector("[data-pd-rating]").innerHTML =
    Array.from({ length: 5 }).map((_, i) => `<svg viewBox="0 0 20 20"><path d="M10 1l2.6 5.9 6.4.6-4.8 4.4L15.6 19 10 15.6 4.4 19l1.4-7.1L1 7.5l6.4-.6z"/></svg>`).join("") +
    ` <span>${product.rating.toFixed(1)} (${product.reviews} reviews)</span>`;

  const priceWrap = document.querySelector("[data-pd-price]");
  priceWrap.innerHTML = `<span>${money(product.price)}</span>` +
    (product.mrp ? `<span class="mrp">${money(product.mrp)}</span><span class="save">${Math.round((1 - product.price / product.mrp) * 100)}% off</span>` : "");

  document.querySelector("[data-pd-fabric]").textContent = product.fabric;
  document.querySelector("[data-pd-desc]").textContent =
    `A ${product.fabric.toLowerCase()} piece from our ${product.category.toLowerCase()} edit, finished with hand detailing true to Nidha's craft standards. Every set is inspected before it leaves the atelier.`;

  /* ---- Size selector ---- */
  const sizeRow = document.querySelector("[data-size-row]");
  sizeRow.innerHTML = product.sizes.map(s => `<button class="size-pill" data-size="${s}" aria-pressed="${s === selectedSize}">${s}</button>`).join("");
  sizeRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".size-pill");
    if (!btn) return;
    selectedSize = btn.dataset.size;
    sizeRow.querySelectorAll(".size-pill").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    updateWhatsAppLink();
  });

  /* ---- Colour selector ---- */
  const colorRow = document.querySelector("[data-color-row]");
  colorRow.innerHTML = product.colors.map((c, i) => `<button class="color-chip" style="background:${c}" data-idx="${i}" aria-pressed="${i === 0}" aria-label="Colour option ${i + 1}"></button>`).join("");
  colorRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".color-chip");
    if (!btn) return;
    selectedColorIdx = Number(btn.dataset.idx);
    colorRow.querySelectorAll(".color-chip").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    updateWhatsAppLink();
  });

  /* ---- Wishlist button ---- */
  const wishBtn = document.querySelector("[data-pd-wishlist]");
  function syncWishBtn() {
    const active = Wishlist.has(product.id);
    wishBtn.classList.toggle("is-active", active);
    wishBtn.setAttribute("aria-pressed", String(active));
    wishBtn.querySelector("span").textContent = active ? "Saved to Favourites" : "Add to Favourites";
  }
  wishBtn.addEventListener("click", () => {
    const active = Wishlist.toggle(product.id);
    syncWishBtn();
    showToast(active ? "Added to favourites" : "Removed from favourites");
  });
  syncWishBtn();

  /* ---- WhatsApp enquiry link ---- */
  const waBtn = document.querySelector("[data-pd-whatsapp]");
  function updateWhatsAppLink() {
    const msg = `Hi ${BRAND_NAME}! I'm interested in "${product.name}" (${product.category}) — Size ${selectedSize}, ${money(product.price)}. Could you share availability and fabric details?\n\n${location.href}`;
    waBtn.href = whatsappUrl(WHATSAPP_NUMBER, msg);
  }
  updateWhatsAppLink();

  /* ---- Size guide modal ---- */
  const modalOverlay = document.querySelector("[data-size-modal]");
  document.querySelectorAll("[data-size-guide-open]").forEach(b => b.addEventListener("click", (e) => { e.preventDefault(); modalOverlay.classList.add("is-open"); }));
  document.querySelectorAll("[data-size-modal-close]").forEach(b => b.addEventListener("click", () => modalOverlay.classList.remove("is-open")));
  modalOverlay?.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("is-open"); });

  /* ---- Related products ---- */
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const fallback = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
  renderGrid(document.querySelector("[data-related-grid]"), related.length ? related : fallback);
})();
