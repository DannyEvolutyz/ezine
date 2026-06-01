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
    {
      quote: "Ezine completely changed how we share onboarding material. New hires actually read the docs now — and the AI Q&A means fewer repeat questions in Slack. A small change with huge impact for our people ops team.",
      name: "Sneha Kapoor",
      color: "bg-primary",
    },
    {
      quote: "As a marketer, the engagement insights are gold. I finally know which pages of my reports people actually read. The flipbook experience feels premium and our clients have noticed the difference immediately.",
      name: "Daniel Ortiz",
      color: "bg-accent",
    },
    {
      quote: "Setup took minutes, not days. We replaced three tools with Ezine and the team adopted it instantly. The interface is genuinely a joy — rare for a B2B product. Highly recommend to any content-heavy team.",
      name: "Rhea Bansal",
      color: "bg-ink",
    },
    {
      quote: "We use Ezine for investor updates and the response has been incredible. People spend more time with the content and the AI chat answers their questions before they even email us. A real unlock for our team.",
      name: "Marcus Lee",
      color: "bg-text-mid",
    },
  ];

  const perPage = 4;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const [page, setPage] = useState(0);

  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between mb-10 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark">
            You're gonna love<br />us forever.
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={goPrev} aria-label="Previous testimonials" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-off-white transition-colors">
              <ChevronLeft size={16} className="text-text-mid" />
            </button>
            <button onClick={goNext} aria-label="Next testimonials" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-off-white transition-colors">
              <ChevronRight size={16} className="text-text-mid" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, p) => (
              <div key={p} className="shrink-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {testimonials.slice(p * perPage, p * perPage + perPage).map((t) => (
                  <div
                    key={t.name}
                    className="bg-off-white rounded-2xl p-6 border border-border hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,21,18,0.06)] transition-all duration-300"
                  >
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
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`w-6 h-1.5 rounded-full transition-colors ${page === i ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
