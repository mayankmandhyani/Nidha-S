/* Product detail page — reads ?id= and renders from the shared PRODUCTS array.
   No size selector: Nidha's sells unstitched fabric. Colours are shown as
   the fixed set of 4 the design ships with, not a single-colour picker. */
(function () {
  const root = document.querySelector("[data-pd-root]");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "p1";
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  /* ---- Breadcrumb + title (English category name — catalogue data, not translated) ---- */
  document.title = `${product.name} — ${BRAND_NAME}`;
  document.querySelector("[data-crumb-cat]").textContent = product.category;
  document.querySelector("[data-crumb-cat]").href = `shop.html?category=${encodeURIComponent(product.category)}`;
  document.querySelector("[data-crumb-name]").textContent = product.name;

  /* ---- Gallery ---- */
  const mainWrap = document.querySelector("[data-pd-main]");
  const thumbWrap = document.querySelector("[data-pd-thumbs]");
  const shots = [0, 18, 36, 54, 72]; // hue offsets to fake 5 distinct angles
  function setMain(idx) {
    mainWrap.innerHTML = `<div class="placeholder-media" style="--ph-h:${(product.hue + shots[idx]) % 360}" data-mono="N" role="img" aria-label="Photo ${idx + 1} of ${product.name}"><span class="placeholder-tag">${t("media.sampleImage")} ${idx + 1}/5</span></div>`;
    thumbWrap.querySelectorAll(".pd-thumb").forEach((t2, i) => t2.classList.toggle("is-active", i === idx));
  }
  thumbWrap.innerHTML = shots.map((h, i) => `
    <button class="pd-thumb ${i === 0 ? "is-active" : ""}" data-idx="${i}" aria-label="Show image ${i + 1}">
      <div class="placeholder-media" style="--ph-h:${(product.hue + h) % 360}" data-mono="N"></div>
    </button>`).join("");
  thumbWrap.querySelectorAll(".pd-thumb").forEach(btn => btn.addEventListener("click", () => setMain(Number(btn.dataset.idx))));
  setMain(0);

  /* ---- Info block (category/name/fabric stay English — catalogue data) ---- */
  document.querySelector("[data-pd-category]").textContent = product.category;
  document.querySelector("[data-pd-name]").textContent = product.name;
  document.querySelector("[data-pd-rating]").innerHTML =
    Array.from({ length: 5 }).map(() => `<svg viewBox="0 0 20 20"><path d="M10 1l2.6 5.9 6.4.6-4.8 4.4L15.6 19 10 15.6 4.4 19l1.4-7.1L1 7.5l6.4-.6z"/></svg>`).join("") +
    ` <span>${product.rating.toFixed(1)} (${product.reviews})</span>`;

  const priceWrap = document.querySelector("[data-pd-price]");
  priceWrap.innerHTML = `<span>${money(product.price)}</span>` +
    (product.mrp ? `<span class="mrp">${money(product.mrp)}</span><span class="save">${Math.round((1 - product.price / product.mrp) * 100)}% off</span>` : "");

  document.querySelector("[data-pd-fabric]").textContent = product.fabric;

  function renderTranslatedText() {
    const descEl = document.querySelector("[data-pd-description-body]");
    if (descEl) descEl.textContent = t("pd.descriptionBody", { fabric: product.fabric, category: product.category });
    updateWhatsAppLink();
    syncWishBtn();
  }

  /* ---- Colours: informational display of the fixed set of 4, not a picker ---- */
  const colorRow = document.querySelector("[data-color-row]");
  colorRow.innerHTML = product.colors.map((c, i) =>
    `<span class="color-chip" style="background:${c}" aria-label="Colourway ${i + 1} of 4" title="Colourway ${i + 1} of 4"></span>`
  ).join("");

  /* ---- Wishlist button ---- */
  const wishBtn = document.querySelector("[data-pd-wishlist]");
  function syncWishBtn() {
    const active = Wishlist.has(product.id);
    wishBtn.classList.toggle("is-active", active);
    wishBtn.setAttribute("aria-pressed", String(active));
    const label = document.querySelector("[data-pd-wishlist-label]");
    if (label) label.textContent = t(active ? "pd.savedFavourite" : "pd.addFavourite");
  }
  wishBtn.addEventListener("click", () => {
    const active = Wishlist.toggle(product.id);
    syncWishBtn();
    showToast(t(active ? "toast.added" : "toast.removed", { name: product.name }));
  });

  /* ---- WhatsApp enquiry link (whole design + full set of 4 — no size/single colour) ---- */
  const waBtn = document.querySelector("[data-pd-whatsapp]");
  function updateWhatsAppLink() {
    const msg = `Hi ${BRAND_NAME}! ` + t("wa.productIntro", { name: product.name, category: product.category, price: money(product.price) }) + `\n\n${location.href}`;
    waBtn.href = whatsappUrl(WHATSAPP_NUMBER, msg);
  }

  /* ---- Related products ---- */
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const fallback = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
  renderGrid(document.querySelector("[data-related-grid]"), related.length ? related : fallback);

  renderTranslatedText();
  document.addEventListener("lang:change", renderTranslatedText);
})();
