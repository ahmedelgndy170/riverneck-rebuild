"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  KeyRound,
} from "lucide-react";

export default function AdminSetupPage() {
  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function createAdmin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData(
        e.currentTarget
      );

      const res = await fetch(
        "/api/admin/setup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email:
              formData.get("email"),
            password:
              formData.get(
                "password"
              ),
            setupKey:
              formData.get(
                "setupKey"
              ),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage(
          "Admin created successfully!"
        );

        (
          e.target as HTMLFormElement
        ).reset();
      } else {
        setMessage(
          data.error ||
            "Something went wrong"
        );
      }
    } catch {
      setMessage(
        "Server connection failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f0f] px-4 py-8 text-white md:px-6 md:py-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,185,154,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(242,192,107,0.14),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#17130f_50%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] shadow-[0_35px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {/* HEADER */}
        <div className="border-b border-white/10 px-5 pb-6 pt-7 text-center md:px-8 md:pb-7 md:pt-9">
          <div className="mx-auto mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#25b99a]/35 bg-[#25b99a]/12 shadow-[0_0_34px_rgba(37,185,154,0.25)]">
            <ShieldCheck
              size={38}
              className="text-[#25b99a]"
            />
          </div>

          <h1 className="text-[28px] font-black uppercase tracking-tight text-[#25b99a] md:text-[38px]">
            Admin Setup
          </h1>

          <p className="mt-3 text-[14px] font-semibold leading-[1.6] text-white/70 md:text-[16px]">
            Create the first River Neck
            Acres administrator account
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={createAdmin}
          className="space-y-5 px-4 py-6 md:px-8 md:py-8"
        >
          <Field
            label="Full Name"
            icon={<User size={17} />}
          >
            <input
              name="name"
              required
              placeholder="John Doe"
              className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#25b99a] focus:bg-black/40 md:text-[15px]"
            />
          </Field>

          <Field
            label="Email Address"
            icon={<Mail size={17} />}
          >
            <input
              name="email"
              type="email"
              required
              placeholder="admin@email.com"
              className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#25b99a] focus:bg-black/40 md:text-[15px]"
            />
          </Field>

          <Field
            label="Password"
            icon={<Lock size={17} />}
          >
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#25b99a] focus:bg-black/40 md:text-[15px]"
            />
          </Field>

          <Field
            label="Setup Key"
            icon={
              <KeyRound size={17} />
            }
          >
            <input
              name="setupKey"
              required
              placeholder="Secret setup key"
              className="h-[54px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#f2c06b] focus:bg-black/40 md:text-[15px]"
            />

            <p className="mt-2 text-[12px] font-semibold leading-[1.5] text-white/55">
              This key protects admin
              account creation.
            </p>
          </Field>

          <button
            disabled={loading}
            className="h-[56px] w-full touch-manipulation rounded-xl bg-[#f2c06b] text-[15px] font-black text-black shadow-[0_0_26px_rgba(242,192,107,0.22)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffd27d] hover:shadow-[0_0_38px_rgba(242,192,107,0.45)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Admin..."
              : "Create Admin"}
          </button>

          {message && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-[13px] font-semibold text-white/85">
              {message}
            </div>
          )}
        </form>
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
        <span className="text-[#25b99a]">
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}