import { ArrowRight } from "lucide-react";

const OtherProducts = () => {
  const products = [
    {
      name: "Ezconnect",
      logo: <>e<span className="text-primary">Z</span><span className="font-light">connect</span></>,
      tagline: "by Evolutyz",
      desc: "One should not be horrific to ask for the ordinary as they might think.",
      link: "#",
    },
    {
      name: "Ezgifts",
      logo: <>e<span className="text-primary">Z</span><span className="italic">gifts</span></>,
      tagline: "by Evolutyz",
      desc: "One should not be horrific to ask for the ordinary as they might think.",
      link: "#",
    },
    {
      name: "Ezrewards",
      logo: <>e<span className="text-primary">Z</span><span className="font-light">rewards</span></>,
      tagline: "by Evolutyz",
      desc: "One should not be horrific to ask for the ordinary as they might think.",
      link: "#",
    },
  ];

  return (
    <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark">
            What <span className="text-primary">Other</span> Products<br />We Have.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p) => (
            <div
              key={p.name}
              className="bg-background rounded-2xl p-7 border border-border hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,21,18,0.08)] transition-all duration-300 reveal"
            >
              <div className="mb-4">
                <span className="font-heading text-2xl font-bold tracking-tight text-text-dark">
                  {p.logo}
                </span>
                <span className="text-xs text-text-light ml-2">{p.tagline}</span>
              </div>
              <p className="text-sm text-text-mid font-light leading-relaxed mb-5">{p.desc}</p>
              <a
                href={p.link}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary no-underline border border-primary/25 rounded-lg px-4 py-2 hover:bg-red-bg hover:border-primary transition-colors"
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
