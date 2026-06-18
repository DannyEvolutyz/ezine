import { ArrowRight } from "lucide-react";

const OtherProducts = () => {
  const products = [
    {
      name: "Ezconnect",
      logo: <>e<span className="text-accent">Z</span>connect</>,
      tagline: "by Evolutyz",
      desc: "One should not be horrific to look for the ordinary as they might think.",
      bg: "bg-ink",
      textColor: "text-primary-foreground",
      descColor: "text-primary-foreground/70",
      btnStyle: "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
    },
    {
      name: "Ezgifts",
      logo: <>e<span className="text-primary">Z</span><span className="italic">gifts</span></>,
      tagline: "by Evolutyz",
      desc: "One should not be horrific to ask for the ordinary as they might think.",
      bg: "bg-primary",
      textColor: "text-primary-foreground",
      descColor: "text-primary-foreground/80",
      btnStyle: "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
    },
    {
      name: "Ezrewards",
      logo: <>e<span className="text-accent">Z</span>rewards</>,
      tagline: "by Evolutyz",
      desc: "One should not be horrific to look for the ordinary as they might think.",
      bg: "bg-ink",
      textColor: "text-primary-foreground",
      descColor: "text-primary-foreground/70",
      btnStyle: "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -bottom-20 -right-20 w-[200px] h-[200px] bg-[radial-gradient(circle,hsl(var(--primary)/0.15)_0%,hsl(var(--accent)/0.1)_40%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="mb-10 reveal">
          <h2 className="font-heading text-3xl md:text-[38px] font-extrabold tracking-tight leading-[1.15] text-text-dark">
            What <span className="text-primary">Other</span> Products<br />We Have.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p) => (
            <div
              key={p.name}
              className={`${p.bg} rounded-2xl p-7 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] transition-all duration-300 reveal`}
            >
              <div className="mb-1">
                <span className={`font-heading text-2xl font-bold tracking-tight ${p.textColor}`}>
                  {p.logo}
                </span>
              </div>
              <span className={`text-xs ${p.descColor} font-light`}>{p.tagline}</span>
              <p className={`text-sm ${p.descColor} font-light leading-relaxed mt-4 mb-6`}>{p.desc}</p>
              <a
                href="#"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold no-underline border rounded-lg px-5 py-2 transition-colors ${p.btnStyle}`}
              >
                Explore <ArrowRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProducts;
