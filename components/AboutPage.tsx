"use client";

import { useState } from "react";
import {
  Info,
  Clock,
  BadgeDollarSign,
  Shield,
  Mail,
  Heart,
  TreePine,
  Users,
  Home,
  Ban,
  Tent,
  Bike,
  MapPin,
  Phone,
} from "lucide-react";

type Tab = "about" | "hours" | "pricing" | "rules" | "contact";

function getParkStatus() {
  const now = new Date();

  const scTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );

  const day = scTime.getDay();
  const hour = scTime.getHours();

  let closeHour = 20;

  if (day === 5 || day === 6) closeHour = 23;

  const isOpenDay =
    day === 0 || day === 4 || day === 5 || day === 6;

  const isOpen =
    isOpenDay && hour >= 8 && hour < closeHour;

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function nextOpenText() {
    if (isOpen) {
      return `Open • Closes at ${
        closeHour === 23 ? "11:00 PM" : "8:00 PM"
      }`;
    }

    for (let i = 0; i < 7; i++) {
      const check = (day + i) % 7;

      const openDay =
        check === 0 ||
        check === 4 ||
        check === 5 ||
        check === 6;

      if (openDay) {
        if (i === 0 && hour < 8)
          return "Closed • Opens today at 8:00 AM";

        if (i > 0)
          return `Closed • Opens ${dayNames[check]} at 8:00 AM`;
      }
    }

    return "Closed • Opens Thursday at 8:00 AM";
  }

  return {
    label: isOpen ? "OPEN" : "CLOSED",
    text: nextOpenText(),
    isOpen,
  };
}

const rules = [
  {
    title: "Safety Requirements",
    icon: Shield,
    items: [
      "You MUST sign a waiver. If you are under 18, a parent/legal guardian must sign for you.",
      "Helmets are REQUIRED for anyone younger than 16 using a 4-wheeler or dirt bike.",
      "Drivers without a driver’s license cannot carry a passenger.",
      "You must follow all SC laws, specifically Chandler’s Law.",
    ],
  },
  {
    title: "Property Guidelines",
    icon: Home,
    items: [
      "Do NOT go on the dirt road for ANY reason on an ATV.",
      "Quiet hours are 11:30pm–7:30am.",
      "Leave your wrist band on at all times.",
      "Please leave your campsite clean.",
      "Pets are welcome on a leash.",
    ],
  },
  {
    title: "Prohibited Activities",
    icon: Ban,
    items: [
      "No weapons allowed.",
      "No hunting.",
      "No fireworks.",
      "No profanity.",
    ],
  },
  {
    title: "Camping & Facilities",
    icon: Tent,
    items: [
      "Check out time is 12pm.",
      "Fires must stay in approved containers.",
      "Bath house may close nightly at 11pm.",
    ],
  },
  {
    title: "Vehicle & Trail Rules",
    icon: Bike,
    items: [
      "ATVs, UTVs, dirt bikes, golf carts and vehicles must stay on approved areas.",
      "Violators may be required to leave.",
    ],
  },
  {
    title: "General Conduct",
    icon: Users,
    items: [
      "Conduct yourself with maturity.",
      "Unacceptable behavior may result in removal.",
      "River Neck Acres reserves the right to deny admission.",
    ],
  },
];

export default function AboutPage() {
  const [tab, setTab] = useState<Tab>("about");
  const [openRule, setOpenRule] = useState(0);

  const parkStatus = getParkStatus();

  const tabClass = (name: Tab) =>
    `flex cursor-pointer items-center justify-center gap-2 rounded-[10px] px-4 py-3 text-[14px] font-black transition-all duration-300 active:scale-95 md:px-5 md:text-[15px] ${
      tab === name
        ? "bg-[#d5965c]/25 text-white shadow-[0_0_20px_rgba(213,150,92,0.25)]"
        : "text-white/75 hover:bg-[#25b99a]/15 hover:text-white"
    }`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#101010] px-4 pb-20 pt-[120px] text-white md:px-[6%] md:pb-24 md:pt-[140px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,185,154,0.22),transparent_38%),radial-gradient(circle_at_center,rgba(213,150,92,0.16),transparent_35%),linear-gradient(180deg,#101010_0%,#15110d_45%,#0d1714_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-[38px] font-black uppercase leading-none md:text-[56px]">
            About River Neck Acres
          </h1>

          <p className="mt-5 text-[18px] font-medium italic text-[#25b99a] md:text-[24px]">
            "Where the dirt road ends, the fun begins."
          </p>

          {/* TABS */}
          <div className="mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:mt-12 md:flex md:flex-wrap md:items-center md:justify-center md:gap-5">
            <button
              onClick={() => setTab("about")}
              className={tabClass("about")}
            >
              <Info size={18} />
              About
            </button>

            <button
              onClick={() => setTab("hours")}
              className={tabClass("hours")}
            >
              <Clock size={18} />
              Hours
            </button>

            <button
              onClick={() => setTab("pricing")}
              className={tabClass("pricing")}
            >
              <BadgeDollarSign size={18} />
              Pricing
            </button>

            <button
              onClick={() => setTab("rules")}
              className={tabClass("rules")}
            >
              <Shield size={18} />
              Rules
            </button>

            <button
              onClick={() => setTab("contact")}
              className={tabClass("contact")}
            >
              <Mail size={18} />
              Contact
            </button>
          </div>
        </div>

        {/* ABOUT */}
        {tab === "about" && (
          <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
            <InfoBox icon={Heart} title="Our Story">
              <p>
                River Neck Acres ATV Park was created with a focus on providing a{" "}
                <b>safe, family-friendly environment</b>.
              </p>

              <p className="mt-4 md:mt-5">
                We believe off-roading is about{" "}
                <b>family memories and adventure.</b>
              </p>
            </InfoBox>

            <InfoBox icon={TreePine} title="What We Offer">
              <p>
                We host{" "}
                <b>family-oriented events throughout the year</b>.
              </p>

              <p className="mt-4 md:mt-5">
                Our team works hard to maintain{" "}
                <b>well-marked trails and responsible riding.</b>
              </p>
            </InfoBox>

            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              <SmallCard
                icon={Shield}
                title="Safety First"
                text="Helmets required for youth riders and rules enforced."
              />

              <SmallCard
                icon={Users}
                title="Family Friendly"
                text="A welcoming environment for all ages."
              />

              <SmallCard
                icon={TreePine}
                title="Respect The Land"
                text="We maintain our trails and expect respect."
              />
            </div>
          </div>
        )}

        {/* HOURS */}
        {tab === "hours" && (
          <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
            <div className="rounded-[14px] border border-[#25b99a] bg-[#25b99a]/10 p-5 text-center shadow-[0_0_30px_rgba(37,185,154,0.12)] md:p-7">
              <h3 className="text-[18px] font-black text-[#25b99a] md:text-[22px]">
                Open for Regular Riding
              </h3>

              <p className="mt-3 text-[15px] text-white/75 md:text-base">
                River Neck Acres ATV Park is open during regular hours.
              </p>
            </div>

            <StatusPill parkStatus={parkStatus} />

            <InfoBox icon={Clock} title="Regular Riding Hours">
              <div className="space-y-4 text-[15px] font-bold md:space-y-5 md:text-[18px]">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span>Thursday</span>
                  <span>8AM - 8PM</span>
                </div>

                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span>Friday - Saturday</span>
                  <span>8AM - 11PM</span>
                </div>

                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span>Sunday</span>
                  <span>8AM - 8PM</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Monday - Wednesday</span>
                  <span>Closed</span>
                </div>
              </div>
            </InfoBox>
          </div>
        )}

        {/* PRICING */}
        {tab === "pricing" && (
          <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
            <h2 className="text-center text-[28px] font-black uppercase text-[#25b99a] md:text-[34px]">
              Pricing 2025
            </h2>

            <PriceBox title="Day Riding">
              <li>$10 Per person</li>
              <li>$15 Per Machine</li>
              <li>Night ride pass: +$5</li>
            </PriceBox>

            <PriceBox title="Camping">
              <li>Dry Camping: $10 per person/night</li>
              <li>30 AMP: $40/night</li>
              <li>50 AMP: $50/night</li>
              <li>Furnished Cabin: $125/night</li>
            </PriceBox>

            <PriceBox title="Annual Memberships">
              <li>$500 for 2 people, 1 machine</li>
              <li>Includes dry camping</li>
              <li>+$50 per person & +$100 per machine</li>
            </PriceBox>

            <div className="text-center">
              <p className="text-[18px] font-black text-[#25b99a] md:text-[28px]">
                4459 River Neck Rd Florence, SC 29506
              </p>

              <a
                href="tel:+18433334607"
                className="mt-4 inline-block text-[28px] font-black text-[#25b99a] transition hover:text-[#d5965c] hover:underline md:text-[46px]"
              >
                843-333-4607
              </a>
            </div>
          </div>
        )}

        {/* RULES */}
        {tab === "rules" && (
          <div className="mt-10 space-y-5 md:mt-14 md:space-y-6">
            <h2 className="text-center text-[28px] font-black uppercase text-[#25b99a] md:text-[34px]">
              Rules and Regulations
            </h2>

            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-5">
              <a
                href="#"
                className="rounded-[10px] bg-[#25b99a] px-8 py-4 text-center font-black text-white transition hover:bg-[#2fd9b5]"
              >
                Sign Waiver
              </a>

              <a
                href="#"
                className="rounded-[10px] bg-[#7a4637] px-8 py-4 text-center font-black text-white transition hover:bg-[#d5965c] hover:text-black"
              >
                Chandler’s Law
              </a>
            </div>

            {rules.map((rule, index) => {
              const Icon = rule.icon;

              const opened = openRule === index;

              return (
                <div
                  key={rule.title}
                  className={`overflow-hidden rounded-[14px] border-2 transition duration-300 ${
                    opened
                      ? "border-[#d5965c] bg-[#d5965c]/10"
                      : "border-white/20 bg-black/25"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenRule(opened ? -1 : index)
                    }
                    className={`flex w-full items-center gap-4 px-5 py-5 text-left text-[18px] font-black uppercase transition md:px-7 md:py-6 md:text-[27px] ${
                      opened
                        ? "text-[#d5965c]"
                        : "text-white"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={
                        opened
                          ? "text-[#d5965c]"
                          : "text-[#25b99a]"
                      }
                    />

                    {rule.title}
                  </button>

                  {opened && (
                    <div className="border-t border-white/10 bg-black/20 px-6 py-5 md:px-9 md:py-7">
                      <ul className="space-y-4 text-[15px] font-medium leading-7 text-white/85 md:space-y-5 md:text-[17px] md:leading-8">
                        {rule.items.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && (
          <div className="mt-10 md:mt-14">
            <h2 className="text-center text-[32px] font-black uppercase md:text-[46px]">
              Plan Your Visit
            </h2>

            <p className="mt-4 text-center text-[16px] text-white/75 md:text-[20px]">
              Ready to hit the trails?
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5 md:p-8">
                <h3 className="mb-6 text-[22px] font-black uppercase md:mb-7 md:text-[26px]">
                  Contact Info
                </h3>

                <StatusPill parkStatus={parkStatus} />

                <ContactLine icon={MapPin} title="Address">
                  River Neck Acres
                  <br />
                  4459 River Neck Rd
                  <br />
                  Florence, SC 29506
                </ContactLine>

                <ContactLine icon={Phone} title="Phone">
                  <a
                    href="tel:+18433334607"
                    className="hover:underline"
                  >
                    (843) 333-4607
                  </a>
                </ContactLine>

                <ContactLine icon={Mail} title="Email">
                  <a
                    href="mailto:riverneckacresatv@gmail.com"
                    className="break-all hover:underline"
                  >
                    riverneckacresatv@gmail.com
                  </a>
                </ContactLine>
              </div>

              <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5 md:p-8">
                <h3 className="mb-6 text-[22px] font-black uppercase md:mb-7 md:text-[26px]">
                  Send Us A Message
                </h3>

                <form className="space-y-5">
                  <Input
                    label="Your Name"
                    placeholder="John Doe"
                  />

                  <Input
                    label="Your Email"
                    placeholder="john@example.com"
                  />

                  <Input
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                  />

                  <div>
                    <label className="mb-2 block font-black">
                      Your Message
                    </label>

                    <textarea
                      placeholder="Tell us about your visit plans..."
                      className="h-[120px] w-full rounded-[8px] bg-black/35 p-4 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="h-[52px] w-full rounded-[10px] bg-[#d5965c] font-black text-black transition hover:bg-[#f2b35f]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatusPill({ parkStatus }: any) {
  return (
    <div className="mx-auto mb-8 flex w-fit flex-wrap items-center justify-center gap-3 rounded-full bg-black/55 px-5 py-3 text-center shadow-[0_0_18px_rgba(0,0,0,0.35)]">
      <Clock size={17} />

      <span
        className={`rounded-full px-3 py-1 text-[12px] font-black ${
          parkStatus.isOpen
            ? "bg-[#25b99a]"
            : "bg-[#d94f68]"
        }`}
      >
        {parkStatus.label}
      </span>

      <span className="text-[13px] font-bold text-white/80 md:text-[14px]">
        {parkStatus.text}
      </span>
    </div>
  );
}

function InfoBox({ icon: Icon, title, children }: any) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-white/20 bg-black/25">
      <div className="flex items-center gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-5 md:px-7 md:py-6">
        <Icon
          size={24}
          className="shrink-0 text-[#25b99a]"
        />

        <h3 className="text-[22px] font-black uppercase md:text-[28px]">
          {title}
        </h3>
      </div>

      <div className="px-5 py-6 text-[16px] font-medium leading-8 text-white/85 md:px-8 md:py-8 md:text-[20px] md:leading-9">
        {children}
      </div>
    </div>
  );
}

function SmallCard({ icon: Icon, title, text }: any) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-6 text-center transition hover:border-[#25b99a]/60 hover:bg-[#25b99a]/10 md:p-8">
      <Icon
        size={44}
        className="mx-auto mb-5 text-[#25b99a]"
      />

      <h4 className="text-[20px] font-black uppercase md:text-[22px]">
        {title}
      </h4>

      <p className="mt-4 text-[15px] leading-7 text-white/70 md:text-[17px]">
        {text}
      </p>
    </div>
  );
}

function PriceBox({ title, children }: any) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-white/20 bg-black/25">
      <div className="border-b border-white/10 bg-[#d5965c]/10 px-5 py-5 md:px-7 md:py-6">
        <h3 className="text-[24px] font-black uppercase md:text-[32px]">
          {title}
        </h3>
      </div>

      <ul className="space-y-4 px-7 py-6 text-[16px] font-black leading-7 text-white/90 md:px-10 md:py-8 md:text-[20px] md:leading-8">
        {children}
      </ul>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  title,
  children,
}: any) {
  return (
    <div className="mb-7 flex gap-4 md:gap-5">
      <Icon
        size={22}
        className="mt-1 shrink-0 text-[#25b99a]"
      />

      <div className="min-w-0">
        <h4 className="text-[18px] font-black md:text-[19px]">
          {title}
        </h4>

        <p className="mt-1 break-words text-[15px] leading-7 text-white/75 md:text-[17px]">
          {children}
        </p>
      </div>
    </div>
  );
}

function Input({ label, placeholder }: any) {
  return (
    <div>
      <label className="mb-2 block font-black">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="h-[48px] w-full rounded-[8px] bg-black/35 px-4 outline-none transition focus:bg-black/50 focus:ring-2 focus:ring-[#25b99a]/60"
      />
    </div>
  );
}