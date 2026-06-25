## My Library UX Enhancements

Scope: `src/pages/Library.tsx` only (frontend/presentation).

### 1. Card View / List View toggle

- Add a `view` state (`"card" | "list"`, default `"card"`) persisted to `localStorage` (`ezine.library.view`).
- Place a toggle (two icon buttons: `LayoutGrid` for Card, `List` for List) on the right side of the tab row, just before the "Create new" button. Active state uses brand orange; inactive uses muted text.
- **Card view**: responsive grid (`grid sm:grid-cols-2 lg:grid-cols-3 gap-5`). Each card shows thumbnail on top, name, page count, short URL with Copy URL button, and Chat / Share / More actions in a footer row.
- **List view**: keep the existing horizontal article layout (thumbnail left, body right), rendered as a vertical stack. Thumbnail shrinks to ~h-28 w-28 for a denser row.

### 2. Pagination

- Page size: 8 items per page (constant `PAGE_SIZE`).
- New `page` state, reset to 1 whenever `tab`, `search`, or `view` changes.
- Slice `items` for display; render shadcn `Pagination` (`@/components/ui/pagination`) below the list when `items.length > PAGE_SIZE`. Show Prev / numbered pages (with ellipsis when >5 pages) / Next.
- Hide pagination on empty states.

### 3. Bookmarks empty state CTA

Replace the plain "No bookmarks yet" block with a centered empty-state card containing:

- `Bookmark` icon in a soft circle.
- Heading: "No Bookmarks Yet".
- Body: "Open any publication and tap the bookmark icon to save it here for quick access."
- Primary CTA button "Browse Publications" → switches `tab` to `"Publications"`.

### 4. Received Files empty state CTA

Same empty-state pattern:

- `Inbox` icon.
- Heading: "No Received Files".
- Body: "Files shared with you by teammates or via a share link will appear here. Share a publication to invite others to send files back."
- Primary CTA button "Share A Publication" → switches `tab` to `"Publications"` (where Share lives on each card).
  &nbsp;
  5. Create New CTA
    Move the "Create New" CTA to the above banner inline with the My Library title, at the right side end.
  &nbsp;

### Technical Notes

- Icons from `lucide-react`: `LayoutGrid`, `List`, `Bookmark`, `Inbox`.
- Reuse existing `handleCopy`, `copiedId`, action buttons in both views; extract a small `DocActions` inline subcomponent inside the file to avoid duplication.
- Keep all colors as semantic tokens (`bg-accent`, `text-primary`, `border-border`) — no hardcoded hex.
- Title Case for all CTA labels per project rules. No italics.
- No changes to `useDocuments`, routes, or other files.