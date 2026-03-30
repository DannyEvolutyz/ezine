import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "https://www.ezine.digital", external: true },
    { label: "Features", href: "/features/ai-chat" },
    { label: "Use Cases", href: "/use-cases/onboarding" },
    { label: "Comparison", href: "/compare" },
    { label: "Contact us", href: "https://www.ezine.digital/#contact", external: true },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 md:px-12 bg-background/94 backdrop-blur-xl border-b border-border">
      <a href="https://www.ezine.digital" className="flex items-center gap-2.5 no-underline">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-primary-foreground">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
          </svg>
        </div>
        <span className="font-heading font-bold text-lg tracking-tight text-text-dark">
          e<span className="text-primary">Z</span>ine
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-7 list-none">
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
      <div className="hidden md:flex items-center gap-2.5">
        <a
          href="https://www.ezine.digital"
          className="text-sm font-medium text-text-mid px-4 py-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-all no-underline"
        >
          Log in
        </a>
        <a
          href="https://www.ezine.digital"
          className="text-sm font-semibold text-primary-foreground px-5 py-2 bg-primary rounded-lg hover:opacity-90 transition-all no-underline"
        >
          Sign up
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2 text-text-mid"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-5 flex flex-col gap-4 md:hidden">
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
          <div className="flex gap-2.5 pt-2">
            <a href="https://www.ezine.digital" className="text-sm font-medium text-text-mid px-4 py-2 border border-border rounded-lg no-underline">
              Log in
            </a>
            <a href="https://www.ezine.digital" className="text-sm font-semibold text-primary-foreground px-5 py-2 bg-primary rounded-lg no-underline">
              Sign up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
