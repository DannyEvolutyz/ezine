import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  X,
  Bookmark,
  Share2,
  Search,
  Monitor,
  ZoomIn,
  ZoomOut,
  Volume2,
  Maximize2,
  BarChart3,
} from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { toast } from "sonner";
import ezflipLogo from "@/assets/ezflip-logo.png.asset.json";
import ShareDialog from "@/components/ShareDialog";

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
};

const LeftPage = () => (
  <div className="w-[440px] h-[620px] bg-white relative overflow-hidden px-12 py-12 text-[#231F20]">
    <div className="text-[12px] mb-5">
      <span className="font-medium">02</span>
      <span className="mx-2 text-text-light">·</span>
      <span>What is eZFlip?</span>
    </div>
    <div className="space-y-3 text-[12px] leading-relaxed">
      <p className="font-medium">● PLATFORM OVERVIEW</p>
      <p className="font-medium">Turn documents into experiences</p>
      <p>
        Most tools make documents look better. eZFlip makes them easier to use —
        readers ask, search, navigate, and actually finish what they open.
      </p>
      <p className="font-medium pt-1">What eZFlip does differently</p>
      <p className="font-medium">💬 Ask anything</p>
      <p>Readers ask questions. The AI answers directly from the document — no hallucinations.</p>
      <p className="font-medium">📓 Instant summaries</p>
      <p>One click. A clean TL;DR of any document or section.</p>
      <p className="font-medium">🔗 One-link sharing</p>
      <p>Share anywhere with a single link. Track exactly who reads it.</p>
    </div>
    <div
      className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-bl from-transparent via-black/5 to-black/15"
      style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
    />
  </div>
);

const RightPage = () => (
  <div className="w-[440px] h-[620px] bg-white relative overflow-hidden px-12 py-12 text-[#231F20]">
    <div className="text-[12px] mb-5">
      <span className="font-medium">03</span>
      <span className="mx-2 text-text-light">·</span>
      <span>Why it matters</span>
    </div>
    <div className="space-y-3 text-[12px] leading-relaxed">
      <p className="font-medium">● THE PROBLEM WE SOLVE</p>
      <p>Your readers aren't disengaged. Your content is just hard to use.</p>
      <p>eZFlip removes friction. Upload once, share everywhere, track everything.</p>
      <p className="italic">"The issue isn't your content. It's how it's consumed."</p>
      <p>— Darahas Muggu, eZFlip by Evolutyz</p>
      <p className="font-medium pt-1">Built for every team</p>
      <p>Sales · Marketing · HR · Education · Founders · Product</p>
    </div>
    <div
      className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-transparent via-black/5 to-black/15"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
    />
  </div>
);

const iconBtn =
  "w-10 h-10 rounded-lg bg-white border border-[#eee] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:shadow-md hover:border-[#ddd]";

const FlipbookViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocument } = useDocuments();
  const doc = id ? getDocument(id) : undefined;
  const docName = doc?.name ?? "eZFlip - Product Overview";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const totalPages = doc?.pages ?? 5;
  const [spread, setSpread] = useState(0);
  const totalSpreads = Math.ceil(totalPages / 2);
  const [searchParams] = useSearchParams();

  const [chatOpen, setChatOpen] = useState(searchParams.get("chat") === "open");
  const [zoom, setZoom] = useState(0.5);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const el = stageRef.current;
      if (!el) return;
      const availW = el.clientWidth - 40;
      const availH = el.clientHeight - 40;
      const s = Math.min(availW / 880, availH / 620, 1);
      setAutoScale(Math.max(s, 0.3));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [chatOpen]);

  const scale = autoScale * (0.7 + zoom * 0.6);

  const leftPage = spread * 2 + 1;
  const rightPage = Math.min(leftPage + 1, totalPages);
  const progress = totalSpreads <= 1 ? 1 : spread / (totalSpreads - 1);

  const goNext = useCallback(() => {
    setSpread((s) => Math.min(totalSpreads - 1, s + 1));
  }, [totalSpreads]);
  const goPrev = useCallback(() => setSpread((s) => Math.max(0, s - 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const trackRef = useRef<HTMLDivElement>(null);
  const handleScrub = (clientX: number) => {
    const t = trackRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    setSpread(Math.round(ratio * (totalSpreads - 1)));
  };

  const toggleBookmark = () => {
    setBookmarked((b) => {
      const next = !b;
      toast(next ? "This file is bookmarked" : "This file is removed from bookmarks", {
        position: "top-right",
      });
      return next;
    });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, from: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `b-${Date.now()}`,
          from: "bot",
          text: `Based on ${docName}: here's a quick answer about "${trimmed}".`,
        },
      ]);
    }, 700);
  };

  return (
    <div className="h-screen bg-[#f4f4f4] text-[#231F20] flex overflow-hidden">
      {/* Main column (shrinks when chat opens) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar - white */}
        <header className="px-6 py-3 flex items-center justify-between gap-3 shrink-0 bg-white border-b border-[#eee]">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#eee] text-[#231F20] text-sm font-medium transition-all hover:bg-[#f5f5f5] hover:shadow-md"
          >
            <ArrowLeft size={16} />
            <span>Back to Library</span>
          </Link>

          {searchOpen ? (
            <div className="flex-1 max-w-xl mx-4 flex items-center gap-2 h-11 px-4 rounded-full bg-[#f5f5f5] border border-[#e5e5e5]">
              <Search size={16} className="text-text-mid" />
              <input
                ref={searchInputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search in document..."
                className="flex-1 bg-transparent text-sm focus:outline-none caret-accent animate-pulse-caret"
                style={{ caretColor: "#F05A28" }}
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchValue("");
                }}
                className="text-text-mid hover:text-[#231F20]"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <h1 className="text-[15px] text-[#231F20] truncate">{docName}</h1>
          )}

          <div className="flex items-center gap-2">
            <button onClick={toggleBookmark} className={iconBtn} aria-label="Bookmark">
              <Bookmark size={18} fill={bookmarked ? "#F05A28" : "none"} className={bookmarked ? "text-accent" : ""} />
            </button>
            <button onClick={() => setShareOpen(true)} className={iconBtn} aria-label="Share">
              <Share2 size={18} />
            </button>
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className={iconBtn}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button className={iconBtn} aria-label="Analytics">
              <BarChart3 size={18} />
            </button>
            <button
              onClick={() => setChatOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold shadow-[0_4px_14px_rgba(240,90,40,0.4)] hover:shadow-[0_6px_20px_rgba(240,90,40,0.55)] hover:brightness-105 transition-all"
            >
              <Sparkles size={16} fill="white" />
              <span>eZ chat</span>
            </button>
          </div>
        </header>

        {/* Viewer stage */}
        <div className="flex-1 flex min-h-0 relative">
          <div ref={stageRef} className="flex-1 flex items-center justify-center relative min-w-0">
            <button
              onClick={goPrev}
              disabled={spread === 0}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-lg bg-white border border-[#eee] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:shadow-md disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              disabled={spread >= totalSpreads - 1}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-lg bg-white border border-[#eee] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:shadow-md disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>

            <div
              className="flex relative"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                filter:
                  "drop-shadow(0 20px 30px rgba(0,0,0,0.12)) drop-shadow(0 8px 12px rgba(0,0,0,0.08))",
              }}
            >
              <LeftPage />
              <RightPage />
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(0,0,0,0.15) 50%, transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="shrink-0 bg-[#f4f4f4]">
          <div
            ref={trackRef}
            onMouseDown={(e) => handleScrub(e.clientX)}
            className="h-1.5 bg-[#d8d8d8] relative cursor-pointer w-full"
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#231F20]"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#231F20]"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </div>

          <div className="h-14 px-6 flex items-center justify-between">
            <div className="text-sm text-[#231F20] tabular-nums font-medium w-32">
              {leftPage}-{rightPage} / {totalPages}
            </div>

            <div className="flex items-center gap-3">
              <button className={iconBtn} aria-label="View">
                <Monitor size={17} />
              </button>
              <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-white border border-[#eee]">
                <button
                  onClick={() => setZoom((z) => Math.max(0, z - 0.1))}
                  aria-label="Zoom out"
                  className="text-[#231F20] hover:text-accent transition-colors"
                >
                  <ZoomOut size={16} />
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-24 accent-[#231F20]"
                />
                <button
                  onClick={() => setZoom((z) => Math.min(1, z + 0.1))}
                  aria-label="Zoom in"
                  className="text-[#231F20] hover:text-accent transition-colors"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <div className="h-10 px-3 rounded-lg bg-white border border-[#eee] flex items-center">
                <img src={ezflipLogo.url} alt="eZFlip" className="h-5" />
              </div>
              <button className={iconBtn} aria-label="Sound">
                <Volume2 size={17} />
              </button>
              <button className={iconBtn} aria-label="Fullscreen">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* eZ Chat side panel - pushes layout, not overlay */}
      {chatOpen && (
        <aside className="w-[35%] min-w-[360px] max-w-[520px] bg-white border-l border-[#eee] flex flex-col shrink-0">
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#eee]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Sparkles size={18} fill="currentColor" />
              </div>
              <div>
                <div className="font-semibold text-[15px] text-[#231F20] leading-tight">eZ Chat</div>
                <div className="text-[12px] text-text-light">{docName}</div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted text-text-mid transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-sm text-text-light text-center mt-8">
                Ask anything about this document.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex"}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    m.from === "user"
                      ? "bg-accent text-white rounded-tr-sm"
                      : "bg-muted text-[#231F20] rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-4 flex items-center gap-2 border-t border-[#eee]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this document"
              className="flex-1 h-11 px-4 rounded-full bg-[#f5f5f5] text-sm focus:outline-none placeholder:text-text-light"
            />
            <button
              type="submit"
              className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_4px_14px_rgba(240,90,40,0.4)] hover:opacity-95 transition-opacity"
              aria-label="Send"
            >
              <Send size={17} />
            </button>
          </form>
        </aside>
      )}

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} title={docName} url={shareUrl} />
    </div>
  );
};

export default FlipbookViewer;
