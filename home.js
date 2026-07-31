/* Homepage — pulls curated subsets out of the shared PRODUCTS array */
(function () {
  const arrivalsGrid = document.querySelector("[data-arrivals-grid]");
  const bestGrid = document.querySelector("[data-best-grid]");
  if (arrivalsGrid) renderGrid(arrivalsGrid, PRODUCTS.filter(p => p.badge === "new").slice(0, 4));
  if (bestGrid) renderGrid(bestGrid, PRODUCTS.filter(p => p.badge === "bestseller").slice(0, 4));
})();
