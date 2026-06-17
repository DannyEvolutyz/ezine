import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const roleOptions = [
  "HR / People Ops",
  "Founders & Writers",
  "Marketing Teams",
  "Sales Reps",
  "Educators",
  "Product Teams",
  "Other",
];

const teamSizeOptions = ["Just me", "2–10", "11–50", "51–200", "200+"];

const intentOptions = [
  "Book a demo",
  "Pricing for my team",
  "Partnership",
  "Press / Media",
  "Something else",
];

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid work email" }).max(255),
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  company: z.string().trim().nonempty({ message: "Company is required" }).max(120),
  role: z.string().trim().optional(),
  teamSize: z.string().trim().optional(),
  intent: z.string().trim().nonempty({ message: "Please pick one" }),
  message: z.string().trim().max(1000).optional(),
});

type FormState = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  email: "",
  name: "",
  company: "",
  role: "",
  teamSize: "",
  intent: "",
  message: "",
};

const inputCls = (hasError: boolean) =>
  `w-full bg-background border rounded-lg px-4 py-3 text-sm text-text-dark placeholder:text-text-light focus:outline-none transition-colors ${
    hasError ? "border-primary/60 focus:border-primary" : "border-border focus:border-primary/40"
  }`;

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: FieldErrors = {};
      result.error.issues.forEach((i) => {
        const key = i.path[0] as keyof FormState;
        if (!next[key]) next[key] = i.message;
      });
      setErrors(next);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm(initial);
    toast({
      title: "Request received",
      description: "Thanks! A real human from Ezine will get back to you within 1 business day.",
    });
  };

  return (
    <section id="contact" className="bg-background py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
      <div className="absolute top-12 right-10 w-3 h-3 bg-primary/10 rounded-full" />
      <div className="absolute bottom-16 left-1/4 w-2 h-2 bg-accent/15 rounded-full" />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
          {/* Left: copy */}
          <div className="reveal lg:pt-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] text-text-mid uppercase">
                Get in Touch
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-[40px] font-extrabold tracking-tight leading-[1.1] text-text-dark mb-5">
              Let's see Ezine working on <span className="text-primary">your content</span>
            </h2>
            <p className="text-[15px] leading-[1.7] text-text-mid font-light mb-6 max-w-[460px]">
              Tell us a bit about your team and what you'd like to publish. We'll show you how Ezine can
              turn your existing PDFs, decks, and docs into interactive experiences — and answer any
              questions about pricing, security, or integrations.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                "Free 14-day trial — no credit card required",
                "Personalized walkthrough in under 20 minutes",
                "We typically reply within 1 business day",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-mid">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mt-0.5 shrink-0"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="reveal">
            <form
              onSubmit={handleSubmit}
              className="bg-off-white border border-border rounded-2xl p-6 md:p-8 space-y-4"
              noValidate
            >
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5">
                  Work email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls(!!errors.email)}
                />
                {errors.email && <p className="text-xs text-primary mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5">
                    Full name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputCls(!!errors.name)}
                  />
                  {errors.name && <p className="text-xs text-primary mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5">
                    Company <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className={inputCls(!!errors.company)}
                  />
                  {errors.company && <p className="text-xs text-primary mt-1">{errors.company}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5">
                  Your role
                </label>
                <p className="text-[11px] text-text-light mb-1.5">Pick the one closest to yours</p>
                <select
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  className={inputCls(false)}
                >
                  <option value="">Select a role</option>
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5">
                    Team size
                  </label>
                  <select
                    value={form.teamSize}
                    onChange={(e) => update("teamSize", e.target.value)}
                    className={inputCls(false)}
                  >
                    <option value="">Select team size</option>
                    {teamSizeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5">
                    What brings you here? <span className="text-primary">*</span>
                  </label>
                  <select
                    value={form.intent}
                    onChange={(e) => update("intent", e.target.value)}
                    className={inputCls(!!errors.intent)}
                  >
                    <option value="">Select an option</option>
                    {intentOptions.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {errors.intent && <p className="text-xs text-primary mt-1">{errors.intent}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5">
                  Tell us about your content
                </label>
                <textarea
                  rows={4}
                  placeholder="What do you publish today, and what would you like Ezine to do for you?"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${inputCls(false)} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full font-heading text-sm font-bold text-primary-foreground px-8 py-3.5 bg-primary rounded-lg inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all uppercase tracking-wide disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request a Demo"}
              </button>
              <p className="text-[11px] text-text-light text-center">
                By submitting, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
