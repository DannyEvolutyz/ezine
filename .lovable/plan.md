# Founders & Writers — Hero Visual Update

Scope: only the right-side mockup in the hero section of `src/pages/UseCasePage.tsx` (lines ~181–212), shown when the slug is `founders-writers`. Other use-case pages keep the current compact visual unchanged.

## Changes

1. **Browser tab label**: replace `Document Preview · Ezine` with `Founders Agreement · Ezine`.
2. **Taller card**: extend the mockup vertically (~1.6× current height) so the visual aligns closer to the bottom of the left-side hero copy (heading + subtitle + CTA row).
3. **New top block — Flipbook preview**: above the existing "Interactive Document" block, add a small flipbook spread (two-page mock) titled **"Founders Agreement"** with a subtle eyebrow ("Flipbook Preview"), a center spine, and a few skeleton text lines per page. Keeps the existing brand styling (off-white surface, `border-border`, rounded corners).
4. **New bottom block — AI Chat Q&A**: below the existing "Interactive Document" block, add a chat panel with:
   - Header row: chat icon + "Ask this document"
   - User bubble (right-aligned, accent tint): *"What's the vesting schedule for founders?"*
   - Assistant bubble (left-aligned, neutral surface): *"Standard 4-year vest with a 1-year cliff. Equity vests monthly after the cliff. See Section 3.2 for details."*
5. Keep the existing center "Interactive Document" skeleton + progress bar between the new flipbook and chat sections.

## Implementation notes

- Edit only the JSX block at `src/pages/UseCasePage.tsx` lines ~181–212. Wrap content in a conditional: if `slug === "founders-writers"` render the new richer mockup; else render the existing one (no regression for other use cases).
- Use existing semantic tokens only (`bg-background`, `bg-off-white`, `border-border`, `text-text-dark/mid/light`, `bg-primary`, `bg-accent`, `text-warm-gray`). No hardcoded hex except the existing macOS traffic-light dots.
- Use `MessageSquare` from `lucide-react` (already imported) for the chat header.
- No copy/structure changes elsewhere on the page.
