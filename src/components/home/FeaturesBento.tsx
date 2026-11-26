import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- mini visuals (bento tiles) ---------- */

const FlipbookVisual = () => (
  <div className="relative h-28">
    <div className="absolute inset-x-3 top-1 bottom-1 flex overflow-hidden rounded-lg border border-border bg-background shadow-[0_12px_26px_-16px_hsl(var(--ink)/0.4)]">
      <div className="flex-1 space-y-1.5 p-2.5">
        <div className="h-1.5 w-3/4 rounded-full bg-text-dark/15" />
        <div className="h-1.5 w-full rounded-full bg-text-dark/8" />
        <div className="h-1.5 w-5/6 rounded-full bg-text-dark/8" />
        <div className="h-1.5 w-2/3 rounded-full bg-text-dark/8" />
        <div className="mt-2 h-6 w-full rounded bg-red-bg" />
      </div>
      <div className="w-[3px] bg-gradient-to-r from-transparent via-border-strong/70 to-transparent" />
      <div className="flex-1 space-y-1.5 p-2.5">
        <div className="h-1.5 w-2/3 rounded-full bg-text-dark/15" />
        <div className="h-1.5 w-full rounded-full bg-text-dark/8" />
        <div className="h-1.5 w-4/5 rounded-full bg-text-dark/8" />
        <div className="h-1.5 w-1/2 rounded-full bg-text-dark/8" />
        <div className="mt-2 h-6 w-full rounded bg-muted" />
      </div>
    </div>
    {/* turning page */}
    <div className="absolute bottom-1 right-3 top-1 w-1/3 origin-right -rotate-3 rounded-lg border border-border bg-background shadow-[0_10px_20px_-12px_hsl(var(--ink)/0.45)]" />
  </div>
);

const ChatVisual = () => (
  <div className="space-y-2">
    <div className="flex justify-start">
      <div className="rounded-xl rounded-tl-sm bg-muted px-3 py-1.5 text-[11px] font-medium text-text-mid">
        What is the Q3 revenue?
      </div>
    </div>
    <div className="flex justify-end">
      <div className="inline-flex items-center gap-1.5 rounded-xl rounded-tr-sm bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
        </svg>
        $4.2M, up 18% QoQ
      </div>
    </div>
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1 rounded-xl rounded-tl-sm bg-muted px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-text-light animate-typing" />
        <span className="h-1.5 w-1.5 rounded-full bg-text-light animate-typing [animation-delay:0.2s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-text-light animate-typing [animation-delay:0.4s]" />
      </div>
    </div>
  </div>
);

const ShelvesVisual = () => (
  <div className="space-y-2">
    {[
      ["bg-primary", "bg-accent", "bg-text-light/30", "bg-primary/35"],
      ["bg-accent", "bg-text-light/30", "bg-primary", "bg-accent/40"],
      ["bg-text-light/30", "bg-primary/35", "bg-accent", "bg-primary"],
    ].map((row, i) => (
      <div key={i} className="flex items-end gap-1 border-b-2 border-border-strong/50 pb-1">
        {row.map((bg, j) => (
          <div
            key={j}
            className={`h-6 rounded-sm ${bg}`}
            style={{ width: [18, 10, 14, 8][j] }}
          />
        ))}
      </div>
    ))}
  </div>
);

const AnalyticsVisual = () => (
  <div className="rounded-xl border border-border bg-background p-3">
    <div className="flex items-end gap-1.5">
      {[38, 62, 48, 88, 70, 54].map((h, i) => (
        <div
          key={i}
          className={`w-3 rounded-t ${i === 3 ? "bg-accent" : "bg-primary/30"}`}
          style={{ height: `${h * 0.4}px` }}
        />
      ))}
      <div className="ml-auto text-right">
        <div className="text-[10px] font-semibold text-text-mid">Avg. read</div>
        <div className="font-heading text-sm font-bold text-text-dark">3m 41s</div>
      </div>
    </div>
  </div>
);

const ApiVisual = () => (
  <div className="rounded-xl border border-border bg-background p-3">
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] font-semibold tracking-wider text-text-dark">ezf_live_9f3a••••</span>
      <span className="rounded-full bg-green-bg px-2 py-0.5 text-[10px] font-semibold text-green-status">Active</span>
    </div>
    <div className="mt-2 flex flex-wrap gap-1.5">
      <span className="rounded-full bg-red-bg px-2 py-0.5 text-[10px] font-semibold text-primary">portal.ezflip.ai</span>
      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-text-mid">LMS</span>
      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-text-mid">HR Tools</span>
    </div>
  </div>
);

/* ---------- section ---------- */

type Feature = {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
  span: string;
  large?: boolean;
  visual: React.ReactNode;
};

const features: Feature[] = [
  {
    id: "flipbooks",
    kicker: "Interactive Flipbooks",
    title: "Turn Static Files Into Page-Turning Experiences",
    copy:
      "Upload any PDF or Word document and convert it in seconds into a responsive, swipeable flipbook with crisp typography and frictionless navigation.",
    cta: "Explore Interactive Flipbooks",
    href: "/features#flipbooks",
    span: "lg:col-span-3",
    large: true,
    visual: <FlipbookVisual />,
  },
  {
    id: "ai-chat",
    kicker: "AI Chat & Summaries",
    title: "Let Readers Chat With Every Document",
    copy:
      "Built-in EzBot AI answers natural-language questions straight from your content and generates 1-click summaries so readers find answers without scrolling.",
    cta: "Explore AI Chat",
    href: "/features#ai-chat",
    span: "lg:col-span-3",
    large: true,
    visual: <ChatVisual />,
  },
  {
    id: "shelves",
    kicker: "Shelves",
    title: "Organize & Share Collections in One Link",
    copy:
      "Group related flipbooks into curated, branded shelves. Control public or private access, invite readers by email, and share an entire library with one URL.",
    cta: "Explore Shelves",
    href: "/features#shelves",
    span: "lg:col-span-2",
    visual: <ShelvesVisual />,
  },
  {
    id: "analytics",
    kicker: "Analytics",
    title: "See How Readers Actually Engage",
    copy:
      "Go beyond view counts. Track total reading time, average pages read, completion rates, traffic sources (Direct vs. Shelves), and export reports to CSV.",
    cta: "Explore Analytics",
    href: "/features#analytics",
    span: "lg:col-span-2",
    visual: <AnalyticsVisual />,
  },
  {
    id: "api-keys",
    kicker: "API Keys",
    title: "Automate & Integrate Into Your Stack",
    copy:
      "Generate domain-restricted API keys in seconds to connect EzFlip with your internal portals, LMS, HR tools, or automated publishing workflows.",
    cta: "Explore API Keys",
    href: "/features#api-keys",
    span: "lg:col-span-2",
    visual: <ApiVisual />,
  },
];

const FeaturesBento = () => {
  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      {/* soft brand glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[380px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.06)_0%,transparent_70%)] pointer-events-none" />
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--ink) / 0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* center-aligned header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-bg border border-primary/10 mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Features</span>
          </div>
          <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.12] text-text-dark max-w-[820px] mx-auto">
            Everything You Need to Turn Static Files Into <span className="text-primary">Smart Experiences</span>.
          </h2>
          <p className="text-sm md:text-base text-text-mid font-light mt-3.5 max-w-[640px] mx-auto leading-[1.7]">
            Convert documents into interactive flipbooks, answer reader questions with AI, organize collections on
            Shelves, measure engagement, and automate via API.
          </p>
        </div>

        {/* bento grid: 2 wide cards on top, 3 below */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          {features.map((f) => (
            <div
              key={f.id}
              className={`group flex flex-col rounded-2xl border border-border bg-card ${
                f.large ? "p-6 md:p-8" : "p-6"
              } transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/25 ${f.span} reveal`}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary/70 mb-2.5">
                {f.kicker}
              </div>
              <h3
                className={`font-heading font-bold tracking-tight leading-[1.25] text-text-dark mb-2.5 ${
                  f.large ? "text-xl md:text-[22px]" : "text-lg"
                }`}
              >
                {f.title}
              </h3>
              <p className="text-[13px] md:text-sm leading-[1.7] text-text-mid font-light mb-5">{f.copy}</p>

              <div className="mt-auto">{f.visual}</div>

              <Link
                to={f.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-300"
              >
                {f.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBento;
