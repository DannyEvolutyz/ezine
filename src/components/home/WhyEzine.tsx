const WhyEzine = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          {/* Open flipbook spread */}
          <path d="M24 12v28" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 12C20 9 12 8 6 9v26c6-1 14 0 18 3" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
          <path d="M24 12c4-3 12-4 18-3v26c-6-1-14 0-18 3" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
          {/* Curling page turn */}
          <path d="M24 14c3 4 6 14 3 22" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M30 16l3-1M32 22l3-1M30 28l3-1" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: "PDF to Interactive Flipbook Converter",
      desc: "Transform static PDFs into visually rich, easy-to-navigate, swipe-ready digital flipbooks. Elevate boring content into engaging experiences.",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          {/* Document */}
          <path d="M10 6h18l8 8v22a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
          <path d="M28 6v8h8" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 20h12M14 25h10" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
          {/* AI chat bubble overlay */}
          <path d="M28 28h12a2 2 0 012 2v8a2 2 0 01-2 2h-3l-3 4-3-4h-1a2 2 0 01-2-2v-8a2 2 0 012-2z" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
          {/* Sparkle = AI */}
          <path d="M34 32l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="hsl(var(--primary))" />
        </svg>
      ),
      title: "AI Chat for Your Documents",
      desc: "Let users ask questions and get precise answers pulled directly from the document — no scrolling, no searching, no guessing.",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          <rect x="6" y="8" width="36" height="32" rx="3" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M6 16h36" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M14 24h20M14 30h14M14 36h8" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="12" r="1.5" fill="hsl(var(--primary))" />
          <circle cx="15" cy="12" r="1.5" fill="hsl(var(--primary))" />
          <circle cx="20" cy="12" r="1.5" fill="hsl(var(--primary))" />
        </svg>
      ),
      title: "Instant Document Summaries",
      desc: "Auto-generate concise, meaningful summaries of any document — so readers get the gist before diving into the detail and what matters most.",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          <path d="M24 8v32" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M8 24h32" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="14" cy="14" r="6" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="34" cy="14" r="6" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="14" cy="34" r="6" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="34" cy="34" r="6" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M18 10l12 0M18 38l12 0M10 18v12M38 18v12" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
        </svg>
      ),
      title: "Seamless Document Sharing",
      desc: "Share documents with a single link. No attachments, no downloads. Email, WhatsApp, Slack — works everywhere, opens instantly.",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-20 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark">
            Why <span className="text-primary">Ezine</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-center reveal">
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="font-heading text-[15px] font-bold text-text-dark leading-[1.3] tracking-tight mb-2.5">{feature.title}</h3>
              <p className="text-[13px] leading-[1.7] text-text-mid font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEzine;
