import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const nameSchema = z.string().trim().max(60, "Must be 60 characters or fewer");

type DeactivateStep = "closed" | "confirm" | "verify" | "done";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const meta = user?.user_metadata as { first_name?: string; last_name?: string } | undefined;

  const initialFirst = meta?.first_name ?? "";
  const initialLast = meta?.last_name ?? "";

  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [deactivateStep, setDeactivateStep] = useState<DeactivateStep>("closed");
  const [confirmText, setConfirmText] = useState("");
  const [ackChecked, setAckChecked] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  useEffect(() => {
    setFirstName(meta?.first_name ?? "");
    setLastName(meta?.last_name ?? "");
  }, [meta?.first_name, meta?.last_name]);

  const isDirty = useMemo(
    () => firstName !== (meta?.first_name ?? "") || lastName !== (meta?.last_name ?? ""),
    [firstName, lastName, meta?.first_name, meta?.last_name]
  );

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

  const openDeactivate = () => {
    setConfirmText("");
    setAckChecked(false);
    setDeactivateStep("confirm");
  };

  const finalizeDeactivation = async () => {
    setDeactivating(true);
    await signOut();
    setDeactivating(false);
    setDeactivateStep("done");
  };

  if (deactivateStep === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background px-5 py-16">
        <div className="w-full max-w-lg rounded-2xl border-2 border-accent/30 bg-background p-8 md:p-12 text-center animate-fade-in-up">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-3">
            Your Account Has Been Deactivated
          </h1>
          <p className="text-text-mid mb-8">
            You've been logged out. If you change your mind, simply log in within 30 days to reactivate your account.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="rounded-full bg-accent hover:bg-accent/90 text-white px-8 h-11"
          >
            Return To Homepage
          </Button>
        </div>
      </div>
    );
  }

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
                {resetting ? "Sending..." : "Set A New Password"}
                <ChevronRight size={16} />
              </span>
            </button>
          </Field>
        </div>

        {/* Save action */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(240,90,40,0.6)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Divider + Danger zone */}
        <div className="mt-12 border-t-2 border-dashed border-primary/20 pt-8">
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading text-base font-bold text-primary mb-1">
                  Deactivate Account
                </h3>
                <p className="text-sm text-text-mid">
                  This will disable your account and you won't be able to access your flipbooks.
                </p>
              </div>
              <button
                onClick={openDeactivate}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white whitespace-nowrap"
              >
                <AlertTriangle size={16} />
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Initial confirmation */}
      <Dialog open={deactivateStep === "confirm"} onOpenChange={(o) => !o && setDeactivateStep("closed")}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-primary">
              Are You Sure You Want To Deactivate Your Account?
            </DialogTitle>
            <DialogDescription className="text-text-mid pt-2">
              Deactivating your account will:
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 text-sm text-text-dark pl-2">
            <li>• Remove access to all your flipbooks</li>
            <li>• Disable sharing links for your content</li>
            <li>• Log you out of all devices</li>
          </ul>
          <p className="text-sm text-text-mid">
            You can reactivate your account by logging in again within 30 days.
          </p>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="ghost" onClick={() => setDeactivateStep("closed")}>
              Cancel
            </Button>
            <Button
              onClick={() => setDeactivateStep("verify")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Continue To Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 2: Final verification */}
      <Dialog open={deactivateStep === "verify"} onOpenChange={(o) => !o && setDeactivateStep("closed")}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-primary">
              Final Step: Confirm Deactivation
            </DialogTitle>
            <DialogDescription className="text-text-mid pt-2">
              Type <span className="font-bold text-primary">DEACTIVATE</span> below to confirm.
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DEACTIVATE"
            className="h-12 w-full rounded-lg border-2 border-accent/40 bg-background px-4 text-base text-text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={ackChecked}
              onCheckedChange={(v) => setAckChecked(v === true)}
              className="mt-0.5"
            />
            <span className="text-sm text-text-dark">
              I understand that my flipbooks will become inaccessible
            </span>
          </label>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="ghost" onClick={() => setDeactivateStep("confirm")}>
              Go Back
            </Button>
            <Button
              onClick={finalizeDeactivation}
              disabled={confirmText !== "DEACTIVATE" || !ackChecked || deactivating}
              className="bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
            >
              {deactivating ? "Deactivating..." : "Deactivate My Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
