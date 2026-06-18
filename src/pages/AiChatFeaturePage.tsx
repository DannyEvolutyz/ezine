import MarketingLayout from "@/components/MarketingLayout";
import { ArrowRight, Check, Users, BookOpen, FileText, MessageSquare, Quote, Sparkles } from "lucide-react";

const AiChatFeaturePage = () => {
  const capabilities = [
    {
      icon: MessageSquare,
      title: "Ask in plain English",
      desc: "No keywords, no Ctrl+F. Type a question the way you'd ask a colleague and get the answer back in seconds.",
    },
    {
      icon: Quote,
      title: "Answers with citations",
      desc: "Every response points to the exact section and page it came from — so your team can trust what they read.",
    },
    {
      icon: Sparkles,
      title: "Works on what you already have",
      desc: "Drop in any PDF — handbooks, SOPs, training decks. No re-formatting, no manual tagging, no setup.",
    },
  ];

  const useCases = [
    { icon: Users, label: "Onboarding", title: "Day-one answers for new hires", desc: "Instead of raising a ticket or re-reading the handbook, new hires ask and move on." },
    { icon: BookOpen, label: "Training", title: "Find that one slide, fast", desc: "Employees revisit training to find one specific thing. AI chat gets them there in seconds." },
    { icon: FileText, label: "Internal Docs", title: "Fewer 'where do I find…' messages", desc: "The document becomes the first place people go, not the last resort." },
  ];

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
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-5 py-2 text-[11px] font-bold text-primary tracking-[1.5px] uppercase mb-7">
              <span aria-hidden="true" className="w-[5px] h-[5px] bg-primary rounded-full animate-pulse-dot" />
              AI Feature
            </div>

            <h1 className="font-heading text-4xl md:text-5xl leading-[1.1] tracking-tighter text-foreground mb-6 font-semibold">
              Chat with any document.<br />
              <span className="text-primary">Get instant answers.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-[520px] mb-10">
              Upload a document and ask questions in plain language. Ezine instantly finds the answer, understands the context, and helps you locate the information you need without manually searching through pages.
            </p>

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://www.ezine.digital"
                  className="font-heading text-[15px] font-semibold text-primary-foreground no-underline px-9 py-3.5 bg-primary rounded-xl inline-flex items-center justify-center gap-2 shadow-[0_8px_32px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_hsl(var(--primary)/0.4)] transition-all"
                >
                  Try It On Your Document
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a
                  href="#capabilities"
                  className="font-heading text-[15px] font-semibold text-foreground no-underline px-9 py-3.5 bg-transparent border border-border rounded-xl inline-flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all"
                >
                  See AI Chat In Action
                </a>
              </div>
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Check size={14} className="text-green-500" aria-hidden="true" />
                No setup required · Works on any PDF
              </span>
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
                  Ezine AI
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
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">The Problem</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold leading-[1.15] tracking-tight text-text-dark mb-6">
              Nobody reads documents.<br />They <span className="text-primary">search</span> them.
            </h2>
            <ul className="space-y-3.5">
              <li className="flex gap-3 text-[16px] leading-[1.7] text-text-mid font-light">
                <span aria-hidden="true" className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                Most people do not read entire documents.
              </li>
              <li className="flex gap-3 text-[16px] leading-[1.7] text-text-mid font-light">
                <span aria-hidden="true" className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                They search, skim, and scroll to find information — often missing important details in the process.
              </li>
            </ul>
          </div>

          {/* Proof card — real example, light */}
          <div className="reveal">
            <div className="relative p-7 md:p-8 bg-background rounded-2xl border border-border shadow-[0_24px_56px_rgba(26,21,18,0.08)]">
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-primary mb-5">Live Example</div>

              <div className="mb-4">
                <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-text-light mb-1.5">Question</div>
                <div className="text-sm font-semibold text-text-dark leading-relaxed">
                  What is the leave policy during probation?
                </div>
              </div>

              <div className="mb-4 pt-4 border-t border-border">
                <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-text-light mb-1.5">Answer</div>
                <div className="text-sm text-text-mid leading-relaxed font-light">
                  Employees receive <strong className="text-text-dark font-semibold">6 days of sick leave</strong> during the first three months of employment.
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-text-light mb-1.5">Source</div>
                <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1 text-[11px] text-primary font-semibold">
                  <FileText size={11} aria-hidden="true" />
                  Employee Handbook · Section 4.2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — light, 3 distinct */}
      <section id="capabilities" className="bg-background py-20 md:py-24 px-5 md:px-12 relative overflow-hidden">
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--primary)/0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-4">What You Can Do</div>
            <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-text-dark mb-4">
              From digging through pages<br />to <span className="text-primary">simply asking</span>
            </h2>
            <p className="text-base leading-relaxed text-text-mid font-light max-w-[520px] mx-auto">
              Three capabilities that turn any static PDF into a conversation your team can actually use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-off-white rounded-2xl p-8 md:p-9 border border-border hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(26,21,18,0.10)] hover:border-transparent transition-all duration-300 relative overflow-hidden group reveal">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 rounded-xl bg-red-bg flex items-center justify-center mb-6">
                  <c.icon size={22} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark leading-[1.25] tracking-tight mb-3">{c.title}</h3>
                <p className="text-sm leading-[1.75] text-text-mid font-light">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where It Shines */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 items-end">
            <div className="reveal">
              <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">Where It Shines</div>
              <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-text-dark">
                Three places AI chat<br /><span className="text-primary">earns its keep</span>
              </h2>
            </div>
            <p className="text-base leading-[1.7] text-text-mid font-light self-end reveal">
              Especially useful anywhere employees need quick, specific information from a long document — without having to ask someone or read it end to end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.title} className="bg-background rounded-2xl p-8 md:p-9 border border-border hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(26,21,18,0.12)] hover:border-transparent transition-all duration-300 relative overflow-hidden group reveal">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 rounded-xl bg-red-bg flex items-center justify-center mb-6">
                  <uc.icon size={22} className="text-primary" aria-hidden="true" />
                </div>
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-primary mb-2.5">{uc.label}</div>
                <h3 className="font-heading text-xl font-bold text-text-dark leading-[1.25] tracking-tight mb-3">{uc.title}</h3>
                <p className="text-sm leading-[1.75] text-text-mid font-light">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — dark, with two actions and risk reducer */}
      <section className="bg-ink py-24 md:py-32 px-5 md:px-12 text-center relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.15)_0%,transparent_65%)] pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
        }} />

        <div className="max-w-[680px] mx-auto relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-[1.05] text-primary-foreground mb-5">
            Turn your next document<br /><span className="text-primary">into a conversation.</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-primary-foreground/60 font-light mb-11">
            Upload a PDF, ask your first question in under a minute. No setup, no credit card.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://www.ezine.digital"
                className="font-heading text-base font-bold text-accent-foreground no-underline px-10 py-4 bg-accent rounded-xl inline-flex items-center justify-center gap-2.5 shadow-[0_4px_16px_hsl(var(--accent)/0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(var(--accent)/0.35)] transition-all duration-300"
              >
                Upload A Document
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="/#contact"
                className="font-heading text-base font-bold text-primary-foreground no-underline px-10 py-4 bg-transparent border border-primary-foreground/25 rounded-xl inline-flex items-center justify-center gap-2.5 hover:border-primary-foreground/60 transition-all duration-300"
              >
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

export default AiChatFeaturePage;
