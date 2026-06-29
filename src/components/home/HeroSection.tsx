import { Link } from "react-router-dom";
import FlipbookDemo from "./FlipbookDemo";

const HeroSection = () => {
  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-red-bg border border-primary/15 rounded-full px-4 py-1.5 text-[11px] font-medium text-text-mid tracking-wide mb-6 reveal">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
            From static PDF to living document in seconds
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-text-dark mb-5 reveal">
            Turn Any PDF into a Stunning,{" "}
            <span className="text-primary">
              <br />
              Interactive Flipbook
            </span>
          </h1>

          <p className="text-base leading-[1.7] text-text-mid font-light mb-8 max-w-[540px] mx-auto lg:mx-0 reveal">
            Convert reports, brochures, and manuals into clickable flipbooks with built-in Q&A. Your readers get answers, not just pages.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start reveal">
            <Link
              to="/signup"
              className="font-heading text-sm font-bold text-primary-foreground px-7 py-3 bg-primary rounded-full inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all uppercase tracking-wide shadow-md"
            >
              CREATE YOUR FIRST FLIPBOOK
            </Link>
            <a
              href="#what-is-ezflip"
              className="font-heading text-sm font-bold text-text-dark px-7 py-3 bg-background border border-border rounded-full inline-flex items-center justify-center gap-2 hover:border-primary/40 hover:text-primary transition-all uppercase tracking-wide"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Right: animated demo */}
        <div className="reveal">
          <FlipbookDemo />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
