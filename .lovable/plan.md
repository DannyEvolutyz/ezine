## Goal
Replace the static paragraph in the "What is EZINE?" section (2nd section on the home page) with a scroll-driven gradient reveal effect using the provided `TextGradientScroll` component.

## Files

1. **Create** `src/components/ui/text-gradient-scroll.tsx`
   - Add the component as provided (cleaned up — the pasted snippet has missing JSX bodies). Implement faithfully:
     - `TextGradientScroll` wraps text in a `motion.p` with a ref tied to `useScroll` (offset `["start center", "end center"]`).
     - Splits text into words; renders either `Word` or `Letter` based on `type` prop (default `"letter"`).
     - `Char` reads `textOpacity` from context (`"none" | "soft" | "medium"`) to set the dim base layer opacity (e.g. none=1, soft=0.2, medium=0.5), then overlays a `motion.span` whose opacity animates from 0→1 via `useTransform`.
     - Provider wraps the output with `{ textOpacity, type }`.
   - Use `cn` from `@/lib/utils`. Keep `"use client"` directive (harmless in Vite).

2. **Edit** `src/components/home/WhatIsEzine.tsx`
   - Keep the section shell, heading, and Outfit font styling (per project memory: no italics, light/airy aesthetic).
   - Replace the `<p>` with `<TextGradientScroll text="…" type="word" textOpacity="soft" className="whatis-text text-[24px] md:text-[32px] leading-[1.65] text-text-dark font-light" />`.
   - Use `type="word"` so the reveal feels smooth at paragraph length.
   - Trade-off: the gradient-scroll uses a single text string, so the inline `<span className="font-semibold">` highlights on individual words ("interactive", "AI-powered", "instant summaries", "track", "engages") will be lost. The whole paragraph will share one weight. Acceptable since the reveal animation becomes the emphasis.
   - Increase section min-height (e.g. `min-h-screen`) so there is enough scroll distance for the reveal to play out fully.

3. **Remove** the `.reveal` wrapper class on the inner div (it conflicts with the scroll-driven opacity by hiding the element until in view).

## Dependencies
`framer-motion@^12` is already installed — no install needed.

## Out of scope
- No changes to other home sections, navbar, or routing.
- No new assets or icons required.

## Confirm before building
- OK to drop the bold inline highlights in the paragraph (gradient reveal replaces that emphasis)?
- Use `type="word"` (smoother) vs `type="letter"` (more dramatic, slower)?
