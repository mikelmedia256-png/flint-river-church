# Flint River Church website (demo)

Static site for Flint River Primitive Baptist Church, to go live at **theflintriver.org** (DNS at GoDaddy, hosted on Cloudflare Pages).
No framework and no dependencies beyond Python 3 (used only for the build script).

```
src/*.html        page bodies (edit these)
partials/         shared header, footer, JSON-LD (edit once, applies everywhere)
css/ js/ assets/  styles, behavior, images
build.py          wraps src pages with partials -> writes *.html, sitemap.xml, robots.txt to project root
```

Build: `python3 build.py`. Preview: `python3 -m http.server 8742`, then open http://localhost:8742.
Deploy: upload everything **except** `src/`, `partials/`, `build.py`, and `assets/img/originals/` (5.5 MB of source images).

Source content: `~/Documents/MOLIRI/clients/Flint-River-Church/website-content/` (bio, vision/mission/logo, yearly schedule, Articles of Faith, history deck).

## Launch plan (domains)

- **Official site:** https://theflintriver.org (apex; canonical URLs, sitemap and JSON-LD already use it). Hosted on Cloudflare Pages, project `flint-river-church`, deployed with `./deploy.sh --push`.
- **theflintriver.com** → 301 redirect to https://theflintriver.org (keeping the path).
- Both domains are registered at GoDaddy (.org expires 2027-10-07, .com expires 2027-06-06). As of Oct 9, both show a GoDaddy parking page and have no MX or TXT records, so there's no email to protect.
- Steps:
  1. Add both domains to Cloudflare (free plan). Change each one's nameservers at GoDaddy to the pair Cloudflare gives. Turn off any GoDaddy forwarding first.
  2. **.org:** Pages project → Custom domains → add `theflintriver.org` and `www.theflintriver.org`. Add a redirect rule www → apex.
  3. **.com:** add proxied placeholder DNS records (`A @ 192.0.2.1` and `A www 192.0.2.1`, orange cloud). Then add a Redirect Rule: hostname is `theflintriver.com` or `www.theflintriver.com` → `https://theflintriver.org` + the same path, 301, keep the query string.
  4. Verify: `curl -I` on http/https × apex/www for both domains → `.org` apex returns 200, everything else returns 301 to it.

## Baptisms page

`baptisms.html` is built from `data/baptisms.json` and shows photo cards grouped by year, newest first. It isn't in the top nav. It's linked from the footer, About › Article 13, and the Visit membership FAQ. To add someone:

1. Put their photo in `assets/img/baptisms/` (resized to about 1000px wide, with a `.webp` copy of the same name next to it).
2. Add `{"name": "First Last", "date": "YYYY-MM-DD", "photo": "first-last.jpg"}` to `data/baptisms.json` (`photo` is optional; without one, the card shows their initials).
3. Run `python3 build.py`.

While the list is empty, the page shows "Our next celebration will be shared here". Get each person's OK, and a parent's for anyone under 18, before posting their name and photo.

## Special events & event recaps (Events page)

- **One-time upcoming events:** add `{ d: new Date(YYYY, monthIndex, day), t: "Title", n: "Note" }` to `SPECIAL` in `js/main.js`; it joins the auto-generated "Upcoming" list (home + Events) and drops off after the date. For a featured flyer block, add a `<section data-until="YYYY-MM-DD">` to `src/events.html`; JS hides it after that day (it still needs removing from the source eventually).
- **Recaps:** "Recent events" section near the bottom of `src/events.html`. Web images live in `assets/img/events/` (1200px JPG + WebP); originals in `assets/img/originals/`.
- Oct 27, 2026: added Unmasked: Gospel, Prayer & Praise (Wed Nov 18, 6:30 p.m., guest The Collective; flyer 1024×572) and the Oct 22 Financial Literacy Night recap (presenter Tyrone Bell, AAMU Knight Complex; 4 photos, the pastor asked for them on the site). Unmasked falls on the same night as the generated "Last Midweek Recharge of the year"; confirm whether it replaces Recharge that week.

## How the site is built for new members (from the research pass)

- **Service times + address visible on the first screen, on every page.** The #1 thing visitors look for; about 83% check the website before visiting.
- **"Plan Your Visit" is the main call to action** (header button, hero, sticky phone bar, and the end of every page). ReachRight reports that "I'm New" pages convert 2–3x better.
- **At most 5 nav items:** About · Ministries · Events · Watch Live, plus the button.
- **A step-by-step "your first Sunday" walkthrough and FAQ** to remove anxiety: what to wear, what "Primitive Baptist" means, how Communion works, kids, membership.
- **Real photos over stock, and plain language** instead of insider terms ("Primitive" = original, not outdated).
- **Mobile first** (over 65% of church traffic is mobile), with a sticky Directions / Plan a Visit bar on phones.
- **Local SEO:** `Church` JSON-LD schema with name, address, and phone matching the Google Business Profile; per-page titles and descriptions with "Huntsville, AL"; sitemap.
- **Upcoming events generate themselves** from the yearly-schedule rules (e.g. "2nd Sunday of Jan/Apr/Jul/Oct = Communion"), so the site never shows stale dates.

## Confirm with the church before launch

**Facts**
- [ ] Address **213 Winchester Road, 35811** (from the church docs). Google, Yelp, and Yellow Pages still list 357 Everett Rd, so the Google Business Profile needs updating.
- [ ] Founding date: the history deck says **Oct 4, 1808**; the City historical marker says **Oct 2, 1808**. The site says "October 1808".
- [ ] Pastor photo: `pastor-miller.jpg` was picked from the history deck as the most likely photo of Pastor Miller. **Verify it's him.** (Photo batch 2 has a couple's portrait from the same studio session, `originals/part-2/IMG_1884.JPG`, and the same man holds the scissors at the ribbon cutting, which makes it likely. The woman is probably his wife, Tabitha C. Miller (named in his bio). The portrait is only 400×500, so ask for the full-size file if they want a pastor-and-first-lady photo on the site.)
- [ ] Batch 3–10 captions: is IMG_4200 Pink Sunday? Is IMG_0104 the End-of-Year Fellowship? When and why was the group at the old red brick church (IMG_0040), e.g. Homecoming or heritage month? Are the three women in blue (IMG_2481) a specific ministry?
- [ ] Photo batch 2 captions: when was the ribbon cutting at 213 Winchester (and was it the building opening)? What year is the "Junior Banner" archive photo, and who are the two mothers? Are the men praying on the Ministries page the deacons? (For now the caption doesn't name them as deacons.)
- [ ] Pastor timeline: the deck says "B. McCaully 1892–1823". The site shows **1892–1923**.
- [ ] Name spellings, corrected on the site: "Mae Ella Flecther" → **Fletcher**, "Maruius Caudle" → **Marius** (the schedule also lists a "Marcus Caudle"; is that the same person?).
- [ ] Articles of Faith typo fixes applied: "preserve in grace" → **persevere**, "excusive" → **exclusive**, "Romans 3:38-39" → **8:38–39**. Left as written but worth checking: John 7:2 and Romans 8:24–30 (Art. 3), and Mark 16:12–16 (Art. 13).

**⚠ Heritage claim — decide before launch (copy pass, Sep 30)**
- [ ] A second, separate **Flint River Primitive Baptist Church** (a cappella; Elder Ben Winslett, pastor since 2006; 641 Moontown Rd; flintriverpbc.org) claims the same founding: Oct 2, 1808, Elder John Nicholson, the home of James Deaton in Killingsworth Cove, and "the first Baptist church ... in what would later become the State of Alabama". Our site says "Alabama's oldest Baptist church" (home, header area, About) and "The City of Huntsville's historical marker recognizes [us]". The marker names "Flint River Primitive Baptist Church" but it may stand at the other congregation's site. Ask the church how they describe the shared lineage, and whether "oldest" plus the marker citation should stay, be softened (e.g. "tracing our roots to 1808"), or be explained.
- [ ] Web listings (Yelp, Yellow Pages, GuideStar) for "Flint River Primitive Baptist Church" mix the two churches (357 Everett Rd, Elder Winslett, a WBXR radio broadcast). When claiming the Google Business Profile, make sure it's this church's listing.

**Where the copy comes from** (checked Sep 30 against the 5 church docs, the church's current Wix site, and the City marker)
- *Church docs, verbatim or close:* vision, mission ("A Church Following the Flow of Christ": Vision/Mission PDF §II and history deck slide 2; also on the sanctuary banner), Embrace/Educate/Empower, safe haven "from all walks of life", organism/organization, seasonal visions, logo meaning, all 16 Articles of Faith, pastor bio, history timeline + pastor list, service times, phone, all ministry/coordinator/ward names, Sunday School rooms and teachers, the yearly calendar.
- *Church's Wix site:* email FlintRiverPBC@gmail.com, YouTube @flintriver/live, Zoom 256 776 9688 (the Wix site also shows passcode 357357 publicly), Midweek Recharge on Zoom.
- *City marker:* the 1830s "Old School"/"Primitive" split. Note: the marker says the split was over mission boards, **Sunday Schools and musical instruments**, which this church now has. The "What does Primitive Baptist mean?" FAQ doesn't mention that, but a reader who knows the history might ask.
- *Changed from docs:* "Xavier Sanders" → **Xavier Mikel** (the user's correction; the schedule doc still says Sanders). "College Jersey Sunday" is my name for the doc's "wearing favorite college jerseys" 4th Sunday. The doc's "Blue Springs Road" (1992) / "Blue Spring Road" (2021) spelling differs; the site uses "Blue Spring". The deck spells both "A. D. Hammonds" (slide 6) and "Hammons" (pastor list); the site uses Hammons.
- *Copy changes applied Sep 30 (the user asked for these on the site; the church can still reverse them):* "Alabama's oldest Baptist church" and the City-marker line were removed from Home, About, and the About meta description; the 1808 band now says "Our roots go back to 1808". Hero is now "There's a place for you at Flint River." About headline is "More than two centuries of faith" (was "…by the river"). "Still growing" was dropped. Sunday School "for every age" → "adults & youth". Transportation now reads "helps people get to church… ask about a ride". Security "on hand every Sunday" → "helps keep everyone safe when we gather". The Primitive Baptist FAQ names mission boards (per the marker). Giving no longer names specific ministries and now says "give in person when you visit". The ward text is plain ("each ward has its own deacon"). Spring Jubilation no longer says "evening".
- *Fixed in this pass:* the home page said the church was constituted "near the banks of the Flint River". The marker and both churches say it was founded in James Deaton's home **in Killingsworth Cove**, and the first meeting house (1809) was on the river bank. Now reads that way.

**Things I wrote that aren't in the docs**
- [ ] "What to wear" answer (everything from Sunday best to business casual).
- [ ] "Arrive 10–15 minutes early", and parking right outside the front doors.
- [ ] Transportation Ministry offering rides to **guests**, not only members.
- [ ] Pink Sunday = breast cancer awareness. Operation Hungry = feeding neighbors.
- [ ] Membership FAQ (profession of faith + baptism; each household is assigned a ward deacon).
- [ ] Should the public ministries page list coordinators by name?
- [ ] Taglines/headlines: "There's a place for you by the river", "Two centuries by the river", "We saved you a seat", "Constituted in 1808 and still growing". The church is on Winchester Road and not literally by the river; "by the river" is meant as a nod to the name.
- [ ] "Security Ministry is on hand every Sunday"; "Spring Jubilation" described as **evening** services (the doc gives no time); the Women's Conference is a "placeholder" in the doc but listed as firm.
- [ ] Giving copy: "supports the Pantry, STEAM Summer Camp, Operation Hungry"; "you can give during Sunday worship".
- [ ] "Sunday School ... for every age": the docs list men, women, young adults and youth classes; is there a class for young children?
- [ ] All one-line ministry descriptions (e.g. "We Care: the sick, the shut-in, and the hurting"; "Pantry: sharing food with neighbors in need"), inferred from the ministry names.
- [ ] Ward description: "a deacon who knows them by name, checks in, and helps care for them". The doc only lists which last names go to which deacon.
- [ ] Communion FAQ line: "Guests are warmly welcome to stay and witness."

**Not wired up yet**
- [x] Plan-a-visit form: posts to FormSubmit (https://formsubmit.co/ajax/flintriverpbc@gmail.com), which emails each request to flintriverpbc@gmail.com. FormSubmit has to be **activated once**: the first submission sends an "Activate Form" email to that inbox, and someone must click it. Until then the form shows an error message with the phone number. Still need a person who follows up on requests.
- [ ] Online giving: the site says "coming soon". Needs a provider (Tithe.ly, Givelify, PayPal, etc.).
- [ ] Zoom: the site links to meeting 2567769688 without the passcode. The current Wix site shows the passcode publicly; decide whether to publish it or have people request it.
- [ ] Logo: `logo-mark.svg` is my vector redraw of a 231px JPEG. Swap in the original art file if the church has it.

**Photos** (batch 2 received Sep 30, originals in `assets/img/originals/part-2/`. Used: front-doors group → Visit, STEAM Camp + men in prayer → Ministries, archive mothers + ribbon cutting → About. Unused: IMG_1790/1810 are only 400×225; IMG_1663/1670 are near-duplicate ribbon-cutting shots.)

Batches 3–10 (Sep 30, 8 zips, 42 unique photos; no "Part VII" came through) → 11 used, originals in `assets/img/originals/part-3-10/`:
front exterior IMG_2744 → Visit hero + About "today"; kids at the front IMG_8759, choir IMG_8758, van IMG_7964 → home "Find your people" cards; STEAM dry ice/experiment/tire lesson IMG_0641/0924/0880 → Ministries; van + serving mothers IMG_2481 → Ministries care; former-church visit IMG_0040 → About; Pink Sunday IMG_4200 + fellowship IMG_0104 → Events.
Deliberately not used: IMG_0149 (Rev. Payton's funeral program), IMG_3788 (old building with a real-estate sign), IMG_2846/2876 (unidentified visiting ministers), IMG_2677/2680/5009/5019 (construction, lift work, covered entrance still in house wrap), IMG_5020 (800×600), plus near-duplicate STEAM and camp shots.

Still wanted:
- A photo of the front once the new covered entrance is finished (the hero shows the front before it was built)
- Hi-res exterior of the Winchester Road building (the current one is 640×480 and looks soft as a hero background)
- A Sunday worship service: choir, congregation, preaching
- Children's Church
- A posed deacons / leadership group photo
- A welcome video from Pastor Miller (30–60 sec). Research shows this is one of the strongest trust builders on a Plan Your Visit page.

## Research sources
- [ChurchTrac: The Perfect Plan Your Visit Page](https://www.churchtrac.com/blog/the-perfect-church-plan-your-visit-page)
- [ReachRight: How to Build a Church Website (2026)](https://reachrightstudios.com/blog/church-website-design-guide/)
- [ReachRight: 23 Best Church Websites (2026)](https://reachrightstudios.com/blog/best-church-websites/)
- [Develop With Faith: Best Church Website Examples](https://developwithfaith.com/blog/best-church-website-examples)
- [ResourceUMC: 11 mistakes in church website design](https://www.resourceumc.org/en/content/11-mistakes-in-church-website-design)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [City of Huntsville: Flint River P.B. Church historic marker](https://www.huntsvilleal.gov/historicmarkers/flint-river-primitive-baptist-church/)
