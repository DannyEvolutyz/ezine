const SmartWithAI = () => {
  const features = [
    {
      title: "Ask Your Ezine Anything",
      desc: "Instantly search your doc via natural questions.",
      iconBg: "bg-primary",
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      title: "Summarize in Seconds",
      desc: "Let AI pull out the highlights for your readers.",
      iconBg: "bg-accent",
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      ),
    },
    {
      title: "Better Engagement",
      desc: "Make static content feel dynamic and useful.",
      iconBg: "bg-[hsl(354,73%,35%)]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-bg border border-primary/10 mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Powered</span>
          </div>
          <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.15] text-text-dark">
            Make it smart with <span className="text-primary">AI</span>
          </h2>
          <p className="text-sm md:text-base text-text-mid font-light mt-3 max-w-xl mx-auto">
            Turn every Ezine into an intelligent, interactive experience.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-card border border-border rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
            >
              <div className={`w-14 h-14 rounded-xl ${f.iconBg} flex items-center justify-center shadow-md mb-5 group-hover:scale-105 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{f.title}</h3>
              <p className="text-sm text-text-mid font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartWithAI;
