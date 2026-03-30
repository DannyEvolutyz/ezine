import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-ink text-primary-foreground/60">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-primary-foreground">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-primary-foreground">
                e<span className="text-primary">Z</span>ine
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/40">
              Turn your boring docs into smart, swipe-able digital publications with AI.
            </p>
            <p className="text-xs mt-4 text-primary-foreground/30">by Evolutyz</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-primary-foreground/80 mb-4 tracking-wide uppercase">
              Product
            </h4>
            <ul className="space-y-3 list-none">
              <li><Link to="/features/ai-chat" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">AI Chat</Link></li>
              <li><a href="https://www.ezine.digital" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">Features</a></li>
              <li><Link to="/compare" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">Comparison</Link></li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-primary-foreground/80 mb-4 tracking-wide uppercase">
              Use Cases
            </h4>
            <ul className="space-y-3 list-none">
              <li><Link to="/use-cases/onboarding" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">Onboarding</Link></li>
              <li><span className="text-sm text-primary-foreground/30">Training (coming soon)</span></li>
              <li><span className="text-sm text-primary-foreground/30">Sales Presentations</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-primary-foreground/80 mb-4 tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-3 list-none">
              <li><a href="https://www.ezine.digital" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">About us</a></li>
              <li><a href="https://www.ezine.digital/#contact" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">Contact us</a></li>
              <li><a href="https://www.ezine.digital/#faqs" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors no-underline">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Ezine by Evolutyz. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors no-underline">Privacy Policy</a>
            <a href="#" className="text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors no-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
