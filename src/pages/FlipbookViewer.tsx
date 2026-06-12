import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Send, Bot, MessageSquare, X } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";

const lorem = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
];

const Page = ({ pageNumber, title }: { pageNumber: number; title: string }) => (
  <div className="w-[360px] h-[520px] bg-[#fdfaf3] text-ink rounded-sm shadow-xl p-8 flex flex-col">
    {pageNumber % 2 === 1 && (
      <h3 className="font-heading text-xl font-bold mb-3 text-text-dark">{title}</h3>
    )}
    <div className="flex-1 space-y-3 text-[13px] leading-relaxed text-text-mid">
      {lorem.slice(0, 4).map((l, i) => (
        <p key={i}>{l}</p>
      ))}
      <div className="h-24 bg-muted rounded my-3 flex items-center justify-center text-xs text-text-light">
        [ figure {pageNumber} ]
      </div>
      <p>{lorem[4]}</p>
    </div>
    <div className="text-center text-xs text-text-light mt-2">— {pageNumber} —</div>
  </div>
);

const FlipbookViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocument } = useDocuments();
  const doc = id ? getDocument(id) : undefined;

  const totalPages = doc?.pages ?? 12;
  const [spread, setSpread] = useState(0);
  const totalSpreads = Math.ceil(totalPages / 2);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scale book to fit viewport (book intrinsic width = 720, height = 520)
  useEffect(() => {
    const fit = () => {
      const el = stageRef.current;
      if (!el) return;
      const availW = el.clientWidth - 24;
      const availH = el.clientHeight - 24;
      const s = Math.min(availW / 720, availH / 520, 1);
      setScale(Math.max(s, 0.35));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const leftPage = spread * 2 + 1;
  const rightPage = Math.min(leftPage + 1, totalPages);

  const messages = useMemo(
    () => [{ from: "bot", text: "Hi! I'm here to help you understand this document. Ask me anything." }],
    []
  );
  const [input, setInput] = useState("");

  const goNext = () => {
    if (spread >= totalSpreads - 1 || flipping) return;
    setFlipping("next");
    setTimeout(() => { setSpread((s) => s + 1); setFlipping(null); }, 600);
  };
  const goPrev = () => {
    if (spread <= 0 || flipping) return;
    setFlipping("prev");
    setTimeout(() => { setSpread((s) => s - 1); setFlipping(null); }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0d1424] text-primary-foreground flex flex-col relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.15)_0%,transparent_70%)] pointer-events-none animate-glow" />

      {/* Top bar */}
      <header className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Library</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <h1 className="font-heading text-sm sm:text-lg font-semibold text-primary-foreground truncate flex-1 text-center">
          {doc?.name ?? "Document"}
        </h1>
        <div className="w-16 sm:w-32" />
      </header>

      {/* Book stage */}
      <div ref={stageRef} className="flex-1 flex items-center justify-center px-2 sm:px-6 min-h-0" style={{ perspective: "2000px" }}>
        <div
          className="relative flex shadow-[0_30px_80px_rgba(0,0,0,0.6)] rounded-md transition-transform"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          <div
            className={`origin-right transition-transform duration-500 ${flipping === "prev" ? "[transform:rotateY(180deg)]" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Page pageNumber={leftPage} title={`Chapter ${Math.ceil(leftPage / 4)}`} />
          </div>
          <div
            className={`origin-left transition-transform duration-500 ${flipping === "next" ? "[transform:rotateY(-180deg)]" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Page pageNumber={rightPage} title={`Section ${rightPage}`} />
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/30 -translate-x-1/2" />
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 py-4 sm:py-6 flex items-center justify-center gap-4 sm:gap-6">
        <button
          onClick={goPrev}
          disabled={spread === 0}
          className="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 disabled:opacity-30 flex items-center justify-center transition-all active:scale-95"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-xs sm:text-sm font-medium text-primary-foreground/80 tabular-nums">
          Page {leftPage}
          {rightPage !== leftPage ? `–${rightPage}` : ""} of {totalPages}
        </div>
        <button
          onClick={goNext}
          disabled={spread >= totalSpreads - 1}
          className="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 disabled:opacity-30 flex items-center justify-center transition-all active:scale-95"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Chat FAB (mobile) / collapsible panel */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-[0_12px_32px_rgba(240,90,40,0.45)] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform animate-fade-in-up"
          aria-label="Open chat"
        >
          <MessageSquare size={22} />
        </button>
      )}

      {chatOpen && (
        <aside
          className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[340px] h-[480px] max-h-[80vh] z-40 bg-background text-text-dark rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-in-up"
          aria-label="Document assistant"
        >
          <div className="px-4 py-3 bg-accent text-accent-foreground flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span className="font-heading font-semibold text-sm">Ask about this document</span>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="p-1 hover:bg-primary-foreground/15 rounded">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className="bg-muted rounded-lg p-3 text-sm text-text-mid animate-fade-in">
                {m.text}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setInput(""); }}
            className="p-3 border-t border-border flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 h-10 px-3 rounded-full border border-border text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </aside>
      )}
    </div>
  );
};

export default FlipbookViewer;
