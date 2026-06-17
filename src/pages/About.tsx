import { ArrowRight, Sparkles, Target, Users, Zap, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";

const stats = [
  { value: "10K+", label: "Documents transformed" },
  { value: "120+", label: "Teams using Ezine" },
  { value: "4.9/5", label: "Customer rating" },
  { value: "30+", label: "Countries served" },
];

const values = [
  {
    icon: Sparkles,
    title: "Simplicity first",
    desc: "We obsess over removing friction. Beautiful tools should feel effortless to use, from the first upload to the final share.",
  },
  {
    icon: Target,
    title: "Purposeful AI",
    desc: "AI should serve people, not replace them. We build features that genuinely help readers learn, decide and act faster.",
  },
  {
    icon: Heart,
    title: "Craft & care",
    desc: "Every pixel and interaction is considered. We sweat the details because content deserves to be experienced, not endured.",
  },
  {
    icon: Shield,
    title: "Trust by design",
    desc: "Your documents are yours. Privacy, security and transparency are non-negotiable foundations of everything we ship.",
  },
  {
    icon: Users,
    title: "Built with users",
    desc: "Our roadmap is shaped by real conversations with HR leads, marketers, educators and founders who use Ezine daily.",
  },
  {
    icon: Zap,
    title: "Move fast, ship right",
    desc: "We ship quickly without cutting corners. Continuous iteration keeps Ezine sharp, modern and ahead of expectations.",
  },
];

const About = () => {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-off-white pt-20 md:pt-28 pb-20 md:pb-24 px-5 md:px-12">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border mb-6 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-xs font-semibold tracking-wide text-text-mid uppercase">About Ezine</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-text-dark mb-6 reveal">
            We turn static documents into <span className="text-primary">living experiences</span>.
          </h1>
          <p className="text-base md:text-lg leading-[1.75] text-text-mid font-light max-w-[680px] mx-auto reveal">
            Ezine is on a mission to make every PDF, report and presentation smarter, more interactive
            and infinitely easier to share — powered by AI, designed for humans.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-12 md:py-16 px-5 md:px-12 border-y border-border">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center reveal">
              <div className="font-heading text-3xl md:text-5xl font-extrabold text-primary tracking-tight">{s.value}</div>
              <div className="text-xs md:text-sm text-text-mid mt-2 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Story */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Our Mission</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark mb-6">
              Make every document worth opening.
            </h2>
            <p className="text-[15px] leading-[1.85] text-text-mid font-light mb-4">
              Most documents are read once, forgotten quickly and shared awkwardly. We saw teams pouring
              hours into beautiful PDFs that ended up buried in inboxes — and readers struggling to find
              what they actually needed.
            </p>
            <p className="text-[15px] leading-[1.85] text-text-mid font-light">
              So we built Ezine: a place where content comes alive. Interactive flipbooks. Instant AI
              answers. Real engagement insights. All from the same files you already create.
            </p>
          </div>
          <div className="reveal">
            <div className="relative bg-background rounded-3xl border border-border p-8 md:p-10 shadow-[0_20px_60px_-20px_rgba(190,30,45,0.15)]">
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Sparkles className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-text-dark mt-4 mb-3">Part of the Evolutyz suite</h3>
              <p className="text-sm leading-[1.8] text-text-mid font-light mb-6">
                Ezine is proudly built by Evolutyz — a family of products helping modern teams work
                smarter with AI-first tools that respect their time, taste and data.
              </p>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                See How We Compare
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">What we believe</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark">
              The principles that shape <span className="text-primary">everything we build</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="reveal bg-off-white rounded-2xl p-7 border border-border hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="text-primary" size={22} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2.5 tracking-tight">{title}</h3>
                <p className="text-[13.5px] leading-[1.75] text-text-mid font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        eyebrow="Join us"
        title={<>Ready to bring your documents <span className="text-accent">to life</span>?</>}
        body="Start with your first flipbook in under two minutes. No credit card, no learning curve — just upload and share."
        buttonText="Get Started Free"
        buttonHref="/signup"
      />
    </MarketingLayout>
  );
};

export default About;
