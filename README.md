# Flint River Church website (demo)

Static site for Flint River Primitive Baptist Church, to go live at **flintriverchurch.org**.
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
- [ ] Pastor photo: `pastor-miller.jpg` was picked from the history deck as the most likely photo of Pastor Miller. **Verify it's him.**
- [ ] Pastor timeline: the deck says "B. McCaully 1892–1823". The site shows **1892–1923**.
- [ ] Name spellings, corrected on the site: "Mae Ella Flecther" → **Fletcher**, "Maruius Caudle" → **Marius** (the schedule also lists a "Marcus Caudle"; is that the same person?).
- [ ] Articles of Faith typo fixes applied: "preserve in grace" → **persevere**, "excusive" → **exclusive**, "Romans 3:38-39" → **8:38–39**. Left as written but worth checking: John 7:2 and Romans 8:24–30 (Art. 3), and Mark 16:12–16 (Art. 13).

**Things I wrote that aren't in the docs**
- [ ] "What to wear" answer (everything from Sunday best to business casual).
- [ ] "Arrive 10–15 minutes early", and parking right outside the front doors.
- [ ] Transportation Ministry offering rides to **guests**, not only members.
- [ ] Pink Sunday = breast cancer awareness. Operation Hungry = feeding neighbors.
- [ ] Membership FAQ (profession of faith + baptism; each household is assigned a ward deacon).
- [ ] Should the public ministries page list coordinators by name?

**Not wired up yet**
- [ ] Plan-a-visit form: currently shows a thank-you message only and sends nothing. Needs Formspree, Netlify Forms, or the church's CRM, and a person to receive and follow up.
- [ ] Online giving: the site says "coming soon". Needs a provider (Tithe.ly, Givelify, PayPal, etc.).
- [ ] Zoom: the site links to meeting 2567769688 without the passcode. The current Wix site shows the passcode publicly; decide whether to publish it or have people request it.
- [ ] Logo: `logo-mark.svg` is my vector redraw of a 231px JPEG. Swap in the original art file if the church has it.

**Photos wanted** (all current images come from the history deck)
- Hi-res exterior of the Winchester Road building (the current one is 640×480 and looks soft as a hero background)
- A Sunday worship service: choir, congregation, preaching
- People greeting at the door (Welcome Ministry/Ushers), for the Plan Your Visit page
- Youth, Children's Church, STEAM Camp
- Deacons / leadership group photo
- A welcome video from Pastor Miller (30–60 sec). Research shows this is one of the strongest trust builders on a Plan Your Visit page.

## Research sources
- [ChurchTrac: The Perfect Plan Your Visit Page](https://www.churchtrac.com/blog/the-perfect-church-plan-your-visit-page)
- [ReachRight: How to Build a Church Website (2026)](https://reachrightstudios.com/blog/church-website-design-guide/)
- [ReachRight: 23 Best Church Websites (2026)](https://reachrightstudios.com/blog/best-church-websites/)
- [Develop With Faith: Best Church Website Examples](https://developwithfaith.com/blog/best-church-website-examples)
- [ResourceUMC: 11 mistakes in church website design](https://www.resourceumc.org/en/content/11-mistakes-in-church-website-design)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [City of Huntsville: Flint River P.B. Church historic marker](https://www.huntsvilleal.gov/historicmarkers/flint-river-primitive-baptist-church/)
