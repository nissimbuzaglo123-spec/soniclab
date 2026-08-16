# PRIME — Brand Reference

Working reference for the cinematic scroll site. Compiled 2026-08-16.

> **Sourcing note.** `drinkprime.com` is blocked by this session's egress policy, so nothing
> here comes from the live site. Product facts below are corroborated across multiple retail
> and editorial sources. The palette is **derived from packaging descriptions and flavor
> identity — it is not the official brand palette**, and no hex code here should be presented
> as PRIME's own.

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
