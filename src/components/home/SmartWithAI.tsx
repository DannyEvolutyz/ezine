const SmartWithAI = () => {
  const features = [
    {
      title: "Ask Your Ezine Anything",
      desc: "Instantly search your doc via natural questions",
      iconBg: "bg-primary",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      title: "Summarize in Seconds",
      desc: "Let AI pull out the highlights",
      iconBg: "bg-accent",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      ),
    },
    {
      title: "Better Engagement",
      desc: "Make static content feel dynamic and useful",
      iconBg: "bg-[hsl(354,73%,35%)]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.08)_0%,hsl(var(--accent)/0.04)_40%,transparent_70%)] pointer-events-none" />
      
      {/* Decorative dots */}
      <div className="absolute top-12 left-12 w-2 h-2 bg-primary/20 rounded-full" />
      <div className="absolute bottom-16 right-16 w-3 h-3 border-2 border-primary/15 rounded-full" />
      <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-accent/20 rounded-full" />

      <div className="max-w-[900px] mx-auto relative z-10">
        <div className="text-center mb-14 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.15] text-text-dark">
            Make it smart with AI
          </h2>
        </div>

        {/* Icons row */}
        <div className="flex items-center justify-center gap-8 md:gap-14 mb-10 reveal">
          {features.map((f) => (
            <div key={f.title} className={`w-16 h-16 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-lg`}>
              {f.icon}
            </div>
          ))}
        </div>

        {/* Separator dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          <span className="w-6 h-1 bg-primary rounded-full" />
          <span className="w-1.5 h-1 bg-text-light/20 rounded-full" />
          <span className="w-1.5 h-1 bg-text-light/20 rounded-full" />
        </div>

        {/* Labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <h3 className="font-heading text-lg font-bold text-text-dark mb-1.5">{f.title}</h3>
              <p className="text-sm text-text-mid font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartWithAI;
