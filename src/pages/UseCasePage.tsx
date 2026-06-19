import { useParams, Navigate } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Check, FileText, HelpCircle, Clock, Share2, Zap, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const useCaseData: Record<string, {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  problemTitle: React.ReactNode;
  problemDesc: string;
  problems: { icon: typeof FileText; title: string; desc: string }[];
  changes: { num: string; title: string; desc: string; link?: string; linkText?: string }[];
  whyTitle: string;
  whyDesc: string;
  quote: string;
  stats: { icon: typeof MessageSquare; value: string; label: string }[];
  ctaTitle: React.ReactNode;
  ctaBody: string;
  ctaButton: string;
}> = {
  "founders-writers": {
    badge: "For Founders & Writers",
    title: <>You Wrote Something Great.<br />Now Make Sure It<br /><em className="not-italic text-primary">Actually Gets Read</em></>,
    subtitle: "You've already done the hard part — thinking deeply, writing clearly, putting something valuable out there. But once it's shared, most of that effort gets lost in how people consume it.",
    problemTitle: <>The issue isn't your content quality.<br /><em className="not-italic text-primary">It's how it's consumed.</em></>,
    problemDesc: "You've written detailed reports, investor updates, ebooks, or long-form insights. But once shared, they become static files that people skim, drop, or never return to. Readers won't re-open a 30-page PDF just to find one thing they half-remembered.",
    problems: [
      { icon: FileText, title: "Long-form content gets skimmed once", desc: "Readers open it, scroll quickly, and rarely come back — even when the content is genuinely valuable." },
      { icon: HelpCircle, title: "Static PDFs don't invite interaction", desc: "There's no way for readers to ask follow-up questions or jump to what matters most to them." },
      { icon: Clock, title: "Bulky attachments slow distribution", desc: "Sharing big files over email or messaging apps adds friction at every step of the journey." },
    ],
    changes: [
      { num: "01", title: "Let readers explore, not just scroll", desc: "Instead of forcing linear reading, readers can jump to specific sections, revisit key insights, and move through the document based on what matters to them. This turns long-form content into something usable, not overwhelming." },
      { num: "02", title: "Turn your content into a conversation", desc: "Readers can ask questions and get instant answers pulled directly from your content. Whether it's a report, ebook, or founder note, they don't have to search — they can simply ask.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "Get your content in front of more people, with less friction", desc: "Send a single link instead of bulky attachments. Embed your content into your website, newsletters, or landing pages without friction. Your content becomes easy to distribute and easier to consume." },
    ],
    whyTitle: "Great content deserves better than being skimmed once and forgotten.",
    whyDesc: "When readers can interact, revisit, and extract value easily, engagement naturally improves. Your ideas land better, your insights travel further, and your content starts working for you long after it's published.",
    quote: "Your ideas land better, your insights travel further, and your content starts working for you long after it's published.",
    stats: [
      { icon: MessageSquare, value: "Readers actually engage", label: "Interactive format invites exploration instead of a one-time skim" },
      { icon: Zap, value: "Insights are easy to revisit", label: "Readers return to the parts that mattered without re-reading everything" },
      { icon: Check, value: "Ask anything, anytime", label: "AI chat answers questions pulled directly from your content" },
      { icon: Share2, value: "Distribute with one link", label: "No attachments — share over email, social, or embed anywhere" },
    ],
    ctaTitle: <>Make sure your writing<br /><em className="not-italic text-primary">actually gets read</em></>,
    ctaBody: "Upload your next piece and turn it into something readers explore, revisit, and act on.",
    ctaButton: "Try It With Your Next Document",
  },
  "marketing-teams": {
    badge: "For Marketing Teams",
    title: <>Your Campaigns Are Working.<br />Your Content<br /><em className="not-italic text-primary">Isn't Keeping Up</em></>,
    subtitle: "You're creating the right assets. But once they're sent, you have no control over how they're read — or whether they're read at all.",
    problemTitle: <>The problem isn't the content.<br /><em className="not-italic text-primary">It's the experience.</em></>,
    problemDesc: "Marketing teams spend time building detailed assets, but recipients rarely go through them fully. Static PDFs don't guide attention, don't answer questions, and don't make it easy to revisit key points. So even good content underperforms.",
    problems: [
      { icon: FileText, title: "Detailed assets get half-read", desc: "Prospects open the PDF, skim a couple of pages, and miss the parts that would actually move them forward." },
      { icon: HelpCircle, title: "No way to answer questions in-context", desc: "Prospects with questions email back, get delayed, or quietly drop off — friction kills momentum." },
      { icon: Clock, title: "Distribution adds friction", desc: "Heavy attachments, downloads, and version mismatches slow campaigns down at exactly the wrong moment." },
    ],
    changes: [
      { num: "01", title: "Make content easier to explore", desc: "Readers can jump directly to sections that matter — pricing, features, case studies — without scrolling endlessly. A prospect who finds what they're looking for stays longer and moves faster. Give them a way to navigate instead of scroll." },
      { num: "02", title: "Answer questions instantly", desc: "Prospects don't have to email or wait — they can ask questions directly inside the document. The AI chat pulls answers from your content instantly, reducing friction in decision-making.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "Share and distribute without friction", desc: "Share via a simple link across email campaigns, ads, or WhatsApp. No downloads, no file size issues." },
    ],
    whyTitle: "Better content distribution leads to better engagement.",
    whyDesc: "When your content is easier to consume, prospects spend more time with it, understand it better, and move forward faster. Your assets stop being passive files and start becoming active tools in your funnel.",
    quote: "Your assets stop being passive files and start becoming active tools in your funnel.",
    stats: [
      { icon: MessageSquare, value: "More time spent with content", label: "Prospects explore instead of skimming and bouncing" },
      { icon: Zap, value: "Faster decision-making", label: "Instant in-document answers reduce friction at every step" },
      { icon: Check, value: "AI-powered Q&A", label: "Prospects ask questions and get answers from your content" },
      { icon: Share2, value: "One link, anywhere", label: "Distribute via email, ads, WhatsApp — no downloads needed" },
    ],
    ctaTitle: <>Fix how your content<br /><em className="not-italic text-primary">performs</em></>,
    ctaBody: "Upload your next campaign asset and turn it into an interactive experience prospects can navigate, search, and act on.",
    ctaButton: "Try It With Your Next Campaign",
  },
  "sales-reps": {
    badge: "For Sales Reps",
    title: <>Your Sales Material Isn't<br />Closing.<br /><em className="not-italic text-primary">Here's Why.</em></>,
    subtitle: "Most sales conversations don't slow down because of pricing or product fit. They slow down because what you shared didn't fully land. The deck was sent, the details were there — and somehow the conversation still circles back to questions that were already answered.",
    problemTitle: <>The issue isn't what you're sending.<br /><em className="not-italic text-primary">It's how it's being read.</em></>,
    problemDesc: "Prospects open the document, go through parts of it, skip a few things, and rarely come back to it properly. Not because they're disengaged — but because navigating back to one specific detail inside a long deck is harder than it should be. So instead of moving ahead, they pause. Or ask. Or wait.",
    problems: [
      { icon: FileText, title: "Decks get partially read", desc: "Prospects skip around, miss key sections, and lose the narrative you carefully built into the deck." },
      { icon: HelpCircle, title: "Questions trigger back-and-forth", desc: "Every clarification means an email, a delay, and another touchpoint before the deal can move forward." },
      { icon: Clock, title: "Versions and attachments cause confusion", desc: "'Can you resend that file?' slows momentum just when the prospect was ready to act." },
    ],
    changes: [
      { num: "01", title: "Help prospects find answers faster", desc: "Instead of going through entire decks, prospects can jump to relevant sections instantly. This keeps conversations focused and efficient. When prospects reach relevant information quickly, they're more likely to engage with it — and less likely to disengage waiting for a follow-up." },
      { num: "02", title: "Reduce back-and-forth with instant answers", desc: "Prospects can ask questions directly within the document and get answers immediately. This removes delays and keeps momentum intact.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "One link. Opens anywhere, revisited anytime.", desc: "No attachments, no version confusion, no 'can you resend that file?' Send one link — prospects can open it on any device, return to it before a call, and find what they need without asking you." },
    ],
    whyTitle: "Faster understanding leads to faster decisions.",
    whyDesc: "When prospects don't struggle to find information, conversations move forward smoothly. Your materials stop being something you send and start becoming something that moves the deal forward.",
    quote: "Your materials stop being something you send and start becoming something that moves the deal forward.",
    stats: [
      { icon: MessageSquare, value: "Less back-and-forth", label: "Prospects self-serve answers instead of waiting on you" },
      { icon: Zap, value: "Faster deal momentum", label: "Conversations stay focused when information is easy to reach" },
      { icon: Check, value: "AI-powered Q&A", label: "Instant answers pulled directly from your sales material" },
      { icon: Share2, value: "One link, any device", label: "No attachments, no version confusion, always accessible" },
    ],
    ctaTitle: <>Make your next deck<br /><em className="not-italic text-primary">do the selling</em></>,
    ctaBody: "Upload your sales deck and turn it into an interactive experience prospects can navigate, search, and revisit on their own.",
    ctaButton: "Try It With Your Next Sales Deck",
  },
  "educators": {
    badge: "For Educators",
    title: <>Your Students Aren't Disengaged.<br />Your Content Is Just<br /><em className="not-italic text-primary">Hard to Use</em></>,
    subtitle: "Students don't struggle because the content isn't good. They struggle because it's hard to use. Over time, that friction adds up and learning starts to feel heavier than it should. Even the most well-structured material loses its impact when students can't easily navigate, revisit, or quickly understand what they're looking for.",
    problemTitle: <>The issue isn't the material itself.<br /><em className="not-italic text-primary">It's what students have to do to get value from it.</em></>,
    problemDesc: "They jump between pages trying to relocate one concept, lose context while scrolling, and spend more time searching than actually understanding. When accessing information feels like effort, engagement drops and learning becomes inconsistent.",
    problems: [
      { icon: FileText, title: "Students lose context while scrolling", desc: "Long PDFs make it hard to relocate a single concept without losing the thread of what they were learning." },
      { icon: HelpCircle, title: "Searching takes more time than learning", desc: "Students spend more energy hunting for information than actually understanding it." },
      { icon: Clock, title: "Materials feel like a sequence to get through", desc: "Static documents push linear reading instead of supporting how students actually study and revisit." },
    ],
    changes: [
      { num: "01", title: "Let students learn at their own pace", desc: "Students can jump to sections, revisit concepts, and use the material as needed instead of following a fixed sequence. Learning stops feeling like a sequence to get through and starts feeling like a resource to use." },
      { num: "02", title: "Turn content into a guided experience", desc: "Students can ask questions and get answers instantly, pulled directly from the material. When a concept doesn't land the first time, they don't have to raise their hand or wait — they ask and move on.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "Share learning material easily", desc: "Share any learning material as a single link. No downloads, no access issues, no version confusion — students open it on any device, any time they need it." },
    ],
    whyTitle: "Better access leads to better understanding.",
    whyDesc: "When students can interact with content, they engage more, retain more, and learn more effectively. Your material stops being something students open once before an exam and becomes something they actually return to.",
    quote: "Your material stops being something students open once before an exam and becomes something they actually return to.",
    stats: [
      { icon: MessageSquare, value: "Students engage more", label: "Interactive material invites exploration instead of last-minute cramming" },
      { icon: Zap, value: "Faster understanding", label: "Instant in-document answers help concepts land the first time" },
      { icon: Check, value: "Available anytime", label: "AI chat acts as a study companion across any device" },
      { icon: Share2, value: "One link for the whole class", label: "No downloads or version confusion — always accessible" },
    ],
    ctaTitle: <>Help students learn<br /><em className="not-italic text-primary">without friction</em></>,
    ctaBody: "Upload your learning material and turn it into an interactive, AI-powered resource students will actually return to.",
    ctaButton: "Try It With Your Learning Material",
  },
};

const UseCasePage = () => {
  const { slug } = useParams();

  if (!slug || !useCaseData[slug]) {
    return <Navigate to="/use-cases/hr-people-ops" replace />;
  }

  const data = useCaseData[slug];

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-20 md:py-28 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-bg border border-primary/15 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
              {data.badge}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight text-text-dark mb-6">
              {data.title}
            </h1>
            <p className="text-[17px] leading-[1.75] text-text-mid font-light mb-10 max-w-[520px]">
              {data.subtitle}
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

          <div className="relative">
            <div className="bg-background rounded-2xl shadow-[0_20px_60px_rgba(26,21,18,0.12),0_4px_16px_rgba(26,21,18,0.06)] overflow-hidden border border-border">
              <div className="bg-off-white p-4 border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-background rounded-md px-3 py-1.5 text-[11px] text-text-light font-medium border border-border text-center">
                  {slug === "founders-writers" ? "Founders Agreement · Ezine" : "Document Preview · Ezine"}
                </div>
              </div>

              {slug === "founders-writers" ? (
                <div className="p-6 space-y-3">
                  {/* Flipbook preview */}
                  <div className="bg-off-white border border-border rounded-xl p-4">
                    <div className="text-[10px] font-bold uppercase tracking-[1px] text-text-light mb-3">Flipbook Preview</div>
                    <div className="relative grid grid-cols-2 gap-0 rounded-lg overflow-hidden border border-border bg-background min-h-[320px]">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
                      <div className="p-4">
                        <div className="text-[9px] font-bold uppercase tracking-[1px] text-text-mid mb-3">Founders Agreement</div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-full bg-warm-gray rounded" />
                          <div className="h-1.5 w-5/6 bg-warm-gray rounded" />
                          <div className="h-1.5 w-3/4 bg-warm-gray rounded" />
                          <div className="h-1.5 w-full bg-warm-gray rounded" />
                          <div className="h-1.5 w-11/12 bg-warm-gray rounded" />
                          <div className="h-1.5 w-4/5 bg-warm-gray rounded" />
                          <div className="h-2" />
                          <div className="h-1.5 w-full bg-warm-gray rounded" />
                          <div className="h-1.5 w-2/3 bg-warm-gray rounded" />
                          <div className="h-1.5 w-5/6 bg-warm-gray rounded" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-[9px] font-bold uppercase tracking-[1px] text-text-mid mb-3">Section 3 · Vesting</div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-full bg-warm-gray rounded" />
                          <div className="h-1.5 w-2/3 bg-warm-gray rounded" />
                          <div className="h-1.5 w-5/6 bg-warm-gray rounded" />
                          <div className="h-1.5 w-1/2 bg-warm-gray rounded" />
                          <div className="h-1.5 w-11/12 bg-warm-gray rounded" />
                          <div className="h-1.5 w-3/4 bg-warm-gray rounded" />
                          <div className="h-2" />
                          <div className="h-1.5 w-full bg-warm-gray rounded" />
                          <div className="h-1.5 w-4/5 bg-warm-gray rounded" />
                          <div className="h-1.5 w-2/3 bg-warm-gray rounded" />
                        </div>
                      </div>
                    </div>
                    {/* Pager */}
                    <div className="flex items-center gap-3 mt-4">
                      <button className="w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-text-mid hover:text-text-dark transition-colors shrink-0" aria-label="Previous pages">
                        <ChevronLeft size={14} />
                      </button>
                      <div className="flex-1 h-1 bg-warm-gray rounded-full overflow-hidden">
                        <div className="h-full w-1/4 bg-primary rounded-full" />
                      </div>
                      <div className="text-[10px] font-medium text-text-mid tabular-nums shrink-0">3–4 / 12</div>
                      <button className="w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-text-mid hover:text-text-dark transition-colors shrink-0" aria-label="Next pages">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Chat Q&A */}
                  <div className="bg-off-white border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                        <MessageSquare size={12} className="text-primary" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[1px] text-text-light">Ask this document</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-primary text-primary-foreground text-[11px] leading-snug px-3 py-2 rounded-xl rounded-br-sm">
                          What's the vesting schedule for founders?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[85%] bg-background border border-border text-text-dark text-[11px] leading-snug px-3 py-2 rounded-xl rounded-bl-sm">
                          Standard 4-year vest with a 1-year cliff. Equity vests monthly after the cliff — see Section 3.2 for details.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="bg-background border border-border rounded-xl p-5 mb-3">
                    <div className="text-[10px] font-bold uppercase tracking-[1px] text-text-light mb-2.5">Interactive Document</div>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-text-dark py-20 md:py-24 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--accent)/0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-5">The Real Problem</div>
            <h2 className="font-heading text-3xl md:text-[38px] font-medium leading-[1.2] tracking-tight text-primary-foreground mb-5">
              {data.problemTitle}
            </h2>
            <p className="text-base leading-[1.7] text-primary-foreground/55 font-light">{data.problemDesc}</p>
          </div>
          <div className="flex flex-col gap-5">
            {data.problems.map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-5 md:p-6 rounded-xl border border-primary-foreground/8 bg-primary-foreground/4 hover:border-accent/30 hover:bg-accent/6 hover:translate-x-1 transition-all reveal">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-accent" />
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

      {/* What Changes */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-3.5">What Changes with Ezine</div>
            <h2 className="font-heading text-3xl md:text-[42px] font-bold tracking-tight leading-[1.15] text-text-dark mb-4">
              From static documents to<br /><em className="not-italic text-primary">interactive experiences</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.changes.map((item) => (
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

      {/* Why section */}
      <section className="bg-background py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">Why This Works</div>
            <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark mb-6">
              {data.whyTitle}
            </h2>
            <p className="text-[17px] leading-[1.75] text-text-mid font-light mb-8">{data.whyDesc}</p>
            <div className="mt-8 p-6 bg-red-bg/60 border-l-[3px] border-primary rounded-r-xl text-[15px] leading-[1.7] text-text-dark">
              "{data.quote}"
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {data.stats.map((stat) => (
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
        title={data.ctaTitle}
        body={data.ctaBody}
        buttonText={data.ctaButton}
        disclaimer="Free to use · No signup required to try"
      />
    </MarketingLayout>
  );
};

export default UseCasePage;
