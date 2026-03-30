const Testimonials = () => {
  const testimonials = [
    {
      quote: "Loved it ever... loved the most. For a nontechnical doc like me, it's invaluable. Transforms something that most people just make boring digital flipbooks — and eZine keeps the audience for you to focus on.",
      name: "Moksh Mishra",
      avatar: "M",
    },
    {
      quote: "The tool has made a big difference in how I manage my team. Everything is well-organized, and the AI chatbot is a huge plus — it gives information from a deeper understanding of content. Overall, it's modern, easy to use, clean, and straightforward. Definitely worth using!",
      name: "Arvind",
      avatar: "A",
    },
    {
      quote: "Love the flip book feel, and chatting with the content is great. Clean design, and works really well!",
      name: "Lakshya Teki",
      avatar: "L",
    },
    {
      quote: "Love how Ezine transforms static docs and PDFs into more conversational, interactive content. The AI features are really well executed. Definitely looking forward to what's next!",
      name: "Pranay M",
      avatar: "P",
    },
  ];

  return (
    <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-14 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark">
            You're gonna love<br />us forever.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-2xl p-6 border border-border hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,21,18,0.08)] transition-all duration-300 reveal"
            >
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-[1.7] text-text-mid font-light mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center">
                  {t.avatar}
                </div>
                <span className="text-sm font-semibold text-text-dark">— {t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
