import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FaqSection = () => {
  const faqs = [
    {
      q: "How do I create an interactive document with eZFlip?",
      a: "Simply upload your document (PDF, Word, or other formats) using our drag-and-drop uploader. eZFlip converts it into an interactive flipbook, lets you add AI-powered features, generate summaries, and share it easily.",
    },
    {
      q: "What types of documents can I create with eZFlip?",
      a: "eZFlip supports PDFs, Word documents, images, and presentations. You can turn any of these into interactive, AI-powered digital publications.",
    },
    {
      q: "Does eZFlip provide document analytics and tracking?",
      a: "Yes! eZFlip provides detailed analytics including who reads your document, how far they read, which sections get the most attention, and engagement metrics — all in real time.",
    },
    {
      q: "Is eZFlip easy to use for non-technical users?",
      a: "Absolutely. Our platform is designed for everyone — no coding or technical skills required. Just upload, customize, and share.",
    },
    {
      q: "Is eZFlip free to use?",
      a: "Yes, eZFlip offers a free tier to get started. You can create and share interactive documents at no cost. Premium features are available for teams that need more.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-off-white py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16">
          {/* Left */}
          <div className="reveal">
            <h2 className="font-heading text-3xl md:text-[38px] font-extrabold tracking-tight leading-[1.1] text-text-dark mb-3">
              Any <span className="text-primary">Questions</span>?<br />Find here.
            </h2>
            <p className="text-sm text-text-mid font-light mb-6">
              Don't find your answer here? Just send us a message for any query.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center text-sm font-semibold text-primary no-underline border border-primary rounded-lg px-6 py-2.5 hover:bg-red-bg transition-colors"
            >
              Contact us
            </a>
          </div>

          {/* Right: accordion */}
          <div className="space-y-2.5 reveal">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden bg-background">
                <button
                  className="w-full flex items-center justify-between p-4 px-5 text-left hover:bg-off-white transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-heading text-[13px] font-semibold text-text-dark pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-text-light flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] leading-[1.7] text-text-mid font-light">{faq.a}</p>
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
