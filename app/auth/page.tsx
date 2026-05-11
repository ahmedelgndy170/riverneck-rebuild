"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, Phone, Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [forgotMode, setForgotMode] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("type=recovery")) {
      setResetMode(true);
      setForgotMode(false);
      setMessage("Create your new password.");
    }
  }, []);

  const checks = useMemo(() => {
    return {
      length: password.length >= 6,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, [password]);

  const score = Object.values(checks).filter(Boolean).length;

  const strengthColor =
    score <= 1
      ? "bg-red-500"
      : score <= 3
      ? "bg-[#f2c06b]"
      : "bg-[#25b99a]";

  const strengthWidth =
    score === 0
      ? "w-0"
      : score === 1
      ? "w-1/4"
      : score === 2
      ? "w-2/4"
      : score === 3
      ? "w-3/4"
      : "w-full";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password,
        options: {
          data: {
            full_name: signupName,
            phone: signupPhone,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Account created successfully!");
      setTab("signin");
      setSigninEmail(signupEmail);
      setSigninPassword("");
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.signInWithPassword({
        email: signinEmail,
        password: signinPassword,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setMessage("Email or password is incorrect.");
        } else {
          setMessage(error.message);
        }

        return;
      }

      setMessage("Signed in successfully!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 800);
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!resetEmail) {
        setMessage("Please enter your email address.");
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Password reset email sent successfully!");
    } catch {
      setMessage("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (newPassword.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Password updated successfully!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch {
      setMessage("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const CheckLine = ({ ok, text }: { ok: boolean; text: string }) => (
    <div className={`flex items-center gap-2 ${ok ? "text-[#25b99a]" : "text-white/55"}`}>
      <span className="font-black">{ok ? "✓" : "×"}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <main
      suppressHydrationWarning
      className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#101010] px-4 py-8 text-white selection:bg-[#f2c06b] selection:text-black md:px-6 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.30),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:rounded-[28px]">
        <div className="border-b border-white/10 px-5 pb-5 pt-6 text-center md:px-8 md:pb-7 md:pt-8">
          <div className="mx-auto mb-4 flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#25b99a]/35 bg-[#25b99a]/12 shadow-[0_0_35px_rgba(37,185,154,0.22)] md:mb-5 md:h-[76px] md:w-[76px]">
            <ShieldCheck size={32} className="text-[#25b99a] md:size-[38px]" />
          </div>

          <h1 className="text-[26px] font-black uppercase leading-[1] tracking-tight text-[#25b99a] md:text-[36px]">
            River Neck Acres
          </h1>

          <p className="mt-3 text-[14px] font-semibold leading-[1.55] text-white/75 md:text-[17px]">
            Book your adventure today
          </p>
        </div>

        {!forgotMode && !resetMode && (
          <div className="grid grid-cols-2 gap-2 border-b border-white/10 bg-white/[0.03] p-2">
            <button
              type="button"
              onClick={() => {
                setTab("signin");
                setMessage("");
              }}
              className={`cursor-pointer touch-manipulation rounded-xl py-3 text-[14px] font-black transition-all duration-300 active:scale-95 md:py-4 md:text-[16px] ${
                tab === "signin"
                  ? "bg-[#151515] text-white shadow-[0_0_22px_rgba(255,255,255,0.08)]"
                  : "text-white/70 hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setTab("signup");
                setMessage("");
              }}
              className={`cursor-pointer touch-manipulation rounded-xl py-3 text-[14px] font-black transition-all duration-300 active:scale-95 md:py-4 md:text-[16px] ${
                tab === "signup"
                  ? "bg-[#151515] text-white shadow-[0_0_22px_rgba(255,255,255,0.08)]"
                  : "text-white/70 hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        <div className="px-4 py-5 md:px-8 md:py-8">
          {resetMode ? (
            <div className="space-y-5">
              <Field label="New Password" icon={<Lock size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />
              </Field>

              <button
                type="button"
                onClick={handleUpdatePassword}
                disabled={loading}
                className="h-[54px] w-full touch-manipulation rounded-xl bg-[#25d0bd] text-[14px] font-black text-white shadow-[0_0_24px_rgba(37,208,189,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(37,208,189,0.48)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:h-[58px] md:text-[15px]"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setResetMode(false);
                  setMessage("");
                  router.push("/auth");
                }}
                className="w-full text-center text-[14px] font-black text-[#f2c06b] transition hover:text-white active:text-white"
              >
                Back to Sign In
              </button>
            </div>
          ) : forgotMode ? (
            <div className="space-y-5">
              <Field label="Reset Email" icon={<Mail size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />
              </Field>

              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="h-[54px] w-full touch-manipulation rounded-xl bg-[#25d0bd] text-[14px] font-black text-white shadow-[0_0_24px_rgba(37,208,189,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(37,208,189,0.48)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:h-[58px] md:text-[15px]"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setForgotMode(false);
                  setMessage("");
                }}
                className="w-full text-center text-[14px] font-black text-[#f2c06b] transition hover:text-white active:text-white"
              >
                Back to Sign In
              </button>
            </div>
          ) : tab === "signin" ? (
            <form onSubmit={handleSignin} className="space-y-5">
              <Field label="Email" icon={<Mail size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="email"
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />
              </Field>

              <Field label="Password" icon={<Lock size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="password"
                  value={signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />
              </Field>

              <button
                type="button"
                onClick={() => {
                  setForgotMode(true);
                  setResetEmail(signinEmail);
                  setMessage("");
                }}
                className="cursor-pointer touch-manipulation text-[13px] font-black text-[#25b99a] transition hover:text-[#f2c06b] active:text-[#f2c06b] md:text-[14px]"
              >
                Forgot password?
              </button>

              <button
                disabled={loading}
                type="submit"
                className="h-[54px] w-full touch-manipulation rounded-xl bg-[#25d0bd] text-[14px] font-black text-white shadow-[0_0_24px_rgba(37,208,189,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(37,208,189,0.48)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:h-[58px] md:text-[15px]"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <Field label="Full Name *" icon={<User size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="John Doe"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />
              </Field>

              <Field label="Email *" icon={<Mail size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />
              </Field>

              <Field label="Phone Number *" icon={<Phone size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="(123) 456-7890"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />

                <p className="mt-2 text-[12px] font-semibold leading-[1.5] text-white/65 md:text-[13px]">
                  Required for booking confirmations
                </p>
              </Field>

              <Field label="Password *" icon={<Lock size={17} />}>
                <input
                  suppressHydrationWarning
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:h-[54px] md:text-[15px]"
                />

                <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full ${strengthWidth} ${strengthColor} transition-all duration-300`} />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 text-[12px] font-semibold sm:grid-cols-2 md:text-[13px]">
                  <CheckLine ok={checks.length} text="6+ characters" />
                  <CheckLine ok={checks.upper} text="Uppercase letter" />
                  <CheckLine ok={checks.lower} text="Lowercase letter" />
                  <CheckLine ok={checks.number} text="Number" />
                </div>
              </Field>

              <button
                disabled={loading}
                type="submit"
                className="h-[54px] w-full touch-manipulation rounded-xl bg-[#f2c06b] text-[14px] font-black text-white shadow-[0_0_24px_rgba(242,192,107,0.22)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(242,192,107,0.48)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:h-[58px] md:text-[15px]"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          )}

          {message && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-[13px] font-semibold text-white/85">
              {message}
            </div>
          )}

          <a
            href="/"
            className="mt-7 block touch-manipulation text-center text-[14px] font-black text-white transition hover:text-[#f2c06b] active:text-[#f2c06b] md:mt-8 md:text-[15px]"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-[14px] font-black md:text-[15px]">
        <span className="text-[#25b99a]">{icon}</span>
        {label}
      </label>

      {children}
    </div>
  );
}