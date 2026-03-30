import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features/ai-chat" },
    { label: "Use Cases", href: "/use-cases/onboarding" },
    { label: "Comparison", href: "/compare" },
    { label: "Contact us", href: "/#contact", isHash: true },
    { label: "FAQs", href: "/#faqs", isHash: true },
  ];

  // Handle hash scrolling when navigating from other pages
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return location.pathname === href;
  };

  const handleHashClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 md:px-12 bg-background/95 backdrop-blur-xl border-b border-border">
      <Link to="/" className="flex items-center gap-1.5 no-underline">
        <span className="font-heading font-bold text-xl tracking-tight text-text-dark">
          <span className="italic text-primary">e</span><span className="text-primary">Z</span>ine.
        </span>
        <span className="text-sm text-text-mid font-light ml-1 hidden sm:inline">by Evolutyz</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-6 list-none">
        {links.map((link) =>
          link.isHash ? (
            <li key={link.label}>
              <button
                onClick={() => handleHashClick(link.href)}
                className="text-sm font-medium text-text-mid hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
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
            link.isHash ? (
              <button
                key={link.label}
                onClick={() => handleHashClick(link.href)}
                className="text-sm font-medium text-text-mid text-left bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
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
