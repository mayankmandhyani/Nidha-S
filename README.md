# Nidha's — Demo Site

Static demo (no build step). Home, Collections and Product Detail pages.

## Business model reflected in this build
- Unstitched fabric only — not ready-made kurtis.
- Every design sold as the complete set of its 4 colourways together —
  no single-colour purchase. Enforced in the product data model itself
  (colors is always exactly 4), not just mentioned in copy.
- No size selection anywhere (nothing is pre-stitched).

## Bilingual (EN / Hindi)
- Toggle in the header (EN / हिं). Persists across pages via localStorage.
- Product names, category names and fabric names stay in English always,
  by design — everything else (nav, hero, footer, forms, badges, product
  detail chrome) switches.
- Dictionary lives in i18n.js. Add a key there (both `en` and `hi`
  blocks) and either add `data-i18n="key"` to an element, or call
  `t('key')` from JS for dynamically generated text.

## Files
- index.html / shop.html / product.html — the three pages
- style.css — design system + the new navy/orange brand tokens
- motion.css / motion.js — animation layer
- i18n.js — English/Hindi dictionary + language toggle
- main.js — product data, wishlist, drawer, nav, testimonials
- home.js / shop.js / product.js — page-specific rendering
- videos/ — drop real .mp4 files here (see videos/README.md)

## Run locally
Open index.html in a browser. No server, no npm install.

## Before this goes live
- Replace WHATSAPP_NUMBER in main.js with the real WhatsApp Business number.
- Add real product photography (replace the CSS placeholder panels).
- Add real .mp4 files to /videos using the exact filenames referenced.
- Replace the demo PRODUCTS array in main.js with real catalogue data —
  keep exactly 4 colors per design to match the set-only model.
- Have a Hindi speaker proofread i18n.js — the translations are a solid
  first pass but weren't reviewed by a native speaker.
