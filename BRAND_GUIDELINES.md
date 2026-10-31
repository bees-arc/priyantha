# Brand Guidelines — Priyantha Trading Agencies (PVT) LTD

Version 1.0 · 2026-10-31 · Applies to the product catalogue website.

> Sections are tagged **[VERIFIED]** (existing identity / owner-approved) or **[PROPOSED]** (new design enhancement).

---

## 1. Brand overview [VERIFIED]

| | |
|---|---|
| Name | Priyantha Trading Agencies PVT LTD |
| Location | No: 388A Galle Road, Panadura, Sri Lanka (owner-approved) |
| Business | Retailer of electronics, home appliances, mattresses and bicycles |
| Inquiry channel | WhatsApp **072 245 1812** → `94722451812` (owner-supplied, 2026-10-31) |
| Phone (Facebook) | 077 797 4777 |
| Email | priyanthatradingpip@gmail.com |

**Positioning [PROPOSED]:** a reliable neighbourhood trading house in Panadura, presented with the clarity of modern commerce.

## 2. Existing identity audit [VERIFIED]

- The Facebook profile image is a circular badge with a **bold serif all-caps wordmark** ("PRIYANTHA TRADING / AGENCIES PVT LTD / PANADURA") in maroon and dark green, on a mint-to-yellow gradient with a product-photo collage.
- No vector logo, logo variants or brand fonts exist publicly (a Google search on 2026-10-31 found none).
- The owner has directed a **new colour direction: dark matte navy + white, light theme** (2026-10-31). The original maroon/green/yellow is documented in `research/brand-audit.md` for reference only.

## 3. Logo usage

### 3.1 Current status — TEMPORARY WORDMARK [PROPOSED]
Until the original artwork is supplied, the site uses a **typographic wordmark** that echoes the existing serif-caps style:

```
PRIYANTHA            ← Libre Baskerville Bold, tracking +0.04em
TRADING AGENCIES     ← Manrope SemiBold, tracking +0.22em, small caps size
```

- It is marked `data-temporary-logo="true"` in code and listed in the launch checklist.
- **Header:** navy on white. **Footer:** white on navy.
- **Favicon:** "P" monogram, white serif on a navy rounded square.
- **Social image:** wordmark centred on navy, 1200×630.

### 3.2 Rules
| Do | Don't |
|---|---|
| Keep the wordmark on solid white or solid navy | Place it on busy photos |
| Keep clear space ≥ the cap height of "P" | Stretch, rotate, outline or add shadows |
| Use only navy `#14213D` or white | Recolour it with gradients or WhatsApp green |
| Replace it with the official file when supplied | Present the temporary mark as the official trademark |

## 4. Colour palette

### 4.1 Brand [VERIFIED — owner-directed, values PROPOSED]
| Token | HEX | Use | Contrast on white |
|---|---|---|---|
| `--brand-primary` | `#14213D` | Matte navy: header text, primary buttons, footer | 15.6 : 1 ✅ |
| `--brand-secondary` | `#24375A` | Hover/pressed navy, secondary emphasis | 11.3 : 1 ✅ |
| `--brand-accent` | `#E8EDF5` | Navy tint: surfaces, chips, selected states | (background only) |
| `--brand-on-primary` | `#FFFFFF` | Text on navy | 15.6 : 1 ✅ |

### 4.2 Neutrals & semantic [PROPOSED]
| Token | HEX |
|---|---|
| `--background` | `#FFFFFF` |
| `--surface` | `#F6F8FB` |
| `--foreground` | `#0F172A` |
| `--muted-foreground` | `#5B6475` (5.9 : 1 ✅) |
| `--border` | `#E3E8EF` |
| `--success` | `#15803D` |
| `--error` | `#B91C1C` |
| `--whatsapp` | `#128C4A` (WhatsApp buttons only, white text 4.6 : 1 ✅) |

## 5. Typography [PROPOSED]
| Role | Font | Weight | Size (mobile → desktop) |
|---|---|---|---|
| Display / H1 | Manrope | 700 | 32 → 52 px, line-height 1.1 |
| H2 | Manrope | 700 | 24 → 36 px |
| H3 | Manrope | 600 | 18 → 22 px |
| Body | Manrope | 400 | 16 px, line-height 1.6 |
| Small / meta | Manrope | 500 | 13–14 px |
| Wordmark only | Libre Baskerville | 700 | — |
| Sinhala (future) | Noto Sans Sinhala | 400/600 | +2 px relative to English |

Use at most three weights per page and never go below 13 px.

## 6. Spacing & layout [PROPOSED]
- 4 px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Container max width **1440 px**; gutters 16 px (mobile), 24 px (tablet), 40 px (desktop).
- 12-column grid on desktop. Product grids: 2 columns (mobile), 3 (tablet), 4 (desktop).
- Radius: 10 px (inputs and buttons), 16 px (cards), 999 px (chips).

## 7. Buttons & components [PROPOSED]
| Variant | Style |
|---|---|
| Primary | Navy bg, white text, 48 px height, hover `#24375A`, 150 ms |
| Secondary | White bg, navy 1.5 px border, navy text |
| WhatsApp | `#128C4A` bg, white text + WhatsApp glyph; the only green element |
| Ghost | Transparent, navy text, tint bg on hover |
| Focus | 3 px `#3B5B9A` outline with 2 px offset, always visible on keyboard focus |

All interactive targets are at least 44×44 px.

## 8. Iconography [PROPOSED]
Use the Lucide line icon set (1.75 px stroke, 20–24 px) in navy or muted grey. The WhatsApp glyph is the only brand icon.

## 9. Photography [PROPOSED]
- Use **only the business's own photos** or manufacturer images the business is authorised to use.
- Show products on white or light-grey backgrounds in a 1:1 aspect ratio for cards and at least 1200 px on the long edge.
- Don't use stock "happy family" imagery or AI-generated product photos.
- Where no photo exists, show a neutral navy-tint placeholder with a category icon and the label "Photo coming soon".

## 10. Product card [PROPOSED]
1. Square image (or placeholder)
2. Brand: muted, uppercase, 12 px
3. Product name: 2 lines max
4. Up to 2 key specs as chips
5. Price, or **"Ask for Price"** when not confirmed
6. Buttons: "View" (secondary) + WhatsApp icon button

Never show ratings, "bestseller" or discount badges unless the business has verified them.

## 11. Voice & tone [PROPOSED]
- Plain, polite and helpful, in clear English that works for Sri Lankan readers.
- Examples: "Ask us on WhatsApp for today's price." / "Visit our showroom on Galle Road, Panadura."
- Avoid: "#1 in Sri Lanka", "Trusted by thousands", "Best prices guaranteed" and similar unverifiable claims.

## 12. Accessibility [PROPOSED]
- WCAG 2.2 AA: text contrast ≥ 4.5 : 1, UI ≥ 3 : 1.
- Semantic landmarks, one `<h1>` per page, alt text on every product image.
- Keyboard-operable filters, gallery and drawer; respect `prefers-reduced-motion`.

## 13. Responsive rules [PROPOSED]
| Breakpoint | Behaviour |
|---|---|
| < 640 px | Drawer navigation, 2-col grid, filter drawer, sticky WhatsApp bar on product pages |
| 640–1023 px | 3-col grid, collapsible filters |
| ≥ 1024 px | Full header nav + search, sidebar filters, 4-col grid |

## 14. Correct vs incorrect usage
| ✅ Correct | ❌ Incorrect |
|---|---|
| "Ask for Price" on unconfirmed items | Showing an old Christmas promo price |
| Navy primary button, green WhatsApp button | Green primary buttons everywhere |
| Real shop photo in hero | Stock photo of an unrelated store |
| "Opening hours: please call to confirm" | Invented opening hours |
