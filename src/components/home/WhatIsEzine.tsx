const WhatIsEzine = () => {
  return (
    <section className="bg-off-white min-h-[80vh] flex items-center px-5 md:px-12 py-16 md:py-20">
      <div className="max-w-[800px] mx-auto text-center reveal">
        <h2 className="font-heading text-[18px] font-medium tracking-tight leading-[1.1] text-text-dark mb-8">
          What is <span className="uppercase tracking-wider">EZINE</span>?
        </h2>
        <p className="whatis-text text-[24px] md:text-[32px] leading-[1.35] text-text-mid font-light">
          Ezine helps you turn static documents and PDFs into <span className="font-semibold text-text-dark">interactive</span>, <span className="font-semibold text-text-dark">AI-powered</span> experiences. With built-in AI chat, users can ask questions, generate <span className="font-semibold text-text-dark">instant summaries</span>, and <span className="font-semibold text-text-dark">track</span> how your audience <span className="font-semibold text-text-dark">engages</span> — all without changing how you create or share your content.
        </p>
      </div>
    </section>
  );
};

export default WhatIsEzine;
