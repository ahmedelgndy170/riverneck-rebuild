"use client";

import { Suspense } from "react";
import AboutPage from "@/components/AboutPage";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#101010] text-white selection:bg-[#f2c06b] selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.22),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.12),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10">
        <Suspense fallback={null}>
          <AboutPage />
        </Suspense>
      </div>
    </main>
  );
}
