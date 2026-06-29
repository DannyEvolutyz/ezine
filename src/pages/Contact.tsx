import { useState } from "react";
import { Mail, MessageSquare, MapPin, Phone, Send, Linkedin, Facebook } from "lucide-react";
import { z } from "zod";
import MarketingLayout from "@/components/MarketingLayout";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100, { message: "Name must be under 100 characters" }),
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  company: z.string().trim().max(120).optional(),
  topic: z.string().trim().nonempty({ message: "Please pick a topic" }),
  message: z.string().trim().nonempty({ message: "Message cannot be empty" }).max(1000, { message: "Message must be under 1000 characters" }),
});

type FormState = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof FormState, string>>;

const channels = [
  { icon: Mail, title: "Email us", value: "hello@ezflip.ai", href: "mailto:hello@ezflip.ai", note: "We reply within one business day" },
  { icon: MessageSquare, title: "Sales & demos", value: "sales@ezflip.ai", href: "mailto:sales@ezflip.ai", note: "Book a 20-minute walkthrough" },
  { icon: Phone, title: "Talk to a human", value: "+1 (415) 555-0142", href: "tel:+14155550142", note: "Mon–Fri · 9am to 6pm PT" },
];

const topics = ["General enquiry", "Product demo", "Pricing & plans", "Partnership", "Support", "Press & media"];

const Contact = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", topic: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
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
    setForm({ name: "", email: "", company: "", topic: "", message: "" });
    toast({ title: "Message sent", description: "Thanks for reaching out — we'll be in touch shortly." });
  };

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-off-white pt-20 md:pt-28 pb-16 px-5 md:px-12">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border mb-6 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-xs font-semibold tracking-wide text-text-mid uppercase">Contact Us</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-text-dark mb-6 reveal">
            Let's start a <span className="text-primary">conversation</span>.
          </h1>
          <p className="text-base md:text-lg leading-[1.75] text-text-mid font-light max-w-[640px] mx-auto reveal">
            Questions, partnership ideas, or just want to see eZFlip in action? Drop us a line — a real
            human will get back to you, fast.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="bg-background py-12 md:py-16 px-5 md:px-12 border-y border-border">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map(({ icon: Icon, title, value, href, note }) => (
            <a
              key={title}
              href={href}
              className="reveal group bg-off-white rounded-2xl p-7 border border-border hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 no-underline block"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <Icon className="text-primary" size={22} />
              </div>
              <div className="text-xs font-bold tracking-widest uppercase text-text-light mb-1.5">{title}</div>
              <div className="font-heading text-lg font-bold text-text-dark mb-1.5 tracking-tight">{value}</div>
              <p className="text-[13px] leading-[1.7] text-text-mid font-light">{note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + side info */}
      <section className="bg-off-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-12">
          {/* Form */}
          <div className="reveal bg-background rounded-3xl border border-border p-8 md:p-10 shadow-[0_20px_60px_-30px_rgba(190,30,45,0.18)]">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Send a message</div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-text-dark mb-8">
              Tell us what you're working on.
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    maxLength={100}
                    placeholder="Jane Doe"
                    className={inputCls(!!errors.name)}
                  />
                </Field>
                <Field label="Work email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    maxLength={255}
                    placeholder="jane@company.com"
                    className={inputCls(!!errors.email)}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Company (optional)">
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    maxLength={120}
                    placeholder="Evolutyz"
                    className={inputCls(false)}
                  />
                </Field>
                <Field label="What's it about?" error={errors.topic}>
                  <select
                    value={form.topic}
                    onChange={(e) => update("topic", e.target.value)}
                    className={inputCls(!!errors.topic)}
                  >
                    <option value="">Pick a topic</option>
                    {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Message" error={errors.message} hint={`${form.message.length}/1000`}>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  rows={6}
                  placeholder="Share a few details so we can route this to the right person…"
                  className={`${inputCls(!!errors.message)} resize-none leading-relaxed`}
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2.5 font-heading font-bold text-base text-accent-foreground bg-accent px-8 py-4 rounded-xl shadow-[0_4px_16px_hsl(var(--accent)/0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(var(--accent)/0.35)] transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? "Sending…" : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Side info */}
          <div className="reveal space-y-6">
            <div className="bg-ink rounded-3xl p-8 text-primary-foreground relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-[radial-gradient(circle,hsl(var(--primary)/0.35)_0%,transparent_70%)] pointer-events-none" />
              <div className="relative">
                <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Our HQ</div>
                <h3 className="font-heading text-2xl font-extrabold tracking-tight leading-tight mb-5">
                  Built in California.<br />Loved worldwide.
                </h3>
                <div className="flex items-start gap-3 text-sm text-primary-foreground/70 font-light leading-relaxed mb-6">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Evolutyz Inc.<br />2261 Market Street, #4321<br />San Francisco, CA 94114</span>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-primary-foreground/10">
                  <span className="text-xs text-primary-foreground/50 mr-1">Follow along</span>
                  <a href="#" aria-label="LinkedIn" className="text-primary-foreground/70 hover:text-accent transition-colors"><Linkedin size={16} /></a>
                  <a href="#" aria-label="Facebook" className="text-primary-foreground/70 hover:text-accent transition-colors"><Facebook size={16} /></a>
                  <a href="#" aria-label="X" className="text-primary-foreground/70 hover:text-accent transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-3xl border border-border p-8">
              <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Response time</div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-2 tracking-tight">We're quick on the draw</h3>
              <p className="text-[13.5px] leading-[1.75] text-text-mid font-light">
                Most messages get a thoughtful reply within a few hours. For urgent demos or partnership
                requests, email <a href="mailto:sales@ezflip.ai" className="text-primary font-semibold hover:underline">sales@ezflip.ai</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
};

const inputCls = (hasError: boolean) =>
  `w-full h-12 px-4 rounded-xl bg-off-white border text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:bg-background focus:ring-2 transition-all ${
    hasError
      ? "border-primary/60 focus:border-primary focus:ring-primary/15"
      : "border-border focus:border-accent focus:ring-accent/15"
  }`;

const Field = ({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-text-dark uppercase tracking-wider">{label}</span>
      {hint && <span className="text-[11px] text-text-light">{hint}</span>}
    </div>
    {children}
    {error && <p className="mt-1.5 text-xs text-primary font-medium">{error}</p>}
  </label>
);

export default Contact;
