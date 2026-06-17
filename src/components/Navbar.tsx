import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const useCaseItems = [
  { label: "HR/People Ops", href: "/use-cases/hr-people-ops" },
  { label: "Founders & Writers", href: "/use-cases/founders-writers" },
  { label: "Marketing Teams", href: "/use-cases/marketing-teams" },
  { label: "Sales Reps", href: "/use-cases/sales-reps" },
  { label: "Educators", href: "/use-cases/educators" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [mobileUseCasesOpen, setMobileUseCasesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleLogout = async () => {
    await signOut();
    setMobileOpen(false);
    navigate("/");
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features/ai-chat" },
    { label: "Use Cases", href: "#", isDropdown: true },
    { label: "Comparison", href: "/compare" },
    { label: "Contact us", href: "/#contact", isHash: true },
    { label: "FAQs", href: "/#faqs", isHash: true },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUseCasesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
    if (href.startsWith("/#") || href === "#") return false;
    return location.pathname === href;
  };

  const isUseCaseActive = location.pathname.startsWith("/use-cases");

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
          <span className="text-primary">e</span><span className="text-primary">Z</span>ine.
        </span>
        <span className="text-sm text-text-mid font-light ml-1 hidden sm:inline">by Evolutyz</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-6 list-none">
        {links.map((link) =>
          link.isDropdown ? (
            <li key={link.label} ref={dropdownRef} className="relative">
              <button
                onClick={() => setUseCasesOpen(!useCasesOpen)}
                className={`text-sm font-medium transition-colors bg-transparent border-none cursor-pointer inline-flex items-center gap-1 ${
                  isUseCaseActive ? "text-primary" : "text-text-mid hover:text-primary"
                }`}
              >
                {link.label}
                <ChevronDown size={14} className={`transition-transform ${useCasesOpen ? "rotate-180" : ""}`} />
              </button>
              {useCasesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-background rounded-xl border border-border shadow-[0_12px_40px_rgba(26,21,18,0.12)] py-2 z-50">
                  {useCaseItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setUseCasesOpen(false)}
                      className={`block px-4 py-2.5 text-sm no-underline transition-colors ${
                        location.pathname === item.href
                          ? "text-primary bg-red-bg font-semibold"
                          : "text-text-mid hover:text-primary hover:bg-off-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ) : link.isHash ? (
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
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-primary rounded-full hover:opacity-90 transition-all border-none cursor-pointer"
          >
            Log out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-primary rounded-full hover:opacity-90 transition-all no-underline"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold text-text-dark px-6 py-2 bg-[#F5F3F1] border border-[#BE1E2D] rounded-full hover:bg-[#EBE8E5] transition-all no-underline"
            >
              Get Started for Free
            </Link>
          </>
        )}
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
            link.isDropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileUseCasesOpen(!mobileUseCasesOpen)}
                  className={`text-sm font-medium text-left bg-transparent border-none cursor-pointer inline-flex items-center gap-1 ${
                    isUseCaseActive ? "text-primary" : "text-text-mid"
                  }`}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${mobileUseCasesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileUseCasesOpen && (
                  <div className="flex flex-col gap-2 pl-4 mt-2">
                    {useCaseItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => { setMobileOpen(false); setMobileUseCasesOpen(false); }}
                        className={`text-sm no-underline ${
                          location.pathname === item.href ? "text-primary font-semibold" : "text-text-mid"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : link.isHash ? (
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
            {user ? (
              <button onClick={handleLogout} className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-primary rounded-full border-none cursor-pointer">
                Log out
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-primary-foreground px-6 py-2 bg-primary rounded-full no-underline">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-text-dark px-6 py-2 bg-[#F5F3F1] border border-[#BE1E2D] rounded-full no-underline">
                  Get Started for Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
