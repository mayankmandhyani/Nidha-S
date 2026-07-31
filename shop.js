/* Shop / collection listing page logic — filters over the shared PRODUCTS array */
(function () {
  const grid = document.querySelector("[data-product-grid]");
  const countEl = document.querySelector("[data-shop-count]");
  const sortEl = document.querySelector("[data-sort]");
  const form = document.querySelector("[data-filter-form]");
  const clearBtn = document.querySelector("[data-filters-clear]");

  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const state = {
    category: params.get("category") ? [params.get("category")] : [],
    fabric: [],
    size: [],
    sort: "newest",
  };

  function getChecked(name) {
    return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);
  }

  function apply() {
    let list = [...PRODUCTS];

    const cats = getChecked("category");
    const fabrics = getChecked("fabric");
    const sizes = getChecked("size");

    if (cats.length) list = list.filter(p => cats.includes(p.category));
    if (fabrics.length) list = list.filter(p => fabrics.some(f => p.fabric.toLowerCase().includes(f.toLowerCase())));
    if (sizes.length) list = list.filter(p => p.sizes.some(s => sizes.includes(s)));

    switch (sortEl?.value) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: break; // "newest" keeps demo order
    }

    if (countEl) countEl.textContent = `${list.length} piece${list.length !== 1 ? "s" : ""}`;
    renderGrid(grid, list);
  }

  form?.addEventListener("change", apply);
  sortEl?.addEventListener("change", apply);
  clearBtn?.addEventListener("click", () => {
    form.querySelectorAll("input[type=checkbox]").forEach(i => (i.checked = false));
    apply();
  });

  // Pre-check category from URL (e.g. index.html links "Shop Bridal")
  if (state.category.length) {
    const box = form?.querySelector(`input[name="category"][value="${state.category[0]}"]`);
    if (box) box.checked = true;
  }

  // Mobile filter drawer (reuses the wishlist drawer's visual language via its own toggle)
  const filterPanel = document.querySelector("[data-filters]");
  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filterClose = document.querySelector("[data-filter-close]");
  filterToggle?.addEventListener("click", () => filterPanel?.classList.add("is-open-mobile"));
  filterClose?.addEventListener("click", () => filterPanel?.classList.remove("is-open-mobile"));

  apply();
})();
