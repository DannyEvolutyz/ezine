import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import flipbookShot from "@/assets/feature-flipbook-viewer.jpg.asset.json";
import shelvesShot from "@/assets/feature-shelves.jpg.asset.json";
import shareShot from "@/assets/feature-share.png.asset.json";

/* ---------- screenshot visuals (bento tiles) ---------- */

const ShotVisual = ({
  src,
  alt,
  canvas,
  height,
  fit = "object-contain",
}: {
  fit?: string;
  src: string;
  alt: string;
  canvas: string;
  height: string;
}) => (
  <div
    className={`overflow-hidden rounded-xl border border-border ${height}`}
    style={{ backgroundColor: canvas }}
  >
    <img src={src} alt={alt} className={`h-full w-full ${fit} object-center`} loading="lazy" />
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

const AnalyticsVisual = () => (
  <div className="flex h-52 w-full items-end rounded-xl border border-border bg-background p-3">
    <div className="flex w-full items-end gap-1.5">
      {[38, 62, 48, 88, 70, 54].map((h, i) => (
        <div
          key={i}
          className={`w-3 rounded-t ${i === 3 ? "bg-accent" : "bg-primary/30"}`}
          style={{ height: `${h * 1.9}px` }}
        />
      ))}
      <div className="ml-auto text-right">
        <div className="text-[10px] font-semibold text-text-mid">Avg. read</div>
        <div className="font-heading text-sm font-bold text-text-dark">3m 41s</div>
      </div>
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
  visualWrap?: string;
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
    visual: (
      <ShotVisual
        src={flipbookShot.url}
        alt="eZFlip reader showing a two-page spread with a chart and page controls"
        canvas="#f8f6f7"
        height="h-52"
      />
    ),
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
    visualWrap: "flex-1 flex items-center",
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
    visual: (
      <ShotVisual
        src={shelvesShot.url}
        alt="Shelf holding four colour-coded flipbooks"
        canvas="#f6f6f8"
        height="h-52"
      />
    ),
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
    id: "sharing",
    kicker: "Sharing",
    title: "Share Flipbooks & Shelves With Control",
    copy:
      "Share any flipbook or shelf via a clean direct link, send private email invites, and switch between Public or Private access in one click.",
    cta: "Explore Sharing",
    href: "/features#share",
    span: "lg:col-span-2",
    visual: (
      <ShotVisual
        fit="object-cover"
        src={shareShot.url}
        alt="Share dialog with a copyable link, social icons and email invite field"
        canvas="#f7f5f2"
        height="h-52"
      />
    ),
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

              <div className={f.visualWrap ?? "mt-auto"}>{f.visual}</div>

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
