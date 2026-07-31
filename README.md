# Nidha's — Demo Site

Static demo (no build step). Home, Collections and Product Detail pages.

## Files
- index.html / shop.html / product.html — the three pages
- style.css — the design system (untouched by the motion pass)
- motion.css — all animation/motion additions, loaded after style.css
- main.js — product data, wishlist, drawer, nav, testimonials
- home.js / shop.js / product.js — page-specific rendering
- motion.js — hero sequence, scroll header, custom cursor, video-frame loader
- videos/ — drop real .mp4 files here (see videos/README.md)

## Run locally
Open index.html in a browser. No server, no npm install.

## Before this goes live
- Replace WHATSAPP_NUMBER in main.js with the real WhatsApp Business number.
- Add real product photography (replace the CSS placeholder panels).
- Add real .mp4 files to /videos using the exact filenames already
  referenced (hero.mp4, bridal.mp4, collection.mp4, craftsmanship.mp4)
  — no code changes needed, they'll be picked up automatically.
- Replace the demo PRODUCTS array in main.js with real catalogue data.
