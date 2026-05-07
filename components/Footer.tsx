"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8Zm0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.45-3.15a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M21.58 7.2a2.75 2.75 0 0 0-1.94-1.95C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45A2.75 2.75 0 0 0 2.42 7.2 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.8 2.75 2.75 0 0 0 1.94 1.95c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.42-4.8ZM10 15.2V8.8l5.5 3.2L10 15.2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-0 overflow-hidden bg-[linear-gradient(135deg,#4f6f45_0%,#3f6b55_42%,#2f4f3f_100%)] text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-9 px-5 py-11 md:grid-cols-2 md:gap-14 md:px-8 md:py-14 lg:grid-cols-[1.35fr_1.35fr_1fr_1fr] lg:gap-20 lg:py-16">
        {/* LEFT */}
        <div>
          <h3 className="mb-4 text-[22px] font-black uppercase tracking-[-0.03em] md:mb-8 md:text-[26px]">
            RIVER NECK ACRES
          </h3>

          <p className="max-w-[360px] text-[14px] font-semibold leading-[1.75] text-white/90 md:text-[18px] md:leading-[1.9]">
            Your premier destination for off-road adventure. 60+ miles of
            trails, camping, and unforgettable experiences.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-4 text-[21px] font-black md:mb-8 md:text-[24px]">
            Contact Info
          </h3>

          <div className="space-y-4 text-[14px] font-semibold leading-[1.65] text-white/90 md:space-y-6 md:text-[18px] md:leading-[1.8]">
            <div className="flex items-start gap-3 md:gap-4">
              <MapPin size={19} className="mt-1 shrink-0 text-white/85" />

              <span>
                4459 River Neck Rd
                <br />
                Florence, SC 29506
              </span>
            </div>

            <a
              href="tel:8433334607"
              className="flex cursor-pointer touch-manipulation items-center gap-3 transition-all duration-300 hover:text-[#f6c35f] active:scale-[0.98] active:text-[#f6c35f] md:gap-4"
            >
              <Phone size={19} className="shrink-0 text-white/85" />

              <span>(843) 333-4607</span>
            </a>

            <a
              href="mailto:riverneckacresatv@gmail.com"
              className="flex min-w-0 cursor-pointer touch-manipulation items-center gap-3 transition-all duration-300 hover:text-[#f6c35f] active:scale-[0.98] active:text-[#f6c35f] md:gap-4"
            >
              <Mail size={19} className="shrink-0 text-white/85" />

              <span className="break-all">riverneckacresatv@gmail.com</span>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-4 text-[21px] font-black md:mb-8 md:text-[24px]">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-[14px] font-semibold text-white/90 md:gap-4 md:text-[18px]">
            {[
              { label: "About Us", href: "/about" },
              { label: "Trails", href: "/#epic-trails" },
              { label: "Accommodations", href: "/#stay-play" },
              { label: "Events", href: "/#events" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-fit cursor-pointer touch-manipulation transition-all duration-300 hover:text-[#f6c35f] active:scale-95 active:text-[#f6c35f]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="mb-4 text-[21px] font-black italic md:mb-8 md:text-[24px]">
            Follow Us
          </h3>

          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            <a
              href="https://www.facebook.com/riverneck.acres"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:text-[#f6c35f] active:scale-90 active:bg-white/20 active:text-[#f6c35f] md:h-14 md:w-14"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://www.instagram.com/riverneckatvpark"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:text-[#f6c35f] active:scale-90 active:bg-white/20 active:text-[#f6c35f] md:h-14 md:w-14"
            >
              <InstagramIcon />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:text-[#f6c35f] active:scale-90 active:bg-white/20 active:text-[#f6c35f] md:h-14 md:w-14"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto max-w-[1280px] border-t border-white/15 px-5 py-5 text-center md:px-10 md:py-7">
        <p className="text-[12px] font-bold leading-[1.6] tracking-wide text-white/85 md:text-[17px]">
          © 2026 River Neck Acres ATV Park. All rights reserved.
        </p>
      </div>
    </footer>
  );
}