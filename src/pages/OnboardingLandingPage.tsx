import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Check, FileText, HelpCircle, Clock, Share2, Zap, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingLandingPage = () => {
  const problems = [
    { icon: FileText, title: "Long documents get skimmed, not read", desc: "New hires scroll through 40-page PDFs and miss critical information buried in page 28." },
    { icon: HelpCircle, title: "HR gets flooded with repeat questions", desc: "The same questions answered in the handbook — repeated, across every new hire, every cohort." },
    { icon: Clock, title: "Information goes stale, fast", desc: "Static PDFs shared over email can't be updated without resharing. Everyone ends up with different versions." },
  ];

  const changes = [
    { num: "01", title: "Find what they need, any time they need it", desc: "Employees can navigate directly to any section, revisit specific policies without starting from page one, and use the document the way it was meant to be used — as a reference, not a one-time read." },
    { num: "02", title: "Ask questions, get answers instantly", desc: "The built-in AI chat lets employees type any question and get a precise answer pulled directly from the document — without waiting for an HR response or scrolling through 40 pages to find it.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
    { num: "03", title: "Share with anyone, instantly", desc: "Copy a link and send it anywhere — email, WhatsApp, Slack, or embed it on your intranet. No attachments, no downloads, no inbox clutter. Anyone with the link can open and read it immediately." },
  ];

  const stats = [
    { icon: MessageSquare, value: "Fewer repeat questions", label: "HR spends less time on queries already answered in documents" },
    { icon: Zap, value: "Faster new hire ramp-up", label: "Employees find information independently, without waiting for responses" },
    { icon: Check, value: "Higher document engagement", label: "Interactive format keeps employees engaged with content that matters" },
    { icon: Share2, value: "Share via a single link", label: "Send over email, WhatsApp, Slack, or embed — no attachments needed" },
  ];

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-20 md:py-28 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-bg border border-primary/15 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
              For HR & People Teams
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight text-text-dark mb-6">
              Onboarding Documents<br />Your New Hires Will<br />
              <em className="not-italic text-primary">Actually Use</em>
            </h1>
            <p className="text-[17px] leading-[1.75] text-text-mid font-light mb-10 max-w-[520px]">
              Most onboarding documents are thorough. They just aren't easy to use. New hires skim through them, miss important details, and end up asking questions that were already answered — because finding specific information inside a 40-page PDF is harder than it should be.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://www.ezine.digital"
                className="font-heading text-[15px] font-bold text-primary-foreground no-underline px-8 py-3.5 bg-primary rounded-xl inline-flex items-center gap-2 shadow-[0_4px_20px_hsl(var(--primary)/0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.4)] transition-all"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
              <span className="text-sm text-text-light flex items-center gap-1.5">
                <Check size={14} className="text-green-500" />
                Free to use · No credit card
              </span>
            </div>
          </div>

          {/* Doc card visual */}
          <div className="relative">
            <div className="bg-background rounded-2xl shadow-[0_20px_60px_rgba(26,21,18,0.12),0_4px_16px_rgba(26,21,18,0.06)] overflow-hidden border border-border">
              <div className="bg-off-white p-4 border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-background rounded-md px-3 py-1.5 text-[11px] text-text-light font-medium border border-border text-center">
                  Employee Onboarding Handbook 2025.pdf
                </div>
              </div>
              <div className="p-6">
                <div className="bg-background border border-border rounded-xl p-5 mb-3 relative overflow-hidden">
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-text-light mb-2.5">Page 1 of 48 · HR Policies</div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-warm-gray rounded" />
                    <div className="h-1.5 w-full bg-warm-gray rounded" />
                    <div className="h-1.5 w-full bg-warm-gray rounded" />
                    <div className="h-1.5 w-2/3 bg-warm-gray rounded" />
                    <div className="h-2.5" />
                    <div className="h-1.5 w-full bg-warm-gray rounded" />
                    <div className="h-1.5 w-3/4 bg-warm-gray rounded" />
                  </div>
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 h-[5px] bg-primary rounded-full" />
                  <div className="flex-[3] h-[5px] bg-warm-gray rounded-full" />
                </div>
                <div className="text-center text-[11px] text-text-light mt-2 font-medium">1 of 48 pages · Swipe to navigate</div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-background rounded-xl p-3.5 px-4.5 shadow-[0_12px_40px_rgba(26,21,18,0.15)] border border-border min-w-[220px] animate-float">
                <div className="text-[11px] text-text-light mb-2 font-medium">💬 Asked by Sarah (Day 3)</div>
                <div className="flex gap-2 items-start">
                  <div className="w-[22px] h-[22px] bg-primary rounded-md flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary-foreground"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                  </div>
                  <div>
                    <div className="text-[11px] leading-snug text-text-dark">"What's the leave policy for the first 3 months?"</div>
                    <div className="flex gap-[3px] items-center mt-1.5">
                      <span className="w-1 h-1 bg-text-light rounded-full animate-typing" />
                      <span className="w-1 h-1 bg-text-light rounded-full animate-typing" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1 h-1 bg-text-light rounded-full animate-typing" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Problem */}
      <section className="bg-text-dark py-20 md:py-24 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--primary)/0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">The Real Problem</div>
            <h2 className="font-heading text-3xl md:text-[38px] font-bold leading-[1.2] tracking-tight text-primary-foreground mb-5">
              The issue isn't what you've created.<br />
              <em className="not-italic text-primary">It's how people interact with it.</em>
            </h2>
            <p className="text-base leading-[1.7] text-primary-foreground/55 font-light">
              Your team already has well-structured onboarding documents, detailed policies and handbooks, and complete training materials. The problem is what happens after you share them.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {problems.map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-5 md:p-6 rounded-xl border border-primary-foreground/8 bg-primary-foreground/4 hover:border-primary/30 hover:bg-primary/6 hover:translate-x-1 transition-all reveal">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-heading text-sm font-semibold text-primary-foreground mb-1">{item.title}</div>
                  <p className="text-sm leading-relaxed text-primary-foreground/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Changes with Ezine */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-3.5">What Changes with Ezine</div>
            <h2 className="font-heading text-3xl md:text-[42px] font-bold tracking-tight leading-[1.15] text-text-dark mb-4">
              From a document employees <em className="not-italic text-primary">"go through"</em><br />to one they actually use
            </h2>
            <p className="text-base leading-relaxed text-text-light max-w-[520px] mx-auto font-light">
              Instead of reading page by page, employees get a smarter, faster way to find exactly what they need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {changes.map((item) => (
              <div key={item.num} className="bg-background rounded-2xl p-8 md:p-9 border border-border hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(26,21,18,0.1)] hover:border-transparent transition-all duration-300 relative overflow-hidden group reveal">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="font-heading text-5xl font-extrabold text-warm-gray leading-none tracking-[-2px] mb-4 group-hover:text-accent transition-colors duration-300">{item.num}</div>
                <div className="w-10 h-[3px] bg-primary rounded-sm mb-5" />
                <h3 className="font-heading text-base font-bold text-text-dark mb-3 leading-[1.3]">{item.title}</h3>
                <p className="text-sm leading-[1.75] text-text-mid font-light">
                  {item.desc}
                  {item.link && (
                    <>
                      {" "}
                      <Link to={item.link} className="text-primary no-underline font-semibold inline-flex items-center gap-1 hover:underline underline-offset-2">
                        {item.linkText}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HR Teams */}
      <section className="bg-background py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">Why HR Teams Prefer This Approach</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark mb-6">
              Less time answering the same questions. More time for what matters.
            </h2>
            <p className="text-[17px] leading-[1.75] text-text-mid font-light mb-8">
              When employees can find answers themselves, HR stops fielding the same questions repeatedly. Engagement with onboarding documents improves, dependency on HR for basic queries drops, and new hires ramp up faster.
            </p>
            <div className="mt-8 p-6 bg-red-bg/60 border-l-[3px] border-primary rounded-r-xl text-[15px] leading-[1.7] text-text-dark">
              "Your onboarding document stops being something employees 'go through' and becomes something they actually use when they need it."
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-off-white rounded-xl p-6 flex items-center gap-5 border border-border hover:bg-background hover:shadow-[0_8px_24px_rgba(26,21,18,0.08)] hover:translate-x-1.5 transition-all reveal">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <stat.icon size={22} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="font-heading text-base font-bold text-text-dark tracking-tight">{stat.value}</div>
                  <div className="text-sm text-text-light mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title={<>Make onboarding <em className="not-italic text-primary">easier</em> —<br />for everyone</>}
        body="Upload your onboarding document and turn it into an interactive, AI-powered experience your new hires will actually use."
        buttonText="Try it with your onboarding doc"
        disclaimer="Free to use · No signup required to try"
      />
    </MarketingLayout>
  );
};

export default OnboardingLandingPage;
