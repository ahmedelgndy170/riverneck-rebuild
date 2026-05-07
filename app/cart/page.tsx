"use client";

import Footer from "../../components/Footer";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#101010] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.28),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <section className="relative z-10 px-4 pb-24 pt-[130px] md:px-[8%] md:pb-28 md:pt-[150px]">
        <div className="mx-auto max-w-[860px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-14">
          {/* ICON */}
          <div className="mx-auto mb-7 flex h-[110px] w-[110px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.06)] md:h-[130px] md:w-[130px]">
            <ShoppingCart
              size={58}
              strokeWidth={1.8}
              className="text-[#25b99a] md:size-[70px]"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-[34px] font-black leading-none tracking-tight md:text-[52px]">
            Your Cart is Empty
          </h1>

          {/* TEXT */}
          <p className="mx-auto mt-6 max-w-[620px] text-[16px] font-semibold leading-[1.7] text-white/70 md:text-[19px]">
            Add bookings, day passes, memberships, or event tickets
            to get started!
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-5">
            <a
              href="/purchase"
              className="flex h-[58px] w-full items-center justify-center rounded-xl bg-[#25b99a] px-8 text-[15px] font-black text-white shadow-[0_0_28px_rgba(37,185,154,0.35)] transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:bg-[#2ed9b7] hover:shadow-[0_0_38px_rgba(37,185,154,0.55)] md:w-auto"
            >
              Browse Options
            </a>

            <a
              href="/"
              className="flex h-[58px] w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-8 text-[15px] font-black text-white transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:bg-white/10 md:w-auto"
            >
              Go Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}