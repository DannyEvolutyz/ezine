import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, User, Info, Mail, HelpCircle, LogOut, Facebook, Linkedin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/library", icon: BookOpen, label: "My Library" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/about", icon: Info, label: "About Us" },
  { to: "/contact", icon: Mail, label: "Contact Us" },
  { to: "/faqs", icon: HelpCircle, label: "FAQ's" },
];

const Brand = () => (
  <Link to="/dashboard" className="inline-flex items-baseline gap-1.5">
    <span className="font-heading text-3xl font-bold tracking-tight text-text-dark">
      <span className="text-accent">e</span>
      <span className="text-accent">z</span>ine.
    </span>
    <span className="text-sm text-text-mid font-light">by Evolutyz</span>
  </Link>
);

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initials = (() => {
    const email = user?.email ?? "";
    const meta = (user?.user_metadata as { first_name?: string; last_name?: string } | undefined);
    const first = meta?.first_name ?? email.split("@")[0] ?? "";
    const last = meta?.last_name ?? "";
    return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || (email[0]?.toUpperCase() ?? "U");
  })();

  const displayName = (() => {
    const meta = (user?.user_metadata as { first_name?: string; last_name?: string } | undefined);
    if (meta?.first_name) return `${meta.first_name}${meta.last_name ? " " + meta.last_name : ""}`;
    return user?.email?.split("@")[0] ?? "User";
  })();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top brand bar */}
      <header className="bg-off-white border-b border-border/60">
        <div className="px-6 md:px-10 py-5">
          <Brand />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border/60 bg-background flex flex-col">
          <div className="px-6 pt-8 pb-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-heading text-2xl font-bold shadow-[0_8px_20px_rgba(240,90,40,0.25)]">
              {initials}
            </div>
            <p className="mt-3 font-heading font-semibold text-text-dark">{displayName}</p>
          </div>

          <nav className="px-3 flex flex-col gap-1">
            {navItems.map(({ to, icon: Icon, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-accent/10 text-accent border-l-4 border-accent pl-3"
                      : "text-text-mid hover:bg-muted hover:text-text-dark"
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-3">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-8 bg-background">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-t border-border/60">
        <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Brand />
          <div className="flex items-center gap-8">
            <a href="https://www.ezine.digital/#terms" className="text-sm font-semibold text-text-dark hover:text-primary">Terms & Service</a>
            <a href="https://www.ezine.digital/#privacy" className="text-sm font-semibold text-text-dark hover:text-primary">Privacy Policy</a>
            <a href="https://www.ezine.digital/#data" className="text-sm font-semibold text-text-dark hover:text-primary">Data Processing</a>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 text-text-dark">
              <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook size={16} /></a>
              <a href="#" aria-label="X" className="hover:text-primary">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/evolutyz" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={16} /></a>
            </div>
            <span className="text-xs text-text-light">Copyright ©{new Date().getFullYear()} Ezine.digital</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
