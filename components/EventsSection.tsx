"use client";

import { Calendar, Phone } from "lucide-react";

const VENDOR_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScfIq7x8tIeyCzXEkxzlJ5lSoFCFG_MMHlQ9seIyBdcwIDOrg/viewform";

const events = [
  { start: "2025-12-14", end: "2025-12-25", dateLabel: "Dec 14-25", title: "Closed for Christmas", details: "" },
  { start: "2025-12-26", end: "2025-12-29", dateLabel: "Dec 26-29", title: "New Year's @ the Neck", details: "Music, bonfire, & more...night ride 9pm" },
  { start: "2026-01-04", end: "2026-01-14", dateLabel: "Jan 4-14", title: "CLOSED FOR WINTER GROUNDSKEEPING", details: "" },
  { start: "2026-01-15", end: "2026-01-19", dateLabel: "Jan 15-19", title: "MLK and Customer Appreciation", details: "Opening day pricing $5/person, $10/machine, $5/person/night dry camping" },
  { start: "2026-02-12", end: "2026-02-16", dateLabel: "Feb 12-16", title: "Valentine's Night Ride Saturday", details: "Feb 14: 9:30pm, Presidents Day 4-day weekend" },
  { start: "2026-03-05", end: "2026-03-08", dateLabel: "Mar 5-8", title: "Annual Spring Fling: Concert, Racing and More", details: "Night ride 11:30pm, ACTIVITIES AND CONCERT SAT 3/7" },
  { start: "2026-04-02", end: "2026-04-06", dateLabel: "Apr 2-6", title: "Easter Weekend", details: "$2500 egg hunt & night ride Sat 9:30pm" },
  { start: "2026-04-17", end: "2026-04-19", dateLabel: "Apr 17-19", title: "Low Country Hare Scramble", details: "" },
  { start: "2026-05-10", end: "2026-05-10", dateLabel: "May 10", title: "Mother's Day", details: "Bring mom Sunday and she rides FREE!" },
  { start: "2026-05-11", end: "2026-05-17", dateLabel: "May 11-17", title: "Summer Kick Off: Music, Racing and More", details: "Night ride Sat 11:30pm, ACTIVITIES AND MUSIC SAT 5/16" },
  { start: "2026-05-21", end: "2026-05-25", dateLabel: "May 21-25", title: "Memorial Day 4-Day Weekend", details: "Night ride Sat 9:30pm" },
  { start: "2026-06-18", end: "2026-06-21", dateLabel: "Jun 18-21", title: "Father's Day Poker Run", details: "Sat 4:00pm, night ride Sat 9:30pm, bring dad Sunday and he rides FREE!" },
  { start: "2026-07-02", end: "2026-07-05", dateLabel: "Jul 2-5", title: "4th of July Weekend", details: "Night ride Sat 9:30pm" },
  { start: "2026-07-20", end: "2026-07-30", dateLabel: "Jul 20-30", title: "CLOSED FOR SUMMER GROUNDSKEEPING", details: "" },
  { start: "2026-09-03", end: "2026-09-07", dateLabel: "Sep 3-7", title: "Labor Day 4-Day Weekend", details: "Night ride Sat 9:30pm" },
  { start: "2026-10-01", end: "2026-10-04", dateLabel: "Oct 1-4", title: "Free Weekend Charity Event", details: "ONLY FRI & SAT, Min $1 donation to charity required per day, Night ride Sat 9:30pm" },
  { start: "2026-10-22", end: "2026-10-25", dateLabel: "Oct 22-25", title: "Halloween Mudbash", details: "Trick-or-Treat, costume contest, $2500 pumpkin hunt, night ride Sat 9:30pm" },
  { start: "2026-11-12", end: "2026-11-15", dateLabel: "Nov 12-15", title: "Annual Fall Bash: Concert, Racing and More", details: "Night ride 11:30pm, ACTIVITIES AND CONCERT SAT 11/14" },
  { start: "2026-11-25", end: "2026-11-29", dateLabel: "Nov 25-29", title: "Open for Thanksgiving", details: "Dinner Thursday 11/26 4pm" },
  { start: "2026-12-21", end: "2026-12-30", dateLabel: "Dec 21-30", title: "CLOSED FOR CHRISTMAS", details: "" },
  { start: "2026-12-31", end: "2027-01-03", dateLabel: "Dec 31-Jan 3", title: "New Years @ the Neck", details: "Night ride Sat" },
];

function getStatus(event: (typeof events)[number], upcomingId: number, index: number) {
  const today = new Date();
  const end = new Date(event.end + "T23:59:59");

  if (end < today) return "past";
  if (index === upcomingId) return "coming";
  return "future";
}

export default function EventsSection() {
  const upcomingId = events.findIndex((event) => {
    const end = new Date(event.end + "T23:59:59");
    return end >= new Date();
  });

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#10100f] px-4 py-20 text-white md:px-[5%] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.22),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.10),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_48%,#0b1110_100%)]" />

      <div className="relative z-10">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-[34px] font-black uppercase leading-[0.95] tracking-[-1px] md:text-[52px]">
            EVENTS & SCHEDULE 2025-2026
          </h2>

          <p className="mt-4 text-[18px] font-medium text-white/75 md:mt-6 md:text-[22px]">
            Plan your visit with our event calendar
          </p>
        </div>

        <div className="mx-auto max-w-[1320px] rounded-[22px] border border-[#25b99a]/25 bg-[#2b221d]/92 p-4 shadow-[0_35px_110px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10">
          <h3 className="mb-6 text-center text-[24px] font-black uppercase leading-tight md:mb-8 md:text-[30px]">
            River Neck Acres ATV Park - Events Schedule
          </h3>

          <div className="space-y-4">
            {events.map((event, index) => {
              const status = getStatus(event, upcomingId, index);

              return (
                <div
                  key={`${event.dateLabel}-${event.title}`}
                  className={[
                    "group flex flex-col gap-4 rounded-[16px] border px-4 py-5 transition-all duration-300 md:flex-row md:items-start md:gap-8 md:px-6",
                    status === "coming"
                      ? "border-[#f2b35f] bg-[#2a2114] shadow-[0_0_22px_rgba(242,179,95,0.23)]"
                      : "",
                    status === "past"
                      ? "border-white/5 bg-[#171619]/80 text-white/55"
                      : "",
                    status === "future"
                      ? "border-white/10 bg-[#18171a]/90 hover:border-[#25b99a]/60 hover:bg-[#202024]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3 text-[16px] font-black md:min-w-[150px] md:text-[17px]">
                    <Calendar
                      size={20}
                      className={
                        status === "past"
                          ? "shrink-0 text-[#25b99a]/40"
                          : "shrink-0 text-[#25b99a]"
                      }
                    />

                    <span className={status === "past" ? "text-white/55" : "text-white"}>
                      {event.dateLabel}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
                      <h4
                        className={`text-[19px] font-black leading-tight md:text-[20px] ${
                          status === "past" ? "text-white/55" : "text-white"
                        }`}
                      >
                        {event.title}
                      </h4>

                      {status === "coming" && (
                        <span className="w-fit rounded-full bg-[#f2b35f] px-3 py-1 text-[12px] font-black text-black">
                          Coming Up
                        </span>
                      )}

                      {status === "past" && (
                        <span className="text-[12px] font-black text-white/40">
                          (Past Event)
                        </span>
                      )}
                    </div>

                    {event.details && (
                      <p
                        className={`mt-2 text-[15px] font-medium leading-[1.55] md:text-[16px] ${
                          status === "past" ? "text-white/40" : "text-white/70"
                        }`}
                      >
                        {event.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1320px] rounded-[22px] border border-[#f2b35f]/45 bg-[#5a3d2d]/55 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl md:mt-12 md:p-10">
          <h3 className="mb-4 text-[24px] font-black uppercase md:mb-5 md:text-[28px]">
            Vendor Information
          </h3>

          <p className="mb-5 text-[16px] font-bold leading-[1.55] text-white/85 md:text-[17px]">
            Interested in being a vendor at our events? We'd love to have you join us!
          </p>

          <div className="mb-6 flex items-start gap-3 text-[18px] font-black">
            <Phone size={20} className="mt-1 shrink-0 text-[#f2b35f]" />

            <div className="flex flex-col">
              <span className="text-white">Contact Jamey:</span>

              <a
                href="tel:8435034741"
                className="w-fit cursor-pointer text-[#f2b35f] transition hover:text-white"
              >
                843.503.4741
              </a>
            </div>
          </div>

          <div className="mb-6 rounded-[12px] border border-white/15 bg-[#242226]/90 p-5 text-[16px] font-medium text-white/85 md:p-6">
            <p className="mb-2 font-black">Vendor Fees:</p>
            <p>• $100 per day</p>
            <p>• $250 Thursday - Sunday</p>
          </div>

          <a
            href={VENDOR_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full cursor-pointer justify-center rounded-[10px] bg-[#fff4d8] px-8 py-4 text-[16px] font-black text-[#6b4a31] transition hover:scale-105 hover:bg-[#f2b35f] hover:text-black md:w-auto"
          >
            Apply as Vendor
          </a>
        </div>
      </div>
    </section>
  );
}