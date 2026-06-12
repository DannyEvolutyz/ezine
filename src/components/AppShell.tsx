import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, User, Info, Mail, HelpCircle, LogOut, Facebook, Linkedin, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const primaryNav = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/library", icon: BookOpen, label: "My Library" },
  { to: "/profile", icon: User, label: "Profile" },
];

const supportNav = [
  { to: "/about", icon: Info, label: "About Us" },
  { to: "/contact", icon: Mail, label: "Contact Us" },
  { to: "/faqs", icon: HelpCircle, label: "FAQ's" },
];

const Brand = ({ size = "md" }: { size?: "sm" | "md" }) => (
  <Link to="/dashboard" className="inline-flex items-baseline gap-1.5 no-underline">
    <span className={`font-heading font-bold tracking-tight text-text-dark ${size === "sm" ? "text-xl" : "text-2xl"}`}>
      <span className="text-accent">e</span>
      <span className="text-accent">z</span>ine.
    </span>
    <span className="text-[11px] text-text-mid font-light hidden sm:inline">by Evolutyz</span>
  </Link>
);

const AppShell = ({
  children,
  search,
}: {
  children: React.ReactNode;
  search?: { value: string; onChange: (v: string) => void; placeholder?: string };
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const meta = user?.user_metadata as { first_name?: string; last_name?: string } | undefined;
  const email = user?.email ?? "";
  const first = meta?.first_name ?? email.split("@")[0] ?? "";
  const last = meta?.last_name ?? "";
  const initials = ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || (email[0]?.toUpperCase() ?? "U");
  const displayName = meta?.first_name ? `${meta.first_name}${meta.last_name ? " " + meta.last_name : ""}` : email.split("@")[0] || "User";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: typeof Home; label: string }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          active
            ? "bg-gradient-to-r from-primary/10 to-transparent text-primary border-l-4 border-primary"
            : "text-text-mid hover:bg-muted hover:text-text-dark hover:translate-x-0.5 border-l-4 border-transparent"
        }`}
      >
        <Icon size={18} strokeWidth={active ? 2.25 : 1.75} />
        <span>{label}</span>
      </Link>
    );
  };

  const SidebarInner = (
    <>
      <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center">
        <div className="relative animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-heading text-2xl font-bold shadow-[0_10px_25px_-8px_rgba(240,90,40,0.45)]">
            {initials}
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-status border-[3px] border-background rounded-full animate-pulse-dot" />
        </div>
        <p className="mt-4 font-heading font-semibold text-text-dark">{displayName}</p>
        <p className="text-xs text-text-light mt-0.5">Premium Member</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {primaryNav.map((item) => <NavItem key={item.to} {...item} />)}
        <div className="pt-4 pb-2 px-4 uppercase text-[10px] font-bold tracking-widest text-text-light">Support</div>
        {supportNav.map((item) => <NavItem key={item.to} {...item} />)}
      </nav>

      <div className="p-6 mt-auto border-t border-border/60">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-off-white text-text-dark font-body">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 bg-background border-r border-border/60 flex-col sticky top-0 h-screen">
        {SidebarInner}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-background border-r border-border flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <Brand size="sm" />
              <button onClick={() => setMobileOpen(false)} className="p-2 text-text-mid" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            {SidebarInner}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top header */}
        <header className="h-16 md:h-20 bg-background/95 backdrop-blur-xl border-b border-border/60 px-4 md:px-10 flex items-center justify-between gap-3 sticky top-0 z-30">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-text-mid hover:text-text-dark transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <Brand />
          </div>
          {search && (
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={16} />
              <input
                type="text"
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                placeholder={search.placeholder ?? "Search your flipbook..."}
                className="w-full h-11 pl-11 pr-4 rounded-full bg-muted border border-transparent text-sm focus:outline-none focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
              />
            </div>
          )}
        </header>

        {/* Mobile search bar */}
        {search && (
          <div className="md:hidden bg-background border-b border-border/60 px-4 py-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={16} />
              <input
                type="text"
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                placeholder={search.placeholder ?? "Search..."}
                className="w-full h-10 pl-11 pr-4 rounded-full bg-muted border border-transparent text-sm focus:outline-none focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-5 md:px-10 py-6 md:py-10">{children}</main>

        {/* Footer */}
        <footer className="bg-background border-t border-border/60 px-5 md:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <Brand size="sm" />
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-text-mid">
              <a href="https://www.ezine.digital/#terms" className="hover:text-accent transition-colors">Terms &amp; Service</a>
              <a href="https://www.ezine.digital/#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="https://www.ezine.digital/#data" className="hover:text-accent transition-colors">Data Processing</a>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <div className="flex items-center gap-4 text-text-mid">
                <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={15} /></a>
                <a href="#" aria-label="X" className="hover:text-primary transition-colors">
                  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/evolutyz" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin size={15} /></a>
              </div>
              <span className="text-[11px] text-text-light">Copyright ©{new Date().getFullYear()} Ezine.digital</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppShell;
