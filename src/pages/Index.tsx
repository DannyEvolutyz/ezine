import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Layers, Share2, Search, Sparkles, BookOpen } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      desc: "Let readers ask questions and get instant answers pulled directly from your document — no scrolling, no searching.",
      link: "/features/ai-chat",
      linkText: "Explore AI Chat",
    },
    {
      icon: Layers,
      title: "Interactive Flipbook",
      desc: "Transform static PDFs into swipe-able, magazine-style digital publications that feel natural on any device.",
    },
    {
      icon: Search,
      title: "Smart Search & Navigation",
      desc: "Readers jump to any section instantly. No more scrolling through 40 pages to find one answer.",
    },
    {
      icon: Share2,
      title: "One-Link Sharing",
      desc: "Share via email, WhatsApp, Slack, or embed on your intranet. No attachments, no downloads — just a link.",
    },
    {
      icon: Sparkles,
      title: "Brand-Ready Design",
      desc: "Your documents look polished and on-brand. Custom themes, fonts, and layouts that match your identity.",
    },
    {
      icon: BookOpen,
      title: "Analytics & Engagement",
      desc: "Track who reads what, how far they go, and which sections get the most attention — all in real time.",
    },
  ];

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-24 md:py-32 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--primary)/0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-bg border border-primary/15 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
              AI-Powered Document Platform
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[58px] font-extrabold leading-[1.08] tracking-tight text-text-dark mb-6">
              Turn boring docs into<br />
              <em className="not-italic text-primary">smart, swipe-able</em><br />
              digital publications
            </h1>
            <p className="text-lg leading-[1.75] text-text-mid font-light mb-10 max-w-[500px]">
              Upload any PDF and transform it into an interactive, AI-powered experience your audience will actually read, search, and engage with.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://www.ezine.digital"
                className="font-heading text-[15px] font-bold text-primary-foreground no-underline px-8 py-3.5 bg-primary rounded-xl inline-flex items-center gap-2 shadow-[0_4px_20px_hsl(var(--primary)/0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.4)] transition-all"
              >
                Get Started Free
                <ArrowRight size={16} />
              </a>
              <Link
                to="/compare"
                className="text-sm font-semibold text-text-mid no-underline border-b border-border-strong hover:text-primary hover:border-primary transition-colors"
              >
                See how we compare →
              </Link>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="bg-background rounded-2xl shadow-[0_20px_60px_rgba(26,21,18,0.12),0_4px_16px_rgba(26,21,18,0.06)] overflow-hidden border border-border">
              <div className="bg-off-white p-4 border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-background rounded-md px-3 py-1.5 text-[11px] text-text-light font-medium border border-border text-center">
                  Company Handbook 2025.pdf
                </div>
              </div>
              <div className="p-6">
                <div className="bg-background border border-border rounded-xl p-5 mb-3">
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
            </div>
            {/* Floating AI chat bubble */}
            <div className="absolute -bottom-4 -right-4 bg-background rounded-xl p-3.5 px-4 shadow-[0_12px_40px_rgba(26,21,18,0.15)] border border-border min-w-[200px] animate-float">
              <div className="text-[11px] text-text-light mb-1.5 font-medium">💬 AI Chat</div>
              <div className="text-[11px] text-text-dark leading-snug">"What's the leave policy?"</div>
              <div className="flex gap-[3px] items-center mt-1.5">
                <span className="w-1 h-1 bg-text-light rounded-full animate-typing" />
                <span className="w-1 h-1 bg-text-light rounded-full animate-typing" style={{ animationDelay: "0.2s" }} />
                <span className="w-1 h-1 bg-text-light rounded-full animate-typing" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">About eZine</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold leading-[1.15] tracking-tight text-text-dark mb-6">
              Documents should work <em className="not-italic text-primary">for</em> your audience, not against them.
            </h2>
            <p className="text-[17px] leading-[1.8] text-text-mid font-light mb-4">
              eZine by Evolutyz is an AI-powered document platform that transforms static PDFs into interactive, searchable, and shareable digital publications.
            </p>
            <p className="text-[17px] leading-[1.8] text-text-mid font-light">
              Whether it's onboarding handbooks, training materials, or sales presentations — we make documents people actually want to use.
            </p>
          </div>
          <div className="reveal">
            <div className="relative p-8 md:p-9 bg-ink rounded-2xl overflow-hidden">
              <div className="absolute -top-2.5 left-6 font-heading text-[120px] text-primary/15 leading-none pointer-events-none">"</div>
              <p className="font-heading text-xl md:text-[22px] font-semibold leading-[1.4] text-primary-foreground tracking-tight mb-5 relative z-10">
                "We don't just make documents look better — we make them <em className="italic text-primary">easier to use.</em>"
              </p>
              <p className="text-sm leading-relaxed text-primary-foreground/70 font-light relative z-10">
                Built for HR teams, L&D departments, sales teams, and anyone who shares long-form documents with an audience that doesn't have time to read them end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-3.5">Features</div>
            <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-text-dark mb-4">
              Everything you need to make<br />documents <em className="not-italic text-primary">actually useful</em>
            </h2>
            <p className="text-base leading-relaxed text-text-light max-w-[500px] mx-auto font-light">
              From AI chat to one-link sharing — every feature is designed to help your readers find what they need, fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-off-white rounded-2xl p-8 md:p-9 border border-border hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(26,21,18,0.1)] hover:border-transparent transition-all duration-300 relative overflow-hidden group reveal"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 rounded-xl bg-red-bg flex items-center justify-center mb-6">
                  <feature.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-dark leading-[1.25] tracking-tight mb-3">{feature.title}</h3>
                <p className="text-sm leading-[1.75] text-text-mid font-light">{feature.desc}</p>
                {feature.link && (
                  <Link
                    to={feature.link}
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary no-underline border-b border-primary/25 hover:border-primary transition-colors"
                  >
                    {feature.linkText} <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases strip */}
      <section className="bg-ink py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-4">Use Cases</div>
          <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.1] text-primary-foreground mb-12">
            Built for teams who share<br /><em className="italic text-primary">important documents</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Onboarding", desc: "New hires find answers on day one — without waiting for HR.", link: "/use-cases/onboarding" },
              { title: "Training", desc: "Employees revisit training content and find specifics instantly.", link: "#" },
              { title: "Sales Presentations", desc: "Share polished, interactive decks that clients actually engage with.", link: "#" },
            ].map((uc) => (
              <Link
                key={uc.title}
                to={uc.link}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 text-left no-underline hover:bg-primary-foreground/8 hover:border-primary/30 transition-all group"
              >
                <h3 className="font-heading text-xl font-bold text-primary-foreground mb-2 group-hover:text-primary transition-colors">{uc.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed font-light">{uc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title={<>See it with your<br /><em className="not-italic text-primary">own document.</em></>}
        body="Upload any PDF and experience the difference in under a minute. No setup, no credit card required."
        buttonText="Get Started Free"
      />
    </MarketingLayout>
  );
};

export default Index;
