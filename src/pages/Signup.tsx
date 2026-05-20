import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import MarketingLayout from "@/components/MarketingLayout";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const inputClass =
    "h-11 w-full px-4 rounded-lg border border-border bg-background text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all";

  return (
    <MarketingLayout>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-16 bg-off-white">
        <div className="w-full max-w-2xl">
          <div className="bg-background rounded-2xl border border-border shadow-[0_12px_40px_rgba(26,21,18,0.08)] p-8 md:p-10">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-text-dark tracking-tight">
                Sign up
              </h1>
              <p className="text-sm text-text-mid mt-2">
                Create your <span className="text-primary font-semibold">eZine</span> account.
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-text-dark">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <input id="firstName" type="text" required placeholder="Enter firstname" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-text-dark">
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <input id="lastName" type="text" required placeholder="Enter lastname" className={inputClass} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-text-dark">
                  Email <span className="text-primary">*</span>
                </label>
                <input id="email" type="email" required placeholder="Enter email" className={inputClass} />
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
                    placeholder="Enter password"
                    className={`${inputClass} pr-11`}
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

              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-text-dark">
                  Confirm Password <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-mid transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-text-mid cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-border accent-accent cursor-pointer"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary font-semibold hover:underline">
                    Terms of Service
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="h-11 mt-2 self-center px-10 rounded-full bg-accent text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-[0_8px_24px_rgba(240,90,40,0.25)]"
              >
                Sign up
              </button>

              <p className="text-sm text-text-mid text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
};

export default Signup;
