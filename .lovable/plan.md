
## Goal
Add a publisher-only Document Analytics view per the handoff doc (Phase 1 MVP, plus a few Phase 2 visuals). Frontend/prototype only — mocked data, no tracking beacon or backend.

## Entry points
1. **Library cards (History/Publications):** Add an Analytics icon (BarChart3) to `DocActions` on both card and list views. Clicking opens the analytics screen for that doc.
2. **FlipbookViewer header:** The Analytics icon already exists in the top header — wire it to open the same analytics screen for the current doc.

## New route & screen
- Route: `/analytics/:id` (registered in `src/App.tsx`), rendered inside `AppShell` so the publisher dashboard chrome is preserved.
- File: `src/pages/DocumentAnalytics.tsx`.
- Header strip: doc title, page count, share link with copy, "Back" link, last-updated stamp ("Data refreshed Xm ago").

### Layout (Phase 1 MVP from §4.1)
1. **Metric cards row (4 cards):**
   - Total Unique Views
   - Avg Read Time (`Xm Ys`)
   - Completion Rate (%)
   - Total Link Opens
2. **Charts row (2 cols):**
   - **Device Breakdown** donut (Mobile / Desktop / Tablet) using `recharts` PieChart.
   - **Referrer Source** horizontal bar chart (Direct / Email / WhatsApp / Embedded / Social / Other).
3. **Phase-2 visuals included as static mock charts** so the screen feels complete:
   - **Page-time heatmap** bar chart (avg seconds per page, top-3 highlighted in accent).
   - **Drop-off funnel** stepped bar (% readers reaching each page).
   - Date-range filter pill group (Last 7 days / Last 30 days / All time), client-side only, defaults to All time.
4. **Link Open Log table:**
   - Columns: Date & time, Device (icon + label), Country (flag + name), Source.
   - Sorted newest first, paginated at 25 rows using existing `Pagination` component.
5. **Empty state (§4.1):** when mock opens count = 0, show illustration + "No views yet. Share your link to start tracking." with copy-to-clipboard share link, no charts/metric cards.

## Mock data
- `src/lib/analyticsMock.ts` — deterministic generator keyed by `doc.id` returning summary, devices, referrers, pageStats, funnel, opens (~60 rows). Uses simple seeded RNG so each doc has stable numbers across reloads. One seeded doc returns zero-state to demo the empty state.

## Components
- `src/components/analytics/MetricCard.tsx` — label, big value, sublabel, optional delta chip.
- `src/components/analytics/DeviceDonut.tsx` — recharts donut + legend.
- `src/components/analytics/ReferrerBars.tsx` — recharts horizontal bars.
- `src/components/analytics/PageTimeChart.tsx` — recharts bar with top-3 accent color.
- `src/components/analytics/FunnelChart.tsx` — stacked horizontal bars showing %.
- `src/components/analytics/OpensTable.tsx` — table + pagination + device/country/source cells.
- `src/components/analytics/DateRangeTabs.tsx` — pill group.

Reuses existing `src/components/ui/{card,table,tabs,pagination}.tsx`, `recharts` (already in deps via `chart.tsx`), and lucide icons (`Monitor`, `Smartphone`, `Tablet`, `Globe`, `BarChart3`, `Link2`, `Eye`, `Clock`, `CheckCircle2`).

## Wiring
- **Library.tsx:** add `BarChart3` button to `DocActions` linking to `/analytics/${doc.id}`. Pass `doc` prop into `DocActions` (currently no props).
- **FlipbookViewer.tsx:** existing Analytics icon `onClick` → `navigate(\`/analytics/${id}\`)`.
- **App.tsx:** add `<Route path="/analytics/:id" element={<DocumentAnalytics />} />`.

## Visual style
- Follows existing tokens (accent orange, primary dark, `text-text-mid`, rounded-2xl cards, subtle shadow `hover:shadow-[0_18px_40px_-20px_...]`, `animate-fade-in-up`). No italics, Outfit font, Title Case headings.
- Charts use accent (#F05A28), primary (#231F20), and neutral grays from the existing palette — no new colors.

## Out of scope (per §8 + frontend-only)
Tracking beacon, event ingestion, real backend, GDPR consent banner, CSV export, geographic map (skipped — country shown in table only), notifications, named link variants, free-tier locked state.
