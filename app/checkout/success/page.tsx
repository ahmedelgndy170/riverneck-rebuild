"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Home, Receipt } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.35),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.18),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <section className="relative z-10 mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.06] p-6 text-center shadow-[0_35px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-10">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#25b99a]/30 bg-[#25b99a]/10 text-[#25d0bd] shadow-[0_0_45px_rgba(37,185,154,0.25)]">
          <CheckCircle size={52} />
        </div>

        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#25d0bd]">
          River Neck Acres
        </p>

        <h1 className="mt-3 text-[34px] font-black uppercase leading-none tracking-[-1px] md:text-[56px]">
          Order Created
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[15px] font-semibold leading-[1.7] text-white/70 md:text-[17px]">
          Your order has been saved successfully. Square payment connection is
          the next step.
        </p>

        {orderId && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/45">
              Order ID
            </p>

            <p className="mt-2 break-all text-[13px] font-bold text-[#25d0bd]">
              {orderId}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-[54px] items-center justify-center gap-2 rounded-xl bg-[#25b99a] px-7 text-[14px] font-black text-white shadow-[0_0_28px_rgba(37,185,154,0.35)] transition hover:bg-[#2ed9b7] active:scale-95"
          >
            <Home size={18} />
            Go Home
          </Link>

          <Link
            href="/purchase"
            className="inline-flex h-[54px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-7 text-[14px] font-black text-white transition hover:bg-white/10 active:scale-95"
          >
            <Receipt size={18} />
            Buy More
          </Link>
        </div>
      </section>
    </main>
  );
}