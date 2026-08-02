/* ==================================================================
   NIDHA'S — enquiry click tracking (Google Analytics 4)

   What this measures: every click on a WhatsApp link, site-wide —
   from the hero CTA, footer, mobile nav, a single product page, or
   the wishlist drawer's "enquire on all saved" button.

   What this does NOT measure: whether that click became a sale, or
   for how much. That data lives inside the WhatsApp conversation and
   Nidha's own records — nothing on the website can see it. Treat
   these numbers as "enquiry volume," not "revenue," and don't build
   commission math directly on top of this file.

   Setup required: replace GA_MEASUREMENT_ID in every HTML file's
   <head> with the real GA4 Measurement ID (starts with "G-").
   Until then this fails silently — no errors, just no tracking.
   ================================================================== */
(function () {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="wa.me/"]');
    if (!link) return;

    let messagePreview = "";
    try {
      messagePreview = new URL(link.href).searchParams.get("text") || "";
    } catch { /* malformed URL — ignore, still log the click itself */ }

    const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "");

    if (typeof gtag === "function") {
      gtag("event", "whatsapp_enquiry", {
        page_context: page,
        message_preview: messagePreview.slice(0, 100), // GA truncates long params anyway
      });
    }
    // No GA fallback is intentional: a client-side counter (e.g. localStorage)
    // can only ever count clicks from ONE visitor's own browser — it can't
    // add up across everyone who visits the site, which is the entire point
    // of "how many people sent enquiries." That aggregation has to happen
    // on a server somewhere (GA4's, or later, Supabase's) — there's no way
    // to fake it purely in the browser.
  }, true);
})();
