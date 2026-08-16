# PRIME — Brand Reference

Working reference for the cinematic scroll site. Compiled 2026-08-16.

> **Sourcing note.** `drinkprime.com` is blocked by this session's egress policy. Sections 1–6
> were compiled from retail and editorial sources; **section 8 comes from screenshots of the
> live site** supplied directly and is the authoritative record of the current design. The
> palette in section 4 is derived from packaging and flavor identity — it is not the official
> brand palette.

---

## 1. Brand facts

| Field | Value |
|---|---|
| Name | PRIME |
| Founders | Logan Paul (YouTuber / wrestler / actor) and KSI (YouTuber / boxer / musician) |
| Distributor | Congo Brands — Louisville, Kentucky |
| Positioning | Creator-founded challenger brand taking on Gatorade (hydration) and Red Bull / Monster (energy) |
| Product lines | **PRIME Hydration** (sports drink, bottle) · **PRIME Energy** (energy drink, can) · **PRIME Hydration+ Sticks** (powder) |

**Hydration formula claims:** 10% coconut water, BCAAs, antioxidants, electrolytes, zero added
sugar, low calorie. Marketed on *less sugar and fewer calories than the leading brands*.

**Energy formula:** caffeinated line, sold in cans, sugar-free variants widely stocked.

---

## 2. Logo and wordmark

- Wordmark: **PRIME**, all caps, bold sans-serif built on straight lines.
- Character: minimal, no ornament, wide stable proportions — reads as strength and reliability.
- Closest free analogues for a build: **Anton**, **Archivo Black**, **Druk / Bebas Neue** family.
- **Signature packaging move:** the wordmark runs **vertically** up the can — unusual in
  beverage packaging, and the most recognizable single trait of the identity. Worth carrying
  into the site as a vertical type element (side rail, scroll indicator, section marker).

---

## 3. Flavors

### PRIME Hydration — 10 flavors
Ice Pop · Strawberry Watermelon · Lemon Lime · Blue Raspberry · Tropical Punch · Meta Moon ·
Cherry Freeze · Lemonade · Strawberry Banana
*(Grape and Orange were in the line and have since sold out / been retired.)*

### PRIME Energy — 7 flavors
Original · Ice Pop · Strawberry Watermelon · Blue Raspberry · Tropical Punch · Orange Mango ·
Lemon Lime

### Flavor notes (from reviews)
| Flavor | Note |
|---|---|
| Original | Grapefruit and lime |
| Ice Pop | Bomb-pop nostalgia — cherry, lime, blue raspberry |
| Meta Moon | "White PRIME" — candy, cotton candy meets blue raspberry |
| Blue Raspberry | Sweet and tart |
| Lemon Lime | Crisp, zesty, refreshing |
| Tropical Punch | Fruity and bold, smooth tangy finish |
| Strawberry Watermelon | Juicy, smooth, summer-forward |
| Orange Mango | Bright, citrusy, energizing |

### Confirmed color associations
- **Pink bottle** → Strawberry Watermelon
- **Pink + yellow bottle** → Strawberry Banana
- **White bottle** → Meta Moon
- **Pink + blue** → the X Hydration strawberry-lemonade edition

---

## 4. Derived palette (NOT official — for our build)

Chosen so the four hero flavors read as distinct at a glance against a dark stage, which is
what the scroll-scrub sections need.

```css
--void:        #05060a;  /* stage black, cooler than RISE's #07050a */
--text:        #f2f5f8;
--muted:       #8b94a6;

/* flavor accents */
--blue-rasp:   #1b6bff;  /* Blue Raspberry — the brand's anchor blue */
--ice-pop:     #ff3355;  /* Ice Pop — cherry red over blue/lime */
--lemon-lime:  #b9f227;  /* Lemon Lime — acid green */
--tropical:    #ff6a1f;  /* Tropical Punch — punchy orange */
--straw-melon: #ff3d8a;  /* Strawberry Watermelon — hot pink */
--orange-mango:#ffa41c;
--meta-moon:   #e8ecf5;  /* near-white with a cool cast */

--glow:        #0a3ba8;  /* deep blue bloom behind product shots */
```

**Primary accent for the site: `--blue-rasp` (#1b6bff).** Blue is the color most consistently
tied to the brand across sources, and it gives the cleanest contrast against a black stage —
the same role `#ff2440` plays in RISE.

---

## 5. Voice

Loud, young, confrontational, creator-native. Built on rivalry ("vs. the legacy brands"),
scarcity ("drops", "restocks"), and athlete/creator co-signs. Short declarative lines.
Numbers used as proof.

---

## 6. Open gaps

1. **Live site structure and motion** — could not be observed. Section order, scroll behavior,
   and tech stack are unknown and are not guessed at here.
2. **Official hex codes and typeface** — not published in any source reached.

**To close these:** paste screenshots of the site, or paste the page source / a description.
Otherwise the build proceeds from the packaging identity above, which is sufficient for a
cinematic scroll site and avoids copying site layout wholesale.

---

## 7. Legal note

PRIME is a live trademark. This build is a **concept / demo** — fine as portfolio and
demonstration work. It should not be published in a way that presents it as the official
PRIME site, and should not reuse PRIME's actual logo files or photography.

---

## 8. The live site — observed from screenshots

Authoritative. This is what the current drinkprime.com actually does.

### Chrome
- **Top bar:** market switcher `US | UK` hard left · **PRIME** wordmark dead centre ·
  search icon and a solid black `BUY PRIME` block hard right.
- **Nav row** beneath it, centred: `SHOP · ABOUT PRIME · WHERE TO BUY · VERIFY YOUR PRIME`.
  Letter-spaced, uppercase, medium weight.
- Header sits **over** the hero with no background — it inverts to suit each slide.
- **`DON'T MISS OUT`** dismissible capsule pinned bottom-right on every page.

### Wordmark
Heavy, very tight, condensed uppercase sans with **flat angular terminals** — the `R` leg and
the `M` vertices are cut on hard diagonals. Not Anton, not Bebas: closer to a customised
Druk / Monument Extended. On packaging the same wordmark is **rotated 90° to run vertically
up the bottle**, set in white with a heavy black outline, at enormous scale — it is the single
most recognisable asset the brand owns.

### Hero
Full-bleed **carousel, three slides**, dot indicators bottom-centre. Every slide:
- talent or product photographed against a **saturated single-hue backdrop** — a swirling
  orange/red field, a flat electric blue, a near-black charcoal;
- a small letter-spaced **eyebrow** (`LIMITED EDITION`, `TARGET EXCLUSIVE`, `PROTEIN, REDEFINED`);
- a heavy uppercase **headline** (`SUMMER POP`, `PRIME SHAKE X POP-TARTS`, `PRIME SHAKE`);
- one **square white button** (`FIND IN STORES`, `SHOP NOW`) — no rounding, black text.

Copy is left-aligned and sits low-left; the subject occupies the right two-thirds.

### Product sections
- **Hydration:** the full bottle lineup fanned in a row on white, beside a 2×2 grid of black
  icon badges — `10% COCONUT WATER` · `ELECTROLYTE ENHANCED` · `ZERO ADDED SUGAR` ·
  `NO ARTIFICIAL DYES` — with a black `SHOP HYDRATION` button.
- **Shake:** the word `SHAKE` set enormous and widely letter-spaced as a section title, with a
  row of six cans below, each captioned with its flavor and a bordered `LEARN MORE` button.

### Design temperature
Bright, high-key, maximal. White and saturated colour fields, black type, square-cornered
buttons, zero gradients in the UI itself — all the richness lives in the photography. This is
the opposite of the dark cinematic stage, which is precisely the gap the redesign exploits.

### Bottle construction
Clear PET, sculpted with horizontal ridge grooves around the lower body, coloured screw cap
matching the flavor, coloured liquid visible through the plastic, `HYDRATION` set small at the
base, flavor name small in a band at the top.

### Flavors visible in the lineup
Ice Pop (red cap, red over cyan) · Cherry Freeze (red) · Berry Freeze (pale blue) ·
Future Freeze (mint into lavender) · Orange Swirl (orange) · Dragon Fruit (magenta) ·
a yellow variant · **Summer Pop** (limited edition, red→orange→yellow gradient).

### Shake line — six flavors
Frosted Blueberry · Frosted Strawberry · Frosted Chocolate Fudge · Cookies and Cream ·
Vanilla · Chocolate. The Pop-Tarts variants are a Target exclusive collaboration.

### Talent
Logan Paul and KSI appear as the hero subjects across slides, styled in saturated monochrome
wardrobe that matches each slide's backdrop.

---

## 9. Redesign direction

The current site is **bright, flat and static** — a Shopify storefront with strong photography.
The redesign inverts the stage to near-black and makes the product the one fixed object in the
viewport while everything else moves around it on scroll. Keeping from the original: the
vertical wordmark, the square-cornered buttons, the letter-spaced eyebrow, the badge language,
and the saturated per-flavor colour coding.
