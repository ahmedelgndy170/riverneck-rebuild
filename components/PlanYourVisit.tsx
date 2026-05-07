"use client";

import { Clock, MapPin, Phone, Mail } from "lucide-react";

function getParkStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
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

  if (day === 4 && current < open8)
    nextOpen = "Opens today at 8:00 AM";
  else if (day === 4 && current >= close8)
    nextOpen = "Opens Friday at 8:00 AM";
  else if (day === 5 && current < open8)
    nextOpen = "Opens today at 8:00 AM";
  else if (day === 5 && current >= close11)
    nextOpen = "Opens Saturday at 8:00 AM";
  else if (day === 6 && current < open8)
    nextOpen = "Opens today at 8:00 AM";
  else if (day === 6 && current >= close11)
    nextOpen = "Opens Sunday at 8:00 AM";
  else if (day === 0 && current < open8)
    nextOpen = "Opens today at 8:00 AM";
  else if (day === 0 && current >= close8)
    nextOpen = "Opens Thursday at 8:00 AM";

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
      className="bg-[#0b0b0b] px-4 py-20 text-white md:px-[6%] md:py-24"
    >
      <div className="mb-10 text-center md:mb-14">
        <h2 className="text-[36px] font-black uppercase leading-none tracking-[-1px] md:text-[52px]">
          PLAN YOUR VISIT
        </h2>

        <p className="mx-auto mt-5 max-w-[760px] text-[18px] font-bold leading-[1.55] text-white/80 md:mt-6 md:text-[24px]">
          Ready to hit the trails? Get in touch or just show up and ride!
        </p>
      </div>

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5 md:p-10">
          <h3 className="mb-6 text-[24px] font-black uppercase md:mb-8 md:text-[28px]">
            CONTACT INFO
          </h3>

          <div className="mb-8 inline-flex flex-wrap items-center gap-3 rounded-full bg-black/50 px-4 py-3">
            <Clock size={18} className="text-white/80" />

            <span
              className={`rounded-full px-4 py-1 text-[12px] font-black text-white md:text-[13px] ${
                parkStatus.isOpen
                  ? "bg-[#25b99a]"
                  : "bg-[#e83f68]"
              }`}
            >
              {parkStatus.label}
            </span>

            <span className="text-[14px] font-bold text-white/80 md:text-[17px]">
              {parkStatus.text}
            </span>
          </div>

          <div className="space-y-8">
            {/* ADDRESS */}
            <div className="flex gap-4 md:gap-5">
              <MapPin
                className="mt-1 shrink-0 text-[#25b99a]"
                size={26}
              />

              <div>
                <h4 className="text-[22px] font-black text-white md:text-[28px]">
                  Address
                </h4>

                <p className="mt-3 text-[17px] font-bold leading-[1.5] text-white/90 md:text-[24px]">
                  River Neck Acres
                  <br />
                  4459 River Neck Rd
                  <br />
                  Florence, SC 29506
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex gap-4 md:gap-5">
              <Phone
                className="mt-1 shrink-0 text-[#25b99a]"
                size={26}
              />

              <div>
                <h4 className="text-[22px] font-black text-white md:text-[28px]">
                  Phone
                </h4>

                <a
                  href="tel:8433334607"
                  className="mt-3 block cursor-pointer text-[17px] font-bold leading-[1.5] text-white/90 transition-all duration-300 hover:text-[#f6c35f] active:scale-95 md:text-[24px]"
                >
                  (843) 333-4607
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-4 md:gap-5">
              <Mail
                className="mt-1 shrink-0 text-[#25b99a]"
                size={26}
              />

              <div className="min-w-0">
                <h4 className="text-[22px] font-black text-white md:text-[28px]">
                  Email
                </h4>

                <a
                  href="mailto:riverneckacresatv@gmail.com"
                  className="mt-3 block break-all cursor-pointer text-[16px] font-bold leading-[1.5] text-white/90 transition-all duration-300 hover:text-[#f6c35f] active:scale-95 md:text-[24px]"
                >
                  riverneckacresatv@gmail.com
                </a>
              </div>
            </div>

            {/* HOURS */}
            <div className="flex gap-4 md:gap-5">
              <Clock
                className="mt-1 shrink-0 text-[#25b99a]"
                size={26}
              />

              <div>
                <h4 className="text-[22px] font-black text-white md:text-[28px]">
                  Hours
                </h4>

                <p className="mt-3 text-[16px] font-bold leading-[1.6] text-white/90 md:text-[22px]">
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

        {/* FORM */}
        <form className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5 md:p-10">
          <h3 className="mb-6 text-[24px] font-black uppercase md:mb-8 md:text-[28px]">
            SEND US A MESSAGE
          </h3>

          <label className="mb-3 block text-[15px] font-black md:text-[16px]">
            Your Name
          </label>

          <input
            className="mb-6 h-[52px] w-full rounded-[10px] border border-white/10 bg-black/35 px-4 text-[15px] text-white outline-none transition focus:border-[#25b99a]"
            placeholder="John Doe"
          />

          <label className="mb-3 block text-[15px] font-black md:text-[16px]">
            Your Email
          </label>

          <input
            className="mb-6 h-[52px] w-full rounded-[10px] border border-white/10 bg-black/35 px-4 text-[15px] text-white outline-none transition focus:border-[#25b99a]"
            placeholder="john@example.com"
          />

          <label className="mb-3 block text-[15px] font-black md:text-[16px]">
            Phone Number
          </label>

          <input
            className="mb-6 h-[52px] w-full rounded-[10px] border border-white/10 bg-black/35 px-4 text-[15px] text-white outline-none transition focus:border-[#25b99a]"
            placeholder="(555) 123-4567"
          />

          <label className="mb-3 block text-[15px] font-black md:text-[16px]">
            Your Message
          </label>

          <textarea
            className="mb-8 h-[150px] w-full rounded-[10px] border border-white/10 bg-black/35 p-4 text-[15px] text-white outline-none transition focus:border-[#25b99a]"
            placeholder="Tell us about your visit plans..."
          />

          <button
            type="button"
            className="h-[58px] w-full cursor-pointer rounded-[12px] bg-[#f2b35f] text-[16px] font-black text-black transition-all duration-300 active:scale-95 hover:scale-[1.02] hover:bg-[#ffbd70]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}