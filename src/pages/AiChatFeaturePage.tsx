import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Check, Users, BookOpen, FileText } from "lucide-react";

const AiChatFeaturePage = () => {
  const whatChanges = [
    { num: "01", title: "Ask questions directly within documents", desc: "Users can type a question directly inside the document. Ezine pulls the answer from the content instantly — no scrolling, no searching, no guessing." },
    { num: "02", title: "Get clear answers instantly", desc: "The built-in AI processes the document and returns precise, contextual answers. No waiting for someone to respond, no reading through pages to find what you need." },
    { num: "03", title: "Works across all your documents", desc: "Use this across onboarding documents, training materials, and any internal resource your team relies on daily — without needing to manually search through content." },
  ];

  const useCases = [
    { icon: Users, label: "Onboarding", title: "New hires get answers on day one", desc: "Without waiting for HR. Instead of raising a query or rereading the whole handbook, they ask and move on.", link: "/use-cases/hr-people-ops" },
    { icon: BookOpen, label: "Training Materials", title: "Employees revisit and actually find what they need", desc: "Employees revisit training content often — usually to find one specific thing. AI chat means they find it fast, every time." },
    { icon: FileText, label: "Internal Documents", title: "Teams stop asking questions that are already documented", desc: "The document becomes the first place people go, not the last resort. Fewer Slack messages, fewer meetings about meetings." },
  ];

  return (
    <MarketingLayout>
      {/* Hero — light with warm gradients */}
      <section className="bg-background px-5 md:px-12 pt-20 md:pt-28 pb-20 md:pb-24 relative overflow-hidden">
        {/* Warm gradient blobs */}
        <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.10)_0%,hsl(var(--accent)/0.06)_40%,transparent_70%)] pointer-events-none blur-[40px]" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.08)_0%,hsl(var(--primary)/0.04)_50%,transparent_70%)] pointer-events-none blur-[40px]" />
        <div className="absolute top-[30%] left-[10%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.06)_0%,transparent_70%)] pointer-events-none blur-[30px] animate-pulse" />

        {/* Floating geometric shapes */}
        <div className="absolute top-[15%] right-[12%] w-16 h-16 border-2 border-primary/15 rounded-2xl rotate-12 pointer-events-none" />
        <div className="absolute bottom-[20%] left-[8%] w-10 h-10 border-2 border-accent/15 rounded-full pointer-events-none" />
        <div className="absolute top-[60%] right-[8%] w-6 h-6 bg-primary/10 rounded-full pointer-events-none" />
        <div className="absolute top-[25%] left-[18%] w-3 h-3 bg-accent/20 rounded-full pointer-events-none" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--ink) / 0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 100%)',
        }} />

        <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — Text content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground font-medium mb-6">
              <a href="/" className="text-muted-foreground no-underline hover:text-primary transition-colors">Home</a>
              <span className="text-border-strong">/</span>
              <span className="text-muted-foreground">Features</span>
              <span className="text-border-strong">/</span>
              <span className="text-primary font-semibold">AI Chat</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-5 py-2 text-[11px] font-bold text-primary tracking-[1.5px] uppercase mb-7">
              <span className="w-[5px] h-[5px] bg-primary rounded-full animate-pulse-dot" />
              AI Feature
            </div>

            <h1 className="font-heading text-4xl md:text-5xl leading-none tracking-tighter text-foreground mb-6 font-semibold">
              Ask questions.<br />Get answers.<br />
              <em className="italic text-primary">No scrolling, no guessing.</em>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-[480px] mb-10">
              Chat with your documents using built-in AI and get precise answers instantly, without reading through everything.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="https://www.ezine.digital"
                className="font-heading text-[15px] font-semibold text-primary-foreground no-underline px-9 py-3.5 bg-primary rounded-xl inline-flex items-center gap-2 shadow-[0_8px_32px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_hsl(var(--primary)/0.4)] transition-all"
              >
                Try it on your document
                <ArrowRight size={16} />
              </a>
              <span className="text-sm text-muted-foreground flex items-center gap-1.5 py-3.5">
                <Check size={14} className="text-green-500" />
                Free to use
              </span>
            </div>
          </div>

          {/* Right — Chat Demo Window */}
          <div className="w-full">
          <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
            <div className="bg-warm-gray p-3.5 px-5 flex items-center gap-3 border-b border-border">
              <div className="flex gap-[7px]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center text-xs text-text-light font-medium">
                <strong className="text-text-dark">Employee Onboarding Handbook.pdf</strong> · AI Chat enabled
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] min-h-[420px]">
              <div className="hidden md:block p-7 border-r border-border relative overflow-hidden">
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-text-light mb-4">Section 4 · Leave Policy</div>
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
                <div className="text-[11px] font-bold tracking-[1px] uppercase text-text-light pb-3.5 border-b border-border flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-dot" />
                  EzBot · AI Chat
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="self-end bg-primary/10 border border-primary/15 rounded-xl rounded-br-sm px-3.5 py-2.5 text-xs leading-relaxed text-text-dark max-w-[85%]">
                    What's the leave policy for the first 3 months?
                  </div>
                  <div className="self-start flex gap-2 items-start max-w-[95%]">
                    <div className="w-6 h-6 bg-primary rounded-[7px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                    </div>
                    <div className="bg-off-white border border-border rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl px-3.5 py-2.5 text-xs leading-relaxed text-text-mid">
                      During the first 3 months, employees are eligible for <strong className="text-text-dark font-semibold">6 days of sick leave</strong>. Casual leave accrues from month 2 onwards at <strong className="text-text-dark font-semibold">1 day per month</strong>.
                      <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/15 rounded px-2 py-0.5 text-[10px] text-primary font-semibold mt-2">
                        <FileText size={10} />
                        Section 4 · Page 12
                      </div>
                    </div>
                  </div>
                  <div className="self-end bg-primary/10 border border-primary/15 rounded-xl rounded-br-sm px-3.5 py-2.5 text-xs leading-relaxed text-text-dark max-w-[85%]">
                    When does the probation period end?
                  </div>
                  <div className="self-start flex gap-2 items-start max-w-[95%]">
                    <div className="w-6 h-6 bg-primary rounded-[7px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                    </div>
                    <div className="bg-off-white border border-border rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl px-3.5 py-2.5 text-xs leading-relaxed text-text-mid">
                      The standard probation period is <strong className="text-text-dark font-semibold">90 days</strong> from your date of joining, unless extended in writing by your manager.
                      <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/15 rounded px-2 py-0.5 text-[10px] text-primary font-semibold mt-2">
                        <FileText size={10} />
                        Section 2 · Page 6
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center pt-2.5 border-t border-border">
                  <div className="flex-1 bg-off-white border border-border rounded-lg px-3 py-2 text-[11px] text-text-light">
                    Ask anything about this document…
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary-foreground"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">The Problem</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold leading-[1.15] tracking-tight text-text-dark mb-6">
              Nobody reads documents.<br />They <em className="not-italic text-primary">search</em> them.
            </h2>
            <p className="text-[17px] leading-[1.8] text-text-mid font-light mb-4">
              No one opens a document planning to read everything. Most people are looking for one specific answer, but documents make that harder than it should be. You scroll, search, skim, and still end up missing what you need.
            </p>
          </div>
          <div className="reveal">
            <div className="relative p-8 md:p-9 bg-ink rounded-2xl overflow-hidden">
              <div className="absolute -top-2.5 left-6 font-heading text-[120px] text-primary/15 leading-none pointer-events-none">"</div>
              <p className="font-heading text-xl md:text-[22px] font-semibold leading-[1.4] text-primary-foreground tracking-tight mb-5 relative z-10">
                "Type a question. Get the answer. <em className="italic text-primary">Skip the scroll.</em>"
              </p>
              <p className="text-sm leading-relaxed text-primary-foreground font-light relative z-10">
                Instead of digging through pages, users simply ask. Type a question directly inside the document. Ezine pulls the answer from the content instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="bg-ink-2 py-20 md:py-24 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--primary)/0.07)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-4">What You Can Do</div>
            <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-primary-foreground mb-4">
              From digging through pages<br />to <em className="italic text-primary">simply asking</em>
            </h2>
            <p className="text-base leading-relaxed text-primary-foreground font-light max-w-[500px] mx-auto">
              Works across onboarding documents, training materials, and any internal resource your team relies on daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-primary-foreground/12 rounded-2xl overflow-hidden border border-primary-foreground/12">
            {whatChanges.map((item) => (
              <div key={item.num} className={`bg-primary-foreground/[0.03] p-10 md:p-11 hover:bg-primary-foreground/[0.06] transition-colors reveal ${item.num === "03" ? "md:col-span-2" : ""}`}>
                <div className="font-heading text-sm font-semibold text-primary mb-5 tracking-wide">{item.num}</div>
                <h3 className="font-heading text-xl md:text-[22px] font-bold text-primary-foreground leading-[1.25] tracking-tight mb-3.5">{item.title}</h3>
                <p className="text-sm leading-[1.75] text-primary-foreground font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where This Makes the Biggest Difference */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 items-end">
            <div className="reveal">
              <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">Where This Makes the Biggest Difference</div>
              <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-text-dark">
                Three places where<br />AI chat <em className="not-italic text-primary">changes everything</em>
              </h2>
            </div>
            <p className="text-base leading-[1.7] text-text-mid font-light self-end reveal">
              This becomes especially useful anywhere employees need quick, specific information from a long document — without having to ask someone or read it end to end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.title} className="bg-background rounded-2xl p-8 md:p-9 border border-border hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(26,21,18,0.12)] hover:border-transparent transition-all duration-300 relative overflow-hidden group reveal">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 rounded-xl bg-red-bg flex items-center justify-center mb-6">
                  <uc.icon size={22} className="text-primary" />
                </div>
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-primary mb-2.5">{uc.label}</div>
                <h3 className="font-heading text-xl font-bold text-text-dark leading-[1.25] tracking-tight mb-3">{uc.title}</h3>
                <p className="text-sm leading-[1.75] text-text-mid font-light">{uc.desc}</p>
                {uc.link && (
                  <a href={uc.link} className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary no-underline border-b border-primary/25 hover:border-primary transition-colors">
                    See onboarding use case <ArrowRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title={<>Stop scrolling.<br /><em className="not-italic text-primary">Start asking.</em></>}
        body="Upload any document and ask your first question in under a minute. No setup, no configuration — just answers."
        buttonText="Try it on your document"
      />
    </MarketingLayout>
  );
};

export default AiChatFeaturePage;
