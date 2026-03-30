import { Layers, MessageSquare, FileText, Share2 } from "lucide-react";

const WhyEzine = () => {
  const features = [
    {
      icon: Layers,
      title: "PDF to Interactive Flipbook Converter",
      desc: "Transform static PDFs into visually rich, easy-to-navigate, swipe-ready digital flipbooks. Elevate boring content.",
    },
    {
      icon: MessageSquare,
      title: "AI Chat for Your Documents",
      desc: "Let users ask questions and get precise answers pulled directly from the document — no scrolling, no searching, no guessing.",
    },
    {
      icon: FileText,
      title: "Instant Document Summaries",
      desc: "Auto-generate concise, meaningful summaries of any document — so readers can get the gist before diving into the detail.",
    },
    {
      icon: Share2,
      title: "Seamless Document Sharing",
      desc: "Share documents with a single link. No attachments, no downloads. Email, WhatsApp, Slack — works everywhere, opens instantly.",
    },
  ];

  return (
    <section className="bg-background py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-heading text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-text-dark mb-4">
            Why <span className="text-primary">Ezine</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-off-white rounded-2xl p-7 border border-border hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,21,18,0.08)] hover:border-transparent transition-all duration-300 relative overflow-hidden group reveal"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              <div className="w-12 h-12 rounded-xl bg-red-bg flex items-center justify-center mb-5">
                <feature.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading text-base font-bold text-text-dark leading-[1.3] tracking-tight mb-2.5">{feature.title}</h3>
              <p className="text-sm leading-[1.7] text-text-mid font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEzine;
