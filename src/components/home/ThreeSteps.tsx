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
    <section className="bg-off-white py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-heading text-3xl md:text-[38px] font-extrabold tracking-tight leading-[1.15] text-text-dark">
            Create your own <span className="text-primary">AI-Powered Documents</span> in 3 simple steps!
          </h2>
          <p className="text-sm text-text-mid font-light mt-2">
            From document to interactive experience in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: laptop mockup */}
          <div className="reveal">
            <div className="relative">
              {/* Laptop body */}
              <div className="bg-background rounded-xl border border-border shadow-[0_16px_48px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="bg-warm-gray px-3 py-2 flex items-center gap-2 border-b border-border">
                  <div className="flex gap-[5px]">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-background rounded px-2 py-0.5 text-[9px] text-text-light border border-border text-center">
                    Converting your ezine experience to eZine
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col items-center">
                  <div className="w-full border-2 border-dashed border-primary/20 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 mx-auto bg-off-white rounded-full flex items-center justify-center mb-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                    </div>
                    <p className="font-heading text-sm font-bold text-text-dark">Drag & Drop</p>
                    <p className="text-xs text-text-light mt-0.5">or select files from device</p>
                  </div>
                  <div className="flex gap-2 mt-3 text-[9px] text-text-light">
                    <span className="bg-warm-gray px-2 py-0.5 rounded">PDF</span>
                    <span className="bg-warm-gray px-2 py-0.5 rounded">IMAGES</span>
                    <span className="bg-warm-gray px-2 py-0.5 rounded">DOCS</span>
                  </div>
                </div>
              </div>
              {/* Laptop base */}
              <div className="h-3 bg-border-strong rounded-b-xl mx-8" />

              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-3 h-3 border-2 border-primary rounded-sm rotate-12" />
              <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-accent rounded-full" />
            </div>
          </div>

          {/* Right: steps */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative reveal">
                <div className="flex gap-5 items-start">
                  <div className="font-heading text-[48px] md:text-[56px] font-extrabold text-text-dark leading-none tracking-tight opacity-90">
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-[1.75] text-text-mid font-light">{step.desc}</p>
                  </div>
                </div>
                {/* Decorative connector */}
                {i < steps.length - 1 && (
                  <div className="ml-10 mt-2 mb-0">
                    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-text-light/30">
                      <path d="M12 0C12 16 12 16 12 32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
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

export default ThreeSteps;
