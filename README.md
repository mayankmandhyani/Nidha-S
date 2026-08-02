# Nidha's — Demo Site

## IMPORTANT — cache-busting added this pass
Every CSS/JS reference in the HTML now ends in "?v=2" (e.g. style.css?v=2).
This forces browsers and GitHub Pages' CDN to fetch the new file instead
of quietly reusing an old cached copy — which is almost certainly why the
orange changes from the last update weren't showing up: the HTML had
updated (new logo, new EN/HI toggle) but style.css was still being served
from cache.

Going forward: every time you push a real CSS/JS change, bump the number
(?v=2 -> ?v=3, etc.) in all three HTML files, or the same caching problem
will happen again. Find-and-replace "v=2" with "v=3" across all three
files takes 10 seconds and avoids this.

## Also fixed: header layout bug on mobile
The logo and the EN/हिं toggle were crowding into each other on phone-
width screens (visible in your screenshot) — a real CSS layout bug, not
a cache issue. Rebuilt the mobile header row with flexbox instead of a
3-column grid that had an empty, unused third column once the desktop
nav was hidden. Also capped the logo image's max-width defensively so
it can never blow out past a sane size regardless of screen width.

## Orange — confirmed present in the code
--gold-btn: #cf7539, used on .announce (top bar) and .btn-primary
(main CTA buttons). This was already correct in the file you have —
the screenshot was showing a stale cached version, not missing code.

## Everything else from before, unchanged
Unstitched fabric / set-of-4 model, EN-Hindi toggle, real logo, GA4
enquiry click tracking. See earlier notes for details.

## Run locally
Open index.html in a browser. No server, no npm install.

## Before this goes live
- Replace WHATSAPP_NUMBER in main.js.
- Replace GA_MEASUREMENT_ID in every HTML <head>.
- Real product photography + real .mp4s in /videos.
- Replace the demo PRODUCTS array with real catalogue data.
- Native-speaker review of the Hindi in i18n.js.
