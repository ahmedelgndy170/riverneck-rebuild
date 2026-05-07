"use client";

import EventsSection from "./EventsSection";

export default function EventsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10100f] text-white selection:bg-[#f2c06b] selection:text-black">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.18),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.10),transparent_32%),linear-gradient(180deg,#10100f_0%,#17120f_45%,#0b1110_100%)]" />

      {/* CONTENT */}
      <div className="relative z-10">
        <EventsSection />
      </div>
    </main>
  );
}