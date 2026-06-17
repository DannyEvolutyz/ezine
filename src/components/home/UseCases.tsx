import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const useCases = [
  {
    id: "hr",
    label: "HR / People Ops",
    link: "/use-cases/hr-people-ops",
    body:
      "Turn handbooks, onboarding decks, and policy updates into interactive flipbooks employees actually read. Track engagement and keep one source of truth.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "founders",
    label: "Founders & Writers",
    link: "/use-cases/founders-writers",
    body:
      "Publish investor updates, manifestos, and long-form essays as branded, shareable experiences — no design or dev work required.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: "marketing",
    label: "Marketing Teams",
    link: "/use-cases/marketing-teams",
    body:
      "Convert reports, lookbooks, and campaign content into trackable flipbooks. See who read what, for how long, and where they dropped off.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: "sales",
    label: "Sales Reps",
    link: "/use-cases/sales-reps",
    body:
      "Send personalized pitch decks and proposals as interactive links. Get notified the moment a prospect opens, scrolls, or shares them.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: "educators",
    label: "Educators",
    link: "/use-cases/educators",
    body:
      "Transform lesson plans, workbooks, and course material into interactive reading experiences with built-in AI Q&A for students.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M22 10l-10-5L2 10l10 5 10-5zM6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
  },
  {
    id: "product",
    label: "Product Teams",
    link: "/use-cases/product-teams",
    body:
      "Turn release notes, specs, and roadmaps into living documents the whole org can navigate, comment on, and learn from.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="bg-off-white py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      <div className="absolute top-8 left-8 w-4 h-4 border-2 border-primary/20 rounded-sm rotate-45" />
      <div className="absolute bottom-16 right-12 w-3 h-3 bg-primary/10 rounded-full" />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
          {/* Left: heading */}
          <div className="reveal lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] text-text-mid uppercase">Use Cases</span>
            </div>
            <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark mb-5">
              Built for the way <span className="text-primary">modern teams</span> create
            </h2>
            <p className="text-[15px] leading-[1.7] text-text-mid font-light mb-6 max-w-[420px]">
              Ezine adapts to how your team already works — whether you're publishing thought leadership,
              enabling sales, onboarding new hires, or turning static decks into interactive experiences.
              Pick your role to see exactly how Ezine fits in.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              Not sure which fits? Talk to us <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: accordion */}
          <div className="reveal">
            <Accordion
              type="multiple"
              defaultValue={useCases.map((u) => u.id)}
              className="rounded-2xl bg-background border border-border overflow-hidden divide-y divide-border"
            >
              {useCases.map((uc) => (
                <AccordionItem key={uc.id} value={uc.id} className="border-b-0 px-5 md:px-6">
                  <AccordionTrigger className="hover:no-underline py-4 group">
                    <div className="flex items-center gap-3.5 text-left">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-bg group-hover:bg-primary/10 transition-colors shrink-0">
                        {uc.icon}
                      </span>
                      <span className="font-heading text-base font-bold text-text-dark">{uc.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-[52px] pr-2">
                    <p className="text-sm leading-[1.7] text-text-mid font-light mb-3">{uc.body}</p>
                    <Link
                      to={uc.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all uppercase tracking-wide"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
