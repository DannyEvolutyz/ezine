import { Upload } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-background py-20 md:py-28 px-5 md:px-12 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--primary)/0.06)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--accent)/0.05)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-red-bg border border-primary/15 rounded-full px-4 py-1.5 text-xs font-semibold text-primary tracking-wide uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
          Converting your reading experience to eZine
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.08] tracking-tight text-text-dark mb-6 reveal">
          Turn Static Documents into Interactive,<br />
          <em className="not-italic text-primary">AI-Powered Experiences</em>
        </h1>

        <p className="text-lg leading-[1.75] text-text-mid font-light mb-12 max-w-[640px] mx-auto reveal">
          Transform PDFs and documents into interactive experiences with built-in AI chat and instant summaries — free to get started.
        </p>

        {/* Upload area mockup */}
        <div className="max-w-[480px] mx-auto reveal">
          <a
            href="https://www.ezine.digital"
            className="block bg-background border-2 border-dashed border-primary/30 rounded-2xl p-10 md:p-14 hover:border-primary/60 hover:bg-red-bg transition-all group no-underline"
          >
            <div className="w-16 h-16 mx-auto bg-red-bg rounded-full flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
              <Upload size={28} className="text-primary" />
            </div>
            <p className="font-heading text-lg font-bold text-text-dark mb-1">Drag & Drop</p>
            <p className="text-sm text-text-mid font-light">or select files from device</p>
            <p className="text-xs text-text-light mt-4">Let it be PDFs, Images or docs, documents</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
