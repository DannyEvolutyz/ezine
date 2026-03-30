import { Upload } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      <div className="max-w-[900px] mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-bg border border-primary/15 rounded-full px-4 py-1.5 text-[11px] font-medium text-text-mid tracking-wide mb-8 reveal">
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          Converting your reading experience to eZine
        </div>

        <h1 className="font-heading text-3xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-text-dark mb-5 reveal">
          Turn Static Documents into Interactive,<br />
          <span className="text-primary">AI-Powered Experiences</span>
        </h1>

        <p className="text-base leading-[1.7] text-text-mid font-light mb-10 max-w-[580px] mx-auto reveal">
          Transform PDFs and documents into interactive experiences with built-in AI chat and instant summaries — free to get started.
        </p>

        {/* Browser mockup */}
        <div className="max-w-[560px] mx-auto relative reveal">
          <div className="bg-background rounded-2xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-warm-gray px-4 py-2.5 flex items-center gap-2.5 border-b border-border">
              <div className="flex gap-[6px]">
                <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-background rounded-md px-3 py-1 text-[10px] text-text-light font-medium border border-border text-center">
                Converting your ezine experience to eZine
              </div>
            </div>

            {/* Upload area */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-off-white flex items-center justify-center mb-5">
                  <Upload size={24} className="text-primary" />
                </div>
                <p className="font-heading text-xl font-extrabold text-text-dark italic mb-1">Drag & Drop</p>
                <p className="text-sm text-text-mid font-light">or select files from device</p>
                <p className="text-[11px] text-text-light mt-5">Let it be PDFs, Images or docs, documents</p>
              </div>
            </div>
          </div>

          {/* Decorative red circle */}
          <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
