import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-off-white">
      {/* Top bar */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
          {/* Brand */}
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-2xl font-bold tracking-tight text-text-dark">
              <span className="italic text-primary">e</span><span className="text-primary">Z</span>ine.
            </span>
            <span className="text-sm text-text-mid font-light ml-1">by Evolutyz</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
            <a href="https://www.ezine.digital/#terms" className="text-sm font-semibold text-text-dark hover:text-primary transition-colors no-underline">
              Terms & Services
            </a>
            <a href="https://www.ezine.digital/#privacy" className="text-sm font-semibold text-text-dark hover:text-primary transition-colors no-underline">
              Privacy Policy
            </a>
            <a href="https://www.ezine.digital/#data" className="text-sm font-semibold text-text-dark hover:text-primary transition-colors no-underline">
              Data Processing
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-light">Copyright ©{new Date().getFullYear()} Ezine.digital</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-text-dark/10" />

        {/* Bottom section */}
        <div className="py-10">
          {/* Product logos row */}
          <div className="flex items-center justify-center gap-10 md:gap-16 mb-8 flex-wrap">
            <span className="font-heading text-2xl font-bold tracking-tight text-text-dark">
              <span className="italic text-primary">e</span><span className="text-primary">Z</span>ine.
            </span>
            <span className="font-heading text-2xl font-bold tracking-tight text-text-dark">
              e<span className="text-primary">Z</span><span className="font-light">connect</span>
            </span>
            <span className="font-heading text-2xl font-bold tracking-tight text-text-dark">
              e<span className="text-primary">Z</span><span className="uppercase">GiFTS</span>
            </span>
            <span className="font-heading text-2xl font-bold tracking-tight text-text-dark">
              e<span className="text-primary">Z</span><span className="font-light">rewards</span>
            </span>
          </div>

          {/* Evolutyz + trademark text */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="flex-shrink-0">
              <span className="font-heading text-xl font-bold text-accent italic">Evolutyz</span>
            </div>
            <p className="text-xs text-text-mid leading-relaxed">
              Ezine, Ezconnect, Ezgifts and Ezrewards are registered trademarks of Evolutyz. Terms and conditions, features, support, pricing, and service options subject to change without notice.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 mb-6">
            <a href="#" className="text-text-dark hover:text-primary transition-colors"><Facebook size={18} /></a>
            <a href="#" className="text-text-dark hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/evolutyz" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-primary transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="text-text-dark hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-text-dark hover:text-primary transition-colors"><Youtube size={18} /></a>
          </div>

          {/* Bottom copyright row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-light">
              Copyright ©{new Date().getFullYear()} Evolutyz Corp.
            </p>
            <p className="text-sm text-text-mid">
              Made with <span className="text-primary">❤️</span> from <strong className="font-bold">VIZAG!</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
