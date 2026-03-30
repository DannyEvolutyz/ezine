import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const UseCasesContact = () => {
  const useCases = [
    {
      label: "HR/People Ops",
      link: "/use-cases/onboarding",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "Founders & Writers",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      label: "Marketing Teams",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      highlight: true,
    },
    {
      label: "Sales Reps",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
      highlight: true,
    },
    {
      label: "Educators",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
          <path d="M22 10l-10-5L2 10l10 5 10-5zM6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="bg-off-white py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-4 h-4 border-2 border-primary/20 rounded-sm rotate-45" />
      <div className="absolute top-12 right-12 w-3 h-3 bg-primary/10 rounded-full" />
      <div className="absolute bottom-16 left-1/4 w-2 h-2 bg-accent/15 rounded-full" />
      
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: contact form */}
          <div className="reveal">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <h2 className="font-heading text-3xl md:text-[34px] font-extrabold tracking-tight leading-[1.15] text-text-dark mb-2">
              Ready to Elevate<br />Your Content?
            </h2>
            <p className="text-sm text-text-mid font-light mb-8">
              Start Free. Create your first Ezine in minutes.
            </p>

            <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3.5">
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-background border border-border rounded-lg px-4 py-3 text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-primary/40 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-background border border-border rounded-lg px-4 py-3 text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-primary/40 resize-none transition-colors"
              />
              <button
                type="button"
                onClick={() => window.open("https://www.ezine.digital", "_blank")}
                className="font-heading text-sm font-bold text-primary-foreground px-8 py-3 bg-primary rounded-lg inline-flex items-center gap-2 hover:opacity-90 transition-all uppercase tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: use cases */}
          <div className="reveal">
            <h3 className="font-heading text-xl font-extrabold text-text-dark mb-2">
              Built for <span className="text-primary">Modern Use Cases</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
              {useCases.map((uc) => {
                const cardContent = (
                  <>
                    <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-3 ${
                      uc.highlight ? "bg-accent/10" : "bg-red-bg"
                    }`}>
                      {uc.icon}
                    </div>
                    <p className="text-[13px] font-semibold text-text-dark">{uc.label}</p>
                  </>
                );
                const className = `rounded-xl p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-md no-underline ${
                  uc.highlight
                    ? "bg-accent/5 border border-accent/15"
                    : "bg-background border border-border"
                }`;
                return uc.link ? (
                  <Link key={uc.label} to={uc.link} className={className}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={uc.label} className={className}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesContact;
