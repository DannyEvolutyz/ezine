# Plan: Why Ezine icons + ThreeSteps animated demo sync

## 1. Why Ezine — Replace icons in `src/components/home/WhyEzine.tsx`

Keep the same line-style, brand-red stroke aesthetic. Custom inline SVGs (not Lucide) to match the existing illustrative style.

- **Card 1 — "PDF to Interactive Flipbook Converter"**
  New icon: **flipbook** — an open book/spread with a curling page turning in the middle (two facing pages + a curved page-turn arc with motion lines).
- **Card 2 — "AI Chat for Your Documents"**
  New icon: **document + AI** — a document outline with text lines, overlapped by a chat bubble containing a sparkle/star (AI mark). Communicates "ask your doc".
- **Card 3 — "Instant Document Summaries"**
  Unchanged (user said it's fine).
- **Card 4 — "Seamless Document Sharing"**
  New icon: **document scanning** — a document with a horizontal scan beam across it and corner brackets (like a scanner viewfinder), plus a few scan dots.

> Note: Card 4's current copy is about *sharing*, not scanning. The user asked for a scanning icon on card 4. I'll add the scanning icon as requested, but flag that the icon will no longer match the "Seamless Document Sharing" copy. If you'd like, I can also swap card 4's copy to a scanning/OCR feature — confirm before I implement.

## 2. ThreeSteps — Replace static laptop mockup with the animated hero demo, synced to steps

File: `src/components/home/ThreeSteps.tsx` (+ small extract of the demo).

### Structure changes
- Extract the existing `HeroDemo` from `src/components/home/HeroSection.tsx` into a shared component `src/components/home/FlipbookDemo.tsx` so both Hero and ThreeSteps render the same animation. Hero continues to use it unchanged.
- Extend `FlipbookDemo` to accept an optional `activeStep` prop **and** an `onStepChange` callback so a parent can either drive it or listen to it. Internal auto-advance stays the default (Hero keeps current behavior).
- In `ThreeSteps`, render `<FlipbookDemo />` on the left in place of the static laptop card. Make it sticky on desktop (`lg:sticky lg:top-24`) so it stays visible while the user reads the 3 steps on the right.

### Step ↔ demo-stage mapping
The demo has 4 stages (`idle`, `drop`, `process`, `result`). Map to the 3 written steps:

| Written step | Demo stage(s) |
|---|---|
| 1. Drag & Drop or Select your file | `idle` + `drop` |
| 2. Publish your EZINE | `process` |
| 3. Share your Masterpiece | `result` |

### Highlighting behavior
- ThreeSteps listens to the demo's current stage via `onStepChange` and tracks `activeStep` (1, 2, or 3) in local state.
- The active step on the right gets visually emphasized:
  - Number: opacity 100, brand-red color, slight scale-up.
  - Title: bold dark.
  - Body text: full opacity.
- Inactive steps: dimmed (number/text opacity ~40%), default dark color.
- Smooth transition (`transition-all duration-500`) on color/opacity/scale — no layout shift.

### Optional (recommended) — click-to-jump
Each step row becomes clickable; clicking sets `activeStep` and tells `FlipbookDemo` to jump to the matching stage. Pauses auto-advance for a few seconds, then resumes. This makes the section feel interactive without changing visual design.

## Technical notes
- No changes to colors, fonts, or section paddings beyond the dim/highlight states.
- `FlipbookDemo` keeps its current internal `useEffect` auto-advance; the new `activeStep` prop is an override that, when set, syncs internal `step` and resets the timer.
- Hero import updates from local `HeroDemo` to imported `FlipbookDemo` — visual output identical.
- No backend or routing changes.

## Files touched
- `src/components/home/WhyEzine.tsx` — swap 3 of 4 icon SVGs.
- `src/components/home/FlipbookDemo.tsx` — **new**, extracted + extended.
- `src/components/home/HeroSection.tsx` — replace inline `HeroDemo` with `<FlipbookDemo />`.
- `src/components/home/ThreeSteps.tsx` — replace laptop mockup with `<FlipbookDemo />`, add active-step state, dim/highlight styling, optional click-to-jump.

## Open question
Card 4 in Why Ezine: keep "Seamless Document Sharing" copy with a scanning icon (mismatch), or change copy to a scanning-related feature? Default: keep copy, use scanning icon as you requested.
