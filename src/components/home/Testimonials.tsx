import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Loved it ever... loved the most. For a nontechnical doc like me, it's invaluable. Transforms something that most people just make boring digital flipbooks — and eZine keeps the audience for you to focus on.",
      name: "Moksh Mishra",
      color: "bg-accent",
    },
    {
      quote: "The tool has made a big difference in how I manage my team. Everything is well-organized, and the AI chatbot is a huge plus — it gives information from a deeper understanding of content. Overall, it's modern, easy to use, clean, and straightforward. Definitely worth using!",
      name: "Arvind",
      color: "bg-ink",
    },
    {
      quote: "Love the flip book feel, and chatting with the content is great. Clean design, and works really well!",
      name: "Lakshya Teki",
      color: "bg-text-mid",
    },
    {
      quote: "Love how Ezine transforms static docs and PDFs into more conversational, interactive content. The AI features are really well executed. Definitely looking forward to what's next!",
      name: "Pranay M",
      color: "bg-primary",
    },
  ];

  const [page, setPage] = useState(0);

  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between mb-10 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark">
            You're gonna love<br />us forever.
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setPage(Math.max(0, page - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-off-white transition-colors">
              <ChevronLeft size={16} className="text-text-mid" />
            </button>
            <button onClick={() => setPage(Math.min(1, page + 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-off-white transition-colors">
              <ChevronRight size={16} className="text-text-mid" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-off-white rounded-2xl p-6 border border-border hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,21,18,0.06)] transition-all duration-300 reveal"
            >
              {/* Quote icon */}
              <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center mb-5`}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary-foreground" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
              </div>
              <p className="text-[13px] leading-[1.75] text-text-mid font-light mb-5">{t.quote}</p>
              <p className="text-sm font-semibold text-text-dark">— {t.name}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          <span className={`w-6 h-1.5 rounded-full transition-colors ${page === 0 ? "bg-primary" : "bg-border"}`} />
          <span className={`w-6 h-1.5 rounded-full transition-colors ${page === 1 ? "bg-primary" : "bg-border"}`} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
