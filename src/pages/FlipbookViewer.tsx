import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  MessageSquare,
  X,
  Minus,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
} from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { toast } from "@/hooks/use-toast";

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

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
  refs?: number[];
};

const SIDEBAR_STORAGE_KEY = "ezine-flipbook-sidebar";
const SIDEBAR_WIDTH_KEY = "ezine-flipbook-sidebar-width";

const FlipbookViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocument } = useDocuments();
  const doc = id ? getDocument(id) : undefined;
  const docName = doc?.name ?? "Document";

  const totalPages = doc?.pages ?? 12;
  const [spread, setSpread] = useState(0);
  const totalSpreads = Math.ceil(totalPages / 2);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [searchParams] = useSearchParams();

  // Sidebar state — persisted, with width
  const [chatState, setChatState] = useState<"closed" | "open" | "minimized">(() => {
    if (searchParams.get("chat") === "open") return "open";
    if (typeof window === "undefined") return "closed";
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return saved === "open" || saved === "minimized" ? saved : "closed";
  });
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    if (typeof window === "undefined") return 380;
    const saved = Number(localStorage.getItem(SIDEBAR_WIDTH_KEY));
    return saved >= 280 && saved <= 500 ? saved : 380;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, chatState);
  }, [chatState]);
  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth));
  }, [sidebarWidth]);

  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scale book to fit viewport
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
  }, [chatState, sidebarWidth]);

  const leftPage = spread * 2 + 1;
  const rightPage = Math.min(leftPage + 1, totalPages);
  const progress = totalSpreads <= 1 ? 1 : spread / (totalSpreads - 1);

  const goNext = useCallback(() => {
    setSpread((s) => {
      if (s >= totalSpreads - 1) return s;
      setFlipping("next");
      setTimeout(() => setFlipping(null), 500);
      return s + 1;
    });
  }, [totalSpreads]);
  const goPrev = useCallback(() => {
    setSpread((s) => {
      if (s <= 0) return s;
      setFlipping("prev");
      setTimeout(() => setFlipping(null), 500);
      return s - 1;
    });
  }, []);
  const goToPage = useCallback(
    (page: number) => {
      const target = Math.max(0, Math.min(totalSpreads - 1, Math.floor((page - 1) / 2)));
      setSpread(target);
    },
    [totalSpreads]
  );

  // Progress bar interaction (click + drag)
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const handleScrub = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const target = Math.round(ratio * (totalSpreads - 1));
      setSpread(target);
    },
    [totalSpreads]
  );
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => handleScrub(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, handleScrub]);

  // Keyboard navigation + Cmd/Ctrl+/ to toggle chat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setChatState((s) => (s === "open" ? "closed" : "open"));
        return;
      }
      if (typing) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Sidebar resize handle
  const resizingRef = useRef(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const w = Math.max(280, Math.min(500, window.innerWidth - e.clientX));
      setSidebarWidth(w);
    };
    const onUp = () => (resizingRef.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Chat state
  const suggestions = useMemo(
    () => [
      "Summarize this document",
      "What are the key takeaways?",
      `Explain Chapter ${Math.ceil(leftPage / 4)}`,
      "List the main concepts",
    ],
    [leftPage]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      from: "bot",
      text: `I've analyzed **${docName}** (${totalPages} pages). Ask me anything about it, or pick a suggestion below to get started.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, from: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const refPages = [Math.min(leftPage, totalPages), Math.min(leftPage + 2, totalPages)];
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        from: "bot",
        text: `Based on **${docName}**, here's what I found regarding *"${trimmed}"*:\n\n• The relevant context appears on Page ${refPages[0]}.\n• A related discussion continues on Page ${refPages[1]}.\n\nLet me know if you'd like me to go deeper on any specific section.`,
        refs: refPages,
      };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, 900);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        from: "bot",
        text: `Conversation cleared. Ask me anything about **${docName}**.`,
      },
    ]);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const sidebarOpen = chatState === "open";

  // Render message text with **bold**, *italic*, and clickable Page N refs
  const renderRich = (text: string, refs?: number[]) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|Page \d+)/g);
    return parts.map((p, i) => {
      if (/^\*\*[^*]+\*\*$/.test(p))
        return <strong key={i}>{p.slice(2, -2)}</strong>;
      if (/^\*[^*]+\*$/.test(p))
        return <span key={i} className="text-text-mid">{p.slice(1, -1)}</span>;
      const m = p.match(/^Page (\d+)$/);
      if (m && refs?.includes(Number(m[1]))) {
        const pageNum = Number(m[1]);
        return (
          <button
            key={i}
            onClick={() => goToPage(pageNum)}
            className="underline text-accent hover:text-accent/80 font-medium"
          >
            {p}
          </button>
        );
      }
      return <span key={i}>{p}</span>;
    });
  };

  return (
    <div className="h-screen bg-[#0d1424] text-primary-foreground flex flex-col relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.15)_0%,transparent_70%)] pointer-events-none animate-glow" />

      {/* Top bar */}
      <header className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 shrink-0">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Library</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <h1 className="font-heading text-sm sm:text-lg font-semibold text-primary-foreground truncate flex-1 text-center">
          {docName}
        </h1>
        <button
          onClick={() => setChatState((s) => (s === "open" ? "closed" : "open"))}
          title="Ask EzChat about this document (⌘/)"
          aria-label="Open EzChat"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-semibold shadow-[0_8px_24px_rgba(240,90,40,0.35)] hover:scale-[1.03] active:scale-95 transition-transform"
        >
          <Sparkles size={16} />
          <span>EzChat</span>
        </button>
      </header>

      {/* Main layout: viewer + sidebar */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Viewer column */}
        <div className="flex-1 flex flex-col min-w-0 group/viewer relative">
          {/* Book stage */}
          <div
            ref={stageRef}
            className="flex-1 flex items-center justify-center px-2 sm:px-6 min-h-0 relative"
            style={{ perspective: "2000px" }}
          >
            {/* Edge nav arrows — fade in on hover */}
            <button
              onClick={goPrev}
              disabled={spread === 0}
              aria-label="Previous page"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-primary-foreground opacity-0 group-hover/viewer:opacity-100 disabled:opacity-0 transition-opacity flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              disabled={spread >= totalSpreads - 1}
              aria-label="Next page"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-primary-foreground opacity-0 group-hover/viewer:opacity-100 disabled:opacity-0 transition-opacity flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>

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

          {/* Bottom progress bar */}
          <div className="relative z-10 bg-black/80 backdrop-blur-md border-t border-white/5 px-4 sm:px-6 h-14 flex items-center gap-4 shrink-0">
            <button
              onClick={goPrev}
              disabled={spread === 0}
              aria-label="Previous page"
              className="hidden sm:flex w-8 h-8 rounded-full hover:bg-white/10 disabled:opacity-30 items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={trackRef}
              onMouseDown={(e) => {
                setDragging(true);
                handleScrub(e.clientX);
              }}
              className="flex-1 h-2 rounded-full bg-white/10 relative cursor-pointer group/track"
              role="slider"
              aria-valuemin={1}
              aria-valuemax={totalPages}
              aria-valuenow={leftPage}
            >
              <div
                className="absolute inset-y-0 left-0 bg-accent rounded-full transition-[width] duration-300"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-2 border-white shadow-lg transition-[left] duration-300 group-hover/track:scale-125"
                style={{ left: `${progress * 100}%` }}
              />
            </div>

            <div className="text-xs sm:text-sm font-medium text-white tabular-nums whitespace-nowrap">
              Page {leftPage}
              {rightPage !== leftPage ? `–${rightPage}` : ""} of {totalPages}
            </div>

            <button
              onClick={goNext}
              disabled={spread >= totalSpreads - 1}
              aria-label="Next page"
              className="hidden sm:flex w-8 h-8 rounded-full hover:bg-white/10 disabled:opacity-30 items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* AI Chat — Full-height right overlay */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setChatState("closed")}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
            aria-hidden="true"
          />
          <aside
            style={{ width: `min(${sidebarWidth}px, 100vw)` }}
            className="fixed top-0 right-0 bottom-0 z-50 bg-background text-text-dark border-l border-border flex flex-col shadow-2xl animate-slide-in-right"
            aria-label="EzChat"
          >
            <SidebarContent
              docName={docName}
              messages={messages}
              typing={typing}
              suggestions={suggestions}
              input={input}
              setInput={setInput}
              onSend={sendMessage}
              onClose={() => setChatState("closed")}
              onClear={clearChat}
              onCopy={copyMessage}
              renderRich={renderRich}
              chatScrollRef={chatScrollRef}
            />
          </aside>
        </>
      )}
    </div>
  );
};

type SidebarContentProps = {
  docName: string;
  messages: ChatMessage[];
  typing: boolean;
  suggestions: string[];
  input: string;
  setInput: (v: string) => void;
  onSend: (text: string) => void;
  onClose: () => void;
  onClear: () => void;
  onCopy: (text: string) => void;
  renderRich: (text: string, refs?: number[]) => React.ReactNode;
  chatScrollRef: React.RefObject<HTMLDivElement>;
};

const SidebarContent = ({
  docName,
  messages,
  typing,
  suggestions,
  input,
  setInput,
  onSend,
  onClose,
  onClear,
  onCopy,
  renderRich,
  chatScrollRef,
}: SidebarContentProps) => {
  const showSuggestions = messages.length <= 1;
  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-2 bg-background">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-semibold text-sm text-text-dark leading-tight">EzChat</div>
            <div className="text-[11px] text-text-light truncate">{docName}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onClear}
            className="p-1.5 hover:bg-muted rounded text-text-mid"
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <Trash2 size={15} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded text-text-mid"
            aria-label="Close"
            title="Close"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatScrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/30">
        {messages.map((m) =>
          m.from === "bot" ? (
            <div key={m.id} className="flex items-start gap-2 animate-fade-in">
              <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-background border border-border rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-text-dark whitespace-pre-line leading-relaxed">
                  {renderRich(m.text, m.refs)}
                </div>
                {m.id !== "welcome" && (
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <button
                      onClick={() => onCopy(m.text)}
                      className="p-1 text-text-light hover:text-text-dark"
                      aria-label="Copy"
                      title="Copy"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      className="p-1 text-text-light hover:text-text-dark"
                      aria-label="Helpful"
                      title="Helpful"
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button
                      className="p-1 text-text-light hover:text-text-dark"
                      aria-label="Not helpful"
                      title="Not helpful"
                    >
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end animate-fade-in">
              <div className="max-w-[85%] bg-accent text-accent-foreground rounded-2xl rounded-tr-sm px-3 py-2 text-sm whitespace-pre-line leading-relaxed">
                {m.text}
              </div>
            </div>
          )
        )}

        {typing && (
          <div className="flex items-start gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles size={13} className="animate-pulse" />
            </div>
            <div className="bg-background border border-border rounded-2xl rounded-tl-sm px-3 py-2.5 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-text-light animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-text-light animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-text-light animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

      </div>

      {/* Suggestion tabs */}
      <div className="px-3 pt-3 pb-1 border-t border-border bg-background">
        <div className="text-[10px] uppercase tracking-wider text-text-light font-semibold mb-2 px-1">
          Try Asking
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.slice(0, 3).map((s) => (
            <button
              key={s}
              onClick={() => onSend(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground text-text-dark border border-border hover:border-accent transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend(input);
        }}
        className="p-3 border-t border-border bg-background flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this document..."
          className="flex-1 h-10 px-3 rounded-full border border-border text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </form>
    </>
  );
};

export default FlipbookViewer;
