"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
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

type EventTicketGroup = {
  name: string;
  startDate: string;
  endDate: string;
  displayDate: string;
  tickets: TicketItem[];
};

const DEFAULT_TICKETS: TicketItem[] = [
  {
    name: "General Event Admission",
    subtitle: "Event Access",
    desc: "Admission for the selected event.",
    price: 50,
  },
  {
    name: "Weekend Event Pass",
    subtitle: "Full Weekend",
    desc: "Weekend access for the selected event.",
    price: 75,
  },
];

const EVENTS: EventTicketGroup[] = [
  {
    name: "Summer Kick Off: Music, Racing and More",
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
    name: "Annual Spring Fling: Concert, Racing and More",
    startDate: "2026-03-05",
    endDate: "2026-03-08",
    displayDate: "March 5 - March 8, 2026",
    tickets: [
      {
        name: "Weekend Pass",
        subtitle: "Thursday - Sunday",
        desc: "Full Spring Fling access.",
        price: 75,
      },
      {
        name: "Concert & Event Pass",
        subtitle: "Saturday Event",
        desc: "Saturday activities, concert, and event access.",
        price: 60,
      },
      {
        name: "VIP Weekend",
        subtitle: "Premium Access",
        desc: "Premium event access for Spring Fling.",
        price: 150,
      },
    ],
  },
];

export default function PurchasePage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<TabType>("day");
  const [selectedEventName, setSelectedEventName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tab = params.get("tab");
    const eventTitle = params.get("eventTitle");

    if (tab === "membership" || tab === "events" || tab === "day") {
      setActiveTab(tab as TabType);
    }

    if (eventTitle) {
      setSelectedEventName(eventTitle);
    }
  }, []);

  const [dateRange, setDateRange] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const [people, setPeople] = useState(1);
  const [machines, setMachines] = useState(0);
  const [nightRide, setNightRide] = useState(false);
  const [tentCamping, setTentCamping] = useState(false);
  const [tentNights, setTentNights] = useState(1);

  const [memberPeople, setMemberPeople] = useState(2);
  const [memberMachines, setMemberMachines] = useState(1);

  const currentEvent =
    EVENTS.find((event) => event.name === selectedEventName) ||
    (selectedEventName
      ? {
          name: selectedEventName,
          startDate: "",
          endDate: "",
          displayDate: "Selected Event",
          tickets: DEFAULT_TICKETS,
        }
      : EVENTS[0]);

  const eventTickets = currentEvent.tickets;

  const [ticketQty, setTicketQty] = useState<Record<string, number>>({});

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

  const makeCartId = (prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  };

  const addItemToRealCart = (item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }) => {
    addToCart(item);
    router.push("/cart");
  };

  const handleDayPassAdd = () => {
    addItemToRealCart({
      id: makeCartId("day-pass"),
      title: `Day Pass${dateRange ? ` - ${dateRange}` : ""} | ${people} People, ${machines} Machines${
        nightRide ? ", Night Ride" : ""
      }${tentCamping ? `, Tent Camping ${tentNights} Night(s)` : ""}`,
      price: Number(dayTotal.toFixed(2)),
      quantity: 1,
    });
  };

  const handleMembershipAdd = () => {
    addItemToRealCart({
      id: makeCartId("membership"),
      title: `Annual Membership | ${memberPeople} People, ${memberMachines} Machine(s)`,
      price: Number(memberTotal.toFixed(2)),
      quantity: 1,
    });
  };

  const handleTicketAdd = (ticket: TicketItem) => {
    const qty = ticketQty[ticket.name] || 1;

    addItemToRealCart({
      id: makeCartId("event-ticket"),
      title: `${currentEvent.name} - ${ticket.name}`,
      price: ticket.price,
      quantity: qty,
    });
  };

  const updateTicketQty = (name: string, value: number) => {
    setTicketQty((prev) => ({
      ...prev,
      [name]: Math.max(1, value),
    }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10100f] px-4 py-8 text-white selection:bg-[#f2c06b] selection:text-black md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.35),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.20),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(35,126,96,0.25),transparent_40%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <section className="relative z-10 mx-auto w-full max-w-[1120px]">
        <div className="mb-7 text-center md:mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#63d6b8] md:text-sm">
            River Neck Acres
          </p>

          <h1 className="mt-3 text-[30px] font-black tracking-tight text-white md:text-5xl">
            Day Pass & More
          </h1>

          <p className="mx-auto mt-3 max-w-[640px] text-[14px] font-semibold leading-[1.6] text-white/75 md:text-lg">
            Purchase your passes, memberships, and event tickets.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:grid-cols-3">
          <TabButton active={activeTab === "day"} onClick={() => setActiveTab("day")}>
            Day Pass
          </TabButton>

          <TabButton
            active={activeTab === "membership"}
            onClick={() => setActiveTab("membership")}
          >
            Membership
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
            <h2 className="text-[24px] font-black md:text-3xl">
              Day Pass Details
            </h2>

            <p className="mt-2 text-[14px] font-bold leading-[1.6] text-white/90 md:text-base">
              $10 per person/day | $15 per machine/day | Optional night ride
              +$5/day
            </p>

            <div className="relative mt-7">
              <label className="mb-3 block text-[15px] font-black md:text-base">
                Select Date Range
              </label>

              <button
                type="button"
                onClick={() => setShowCalendar((prev) => !prev)}
                className="flex h-[56px] w-full cursor-pointer touch-manipulation items-center gap-3 rounded-xl border border-white/15 bg-[#242226] px-4 text-left text-[14px] font-bold text-white transition active:scale-[0.98] hover:bg-[#fff0a6] hover:text-black focus:bg-[#fff0a6] focus:text-black md:text-base"
              >
                <CalendarDays size={20} className="shrink-0" />
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

              <p className="mt-3 text-[13px] font-bold leading-[1.55] text-red-300 md:text-base">
                Day passes are not available during Summer Kick Off.
              </p>
            </div>

            <NumberField
              label="Number of People"
              icon={<Users size={18} />}
              value={people}
              setValue={setPeople}
              min={1}
            />

            <NumberField
              label="Number of Machines"
              icon={<Bike size={18} />}
              value={machines}
              setValue={setMachines}
              min={0}
            />

            <CheckRow
              checked={nightRide}
              setChecked={setNightRide}
              icon={<Moon size={18} />}
              label="Add Night Ride Pass (+$5)"
            />

            <CheckRow
              checked={tentCamping}
              setChecked={setTentCamping}
              icon={<Tent size={18} />}
              label="Include Tent Camping"
            />

            {tentCamping && (
              <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4 md:p-5">
                <label className="mb-3 block text-[15px] font-black md:text-base">
                  Number of Nights
                </label>

                <select
                  value={tentNights}
                  onChange={(e) => setTentNights(Number(e.target.value))}
                  className="h-[54px] w-full cursor-pointer rounded-xl border border-white/15 bg-[#242226] px-4 text-[15px] font-black text-white outline-none transition hover:border-[#f6c35f] focus:border-[#63d6b8]"
                >
                  {Array.from({ length: 11 }).map((_, index) => {
                    const night = index + 1;

                    return (
                      <option key={night} value={night}>
                        {night} {night === 1 ? "Night" : "Nights"}
                      </option>
                    );
                  })}
                </select>

                <p className="mt-2 text-[13px] font-bold text-white/80 md:text-base">
                  $10 per night
                </p>
              </div>
            )}

            <div className="mt-7 border-t border-white/15 pt-5">
              <PriceRow label="Subtotal:" value={daySubtotal} />
              <PriceRow label="Admission Tax:" value={dayTax} />
              <PriceRow label="Processing Fee:" value={dayFee} />

              <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-[18px] font-black md:text-xl">
                <span>Total:</span>
                <span>${dayTotal.toFixed(2)}</span>
              </div>
            </div>

            <AddToCartButton onClick={handleDayPassAdd} />
          </Panel>
        )}

        {activeTab === "membership" && (
          <Panel>
            <h2 className="text-[24px] font-black md:text-3xl">
              Membership Details
            </h2>

            <p className="mt-2 text-[14px] font-bold leading-[1.6] text-white/90 md:text-base">
              Base package: $500 for 2 people, 1 machine.
            </p>

            <div className="mt-7 rounded-2xl bg-white/10 p-4 md:p-5">
              <h3 className="text-[15px] font-black md:text-base">
                Membership Period
              </h3>

              <p className="mt-1 text-[14px] font-semibold text-white/90 md:text-base">
                Valid for 1 full year from purchase date.
              </p>
            </div>

            <NumberField
              label="Number of People"
              value={memberPeople}
              setValue={setMemberPeople}
              min={2}
              note="Additional people: +$50 each"
            />

            <NumberField
              label="Number of Machines"
              value={memberMachines}
              setValue={setMemberMachines}
              min={1}
              note="Additional machines: +$100 each"
            />

            <div className="mt-7 border-t border-white/15 pt-5">
              <PriceRow label="Base Package:" value={500} />

              <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-[18px] font-black md:text-xl">
                <span>Total:</span>
                <span className="text-[#63d6b8]">
                  ${memberTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <AddToCartButton onClick={handleMembershipAdd} />
          </Panel>
        )}

        {activeTab === "events" && (
          <Panel>
            <div className="mb-5 flex items-start gap-3">
              <Ticket size={22} className="mt-1 shrink-0" />

              <div>
                <h2 className="text-[24px] font-black md:text-3xl">
                  Event Tickets
                </h2>

                <p className="text-[14px] font-semibold leading-[1.6] text-white/90 md:text-base">
                  Purchase tickets for the selected event.
                </p>
              </div>
            </div>

            <div className="mb-5 rounded-2xl border border-[#63d6b8]/20 bg-gradient-to-r from-[#1d6d54]/45 to-[#f6c35f]/12 p-4 md:p-5">
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#63d6b8]">
                Selected Event
              </p>

              <h3 className="text-[20px] font-black leading-tight md:text-2xl">
                {currentEvent.name}
              </h3>

              <p className="mt-1 text-[14px] font-bold md:text-base">
                {currentEvent.displayDate}
              </p>
            </div>

            <div className="space-y-4">
              {eventTickets.map((ticket) => (
                <div
                  key={ticket.name}
                  className="grid grid-cols-1 gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:border-[#63d6b8]/60 hover:bg-white/10 active:scale-[0.99] active:border-[#63d6b8]/60 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:p-5"
                >
                  <div>
                    <h3 className="text-[18px] font-black md:text-xl">
                      {ticket.name}
                    </h3>

                    <p className="text-[14px] font-bold md:text-base">
                      {ticket.subtitle}
                    </p>

                    <p className="text-[13px] font-semibold leading-[1.55] text-white/80 md:text-base">
                      {ticket.desc}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-[24px] font-black text-[#63d6b8]">
                      ${ticket.price.toFixed(2)}
                    </p>

                    <p className="text-[11px] font-black text-white/80">
                      per ticket
                    </p>
                  </div>

                  <select
                    value={ticketQty[ticket.name] || 1}
                    onChange={(e) =>
                      updateTicketQty(ticket.name, Number(e.target.value))
                    }
                    className="h-[50px] w-full cursor-pointer rounded-xl border border-white/15 bg-[#242226] px-3 text-center text-[15px] font-black text-white outline-none transition hover:border-[#f6c35f] focus:border-[#63d6b8] md:w-[88px]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleTicketAdd(ticket)}
                    className="h-[50px] w-full cursor-pointer touch-manipulation rounded-xl bg-[#1d6d54] px-6 text-[15px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition-all duration-300 active:scale-95 hover:bg-[#f6c35f] hover:text-black md:w-auto"
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
      className={`cursor-pointer touch-manipulation rounded-xl px-4 py-3 text-[13px] font-black transition-all duration-300 active:scale-95 md:py-4 md:text-sm ${
        active
          ? "bg-[#3a343a] text-white ring-2 ring-white/25 shadow-[0_0_22px_rgba(255,255,255,0.16)]"
          : "text-white hover:bg-white/10 active:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-[#373338]/88 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
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
    <div className="mt-6">
      <label className="mb-3 flex items-center gap-2 text-[15px] font-black md:text-base">
        {icon}
        {label}
      </label>

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => setValue(Math.max(min, Number(e.target.value)))}
        className="h-[54px] w-full rounded-xl border border-white/15 bg-[#242226] px-4 text-[15px] font-black text-white outline-none transition hover:border-[#f6c35f] focus:border-[#63d6b8]"
      />

      {note && (
        <p className="mt-2 text-[13px] font-semibold leading-[1.55] text-white/90 md:text-base">
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
      className="mt-5 flex w-full cursor-pointer touch-manipulation items-center gap-3 rounded-2xl border border-white/15 px-4 py-4 text-left text-[14px] font-black transition-all duration-300 active:scale-[0.98] hover:border-[#f6c35f] hover:bg-white/10 md:text-[15px]"
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
    <div className="mt-3 flex justify-between gap-4 text-[14px] font-black md:text-base">
      <span>{label}</span>
      <span className="shrink-0">${value.toFixed(2)}</span>
    </div>
  );
}

function AddToCartButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 h-[56px] w-full cursor-pointer touch-manipulation rounded-2xl bg-[#1d6d54] text-[15px] font-black text-white shadow-[0_0_28px_rgba(29,109,84,0.45)] transition-all duration-300 active:scale-95 hover:bg-[#f6c35f] hover:text-black hover:shadow-[0_0_32px_rgba(246,195,95,0.45)] md:h-[58px] md:text-[16px]"
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
    <div className="absolute left-0 top-[82px] z-20 w-full rounded-2xl border border-white/15 bg-[#242226] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.65)] md:max-w-[440px] md:p-5">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          className="cursor-pointer touch-manipulation rounded-md px-3 py-2 text-xl font-black transition hover:bg-white/10 active:scale-90"
        >
          ‹
        </button>

        <div className="text-center text-[17px] font-black md:text-lg">
          {monthName} {year}
        </div>

        <button
          type="button"
          onClick={goNextMonth}
          className="cursor-pointer touch-manipulation rounded-md px-3 py-2 text-xl font-black transition hover:bg-white/10 active:scale-90"
        >
          ›
        </button>
      </div>

      <div className="mb-3 grid grid-cols-7 text-center text-[11px] font-black text-white/60 md:text-xs">
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
              className="cursor-pointer touch-manipulation rounded-lg py-2 text-[13px] font-black transition hover:bg-[#f6c35f] hover:text-black active:scale-90 active:bg-[#f6c35f] active:text-black md:text-sm"
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}