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
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const day = scTime.getDay();
  const hour = scTime.getHours();

  let closeHour = 20;
  if (day === 5 || day === 6) closeHour = 23;

  const isOpenDay = day === 0 || day === 4 || day === 5 || day === 6;
  const isOpen = isOpenDay && hour >= 8 && hour < closeHour;

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
      return `Open • Closes at ${closeHour === 23 ? "11:00 PM" : "8:00 PM"}`;
    }

    for (let i = 0; i < 7; i++) {
      const check = (day + i) % 7;
      const openDay = check === 0 || check === 4 || check === 5 || check === 6;

      if (openDay) {
        if (i === 0 && hour < 8) return "Closed • Opens today at 8:00 AM";
        if (i > 0) return `Closed • Opens ${dayNames[check]} at 8:00 AM`;
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
      "You MUST sign a waiver. If you are under 18, a parent/legal guardian must sign for you. To save time at arrival, you may print out the waiver above!",
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
      "Leave your appropriate wrist band on at all times.",
      "Please leave your campsite, cabin, or area clean.",
      "Pets are welcome on a leash at all times and are not allowed in any building.",
    ],
  },
  {
    title: "Prohibited Activities",
    icon: Ban,
    items: [
      "No weapons are allowed on the property.",
      "No hunting will be allowed.",
      "No fireworks.",
      "No profanity.",
    ],
  },
  {
    title: "Camping & Facilities",
    icon: Tent,
    items: [
      "Check out time is 12pm. Additional fee of $25 per hour will apply each hour after.",
      "Fires must be contained in an approved container at approved campsites only.",
      "The bath house may close each night at 11pm and reopen at 8am.",
    ],
  },
  {
    title: "Vehicle & Trail Rules",
    icon: Bike,
    items: [
      "All ATVs, 4-wheelers, UTVs, dirt bikes, golf carts and other vehicles are prohibited from riding on pipeline right-of-way except specified crossings.",
      "Violators may be required to leave the property.",
    ],
  },
  {
    title: "General Conduct",
    icon: Users,
    items: [
      "Conduct yourself with maturity.",
      "If behavior is unacceptable, you may be asked to leave with no refund.",
      "River Neck Acres reserves the right to deny admission without explanation.",
    ],
  },
];

export default function AboutPage() {
  const [tab, setTab] = useState<Tab>("about");
  const [openRule, setOpenRule] = useState(0);
  const parkStatus = getParkStatus();

  const tabClass = (name: Tab) =>
    `flex items-center gap-2 rounded-[8px] px-5 py-3 text-[15px] font-black transition ${
      tab === name
        ? "bg-[#d5965c]/25 text-white shadow-[0_0_20px_rgba(213,150,92,0.25)]"
        : "text-white/75 hover:bg-[#25b99a]/15 hover:text-white"
    }`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#101010] px-[6%] pb-24 pt-[140px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,185,154,0.22),transparent_38%),radial-gradient(circle_at_center,rgba(213,150,92,0.16),transparent_35%),linear-gradient(180deg,#101010_0%,#15110d_45%,#0d1714_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="text-center">
          <h1 className="text-[56px] font-black uppercase leading-none">
            About River Neck Acres
          </h1>

          <p className="mt-5 text-[24px] font-medium italic text-[#25b99a]">
            "Where the dirt road ends, the fun begins."
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <button onClick={() => setTab("about")} className={tabClass("about")}>
              <Info size={18} /> About
            </button>

            <button onClick={() => setTab("hours")} className={tabClass("hours")}>
              <Clock size={18} /> Hours
            </button>

            <button onClick={() => setTab("pricing")} className={tabClass("pricing")}>
              <BadgeDollarSign size={18} /> Pricing
            </button>

            <button onClick={() => setTab("rules")} className={tabClass("rules")}>
              <Shield size={18} /> Rules
            </button>

            <button onClick={() => setTab("contact")} className={tabClass("contact")}>
              <Mail size={18} /> Contact Us
            </button>
          </div>
        </div>

        {tab === "about" && (
          <div className="mt-14 space-y-8">
            <InfoBox icon={Heart} title="Our Story">
              <p>
                River Neck Acres ATV Park was created with a focus on providing a{" "}
                <b>safe, family-friendly environment</b> where riders of all ages can
                enjoy the outdoors together.
              </p>

              <p className="mt-5">
                We believe off-roading is about more than riding — it is about{" "}
                <b>quality time, fresh air, and making memories as a family.</b>
              </p>
            </InfoBox>

            <InfoBox icon={TreePine} title="What We Offer">
              <p>
                In addition to our trails, we host{" "}
                <b>family-oriented events throughout the year</b>, including holiday
                weekends, prize hunts, and special activities for all ages.
              </p>

              <p className="mt-5">
                Our team works hard to maintain{" "}
                <b>
                  well-marked trails, a welcoming atmosphere, and responsible riding.
                </b>
              </p>
            </InfoBox>

            <div className="grid gap-6 md:grid-cols-3">
              <SmallCard
                icon={Shield}
                title="Safety First"
                text="Helmets required for youth riders, waivers signed, and rules enforced."
              />
              <SmallCard
                icon={Users}
                title="Family Friendly"
                text="A welcoming environment for riders of all ages and skill levels."
              />
              <SmallCard
                icon={TreePine}
                title="Respect The Land"
                text="We maintain our trails and expect riders to treat the park with care."
              />
            </div>
          </div>
        )}

        {tab === "hours" && (
          <div className="mt-14 space-y-8">
            <div className="rounded-[14px] border border-[#25b99a] bg-[#25b99a]/10 p-7 text-center shadow-[0_0_30px_rgba(37,185,154,0.12)]">
              <h3 className="text-[22px] font-black text-[#25b99a]">
                Open for Regular Riding — Not Just Events!
              </h3>
              <p className="mt-3 text-white/75">
                River Neck Acres ATV Park is open during regular hours, not just for special events.
              </p>
            </div>

            <StatusPill parkStatus={parkStatus} />

            <InfoBox icon={Clock} title="Regular Riding Hours">
              <div className="space-y-5 text-[18px] font-bold">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span>Thursday</span>
                  <span>8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span>Friday - Saturday</span>
                  <span>8:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span>Sunday</span>
                  <span>8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Monday - Wednesday</span>
                  <span>Closed</span>
                </div>
              </div>
            </InfoBox>

            <div className="rounded-[14px] border-2 border-[#d5965c] bg-[#d5965c]/10 p-7 shadow-[0_0_30px_rgba(213,150,92,0.12)]">
              <h3 className="mb-5 text-[28px] font-black uppercase">
                Event Weekends
              </h3>
              <p className="text-[17px] leading-8 text-white/80">
                Hours may be extended or adjusted for special events, night rides, and holiday weekends.
                Event-specific times will always be posted on our website and social media pages.
              </p>
            </div>
          </div>
        )}

        {tab === "pricing" && (
          <div className="mt-14 space-y-8">
            <h2 className="text-center text-[34px] font-black uppercase text-[#25b99a]">
              Pricing 2025
            </h2>

            <PriceBox title="Day Riding">
              <li>$10 Per person</li>
              <li>$15 Per Machine</li>
              <li>Night ride pass for non-campers: +$5</li>
            </PriceBox>

            <PriceBox title="Camping">
              <li>Dry Camping: $10 per person/night</li>
              <li>30 AMP: $40/night ($50/night events)</li>
              <li>50 AMP: $50/night</li>
              <li>Unfurnished Cabin: $40/night ($50/night events)</li>
              <li>Furnished Cabin: $125/night ($150/night events)</li>
              <li>Clubhouse: $175/night ($200/night events)</li>
            </PriceBox>

            <PriceBox title="Annual Memberships">
              <li>$500 for 2 people, 1 machine</li>
              <li>Includes dry camping</li>
              <li>+/- $50 per person & $100 per machine</li>
            </PriceBox>

            <div className="text-center">
              <p className="text-[28px] font-black text-[#25b99a]">
                4459 River Neck Rd Florence, SC 29506
              </p>

              <a
                href="tel:+18433334607"
                className="mt-4 inline-block text-[46px] font-black text-[#25b99a] transition hover:text-[#d5965c] hover:underline"
              >
                843-333-4607
              </a>
            </div>
          </div>
        )}

        {tab === "rules" && (
          <div className="mt-14 space-y-6">
            <h2 className="text-center text-[34px] font-black uppercase text-[#25b99a]">
              Rules and Regulations
            </h2>

            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="#"
                className="rounded-[10px] bg-[#25b99a] px-10 py-4 font-black text-white transition hover:bg-[#2fd9b5] hover:shadow-[0_0_25px_rgba(37,185,154,0.35)]"
              >
                Sign Waiver of Liability
              </a>

              <a
                href="#"
                className="rounded-[10px] bg-[#7a4637] px-10 py-4 font-black text-white transition hover:bg-[#d5965c] hover:text-black hover:shadow-[0_0_25px_rgba(213,150,92,0.35)]"
              >
                Download Chandler’s Law
              </a>
            </div>

            <div className="rounded-[14px] border-2 border-[#e43f68] bg-[#e43f68]/10 p-7 text-[#ff5f7e]">
              <h3 className="text-[22px] font-black">Important:</h3>
              <p className="mt-3 text-[17px] leading-8 text-white/85">
                Follow all directives of staff and posted information signs. If you are corrected by staff more than three times, you will be escorted off the premises with no refund.
              </p>
            </div>

            {rules.map((rule, index) => {
              const Icon = rule.icon;
              const opened = openRule === index;

              return (
                <div
                  key={rule.title}
                  className={`group overflow-hidden rounded-[14px] border-2 transition duration-300 ${
                    opened
                      ? "border-[#d5965c] bg-[#d5965c]/10 shadow-[0_0_25px_rgba(213,150,92,0.22)]"
                      : "border-white/70 bg-black/25 hover:border-[#25b99a] hover:bg-[#25b99a]/10 hover:shadow-[0_0_25px_rgba(37,185,154,0.18)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenRule(opened ? -1 : index)}
                    className={`flex w-full items-center gap-4 px-7 py-6 text-left text-[27px] font-black uppercase transition ${
                      opened
                        ? "text-[#d5965c]"
                        : "text-white group-hover:text-[#25b99a]"
                    }`}
                  >
                    <Icon
                      size={25}
                      className={`transition ${
                        opened
                          ? "text-[#d5965c]"
                          : "text-white group-hover:scale-110 group-hover:text-[#25b99a]"
                      }`}
                    />
                    {rule.title}
                  </button>

                  {opened && (
                    <div className="border-t border-[#d5965c]/60 bg-black/20 px-9 py-7">
                      <ul className="space-y-5 text-[17px] font-medium leading-8 text-white/85">
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

        {tab === "contact" && (
          <div className="mt-14">
            <h2 className="text-center text-[46px] font-black uppercase">
              Plan Your Visit
            </h2>

            <p className="mt-4 text-center text-[20px] text-white/75">
              Ready to hit the trails? Get in touch or just show up and ride!
            </p>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_30px_rgba(37,185,154,0.08)]">
                <h3 className="mb-7 text-[26px] font-black uppercase">
                  Contact Info
                </h3>

                <StatusPill parkStatus={parkStatus} />

                <ContactLine icon={MapPin} title="Address">
                  River Neck Acres<br />4459 River Neck Rd<br />Florence, SC 29506
                </ContactLine>

                <ContactLine icon={Phone} title="Phone">
                  <a href="tel:+18433334607" className="hover:underline">
                    (843) 333-4607
                  </a>
                </ContactLine>

                <ContactLine icon={Mail} title="Email">
                  <a href="mailto:riverneckacresatv@gmail.com" className="hover:underline">
                    riverneckacresatv@gmail.com
                  </a>
                </ContactLine>

                <ContactLine icon={Clock} title="Hours">
                  Thursday - Saturday: 8:00 AM - 11:00 PM<br />
                  Sunday: 8:00 AM - 8:00 PM<br />
                  Monday - Wednesday: Closed
                </ContactLine>
              </div>

              <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_30px_rgba(213,150,92,0.08)]">
                <h3 className="mb-7 text-[26px] font-black uppercase">
                  Send Us A Message
                </h3>

                <form className="space-y-5">
                  <Input label="Your Name" placeholder="John Doe" />
                  <Input label="Your Email" placeholder="john@example.com" />
                  <Input label="Phone Number" placeholder="(555) 123-4567" />

                  <div>
                    <label className="mb-2 block font-black">Your Message</label>
                    <textarea
                      placeholder="Tell us about your visit plans..."
                      className="h-[120px] w-full rounded-[8px] bg-black/35 p-4 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="h-[52px] w-full rounded-[10px] bg-[#d5965c] font-black text-black transition hover:bg-[#f2b35f] hover:shadow-[0_0_25px_rgba(213,150,92,0.35)]"
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
    <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full bg-black/55 px-5 py-3 shadow-[0_0_18px_rgba(0,0,0,0.35)]">
      <Clock size={17} />

      <span
        className={`rounded-full px-3 py-1 text-[12px] font-black ${
          parkStatus.isOpen ? "bg-[#25b99a]" : "bg-[#d94f68]"
        }`}
      >
        {parkStatus.label}
      </span>

      <span className="text-[14px] font-bold text-white/80">
        {parkStatus.text}
      </span>
    </div>
  );
}

function InfoBox({ icon: Icon, title, children }: any) {
  return (
    <div className="overflow-hidden rounded-[14px] border-2 border-white/75 bg-black/25 shadow-[0_0_24px_rgba(37,185,154,0.08)]">
      <div className="flex items-center gap-4 border-b-2 border-white/75 bg-white/[0.03] px-7 py-6">
        <Icon size={25} className="text-[#25b99a]" />
        <h3 className="text-[28px] font-black uppercase">{title}</h3>
      </div>

      <div className="px-8 py-8 text-[20px] font-medium leading-9 text-white/85">
        {children}
      </div>
    </div>
  );
}

function SmallCard({ icon: Icon, title, text }: any) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-8 text-center transition hover:border-[#25b99a]/60 hover:bg-[#25b99a]/10">
      <Icon size={48} className="mx-auto mb-5 text-[#25b99a]" />
      <h4 className="text-[22px] font-black uppercase">{title}</h4>
      <p className="mt-4 text-[17px] leading-7 text-white/70">{text}</p>
    </div>
  );
}

function PriceBox({ title, children }: any) {
  return (
    <div className="overflow-hidden rounded-[14px] border-2 border-white/75 bg-black/25">
      <div className="border-b-2 border-white/75 bg-[#d5965c]/10 px-7 py-6">
        <h3 className="text-[32px] font-black uppercase">{title}</h3>
      </div>

      <ul className="space-y-5 px-10 py-8 text-[20px] font-black leading-8 text-white/90">
        {children}
      </ul>
    </div>
  );
}

function ContactLine({ icon: Icon, title, children }: any) {
  return (
    <div className="mb-7 flex gap-5">
      <Icon size={24} className="mt-1 text-[#25b99a]" />
      <div>
        <h4 className="text-[19px] font-black">{title}</h4>
        <p className="mt-1 text-[17px] leading-7 text-white/75">{children}</p>
      </div>
    </div>
  );
}

function Input({ label, placeholder }: any) {
  return (
    <div>
      <label className="mb-2 block font-black">{label}</label>
      <input
        placeholder={placeholder}
        className="h-[48px] w-full rounded-[8px] bg-black/35 px-4 outline-none transition focus:bg-black/50 focus:ring-2 focus:ring-[#25b99a]/60"
      />
    </div>
  );
}