import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Copy, Check, MoreVertical, MessageSquare, Share2, BookOpen, FileText } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useDocuments, type DocItem } from "@/hooks/useDocuments";
import { toast } from "@/hooks/use-toast";

const TABS = ["Publications", "Bookmarks", "Received Files"] as const;
type Tab = (typeof TABS)[number];

const ACCEPTED = [".pdf", ".docx", ".doc"];

const Library = () => {
  const { documents, addDocument } = useDocuments();
  const [tab, setTab] = useState<Tab>("Publications");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    await navigator.clipboard.writeText(`https://ezine.digital${doc.shortUrl}`);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const items =
    tab === "Publications"
      ? documents.filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase()))
      : [];

  return (
    <AppShell search={{ value: search, onChange: setSearch, placeholder: "Search your flipbook" }}>
      {/* Banner */}
      <div className="relative -mx-5 md:-mx-10 -mt-6 md:-mt-10 mb-6 md:mb-8 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent px-5 md:px-10 pt-6 md:pt-10 pb-6 md:pb-8 animate-fade-in-up">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary">My Library</h1>
      </div>

      {/* Tabs + create */}
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
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 md:px-5 py-2 md:py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-8px_rgba(240,90,40,0.6)] transition-all hover:scale-[1.03] active:scale-95"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create new</span>
          <span className="sm:hidden">New</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>


      {/* List */}
      {tab !== "Publications" ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-background py-20 text-center text-text-light">
          No {tab.toLowerCase()} yet.
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-background py-20 text-center text-text-light">
          No documents found.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((doc, idx) => (
            <article
              key={doc.id}
              style={{ animationDelay: `${idx * 60}ms` }}
              className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl border border-border/70 bg-background p-4 sm:p-5 transition-all hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)] animate-fade-in-up"
            >
              {/* Thumbnail */}
              <Link
                to={`/viewer/${doc.id}`}
                className="flex h-40 sm:h-56 w-full sm:w-44 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-text-light transition-colors group-hover:border-accent/40 group-hover:text-accent"
              >
                <FileText size={48} strokeWidth={1.25} />
              </Link>

              {/* Body */}
              <div className="flex flex-1 min-w-0 flex-col">
                <Link
                  to={`/viewer/${doc.id}`}
                  className="break-all font-heading text-lg sm:text-xl font-bold text-primary hover:underline pr-8"
                >
                  {doc.name}
                </Link>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-accent">
                  <BookOpen size={16} />
                  {doc.pages} pages
                </p>

                <div className="mt-4 inline-flex w-fit max-w-full items-center gap-2 rounded-md border border-accent/40 bg-background px-3 py-2">
                  <span className="font-mono text-xs sm:text-sm font-medium text-text-dark truncate">{doc.shortUrl}</span>
                  <button
                    onClick={() => handleCopy(doc)}
                    aria-label="Copy link"
                    className="text-text-light transition-colors hover:text-accent shrink-0"
                  >
                    {copiedId === doc.id ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>

                <div className="mt-4 sm:mt-auto flex items-center gap-3 sm:justify-end">
                  <button aria-label="Chat" className="text-primary transition-colors hover:text-accent">
                    <MessageSquare size={18} />
                  </button>
                  <button aria-label="Share" className="text-primary transition-colors hover:text-accent">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Top-right menu */}
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
    </AppShell>
  );
};

export default Library;
