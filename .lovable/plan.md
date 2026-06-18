# UX Audit — AI Chat Feature Page (`/features/ai-chat`)

A top-to-bottom review across design, layout, usability, content and heuristic compliance. Findings are grouped by section, each with severity (🔴 high / 🟡 medium / 🟢 polish) and a concrete recommendation.

---

## 1. Breadcrumbs

**Current:** `Home / Features / AI Chat` — rendered as plain text with `/` separators above the hero badge.

- 🟡 "Features" is shown but is **not a link** (there is no Features index page). Users may try to click it and get nothing.
- 🟡 Visually it competes with the "AI Feature" pill directly below it — two stacked micro-labels create noise before the H1.
- 🟢 No semantic `<nav aria-label="Breadcrumb">` / `<ol>` markup — bad for screen readers and SEO (no BreadcrumbList schema).

**Recommendation**

- Use the shadcn `Breadcrumb` component already in the project (`src/components/ui/breadcrumb.tsx`) for semantics + schema.
- Either make "Features" a real link to a features overview, or collapse the trail to `Home / AI Chat`.
- Remove the the breadcrumb.
- Keep AI Feature pill

---

## 2. Hero Section

**Current layout:** Left = badge + H1 (3 lines) + subcopy + CTA + "Free to use". Right = a faux chat-window mock.

### Copy

- 🟡 H1 "Ask questions. Get answers. No scrolling, no guessing." is punchy but **doesn't say what the product does**. A first-time visitor landing here from search may not realize it's about chatting *with documents*.
- 🟡 Subcopy partially repeats the H1 ("get precise answers instantly, without reading through everything").
- 🟢 "Free to use" next to the CTA is ambiguous — free trial? Free forever? Included in plan?

**Suggested copy**

- H1: **"Chat with any document. Get instant answers."**
- Sub: **"Upload a document and ask questions in plain language.**
  **eZine instantly finds the answer, understands the context, and helps you locate the information you need without manually searching through pages."**
- Add another secondary CTA beside primary with copy - **See AI Chat in Action**
- Replace "Free to use" with **"No setup required"** or **"Works on any PDF"**.  And place it below the CTAs 

### Visual / Layout

- 🟡 The chat mock is information-dense (left "document" column + right chat column + 4 messages + input). At 1280–1440px it reads okay, but on tablet/small desktop it crowds the H1.
- 🟡 Three decorative floating shapes + grid pattern + 3 gradient blobs = a lot of background activity competing with the mock.
- 🟢 The "Section 4 · Page 12" citation chips inside the mock are the most credible/differentiating detail but are easy to miss. Worth highlighting.

**Recommendation**

- Hide the left "document" column of the mock below `lg` (already partially done with `hidden md:block`) and shrink the mock height on `md`.
- Reduce background decoration to 1 gradient blob + the grid, drop the floating geometric shapes — they don't reinforce meaning.
- Add a subtle pulse/highlight on the citation chip to draw the eye there — it's the proof.

### CTA

- 🔴 The primary CTA links to `https://www.ezine.digital` (external). Two problems:
  - Loses the user from the marketing site without `target="_blank"` or any indication.
  - Inconsistent with other pages where CTAs open a demo/contact flow.
- 🟡 Only **one** CTA. No secondary "See how it works" or "Watch demo" for users not ready to convert.

**Recommendation**

- Primary: "Try It On Your Document" → product/signup.
- Secondary (ghost button): "See How It Works" → smooth-scroll to the "What You Can Do" section.

---

## 3. "The Problem Section"

**Current Heading**

Nobody reads documents.  
They search them.

---

**Recommendation**

- Retain existing heading.
- It is concise, memorable, and effectively communicates the problem.

---

### **Supporting Copy**

**Current**

Long paragraph explaining user behavior.

**Recommended**

- Most people do not read entire documents.
- They search, skim, and scroll to find information, often missing important details in the process.

---

## Black Information Card

**Current**

"Type a question. Get the answer. Skip the scroll."

**Issue**

- Repeats the Hero message.
- Provides no proof.

---

### **Recommended Replacement**

Show a real example.

### Example Layout

- Question: What is the leave policy during probation?
- Answer: Employees receive 6 days of sick leave during the first three months of employment.
- Source: Employee Handbook → Section 4.2

---

### Goal

Show proof rather than marketing copy.

---

## 4. "What You Can Do" Section (dark, 3 cards in 2-col grid)

**Current:** Dark `bg-ink-2` block. 3 numbered cards (01, 02, 03), with 03 spanning full width.

- 🟡 Cards 01 and 02 say nearly the same thing in different words:
  - 01: "Ask questions directly within documents"
  - 02: "Get clear answers instantly"
  These are two halves of one action, not two capabilities. Feels like padding.
- 🟡 The asymmetric layout (2 + 1 full-width) makes card 03 look like the most important, but its copy ("Works across all your documents") is the weakest/most generic of the three.
- 🟢 Numbered "01 / 02 / 03" implies a sequence, but these aren't steps — they're parallel benefits. Numbering misleads.

**Recommendation**

- Collapse to **3 truly distinct capabilities**, no numbering:
  1. **Ask in plain English** — "No keywords, no Ctrl+F. Type a question the way you'd ask a colleague."
  2. **Answers with citations** — "Every response points to the exact section and page it came from. No hallucinations, no guessing."
  3. **Works on what you already have** — "Drop in any PDF — handbooks, SOPs, training decks. No re-formatting, no manual tagging."
- Use a clean 3-column grid (no full-width card).
- Consider switching this block to a **light** background to match the project's "light and airy" core rule — currently it's the second dark block on the page after the quote card.

---

## 5. "Where This Makes the Biggest Difference" Section

**Current:** Light bg, 3 cards (Onboarding, Training Materials, Internal Documents). One card links to the HR use case.

- 🟡 Eyebrow label "Where This Makes the Biggest Difference" is 6 words long — too long for a kicker.
- 🟡 Only the Onboarding card has a "See Onboarding Use Case" link. The other two cards feel incomplete by comparison — inconsistent affordance.
- 🟡 Card titles are full sentences ("New hires get answers on day one"), which makes the grid heavy. Pair a short title with a benefit sentence instead.
- 🟢 Icons (Users / BookOpen / FileText) are fine but generic; no visual differentiation between cards beyond color.

**Recommendation**

- Eyebrow: **"Where It Shines"**.
- H2: **"Three places AI chat earns its keep"** (less hyperbolic than "changes everything").
- Card structure: short noun title + 1-sentence benefit + consistent "See use case →" link on all three (link Training to a training use case, Internal Docs to SOPs/HR — even if those pages don't exist yet, ship them or remove the link from Onboarding too for consistency).
- Add a small metric/proof per card if available (e.g. "70% fewer 'where do I find…' Slack messages").

---

## 6. Final CTA Section

**Current:** `<CtaSection>` with "Stop scrolling. Start asking." + body + single button.

- 🟡 Reuses the same CTA label ("Try It On Your Document") as the hero — feels like the page hasn't progressed. By the bottom, the user has more context and deserves a stronger ask.
- 🟡 No risk-reducer near the final CTA (no "no credit card", "2-min setup", "works on any PDF").
- 🟢 Headline "Stop scrolling. Start asking." mirrors the hero structure — fine, but a benefit-led close would convert better.

**Recommendation**

- Headline: **"Turn your next document into a conversation."**
- Body: **"Upload a PDF, ask your first question in under a minute. No setup, no credit card."**
- Primary CTA: **"Upload A Document"** · Secondary ghost: **"Talk To Sales"**.

---

## 7. Cross-Cutting Heuristic Issues


| #   | Heuristic                         | Issue                                                                                                                                                                       | Recommendation                                                                                   |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| H1  | Consistency & standards           | Two dark sections (quote card + "What You Can Do") in an otherwise light page violate the project's "light and airy" core rule                                              | Light-mode both, reserve dark only for the final CTA if needed                                   |
| H2  | Recognition over recall           | No anchor nav / on-page TOC; the page is ~5 long sections deep                                                                                                              | Add a thin sticky sub-nav under the breadcrumb: Problem · Capabilities · Use Cases · Get Started |
| H3  | Match between system & real world | "EzBot" appears in the mock with no prior introduction                                                                                                                      | Either introduce the assistant name once in the hero subcopy, or just call it "AI" in the mock   |
| H4  | Visibility of system status       | The shimmer animation in the mock implies live processing but the chat shows completed answers — mixed signal                                                               | Either animate the typing of the answer, or remove the shimmer                                   |
| H5  | Aesthetic & minimalist design     | Hero stacks: breadcrumb + pill + 3-line H1 + sub + CTA + reassurance = 6 vertical elements before the fold ends                                                             | Drop the pill (breadcrumb already orients) and merge reassurance into the CTA row                |
| H6  | Accessibility                     | The chat mock uses decorative `<svg>` and shape `<div>`s with no `aria-hidden`; icons inside buttons lack labels in some places                                             | Add `aria-hidden="true"` to decorative SVGs; ensure icon-only elements have `aria-label`         |
| H7  | Accessibility — contrast          | Light gray text (`text-text-light`) on `bg-warm-gray` inside the mock fails WCAG AA at small sizes                                                                          | Bump to `text-text-mid` or darker for the placeholder + meta text                                |
| H8  | Mobile                            | Hero right column (chat mock) is heavy; on mobile the document-column is hidden but the chat column still has 4 messages — long scroll before users see the problem section | Show only 2 messages on mobile, or replace the mock with a single screenshot on `<md`            |
| H9  | SEO                               | No visible H1 keyword targeting "AI chat for PDFs / documents"; H1 is benefit-only                                                                                          | Work the keyword into H1 or H2 — e.g. "Chat with any document"                                   |
| H10 | Trust                             | No logos, no testimonial, no metric anywhere on the page                                                                                                                    | Add a thin logo strip under the hero OR one testimonial between sections 4 and 5                 |


---

## 8. Priority Order for Fixes

1. 🔴 Hero CTA destination + add secondary CTA (conversion blocker)
2. 🔴 Rewrite the 3 "What You Can Do" cards to remove redundancy
3. 🟡 Breadcrumb semantics + remove duplicate orientation pill
4. 🟡 Lighten the two dark sections to honor the light/airy brand rule
5. 🟡 Consistent "See use case" link across all 3 use-case cards
6. 🟡 Rewrite final CTA with new headline + risk-reducer + secondary action
7. 🟢 Mock simplification on mobile + reduce hero background decoration
8. 🟢 Accessibility passes (aria-hidden on decor SVGs, contrast bumps)
9. 🟢 Add trust strip (logos or one testimonial)

---

**Next step:** tell me which of these you want to implement — I can do them all in one pass, or start with the 🔴 high-severity items only (hero CTA + rewriting the capabilities cards). I can also generate 2–3 visual directions for the hero and the "What You Can Do" block before coding, if you'd like to see options first.