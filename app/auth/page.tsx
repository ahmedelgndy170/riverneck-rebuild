"use client";

import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Lock,
  User,
  Phone,
  Mail,
} from "lucide-react";

export default function AuthPage() {
  const [tab, setTab] =
    useState<"signin" | "signup">("signin");

  const [password, setPassword] = useState("");

  const checks = useMemo(() => {
    return {
      length: password.length >= 6,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, [password]);

  const score =
    Object.values(checks).filter(Boolean).length;

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

  const CheckLine = ({
    ok,
    text,
  }: {
    ok: boolean;
    text: string;
  }) => (
    <div
      className={`flex items-center gap-2 ${
        ok ? "text-[#25b99a]" : "text-white/55"
      }`}
    >
      <span className="font-black">
        {ok ? "✓" : "×"}
      </span>

      <span>{text}</span>
    </div>
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-4 py-10 text-white md:px-6 md:py-16">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.30),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* HEADER */}
        <div className="border-b border-white/10 px-6 pb-6 pt-7 text-center md:px-8 md:pb-7 md:pt-8">
          <div className="mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#25b99a]/35 bg-[#25b99a]/12 shadow-[0_0_35px_rgba(37,185,154,0.22)]">
            <ShieldCheck
              size={38}
              className="text-[#25b99a]"
            />
          </div>

          <h1 className="text-[30px] font-black uppercase tracking-tight text-[#25b99a] md:text-[36px]">
            River Neck Acres
          </h1>

          <p className="mt-3 text-[15px] font-semibold leading-[1.55] text-white/75 md:text-[17px]">
            Book your adventure today
          </p>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-2 gap-2 border-b border-white/10 bg-white/[0.03] p-2">
          <button
            onClick={() => setTab("signin")}
            className={`cursor-pointer rounded-xl py-4 text-[15px] font-black transition-all duration-300 active:scale-95 md:text-[16px] ${
              tab === "signin"
                ? "bg-[#151515] text-white shadow-[0_0_22px_rgba(255,255,255,0.08)]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setTab("signup")}
            className={`cursor-pointer rounded-xl py-4 text-[15px] font-black transition-all duration-300 active:scale-95 md:text-[16px] ${
              tab === "signup"
                ? "bg-[#151515] text-white shadow-[0_0_22px_rgba(255,255,255,0.08)]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-5 py-6 md:px-8 md:py-8">
          {tab === "signin" ? (
            <form className="space-y-5">
              <Field
                label="Email"
                icon={<Mail size={18} />}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40"
                />
              </Field>

              <Field
                label="Password"
                icon={<Lock size={18} />}
              >
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40"
                />
              </Field>

              <button
                type="button"
                className="cursor-pointer text-[14px] font-black text-[#25b99a] transition hover:text-[#f2c06b]"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                className="h-[58px] w-full cursor-pointer rounded-xl bg-[#25d0bd] text-[15px] font-black text-white shadow-[0_0_24px_rgba(37,208,189,0.28)] transition-all duration-300 active:scale-95 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(37,208,189,0.48)]"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form className="space-y-5">
              <Field
                label="Full Name *"
                icon={<User size={18} />}
              >
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40"
                />
              </Field>

              <Field
                label="Email *"
                icon={<Mail size={18} />}
              >
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40"
                />
              </Field>

              <Field
                label="Phone Number *"
                icon={<Phone size={18} />}
              >
                <input
                  required
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40"
                />

                <p className="mt-2 text-[13px] font-semibold text-white/65">
                  Required for booking confirmations
                </p>
              </Field>

              <Field
                label="Password *"
                icon={<Lock size={18} />}
              >
                <input
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  type="password"
                  placeholder="••••••••"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40"
                />

                <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full ${strengthWidth} ${strengthColor} transition-all duration-300`}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 text-[13px] font-semibold sm:grid-cols-2">
                  <CheckLine
                    ok={checks.length}
                    text="6+ characters"
                  />

                  <CheckLine
                    ok={checks.upper}
                    text="Uppercase letter"
                  />

                  <CheckLine
                    ok={checks.lower}
                    text="Lowercase letter"
                  />

                  <CheckLine
                    ok={checks.number}
                    text="Number"
                  />
                </div>
              </Field>

              <button
                type="submit"
                className="h-[58px] w-full cursor-pointer rounded-xl bg-[#f2c06b] text-[15px] font-black text-white shadow-[0_0_24px_rgba(242,192,107,0.22)] transition-all duration-300 active:scale-95 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(242,192,107,0.48)]"
              >
                Create Account
              </button>
            </form>
          )}

          <a
            href="/"
            className="mt-8 block text-center text-[15px] font-black text-white transition hover:text-[#f2c06b]"
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
      <label className="mb-3 flex items-center gap-2 text-[15px] font-black">
        <span className="text-[#25b99a]">{icon}</span>
        {label}
      </label>

      {children}
    </div>
  );
}