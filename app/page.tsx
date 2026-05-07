"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  ShoppingCart,
  PenLine,
  ArrowRight,
  Clock,
  Mouse,
  Crown,
  Calendar,
  Tent,
  Bike,
  Users,
  Sparkles,
  Mountain,
  Truck,
  Menu,
  X,
  Ticket,
  QrCode,
} from "lucide-react";

import TrailMap from "@/components/TrailMap";
import StayPlaySection from "@/components/StayPlaySection";
import EventsSection from "@/components/EventsSection";
import PlanYourVisit from "@/components/PlanYourVisit";
import Footer from "@/components/Footer";

function getParkStatus() {
  const now = new Date();

  const scTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const day = scTime.getDay();
  const hour = scTime.getHours();

  let openHour = 8;
  let closeHour = 20;

  if (day === 5 || day === 6) closeHour = 23;

  const isOpenDay = day === 0 || day === 4 || day === 5 || day === 6;
  const isOpen = isOpenDay && hour >= openHour && hour < closeHour;

  if (isOpen) {
    return {
      label: "OPEN",
      text: `8:00 AM - ${closeHour === 23 ? "11:00 PM" : "8:00 PM"}`,
    };
  }

  return {
    label: "CLOSED",
    text: "Opens Thursday at 8:00 AM",
  };
}

export default function Home() {
  const parkStatus = getParkStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101010] text-white selection:bg-[#f2c06b] selection:text-black">
      {/* NAVBAR */}
      <nav className="fixed left-0 top-0 z-50 flex h-[68px] w-full items-center justify-between border-b border-white/10 bg-[#151515]/95 px-4 backdrop-blur-md md:h-[86px] md:px-[9%]">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileMenuOpen(false);
            setQuickOpen(false);
          }}
          className="group flex cursor-pointer touch-manipulation items-center gap-2 text-[#25b99a] transition active:scale-95"
        >
          <HomeIcon
            size={26}
            strokeWidth={2.4}
            className="transition duration-300 group-hover:scale-110 group-active:scale-110"
          />

          <span className="text-[24px] font-black uppercase tracking-[-1px] lg:hidden">
            RNA
          </span>

          <span className="relative hidden text-[26px] font-black uppercase tracking-[-1px] lg:block">
            RIVER NECK ACRES
            <span className="absolute -bottom-1 left-0 h-[2px] w-full scale-x-0 bg-[#25b99a] transition-transform duration-150 group-hover:scale-x-100" />
          </span>
        </button>

        <div className="hidden items-center gap-9 text-[16px] font-bold lg:flex">
          <a href="/about" className="transition hover:text-[#25b99a]">
            About Us
          </a>

          <a href="/#stay-play" className="transition hover:text-[#f6c35f]">
            Accommodations
          </a>

          <a href="/purchase" className="transition hover:text-[#25b99a]">
            Day Pass & More
          </a>

          <a
            href="#events"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("events")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer transition hover:text-[#25b99a]"
          >
            Events
          </a>

          <a href="/photos" className="transition hover:text-[#25b99a]">
            Photos
          </a>

          <Link
            href="/cart"
            className="text-white transition hover:text-[#25b99a]"
          >
            <ShoppingCart size={20} strokeWidth={2.2} />
          </Link>

          <a
            href="/auth"
            className="rounded-xl px-4 py-2 font-bold transition duration-200 hover:scale-105 hover:bg-[#f2c06b] hover:text-black"
          >
            Sign In
          </a>

          <a
            href="/auth"
            className="rounded-xl bg-[#d5965c] px-6 py-3 font-bold text-black transition hover:opacity-90"
          >
            Log in
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-xl text-white transition active:scale-90 active:bg-white/10 lg:hidden"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed left-0 top-[68px] z-40 w-full border-b border-white/10 bg-[#15100d]/98 px-5 py-5 shadow-2xl backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-3 text-[17px] font-extrabold text-white">
            {[
              { label: "About Us", href: "/about" },
              { label: "Accommodations", href: "/#stay-play" },
              { label: "Purchase", href: "/purchase" },
              { label: "Photos", href: "/photos" },
              { label: "Cart", href: "/cart" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition active:scale-[0.98] active:border-[#f2c06b] active:bg-[#f2c06b]/15"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition active:scale-[0.98] active:border-[#f2c06b] active:bg-[#f2c06b]/15"
            >
              Events
            </a>

            <a
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-2xl bg-[#d89b2b] py-4 text-center text-[18px] font-black text-black transition active:scale-[0.97]"
            >
              Log in
            </a>
          </div>
        </div>
      )}

      {/* FLOATING QUICK BUTTON - MOBILE */}
      <div className="fixed bottom-5 right-4 z-50 lg:hidden">
        {quickOpen && (
          <div className="mb-3 flex flex-col items-end gap-3">
            <Link
              href="/cart"
              className="flex touch-manipulation items-center gap-2 transition active:scale-95"
            >
              <span className="rounded-full bg-black/90 px-3 py-2 text-[13px] font-bold text-white shadow-xl">
                Cart
              </span>
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl">
                <ShoppingCart size={23} />
              </span>
            </Link>

            <Link
              href="/purchase"
              className="flex touch-manipulation items-center gap-2 transition active:scale-95"
            >
              <span className="rounded-full bg-black/90 px-3 py-2 text-[13px] font-bold text-white shadow-xl">
                Day Pass
              </span>
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-green-600 text-white shadow-xl">
                <Ticket size={23} />
              </span>
            </Link>

            <button
              onClick={() => {
                setQuickOpen(false);
                document
                  .getElementById("stay-play")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex touch-manipulation items-center gap-2 transition active:scale-95"
            >
              <span className="rounded-full bg-black/90 px-3 py-2 text-[13px] font-bold text-white shadow-xl">
                Book Stay
              </span>
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-[#3c9677] text-white shadow-xl">
                <HomeIcon size={23} />
              </span>
            </button>

            <Link
              href="/sign-waiver"
              className="flex touch-manipulation items-center gap-2 transition active:scale-95"
            >
              <span className="rounded-full bg-black/90 px-3 py-2 text-[13px] font-bold text-white shadow-xl">
                Waiver QR
              </span>
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-orange-600 text-white shadow-xl">
                <QrCode size={23} />
              </span>
            </Link>
          </div>
        )}

        <button
          onClick={() => setQuickOpen(!quickOpen)}
          className="flex h-16 w-16 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-[#3c9677] text-[34px] leading-none text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition hover:scale-105 active:scale-90 active:bg-[#f2c06b] active:text-black md:h-20 md:w-20 md:text-[42px]"
          aria-label="Open quick actions"
        >
          {quickOpen ? "×" : "+"}
        </button>
      </div>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-[68px] text-center md:pt-[86px]">
        <img
          src="/hero.jpg"
          alt="ATV rider"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 md:bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/75" />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 py-6 md:px-4 md:py-10">
          <h1 className="font-black uppercase tracking-[-0.8px] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.75)] md:tracking-[-1px]">
            <span className="mx-auto block max-w-[720px] text-[30px] leading-[0.92] sm:text-[40px] md:max-w-none md:text-[64px]">
              60+ MILES OF OFF-ROAD FREEDOM AT
            </span>

            <span className="mx-auto mt-3 block max-w-[720px] text-[28px] leading-[0.92] text-[#f2a24a] drop-shadow-[0_3px_0_rgba(80,35,10,0.45)] sm:text-[40px] md:max-w-none md:text-[64px]">
              RIVER NECK ACRES
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-[20px] font-black leading-[1.15] tracking-[-0.5px] text-white sm:text-[26px] md:mt-7 md:text-[36px] md:tracking-[-1px]">
            💗 Ride. Camp. Fall in Love. 💗
          </p>

          <p className="mx-auto mt-4 max-w-[560px] px-2 text-[15px] font-extrabold leading-[1.5] text-white sm:text-[18px] md:mt-5 md:max-w-[650px] md:text-[23px]">
            The ultimate outdoor playground for couples & friends!
          </p>

          <div className="mt-5 flex items-center justify-center md:mt-6">
            <div className="flex max-w-[94vw] items-center gap-2 rounded-full bg-black/75 px-3 py-2 text-[12px] text-white backdrop-blur-md md:gap-3 md:px-5 md:text-[14px]">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  parkStatus.label === "OPEN"
                    ? "bg-green-500/20 text-green-400 shadow-[0_0_16px_rgba(34,197,94,0.45)]"
                    : "bg-red-500/20 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.45)]"
                }`}
              >
                <Clock size={16} strokeWidth={2.4} />
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black md:text-[12px] ${
                  parkStatus.label === "OPEN"
                    ? "bg-green-500 text-black"
                    : "bg-red-500 text-white"
                }`}
              >
                {parkStatus.label}
              </span>

              <span className="truncate font-bold text-white/85">
                {parkStatus.text}
              </span>
            </div>
          </div>

          <div className="mx-auto mt-8 grid w-full max-w-[1120px] grid-cols-1 gap-3 px-1 sm:max-w-[520px] md:mt-10 md:max-w-[1120px] md:flex md:flex-wrap md:items-center md:justify-center md:gap-4 lg:flex-nowrap">
            <Link
              href="/sign-waiver"
              className="group flex h-[62px] w-full touch-manipulation animate-pulse items-center justify-center gap-3 rounded-2xl bg-[#d72f45] px-4 text-white shadow-[0_0_32px_rgba(215,47,69,0.55)] transition-all duration-300 active:scale-95 active:bg-[#ee3b55] hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#ee3b55] hover:shadow-[0_0_42px_rgba(238,59,85,0.8)] md:h-[74px] md:w-auto md:min-w-[250px] md:px-6"
            >
              <PenLine size={22} className="shrink-0 md:size-6" />
              <span className="whitespace-nowrap text-[15px] font-black tracking-[-0.02em] md:text-[18px]">
                Sign Waiver to Ride
              </span>
            </Link>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("epic-trails")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group flex h-[62px] w-full cursor-pointer touch-manipulation items-center justify-center gap-3 rounded-2xl bg-white px-4 text-[#5d8f86] shadow-[0_18px_35px_rgba(255,255,255,0.18)] transition-all duration-300 active:scale-95 active:shadow-[0_0_34px_rgba(255,255,255,0.55)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(255,255,255,0.55)] md:h-[74px] md:w-auto md:min-w-[250px] md:px-6"
            >
              <span className="whitespace-nowrap text-[15px] font-black tracking-[-0.02em] md:text-[18px]">
                Explore Trails
              </span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2 md:text-2xl">
                →
              </span>
            </button>

            <Link
              href="/purchase"
              className="group flex h-[62px] w-full touch-manipulation items-center justify-center gap-3 rounded-2xl bg-[#f6c35f] px-4 text-[#241507] shadow-[0_18px_35px_rgba(246,195,95,0.28)] transition-all duration-300 active:scale-95 active:bg-[#ffd37a] hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#ffd37a] hover:shadow-[0_0_34px_rgba(246,195,95,0.65)] md:h-[74px] md:w-auto md:min-w-[250px] md:px-6"
            >
              <span className="whitespace-nowrap text-[15px] font-black tracking-[-0.02em] md:text-[18px]">
                Plan Your Ride
              </span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2 md:text-2xl">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("stay-play")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group flex h-[62px] w-full cursor-pointer touch-manipulation items-center justify-center gap-3 rounded-2xl border border-white/40 bg-black/25 px-4 text-white backdrop-blur-sm transition-all duration-300 active:scale-95 active:border-[#f2c06b] active:bg-white/10 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_34px_rgba(255,255,255,0.35)] md:h-[74px] md:w-auto md:min-w-[250px] md:px-6"
            >
              <span className="whitespace-nowrap text-[15px] font-black tracking-[-0.02em] md:text-[18px]">
                Plan Your Weekend
              </span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2 md:text-2xl">
                →
              </span>
            </button>
          </div>
        </div>

        <a
          href="#summer"
          className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-white lg:block"
        >
          <Mouse size={36} strokeWidth={1.8} />
        </a>
      </section>
{/* SUMMER EVENT */}
<section
  id="summer"
  className="relative scroll-mt-24 overflow-hidden px-4 py-16 text-white md:px-[9%] md:py-28"
>
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(29,109,84,0.32),transparent_34%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.18),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(29,109,84,0.20),transparent_38%),linear-gradient(180deg,#101312_0%,#1b1712_50%,#0b1110_100%)]" />

  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />

  <div className="relative z-10">
    <div className="mb-10 text-center md:mb-16">
      <div className="mb-4 inline-block rounded-full bg-[#f2c35f] px-4 py-1 text-[12px] font-black text-black shadow-[0_0_28px_rgba(246,195,95,0.35)] md:px-5 md:text-sm">
        May 11-17, 2026
      </div>

      <h2 className="text-[30px] font-black uppercase leading-none tracking-[-1px] text-[#f2c35f] drop-shadow-[0_0_22px_rgba(246,195,95,0.22)] md:text-[48px]">
        SUMMER KICK OFF
      </h2>

      <p className="mx-auto mt-3 max-w-[520px] text-[15px] font-bold leading-[1.6] text-white/75 md:text-lg">
        A Week of Riding, Music & Campground Fun!
      </p>
    </div>

    <div className="grid items-center gap-7 md:grid-cols-2 md:gap-14">
      <img
        src="/summer-event.jpg"
        alt="Summer Event"
        className="h-[260px] w-full rounded-2xl object-cover shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:h-auto"
      />

      <div className="space-y-5 md:space-y-6 md:pt-20">
        <div className="touch-manipulation rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md transition active:scale-[0.98] active:border-[#f2c06b] md:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-[17px] font-bold md:text-lg">
            🎵 Concert & Events
          </h3>
          <p className="text-[13px] leading-[1.7] text-white/75 md:text-sm">
            Saturday, May 16 — Activities and music all day. Night ride
            starts 11:30 PM.
          </p>
        </div>

        <div className="touch-manipulation rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md transition active:scale-[0.98] active:border-[#f2c06b] md:p-6">
          <h3 className="mb-5 flex items-center gap-2 text-[17px] font-bold md:text-lg">
            🎟️ Ticket Pricing
          </h3>

          <div className="grid grid-cols-2 gap-3 text-center md:gap-4">
            {[
              { price: "$10", label: "Children" },
              { price: "$25", label: "Concert Only" },
              { price: "$75", label: "Weekend" },
              { price: "$100", label: "All Week Pass" },
            ].map((ticket) => (
              <div
                key={ticket.label}
                className="rounded-xl bg-black/25 p-4 transition active:scale-95 active:bg-[#f2c35f]/15 md:p-5"
              >
                <div className="text-[18px] font-black md:text-xl">
                  {ticket.price}
                </div>
                <div className="text-[12px] text-white/60 md:text-sm">
                  {ticket.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] leading-[1.6] text-white/50 md:text-xs">
            Card payments incur a 5% fee. Memberships & gift cards not
            accepted.
          </p>
        </div>

        <div className="touch-manipulation rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md transition active:scale-[0.98] active:border-[#f2c06b] md:p-6">
          <h3 className="mb-2 text-[17px] font-bold md:text-lg">
            📍 Reservations
          </h3>
          <p className="text-[13px] text-white/75 md:text-sm">
            Call 843-333-4607 for reservations
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="/purchase"
            className="inline-flex h-[58px] min-w-[260px] touch-manipulation items-center justify-center rounded-xl bg-[#f2c35f] px-10 text-center text-[17px] font-black text-black shadow-[0_0_36px_rgba(246,195,95,0.42)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffd27a] hover:shadow-[0_0_48px_rgba(246,195,95,0.65)] active:scale-95 active:bg-[#ffd27a]"
          >
            Buy Tickets →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* MEMBERSHIP SECTION */}
<section
  id="annual-membership"
  className="relative overflow-hidden px-4 py-16 text-white md:px-[8%] md:py-28"
>
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(29,109,84,0.30),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(246,195,95,0.18),transparent_30%),linear-gradient(180deg,#101312_0%,#1b1712_52%,#0b1110_100%)]" />

  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

  <div className="relative z-10">
    <div className="mb-9 text-center md:mb-10">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#3a2618] px-4 py-2 text-[13px] font-bold text-[#f2b35f] shadow-[0_0_24px_rgba(242,179,95,0.25)] md:text-[14px]">
        <Crown size={16} />
        Best Value
      </div>

      <h2 className="text-[30px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[42px]">
        ANNUAL MEMBERSHIP
      </h2>

      <p className="mx-auto mt-4 max-w-[680px] text-[15px] font-medium leading-[1.6] text-white/85 md:mt-5 md:text-[20px]">
        Get unlimited year-round access to all trails and dry camping
      </p>
    </div>

    <div className="mx-auto max-w-[1120px] overflow-hidden rounded-[20px] border border-[#f2b35f]/25 bg-[#111111]/80 shadow-[0_35px_100px_rgba(0,0,0,0.55)] backdrop-blur-md">
      <div className="bg-[#6b4a34]/95 px-5 py-9 text-center md:px-8 md:py-12">
        <div className="text-[44px] font-black leading-none text-white md:text-[64px]">
          $500{" "}
          <span className="text-[20px] font-medium md:text-[24px]">
            /year
          </span>
        </div>

        <p className="mx-auto mt-4 max-w-[720px] text-[14px] font-bold leading-[1.6] text-white md:text-[15px]">
          Base package: 2 people, 1 machine{" "}
          <span className="font-normal text-white/80">
            (includes dry camping)
          </span>
        </p>

        <p className="mt-2 text-[12px] leading-[1.6] text-white/75 md:text-[13px]">
          Note: Does not include the four major annual events
        </p>
      </div>

      <div className="bg-[#111111]/90 px-4 py-7 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {[
            {
              icon: <Calendar size={28} />,
              title: "Unlimited Access",
              text: "Ride any day for an entire year",
            },
            {
              icon: <Tent size={28} />,
              title: "Dry Camping",
              text: "Camp for free whenever you visit",
            },
            {
              icon: <Bike size={28} />,
              title: "All Trails",
              text: "60+ miles of off-road terrain",
            },
            {
              icon: <Users size={28} />,
              title: "Bring Friends",
              text: "Includes 2 people & 1 machine",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group touch-manipulation rounded-[18px] border border-white/10 bg-[#3f332f] p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#f2b35f]/60 hover:bg-[#5a463c] hover:shadow-[0_0_35px_rgba(242,179,95,0.35)] active:scale-[0.97] active:border-[#f2b35f]/60 active:bg-[#5a463c] md:p-7"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2b35f]/75 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#f2b35f] group-active:scale-110 group-active:rotate-6 md:mb-5 md:h-16 md:w-16">
                {item.icon}
              </div>

              <h3 className="text-[18px] font-black text-white md:text-[20px]">
                {item.title}
              </h3>

              <p className="mt-2 text-[14px] leading-[1.55] text-white/80 md:text-[16px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-[14px] border border-white/10 bg-[#171717]/90 px-5 py-5 md:mt-8 md:px-8 md:py-6">
          <h3 className="mb-3 flex items-center gap-2 text-[16px] font-black text-white md:text-[18px]">
            <Sparkles size={20} className="shrink-0 text-[#f2b35f]" />
            Add More Riders & Machines
          </h3>

          <ul className="space-y-2 text-[14px] font-medium leading-[1.7] text-white/85 md:pl-8 md:text-[15px]">
            <li>• Additional people: +$50 each</li>
            <li>• Additional machines: +$100 each</li>
            <li>• Valid for 1 full year from purchase date</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10 md:gap-5">
          <Link
  href="/purchase?tab=membership"
            className="group flex h-[60px] w-full max-w-[300px] cursor-pointer touch-manipulation items-center justify-center gap-3 rounded-[10px] bg-[#f2b35f] text-[15px] font-black text-black shadow-[0_0_28px_rgba(242,179,95,0.35)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#ffd27a] hover:shadow-[0_0_40px_rgba(242,179,95,0.65)] active:scale-95 active:bg-[#ffd27a] md:h-[68px] md:text-[18px]"
          >
            Get Your Membership
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2"
            />
          </Link>

          <Link
            href="/purchase#day-pass"
            className="group flex h-[60px] w-full max-w-[300px] cursor-pointer touch-manipulation items-center justify-center rounded-[10px] border border-white/20 bg-[#171717] text-[15px] font-black text-white transition-all duration-300 hover:bg-[#f2b35f] hover:text-black active:scale-95 active:border-[#f2b35f] active:bg-[#f2b35f] active:text-black md:h-[68px] md:text-[18px]"
          >
            Try a Day Pass First
          </Link>
        </div>

        <p className="mt-7 text-center text-[13px] font-medium text-white/70 md:mt-8 md:text-[14px]">
          Questions about membership?{" "}
          <Link
            href="#contact"
            className="font-black text-white transition-all duration-300 hover:text-[#f2b35f] active:text-[#f2b35f]"
          >
            Contact us
          </Link>
        </p>
      </div>
    </div>
  </div>
</section>
      {/* EPIC TRAILS */}
      <section
        id="epic-trails"
        className="relative scroll-mt-24 px-4 py-16 md:px-[6%] md:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[220px] w-[440px] -translate-x-1/2 rounded-full bg-[#f2b35f]/15 blur-[110px] md:h-[260px] md:w-[760px] md:blur-[140px]" />
          <div className="absolute right-10 top-1/2 hidden h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#f2b35f]/10 blur-[120px] md:block" />
        </div>

        <div className="relative z-10">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="text-[30px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[46px]">
              EPIC TRAILS AWAIT
            </h2>

            <p className="mx-auto mt-5 max-w-[900px] text-[15px] font-medium leading-[1.7] text-white/80 md:mt-6 md:text-[25px] md:leading-[1.9]">
              From winding forest paths to adrenaline-pumping mud bogs, our
              trails offer something for every rider.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="space-y-4 md:space-y-8">
              {[
                {
                  icon: Mountain,
                  title: "60+ Miles of Trails",
                  text: "Explore diverse terrain with trails for all skill levels, from beginner-friendly paths to expert challenges.",
                },
                {
                  icon: Bike,
                  title: "Dirt Bike Friendly",
                  text: "Purpose-built tracks and trails designed specifically for dirt bike riders seeking thrills and technical challenges.",
                },
                {
                  icon: Truck,
                  title: "ATV & UTV Paradise",
                  text: "Wide trails and mud pits perfect for ATVs and side-by-sides. Bring the whole crew for an unforgettable ride.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex min-h-[118px] cursor-pointer touch-manipulation items-center gap-4 rounded-[20px] border border-white/15 bg-[#141414]/92 px-4 py-5 transition-all duration-300 hover:-translate-y-2 hover:border-[#27b99d] hover:bg-[#1a2421] hover:shadow-[0_0_40px_rgba(39,185,157,0.30)] active:scale-[0.98] active:border-[#f2c06b] active:bg-[#1a2421] active:shadow-[0_0_30px_rgba(242,195,95,0.25)] md:min-h-[165px] md:gap-7 md:rounded-[24px] md:px-10 md:py-8"
                  >
                    <Icon
                      size={30}
                      className="shrink-0 text-[#27b99d] transition-all duration-300 group-hover:scale-125 group-hover:text-[#f6c35f] group-active:scale-125 group-active:text-[#f6c35f] md:size-[34px]"
                    />

                    <div className="min-w-0">
                      <h3 className="text-[18px] font-black tracking-[-0.5px] text-white md:text-[30px]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[14px] font-medium leading-[1.55] text-white/75 md:mt-3 md:text-[19px] md:leading-[1.8]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative">
              <img
                src="/trails.jpg"
                alt="ATV trail rider"
                className="h-[300px] w-full rounded-[22px] object-cover shadow-[0_30px_100px_rgba(0,0,0,0.65)] md:h-[620px]"
              />

              <div className="absolute inset-0 rounded-[22px] bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* TRAIL MAP */}
      <section className="bg-[#0b0b0b] px-4 py-16 text-white md:px-[8%] md:py-20">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-[30px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[46px]">
            EXPLORE OUR TRAIL MAP
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] text-[15px] font-medium leading-[1.6] text-white/75 md:mt-5 md:text-[20px]">
            Navigate 60+ miles of trails and plan your adventure
          </p>
        </div>

        <TrailMap />

        <div className="mx-auto mt-10 w-full max-w-[1180px] rounded-[18px] border border-white/[0.06] bg-[#101010]/80 px-5 py-8 text-center md:mt-12 md:px-8 md:py-[54px]">
          <h2 className="mb-4 text-[22px] font-black uppercase leading-none tracking-[-0.5px] text-white md:text-[27px]">
            ALL SKILL LEVELS WELCOME
          </h2>

          <p className="mx-auto max-w-[720px] text-[14px] font-medium leading-[1.7] text-white/70 md:text-[18px]">
            Whether you're a seasoned pro or just starting out, River Neck Acres
            has the perfect trail for you. Our marked trail system ensures you
            can find routes that match your experience and comfort level.
          </p>
        </div>
      </section>

      <StayPlaySection />
      <EventsSection />
      <PlanYourVisit />
      <Footer />
    </main>
  );
}