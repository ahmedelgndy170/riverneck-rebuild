"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Users,
  Bike,
  Tent,
  Moon,
  Ticket,
} from "lucide-react";

type TabType = "day" | "membership" | "events";

type TicketItem = {
  name: string;
  subtitle: string;
  desc: string;
  price: number;
};

const EVENTS = [
  {
    name: "Summer Kick Off 2026",
    startDate: "2026-05-11",
    endDate: "2026-05-17",
    displayDate: "May 11 - May 17, 2026",
    tickets: [
      {
        name: "Child Ticket",
        subtitle: "Age 3-8",
        desc: "Special pricing for children ages 3 to 8",
        price: 10,
      },
      {
        name: "Concert ONLY",
        subtitle: "Live Music",
        desc: "Concert admission only",
        price: 25,
      },
      {
        name: "Saturday ONLY",
        subtitle: "Music at 8 PM",
        desc: "Saturday access with music admission",
        price: 60,
      },
      {
        name: "All Weekend Ticket",
        subtitle: "Thursday to Sunday",
        desc: "Complete weekend experience including music",
        price: 75,
      },
      {
        name: "All WEEK Ticket",
        subtitle: "Monday to Sunday",
        desc: "Full week access to all Summer Kick Off activities",
        price: 100,
      },
    ],
  },
  {
    name: "Memorial Day Weekend 2026",
    startDate: "2026-05-22",
    endDate: "2026-05-25",
    displayDate: "May 22 - May 25, 2026",
    tickets: [
      {
        name: "Child Ticket",
        subtitle: "Age 3-8",
        desc: "Special pricing for children ages 3 to 8",
        price: 10,
      },
      {
        name: "Saturday ONLY",
        subtitle: "One Day Pass",
        desc: "Saturday access only",
        price: 60,
      },
      {
        name: "Weekend Pass",
        subtitle: "Friday to Monday",
        desc: "Memorial Day weekend access",
        price: 75,
      },
    ],
  },
];

export default function PurchasePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("day");
  const [dateRange, setDateRange] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const [people, setPeople] = useState(1);
  const [machines, setMachines] = useState(0);
  const [nightRide, setNightRide] = useState(false);
  const [tentCamping, setTentCamping] = useState(false);
  const [tentNights, setTentNights] = useState(1);

  const [memberPeople, setMemberPeople] = useState(2);
  const [memberMachines, setMemberMachines] = useState(1);

  const today = new Date();

  const currentEvent =
    EVENTS.find((event) => new Date(event.endDate) >= today) || EVENTS[0];

  const eventTickets = currentEvent.tickets;

  const [ticketQty, setTicketQty] = useState<Record<string, number>>({});

  const tentCampingTotal = tentCamping ? tentNights * 10 : 0;

  const daySubtotal = useMemo(() => {
    let total = people * 10 + machines * 15;
    if (nightRide) total += people * 5;
    if (tentCamping) total += tentNights * 10;
    return total;
  }, [people, machines, nightRide, tentCamping, tentNights]);

  const dayTax = daySubtotal * 0.05;
  const dayFee = daySubtotal * 0.05;
  const dayTotal = daySubtotal + dayTax + dayFee;

  const memberTotal = useMemo(() => {
    const extraPeople = Math.max(0, memberPeople - 2) * 50;
    const extraMachines = Math.max(0, memberMachines - 1) * 100;
    return 500 + extraPeople + extraMachines;
  }, [memberPeople, memberMachines]);

  const isLoggedIn = () => {
    return Boolean(
      localStorage.getItem("riverneckUser") ||
        localStorage.getItem("user") ||
        localStorage.getItem("token")
    );
  };

  const addToCartOrSignIn = (item: any) => {
    if (!isLoggedIn()) {
      router.push("/auth?redirect=/cart");
      return;
    }

    const oldCart = JSON.parse(localStorage.getItem("riverneckCart") || "[]");

    localStorage.setItem(
      "riverneckCart",
      JSON.stringify([
        ...oldCart,
        {
          id: crypto.randomUUID(),
          ...item,
        },
      ])
    );

    router.push("/cart");
  };

  const handleDayPassAdd = () => {
    addToCartOrSignIn({
      type: "Day Pass",
      dateRange,
      people,
      machines,
      nightRide,
      tentCamping,
      tentNights: tentCamping ? tentNights : 0,
      tentCampingTotal,
      subtotal: daySubtotal,
      tax: dayTax,
      fee: dayFee,
      total: dayTotal,
    });
  };

  const handleMembershipAdd = () => {
    addToCartOrSignIn({
      type: "Annual Membership",
      people: memberPeople,
      machines: memberMachines,
      total: memberTotal,
    });
  };

  const handleTicketAdd = (ticket: TicketItem) => {
    const qty = ticketQty[ticket.name] || 1;

    addToCartOrSignIn({
      type: "Event Ticket",
      event: currentEvent.name,
      eventDate: currentEvent.displayDate,
      ticketName: ticket.name,
      quantity: qty,
      price: ticket.price,
      total: ticket.price * qty,
    });
  };

  const updateTicketQty = (name: string, value: number) => {
    setTicketQty((prev) => ({
      ...prev,
      [name]: Math.max(1, value),
    }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10100f] px-4 py-10 text-white md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.35),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.20),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(35,126,96,0.25),transparent_40%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-[#1d6d54]/35 to-transparent" />

      <section className="relative z-10 mx-auto w-full max-w-[1120px]">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#63d6b8] md:text-sm">
            River Neck Acres
          </p>

          <h1 className="mt-3 text-[34px] font-black tracking-tight text-white md:text-5xl">
            Day Pass & More
          </h1>

          <p className="mx-auto mt-3 max-w-[700px] text-[16px] font-semibold leading-[1.55] text-white/75 md:text-lg">
            Purchase your passes, memberships, and event tickets.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-2 rounded-xl border border-white/15 bg-white/10 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:grid-cols-3">
          <TabButton active={activeTab === "day"} onClick={() => setActiveTab("day")}>
            Day Pass
          </TabButton>

          <TabButton
            active={activeTab === "membership"}
            onClick={() => setActiveTab("membership")}
          >
            Annual Membership
          </TabButton>

          <TabButton
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          >
            Event Tickets
          </TabButton>
        </div>

        {activeTab === "day" && (
          <Panel>
            <h2 className="text-[28px] font-black md:text-3xl">
              Day Pass Details
            </h2>

            <p className="mt-2 text-[15px] font-bold leading-[1.55] text-white/90 md:text-base">
              $10 per person/day | $15 per machine/day | Optional night ride +$5/day
            </p>

            <div className="relative mt-8">
              <label className="mb-3 block font-black">Select Date Range</label>

              <button
                type="button"
                onClick={() => setShowCalendar((prev) => !prev)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-[#242226] px-4 py-4 text-left font-bold text-white transition active:scale-[0.98] hover:bg-[#fff0a6] hover:text-black focus:bg-[#fff0a6] focus:text-black"
              >
                <CalendarDays size={22} className="shrink-0" />
                <span>{dateRange || "Select date range"}</span>
              </button>

              {showCalendar && (
                <DatePicker
                  onPick={(date) => {
                    setDateRange(date);
                    setShowCalendar(false);
                  }}
                />
              )}

              <p className="mt-3 text-[14px] font-bold leading-[1.5] text-red-300 md:text-base">
                Day passes are not available during Summer Kick Off (May 14-17, 2026).
                Event tickets must be purchased separately.
              </p>
            </div>

            <NumberField
              label="Number of People"
              icon={<Users size={20} />}
              value={people}
              setValue={setPeople}
              min={1}
            />

            <NumberField
              label="Number of Machines"
              icon={<Bike size={20} />}
              value={machines}
              setValue={setMachines}
              min={0}
            />

            <CheckRow
              checked={nightRide}
              setChecked={setNightRide}
              icon={<Moon size={20} />}
              label="Add Night Ride Pass (+$5)"
            />

            <CheckRow
              checked={tentCamping}
              setChecked={setTentCamping}
              icon={<Tent size={20} />}
              label="Include Tent Camping"
            />

            {tentCamping && (
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-5">
                <label className="mb-3 block font-black">Number of Nights</label>

                <select
                  value={tentNights}
                  onChange={(e) => setTentNights(Number(e.target.value))}
                  className="h-[54px] w-full cursor-pointer rounded-lg border border-white/15 bg-[#242226] px-4 font-black text-white outline-none transition hover:border-[#f6c35f] focus:border-[#63d6b8]"
                >
                  {Array.from({ length: 11 }).map((_, index) => {
                    const night = index + 1;

                    return (
                      <option key={night} value={night} className="bg-[#242226]">
                        {night} {night === 1 ? "Night" : "Nights"}
                      </option>
                    );
                  })}
                </select>

                <p className="mt-2 text-[14px] font-bold text-white/80 md:text-base">
                  $10 per night • Unlimited availability
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-white/15 pt-5">
              <PriceRow label="Subtotal:" value={daySubtotal} />

              {tentCamping && (
                <PriceRow
                  label={`Tent Camping (${tentNights} ${
                    tentNights === 1 ? "night" : "nights"
                  }):`}
                  value={tentCampingTotal}
                />
              )}

              <PriceRow label="Admission Tax (5%):" value={dayTax} />
              <PriceRow label="Card Processing Fee (5%):" value={dayFee} />

              <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-xl font-black">
                <span>Total:</span>
                <span>${dayTotal.toFixed(2)}</span>
              </div>
            </div>

            <AddToCartButton onClick={handleDayPassAdd} />
          </Panel>
        )}

        {activeTab === "membership" && (
          <Panel>
            <h2 className="text-[28px] font-black md:text-3xl">
              Membership Details
            </h2>

            <p className="mt-2 text-[15px] font-bold leading-[1.55] text-white/90 md:text-base">
              Base package: $500 for 2 people, 1 machine. Includes dry camping.
              Does not include the four major annual events.
            </p>

            <div className="mt-8 rounded-xl bg-white/15 p-5">
              <h3 className="font-black">Membership Period</h3>
              <p className="font-semibold text-white/90">
                Valid for 1 full year from the date of purchase.
              </p>
            </div>

            <NumberField
              label="Number of People"
              value={memberPeople}
              setValue={setMemberPeople}
              min={2}
              note="Base includes 2 people. Additional people: +$50 each"
            />

            <NumberField
              label="Number of Machines"
              value={memberMachines}
              setValue={setMemberMachines}
              min={1}
              note="Base includes 1 machine. Additional machines: +$100 each"
            />

            <div className="mt-8 border-t border-white/15 pt-5">
              <PriceRow label="Base Package:" value={500} />

              <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-xl font-black">
                <span>Total:</span>
                <span className="text-[#63d6b8]">${memberTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/15 p-5">
              <h3 className="mb-2 font-black">Membership Benefits:</h3>
              <ul className="list-disc space-y-1 pl-5 text-[15px] font-semibold leading-[1.55] text-white/90 md:text-base">
                <li>Unlimited day riding for 1 full year</li>
                <li>Dry camping included</li>
                <li>Access to all trails</li>
                <li>Valid for 2 people and 1 machine</li>
                <li>Does not include entry to the four major annual events</li>
              </ul>
            </div>

            <AddToCartButton onClick={handleMembershipAdd} />
          </Panel>
        )}

        {activeTab === "events" && (
          <Panel>
            <div className="mb-6 flex items-start gap-3">
              <Ticket size={26} className="mt-1 shrink-0" />

              <div>
                <h2 className="text-[28px] font-black md:text-3xl">
                  Event Tickets
                </h2>

                <p className="text-[15px] font-semibold leading-[1.55] text-white/90 md:text-base">
                  Purchase tickets for the next upcoming event.
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-[#63d6b8]/20 bg-gradient-to-r from-[#1d6d54]/45 to-[#f6c35f]/12 p-5">
              <h3 className="text-[23px] font-black leading-tight md:text-2xl">
                {currentEvent.name}
              </h3>
              <p className="mt-1 font-bold">{currentEvent.displayDate}</p>
            </div>

            <div className="space-y-4">
              {eventTickets.map((ticket) => (
                <div
                  key={ticket.name}
                  className="grid grid-cols-1 gap-5 rounded-xl border border-white/15 bg-white/5 p-5 transition hover:border-[#63d6b8]/60 hover:bg-white/10 md:grid-cols-[1fr_auto_auto_auto] md:items-center"
                >
                  <div>
                    <h3 className="text-xl font-black">{ticket.name}</h3>
                    <p className="font-bold">{ticket.subtitle}</p>
                    <p className="font-semibold text-white/80">{ticket.desc}</p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-2xl font-black text-[#63d6b8]">
                      ${ticket.price.toFixed(2)}
                    </p>
                    <p className="text-xs font-black text-white/80">per ticket</p>
                  </div>

                  <select
                    value={ticketQty[ticket.name] || 1}
                    onChange={(e) =>
                      updateTicketQty(ticket.name, Number(e.target.value))
                    }
                    className="h-[52px] w-full cursor-pointer rounded-lg border border-white/15 bg-[#242226] px-3 text-center font-black text-white outline-none transition hover:border-[#f6c35f] focus:border-[#63d6b8] md:w-[88px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num} className="bg-[#242226]">
                        {num}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleTicketAdd(ticket)}
                    className="h-[52px] w-full cursor-pointer rounded-lg bg-[#1d6d54] px-6 font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition-all duration-300 active:scale-95 hover:bg-[#f6c35f] hover:text-black md:w-auto"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </section>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-xl px-4 py-4 text-[14px] font-black transition-all duration-300 active:scale-95 md:text-sm ${
        active
          ? "bg-[#3a343a] text-white ring-2 ring-white/25 shadow-[0_0_22px_rgba(255,255,255,0.16)]"
          : "text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-[#373338]/88 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  setValue,
  min = 0,
  note,
  icon,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  note?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mt-7">
      <label className="mb-3 flex items-center gap-2 font-black">
        {icon}
        {label}
      </label>

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => setValue(Math.max(min, Number(e.target.value)))}
        className="h-[54px] w-full rounded-lg border border-white/15 bg-[#242226] px-4 text-[16px] font-black text-white outline-none transition hover:border-[#f6c35f] focus:border-[#63d6b8]"
      />

      {note && (
        <p className="mt-2 text-[14px] font-semibold leading-[1.45] text-white/90 md:text-base">
          {note}
        </p>
      )}
    </div>
  );
}

function CheckRow({
  checked,
  setChecked,
  label,
  icon,
}: {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className="mt-6 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/15 px-4 py-4 text-left text-[15px] font-black transition-all duration-300 active:scale-[0.98] hover:border-[#f6c35f] hover:bg-white/10"
    >
      <span
        className={`h-4 w-4 shrink-0 rounded-full border ${
          checked ? "border-[#63d6b8] bg-[#63d6b8]" : "border-[#63d6b8]"
        }`}
      />
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-3 flex justify-between gap-4 text-[15px] font-black md:text-base">
      <span>{label}</span>
      <span className="shrink-0">${value.toFixed(2)}</span>
    </div>
  );
}

function AddToCartButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 h-[58px] w-full cursor-pointer rounded-xl bg-[#1d6d54] text-[16px] font-black text-white shadow-[0_0_28px_rgba(29,109,84,0.45)] transition-all duration-300 active:scale-95 hover:bg-[#f6c35f] hover:text-black hover:shadow-[0_0_32px_rgba(246,195,95,0.45)]"
    >
      Add to Cart
    </button>
  );
}

function DatePicker({ onPick }: { onPick: (date: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="absolute left-0 top-[90px] z-20 w-full rounded-xl border border-white/15 bg-[#242226] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.65)] md:max-w-[440px] md:p-5">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          className="cursor-pointer rounded-md px-3 py-2 text-xl font-black transition hover:bg-white/10"
        >
          ‹
        </button>

        <div className="text-center text-lg font-black">
          {monthName} {year}
        </div>

        <button
          type="button"
          onClick={goNextMonth}
          className="cursor-pointer rounded-md px-3 py-2 text-xl font-black transition hover:bg-white/10"
        >
          ›
        </button>
      </div>

      <div className="mb-3 grid grid-cols-7 text-center text-xs font-black text-white/60">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {Array.from({ length: firstDay }).map((_, index) => (
          <span key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onPick(`${monthName} ${day}, ${year}`)}
              className="cursor-pointer rounded-md py-2 text-sm font-black transition hover:bg-[#f6c35f] hover:text-black"
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}