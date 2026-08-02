/* ==================================================================
   NIDHA'S — MOTION LAYER (behaviour)
   Loads after main.js and the page-specific script. Everything here
   is opt-in and defensive: if an expected element isn't on the page,
   the relevant init function just returns early.
   ================================================================== */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Hero entrance ---------------- */
  function initHero() {
    const copy = document.querySelector(".hero-copy");
    if (!copy || reduceMotion) return;
    const h1 = copy.querySelector("h1");
    if (!h1) return;
    // Wrap each word in its own span so it can rise in on a stagger,
    // while leaving the <br> (and therefore the line break) intact.
    // The CSS animations themselves don't depend on this running —
    // they fire on their own timing as soon as `.js-motion` is set,
    // so if this fails for any reason the heading is just unsplit
    // (no stagger) rather than invisible.
    const frag = document.createDocumentFragment();
    let wordIndex = 0;
    h1.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/); // keep separators
        words.forEach((chunk) => {
          if (chunk.trim() === "") {
            frag.appendChild(document.createTextNode(chunk));
          } else {
            const span = document.createElement("span");
            span.className = "word";
            span.textContent = chunk;
            span.style.animationDelay = (0.15 + wordIndex * 0.045) + "s";
            wordIndex++;
            frag.appendChild(span);
          }
        });
      } else {
        frag.appendChild(node.cloneNode(true));
      }
    });
    h1.innerHTML = "";
    h1.appendChild(frag);
  }

  /* ---------------- Header: transparent-over-hero -> solid on scroll ---------------- */
  function initHeaderScroll() {
    if (!document.body.classList.contains("has-hero")) return;
    const header = document.querySelector(".site-header");
    if (!header) return;
    let ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 48);
      ticking = false;
    }
    update();
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------------- Video frames: lazy-load, fall back gracefully ---------------- */
  function initVideoFrames() {
    const frames = document.querySelectorAll("[data-video]");
    if (!frames.length) return;

    const start = (frame) => {
      const name = frame.getAttribute("data-video");
      if (!name || frame.dataset.started) return;
      frame.dataset.started = "1";
      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.preload = "none";
      video.setAttribute("aria-hidden", "true");
      video.addEventListener("loadeddata", () => {
        frame.classList.add("is-loaded");
        video.play().catch(() => {}); // muted autoplay can still be blocked on some browsers — fails silently, placeholder stays put
      }, { once: true });
      // No explicit error handling needed: if the file 404s (e.g. it
      // hasn't been added to /videos/ yet), loadeddata simply never
      // fires, "is-loaded" is never added, and the existing placeholder
      // + "Video Coming Soon" badge remain exactly as visible as before.
      frame.appendChild(video);
      video.src = "videos/" + name;
      video.load();
    };

    if (!("IntersectionObserver" in window)) {
      frames.forEach(start); // very old browser — just attempt them all
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "300px 0px" });
    frames.forEach((f) => io.observe(f));
  }

  /* ---------------- Enhanced newsletter submit: loading + success motion ----------------
     main.js already binds a plain submit handler to [data-newsletter] that sets the
     message text instantly. This listener runs in the CAPTURE phase (fires first) and
     fully takes over the interaction so there's an actual loading state to animate,
     rather than duplicating that handler with a race condition between the two. */
  function initNewsletterMotion() {
    const form = document.querySelector("[data-newsletter]");
    if (!form) return;
    // Listening on `document` with capture:true guarantees this runs before
    // main.js's own listener (which is bound directly to the form) — a
    // capture listener on the *same* element as another listener would NOT
    // reliably win by registration order, but one on an ancestor does.
    document.addEventListener("submit", (e) => {
      if (e.target !== form) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const input = form.querySelector("input[type=email]");
      const msg = form.querySelector("[data-form-msg]");
      if (!input || !input.value.trim()) return;
      if (form.classList.contains("is-submitting")) return;
      form.classList.add("is-submitting");
      const delay = reduceMotion ? 0 : 650;
      setTimeout(() => {
        form.classList.remove("is-submitting");
        if (msg) {
          msg.textContent = "You're on the list — welcome to the Nidha's circle.";
          msg.classList.remove("is-in");
          void msg.offsetWidth; // restart the transition if it fires twice
          msg.classList.add("is-in");
        }
        form.reset();
      }, delay);
    }, true);
  }

  /* ---------------- Custom cursor (desktop, fine pointer only) ---------------- */
  function initCursor() {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover || reduceMotion) return;

    const cursor = document.createElement("div");
    cursor.className = "lux-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);
    document.documentElement.classList.add("lux-cursor-active");

    let started = false;
    const move = (e) => {
      if (!started) { cursor.classList.add("is-visible"); started = true; }
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));

    const HOVER_SEL = "a, button, .btn, summary, input, select, textarea, .wishlist-btn, .icon-btn, .color-chip";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(HOVER_SEL)) cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      const stillInside = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER_SEL);
      if (e.target.closest(HOVER_SEL) && !stillInside) cursor.classList.remove("is-hover");
    });

    // If a touch event ever fires (hybrid devices lying about hover/pointer),
    // tear the custom cursor down rather than leave a native cursor hidden.
    window.addEventListener("touchstart", function teardown() {
      document.documentElement.classList.remove("lux-cursor-active");
      cursor.remove();
      window.removeEventListener("touchstart", teardown);
    }, { once: true, passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHero();
    initHeaderScroll();
    initVideoFrames();
    initNewsletterMotion();
    initCursor();
  });
})();
