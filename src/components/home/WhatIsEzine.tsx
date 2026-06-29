import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

const WhatIsEzine = () => {
  return (
    <section className="bg-off-white min-h-screen flex items-center px-5 md:px-12 py-24 md:py-32">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-heading text-[18px] font-medium tracking-tight leading-[1.1] text-text-dark mb-8">
          What is <span className="uppercase tracking-wider">EZFLIP</span>?
        </h2>
        <TextGradientScroll
          text="eZFlip helps you turn static documents and PDFs into interactive, AI-powered experiences. With built-in AI chat, users can ask questions, generate instant summaries, and track how your audience engages — all without changing how you create or share your content."
          type="word"
          textOpacity="soft"
          className="whatis-text text-[24px] md:text-[32px] leading-[1.65] text-text-dark font-light justify-center"
        />
      </div>
    </section>
  );
};

export default WhatIsEzine;
