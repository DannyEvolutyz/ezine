import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  MoreVertical,
} from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import ezflipLogo from "@/assets/ezflip-logo.png.asset.json";
import ShareDialog from "@/components/ShareDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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

// Mobile single-page content (uses the same body text but at a mobile size)
const MobilePage = ({ pageNum }: { pageNum: number }) => (
  <div className="w-full h-full bg-white overflow-hidden px-6 py-6 text-[#231F20]">
    <div className="text-[13px] mb-4">
      <span className="font-medium">{String(pageNum).padStart(2, "0")}</span>
      <span className="mx-2 text-text-light">·</span>
      <span>What is eZine?</span>
    </div>
    <div className="space-y-3 text-[13px] leading-relaxed">
      <p className="font-medium">● PLATFORM OVERVIEW</p>
      <p className="font-medium">Turn documents into experiences</p>
      <p>
        Most tools make documents look better. eZine makes them easier to use — readers ask,
        search, navigate, and actually finish what they open.
      </p>
      <p className="font-medium pt-1">What eZine does differently</p>
      <p className="font-medium">💬 Ask anything</p>
      <p>Readers ask questions. The AI answers directly from the document — no hallucinations, just your content.</p>
      <p className="font-medium">📓 Instant summaries</p>
      <p>One click. A clean TL;DR of any document or section, so readers get the gist before they commit.</p>
      <p className="font-medium">🔗 One-link sharing</p>
      <p>Share anywhere with a single link. Control who sees it, track exactly who reads it.</p>
      <p className="pt-2">Loved by 10K+ teams across 50+ countries</p>
      <p>eZine. by Evolutyz · Made with ♥ from Vizag</p>
    </div>
  </div>
);

const iconBtn =
  "w-10 h-10 rounded-lg bg-white border border-[#eee] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:shadow-md hover:border-[#ddd]";

const FlipbookViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDocument } = useDocuments();
  const isMobile = useIsMobile();
  const doc = id ? getDocument(id) : undefined;
  const docName = doc?.name ?? "eZine - Product Overview";
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

  // Mobile: single-page navigation + flip animation
  const [mobilePage, setMobilePage] = useState(1);
  const [flipDir, setFlipDir] = useState<"next" | "prev" | null>(null);

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
  const progress = isMobile
    ? totalPages <= 1
      ? 1
      : (mobilePage - 1) / (totalPages - 1)
    : totalSpreads <= 1
      ? 1
      : spread / (totalSpreads - 1);

  const goNext = useCallback(() => {
    if (isMobile) {
      setMobilePage((p) => {
        if (p >= totalPages) return p;
        setFlipDir("next");
        return p + 1;
      });
    } else {
      setSpread((s) => Math.min(totalSpreads - 1, s + 1));
    }
  }, [totalSpreads, isMobile, totalPages]);

  const goPrev = useCallback(() => {
    if (isMobile) {
      setMobilePage((p) => {
        if (p <= 1) return p;
        setFlipDir("prev");
        return p - 1;
      });
    } else {
      setSpread((s) => Math.max(0, s - 1));
    }
  }, [isMobile]);

  useEffect(() => {
    if (!flipDir) return;
    const t = setTimeout(() => setFlipDir(null), 500);
    return () => clearTimeout(t);
  }, [flipDir, mobilePage]);

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
    if (isMobile) {
      setMobilePage(Math.max(1, Math.round(ratio * (totalPages - 1)) + 1));
    } else {
      setSpread(Math.round(ratio * (totalSpreads - 1)));
    }
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

  // ============ MOBILE LAYOUT ============
  if (isMobile) {
    const squareBtn =
      "w-11 h-11 rounded-xl bg-white border border-[#e5e5e5] flex items-center justify-center active:scale-95 transition-transform";

    return (
      <div className="h-screen bg-[#f4f4f4] text-[#231F20] flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-4 py-3 flex items-center gap-3 shrink-0 bg-white border-b border-[#eee]">
          <button
            onClick={() => navigate("/dashboard")}
            aria-label="Back"
            className={squareBtn}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="flex-1 text-center text-[15px] font-medium truncate">{docName}</h1>
          <button
            onClick={() => setChatOpen(true)}
            aria-label="eZ Chat"
            className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_4px_14px_rgba(240,90,40,0.4)] active:scale-95 transition-transform"
          >
            <Sparkles size={20} fill="white" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="More" className={squareBtn}>
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={toggleBookmark}>
                <Bookmark size={16} className={`mr-2 ${bookmarked ? "text-accent" : ""}`} fill={bookmarked ? "#F05A28" : "none"} />
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShareOpen(true)}>
                <Share2 size={16} className="mr-2" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchOpen(true)}>
                <Search size={16} className="mr-2" /> Search
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => id && navigate(`/analytics/${id}`)}>
                <BarChart3 size={16} className="mr-2" /> Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {searchOpen && (
          <div className="px-4 py-2 bg-white border-b border-[#eee] flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-full bg-[#f5f5f5] border border-[#e5e5e5]">
              <Search size={16} className="text-text-mid" />
              <input
                ref={searchInputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search in document..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
                style={{ caretColor: "#F05A28" }}
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchValue("");
                }}
                aria-label="Close search"
              >
                <X size={16} className="text-text-mid" />
              </button>
            </div>
          </div>
        )}

        {/* Viewer stage */}
        <div className="flex-1 flex items-center justify-center relative min-h-0 px-4">
          <div
            className="relative w-full max-w-[360px] h-full max-h-[560px] my-4"
            style={{ perspective: "1400px" }}
          >
            <div
              key={mobilePage}
              className={`w-full h-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] origin-left ${
                flipDir === "next"
                  ? "animate-[flipNext_0.5s_ease-in-out]"
                  : flipDir === "prev"
                    ? "animate-[flipPrev_0.5s_ease-in-out]"
                    : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <MobilePage pageNum={mobilePage} />
            </div>
          </div>
        </div>

        {/* Nav buttons row */}
        <div className="px-4 pb-2 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={mobilePage <= 1}
            aria-label="Previous"
            className={`${squareBtn} disabled:opacity-40`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            disabled={mobilePage >= totalPages}
            aria-label="Next"
            className={`${squareBtn} disabled:opacity-40`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div
          ref={trackRef}
          onMouseDown={(e) => handleScrub(e.clientX)}
          onTouchStart={(e) => handleScrub(e.touches[0].clientX)}
          onTouchMove={(e) => handleScrub(e.touches[0].clientX)}
          className="h-1.5 bg-[#d8d8d8] relative cursor-pointer w-full"
        >
          <div
            className="absolute inset-y-0 left-0 bg-[#231F20]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Page indicator */}
        <div className="text-center py-2 text-sm font-medium tabular-nums">
          {mobilePage} / {totalPages}
        </div>

        {/* Bottom bar */}
        <div className="px-4 pb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button className={squareBtn} aria-label="View">
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0, z - 0.1))}
              className={squareBtn}
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(1, z + 0.1))}
              className={squareBtn}
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-11 px-3 rounded-xl bg-white border border-[#e5e5e5] flex items-center">
              <img src={ezflipLogo.url} alt="eZflip" className="h-5" />
            </div>
            <button className={squareBtn} aria-label="Sound">
              <Volume2 size={18} />
            </button>
            <button className={squareBtn} aria-label="Fullscreen">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* eZ Chat bottom sheet */}
        <Sheet open={chatOpen} onOpenChange={setChatOpen}>
          <SheetContent
            side="bottom"
            className="h-[75vh] p-0 rounded-t-2xl flex flex-col"
          >
            <div className="pt-2 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-[#d8d8d8]" />
            </div>
            <div className="px-5 py-4 flex items-center gap-3 border-b border-[#eee]">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Sparkles size={18} fill="currentColor" />
              </div>
              <div className="font-semibold text-[16px]">eZ Chat</div>
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
              className="p-3 flex items-center gap-2 border-t border-[#eee]"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this document"
                className="flex-1 h-12 px-4 rounded-lg bg-white border border-[#e5e5e5] text-sm focus:outline-none placeholder:text-text-light"
              />
              <button
                type="submit"
                className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </form>
          </SheetContent>
        </Sheet>

        <ShareDialog open={shareOpen} onOpenChange={setShareOpen} title={docName} url={shareUrl} />
      </div>
    );
  }

  // ============ DESKTOP LAYOUT (unchanged) ============
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
            <button
              onClick={() => id && navigate(`/analytics/${id}`)}
              className={iconBtn}
              aria-label="Analytics"
            >
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
