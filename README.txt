LEAN LUGGAGE — WEBSITE FILES
=============================

WHAT'S HERE
- index.html              Homepage
- destinations.html        Destinations index (+ /destinations/philippines.html sample)
- itineraries.html         Itineraries index (+ /itineraries/banff-3-day.html sample)
- hidden-gems.html         Hidden Gems
- where-to-stay.html       Where to Stay
- travel-smart.html        Travel Smart guides
- travel-stories.html      Travel Stories (blog layout)
- about.html                About Lean Luggage
- css/styles.css            All design/styling
- js/main.js                 Mobile nav + newsletter form behavior
- robots.txt, sitemap.xml    Basic SEO scaffolding

DESIGN
Theme: "field journal + passport stamp." Deep teal + canvas paper +
a single crimson stamp accent, Fraunces for headlines, Work Sans for
body text, IBM Plex Mono for labels/metadata (boarding-pass/luggage-tag
feel). The recurring circular "stamp" badge is the signature element,
used on Hidden Gems entries. The header logo is a two-line lockup:
"Lean Luggage" (one line, no-wrap) with the tagline "The story isn't
at the landmark. It's down the road from it." underneath in small
italics.

TIKTOK EMBEDS
Destination and story pages can carry a "most-viewed TikTok for this
place" block (see destinations/washington.html for the live example).
To wire up a real video: open it on TikTok, tap Share > Embed, and
copy the exact blockquote + script TikTok gives you over the
placeholder block in that page's HTML (look for the <!-- Swap the
cite URL --> comment). No account/API connection needed — it's a
public oEmbed script.

PHOTOGRAPHY
All photo areas are currently soft gradient placeholders (classes
ph-1 through ph-6 in styles.css) so the layout is ready the moment
real photography goes in. To swap a placeholder for a real photo,
replace the ph-# class on a .tag-photo / .gem-photo / .about-photo /
.ph div with a background-image, e.g.:
  <div class="tag-photo" style="background-image:url('images/banff-01.jpg'); background-size:cover; background-position:center;">

WHAT'S SCAFFOLDED VS. FULLY BUILT
Every destination/itinerary card on the index pages links out to a
full page. Two full inner pages are built as templates to copy from:
  - destinations/washington.html
  - itineraries/banff-3-day.html
Duplicate either file for the next destination/itinerary and swap
the copy — same structure, same styling.

GOING LIVE
This zip is static HTML/CSS/JS — no build step, no database. To get
it onto leanluggage.com, either:
  1) Upload these files via your host's file manager / FTP (Hostinger,
     etc.) into the domain's public root, or
  2) If the site is on WordPress, these pages can be rebuilt as WP
     pages/theme templates using the same CSS — connect the WordPress
     or Hostinger option in chat and it can be pushed directly instead
     of uploaded by hand.

CONTENT MANAGEMENT (Decap CMS) — SETUP CHECKLIST
==================================================
This zip now includes a working CMS (admin/ folder) so your wife can
write posts from a login screen instead of editing HTML. It needs a
one-time setup — Decap CMS reads/writes through Git, so the site has
to move from "drag-and-drop deploy" to "connected to a GitHub repo."

1. Create a free GitHub account (if you don't have one) and a new
   repo, e.g. "leanluggage-site". Upload everything in this zip to it
   (GitHub's web uploader works, or `git push` if you're comfortable
   with git).

2. In Netlify: open the leanluggage site → Site configuration →
   Build & deploy → Link repository (or create a new site "Import
   from Git" pointing at that repo, then move the leanluggage.com
   domain over to it). Build command: leave blank. Publish directory:
   leave as "/" (root) since there's no build step.

3. In Netlify: Site configuration → Identity → Enable Identity.
   Under Identity → Registration, set to "Invite only" (so random
   people can't sign up as editors).

4. In Netlify: Site configuration → Identity → Services → enable
   Git Gateway. This is what lets the CMS commit content changes on
   your wife's behalf without her needing her own GitHub account.

5. In Netlify: Identity tab → Invite user → send the invite to your
   wife's email. She'll get an email to set a password.

6. She logs in at leanluggage.com/admin — that's the whole workflow
   going forward: log in, click "New Post," fill in title, location,
   date, an optional thumbnail photo, the TikTok URL/video ID, and
   write the body in the markdown editor (bold/italic/headers via a
   toolbar, no HTML needed) — then click Publish. Netlify rebuilds
   the site automatically within about a minute.

WHERE POSTS LIVE
Each post is a markdown file in content/posts/*.md (front matter for
title/date/location/tiktok + a markdown body). travel-stories/post.html
is a single template that reads whichever post is requested
(post.html?post=slug) and renders it — so no new HTML page is needed
per post. One example post is included: content/posts/aberdeen-wishkah.md,
linked from the Travel Stories index.

STILL MANUAL FOR NOW
The Travel Stories index page (travel-stories.html) itself is still
hand-edited — adding a new post's card/link there isn't automatic
yet. That's a reasonable next step once she's actually writing
regularly (a small script or a CMS-driven index), just not built out
in this pass.
