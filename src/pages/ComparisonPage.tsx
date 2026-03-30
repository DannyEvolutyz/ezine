import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { Check, X, ArrowRight } from "lucide-react";

const ComparisonPage = () => {
  const features = [
    { name: "Convert PDF to flipbook", typical: true, ezine: true },
    { name: "Share via a link", typical: true, ezine: true },
    { name: "Navigate without scrolling", typical: false, ezine: true },
    { name: "Search inside the document", typical: false, ezine: true },
    { name: "Ask questions, get instant answers", typical: false, ezine: true },
    { name: "Built-in AI layer", typical: false, ezine: true },
  ];

  const matters = [
    {
      num: "01",
      title: "Most tools stop at presentation",
      body: "They make documents look better — but they don't change how people interact with them. A document that looks polished but still forces users to scroll through 40 pages hasn't really solved anything.",
    },
    {
      num: "02",
      title: "The real measure is usability",
      body: "Can users find what they need without reading everything? Can they ask a question and get an answer immediately? Can HR share it once and have it work for every new hire? That's what a functional document does.",
    },
  ];

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 md:gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-text-light font-medium mb-7">
              <a href="https://www.ezine.digital" className="text-text-light no-underline hover:text-primary transition-colors">Home</a>
              <span className="text-border-strong">/</span>
              <span className="text-primary font-semibold">Buyer Guide</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-warm-gray border border-border rounded-md px-3 py-1.5 text-[11px] font-bold text-text-mid tracking-[1.5px] uppercase mb-6">
              Buyer Guide
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight text-text-dark mb-7">
              Most flipbook tools<br />look the same.<br />Here's what's<br />
              <em className="not-italic text-primary">actually different.</em>
            </h1>
            <p className="text-lg leading-[1.75] text-text-mid font-light pb-8 border-b border-border mb-8">
              Most flipbook tools look the same at first. You upload a PDF, convert it into a flipbook, and share it. But once you start using them, the difference becomes clear — <strong className="font-semibold text-text-dark">most tools make documents look better. Very few make them easier to use.</strong>
            </p>
            <div className="flex items-center gap-2.5 text-sm text-text-light font-medium">
              <div className="w-10 h-px bg-border-strong" />
              Scroll to see the comparison
            </div>
          </div>

          {/* Verdict card */}
          <div className="hidden md:block bg-ink rounded-2xl p-9 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-[200px] h-[200px] bg-[radial-gradient(circle,hsl(var(--primary)/0.2)_0%,transparent_65%)] pointer-events-none" />
            <div className="text-[10px] font-bold tracking-[2px] uppercase text-primary mb-4">The Short Version</div>
            <h3 className="font-heading text-[22px] font-bold leading-[1.3] tracking-tight text-primary-foreground mb-5">
              If you need more than a<br /><em className="italic text-primary">pretty PDF,</em> read on.
            </h3>
            <div className="flex flex-col gap-3 mb-7">
              {["Both tools convert PDFs to flipbooks", "Both let you share via link"].map((text) => (
                <div key={text} className="flex items-start gap-2.5 text-sm text-primary-foreground/60">
                  <div className="w-[18px] h-[18px] bg-green-status/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={10} className="text-green-400" />
                  </div>
                  {text}
                </div>
              ))}
              <div className="h-px bg-primary-foreground/8 my-2" />
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/60">
                <div className="w-[18px] h-[18px] bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X size={10} className="text-primary" />
                </div>
                Typical tools stop there
              </div>
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/60">
                <div className="w-[18px] h-[18px] bg-green-status/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={10} className="text-green-400" />
                </div>
                Ezine adds AI chat, search, and interactive navigation
              </div>
            </div>
            <div className="h-px bg-primary-foreground/8 mb-5" />
            <p className="text-xs text-primary-foreground/35 leading-relaxed">
              The core question isn't which tool looks better. It's which one makes your document more useful.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-3.5">Quick Comparison</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark">
              Feature by feature,<br /><em className="not-italic text-primary">side by side</em>
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[0_4px_32px_rgba(26,21,18,0.08)] reveal">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-ink p-6 text-left text-xs font-bold text-primary-foreground/50 tracking-[1px] uppercase w-[45%]">Feature</th>
                  <th className="bg-ink-2 p-6 text-center text-sm font-semibold text-primary-foreground/45 w-[27.5%] border-l border-primary-foreground/5">Typical Flipbook Tools</th>
                  <th className="bg-primary p-6 text-center text-sm font-bold text-primary-foreground w-[27.5%] border-l border-primary-foreground/10">
                    Ezine
                    <div className="inline-block bg-primary-foreground/20 rounded px-2 py-0.5 text-[10px] font-bold tracking-[1px] ml-2">AI-POWERED</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={i} className="group">
                    <td className="bg-background group-hover:bg-warm-gray p-5 text-[15px] font-medium text-text-dark border-b border-border transition-colors">
                      {feature.name}
                    </td>
                    <td className="bg-off-white group-hover:bg-warm-gray p-5 text-center border-b border-border border-l border-border transition-colors">
                      {feature.typical ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-green-bg border border-green-200 rounded-full">
                          <Check size={14} className="text-green-status" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-red-bg border border-red-200 rounded-full">
                          <X size={14} className="text-red-500" />
                        </span>
                      )}
                    </td>
                    <td className="bg-red-bg/30 group-hover:bg-red-bg/60 p-5 text-center border-b border-primary/10 border-l border-primary/15 transition-colors">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-primary/10 border border-primary/25 rounded-full">
                        <Check size={14} className="text-primary" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-6 text-sm text-text-light italic reveal">
            The first two rows are table stakes. The last four are where the real difference is.
          </p>
        </div>
      </section>

      {/* What Actually Matters */}
      <section className="bg-background py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="reveal mb-14">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-3.5">What Actually Matters</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark">
              The question isn't which tool<br /><em className="not-italic text-primary">looks better.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border rounded-2xl overflow-hidden border border-border">
            {matters.map((item) => (
              <div key={item.num} className="bg-background p-10 md:p-12 hover:bg-off-white transition-colors reveal">
                <div className="font-heading text-6xl font-black text-warm-gray leading-none tracking-[-3px] mb-5">{item.num}</div>
                <div className="w-10 h-[3px] bg-primary rounded-sm mb-5" />
                <h3 className="font-heading text-[22px] font-bold text-text-dark leading-[1.25] tracking-tight mb-3.5">{item.title}</h3>
                <p className="text-[15px] leading-[1.78] text-text-mid font-light">{item.body}</p>
              </div>
            ))}

            {/* Dark wide cell */}
            <div className="bg-ink md:col-span-2 p-10 md:p-12 hover:bg-ink-2 transition-colors reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <h3 className="font-heading text-2xl md:text-[28px] font-bold leading-[1.25] text-primary-foreground tracking-tight">
                  Ezine adds an <em className="italic text-primary">interactive layer</em> — not just a visual one.
                </h3>
                <p className="text-[15px] leading-[1.78] text-primary-foreground/55 font-light">
                  Instead of just converting PDFs into flipbooks, Ezine lets users navigate efficiently, find what they need instantly, and ask questions directly within the document when needed. Works across onboarding documents, training materials, and internal resources your team relies on daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        eyebrow="Ready to try it?"
        title={<>See it with your<br /><em className="not-italic text-primary">own document.</em></>}
        body="Upload any PDF and experience the difference in under a minute. No setup, no credit card required."
        buttonText="See it with your own document"
      />
    </MarketingLayout>
  );
};

export default ComparisonPage;
