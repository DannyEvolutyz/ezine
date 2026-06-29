import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Card = { title: string; thumb: string };

const industries: { key: string; label: string; cards: Card[] }[] = [
  {
    key: "hr",
    label: "HR & People Ops",
    cards: [
      "Employee Handbook 2024",
      "Culture & Values Guide",
      "New Hire Playbook",
      "Benefits Overview",
      "Remote Work Policy",
      "Performance Review Kit",
      "DEI Annual Report",
      "Wellness Program Guide",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/hr-${i}/600/450` })),
  },
  {
    key: "marketing",
    label: "Marketing",
    cards: [
      "Q2 Campaign Brief",
      "Brand Guidelines",
      "Content Calendar",
      "Product Launch Kit",
      "Social Media Playbook",
      "Email Marketing Guide",
      "SEO Annual Report",
      "Customer Personas",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/mk-${i}/600/450` })),
  },
  {
    key: "education",
    label: "Education",
    cards: [
      "Course Catalog 2024",
      "Student Handbook",
      "Faculty Guide",
      "Curriculum Overview",
      "Research Highlights",
      "Campus Life Magazine",
      "Alumni Newsletter",
      "Online Learning Guide",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/ed-${i}/600/450` })),
  },
  {
    key: "realestate",
    label: "Real Estate",
    cards: [
      "Luxury Listings Spring",
      "Market Trends Report",
      "Buyer's Guide",
      "Seller's Playbook",
      "Investment Properties",
      "Neighborhood Spotlight",
      "Commercial Portfolio",
      "Mortgage Handbook",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/re-${i}/600/450` })),
  },
  {
    key: "finance",
    label: "Finance",
    cards: [
      "Annual Report 2024",
      "Investor Deck",
      "Wealth Management",
      "Tax Planning Guide",
      "Retirement Playbook",
      "ESG Report",
      "Quarterly Outlook",
      "Crypto Primer",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/fi-${i}/600/450` })),
  },
  {
    key: "healthcare",
    label: "Healthcare",
    cards: [
      "Patient Care Guide",
      "Clinical Research Brief",
      "Wellness Magazine",
      "Provider Directory",
      "Public Health Report",
      "Telehealth Handbook",
      "Pharma Pipeline",
      "Hospital Annual Review",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/hc-${i}/600/450` })),
  },
  {
    key: "retail",
    label: "Retail & eCommerce",
    cards: [
      "Holiday Lookbook",
      "Product Catalog SS25",
      "Loyalty Program",
      "Store Operations",
      "Trend Forecast",
      "Sustainability Report",
      "Vendor Guide",
      "Customer Insights",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/rt-${i}/600/450` })),
  },
  {
    key: "tech",
    label: "Technology",
    cards: [
      "Product Roadmap",
      "Developer Handbook",
      "Security Whitepaper",
      "AI Use Cases",
      "Case Study Library",
      "Release Notes Q2",
      "Customer Stories",
      "Platform Overview",
    ].map((title, i) => ({ title, thumb: `https://picsum.photos/seed/tc-${i}/600/450` })),
  },
];

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const FlipbookModal = ({ card, onClose }: { card: Card; onClose: () => void }) => {
  const total = 8;
  const [spread, setSpread] = useState(0);
  const totalSpreads = Math.ceil(total / 2);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setSpread((s) => Math.min(s + 1, totalSpreads - 1));
      if (e.key === "ArrowLeft") setSpread((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, totalSpreads]);

  const left = spread * 2 + 1;
  const right = Math.min(left + 1, total);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#0d1424] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <h3 className="font-heading text-white text-base sm:text-lg font-semibold truncate">
            {card.title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative flex items-center justify-center py-8 px-4 sm:px-12 bg-gradient-to-b from-[#0d1424] to-[#1a2238]">
          <button
            onClick={() => setSpread((s) => Math.max(s - 1, 0))}
            disabled={spread === 0}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex shadow-[0_30px_80px_rgba(0,0,0,0.6)] rounded-md">
            {[left, right].map((p, idx) => (
              <div
                key={p + "-" + idx}
                className="w-[260px] sm:w-[320px] h-[380px] sm:h-[460px] bg-[#fdfaf3] p-5 sm:p-7 flex flex-col"
              >
                {idx === 0 && (
                  <h4 className="font-heading text-base sm:text-lg font-bold text-text-dark mb-3">
                    {card.title} — Section {p}
                  </h4>
                )}
                <div className="flex-1 text-[12px] sm:text-[13px] leading-relaxed text-text-mid space-y-2 sm:space-y-3">
                  <p>{lorem}</p>
                  <div className="h-20 sm:h-28 bg-muted rounded flex items-center justify-center text-xs text-text-light">
                    [ figure {p} ]
                  </div>
                  <p>{lorem}</p>
                </div>
                <div className="text-center text-[11px] text-text-light mt-2">— {p} —</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSpread((s) => Math.min(s + 1, totalSpreads - 1))}
            disabled={spread >= totalSpreads - 1}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="px-5 py-3 border-t border-white/10 text-center text-xs text-white/70">
          Page {left}{right !== left ? `–${right}` : ""} of {total}
        </div>
      </div>
    </div>
  );
};

const ExploreByIndustry = () => {
  const [activeKey, setActiveKey] = useState(industries[0].key);
  const [openCard, setOpenCard] = useState<Card | null>(null);
  const active = useMemo(
    () => industries.find((i) => i.key === activeKey) ?? industries[0],
    [activeKey]
  );

  return (
    <section className="py-16 sm:py-24 bg-[#faf6ef]">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-center text-text-dark mb-8 sm:mb-10">
          Explore <span className="text-primary">eZFlips</span> by Industry
        </h2>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {industries.map((ind) => {
            const isActive = ind.key === activeKey;
            return (
              <button
                key={ind.key}
                onClick={() => setActiveKey(ind.key)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background text-text-dark border-border hover:border-primary/40"
                }`}
              >
                {ind.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {active.cards.map((card) => (
            <button
              key={card.title}
              onClick={() => setOpenCard(card)}
              className="group bg-background rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all text-left"
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={card.thumb}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-text-dark text-sm sm:text-base leading-snug">
                  {card.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openCard && <FlipbookModal card={openCard} onClose={() => setOpenCard(null)} />}
    </section>
  );
};

export default ExploreByIndustry;
