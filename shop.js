/* Shop / collection listing page logic — filters over the shared PRODUCTS array.
   No size filter: Nidha's sells unstitched fabric, so sizes don't apply. */
(function () {
  const grid = document.querySelector("[data-product-grid]");
  const countEl = document.querySelector("[data-shop-count]");
  const sortEl = document.querySelector("[data-sort]");
  const form = document.querySelector("[data-filter-form]");
  const clearBtn = document.querySelector("[data-filters-clear]");

  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const presetCategory = params.get("category");

  function getChecked(name) {
    return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);
  }

  function apply() {
    let list = [...PRODUCTS];

    const cats = getChecked("category");
    const fabrics = getChecked("fabric");

    if (cats.length) list = list.filter(p => cats.includes(p.category));
    if (fabrics.length) list = list.filter(p => fabrics.some(f => p.fabric.toLowerCase().includes(f.toLowerCase())));

    switch (sortEl?.value) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: break; // "newest" keeps demo order
    }

    if (countEl) countEl.textContent = tt("shop.countPieces", { count: list.length });
    renderGrid(grid, list);
  }

  form?.addEventListener("change", apply);
  sortEl?.addEventListener("change", apply);
  clearBtn?.addEventListener("click", () => {
    form.querySelectorAll("input[type=checkbox]").forEach(i => (i.checked = false));
    apply();
  });
  document.addEventListener("lang:change", apply); // re-render so the count string & grid badges pick up the new language

  // Pre-check category from URL (e.g. index.html links "Shop Bridal")
  if (presetCategory) {
    const box = form?.querySelector(`input[name="category"][value="${presetCategory}"]`);
    if (box) box.checked = true;
  }

  // Mobile filter drawer
  const filterPanel = document.querySelector("[data-filters]");
  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filterClose = document.querySelector("[data-filter-close]");
  filterToggle?.addEventListener("click", () => filterPanel?.classList.add("is-open-mobile"));
  filterClose?.addEventListener("click", () => filterPanel?.classList.remove("is-open-mobile"));

  apply();
})();
