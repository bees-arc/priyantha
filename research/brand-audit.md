# Brand Audit — Existing Visual Identity

Evidence: `evidence/01-fb-header-profile-cover.png`, `evidence/06-profile-image-zoom.png`, `evidence/07-photos-grid-zoom.png`

## 1. Official "logo" (Facebook profile image)

**Finding: there is no standalone vector logo or symbol.** The profile image is a composite photo badge:

- Circular crop with a **light mint-green → yellow vertical gradient** background.
- Three lines of centred **bold serif capitals** (Times/Bookman-style; exact font NOT identifiable):
  - Line 1 `PRIYANTHA TRADING`: **maroon / deep red**
  - Line 2 `AGENCIES PVT LTD`: **dark green**
  - Line 3 `PANADURA`: **dark green**
- Below the text: cut-out product photos (silver refrigerator, red bicycle, LED TV, pink rice cooker, glass-top gas cooker).

| Item | Status |
|---|---|
| Wordmark text & two-colour treatment (maroon + dark green, serif caps) | VERIFIED |
| Original high-resolution file | NOT_AVAILABLE (only a ~210 px rendered avatar was visible) |
| Logo variants (mono, dark, icon) | NOT_AVAILABLE — none exist publicly |

## 2. Colours sampled (from screenshots, approximate)

Pixel samples come from a compressed, scaled screenshot. **They are indicative, not final.** The owner should supply the original artwork or confirm them.

| Role in existing identity | Sampled / estimated HEX | Confidence |
|---|---|---|
| Wordmark line 1 (maroon) | ≈ `#8B1E2B` (visually estimated; anti-aliased samples ≈ `#654942`) | Medium |
| Wordmark lines 2–3 (dark green) | `#244F31` (pixel sample) | Medium-high |
| Badge gradient — top (mint) | `#E7F3EC` → `#BDF3A7` | High |
| Badge gradient — bottom (yellow) | `#E9EA3F` / `#DCF263` | High |
| Flyer background (seasonal) | Bright red with holly — Christmas campaign, **not core brand** | — |

**Status: NEEDS_CONFIRMATION.** Per the brief, final brand tokens stay unfilled until confirmed. The proposed mapping (pending approval):

- `--brand-primary` → dark green (`#244F31`), which passes AA on white (≈ 9.7:1)
- `--brand-secondary` → maroon (`#8B1E2B`), which passes AA on white (≈ 8.9:1)
- `--brand-accent` → yellow (`#E9EA3F`), **only as a background/highlight with dark text** (it fails as text on white)

## 3. Cover photo

An Innovex-branded LED TV showing a sunflower field (a manufacturer-style product image). It is likely a brand or supplier asset, so its **licence for website reuse is unverified**.

## 4. Typography

There are no brand fonts. The wordmark uses a generic bold serif, and flyers use system serif/sans caps. The fonts proposed in the brief (Manrope/Inter + Noto Sans Sinhala) are **new design proposals**, not existing brand fonts.

## 5. Recommendations

1. Ask the owner for the original logo file (PSD/AI/PNG) or permission to redraw the **existing wordmark** as a clean SVG. Keep the same text, serif caps and maroon/green split, but drop the product-photo collage, which doesn't scale to favicon or header size.
2. Until then, the site uses a **clearly labelled temporary text wordmark**: "PRIYANTHA TRADING AGENCIES" in a serif, maroon + green.
3. Treat red Christmas flyers as campaign material, not brand identity.
