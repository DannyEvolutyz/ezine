import { Link } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";

const ForgotPassword = () => {
  return (
    <MarketingLayout>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-16 bg-off-white">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-2xl border border-border shadow-[0_12px_40px_rgba(26,21,18,0.08)] p-8 md:p-10">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-text-dark tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-text-mid mt-2">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-text-dark">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="h-11 px-4 rounded-lg border border-border bg-background text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <p className="text-xs text-text-mid mt-1">
                  Don't worry! We'll send a verification link for resetting your password.
                </p>
              </div>

              <button
                type="submit"
                className="h-11 mt-2 self-center px-10 rounded-full bg-accent text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-[0_8px_24px_rgba(240,90,40,0.25)]"
              >
                Reset password
              </button>

              <p className="text-sm text-text-mid text-center">
                Remember your password?{" "}
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

export default ForgotPassword;
