# /videos

Drop real .mp4 files in here with these exact names — the site already
looks for them and will switch from the "Video Coming Soon" placeholder
to the real video automatically, no code changes needed:

  hero.mp4            → Homepage hero (gets a slow Ken Burns zoom)
  bridal.mp4          → "The Bridal Edit" collection card
  collection.mp4      → "Chikankari Story" collection card
  craftsmanship.mp4   → "Our Story" section

  about.mp4 is not wired in yet — there's no About page in this build
  yet. Same drop-in mechanism will apply once that page exists.

Keep each file reasonably compressed (H.264 .mp4, ideally under ~6-8MB)
since they autoplay muted/looped — a heavy file will make the section
feel slow to fade in on mobile connections.

Note: this is a flat static site (no Next.js/React build step), so
there's no /public folder — files are served straight from wherever
they sit in the repo. This folder just needs to stay named "videos"
and sit next to index.html, exactly as it does now.
