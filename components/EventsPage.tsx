"use client";

import EventsSection from "./EventsSection";

export default function EventsPage() {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.18),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.10),transparent_32%)]" />

      {/* CONTENT */}
      <div className="relative z-10">
        <EventsSection />
      </div>
    </section>
  );
}