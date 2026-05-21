import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  BookOpen,
  Copy,
  MoreVertical,
  MessageSquare,
  Share2,
  FileText,
  Check,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { useDocuments, type DocItem } from "@/hooks/useDocuments";
import { toast } from "@/hooks/use-toast";

const ACCEPTED = [".pdf", ".docx", ".doc"];

const Dashboard = () => {
  const { documents, addDocument } = useDocuments();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
        className={`group relative cursor-pointer rounded-3xl border-2 border-dashed bg-background p-12 text-center transition-all ${
          dragOver
            ? "border-accent bg-accent/5"
            : "border-border-strong hover:border-accent hover:bg-accent/5"
        }`}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-[0_10px_25px_-8px_rgba(240,90,40,0.5)] transition-transform group-hover:scale-110">
          <UploadCloud size={30} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-text-dark">Drag &amp; Drop</h2>
        <p className="mt-1 font-medium text-text-mid">
          or <span className="text-accent border-b border-accent">select files from device</span>
        </p>
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-text-light">
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
          <div className="grid grid-cols-1 gap-6">
            {filtered.map((doc) => (
              <article
                key={doc.id}
                className="group rounded-2xl border border-border/70 bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(35,31,32,0.25)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Link
                    to={`/viewer/${doc.id}`}
                    className="flex h-16 w-12 items-center justify-center rounded-lg border border-border bg-muted text-text-light transition-colors group-hover:border-accent/40 group-hover:text-accent"
                  >
                    <FileText size={22} />
                  </Link>
                  <button
                    aria-label="More options"
                    className="p-1 text-text-light transition-colors hover:text-text-dark"
                  >
                    <MoreVertical size={18} />
                  </button>
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
                    aria-label="Copy link"
                    className="rounded p-1 text-accent transition-colors hover:bg-background"
                  >
                    {copiedId === doc.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    aria-label="Chat"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-text-mid transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    <MessageSquare size={16} />
                  </button>
                  <button
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
    </AppShell>
  );
};

export default Dashboard;
