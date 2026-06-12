import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const nameSchema = z.string().trim().max(60, "Must be 60 characters or fewer");

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const meta = user?.user_metadata as { first_name?: string; last_name?: string } | undefined;

  const [firstName, setFirstName] = useState(meta?.first_name ?? "");
  const [lastName, setLastName] = useState(meta?.last_name ?? "");
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    setFirstName(meta?.first_name ?? "");
    setLastName(meta?.last_name ?? "");
  }, [meta?.first_name, meta?.last_name]);

  const initials =
    ((firstName[0] ?? "") + (lastName[0] ?? "")).toUpperCase() ||
    (user?.email?.[0]?.toUpperCase() ?? "U");

  const handleSave = async () => {
    const f = nameSchema.safeParse(firstName);
    const l = nameSchema.safeParse(lastName);
    if (!f.success || !l.success) {
      toast({
        title: "Invalid input",
        description: f.success ? l.error.issues[0].message : f.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { first_name: f.data, last_name: l.data },
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Your details have been saved." });
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    setResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetting(false);
    if (error) {
      toast({ title: "Could not send email", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Check your inbox",
        description: `We've sent a password reset link to ${user.email}.`,
      });
    }
  };

  const handleDeactivate = async () => {
    if (!confirm("Are you sure you want to deactivate your account? You'll be signed out.")) return;
    await signOut();
    toast({ title: "Account deactivated", description: "You've been signed out." });
    navigate("/");
  };

  return (
    <AppShell>
      {/* Banner */}
      <div className="relative -mx-5 md:-mx-10 -mt-6 md:-mt-10 mb-6 md:mb-8 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent px-5 md:px-10 pt-6 md:pt-10 pb-6 md:pb-8 animate-fade-in-up">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary">Profile</h1>
      </div>

      {/* Card */}
      <section className="rounded-2xl border-2 border-accent/30 bg-background p-5 sm:p-8 md:p-10 animate-fade-in-up">

        {/* Avatar + name */}
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent font-heading text-xl font-bold text-white shadow-[0_10px_25px_-8px_rgba(240,90,40,0.45)]">
            {initials}
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-text-dark">
              {firstName || lastName ? `${firstName} ${lastName}`.trim() : "Your profile"}
            </p>
            <p className="text-sm text-text-mid">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="First Name">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={60}
              className="h-12 w-full rounded-lg border-2 border-accent/40 bg-background px-4 text-base text-text-dark focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </Field>
          <Field label="Last Name">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={60}
              className="h-12 w-full rounded-lg border-2 border-accent/40 bg-background px-4 text-base text-text-dark focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="h-12 w-full cursor-not-allowed rounded-lg border-2 border-accent/40 bg-muted/50 px-4 text-base text-text-mid focus:outline-none"
            />
          </Field>
          <Field label="Password">
            <button
              onClick={handleResetPassword}
              disabled={resetting}
              className="group flex h-12 w-full items-center justify-between rounded-lg border-2 border-accent/40 bg-background px-4 text-base text-text-light transition-colors hover:border-accent disabled:opacity-60"
            >
              <span>••••••••••</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent">
                {resetting ? "Sending..." : "Set a new password"}
                <ChevronRight size={16} />
              </span>
            </button>
          </Field>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(240,90,40,0.6)] transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          <button
            onClick={handleDeactivate}
            className="text-base font-semibold text-primary underline underline-offset-4 hover:text-accent"
          >
            Deactivate Account
          </button>
        </div>
      </section>
    </AppShell>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-text-dark">{label}</span>
    {children}
  </label>
);

export default Profile;
