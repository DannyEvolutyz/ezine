# Plan: Split "Use Cases + Contact" into two dedicated sections

## Why

Right now `UseCasesContact.tsx` crams the contact form and the 6 use-case tiles into one row. Users have to context-switch between "tell us about you" and "is this for me?" simultaneously. Splitting into two sections lets each one breathe and gives us room to add the qualifying info you want.

## New page order (in `src/pages/Index.tsx`)

Replace the single `<UseCasesContact />` with two components, in this order:

1. `<UseCases />` — Modern Use Cases (discovery / "is this for me?")
2. `<ContactSection />` — Contact form (intent / "let's talk")

---

## Section 1 — Modern Use Cases (new file: `src/components/home/UseCases.tsx`)

**Layout:** 2-column grid on desktop (≈ 40 / 60 split), single column on mobile. Off-white background, consistent with the rest of the page.

**Left column (sticky on desktop):**

- Eyebrow dot + small label: "USE CASES"
- H2: `Built for the way <span>modern teams</span> create`
- 3–4 line sub-copy:
  > Ezine adapts to how your team already works — whether you're publishing thought leadership, enabling sales, onboarding new hires, or turning static decks into interactive experiences. Pick your role to see exactly how Ezine fits in.
- Small secondary CTA link: "Explore all use cases →" (links to `/use-cases` or scrolls to contact)

**Right column:** 6 expandable rows (accordion using existing `@/components/ui/accordion`). Each row shows icon + title collapsed; expanding reveals 2–3 lines of body + a "Learn more →" link to the existing `/use-cases/<slug>` page. Multiple can be open at once (`type="multiple"`) so "all of them fit at a time" as you described.

Proposed copy per use case (2–3 lines each):


| Use case           | Body                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HR / People Ops    | Turn handbooks, onboarding decks, and policy updates into interactive flipbooks employees actually read. Track engagement and keep one source of truth. |
| Founders & Writers | Publish investor updates, manifestos, and long-form essays as branded, shareable experiences — no design or dev work required.                          |
| Marketing Teams    | Convert reports, lookbooks, and campaign content into trackable flipbooks. See who read what, for how long, and where they dropped off.                 |
| Sales Reps         | Send personalized pitch decks and proposals as interactive links. Get notified the moment a prospect opens, scrolls, or shares them.                    |
| Educators          | Transform lesson plans, workbooks, and course material into interactive reading experiences with built-in AI Q&A for students.                          |
| Product Teams      | Turn release notes, specs, and roadmaps into living documents the whole org can navigate, comment on, and learn from.                                   |


Icons stay as-is (already in the current file — reuse them).

---

## Section 2 — Contact (new file: `src/components/home/ContactSection.tsx`)

**Layout:** Two-column, content left / form right (similar to the Bronn reference, lighter than the Spectrum one). Background = white or off-white.

**Left column copy (matches the form's purpose: book a demo / start a conversation):**

- Eyebrow: "GET IN TOUCH"
- H2: `Let's see Ezine working on your content`
- 3–4 line sub-copy:
  > Tell us a bit about your team and what you'd like to publish. We'll show you how Ezine can turn your existing PDFs, decks, and docs into interactive experiences — and answer any questions about pricing, security, or integrations.
- Small reassurance line under the form: "We typically reply within 1 business day. No spam, ever."
- Optional 2–3 small "trust" bullets: "Free 14-day trial · No credit card · Cancel anytime"

**Form fields (right column, replacing the current name / email / message trio):**
Modeled on the two references — capture enough to qualify without feeling like a job application.

1. **Work email*** (single full-width field — primary identifier, matches Spectrum's lead pattern)
2. **Full name*** | **Company*** (two-column row)
3. **Role / Title** (dropdown with same as usecases menu items) — add a supporting line saying something like, choose one close to yours
4. **Team size** (dropdown, optional): Just me · 2–10 · 11–50 · 51–200 · 200+
5. **What brings you to Ezine?** (dropdown, required): Book a demo · Pricing for my team · Partnership · Press / Media · Something else
6. **Tell us about your content** (textarea, optional, ~4 rows): "What do you publish today, and what would you like Ezine to do for you?"
7. Submit button: **"Request a demo"** (brand orange pill, full width on mobile)
8. Fine print under button: "By submitting, you agree to our Privacy Policy."

All fields validated with `zod` (mirrors `src/pages/Contact.tsx` pattern already in the codebase): email format, required fields, max-length caps, trimmed strings. Errors shown inline, success shown via existing `toast`.

---

## Files touched

- **New:** `src/components/home/UseCases.tsx`
- **New:** `src/components/home/ContactSection.tsx`
- **Edit:** `src/pages/Index.tsx` — swap `<UseCasesContact />` for the two new components in the new order.
- **Delete:** `src/components/home/UseCasesContact.tsx` (no other imports — verified).

## Technical notes

- Use existing design tokens only (`bg-off-white`, `text-text-dark`, `text-primary`, etc.) — no hardcoded colors.
- Use shadcn `Accordion` (`type="multiple"`) for the use-case rows.
- Use `zod` + local `useState` for form validation, same pattern as `src/pages/Contact.tsx`.
- Anchor IDs: `#use-cases` on section 1, keep `#contact` on section 2 so the navbar "Contact Us" link still works.
- No backend/business-logic changes — form stays a simulated submit with `toast`, identical to today.

## Open question (optional)

Want the form submission to actually send somewhere (e.g. wire it to Lovable Cloud / email), or keep it as a simulated toast like today? Default: keep simulated — happy to wire real delivery in a follow-up.