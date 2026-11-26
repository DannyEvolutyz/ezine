import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";

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
    title: "Turn Static Files Into Page-Turning Experiences",
    copy:
      "Upload any PDF or Word document and convert it in seconds into a responsive, swipeable flipbook with crisp typography and frictionless navigation.",
    bullets: [
      "Convert PDFs and Word files in seconds — no design or dev work",
      "Swipe, tap and keyboard navigation that works on every screen size",
      "Crisp typography with realistic page-turn motion",
      "Embed anywhere or share with one clean link",
    ],
    cta: { text: "Create Your First Flipbook", href: "/signup" },
    secondary: { text: "See How We Compare", href: "/compare" },
    visual: <FlipbookMock />,
  },
  {
    id: "ai-chat",
    kicker: "AI Chat & Summaries",
    title: "Let Readers Chat With Every Document",
    copy:
      "Built-in EzBot AI answers natural-language questions straight from your content and generates 1-click summaries so readers find answers without scrolling.",
    bullets: [
      "Natural-language Q&A grounded in your own document",
      "1-click summaries that surface the highlights instantly",
      "Every answer cites the page it came from",
      "Suggested questions readers can tap to get started",
    ],
    cta: { text: "Explore AI Chat", href: "/features/ai-chat" },
    secondary: { text: "Talk To Us", href: "/contact" },
    visual: <ChatMock />,
    reverse: true,
  },
  {
    id: "shelves",
    kicker: "Shelves",
    title: "Organize & Share Collections in One Link",
    copy:
      "Group related flipbooks into curated, branded shelves. Control public or private access, invite readers by email, and share an entire library with one URL.",
    bullets: [
      "Curate branded shelves for teams, campaigns or courses",
      "Public or private access, controlled per shelf",
      "Invite readers by email in a single click",
      "Share a whole library with one shareable URL",
    ],
    cta: { text: "Build A Shelf", href: "/signup" },
    secondary: { text: "Explore Use Cases", href: "/use-cases/marketing-teams" },
    visual: <ShelvesMock />,
  },
  {
    id: "analytics",
    kicker: "Analytics",
    title: "See How Readers Actually Engage",
    copy:
      "Go beyond view counts. Track total reading time, average pages read, completion rates, traffic sources (Direct vs. Shelves), and export reports to CSV.",
    bullets: [
      "Total reading time and average pages read per document",
      "Completion rates and drop-off by page",
      "Traffic sources split between Direct links and Shelves",
      "Export every report to CSV for your own tooling",
    ],
    cta: { text: "See Analytics In Action", href: "/signup" },
    secondary: { text: "Ask About Your Numbers", href: "/contact" },
    visual: <AnalyticsMock />,
    reverse: true,
  },
  {
    id: "api-keys",
    kicker: "API Keys",
    title: "Automate & Integrate Into Your Stack",
    copy:
      "Generate domain-restricted API keys in seconds to connect EzFlip with your internal portals, LMS, HR tools, or automated publishing workflows.",
    bullets: [
      "Create domain-restricted keys in seconds",
      "Publish and update flipbooks straight from your own systems",
      "Connect portals, LMS platforms and HR tools",
      "Revoke or rotate a key the moment you need to",
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

      {/* Feature sections */}
      {features.map((f, i) => (
        <section
          key={f.id}
          id={f.id}
          className={`scroll-mt-20 py-16 md:py-24 px-5 md:px-12 ${i % 2 === 0 ? "bg-background" : "bg-off-white"}`}
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
                    <span className="text-[14px] leading-[1.6] text-text-dark font-light">{b}</span>
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

      <CtaSection
        eyebrow="Get started"
        title={<>Put every feature to work on <span className="text-accent">your own documents</span>.</>}
        body="Upload a file, turn on AI answers, organize a shelf and watch the engagement roll in — all in one place."
        buttonText="Get Started Free"
        buttonHref="/signup"
      />
    </MarketingLayout>
  );
};

export default FeaturesPage;
