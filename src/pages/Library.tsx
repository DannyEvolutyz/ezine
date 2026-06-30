import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Copy,
  Check,
  MoreVertical,
  MessageSquare,
  Share2,
  BookOpen,
  FileText,
  LayoutGrid,
  List as ListIcon,
  Bookmark,
  Inbox,
  BarChart3,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { useDocuments, type DocItem } from "@/hooks/useDocuments";
import { toast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TABS = ["Publications", "Bookmarks", "Received Files"] as const;
type Tab = (typeof TABS)[number];
type View = "card" | "list";

const ACCEPTED = [".pdf", ".docx", ".doc"];
const PAGE_SIZE = 8;
const VIEW_STORAGE_KEY = "ezflip.library.view";

const Library = () => {
  const { documents, addDocument } = useDocuments();
  const [tab, setTab] = useState<Tab>("Publications");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [view, setView] = useState<View>(() => {
    if (typeof window === "undefined") return "card";
    const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
    return stored === "list" ? "list" : "card";
  });
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  useEffect(() => {
    setPage(1);
  }, [tab, search, view]);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (!ACCEPTED.includes(ext)) {
        toast({
          title: "Unsupported file",
          description: `${file.name} is not a supported format.`,
          variant: "destructive",
        });
        return;
      }
      const type = ext.replace(".", "") as DocItem["type"];
      const name = file.name.replace(/\.[^.]+$/, "");
      addDocument({ name, type });
      toast({ title: "Uploaded", description: `${file.name} added to your library.` });
    });
  };

  const handleCopy = async (doc: DocItem) => {
    await navigator.clipboard.writeText(`https://ezflip.ai${doc.shortUrl}`);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const items =
    tab === "Publications"
      ? documents.filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase()))
      : [];

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = useMemo(
    () => items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [items, currentPage],
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages]);

  const CopyLink = ({ doc }: { doc: DocItem }) => (
    <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-md border border-accent/40 bg-background px-3 py-2">
      <span className="font-mono text-xs sm:text-sm font-medium text-text-dark truncate">{doc.shortUrl}</span>
      <button
        onClick={() => handleCopy(doc)}
        aria-label="Copy link"
        className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors shrink-0 ${
          copiedId === doc.id ? "text-green-600" : "text-text-light hover:text-accent"
        }`}
      >
        {copiedId === doc.id ? <Check size={14} /> : <Copy size={14} />}
        <span>{copiedId === doc.id ? "Copied" : "Copy URL"}</span>
      </button>
    </div>
  );

  const DocActions = ({ doc }: { doc: DocItem }) => (
    <div className="flex items-center gap-3">
      <Link
        to={`/analytics/${doc.id}`}
        aria-label="Analytics"
        className="text-primary transition-colors hover:text-accent"
      >
        <BarChart3 size={18} />
      </Link>
      <button aria-label="Chat" className="text-primary transition-colors hover:text-accent">
        <MessageSquare size={18} />
      </button>
      <button aria-label="Share" className="text-primary transition-colors hover:text-accent">
        <Share2 size={18} />
      </button>
    </div>
  );

  const EmptyState = ({
    icon: Icon,
    title,
    body,
    ctaLabel,
    onCta,
  }: {
    icon: typeof Bookmark;
    title: string;
    body: string;
    ctaLabel: string;
    onCta: () => void;
  }) => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-background py-16 px-6 text-center animate-fade-in-up">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <h3 className="font-heading text-lg md:text-xl font-bold text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-mid">{body}</p>
      <button
        onClick={onCta}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_rgba(240,90,40,0.6)] transition-all hover:scale-[1.03] active:scale-95"
      >
        {ctaLabel}
      </button>
    </div>
  );

  return (
    <AppShell search={{ value: search, onChange: setSearch, placeholder: "Search your flipbook" }}>
      {/* Banner */}
      <div className="relative -mx-5 md:-mx-10 -mt-6 md:-mt-10 mb-6 md:mb-8 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent px-5 md:px-10 pt-6 md:pt-10 pb-6 md:pb-8 animate-fade-in-up">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary">My Library</h1>
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 md:px-5 py-2 md:py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_rgba(240,90,40,0.6)] transition-all hover:scale-[1.03] active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Create New</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Tabs + view toggle */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/70">
        <div className="flex items-end gap-5 md:gap-8 overflow-x-auto">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative pb-3 text-sm md:text-base font-semibold transition-colors whitespace-nowrap ${
                  active ? "text-accent" : "text-text-mid hover:text-text-dark"
                }`}
              >
                {t}
                {active && (
                  <span className="absolute -bottom-px left-0 right-0 h-[3px] rounded-full bg-accent animate-scale-in" />
                )}
              </button>
            );
          })}
        </div>
        <div
          role="group"
          aria-label="View mode"
          className="mb-2 inline-flex items-center rounded-full border border-border bg-background p-1"
        >
          <button
            onClick={() => setView("card")}
            aria-pressed={view === "card"}
            aria-label="Card View"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              view === "card" ? "bg-accent text-primary-foreground" : "text-text-mid hover:text-text-dark"
            }`}
          >
            <LayoutGrid size={14} />
            <span className="hidden sm:inline">Card</span>
          </button>
          <button
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label="List View"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              view === "list" ? "bg-accent text-primary-foreground" : "text-text-mid hover:text-text-dark"
            }`}
          >
            <ListIcon size={14} />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* List / Empty states */}
      {tab === "Bookmarks" ? (
        <EmptyState
          icon={Bookmark}
          title="No Bookmarks Yet"
          body="Open any publication and tap the bookmark icon to save it here for quick access."
          ctaLabel="Browse Publications"
          onCta={() => setTab("Publications")}
        />
      ) : tab === "Received Files" ? (
        <EmptyState
          icon={Inbox}
          title="No Received Files"
          body="Files shared with you by teammates or via a share link will appear here. Share a publication to invite others to send files back."
          ctaLabel="Share A Publication"
          onCta={() => setTab("Publications")}
        />
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-background py-20 text-center text-text-light">
          No documents found.
        </div>
      ) : (
        <>
          {view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pagedItems.map((doc, idx) => (
                <article
                  key={doc.id}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="group relative flex flex-col rounded-2xl border border-border/70 bg-background p-4 transition-all hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)] animate-fade-in-up"
                >
                  <Link
                    to={`/viewer/${doc.id}`}
                    className="flex h-44 w-full items-center justify-center rounded-lg border border-border bg-muted text-text-light transition-colors group-hover:border-accent/40 group-hover:text-accent"
                  >
                    <FileText size={48} strokeWidth={1.25} />
                  </Link>
                  <Link
                    to={`/viewer/${doc.id}`}
                    className="mt-4 break-all font-heading text-lg font-bold text-primary hover:underline pr-8"
                  >
                    {doc.name}
                  </Link>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                    <BookOpen size={16} />
                    {doc.pages} pages
                  </p>
                  <div className="mt-3">
                    <CopyLink doc={doc} />
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-3 pt-3 border-t border-border/60">
                    <DocActions />
                  </div>
                  <button
                    aria-label="More options"
                    className="absolute right-3 top-3 text-text-light transition-colors hover:text-text-dark"
                  >
                    <MoreVertical size={20} />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {pagedItems.map((doc, idx) => (
                <article
                  key={doc.id}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="group relative flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-2xl border border-border/70 bg-background p-4 transition-all hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)] animate-fade-in-up"
                >
                  <Link
                    to={`/viewer/${doc.id}`}
                    className="flex h-28 w-full sm:w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-text-light transition-colors group-hover:border-accent/40 group-hover:text-accent"
                  >
                    <FileText size={36} strokeWidth={1.25} />
                  </Link>
                  <div className="flex flex-1 min-w-0 flex-col">
                    <Link
                      to={`/viewer/${doc.id}`}
                      className="break-all font-heading text-base sm:text-lg font-bold text-primary hover:underline pr-8"
                    >
                      {doc.name}
                    </Link>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                      <BookOpen size={14} />
                      {doc.pages} pages
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <CopyLink doc={doc} />
                      <DocActions />
                    </div>
                  </div>
                  <button
                    aria-label="More options"
                    className="absolute right-4 top-4 text-text-light transition-colors hover:text-text-dark"
                  >
                    <MoreVertical size={20} />
                  </button>
                </article>
              ))}
            </div>
          )}

          {items.length > PAGE_SIZE && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {pageNumbers.map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`e-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </AppShell>
  );
};

export default Library;
