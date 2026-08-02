# Nidha's — Demo Site

## What's new in this pass
- Real logo: logo.png (transparent navy wordmark, cut from your logo file)
  now used in the header, mobile nav, and footer — replacing the CSS text
  approximation. logo-full-res.png is a larger version for anything that
  needs more than web resolution (print, signage, etc).
- favicon.png / apple-touch-icon.png — cropped from your original logo
  (kept the orange field here since a tiny navy-on-transparent wordmark
  would be unreadable at favicon size).
- Orange is now a deliberate, high-visibility brand color, not just a
  thin accent: the announcement bar and every primary button use it,
  with primary buttons flipping to navy on hover. Kept it to those two
  spots on purpose — spreading it across every element would fight the
  "professional, not just orange background" note.

## Business model (from before, unchanged)
- Unstitched fabric only — not ready-made kurtis.
- Every design sold as the complete set of its 4 colourways together.
- No sizes anywhere (nothing is pre-stitched).

## Bilingual (EN / Hindi)
Toggle in the header. Product/category/fabric names never translate.
Have a native speaker proof i18n.js before this goes live.

## Files
- index.html / shop.html / product.html
- style.css — design system + navy/orange brand tokens
- motion.css / motion.js — animation layer
- i18n.js — English/Hindi dictionary + language toggle
- main.js / home.js / shop.js / product.js — data + page logic
- logo.png, logo-full-res.png, favicon.png, apple-touch-icon.png
- videos/ — drop real .mp4 files here

## Run locally
Open index.html in a browser. No server, no npm install.

## Before this goes live
- Replace WHATSAPP_NUMBER in main.js with the real number.
- Add real product photography and real .mp4 files.
- Replace the demo PRODUCTS array with real catalogue data (exactly 4
  colors per design).
- Native-speaker review of the Hindi in i18n.js.
