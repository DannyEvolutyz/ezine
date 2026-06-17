import { useState, useCallback } from "react";
import FlipbookDemo, { type DemoStep } from "./FlipbookDemo";

const ThreeSteps = () => {
  const steps = [
    {
      num: "1",
      title: "Drag & Drop or Select your file",
      desc: "Simply grab and drop your content — whether it's a PDF, images, or documents, our intuitive platform allows you to effortlessly add your content with a simple drag and drop or file selection. No technical skills required.",
      demoSteps: ["idle", "drop"] as DemoStep[],
      jumpTo: "drop" as DemoStep,
    },
    {
      num: "2",
      title: "Publish your EZINE",
      desc: "Once your content is uploaded, hit Publish to bring your eZine to life. Preview your creation before it goes live — it's that simple and intuitive.",
      demoSteps: ["process"] as DemoStep[],
      jumpTo: "process" as DemoStep,
    },
    {
      num: "3",
      title: "Share your Masterpiece",
      desc: "Congratulations! Your interactive eZine is now alive. It's time to share it with the world. With just one link, you can share it from your website, social media channels, or any email — making it effortlessly accessible to everyone.",
      demoSteps: ["result"] as DemoStep[],
      jumpTo: "result" as DemoStep,
    },
  ];

  const [demoStep, setDemoStep] = useState<DemoStep>("idle");
  const [overrideStep, setOverrideStep] = useState<DemoStep | undefined>(undefined);
  const [pauseToken, setPauseToken] = useState(0);

  const handleStepChange = useCallback((s: DemoStep) => {
    setDemoStep(s);
    // clear override once demo has caught up to it
    setOverrideStep((cur) => (cur === s ? undefined : cur));
  }, []);

  const activeIndex = steps.findIndex((st) => st.demoSteps.includes(demoStep));

  const handleClickStep = (jumpTo: DemoStep) => {
    setOverrideStep(jumpTo);
    setDemoStep(jumpTo);
    setPauseToken((t) => t + 1);
  };

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
          {/* Left: animated demo (sticky on desktop) */}
          <div className="reveal lg:sticky lg:top-24">
            <FlipbookDemo
              activeStep={overrideStep}
              onStepChange={handleStepChange}
              pausedToken={pauseToken}
            />
          </div>

          {/* Right: steps */}
          <div className="space-y-8">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={step.num} className="relative reveal">
                  <button
                    type="button"
                    onClick={() => handleClickStep(step.jumpTo)}
                    className={`w-full text-left flex gap-5 items-start transition-all duration-500 rounded-xl p-3 -m-3 ${
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <div
                      className={`font-heading text-[48px] md:text-[56px] font-extrabold leading-none tracking-tight transition-all duration-500 ${
                        isActive ? "text-primary scale-110" : "text-text-dark"
                      }`}
                    >
                      {step.num}
                    </div>
                    <div className="pt-2">
                      <h3
                        className={`font-heading text-lg font-bold mb-2 transition-colors duration-500 ${
                          isActive ? "text-text-dark" : "text-text-dark"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-[1.75] text-text-mid font-light">{step.desc}</p>
                    </div>
                  </button>
                  {i < steps.length - 1 && (
                    <div className="ml-10 mt-2 mb-0">
                      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-text-light/30">
                        <path d="M12 0C12 16 12 16 12 32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeSteps;
