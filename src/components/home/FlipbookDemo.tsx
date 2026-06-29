import { useEffect, useState } from "react";
import { Upload, FileText, Sparkles, MessageSquare, Check } from "lucide-react";

export const STEPS = ["idle", "drop", "process", "result"] as const;
export type DemoStep = typeof STEPS[number];

interface FlipbookDemoProps {
  activeStep?: DemoStep;
  onStepChange?: (step: DemoStep) => void;
  pausedToken?: number; // change to pause/reset auto-advance after manual interaction
}

const FlipbookDemo = ({ activeStep, onStepChange, pausedToken }: FlipbookDemoProps) => {
  const [step, setStep] = useState<DemoStep>(activeStep ?? "idle");

  // Sync from external activeStep
  useEffect(() => {
    if (activeStep && activeStep !== step) {
      setStep(activeStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  // Auto-advance
  useEffect(() => {
    const timings: Record<DemoStep, number> = { idle: 1500, drop: 1600, process: 1800, result: 3200 };
    const t = setTimeout(() => {
      setStep((s) => {
        const next = STEPS[(STEPS.indexOf(s) + 1) % STEPS.length];
        return next;
      });
    }, timings[step]);
    return () => clearTimeout(t);
  }, [step, pausedToken]);

  useEffect(() => {
    onStepChange?.(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div className="relative">
      <div className="bg-background rounded-2xl border border-border shadow-[0_24px_70px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-warm-gray px-4 py-2.5 flex items-center gap-2.5 border-b border-border">
          <div className="flex gap-[6px]">
            <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-background rounded-md px-3 py-1 text-[10px] text-text-light font-medium border border-border text-center">
            ezflip.ai / convert
          </div>
        </div>

        {/* Stage */}
        <div className="relative h-[340px] md:h-[380px] overflow-hidden bg-gradient-to-br from-off-white via-background to-red-bg/40">
          {/* IDLE / DROP — upload zone */}
          <div
            className={`absolute inset-0 p-8 md:p-10 flex flex-col items-center justify-center transition-all duration-500 ${
              step === "idle" || step === "drop" ? "opacity-100" : "opacity-0 -translate-y-3 pointer-events-none"
            }`}
          >
            <div
              className={`relative w-full max-w-[360px] border-2 border-dashed rounded-2xl py-10 px-6 flex flex-col items-center transition-all duration-500 ${
                step === "drop" ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-background/60"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                  step === "drop" ? "bg-primary text-primary-foreground scale-110" : "bg-off-white text-primary"
                }`}
              >
                <Upload size={22} />
              </div>
              <p className="font-heading text-lg font-extrabold text-text-dark">Drag & Drop</p>
              <p className="text-xs text-text-mid font-light mt-0.5">or select files from device</p>
              <p className="text-[10px] text-text-light mt-4">PDFs · Images · Docs</p>

              {/* Flying file card */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out ${
                  step === "drop"
                    ? "top-1/2 -translate-y-1/2 opacity-100 scale-100 rotate-0"
                    : "-top-20 opacity-0 scale-75 -rotate-6"
                }`}
              >
                <div className="bg-background border border-border shadow-lg rounded-lg px-3 py-2 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <FileText size={14} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-semibold text-text-dark leading-none">report-q4.pdf</p>
                    <p className="text-[9px] text-text-light mt-0.5">2.4 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROCESS — progress */}
          <div
            className={`absolute inset-0 p-8 md:p-10 flex flex-col items-center justify-center transition-all duration-500 ${
              step === "process" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-full max-w-[320px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                  <Sparkles size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-dark">Converting to eZFlip</p>
                  <p className="text-[10px] text-text-light">AI is reading your document…</p>
                </div>
              </div>
              <div className="h-1.5 bg-warm-gray rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-[1500ms] ease-out"
                  style={{ width: step === "process" ? "100%" : "0%" }}
                />
              </div>
              <div className="mt-4 space-y-1.5">
                {["Parsing pages", "Extracting insights", "Building flipbook"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2 text-[11px] text-text-mid">
                    <div
                      className="w-3.5 h-3.5 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300"
                      style={{ transitionDelay: `${i * 350}ms`, opacity: step === "process" ? 1 : 0.3 }}
                    >
                      <Check size={9} className="text-primary" strokeWidth={3} />
                    </div>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RESULT — flipbook + AI chat */}
          <div
            className={`absolute inset-0 p-6 md:p-8 transition-all duration-500 ${
              step === "result" ? "opacity-100" : "opacity-0 translate-y-3 pointer-events-none"
            }`}
          >
            <div className="relative h-full flex items-center justify-center">
              <div className="relative flex shadow-2xl rounded-md overflow-hidden">
                <div className="w-[110px] h-[170px] bg-background border-r border-border p-2.5">
                  <div className="h-2 w-3/4 bg-primary/30 rounded mb-2" />
                  <div className="space-y-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="h-1 bg-text-light/20 rounded" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
                    ))}
                  </div>
                </div>
                <div className="w-[110px] h-[170px] bg-off-white p-2.5">
                  <div className="h-8 w-full bg-gradient-to-br from-primary/20 to-accent/20 rounded mb-2" />
                  <div className="space-y-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1 bg-text-light/20 rounded" style={{ width: `${50 + ((i * 17) % 45)}%` }} />
                    ))}
                  </div>
                </div>
                <div
                  className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  style={{
                    left: "50%",
                    animation: step === "result" ? "shimmer 2.5s ease-in-out infinite" : "none",
                  }}
                />
              </div>

              <div
                className={`absolute -right-2 md:right-4 top-4 bg-background border border-border rounded-xl shadow-lg p-3 max-w-[180px] transition-all duration-700 ${
                  step === "result" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <MessageSquare size={10} className="text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-semibold text-text-dark">eZFlip AI</span>
                </div>
                <p className="text-[11px] text-text-mid leading-snug">
                  Summary ready. Revenue grew <span className="text-primary font-semibold">28%</span> YoY.
                </p>
              </div>

              <div
                className={`absolute left-4 bottom-6 transition-all duration-700 ${
                  step === "result" ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div className="bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-[10px] font-bold flex items-center gap-1 shadow-md">
                  <Sparkles size={10} />
                  Interactive
                </div>
              </div>
            </div>
          </div>

          {/* Step dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {STEPS.map((s) => (
              <span
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  step === s ? "w-5 bg-primary" : "w-1.5 bg-text-light/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative red circle */}
      <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
    </div>
  );
};

export default FlipbookDemo;
