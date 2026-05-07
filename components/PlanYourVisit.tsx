"use client";

import { Clock, MapPin, Phone, Mail } from "lucide-react";

function getParkStatus() {
  const now = new Date();

  const scTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const day = scTime.getDay();
  const hour = scTime.getHours();
  const minute = scTime.getMinutes();
  const current = hour * 60 + minute;

  const open8 = 8 * 60;
  const close8 = 20 * 60;
  const close11 = 23 * 60;

  const isSunday = day === 0;
  const isThursday = day === 4;
  const isFridayOrSaturday = day === 5 || day === 6;

  let isOpen = false;

  if (isSunday || isThursday) {
    isOpen = current >= open8 && current < close8;
  }

  if (isFridayOrSaturday) {
    isOpen = current >= open8 && current < close11;
  }

  let nextOpen = "Opens Thursday at 8:00 AM";

  if (day === 4 && current < open8) nextOpen = "Opens today at 8:00 AM";
  else if (day === 4 && current >= close8) nextOpen = "Opens Friday at 8:00 AM";
  else if (day === 5 && current < open8) nextOpen = "Opens today at 8:00 AM";
  else if (day === 5 && current >= close11) nextOpen = "Opens Saturday at 8:00 AM";
  else if (day === 6 && current < open8) nextOpen = "Opens today at 8:00 AM";
  else if (day === 6 && current >= close11) nextOpen = "Opens Sunday at 8:00 AM";
  else if (day === 0 && current < open8) nextOpen = "Opens today at 8:00 AM";
  else if (day === 0 && current >= close8) nextOpen = "Opens Thursday at 8:00 AM";

  return {
    isOpen,
    label: isOpen ? "OPEN" : "CLOSED",
    text: isOpen
      ? isFridayOrSaturday
        ? "8:00 AM - 11:00 PM"
        : "8:00 AM - 8:00 PM"
      : nextOpen,
  };
}

export default function PlanYourVisit() {
  const parkStatus = getParkStatus();

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-16 text-white md:px-[6%] md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(29,109,84,0.28),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(246,195,95,0.14),transparent_30%),linear-gradient(180deg,#0e0f10_0%,#1b1712_50%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10">
        <div className="mb-9 text-center md:mb-14">
          <h2 className="text-[30px] font-black uppercase leading-none tracking-[-1px] md:text-[52px]">
            PLAN YOUR VISIT
          </h2>

          <p className="mx-auto mt-4 max-w-[720px] text-[15px] font-bold leading-[1.65] text-white/80 md:mt-6 md:text-[24px] md:leading-[1.55]">
            Ready to hit the trails? Get in touch or just show up and ride!
          </p>
        </div>

        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-5 md:gap-8 lg:grid-cols-2">
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5 transition active:scale-[0.99] active:border-[#f2b35f]/50 md:p-10">
            <h3 className="mb-5 text-[22px] font-black uppercase md:mb-8 md:text-[28px]">
              CONTACT INFO
            </h3>

            <div className="mb-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-black/50 px-3 py-3 md:mb-8 md:gap-3 md:px-4">
              <Clock size={17} className="shrink-0 text-white/80 md:size-[18px]" />

              <span
                className={`rounded-full px-3 py-1 text-[11px] font-black text-white md:px-4 md:text-[13px] ${
                  parkStatus.isOpen ? "bg-[#25b99a]" : "bg-[#e83f68]"
                }`}
              >
                {parkStatus.label}
              </span>

              <span className="text-[13px] font-bold leading-tight text-white/80 md:text-[17px]">
                {parkStatus.text}
              </span>
            </div>

            <div className="space-y-7 md:space-y-8">
              <div className="flex gap-3 md:gap-5">
                <MapPin className="mt-1 shrink-0 text-[#25b99a]" size={24} />
                <div className="min-w-0">
                  <h4 className="text-[19px] font-black text-white md:text-[28px]">
                    Address
                  </h4>
                  <p className="mt-2 text-[15px] font-bold leading-[1.55] text-white/90 md:mt-3 md:text-[24px]">
                    River Neck Acres
                    <br />
                    4459 River Neck Rd
                    <br />
                    Florence, SC 29506
                  </p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-5">
                <Phone className="mt-1 shrink-0 text-[#25b99a]" size={24} />
                <div className="min-w-0">
                  <h4 className="text-[19px] font-black text-white md:text-[28px]">
                    Phone
                  </h4>
                  <a
                    href="tel:8433334607"
                    className="mt-2 block cursor-pointer touch-manipulation text-[15px] font-bold leading-[1.5] text-white/90 transition-all duration-300 hover:text-[#f6c35f] active:scale-95 active:text-[#f6c35f] md:mt-3 md:text-[24px]"
                  >
                    (843) 333-4607
                  </a>
                </div>
              </div>

              <div className="flex gap-3 md:gap-5">
                <Mail className="mt-1 shrink-0 text-[#25b99a]" size={24} />
                <div className="min-w-0">
                  <h4 className="text-[19px] font-black text-white md:text-[28px]">
                    Email
                  </h4>
                  <a
                    href="mailto:riverneckacresatv@gmail.com"
                    className="mt-2 block cursor-pointer touch-manipulation break-all text-[14px] font-bold leading-[1.5] text-white/90 transition-all duration-300 hover:text-[#f6c35f] active:scale-95 active:text-[#f6c35f] md:mt-3 md:text-[24px]"
                  >
                    riverneckacresatv@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 md:gap-5">
                <Clock className="mt-1 shrink-0 text-[#25b99a]" size={24} />
                <div className="min-w-0">
                  <h4 className="text-[19px] font-black text-white md:text-[28px]">
                    Hours
                  </h4>
                  <p className="mt-2 text-[14px] font-bold leading-[1.75] text-white/90 md:mt-3 md:text-[22px] md:leading-[1.6]">
                    Thursday - Saturday: 8:00 AM - 11:00 PM
                    <br />
                    Sunday: 8:00 AM - 8:00 PM
                    <br />
                    Monday - Wednesday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5 transition active:scale-[0.99] active:border-[#f2b35f]/50 md:p-10">
            <h3 className="mb-5 text-[22px] font-black uppercase md:mb-8 md:text-[28px]">
              SEND US A MESSAGE
            </h3>

            <label className="mb-2 block text-[14px] font-black md:mb-3 md:text-[16px]">
              Your Name
            </label>
            <input
              className="mb-5 h-[50px] w-full touch-manipulation rounded-[10px] border border-white/10 bg-black/35 px-4 text-[15px] text-white outline-none transition placeholder:text-white/35 hover:border-white/25 focus:border-[#25b99a] md:mb-6 md:h-[52px]"
              placeholder="John Doe"
            />

            <label className="mb-2 block text-[14px] font-black md:mb-3 md:text-[16px]">
              Your Email
            </label>
            <input
              className="mb-5 h-[50px] w-full touch-manipulation rounded-[10px] border border-white/10 bg-black/35 px-4 text-[15px] text-white outline-none transition placeholder:text-white/35 hover:border-white/25 focus:border-[#25b99a] md:mb-6 md:h-[52px]"
              placeholder="john@example.com"
            />

            <label className="mb-2 block text-[14px] font-black md:mb-3 md:text-[16px]">
              Phone Number
            </label>
            <input
              className="mb-5 h-[50px] w-full touch-manipulation rounded-[10px] border border-white/10 bg-black/35 px-4 text-[15px] text-white outline-none transition placeholder:text-white/35 hover:border-white/25 focus:border-[#25b99a] md:mb-6 md:h-[52px]"
              placeholder="(555) 123-4567"
            />

            <label className="mb-2 block text-[14px] font-black md:mb-3 md:text-[16px]">
              Your Message
            </label>
            <textarea
              className="mb-7 h-[130px] w-full touch-manipulation resize-none rounded-[10px] border border-white/10 bg-black/35 p-4 text-[15px] text-white outline-none transition placeholder:text-white/35 hover:border-white/25 focus:border-[#25b99a] md:mb-8 md:h-[150px]"
              placeholder="Tell us about your visit plans..."
            />

            <button
              type="button"
              className="h-[54px] w-full cursor-pointer touch-manipulation rounded-[12px] bg-[#f2b35f] text-[15px] font-black text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffbd70] active:scale-95 active:bg-[#25b99a] active:text-white md:h-[58px] md:text-[16px]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}