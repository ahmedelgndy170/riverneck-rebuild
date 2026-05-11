"use client";

import { useMemo } from "react";
import { AlertTriangle, Calendar, Lock, Phone } from "lucide-react";

const VENDOR_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScfIq7x8tIeyCzXEkxzlJ5lSoFCFG_MMHlQ9seIyBdcwIDOrg/viewform";

type EventType = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
};

type EventStatus = "past" | "coming" | "future";

const EVENTS: EventType[] = [
  {
    id: "1",
    title: "Closed for Christmas",
    description: "River Neck Acres will be closed for Christmas.",
    startDate: "2025-12-24",
    endDate: "2025-12-26",
    dateLabel: "December 24 - 26, 2025",
  },
  {
    id: "2",
    title: "New Year's @ the Neck",
    description: "Celebrate the new year at River Neck Acres.",
    startDate: "2025-12-31",
    endDate: "2026-01-02",
    dateLabel: "December 31, 2025 - January 2, 2026",
  },
  {
    id: "3",
    title: "Closed for Winter Groundskeeping",
    description: "Park closed temporarily for winter groundskeeping.",
    startDate: "2026-01-12",
    endDate: "2026-01-16",
    dateLabel: "January 12 - 16, 2026",
  },
  {
    id: "4",
    title: "MLK and Customer Appreciation",
    description: "Join us for riding, camping, and customer appreciation weekend.",
    startDate: "2026-01-17",
    endDate: "2026-01-19",
    dateLabel: "January 17 - 19, 2026",
  },
  {
    id: "5",
    title: "Valentine's Night Ride Saturday",
    description: "Special night ride event with camping and mud fun.",
    startDate: "2026-02-14",
    endDate: "2026-02-15",
    dateLabel: "February 14, 2026",
  },
  {
    id: "6",
    title: "Annual Spring Fling",
    description: "Annual Spring Fling featuring riding, camping, events, and more.",
    startDate: "2026-03-02",
    endDate: "2026-03-08",
    dateLabel: "March 2 - 8, 2026",
  },
  {
    id: "7",
    title: "Easter Weekend",
    description: "Spend Easter weekend riding and camping with us.",
    startDate: "2026-04-03",
    endDate: "2026-04-05",
    dateLabel: "April 3 - 5, 2026",
  },
  {
    id: "8",
    title: "Low Country Hare Scramble",
    description: "Low Country Hare Scramble event weekend.",
    startDate: "2026-04-18",
    endDate: "2026-04-19",
    dateLabel: "April 18 - 19, 2026",
  },
  {
    id: "9",
    title: "Mother's Day",
    description: "Mom, Grandma, or your mother figure rides free on Mother's Day.",
    startDate: "2026-05-10",
    endDate: "2026-05-10",
    dateLabel: "May 10, 2026",
  },
  {
    id: "10",
    title: "Annual Summer Kick Off",
    description: "Annual Summer Kick Off with riding, camping, concert, vendors, and more.",
    startDate: "2026-05-11",
    endDate: "2026-05-17",
    dateLabel: "May 11 - 17, 2026",
  },
  {
    id: "11",
    title: "Memorial Day Weekend",
    description: "Memorial Day weekend riding and camping.",
    startDate: "2026-05-22",
    endDate: "2026-05-25",
    dateLabel: "May 22 - 25, 2026",
  },
  {
    id: "12",
    title: "Father's Day Poker Run",
    description: "Father's Day weekend event and poker run.",
    startDate: "2026-06-19",
    endDate: "2026-06-21",
    dateLabel: "June 19 - 21, 2026",
  },
  {
    id: "13",
    title: "4th of July Weekend",
    description: "Celebrate 4th of July weekend at River Neck Acres.",
    startDate: "2026-07-03",
    endDate: "2026-07-05",
    dateLabel: "July 3 - 5, 2026",
  },
  {
    id: "14",
    title: "Closed for Summer Groundskeeping",
    description: "Park closed for summer groundskeeping and maintenance.",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    dateLabel: "August 10 - 14, 2026",
  },
  {
    id: "15",
    title: "Labor Day",
    description: "Labor Day weekend riding and camping.",
    startDate: "2026-09-04",
    endDate: "2026-09-07",
    dateLabel: "September 4 - 7, 2026",
  },
  {
    id: "16",
    title: "Free Weekend Charity Event",
    description: "Free weekend charity event at River Neck Acres.",
    startDate: "2026-09-18",
    endDate: "2026-09-20",
    dateLabel: "September 18 - 20, 2026",
  },
  {
    id: "17",
    title: "Halloween Mudbash",
    description: "Halloween Mudbash weekend with riding, camping, and mud fun.",
    startDate: "2026-10-30",
    endDate: "2026-11-01",
    dateLabel: "October 30 - November 1, 2026",
  },
  {
    id: "18",
    title: "Annual Fall Bash",
    description: "Annual Fall Bash weekend with riding, camping, vendors, and entertainment.",
    startDate: "2026-11-13",
    endDate: "2026-11-15",
    dateLabel: "November 13 - 15, 2026",
  },
  {
    id: "19",
    title: "Thanksgiving",
    description: "Thanksgiving riding, camping, and dinner at River Neck Acres.",
    startDate: "2026-11-25",
    endDate: "2026-11-29",
    dateLabel: "November 25 - 29, 2026",
  },
  {
    id: "20",
    title: "Closed for Christmas",
    description: "River Neck Acres will be closed for Christmas.",
    startDate: "2026-12-24",
    endDate: "2026-12-26",
    dateLabel: "December 24 - 26, 2026",
  },
  {
    id: "21",
    title: "New Years @ the Neck",
    description: "Celebrate New Years at River Neck Acres.",
    startDate: "2026-12-31",
    endDate: "2027-01-02",
    dateLabel: "December 31, 2026 - January 2, 2027",
  },
];

function parseEventDate(date: string, endOfDay = false) {
  return new Date(`${date}T${endOfDay ? "23:59:59" : "00:00:00"}`);
}

function getEventEnd(event: EventType) {
  return parseEventDate(event.endDate || event.startDate, true);
}

function isClosedEvent(event: EventType) {
  const title = event.title.toLowerCase();

  return title.includes("closed") || title.includes("groundskeeping");
}

function sortEvents(events: EventType[]) {
  return [...events].sort((a, b) => {
    return (
      parseEventDate(a.startDate).getTime() -
      parseEventDate(b.startDate).getTime()
    );
  });
}

function getStatus(event: EventType, comingId: string | null): EventStatus {
  const now = new Date();

  if (getEventEnd(event) < now) return "past";
  if (event.id === comingId) return "coming";

  return "future";
}

export default function EventsSection() {
  const events = useMemo(() => sortEvents(EVENTS), []);

  const comingId = useMemo(() => {
    const now = new Date();

    const nextEvent = events.find((event) => {
      return getEventEnd(event) >= now && !isClosedEvent(event);
    });

    return nextEvent?.id || null;
  }, [events]);

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#10100f] px-4 py-14 text-white md:px-[5%] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.22),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.10),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_48%,#0b1110_100%)]" />

      <div className="relative z-10">
        <div className="mb-9 text-center md:mb-14">
          <h2 className="text-[28px] font-black uppercase leading-[1] tracking-[-1px] md:text-[52px]">
            River Neck Acres ATV Park - 2025-2026 Events Schedule
          </h2>

          <p className="mt-4 text-[14px] font-medium leading-[1.7] text-white/75 md:mt-6 md:text-[22px]">
            Plan your visit with our event calendar
          </p>
        </div>

        <div className="mx-auto max-w-[1320px] rounded-[22px] border border-[#25b99a]/25 bg-[#2b221d]/92 p-3 shadow-[0_35px_110px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10">
          <div className="space-y-3 md:space-y-4">
            {events.map((event) => {
              const status = getStatus(event, comingId);
              const closed = isClosedEvent(event);

              return (
                <div
                  key={event.id}
                  className={[
                    "group flex touch-manipulation flex-col gap-5 rounded-[18px] border px-4 py-5 transition-all duration-300 md:px-6 md:py-6 lg:flex-row lg:items-center lg:justify-between",
                    status === "past"
                      ? "border-white/5 bg-black/60 opacity-35 grayscale"
                      : "",
                    status === "coming" && !closed
                      ? "border-[#f2b35f] bg-[#5a482a]/85 shadow-[0_0_34px_rgba(242,179,95,0.35)]"
                      : "",
                    status === "future" && !closed
                      ? "border-[#25b99a]/20 bg-[#18171a]/90 hover:border-[#25b99a]/60 hover:bg-[#202024] active:scale-[0.99]"
                      : "",
                    closed && status !== "past"
                      ? "border-red-400/35 bg-red-950/25 shadow-[0_0_24px_rgba(239,68,68,0.15)]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Calendar
                        size={18}
                        className={
                          status === "past"
                            ? "text-white/25"
                            : closed
                            ? "text-red-300"
                            : "text-[#25b99a]"
                        }
                      />

                      <span
                        className={`text-[13px] font-black uppercase tracking-[0.15em] md:text-[15px] ${
                          status === "past"
                            ? "text-white/30"
                            : closed
                            ? "text-red-200"
                            : "text-white/75"
                        }`}
                      >
                        {event.dateLabel}
                      </span>

                      {status === "coming" && !closed && (
                        <span className="rounded-full bg-[#f2b35f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-black">
                          Coming Up
                        </span>
                      )}

                      {status === "past" && (
                        <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white/35">
                          Past Event
                        </span>
                      )}

                      {closed && status !== "past" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-red-200">
                          <Lock size={12} />
                          Park Closed
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        className={`text-[20px] font-black uppercase leading-tight tracking-[-0.5px] md:text-[30px] ${
                          status === "past"
                            ? "text-white/40"
                            : closed
                            ? "text-red-100"
                            : "text-white"
                        }`}
                      >
                        {event.title}
                      </h3>

                      <p
                        className={`mt-3 max-w-4xl text-[13px] font-semibold leading-[1.8] md:text-[16px] ${
                          status === "past"
                            ? "text-white/25"
                            : closed
                            ? "text-red-100/65"
                            : "text-white/70"
                        }`}
                      >
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {closed || status === "past" ? (
                    <div className="flex min-w-[220px] items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-center text-[13px] font-black uppercase tracking-[0.12em] text-white/45">
                      <AlertTriangle size={17} className="mr-2" />
                      No Tickets Available
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                      <a
                        href="/purchase?tab=events"
                        className="inline-flex h-[54px] items-center justify-center rounded-2xl bg-[#25d0bd] px-7 text-[14px] font-black uppercase tracking-[0.12em] text-black shadow-[0_0_35px_rgba(37,208,189,0.28)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#39e0ce] active:scale-95"
                      >
                        Buy Tickets
                      </a>

                      <a
                        href="/sign-waiver"
                        className="inline-flex h-[54px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-7 text-[13px] font-black uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-white/[0.08] active:scale-95"
                      >
                        Sign Waiver
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1320px] rounded-[22px] border border-[#f2b35f]/45 bg-[#5a3d2d]/55 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl md:mt-12 md:p-10">
          <h3 className="mb-4 text-[22px] font-black uppercase md:mb-5 md:text-[28px]">
            Vendor Information
          </h3>

          <p className="mb-5 text-[14px] font-bold leading-[1.65] text-white/85 md:text-[17px]">
            Interested in being a vendor at our events? We'd love to have you
            join us!
          </p>

          <div className="mb-6 flex items-start gap-3 text-[16px] font-black md:text-[18px]">
            <Phone size={19} className="mt-1 shrink-0 text-[#f2b35f]" />

            <div className="flex flex-col">
              <span className="text-white">Contact Jamey:</span>

              <a
                href="tel:8435034741"
                className="w-fit cursor-pointer touch-manipulation text-white transition-all duration-300 hover:text-[#f2b35f] active:scale-95 active:text-[#f2b35f]"
              >
                843.503.4741
              </a>
            </div>
          </div>

          <div className="mb-6 rounded-[12px] border border-white/15 bg-[#242226]/90 p-4 text-[14px] font-medium leading-[1.65] text-white/85 md:p-6 md:text-[16px]">
            <p className="mb-2 font-black">Vendor Fees:</p>
            <p>• $100 per day</p>
            <p>• $250 Thursday - Sunday</p>
          </div>

          <a
            href={VENDOR_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[54px] w-full cursor-pointer touch-manipulation items-center justify-center rounded-[12px] bg-[#f2b35f] px-8 text-[15px] font-black text-black shadow-[0_0_28px_rgba(242,179,95,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffd27b] hover:shadow-[0_0_38px_rgba(242,179,95,0.55)] active:scale-95 active:bg-[#ffd27b] md:h-auto md:w-auto md:py-4 md:text-[16px]"
          >
            Apply as Vendor
          </a>
        </div>
      </div>
    </section>
  );
}