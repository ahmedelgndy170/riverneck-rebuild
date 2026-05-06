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
    <footer className="mt-0 bg-[linear-gradient(135deg,#4f6f45_0%,#3f6b55_42%,#2f4f3f_100%)] text-white">

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-20 px-8 py-16 md:grid-cols-[1.35fr_1.35fr_1fr_1fr]">

        {/* LEFT */}
        <div className="pl-2">
          <h3 className="mb-8 text-[24px] font-black uppercase tracking-[-0.03em]">
            RIVER NECK ACRES
          </h3>

          <p className="max-w-[320px] text-[18px] font-semibold leading-[1.9] text-white/90">
            Your premier destination for off-road
            <br />
            adventure. 60+ miles of trails,
            <br />
            camping, and unforgettable
            <br />
            experiences.
          </p>
        </div>

        {/* CONTACT */}
        <div className="pl-2">
          <h3 className="mb-8 text-[24px] font-black">
            Contact Info
          </h3>

          <div className="space-y-6 text-[18px] font-semibold leading-[1.8] text-white/90">

            <div className="flex items-start gap-4">
              <MapPin size={20} className="mt-1 shrink-0 text-white/85" />

              <span>
                4459 River Neck Rd
                <br />
                Florence, SC 29506
              </span>
            </div>

            <a
              href="tel:8433334607"
              className="flex cursor-pointer items-center gap-4 transition hover:text-[#f6c35f]"
            >
              <Phone size={20} className="shrink-0 text-white/85" />

              <span>(843) 333-4607</span>
            </a>

            <a
              href="mailto:riverneckacresatv@gmail.com"
              className="flex cursor-pointer items-center gap-4 transition hover:text-[#f6c35f]"
            >
              <Mail size={20} className="shrink-0 text-white/85" />

              <span>riverneckacresatv@gmail.com</span>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="pl-2">
          <h3 className="mb-8 text-[24px] font-black">
            Quick Links
          </h3>

          <div className="flex flex-col gap-4 text-[18px] font-semibold text-white/90">

            <Link
              href="/about"
              className="transition hover:text-[#f6c35f]"
            >
              About Us
            </Link>

            <Link href="/#epic-trails" className="transition hover:text-[#f6c35f]">
  Trails
</Link>

            <Link href="/#stay-play" className="transition hover:text-[#f6c35f]">
  Accommodations
</Link>

      <Link href="/#events" className="transition hover:text-[#f6c35f]">
  Events
</Link>

<Link href="/#contact" className="transition hover:text-[#f6c35f]">
  Contact
</Link>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="pl-2">
          <h3 className="mb-8 text-[24px] font-black italic">
            Follow Us
          </h3>

          <div className="flex items-center gap-5">

            <a
              href="https://www.facebook.com/riverneck.acres"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-white/10 text-white transition duration-300 hover:bg-white/20 hover:text-[#f6c35f]"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://www.instagram.com/riverneckatvpark"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-white/10 text-white transition duration-300 hover:bg-white/20 hover:text-[#f6c35f]"
            >
              <InstagramIcon />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-white/10 text-white transition duration-300 hover:bg-white/20 hover:text-[#f6c35f]"
            >
              <YoutubeIcon />
            </a>

          </div>
        </div>

      </div>

      <div className="mx-auto max-w-[1280px] border-t border-white/15 px-10 py-7 text-center">
        <p className="text-[17px] font-bold tracking-wide text-white/85">
          © 2026 River Neck Acres ATV Park. All rights reserved.
        </p>
      </div>

    </footer>
  );
}