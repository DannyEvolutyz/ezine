const ThreeSteps = () => {
  const steps = [
    {
      num: "1",
      title: "Drag & Drop or Select your file",
      desc: "Simply grab and drop your content — whether it's a PDF, images, or documents, our intuitive platform allows you to effortlessly add your content with a simple drag and drop or file selection. No technical skills required.",
    },
    {
      num: "2",
      title: "Publish your EZINE",
      desc: "Once your content is uploaded, hit Publish to bring your eZine to life. Preview your creation before it goes live — it's that simple and intuitive.",
    },
    {
      num: "3",
      title: "Share your Masterpiece",
      desc: "Congratulations! Your interactive eZine is now alive. It's time to share it with the world. With just one link, you can share it from your website, social media channels, or any email — making it effortlessly accessible to everyone.",
    },
  ];

  return (
    <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark">
            Create your own <span className="text-primary">AI-Powered Documents</span> in 3 simple steps!
          </h2>
          <p className="text-base text-text-mid font-light mt-3">
            From document to interactive experience in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">
          {/* Left: visual mockup */}
          <div className="reveal">
            <div className="bg-background rounded-2xl border border-border shadow-[0_12px_40px_rgba(26,21,18,0.06)] overflow-hidden">
              <div className="bg-warm-gray p-3.5 flex items-center gap-3 border-b border-border">
                <div className="flex gap-[6px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 text-center text-xs text-text-light font-medium">
                  Converting your ezine experience to eZine
                </div>
              </div>
              <div className="p-8 flex flex-col items-center">
                <div className="w-full border-2 border-dashed border-primary/25 rounded-xl p-8 text-center">
                  <div className="w-10 h-10 mx-auto bg-red-bg rounded-full flex items-center justify-center mb-3">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  </div>
                  <p className="font-heading text-sm font-bold text-text-dark">Drag & Drop</p>
                  <p className="text-xs text-text-light mt-1">or select files from device</p>
                </div>
                <div className="flex gap-2 mt-4 text-[10px] text-text-light">
                  <span className="bg-warm-gray px-2 py-1 rounded">PDF</span>
                  <span className="bg-warm-gray px-2 py-1 rounded">IMAGES</span>
                  <span className="bg-warm-gray px-2 py-1 rounded">DOCS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: steps */}
          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5 reveal">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg flex items-center justify-center">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{step.title}</h3>
                  <p className="text-sm leading-[1.75] text-text-mid font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeSteps;
