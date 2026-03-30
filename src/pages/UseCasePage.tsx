import { useParams, Navigate } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, Check, FileText, HelpCircle, Clock, Share2, Zap, MessageSquare } from "lucide-react";
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
    title: <>Turn Your Writing Into<br />Something People<br /><em className="not-italic text-primary">Actually Read</em></>,
    subtitle: "Your content deserves more than a PDF attachment. Turn long-form writing into interactive, shareable documents that readers engage with — not just download and forget.",
    problemTitle: <>Great writing gets buried<br /><em className="not-italic text-primary">in static formats.</em></>,
    problemDesc: "You spend hours crafting content — whitepapers, guides, proposals — only to share them as PDFs that get downloaded and never opened again.",
    problems: [
      { icon: FileText, title: "PDFs get downloaded but not read", desc: "Readers save them with good intentions, but static files don't invite engagement." },
      { icon: HelpCircle, title: "No way to know if anyone read it", desc: "You share your work and hope for the best — no analytics, no feedback loop." },
      { icon: Clock, title: "Updating means resharing", desc: "Every edit requires sending a new file. Old versions float around forever." },
    ],
    changes: [
      { num: "01", title: "Make content easy to navigate", desc: "Readers jump directly to the section they care about — no scrolling through everything to find the one part that matters." },
      { num: "02", title: "Let readers ask questions", desc: "Built-in AI chat lets readers ask questions about your content and get instant answers — increasing engagement and comprehension.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "Share with a single link", desc: "No attachments, no file versions. Share one link via email, social, or embed it anywhere. Always up to date, always accessible." },
    ],
    whyTitle: "Your writing, working harder for you.",
    whyDesc: "When your content is interactive and easy to navigate, readers stay longer, engage deeper, and actually absorb what you've written.",
    quote: "Stop sending PDFs people download and forget. Make your writing something they come back to.",
    stats: [
      { icon: MessageSquare, value: "Higher reader engagement", label: "Interactive format keeps readers engaged with your content" },
      { icon: Zap, value: "Instant content updates", label: "Update once — every reader sees the latest version automatically" },
      { icon: Check, value: "AI-powered Q&A", label: "Readers ask questions and get answers from your content instantly" },
      { icon: Share2, value: "Share anywhere", label: "One link works across email, social media, and embedded contexts" },
    ],
    ctaTitle: <>Make your writing<br /><em className="not-italic text-primary">work harder.</em></>,
    ctaBody: "Upload your document and turn it into an interactive, shareable experience in under a minute.",
    ctaButton: "Try it with your document",
  },
  "marketing-teams": {
    badge: "For Marketing Teams",
    title: <>Marketing Collateral<br />That Actually Gets<br /><em className="not-italic text-primary">Engaged With</em></>,
    subtitle: "Brochures, case studies, and sales decks deserve more than a static PDF. Make your marketing materials interactive, trackable, and easy to share.",
    problemTitle: <>Beautiful content that<br /><em className="not-italic text-primary">nobody interacts with.</em></>,
    problemDesc: "Your team creates polished marketing materials — but once they're exported as PDFs, engagement drops. Readers skim, skip, and move on.",
    problems: [
      { icon: FileText, title: "Brochures get skimmed, not studied", desc: "Beautifully designed collateral loses its impact when readers can't navigate or search it." },
      { icon: HelpCircle, title: "No visibility into engagement", desc: "You don't know which sections readers care about or where they drop off." },
      { icon: Clock, title: "Every update means a new file", desc: "Version control becomes a nightmare. Old brochures circulate long after they're outdated." },
    ],
    changes: [
      { num: "01", title: "Interactive navigation", desc: "Readers jump to the section they need — product specs, pricing, case studies — without scrolling through everything." },
      { num: "02", title: "AI-powered answers", desc: "Prospects can ask questions about your product directly within the brochure and get instant, accurate answers.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "One link, always current", desc: "Share a single link that always shows the latest version. Embed it on your website, send it via email, or drop it in Slack." },
    ],
    whyTitle: "Marketing materials that sell, not just inform.",
    whyDesc: "When prospects can interact with your content — navigate it, search it, ask questions — they engage deeper and convert faster.",
    quote: "Your brochure should be a conversation starter, not a download that sits in someone's folder.",
    stats: [
      { icon: MessageSquare, value: "Deeper prospect engagement", label: "Interactive format keeps prospects exploring your content" },
      { icon: Zap, value: "Always up to date", label: "Update content once — every shared link reflects the change instantly" },
      { icon: Check, value: "Built-in AI Q&A", label: "Prospects get answers about your product without leaving the document" },
      { icon: Share2, value: "Frictionless sharing", label: "One link works everywhere — email, social, website embeds" },
    ],
    ctaTitle: <>Make your collateral<br /><em className="not-italic text-primary">convert better.</em></>,
    ctaBody: "Upload any marketing PDF and turn it into an interactive experience your prospects will actually engage with.",
    ctaButton: "Try it with your collateral",
  },
  "sales-reps": {
    badge: "For Sales Reps",
    title: <>Sales Documents<br />That Close Deals<br /><em className="not-italic text-primary">Faster</em></>,
    subtitle: "Proposals, pitch decks, and product guides shouldn't just look good — they should help prospects find answers and move forward without waiting for a follow-up call.",
    problemTitle: <>Your sales docs are thorough.<br /><em className="not-italic text-primary">They're just hard to use.</em></>,
    problemDesc: "You send detailed proposals and product guides, but prospects rarely read them cover to cover. They want specific answers — and can't find them fast enough.",
    problems: [
      { icon: FileText, title: "Proposals get skimmed, not read", desc: "Prospects jump to pricing, skip the rest, and miss the value proposition you carefully built." },
      { icon: HelpCircle, title: "Follow-up calls for basic questions", desc: "Questions about features, timelines, or terms that were already in the document — but nobody found them." },
      { icon: Clock, title: "Static docs slow down the deal", desc: "Every revision means a new email, a new attachment, and confusion about which version is current." },
    ],
    changes: [
      { num: "01", title: "Prospects find what they need instantly", desc: "Interactive navigation lets prospects jump directly to pricing, features, case studies, or any section — no scrolling required." },
      { num: "02", title: "AI answers prospect questions", desc: "Built-in AI chat lets prospects ask questions about your proposal and get instant answers — reducing back-and-forth and accelerating decisions.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "Always-current, always accessible", desc: "Share one link that always reflects the latest version. No more 'which version did I send?' confusion." },
    ],
    whyTitle: "Fewer follow-ups. Faster closes.",
    whyDesc: "When prospects can self-serve answers from your proposals, deals move faster. Less waiting, fewer calls about things already documented, and more time actually selling.",
    quote: "Your proposal should answer questions, not create them. Make it work for you even when you're not in the room.",
    stats: [
      { icon: MessageSquare, value: "Fewer follow-up calls", label: "Prospects find answers themselves instead of waiting for your reply" },
      { icon: Zap, value: "Faster deal cycles", label: "Interactive docs reduce friction and keep momentum going" },
      { icon: Check, value: "AI-powered Q&A", label: "Prospects ask and get answers directly from your proposal" },
      { icon: Share2, value: "One link, always current", label: "No more version confusion — always share the latest" },
    ],
    ctaTitle: <>Close deals<br /><em className="not-italic text-primary">faster.</em></>,
    ctaBody: "Upload your sales proposal and give prospects an interactive way to find every answer they need.",
    ctaButton: "Try it with your proposal",
  },
  "educators": {
    badge: "For Educators",
    title: <>Course Materials<br />Students Will<br /><em className="not-italic text-primary">Actually Use</em></>,
    subtitle: "Textbooks, study guides, and course handouts shouldn't just be PDFs students download and forget. Make them interactive, searchable, and always accessible.",
    problemTitle: <>Students have the materials.<br /><em className="not-italic text-primary">They just can't find what they need.</em></>,
    problemDesc: "You create comprehensive course materials — but students struggle to navigate them, find specific topics, or review before exams without reading everything again.",
    problems: [
      { icon: FileText, title: "Course materials are too long to navigate", desc: "Students scroll through 100-page PDFs trying to find one topic. Most give up and ask the professor instead." },
      { icon: HelpCircle, title: "Same questions, every semester", desc: "Students ask questions that are clearly answered in the materials — they just can't find the answers quickly enough." },
      { icon: Clock, title: "Outdated versions circulate", desc: "Updated materials don't reach every student. Old versions get shared in group chats and cause confusion." },
    ],
    changes: [
      { num: "01", title: "Navigate to any topic instantly", desc: "Students jump directly to the chapter, section, or topic they need — no endless scrolling through the entire document." },
      { num: "02", title: "Ask questions, get answers from the material", desc: "Built-in AI chat lets students type a question and get an answer pulled directly from the course material — like having a study buddy available 24/7.", link: "/features/ai-chat", linkText: "Learn about AI Chat →" },
      { num: "03", title: "Share one link, always current", desc: "Post a single link on your LMS or send via email. Every student always accesses the latest version — no confusion, no outdated files." },
    ],
    whyTitle: "Better learning outcomes, less admin overhead.",
    whyDesc: "When students can find answers independently, they learn more effectively. Fewer repeated questions means more time for meaningful teaching.",
    quote: "Your course materials should be a learning tool, not just a file students download and forget about.",
    stats: [
      { icon: MessageSquare, value: "Fewer repeated questions", label: "Students find answers in the material instead of emailing you" },
      { icon: Zap, value: "Better exam preparation", label: "Students use AI chat to review and find specific topics quickly" },
      { icon: Check, value: "24/7 study companion", label: "AI-powered Q&A available anytime, from any device" },
      { icon: Share2, value: "Always up to date", label: "One link ensures every student has the latest materials" },
    ],
    ctaTitle: <>Make learning<br /><em className="not-italic text-primary">more accessible.</em></>,
    ctaBody: "Upload your course materials and give students an interactive, AI-powered way to learn.",
    ctaButton: "Try it with your course material",
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
                  Document Preview · Ezine
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-text-dark py-20 md:py-24 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--primary)/0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">The Real Problem</div>
            <h2 className="font-heading text-3xl md:text-[38px] font-bold leading-[1.2] tracking-tight text-primary-foreground mb-5">
              {data.problemTitle}
            </h2>
            <p className="text-base leading-[1.7] text-primary-foreground/55 font-light">{data.problemDesc}</p>
          </div>
          <div className="flex flex-col gap-5">
            {data.problems.map((item) => (
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
                <div className="font-heading text-5xl font-extrabold text-warm-gray leading-none tracking-[-2px] mb-4">{item.num}</div>
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
