import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FaqSection = () => {
  const faqs = [
    {
      q: "How do I create an interactive document with Ezine?",
      a: "Simply upload your document (PDF, Word, or other formats) using our drag-and-drop uploader. Ezine converts it into an interactive flipbook, lets you add AI-powered features, generate summaries, and share it easily.",
    },
    {
      q: "What types of documents can I create with Ezine?",
      a: "Ezine supports PDFs, Word documents, images, and presentations. You can turn any of these into interactive, AI-powered digital publications.",
    },
    {
      q: "Does Ezine provide document analytics and tracking?",
      a: "Yes! Ezine provides detailed analytics including who reads your document, how far they read, which sections get the most attention, and engagement metrics — all in real time.",
    },
    {
      q: "Is Ezine easy to use for non-technical users?",
      a: "Absolutely. Our platform is designed for everyone — no coding or technical skills required. Just upload, customize, and share.",
    },
    {
      q: "Is Ezine free to use?",
      a: "Yes, Ezine offers a free tier to get started. You can create and share interactive documents at no cost. Premium features are available for teams that need more.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-background py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16">
          {/* Left */}
          <div className="reveal">
            <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark mb-4">
              Any <span className="text-primary">Questions</span>?<br />Find here.
            </h2>
            <p className="text-sm text-text-mid font-light mb-6">
              Don't find your answer here? Just send us a message for any query.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline border border-primary rounded-lg px-5 py-2.5 hover:bg-red-bg transition-colors"
            >
              Contact us
            </a>
          </div>

          {/* Right: accordion */}
          <div className="space-y-3 reveal">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-off-white hover:bg-warm-gray transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-heading text-sm font-semibold text-text-dark pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-text-light flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 bg-off-white">
                    <p className="text-sm leading-[1.7] text-text-mid font-light">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
