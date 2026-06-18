import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import MarketingLayout from "@/components/MarketingLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: "Invalid input", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!" });
    navigate("/dashboard");
  };

  return (
    <MarketingLayout>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-16 bg-off-white">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-2xl border border-border shadow-[0_12px_40px_rgba(26,21,18,0.08)] p-8 md:p-10">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-text-dark tracking-tight">
                Log in
              </h1>
              <p className="text-sm text-text-mid mt-2">
                Welcome back to <span className="text-primary font-semibold">eZine</span>.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-text-dark">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 px-4 rounded-lg border border-border bg-background text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-semibold text-text-dark">
                  Password <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 w-full px-4 pr-11 rounded-lg border border-border bg-background text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-mid transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-11 mt-2 rounded-full bg-accent text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-[0_8px_24px_rgba(240,90,40,0.25)] disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              <p className="text-sm text-text-mid text-center">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
};

export default Login;
