import { useRef, useState } from "react";
import { ArrowUpToLine } from "lucide-react";

import AppShell from "@/components/AppShell";
import PublicationCard from "@/components/PublicationCard";
import { useDocuments, type DocItem } from "@/hooks/useDocuments";
import { toast } from "@/hooks/use-toast";
import ShareDialog from "@/components/ShareDialog";

const ACCEPTED = [".pdf", ".docx", ".doc"];

const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
};

const Dashboard = () => {
  const { documents, addDocument, removeDocument } = useDocuments();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareDoc, setShareDoc] = useState<DocItem | null>(null);

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

  const filtered = documents.filter((d) =>
    d.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <AppShell search={{ value: search, onChange: setSearch }}>
      {/* Upload area */}
      <section
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`group relative cursor-pointer rounded-3xl border-2 border-dashed bg-background p-6 sm:p-10 md:p-12 text-center transition-all animate-fade-in-up ${
          dragOver
            ? "border-accent bg-accent/5 scale-[1.01]"
            : "border-border-strong hover:border-accent hover:bg-accent/5"
        }`}
      >
        <div className="mx-auto mb-5 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-[0_10px_25px_-8px_rgba(240,90,40,0.5)] transition-transform group-hover:scale-110 group-hover:-rotate-3">
          <ArrowUpToLine size={28} />
        </div>
        <h2 className="font-heading text-lg sm:text-xl font-bold text-text-dark">Select files from device</h2>
        <p className="mt-2 text-xs sm:text-sm font-medium text-text-light">
          .pdf, .docx, .doc files supported
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </section>


      {/* History */}
      <section className="mt-12">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="flex items-center font-heading text-xl font-bold text-text-dark">
            <span className="mr-3 h-7 w-1.5 rounded-full bg-primary" />
            History
          </h3>
          <span className="text-sm text-text-light">
            {filtered.length} {filtered.length === 1 ? "document" : "documents"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-strong bg-background py-16 text-center text-text-light">
            No documents found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((doc, idx) => (
              <article
                key={doc.id}
                style={{ animationDelay: `${idx * 70}ms` }}
                className="group rounded-2xl border border-border/70 bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)] animate-fade-in-up"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Link
                    to={`/viewer/${doc.id}`}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-text-light transition-colors group-hover:border-accent/40 group-hover:text-accent"
                  >
                    <FileText size={22} />
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="More options"
                        className="p-1 text-text-light transition-colors hover:text-text-dark"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem asChild>
                        <a
                          href={`/viewer/${doc.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={14} />
                          Open in new tab
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setShareDoc(doc)}
                        className="flex items-center gap-2"
                      >
                        <Share2 size={14} />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleCopy(doc);
                          toast({ title: "Link copied", description: doc.shortUrl });
                        }}
                        className="flex items-center gap-2"
                      >
                        <Link2 size={14} />
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/viewer/${doc.id}?chat=open`)}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare size={14} />
                        EzChat
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/analytics/${doc.id}`)}
                        className="flex items-center gap-2"
                      >
                        <BarChart3 size={14} />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            aria-label={`Delete flipbook ${doc.name}`}
                            className="flex items-center gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete flipbook
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this flipbook?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove “{doc.name}”. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                removeDocument(doc.id);
                                toast({ title: "Deleted", description: `${doc.name} removed.` });
                              }}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete flipbook
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link
                  to={`/viewer/${doc.id}`}
                  className="block truncate font-heading text-base font-bold text-text-dark transition-colors hover:text-primary"
                >
                  {doc.name}
                </Link>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-text-mid">
                  <BookOpen size={13} />
                  {doc.pages} pages
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/60 p-2">
                  <span className="truncate font-mono text-xs font-medium text-text-mid">
                    {doc.shortUrl}
                  </span>
                  <button
                    onClick={() => handleCopy(doc)}
                    aria-label={copiedId === doc.id ? "Copied" : "Copy URL"}
                    className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-colors ${
                      copiedId === doc.id
                        ? "text-green-600"
                        : "text-accent hover:bg-background"
                    }`}
                  >
                    {copiedId === doc.id ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy URL
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Link
                    to={`/viewer/${doc.id}?chat=open`}
                    aria-label="Open chat assistant"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-text-mid transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    <MessageSquare size={16} />
                  </Link>
                  <button
                    onClick={() => setShareDoc(doc)}
                    aria-label="Share"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-text-mid transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ShareDialog
        open={!!shareDoc}
        onOpenChange={(o) => !o && setShareDoc(null)}
        title={shareDoc?.name ?? ""}
        url={shareDoc ? `https://ezflip.ai${shareDoc.shortUrl}` : ""}
      />
    </AppShell>
  );
};

export default Dashboard;
