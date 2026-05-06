"use client";

import { Clock, MapPin, Phone, Mail } from "lucide-react";

function getParkStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 Sunday, 4 Thursday, 5 Friday, 6 Saturday
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
    <section id="contact" className="bg-[#0b0b0b] px-[6%] py-24 text-white">
      <div className="mb-14 text-center">
        <h2 className="text-[52px] font-black uppercase leading-none">
          PLAN YOUR VISIT
        </h2>
        <p className="mt-6 text-[24px] font-bold text-white/80">
          Ready to hit the trails? Get in touch or just show up and ride!
        </p>
      </div>

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-10">
          <h3 className="mb-8 text-[28px] font-black uppercase">CONTACT INFO</h3>

          <div className="mb-10 inline-flex items-center gap-4 rounded-full bg-black/50 px-4 py-3">
            <Clock size={18} className="text-white/80" />
            <span
              className={`rounded-full px-4 py-1 text-[13px] font-black text-white ${
                parkStatus.isOpen ? "bg-[#25b99a]" : "bg-[#e83f68]"
              }`}
            >
              {parkStatus.label}
            </span>
            <span className="text-[17px] font-bold text-white/80">
              {parkStatus.text}
            </span>
          </div>

         <div className="space-y-8">
  {/* Address */}
  <div className="flex gap-5">
    <MapPin className="mt-1 shrink-0 text-[#25b99a]" size={28} />

    <div>
      <h4 className="text-[28px] font-black text-white">
        Address
      </h4>

      <p className="mt-3 text-[24px] font-bold leading-[1.45] text-white/90">
        River Neck Acres
        <br />
        4459 River Neck Rd
        <br />
        Florence, SC 29506
      </p>
    </div>
  </div>

  {/* Phone */}
  <div className="flex gap-5">
    <Phone className="mt-1 shrink-0 text-[#25b99a]" size={28} />

    <div>
      <h4 className="text-[28px] font-black text-white">
        Phone
      </h4>

      <a
        href="tel:8433334607"
        className="mt-3 block cursor-pointer text-[24px] font-bold leading-[1.45] text-white/90 transition hover:text-[#f6c35f]"
      >
        (843) 333-4607
      </a>
    </div>
  </div>

  {/* Email */}
  <div className="flex gap-5">
    <Mail className="mt-1 shrink-0 text-[#25b99a]" size={28} />

    <div>
      <h4 className="text-[28px] font-black text-white">
        Email
      </h4>

      <a
        href="mailto:riverneckacresatv@gmail.com"
        className="mt-3 block cursor-pointer text-[24px] font-bold leading-[1.45] text-white/90 transition hover:text-[#f6c35f]"
      >
        riverneckacresatv@gmail.com
      </a>
    </div>
  </div>

  {/* Hours */}
  <div className="flex gap-5">
    <Clock className="mt-1 shrink-0 text-[#25b99a]" size={28} />

    <div>
      <h4 className="text-[28px] font-black text-white">
        Hours
      </h4>

      <p className="mt-3 text-[22px] font-bold leading-[1.45] text-white/90">
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

        <form className="rounded-[18px] border border-white/10 bg-white/[0.03] p-10">
          <h3 className="mb-8 text-[28px] font-black uppercase">
            SEND US A MESSAGE
          </h3>

          <label className="mb-3 block text-[16px] font-black">Your Name</label>
          <input className="mb-6 h-[48px] w-full rounded-[8px] bg-black/35 px-4 text-white outline-none" placeholder="John Doe" />

          <label className="mb-3 block text-[16px] font-black">Your Email</label>
          <input className="mb-6 h-[48px] w-full rounded-[8px] bg-black/35 px-4 text-white outline-none" placeholder="john@example.com" />

          <label className="mb-3 block text-[16px] font-black">Phone Number</label>
          <input className="mb-6 h-[48px] w-full rounded-[8px] bg-black/35 px-4 text-white outline-none" placeholder="(555) 123-4567" />

          <label className="mb-3 block text-[16px] font-black">Your Message</label>
          <textarea className="mb-8 h-[140px] w-full rounded-[8px] bg-black/35 p-4 text-white outline-none" placeholder="Tell us about your visit plans..." />

          <button
            type="button"
            className="h-[58px] w-full rounded-[10px] bg-[#f2b35f] text-[16px] font-black text-black transition hover:bg-[#ffbd70] hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}