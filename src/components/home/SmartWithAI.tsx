import { HelpCircle, Clock, TrendingUp } from "lucide-react";

const SmartWithAI = () => {
  const features = [
    {
      icon: HelpCircle,
      title: "Ask Your Ezine Anything",
      desc: "Instantly search your doc via natural questions",
      color: "bg-red-bg text-primary",
    },
    {
      icon: Clock,
      title: "Summarize in Seconds",
      desc: "Let AI pull out the highlights",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: TrendingUp,
      title: "Better Engagement",
      desc: "Make static content feel dynamic and useful",
      color: "bg-green-bg text-green-600",
    },
  ];

  return (
    <section className="bg-background py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-heading text-3xl md:text-[40px] font-bold tracking-tight leading-[1.15] text-text-dark">
            Make it smart with <span className="text-primary">AI</span>
          </h2>
        </div>

        {/* Icon row */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-10 reveal">
          {features.map((f) => (
            <div key={f.title} className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center`}>
              <f.icon size={24} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="text-center reveal">
              <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{f.title}</h3>
              <p className="text-sm text-text-mid font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartWithAI;
