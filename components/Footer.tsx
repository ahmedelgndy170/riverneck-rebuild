"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8Zm0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.45-3.15a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M21.58 7.2a2.75 2.75 0 0 0-1.94-1.95C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45A2.75 2.75 0 0 0 2.42 7.2 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.8 2.75 2.75 0 0 0 1.94 1.95c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.42-4.8ZM10 15.2V8.8l5.5 3.2L10 15.2Z" />
    </svg>
  );
}

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Rules", href: "/about?tab=rules" },
  { label: "Trails", href: "/#epic-trails" },
  { label: "Accommodations", href: "/#stay-play" },
  { label: "Events", href: "/#events" },
  { label: "Contact", href: "/about" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#3d8469] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-14 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:gap-16">
          <div>
            <h3 className="text-[22px] font-bold uppercase tracking-tight text-white md:text-[24px]">
              RIVER NECK ACRES
            </h3>
            <p className="mt-4 max-w-[320px] text-[15px] font-normal leading-[1.7] text-[#d8e4de] md:text-[16px]">
              Your premier destination for off-road adventure. 60+ miles of
              trails, camping, and unforgettable experiences.
            </p>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-white md:text-[20px]">
              Contact Info
            </h3>
            <ul className="mt-5 space-y-4 text-[15px] font-normal leading-snug text-[#d8e4de] md:text-[16px]">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-white/90"
                />
                <span>
                  4459 River Neck Rd
                  <br />
                  Florence, SC 29506
                </span>
              </li>
              <li>
                <a
                  href="tel:8433334607"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone
                    size={18}
                    strokeWidth={1.75}
                    className="shrink-0 text-white/90"
                  />
                  <span>(843) 333-4607</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:riverneckacresatv@gmail.com"
                  className="flex min-w-0 items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail
                    size={18}
                    strokeWidth={1.75}
                    className="shrink-0 text-white/90"
                  />
                  <span className="break-all">riverneckacresatv@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-white md:text-[20px]">
              Quick Links
            </h3>
            <nav className="mt-5 flex flex-col gap-3.5">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="w-fit text-[15px] font-normal text-[#d8e4de] no-underline transition-colors hover:text-white md:text-[16px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-white md:text-[20px]">
              Follow Us
            </h3>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/riverneck.acres"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#4f9d82]/55 text-white transition-colors hover:bg-[#5aad92]/70 md:h-12 md:w-12"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/riverneckatvpark"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#4f9d82]/55 text-white transition-colors hover:bg-[#5aad92]/70 md:h-12 md:w-12"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#4f9d82]/55 text-white transition-colors hover:bg-[#5aad92]/70 md:h-12 md:w-12"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#5a9a82]/60">
        <p className="px-6 py-5 text-center text-[13px] font-normal text-[#d8e4de] md:py-6 md:text-[14px]">
          © 2026 River Neck Acres ATV Park. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
