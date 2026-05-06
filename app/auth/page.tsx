"use client";
import { useMemo, useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [password, setPassword] = useState("");

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
    score <= 1 ? "bg-red-500" : score <= 3 ? "bg-[#f2c06b]" : "bg-[#25b99a]";

  const strengthWidth =
    score === 0 ? "w-0" : score === 1 ? "w-1/4" : score === 2 ? "w-2/4" : score === 3 ? "w-3/4" : "w-full";

  const CheckLine = ({ ok, text }: { ok: boolean; text: string }) => (
    <div className={ok ? "text-[#25b99a]" : "text-white/55"}>
      {ok ? "✓" : "×"} {text}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-16 text-white flex items-center justify-center">
      <div className="w-full max-w-[470px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl">
        <div className="px-7 pt-7 pb-5 text-center">
          <h1 className="text-[28px] font-black uppercase text-[#25b99a]">
            RIVER NECK ACRES
          </h1>
          <p className="mt-2 text-[16px] font-semibold text-white/80">
            Book your adventure today
          </p>
        </div>

        <div className="grid grid-cols-2 bg-white/10 p-1">
          <button
            onClick={() => setTab("signin")}
            className={`rounded-lg py-3 text-[16px] font-black transition ${
              tab === "signin"
                ? "bg-[#151515] text-white shadow"
                : "text-white hover:bg-white/10"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setTab("signup")}
            className={`rounded-lg py-3 text-[16px] font-black transition ${
              tab === "signup"
                ? "bg-[#151515] text-white shadow"
                : "text-white hover:bg-white/10"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="px-7 py-7">
          {tab === "signin" ? (
            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-[15px] font-black">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="h-[46px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition focus:border-[#f2c06b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-black">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-[46px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition focus:border-[#f2c06b]"
                />
              </div>

              <button
                type="button"
                className="text-[14px] font-semibold text-[#25b99a] transition hover:text-[#f2c06b]"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                className="h-[56px] w-full rounded-xl bg-[#25d0bd] text-[15px] font-black text-white transition hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(37,208,189,0.45)]"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-[15px] font-black">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="h-[46px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition focus:border-[#f2c06b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-black">Email *</label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="h-[46px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition focus:border-[#f2c06b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-black">Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="h-[46px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition focus:border-[#f2c06b]"
                />
                <p className="mt-2 text-[13px] font-semibold text-white/70">
                  Required for booking confirmations
                </p>
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-black">Password *</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="h-[46px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-white outline-none transition focus:border-[#f2c06b]"
                />

                <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full ${strengthWidth} ${strengthColor} transition-all duration-300`} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] font-semibold">
                  <CheckLine ok={checks.length} text="6+ characters" />
                  <CheckLine ok={checks.upper} text="Uppercase letter" />
                  <CheckLine ok={checks.lower} text="Lowercase letter" />
                  <CheckLine ok={checks.number} text="Number" />
                </div>
              </div>

              <button
                type="submit"
                className="h-[56px] w-full rounded-xl bg-[#f2c06b] text-[15px] font-black text-white transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(242,192,107,0.5)]"
              >
                Create Account
              </button>
            </form>
          )}

          <a
            href="/"
            className="mt-7 block text-center text-[15px] font-black text-white transition hover:text-[#f2c06b]"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}