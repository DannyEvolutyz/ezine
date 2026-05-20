import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UploadCloud, Search, BookOpen, Copy, MoreVertical, MessageSquare, Share2, FileText, Check } from "lucide-react";
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
        toast({ title: "Unsupported file", description: `${file.name} is not a supported format.`, variant: "destructive" });
        return;
      }
      const type = (ext.replace(".", "") as DocItem["type"]);
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
    <AppShell>
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
        className={`relative rounded-2xl border-2 border-dashed transition-all overflow-hidden cursor-pointer ${
          dragOver ? "border-accent bg-accent/5" : "border-border-strong bg-muted/40"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        {/* Soft brand glow */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-24 h-24 rounded-full bg-background shadow-[0_10px_30px_rgba(190,30,45,0.12)] flex items-center justify-center">
            <UploadCloud className="text-accent" size={36} />
          </div>
          <h2 className="mt-6 font-heading text-3xl font-bold text-accent">Drag &amp; Drop</h2>
          <p className="mt-2 text-text-dark font-medium">or select files from device</p>
          <p className="mt-4 text-xs text-text-light">.pdf, .docx, .doc files supported</p>
        </div>
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
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="font-heading text-2xl font-bold text-accent">History</h3>
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your flipbook"
              className="w-full h-11 pl-10 pr-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-text-light">No documents found.</div>
          )}
          {filtered.map((doc) => (
            <article
              key={doc.id}
              className="relative bg-background border border-border rounded-2xl p-5 flex gap-6 items-center hover:shadow-[0_10px_30px_rgba(26,21,18,0.06)] transition-shadow"
            >
              {/* Thumbnail */}
              <Link
                to={`/viewer/${doc.id}`}
                className="shrink-0 w-32 h-40 rounded-md border border-border bg-off-white flex items-center justify-center text-text-light hover:border-accent transition-colors"
              >
                <FileText size={42} />
              </Link>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/viewer/${doc.id}`}
                  className="font-heading text-xl font-bold text-primary hover:underline break-all"
                >
                  {doc.name}
                </Link>
                <div className="mt-2 flex items-center gap-2 text-accent text-sm font-medium">
                  <BookOpen size={16} />
                  <span>{doc.pages} pages</span>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-accent/40 bg-background">
                  <span className="text-sm text-text-dark font-medium">{doc.shortUrl}</span>
                  <button
                    onClick={() => handleCopy(doc)}
                    aria-label="Copy link"
                    className="text-text-light hover:text-accent transition-colors"
                  >
                    {copiedId === doc.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Top-right menu */}
              <button
                aria-label="More"
                className="absolute top-4 right-4 text-text-light hover:text-text-dark"
              >
                <MoreVertical size={20} />
              </button>

              {/* Bottom-right actions */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3 text-primary">
                <button aria-label="Chat" className="hover:text-accent transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button aria-label="Share" className="hover:text-accent transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
};

export default Dashboard;
