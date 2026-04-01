import { ArrowRight } from "lucide-react";

interface CtaSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  buttonText: string;
  buttonHref?: string;
  disclaimer?: string;
}

const CtaSection = ({ eyebrow, title, body, buttonText, buttonHref = "https://www.ezine.digital", disclaimer = "Free to use · No credit card required" }: CtaSectionProps) => {
  return (
    <section className="bg-ink py-24 md:py-32 px-5 md:px-12 text-center relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.15)_0%,transparent_65%)] pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
      }} />

      <div className="max-w-[620px] mx-auto relative z-10">
        {eyebrow && (
          <div className="text-xs font-bold tracking-[2px] uppercase text-primary mb-5">{eyebrow}</div>
        )}
        <h2 className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-[1.05] text-primary-foreground mb-5">
          {title}
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-primary-foreground/50 font-light mb-11">
          {body}
        </p>
        <div className="flex flex-col items-center gap-3.5">
          <a
            href={buttonHref}
            className="font-heading text-base font-bold text-accent-foreground no-underline px-12 py-4 bg-accent rounded-xl inline-flex items-center gap-2.5 shadow-[0_4px_16px_hsl(var(--accent)/0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(var(--accent)/0.35)] transition-all duration-300"
          >
            {buttonText}
            <ArrowRight size={18} />
          </a>
          <span className="text-xs text-primary-foreground/28">{disclaimer}</span>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
