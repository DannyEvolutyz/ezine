import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "https://www.ezine.digital", external: true },
    { label: "About us", href: "https://www.ezine.digital/#about", external: true },
    { label: "Features", href: "/features/ai-chat" },
    { label: "Use Cases", href: "/use-cases/onboarding" },
    { label: "Comparison", href: "/compare" },
    { label: "FAQs", href: "https://www.ezine.digital/#faqs", external: true },
    { label: "Contact us", href: "https://www.ezine.digital/#contact", external: true },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 md:px-12 bg-background/95 backdrop-blur-xl border-b border-border">
      <a href="https://www.ezine.digital" className="flex items-center gap-1.5 no-underline">
        <span className="font-heading font-bold text-xl tracking-tight text-text-dark">
          <span className="italic text-primary">e</span><span className="text-primary">Z</span>ine.
        </span>
        <span className="text-sm text-text-mid font-light ml-1 hidden sm:inline">by Evolutyz</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-6 list-none">
        {links.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-text-mid hover:text-primary transition-colors no-underline"
              >
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                to={link.href}
                className={`text-sm font-medium transition-colors no-underline ${
                  isActive(link.href) ? "text-primary" : "text-text-mid hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden lg:flex items-center gap-3">
        <a
          href="https://www.ezine.digital"
          className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-ink rounded-full hover:bg-ink-2 transition-all no-underline"
        >
          Log in
        </a>
        <a
          href="https://www.ezine.digital"
          className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-primary rounded-full hover:opacity-90 transition-all no-underline"
        >
          Sign up
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden p-2 text-text-mid"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-5 flex flex-col gap-4 lg:hidden shadow-lg">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-mid no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium no-underline ${
                  isActive(link.href) ? "text-primary" : "text-text-mid"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="flex gap-3 pt-2">
            <a href="https://www.ezine.digital" className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-ink rounded-full no-underline">
              Log in
            </a>
            <a href="https://www.ezine.digital" className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-primary rounded-full no-underline">
              Sign up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
