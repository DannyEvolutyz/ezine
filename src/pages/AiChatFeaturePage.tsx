import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Check, Users, BookOpen, FileText } from "lucide-react";

const AiChatFeaturePage = () => {
  const whatChanges = [
    { num: "01", title: "Find what they need, any time they need it", desc: "Employees can navigate directly to any section, revisit specific policies without starting from page one, and use the document the way it was meant to be used — as a reference, not a one-time read." },
    { num: "02", title: "Ask questions, get answers instantly", desc: "The built-in AI chat lets employees type any question and get a precise answer pulled directly from the document — without waiting for an HR response or scrolling through 40 pages to find it." },
    { num: "03", title: "Share with anyone, instantly", desc: "Copy a link and send it anywhere — email, WhatsApp, Slack, or embed it on your intranet. No attachments, no downloads, no inbox clutter. Anyone with the link can open and read it immediately." },
  ];

  const useCases = [
    { icon: Users, label: "Onboarding Documents", title: "New hires get answers on day one", desc: "Without waiting for HR. Instead of raising a query or rereading the whole handbook, they ask and move on.", link: "/use-cases/onboarding" },
    { icon: BookOpen, label: "Training Materials", title: "Employees find it in seconds, not minutes", desc: "Employees revisit training content often — usually to find one specific thing. AI chat means they find it fast, every time." },
    { icon: FileText, label: "Internal Documents", title: "Teams stop asking questions that are already documented", desc: "The document becomes the first place people go, not the last resort. Fewer Slack messages, fewer meetings about meetings." },
  ];

  return (
    <MarketingLayout>
      {/* Hero — dark */}
      <section className="bg-ink min-h-[85vh] flex flex-col items-center justify-center text-center px-5 md:px-12 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)',
        }} />

        <div className="inline-flex items-center gap-2 text-xs text-primary-foreground/70 font-medium mb-8 relative z-10">
          <a href="https://www.ezine.digital" className="text-primary-foreground/70 no-underline hover:text-primary transition-colors">Home</a>
          <span className="text-primary-foreground/30">/</span>
          <span className="text-primary-foreground/70">Features</span>
          <span className="text-primary-foreground/30">/</span>
          <span className="text-primary font-semibold">AI Chat</span>
        </div>

        <div className="inline-flex items-center gap-2 bg-primary/12 border border-primary/25 rounded-full px-4 py-1.5 text-[11px] font-bold text-primary tracking-[1.5px] uppercase mb-7 relative z-10">
          <span className="w-[5px] h-[5px] bg-primary rounded-full animate-pulse-dot" />
          AI Feature
        </div>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tighter text-primary-foreground mb-6 relative z-10 max-w-[840px]">
          Ask questions.<br />Get answers.<br />
          <em className="italic text-primary">No scrolling, no guessing.</em>
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80 font-light max-w-[560px] mx-auto mb-12 relative z-10">
          Chat with your documents using built-in AI — get precise answers instantly, without reading through everything.
        </p>

        <div className="flex items-center gap-4 relative z-10">
          <a
            href="https://www.ezine.digital"
            className="font-heading text-[15px] font-semibold text-primary-foreground no-underline px-9 py-3.5 bg-primary rounded-xl inline-flex items-center gap-2 shadow-[0_0_0_1px_hsl(var(--primary)),0_8px_32px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_hsl(var(--primary)),0_16px_40px_hsl(var(--primary)/0.5)] transition-all"
          >
            Try it on your document
            <ArrowRight size={16} />
          </a>
          <span className="text-sm text-primary-foreground/70 flex items-center gap-1.5">
            <Check size={14} className="text-green-400" />
            Free to use
          </span>
        </div>
      </section>

      {/* Chat Demo Window */}
      <section className="bg-ink px-5 md:px-12 pb-20 md:pb-24">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-ink-2 rounded-2xl border border-primary-foreground/8 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]">
            {/* Toolbar */}
            <div className="bg-[hsl(var(--ink)/0.8)] p-3.5 px-5 flex items-center gap-3 border-b border-primary-foreground/8">
              <div className="flex gap-[7px]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center text-xs text-primary-foreground/42 font-medium">
                <strong className="text-primary-foreground/62">Employee Onboarding Handbook.pdf</strong> · AI Chat enabled
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] min-h-[420px]">
              {/* Doc preview */}
              <div className="hidden md:block p-7 border-r border-primary-foreground/8 relative overflow-hidden">
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-primary-foreground/42 mb-4">Section 4 · Leave Policy</div>
                <div className="space-y-2.5">
                  <div className="h-[11px] w-4/5 bg-primary-foreground/6 rounded" />
                  <div className="h-[7px] w-full bg-primary-foreground/6 rounded" />
                  <div className="h-[7px] w-[90%] bg-primary-foreground/6 rounded" />
                  <div className="h-[7px] w-[65%] bg-primary-foreground/6 rounded" />
                  <div className="h-5" />
                  <div className="text-[10px] font-semibold text-primary tracking-wide">↑ Relevant passage found</div>
                  <div className="h-[7px] w-full bg-primary/25 border border-primary/40 rounded relative overflow-hidden animate-shimmer" />
                  <div className="h-[7px] w-4/5 bg-primary/25 border border-primary/40 rounded relative overflow-hidden animate-shimmer" />
                  <div className="h-[7px] w-[55%] bg-primary/25 border border-primary/40 rounded relative overflow-hidden animate-shimmer" />
                  <div className="h-5" />
                  <div className="h-[7px] w-[90%] bg-primary-foreground/6 rounded" />
                  <div className="h-[7px] w-4/5 bg-primary-foreground/6 rounded" />
                  <div className="h-[7px] w-[65%] bg-primary-foreground/6 rounded" />
                </div>
              </div>

              {/* Chat panel */}
              <div className="p-5 flex flex-col gap-3.5">
                <div className="text-[11px] font-bold tracking-[1px] uppercase text-primary-foreground/42 pb-3.5 border-b border-primary-foreground/8 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
                  EzBot · AI Chat
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  {/* User message */}
                  <div className="self-end bg-primary/15 border border-primary/20 rounded-xl rounded-br-sm px-3.5 py-2.5 text-xs leading-relaxed text-primary-foreground/88 max-w-[85%]">
                    What's the leave policy for the first 3 months?
                  </div>

                  {/* AI reply */}
                  <div className="self-start flex gap-2 items-start max-w-[95%]">
                    <div className="w-6 h-6 bg-primary rounded-[7px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                    </div>
                    <div className="bg-primary-foreground/5 border border-primary-foreground/8 rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl px-3.5 py-2.5 text-xs leading-relaxed text-primary-foreground/62">
                      During the first 3 months, employees are eligible for <strong className="text-primary-foreground font-semibold">6 days of sick leave</strong>. Casual leave accrues from month 2 onwards at <strong className="text-primary-foreground font-semibold">1 day per month</strong>.
                      <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/15 rounded px-2 py-0.5 text-[10px] text-primary font-semibold mt-2">
                        <FileText size={10} />
                        Section 4 · Page 12
                      </div>
                    </div>
                  </div>

                  {/* User message 2 */}
                  <div className="self-end bg-primary/15 border border-primary/20 rounded-xl rounded-br-sm px-3.5 py-2.5 text-xs leading-relaxed text-primary-foreground/88 max-w-[85%]">
                    When does the probation period end?
                  </div>

                  {/* AI reply 2 */}
                  <div className="self-start flex gap-2 items-start max-w-[95%]">
                    <div className="w-6 h-6 bg-primary rounded-[7px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                    </div>
                    <div className="bg-primary-foreground/5 border border-primary-foreground/8 rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl px-3.5 py-2.5 text-xs leading-relaxed text-primary-foreground/62">
                      The standard probation period is <strong className="text-primary-foreground font-semibold">90 days</strong> from your date of joining, unless extended in writing by your manager.
                      <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/15 rounded px-2 py-0.5 text-[10px] text-primary font-semibold mt-2">
                        <FileText size={10} />
                        Section 2 · Page 6
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat input */}
                <div className="flex gap-2 items-center pt-2.5 border-t border-primary-foreground/8">
                  <div className="flex-1 bg-primary-foreground/5 border border-primary-foreground/8 rounded-lg px-3 py-2 text-[11px] text-primary-foreground/42">
                    Ask anything about this document…
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary-foreground">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro — light */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">The Problem</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold leading-[1.15] tracking-tight text-text-dark mb-6">
              Nobody reads documents.<br />They <em className="not-italic text-primary">search</em> them.
            </h2>
            <p className="text-[17px] leading-[1.8] text-text-mid font-light mb-4">
              No one opens a document planning to read everything. Most people are looking for one specific answer — but finding it means scrolling, searching, skimming, and still coming up empty.
            </p>
            <p className="text-[17px] leading-[1.8] text-text-mid font-light">
              Most documents make that harder than it needs to be. Ezine's built-in AI chat changes that entirely.
            </p>
          </div>
          <div className="reveal">
            <div className="relative p-8 md:p-9 bg-ink rounded-2xl overflow-hidden">
              <div className="absolute -top-2.5 left-6 font-heading text-[120px] text-primary/15 leading-none pointer-events-none">"</div>
              <p className="font-heading text-xl md:text-[22px] font-semibold leading-[1.4] text-primary-foreground tracking-tight mb-5 relative z-10">
                "Type a question. Get the answer. <em className="italic text-primary">Skip the scroll.</em>"
              </p>
              <p className="text-sm leading-relaxed text-primary-foreground/62 font-light relative z-10">
                Instead of digging through pages, users simply ask — and get a precise answer pulled directly from the document's content, instantly.
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
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-4">What Changes Here</div>
            <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-primary-foreground mb-4">
              From digging through pages<br />to <em className="italic text-primary">simply asking</em>
            </h2>
            <p className="text-base leading-relaxed text-primary-foreground/62 font-light max-w-[500px] mx-auto">
              Works across onboarding documents, training materials, and any internal resource your team relies on daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-primary-foreground/8 rounded-2xl overflow-hidden border border-primary-foreground/8">
            {whatChanges.map((item) => (
              <div key={item.num} className={`bg-ink-2 p-10 md:p-11 hover:bg-[hsl(var(--ink)/0.7)] transition-colors reveal ${item.num === "03" ? "md:col-span-2" : ""}`}>
                <div className="font-heading text-sm font-semibold text-primary mb-5 tracking-wide">{item.num}</div>
                <h3 className="font-heading text-xl md:text-[22px] font-bold text-primary-foreground leading-[1.25] tracking-tight mb-3.5">{item.title}</h3>
                <p className="text-sm leading-[1.75] text-primary-foreground/62 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases — light */}
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
