## Goal
Apply the dark-section brand rule everywhere: foreground text/icons on dark backgrounds use brand orange (`accent` / #F05A28) instead of brand red (`primary` / #BE1E2D), and main section headings on dark backgrounds drop from extra-bold/black to medium (500).

## Scope — files & changes

### 1. `src/components/CtaSection.tsx` (shared dark CTA — used on Comparison page, About page, and others)
- Eyebrow (line 27): `text-primary` → `text-accent`
- H2 (line 29): `font-black` → `font-medium`; any `text-primary` highlight spans passed via `title` prop will resolve via #3 below
- Radial glow (line 16): `hsl(var(--primary)/0.15)` → `hsl(var(--accent)/0.15)`

### 2. `src/pages/AiChatFeaturePage.tsx` — Final CTA dark section (lines 280–315)
- H2 (line 290): `font-black` → `font-medium`
- Highlight span (line 291): `text-primary` → `text-accent`
- Radial glow (line 281): `hsl(var(--primary)/0.15)` → `hsl(var(--accent)/0.15)`

### 3. `src/pages/ComparisonPage.tsx` — two dark cards
- **Verdict card (lines 54–87, `bg-ink`)**:
  - Eyebrow (56): `text-primary` → `text-accent`
  - H3 (57): keep `font-bold` (sub-heading inside a card, not the section main heading) — but italic-em highlight (58) `text-primary` → `text-accent`
  - Bullet icon chip (71): `bg-primary/15` → `bg-accent/15`, X icon (72): `text-primary` → `text-accent`
  - Glow (55): primary → accent
- **"Different approach" dark card (167–176, `bg-ink`)**: highlight span (170) `text-primary` → `text-accent`
- CTA passed to `CtaSection` (line 184): the `<em class="not-italic text-primary">own document.</em>` inside `title` → `text-accent` (since CTA bg is dark)

### 4. `src/components/home/OtherProducts.tsx` — dark product cards (`bg-ink`)
- "Ezconnect" logo (line 7): `text-primary` "Z" on dark bg → `text-accent`
- Other two cards: `Ezgifts` sits on `bg-primary` (red bg) — leave the inner "Z" as-is; `Ezrewards` already `text-accent`. No change beyond Ezconnect.

### 5. `src/pages/UseCasePage.tsx` (line 222) & `src/pages/OnboardingLandingPage.tsx` (line 118)
- "The Real Problem" h2 already migrated to orange tokens in an earlier turn. Change font weight only: `font-bold` → `font-medium`.

### Out of scope (intentionally unchanged)
- `Contact.tsx` "Built in California" dark card — already uses `text-accent` throughout.
- Testimonial cards (`bg-ink` / `bg-primary`) — only contain white quote-mark glyphs, no red foreground.
- Footer, navbar, light sections — not dark backgrounds.
- The home Hero (kept distinct per existing rules).
- `bg-primary` table column in Comparison (it IS the red brand block by design, not a "dark" surface).

## Verification
- Visual scan of: home, /comparison, /ai-chat, /use-cases/[slug], /onboarding, /contact.
- Re-run `rg "text-primary|bg-primary/|hsl\(var\(--primary\)/" ` against the dark sections listed above to confirm no remaining red foreground on dark surfaces.
