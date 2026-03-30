import { Users, PenTool, Megaphone, BarChart3, GraduationCap } from "lucide-react";
import { ArrowRight } from "lucide-react";

const UseCasesContact = () => {
  const useCases = [
    { icon: Users, label: "HR/People Ops" },
    { icon: PenTool, label: "Founders & Writers" },
    { icon: Megaphone, label: "Marketing Teams" },
    { icon: BarChart3, label: "Sales Reps" },
    { icon: GraduationCap, label: "Educators" },
  ];

  return (
    <section id="contact" className="bg-ink py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left: contact form */}
          <div className="reveal">
            <h2 className="font-heading text-3xl md:text-[36px] font-bold tracking-tight leading-[1.15] text-primary-foreground mb-3">
              Ready to Elevate<br />Your Content?
            </h2>
            <p className="text-sm text-primary-foreground/60 font-light mb-8">
              Start Free. Create your first Ezine in minutes.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-primary/50"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-primary/50"
                />
              </div>
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-primary/50 resize-none"
              />
              <a
                href="https://www.ezine.digital"
                className="font-heading text-sm font-bold text-primary-foreground no-underline px-8 py-3 bg-primary rounded-xl inline-flex items-center gap-2 hover:opacity-90 transition-all"
              >
                Send Message <ArrowRight size={14} />
              </a>
            </form>
          </div>

          {/* Right: use cases */}
          <div className="reveal">
            <h3 className="font-heading text-xl font-bold text-primary-foreground mb-2">
              Built for <span className="text-primary">Modern Use Cases</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {useCases.map((uc) => (
                <div
                  key={uc.label}
                  className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5 text-center hover:bg-primary-foreground/8 hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 mx-auto bg-primary/15 rounded-xl flex items-center justify-center mb-3">
                    <uc.icon size={20} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-primary-foreground">{uc.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesContact;
