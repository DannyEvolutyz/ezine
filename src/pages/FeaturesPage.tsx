import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";

/* ---------- section anchors listed in the hero ---------- */

const sections = [
  { id: "flipbooks", label: "Interactive Flipbooks" },
  { id: "ai-chat", label: "AI Chat & Summaries" },
  { id: "shelves", label: "Shelves" },
  { id: "analytics", label: "Analytics" },
  { id: "api-keys", label: "API Keys" },
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

const ApiMock = () => (
  <div className="rounded-2xl border border-border bg-off-white p-6 md:p-8">
    <div className="rounded-xl bg-ink p-4 shadow-[0_18px_40px_-20px_hsl(var(--ink)/0.6)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-primary-foreground">API Key</span>
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">Active</span>
      </div>
      <div className="rounded-lg bg-ink-2 px-3 py-2.5 text-[12px] font-semibold tracking-wider text-primary-foreground">
        ezf_live_9f3a••••••••••••
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["portal.ezflip.ai", "lms.yourschool.edu", "hr.yourco.com"].map((d) => (
          <span key={d} className="rounded-full bg-primary-foreground/10 px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
            {d}
          </span>
        ))}
      </div>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {["Instant generation", "Domain-restricted", "Revoke anytime"].map((t) => (
        <span key={t} className="rounded-full bg-background border border-border px-3 py-1 text-[11px] font-semibold text-text-mid">
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* ---------- section shell ---------- */

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
    id: "api-keys",
    kicker: "Developer API Keys",
    title: "Secure, Domain-Restricted Integration for Your Team.",
    copy:
      "Ready to connect EzFlip to your own software? Generate scoped API keys right from your dashboard and lock them to your approved domains.",
    bullets: [
      "Self-Serve Key Management: Create, name, copy, and revoke API keys anytime with zero downtime.",
      "Domain Allow-Listing: Restrict each key to specific Allowed Domains so it only works where you authorize.",
      "Workflow Automation: Automate flipbook creation, shelf updates, and analytics syncs from your CMS, HRIS, or LMS.",
    ],
    cta: { text: "Get An API Key", href: "/signup" },
    secondary: { text: "Talk To Us", href: "/contact" },
    visual: <ApiMock />,
  },
];

const FeaturesPage = () => {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-off-white pt-20 md:pt-28 pb-16 md:pb-20 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[380px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-primary/10 mb-5 reveal">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Features</span>
          </div>
          <h1 className="font-heading text-4xl md:text-[52px] font-extrabold tracking-tight leading-[1.08] text-text-dark mb-5 reveal">
            Everything You Need to Turn Static Files Into{" "}
            <span className="text-primary">Smart Experiences</span>.
          </h1>
          <p className="text-base md:text-lg leading-[1.7] text-text-mid font-light max-w-[680px] mx-auto reveal">
            Convert documents into interactive flipbooks, answer reader questions with AI, organize
            collections on Shelves, measure engagement, and automate via API.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5 reveal">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className="rounded-full bg-background border border-border px-4 py-2 text-[13px] font-semibold text-text-mid hover:text-primary hover:border-primary/30 transition-colors"
              >
                {s.label}
              </button>
            ))}
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
