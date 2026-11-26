import { ArrowRight, Check, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";

/* ---------- section anchors listed in the hero ---------- */

const sections = [
  { id: "flipbooks", label: "Interactive Flipbooks" },
  { id: "ai-chat", label: "AI Chat & Summaries" },
  { id: "shelves", label: "Shelves" },
  { id: "analytics", label: "Analytics" },
  { id: "share", label: "Sharing" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

/* ---------- mock visuals ---------- */

const FlipbookMock = () => (
  <div className="relative rounded-2xl border border-border bg-off-white p-6 md:p-8">
    <div className="relative h-52 md:h-60">
      <div className="absolute inset-x-2 top-2 bottom-2 flex overflow-hidden rounded-lg border border-border bg-background shadow-[0_24px_50px_-24px_hsl(var(--ink)/0.45)]">
        <div className="flex-1 space-y-2 p-4">
          <div className="h-2 w-2/3 rounded-full bg-text-dark/20" />
          <div className="h-1.5 w-full rounded-full bg-text-dark/8" />
          <div className="h-1.5 w-11/12 rounded-full bg-text-dark/8" />
          <div className="h-1.5 w-4/5 rounded-full bg-text-dark/8" />
          <div className="mt-3 h-16 w-full rounded bg-red-bg" />
          <div className="h-1.5 w-3/5 rounded-full bg-text-dark/8" />
        </div>
        <div className="w-[4px] bg-gradient-to-r from-transparent via-border-strong/70 to-transparent" />
        <div className="flex-1 space-y-2 p-4">
          <div className="h-2 w-1/2 rounded-full bg-text-dark/20" />
          <div className="h-1.5 w-full rounded-full bg-text-dark/8" />
          <div className="h-1.5 w-10/12 rounded-full bg-text-dark/8" />
          <div className="h-1.5 w-3/4 rounded-full bg-text-dark/8" />
          <div className="mt-3 h-16 w-full rounded bg-muted" />
          <div className="h-1.5 w-1/2 rounded-full bg-text-dark/8" />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 top-2 w-1/3 origin-right -rotate-3 rounded-lg border border-border bg-background shadow-[0_18px_34px_-18px_hsl(var(--ink)/0.5)]" />
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {["PDF", "Word", "Swipeable", "Mobile-ready"].map((t) => (
        <span key={t} className="rounded-full bg-background border border-border px-3 py-1 text-[11px] font-semibold text-text-mid">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const ChatMock = () => (
  <div className="rounded-2xl border border-border bg-off-white p-6 md:p-8">
    <div className="space-y-3">
      <div className="flex justify-start">
        <div className="rounded-xl rounded-tl-sm bg-background border border-border px-4 py-2.5 text-[13px] font-medium text-text-mid">
          What is the Q3 revenue?
        </div>
      </div>
      <div className="flex justify-end">
        <div className="inline-flex items-start gap-2 rounded-xl rounded-tr-sm bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground max-w-[85%]">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="currentColor">
            <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
          </svg>
          <span>
            $4.2M, up 18% QoQ — driven by the Enterprise segment.
            <span className="mt-1 block text-[11px] font-semibold opacity-80">Source: page 14</span>
          </span>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="inline-flex items-center gap-1.5 rounded-xl rounded-tl-sm bg-background border border-border px-4 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-text-light animate-typing" />
          <span className="h-1.5 w-1.5 rounded-full bg-text-light animate-typing [animation-delay:0.2s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-text-light animate-typing [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
    <div className="mt-5 border-t border-border pt-4">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-light mb-2">Try asking</div>
      <div className="flex flex-wrap gap-2">
        {["Summarize this document", "What changed vs. last quarter?", "List the open risks"].map((s) => (
          <span key={s} className="rounded-full bg-background border border-primary/15 px-3 py-1 text-[11px] font-semibold text-primary">
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ShelvesMock = () => (
  <div className="rounded-2xl border border-border bg-off-white p-6 md:p-8">
    <div className="space-y-3">
      {[
        ["Onboarding", "bg-primary", "8 flipbooks"],
        ["Marketing Library", "bg-accent", "14 flipbooks"],
        ["Board Reports", "bg-text-light/40", "6 flipbooks"],
      ].map(([name, bg, count]) => (
        <div key={name} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
          <div className={`h-9 w-9 shrink-0 rounded-lg ${bg}`} />
          <div className="min-w-0 flex-1">
            <div className="truncate font-heading text-[13px] font-bold text-text-dark">{name}</div>
            <div className="text-[11px] text-text-mid font-light">{count}</div>
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-text-mid">Public</span>
        </div>
      ))}
    </div>
    <div className="mt-4 flex items-center gap-2 rounded-xl border border-accent/40 bg-background px-3 py-2.5">
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7" strokeLinecap="round" />
        <path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" strokeLinecap="round" />
      </svg>
      <span className="min-w-0 truncate text-[12px] font-medium text-text-mid">ezflip.ai/s/onboarding-kit</span>
      <span className="ml-auto shrink-0 text-[11px] font-bold text-accent">Copy</span>
    </div>
  </div>
);

const AnalyticsMock = () => (
  <div className="rounded-2xl border border-border bg-off-white p-6 md:p-8">
    <div className="grid grid-cols-3 gap-3">
      {[
        ["Total read time", "48m 12s"],
        ["Avg. pages", "11.4"],
        ["Completion", "62%"],
      ].map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border bg-background p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-text-light">{k}</div>
          <div className="font-heading text-base md:text-lg font-bold text-text-dark mt-1">{v}</div>
        </div>
      ))}
    </div>
    <div className="mt-4 rounded-xl border border-border bg-background p-4">
      <div className="flex items-end gap-2 h-24">
        {[38, 62, 48, 88, 70, 54, 40].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%` }}>
            <div className={`h-full w-full rounded-t ${i === 3 ? "bg-accent" : "bg-primary/30"}`} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-text-mid font-light">
        <span>Traffic sources</span>
        <span className="font-semibold text-text-dark">Direct 61% · Shelves 39%</span>
      </div>
    </div>
  </div>
);

const ShareMock = () => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-xl">
    <div className="flex items-center justify-between">
      <p className="text-base font-bold text-foreground">Share Your Flipbook</p>
      <span className="text-muted-foreground">×</span>
    </div>
    <p className="mt-1 text-xs text-muted-foreground">Q3 Product Catalog · Shelf: Sales Kit</p>
    <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-muted p-1 text-xs font-semibold">
      <span className="rounded-full py-1.5 text-center text-muted-foreground">Public</span>
      <span className="rounded-full bg-card py-1.5 text-center text-foreground shadow-sm">Private</span>
    </div>
    <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent/60 p-1.5 pl-3">
      <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">ezflip.ai/f/q3-catalog</span>
      <span className="inline-flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
        <Check className="h-3 w-3" /> Copy Link
      </span>
    </div>
    <p className="mt-4 text-xs font-semibold text-foreground">Invite by email</p>
    <div className="mt-2 flex flex-wrap gap-1.5 rounded-lg border border-border p-2">
      {["sara@acme.com", "dev.team@acme.com", "li@studio.io"].map((e) => (
        <span key={e} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">{e} ×</span>
      ))}
      <span className="px-1 py-1 text-[11px] text-muted-foreground">Add email…</span>
    </div>
    <div className="mt-4 flex justify-end gap-2 text-xs font-semibold">
      <span className="rounded-lg border border-border px-3 py-2 text-foreground">Cancel</span>
      <span className="rounded-lg bg-accent px-3 py-2 text-accent-foreground shadow-sm">Send Invites</span>
    </div>
  </div>
);

type Feature = {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  bullets: string[];
  cta: { text: string; href: string };
  secondary?: { text: string; href: string };
  visual: React.ReactNode;
  reverse?: boolean;
};

const features: Feature[] = [
  {
    id: "flipbooks",
    kicker: "Interactive Flipbooks",
    title: "From Static PDFs to Effortless Digital Reading.",
    copy:
      "Traditional PDFs force readers to pinch, zoom, and endlessly scroll. EzFlip converts your PDFs and Word documents into fast, responsive flipbooks that feel natural on desktop, tablet, and mobile.",
    bullets: [
      "Instant Conversion: Drag and drop on desktop or tap to upload on mobile/tablet — ready in seconds.",
      "Built for Every Screen: Smooth page turns, thumbnail navigation, zoom controls, and fullscreen reading.",
      "Frictionless Distribution: Share via clean public links or embed flipbooks directly on your website.",
    ],
    cta: { text: "Create Your First Flipbook", href: "/signup" },
    secondary: { text: "See How We Compare", href: "/compare" },
    visual: <FlipbookMock />,
  },
  {
    id: "ai-chat",
    kicker: "Built-In AI Chat & 1-Click Summaries",
    title: "Answers in Seconds. Zero Endless Scrolling.",
    copy:
      "Dense handbooks, reports, and manuals shouldn't slow readers down. EzFlip's built-in AI assistant lets anyone ask questions in plain language and get accurate, source-grounded answers right beside the page.",
    bullets: [
      "Conversational Q&A (EzBot): Readers ask questions and jump directly to the relevant insights without scanning 50+ pages.",
      "1-Click AI Summaries: Generate concise executive summaries in one click for fast comprehension.",
      "Context-Accurate Responses: Responses are grounded strictly in your uploaded document so answers stay accurate.",
    ],
    cta: { text: "Explore AI Chat", href: "/features/ai-chat" },
    secondary: { text: "Talk To Us", href: "/contact" },
    visual: <ChatMock />,
    reverse: true,
  },
  {
    id: "shelves",
    kicker: "Curated Shelves",
    title: "One Link for Every Collection. Zero File Chaos.",
    copy:
      "Stop sending five separate PDF links in an email. With EzFlip Shelves, you can bundle related flipbooks—like onboarding handbooks, quarterly catalogs, or course modules—into a clean, interactive shelf.",
    bullets: [
      "Curated Organization: Drag and drop flipbooks into the exact reading order you want.",
      "Flexible Access Control: Publish publicly for open access or restrict to Private with email-based invites.",
      "Custom Presentation: Choose Light, Dark, Minimal, or Modern themes to match your brand.",
      "Always Up-to-Date: Update flipbooks inside a shelf anytime without changing the shared URL.",
    ],
    cta: { text: "Build A Shelf", href: "/signup" },
    secondary: { text: "Explore Use Cases", href: "/use-cases/marketing-teams" },
    visual: <ShelvesMock />,
  },
  {
    id: "analytics",
    kicker: "Flipbook & Shelf Analytics",
    title: "Know What Gets Read — Not Just What Gets Clicked.",
    copy:
      "Every flipbook and shelf includes built-in engagement analytics so you can measure content performance, spot drop-off points, and prove ROI.",
    bullets: [
      "Actionable Engagement KPIs: Monitor Views, Unique Readers, Total Reading Time, Avg. Pages Read, and Completion Rate.",
      "Source Attribution: Compare Direct Link visits against From Shelves discovery to see where readers come from.",
      "Audience & Time-Series Insights: Filter by custom date ranges and inspect country, device, and browser breakdowns.",
      "One-Click CSV Export: Download clean CSV reports for leadership reviews or client reporting.",
    ],
    cta: { text: "See Analytics In Action", href: "/signup" },
    secondary: { text: "Ask About Your Numbers", href: "/contact" },
    visual: <AnalyticsMock />,
    reverse: true,
  },
  {
    id: "share",
    kicker: "Sharing & Access Control",
    title: "One Click to Share. Full Control Over Who Reads.",
    copy:
      "Whether you are sending a single flipbook or an entire curated shelf, EzFlip makes distribution effortless. Copy a direct link for instant public sharing, or switch to Private access and invite specific people by email.",
    bullets: [
      "Direct Link Sharing: Copy a clean, short URL for any flipbook or shelf — no heavy email attachments or file downloads required.",
      "Email Invites: Invite team members, students, or clients directly by email right from the Share dialog.",
      "Public & Private Access: Keep marketing brochures open to everyone (Public) or lock sensitive handbooks and proposals to invited readers only (Private).",
      "Works Across Flipbooks & Shelves: Use the same consistent sharing experience whether you're sharing one document or a full collection.",
    ],
    cta: { text: "Start Sharing", href: "/signup" },
    secondary: { text: "Talk To Us", href: "/contact" },
    visual: <ShareMock />,
  },
];

const FeaturesPage = () => {
  return (
    <MarketingLayout>
      {/* Hero — light with warm gradients */}
      <section className="bg-background px-5 md:px-12 pt-20 md:pt-28 pb-20 md:pb-24 relative overflow-hidden">
        {/* Single warm gradient blob */}
        <div aria-hidden="true" className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.10)_0%,hsl(var(--accent)/0.06)_40%,transparent_70%)] pointer-events-none blur-[40px]" />

        {/* Subtle grid pattern */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--ink) / 0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 100%)',
        }} />

        <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — Text content */}
          <div className="flex flex-col items-start text-left">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-text-mid mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-text-light">/</span>
              <span className="text-primary font-semibold">Features</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-background border border-primary/30 rounded-full px-5 py-2 text-[11px] font-bold text-primary tracking-[1.5px] uppercase mb-7">
              <span aria-hidden="true" className="w-[5px] h-[5px] bg-primary rounded-full animate-pulse-dot" />
              Features
            </div>

            <h1 className="font-heading text-4xl md:text-[52px] leading-[1.05] tracking-tighter text-text-dark mb-6 font-semibold">
              Ask questions.<br />
              Get answers.<br />
              <span className="text-primary">No scrolling, no guessing.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-[520px] mb-10">
              Chat with your documents using built-in AI and get precise answers instantly, without reading through everything.
            </p>

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                <Link
                  to="/signup"
                  className="font-heading text-[15px] font-semibold text-primary-foreground no-underline px-9 py-3.5 bg-primary rounded-xl inline-flex items-center justify-center gap-2 shadow-[0_8px_32px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_hsl(var(--primary)/0.4)] transition-all"
                >
                  Try It On Your Document
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Check size={14} className="text-primary" aria-hidden="true" />
                  Free to use
                </span>
              </div>
            </div>
          </div>

          {/* Right — Chat Demo Window */}
          <div className="w-full">
          <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
            <div className="bg-warm-gray p-3.5 px-5 flex items-center gap-3 border-b border-border">
              <div aria-hidden="true" className="flex gap-[7px]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center text-xs text-text-mid font-medium">
                <strong className="text-text-dark">Employee Onboarding Handbook.pdf</strong> · AI Chat enabled
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] min-h-[420px]">
              <div aria-hidden="true" className="hidden lg:block p-7 border-r border-border relative overflow-hidden">
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-text-mid mb-4">Section 4 · Leave Policy</div>
                <div className="space-y-2.5">
                  <div className="h-[11px] w-4/5 bg-warm-gray rounded" />
                  <div className="h-[7px] w-full bg-warm-gray rounded" />
                  <div className="h-[7px] w-[90%] bg-warm-gray rounded" />
                  <div className="h-[7px] w-[65%] bg-warm-gray rounded" />
                  <div className="h-5" />
                  <div className="text-[10px] font-semibold text-primary tracking-wide">↑ Relevant passage found</div>
                  <div className="h-[7px] w-full bg-primary/20 border border-primary/30 rounded relative overflow-hidden animate-shimmer" />
                  <div className="h-[7px] w-4/5 bg-primary/20 border border-primary/30 rounded relative overflow-hidden animate-shimmer" />
                  <div className="h-[7px] w-[55%] bg-primary/20 border border-primary/30 rounded relative overflow-hidden animate-shimmer" />
                  <div className="h-5" />
                  <div className="h-[7px] w-[90%] bg-warm-gray rounded" />
                  <div className="h-[7px] w-4/5 bg-warm-gray rounded" />
                  <div className="h-[7px] w-[65%] bg-warm-gray rounded" />
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3.5">
                <div className="text-[11px] font-bold tracking-[1px] uppercase text-text-mid pb-3.5 border-b border-border flex items-center gap-2">
                  <span aria-hidden="true" className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-dot" />
                  EzBot · AI Chat
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="self-end bg-primary/10 border border-primary/15 rounded-xl rounded-br-sm px-3.5 py-2.5 text-xs leading-relaxed text-text-dark max-w-[85%]">
                    What's the leave policy for the first 3 months?
                  </div>
                  <div className="self-start flex gap-2 items-start max-w-[95%]">
                    <div aria-hidden="true" className="w-6 h-6 bg-primary rounded-[7px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                    </div>
                    <div className="bg-off-white border border-border rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl px-3.5 py-2.5 text-xs leading-relaxed text-text-mid">
                      During the first 3 months, employees are eligible for <strong className="text-text-dark font-semibold">6 days of sick leave</strong>. Casual leave accrues from month 2 onwards at <strong className="text-text-dark font-semibold">1 day per month</strong>.
                      <div className="inline-flex items-center gap-1 bg-primary/15 border border-primary/30 rounded px-2 py-0.5 text-[10px] text-primary font-semibold mt-2 shadow-[0_0_0_3px_hsl(var(--primary)/0.08)] animate-pulse-dot">
                        <FileText size={10} aria-hidden="true" />
                        Section 4 · Page 12
                      </div>
                    </div>
                  </div>
                  <div className="self-end bg-primary/10 border border-primary/15 rounded-xl rounded-br-sm px-3.5 py-2.5 text-xs leading-relaxed text-text-dark max-w-[85%]">
                    When does the probation period end?
                  </div>
                  <div className="self-start flex gap-2 items-start max-w-[95%]">
                    <div aria-hidden="true" className="w-6 h-6 bg-primary rounded-[7px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                    </div>
                    <div className="bg-off-white border border-border rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl px-3.5 py-2.5 text-xs leading-relaxed text-text-mid">
                      The standard probation period is <strong className="text-text-dark font-semibold">90 days</strong> from your date of joining, unless extended in writing by your manager.
                      <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/15 rounded px-2 py-0.5 text-[10px] text-primary font-semibold mt-2">
                        <FileText size={10} aria-hidden="true" />
                        Section 2 · Page 6
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center pt-2.5 border-t border-border">
                  <div className="flex-1 bg-off-white border border-border rounded-lg px-3 py-2 text-[11px] text-text-mid">
                    Ask anything about this document…
                  </div>
                  <div aria-hidden="true" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary-foreground"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-background py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">The Problem</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold leading-[1.15] tracking-tight text-text-dark mb-6">
              Nobody reads documents.<br />They <span className="text-primary">search</span> them.
            </h2>
            <ul className="space-y-3.5">
              {[
                "Static PDFs force readers to pinch, zoom and scroll through pages they never needed.",
                "Files get scattered across emails and drives, with no single link to share.",
                "Once a file is sent, you have no idea whether anyone actually read it.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[16px] leading-[1.7] text-text-mid font-light">
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <div className="relative p-7 md:p-8 bg-off-white rounded-2xl border border-border shadow-[0_24px_56px_hsl(var(--ink)/0.08)]">
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-primary mb-5">Static PDF vs. eZFlip</div>
              {[
                ["Reading", "Pinch, zoom, scroll", "Swipeable flipbook on any screen"],
                ["Finding answers", "Ctrl+F through 50 pages", "Ask EzBot, get the page"],
                ["Sharing", "Five separate attachments", "One shelf, one link"],
                ["Insight", "No idea who read it", "Reading time, completion, sources"],
              ].map(([k, before, after], i) => (
                <div key={k} className={`grid grid-cols-[1fr_1fr] gap-4 py-3.5 ${i ? "border-t border-border" : ""}`}>
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-text-light mb-1">{k}</div>
                    <div className="text-sm text-text-mid font-light line-through decoration-text-light/60">{before}</div>
                  </div>
                  <div className="self-end text-sm font-semibold text-primary">{after}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature sections */}
      {features.map((f, i) => (
        <section
          key={f.id}
          id={f.id}
          className={`scroll-mt-20 py-16 md:py-24 px-5 md:px-12 ${i % 2 === 0 ? "bg-off-white" : "bg-background"}`}
        >
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className={`reveal ${f.reverse ? "lg:order-2" : ""}`}>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70 mb-3">
                {f.kicker}
              </div>
              <h2 className="font-heading text-3xl md:text-[36px] font-extrabold tracking-tight leading-[1.15] text-text-dark mb-4">
                {f.title}
              </h2>
              <p className="text-[15px] leading-[1.8] text-text-mid font-light mb-6">{f.copy}</p>

              <ul className="space-y-3 mb-8">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-bg">
                      <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-[14px] leading-[1.6] text-text-mid font-light">
                      {b.includes(":") ? (
                        <>
                          <strong className="font-semibold text-text-dark">{b.split(":")[0]}:</strong>
                          {b.slice(b.indexOf(":") + 1)}
                        </>
                      ) : b}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-5">
                <Link
                  to={f.cta.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-bold text-accent-foreground no-underline shadow-[0_4px_16px_hsl(var(--accent)/0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(var(--accent)/0.35)] transition-all duration-300"
                >
                  {f.cta.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {f.secondary && (
                  <Link
                    to={f.secondary.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    {f.secondary.text}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className={`reveal ${f.reverse ? "lg:order-1" : ""}`}>{f.visual}</div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="bg-ink py-24 md:py-32 px-5 md:px-12 text-center relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,hsl(var(--accent)/0.15)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[680px] mx-auto relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] text-primary-foreground mb-5">
            Turn your next document<br /><span className="text-accent">into a smart experience.</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-primary-foreground/60 font-light mb-11">
            Upload a file, turn on AI answers, organize a shelf and watch the engagement roll in. No setup, no credit card.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/signup" className="font-heading text-base font-bold text-accent-foreground no-underline px-10 py-4 bg-accent rounded-xl inline-flex items-center justify-center gap-2.5 shadow-[0_4px_16px_hsl(var(--accent)/0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(var(--accent)/0.35)] transition-all duration-300">
                Get Started Free
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="/#contact" className="font-heading text-base font-bold text-primary-foreground no-underline px-10 py-4 border border-primary-foreground/25 rounded-xl inline-flex items-center justify-center gap-2.5 hover:border-primary-foreground/60 transition-all duration-300">
                Talk To Sales
              </a>
            </div>
            <span className="text-xs text-primary-foreground/50">No credit card · 2-minute setup · Works on any PDF</span>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
};

export default FeaturesPage;
