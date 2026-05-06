"use client";

import { useState } from "react";
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
import Link from "next/link";

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
    <main className="min-h-screen overflow-x-hidden bg-[#101010] text-white">
      {/* NAVBAR */}
      <nav className="fixed left-0 top-0 z-50 flex h-[74px] w-full items-center justify-between border-b border-white/10 bg-[#151515]/95 px-5 md:h-[86px] md:px-[9%]">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileMenuOpen(false);
          }}
          className="group flex cursor-pointer items-center gap-2 text-[#25b99a]"
        >
          <HomeIcon
            size={28}
            strokeWidth={2.4}
            className="transition duration-300 group-hover:scale-110"
          />

          <span className="text-[28px] font-black uppercase tracking-[-1px] lg:hidden">
            RNA
          </span>

          <span className="relative hidden text-[26px] font-black uppercase tracking-[-1px] lg:block">
            RIVER NECK ACRES
            <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-[#25b99a] transition-transform duration-75 group-hover:scale-x-100" />
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

          <Link href="/cart" className="text-white transition hover:text-[#25b99a]">
            <ShoppingCart size={20} strokeWidth={2.2} />
          </Link>

          <a
            href="/auth"
            className="rounded-xl px-4 py-2 font-bold transition duration-200 hover:bg-[#f2c06b] hover:text-black hover:scale-105"
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
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-white lg:hidden"
        >
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed left-0 top-[74px] z-40 w-full border-b border-white/10 bg-[#15100d] px-8 py-8 lg:hidden">
          <div className="flex flex-col gap-8 text-[24px] font-bold text-white">
            <a href="/about" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </a>

            <a href="/#stay-play" onClick={() => setMobileMenuOpen(false)}>
              Accommodations
            </a>

            <a href="/purchase" onClick={() => setMobileMenuOpen(false)}>
              Purchase
            </a>

            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Events
            </a>

            <a href="/photos" onClick={() => setMobileMenuOpen(false)}>
              Photos
            </a>

            <a href="/cart" onClick={() => setMobileMenuOpen(false)}>
              Cart
            </a>

            <a
              href="/auth"
              className="mt-4 rounded-2xl bg-[#d89b2b] py-5 text-center text-[22px] font-black text-black"
            >
              Log in
            </a>
          </div>
        </div>
      )}

      {/* FLOATING QUICK BUTTON - MOBILE */}
      <div className="fixed bottom-8 right-6 z-50 lg:hidden">
        {quickOpen && (
          <div className="mb-4 flex flex-col items-end gap-4">
            <Link href="/cart" className="flex items-center gap-3">
              <span className="rounded-full bg-black px-4 py-2 text-white">
                Cart
              </span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl">
                <ShoppingCart size={28} />
              </span>
            </Link>

            <Link href="/purchase" className="flex items-center gap-3">
              <span className="rounded-full bg-black px-4 py-2 text-white">
                Day Pass
              </span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-xl">
                <Ticket size={28} />
              </span>
            </Link>

            <button
              onClick={() => {
                setQuickOpen(false);
                document
                  .getElementById("stay-play")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-3"
            >
              <span className="rounded-full bg-black px-4 py-2 text-white">
                Book Accommodation
              </span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3c9677] text-white shadow-xl">
                <HomeIcon size={28} />
              </span>
            </button>

            <Link href="/sign-waiver" className="flex items-center gap-3">
              <span className="rounded-full bg-black px-4 py-2 text-white">
                My Waiver QR
              </span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white shadow-xl">
                <QrCode size={28} />
              </span>
            </Link>
          </div>
        )}

        <button
          onClick={() => setQuickOpen(!quickOpen)}
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-[#3c9677] text-[42px] text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:scale-105"
        >
          {quickOpen ? "×" : "+"}
        </button>
      </div>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-[74px] text-center md:pt-[86px]">
        <img
          src="/hero.jpg"
          alt="ATV rider"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/65" />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 py-10">
          <h1 className="font-black uppercase leading-[0.95] tracking-[-2px] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
            <span className="block text-[14vw] leading-[0.92] sm:text-[48px] md:text-[64px]">
              60+ MILES OF OFF-ROAD FREEDOM AT
            </span>

            <span className="mt-2 block text-[13vw] leading-[0.92] text-[#f2a24a] drop-shadow-[0_3px_0_rgba(80,35,10,0.45)] sm:text-[48px] md:text-[64px]">
              RIVER NECK ACRES
            </span>
          </h1>

          <p className="mt-6 text-[9vw] font-black leading-[1.05] tracking-[-1px] text-white sm:text-[34px] md:text-[36px]">
            💗 Ride. Camp. Fall in Love. 💗
          </p>

          <p className="mx-auto mt-4 max-w-[760px] px-2 text-[5vw] font-extrabold leading-[1.45] text-white sm:text-[21px] md:text-[23px]">
            The ultimate outdoor playground for couples & friends!
          </p>

          <div className="mt-6 flex items-center justify-center">
            <div className="flex max-w-full items-center gap-3 rounded-full bg-black/70 px-4 py-2 text-[13px] text-white backdrop-blur-md sm:px-5 sm:text-[14px]">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  parkStatus.label === "OPEN"
                    ? "bg-green-500/20 text-green-400 shadow-[0_0_16px_rgba(34,197,94,0.45)]"
                    : "bg-red-500/20 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.45)]"
                }`}
              >
                <Clock size={17} strokeWidth={2.4} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-[12px] font-black ${
                  parkStatus.label === "OPEN"
                    ? "bg-green-500 text-black"
                    : "bg-red-500 text-white"
                }`}
              >
                {parkStatus.label}
              </span>

              <span className="font-bold text-white/85">{parkStatus.text}</span>
            </div>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-[1120px] grid-cols-1 gap-4 px-2 md:flex md:flex-wrap md:items-center md:justify-center lg:flex-nowrap">
            <Link
              href="/sign-waiver"
              className="group flex h-[78px] w-full animate-pulse items-center justify-center gap-3 rounded-2xl bg-[#d72f45] px-6 text-white shadow-[0_0_32px_rgba(215,47,69,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ee3b55] hover:shadow-[0_0_42px_rgba(238,59,85,0.8)] md:min-w-[250px] md:w-auto"
            >
              <PenLine size={24} className="shrink-0" />

              <span className="whitespace-nowrap text-[19px] font-black tracking-[-0.02em]">
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
              className="group flex h-[78px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-white px-6 text-[#5d8f86] shadow-[0_18px_35px_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(255,255,255,0.55)] md:min-w-[250px] md:w-auto"
            >
              <span className="whitespace-nowrap text-[19px] font-black tracking-[-0.02em]">
                Explore Trails
              </span>

              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>

            <Link
              href="/purchase"
              className="group flex h-[78px] w-full items-center justify-center gap-3 rounded-2xl bg-[#f6c35f] px-6 text-[#241507] shadow-[0_18px_35px_rgba(246,195,95,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffd37a] hover:shadow-[0_0_34px_rgba(246,195,95,0.65)] md:min-w-[250px] md:w-auto"
            >
              <span className="whitespace-nowrap text-[19px] font-black tracking-[-0.02em]">
                Plan Your Ride
              </span>

              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
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
              className="group flex h-[78px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-white/40 bg-black/20 px-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_34px_rgba(255,255,255,0.35)] md:min-w-[250px] md:w-auto"
            >
              <span className="whitespace-nowrap text-[19px] font-black tracking-[-0.02em]">
                Plan Your Weekend
              </span>

              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>

        <a
          href="#summer"
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white"
        >
          <Mouse size={36} strokeWidth={1.8} />
        </a>
      </section>

      {/* SUMMER EVENT */}
      <section
        id="summer"
        className="scroll-mt-24 bg-[#0b0b0b] px-4 py-20 text-white md:px-[9%] md:py-28"
      >
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-block rounded-full bg-[#f2a24a] px-5 py-1 text-sm font-semibold text-black">
            May 11-17, 2026
          </div>

          <h2 className="text-[44px] font-black uppercase tracking-[-1px] text-[#f2a24a] md:text-[48px]">
            SUMMER KICK OFF
          </h2>

          <p className="mt-3 text-lg text-white/70">
            A Week of Riding, Music & Campground Fun!
          </p>
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <img
            src="/summer-event.jpg"
            alt="Summer Event"
            className="w-full rounded-2xl object-cover shadow-2xl"
          />

          <div className="space-y-6 md:pt-20">
            <div className="rounded-2xl border border-white/10 bg-[#151515] p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                🎵 Concert & Events
              </h3>
              <p className="text-sm text-white/70">
                Saturday, May 16 — Activities and music all day. Night ride
                starts 11:30 PM.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#151515] p-6">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                🎟️ Ticket Pricing
              </h3>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-xl bg-white/5 p-5">
                  <div className="text-xl font-black">$10</div>
                  <div className="text-sm text-white/60">Children</div>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="text-xl font-black">$25</div>
                  <div className="text-sm text-white/60">Concert Only</div>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="text-xl font-black">$75</div>
                  <div className="text-sm text-white/60">Weekend</div>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="text-xl font-black">$100</div>
                  <div className="text-sm text-white/60">All Week Pass</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/50">
                Card payments incur a 5% fee. Memberships & gift cards not
                accepted.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#151515] p-6">
              <h3 className="mb-2 text-lg font-bold">📍 Reservations</h3>
              <p className="text-sm text-white/70">
                Call 843-333-4607 for reservations
              </p>
            </div>

            <a
              href="/purchase"
              className="inline-block rounded-lg bg-[#f2a24a] px-7 py-3 text-[15px] font-bold text-black transition hover:scale-105"
            >
              Buy Tickets →
            </a>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section
        id="annual-membership"
        className="bg-[#0b0b0b] px-4 py-20 text-white md:px-[8%] md:py-28"
      >
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#3a2618] px-4 py-2 text-[14px] font-bold text-[#f2b35f]">
            <Crown size={16} />
            Best Value
          </div>

          <h2 className="text-[34px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[42px]">
            ANNUAL MEMBERSHIP
          </h2>

          <p className="mt-5 text-[18px] font-medium text-white/85 md:text-[20px]">
            Get unlimited year-round access to all trails and dry camping
          </p>
        </div>

        <div className="mx-auto max-w-[1120px] overflow-hidden rounded-[18px] border border-[#6b523d]/55">
          <div className="bg-[#6b4a34] px-6 py-10 text-center md:px-8 md:py-12">
            <div className="text-[54px] font-black leading-none text-white md:text-[64px]">
              $500 <span className="text-[24px] font-medium">/year</span>
            </div>

            <p className="mt-4 text-[15px] font-bold text-white">
              Base package: 2 people, 1 machine{" "}
              <span className="font-normal text-white/80">
                (includes dry camping)
              </span>
            </p>

            <p className="mt-2 text-[13px] text-white/75">
              Note: Does not include the four major annual events
            </p>
          </div>

          <div className="bg-[#111111] px-5 py-8 md:px-10 md:py-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {[
                {
                  icon: <Calendar size={30} />,
                  title: "Unlimited Access",
                  text: "Ride any day for an entire year",
                },
                {
                  icon: <Tent size={30} />,
                  title: "Dry Camping",
                  text: "Camp for free whenever you visit",
                },
                {
                  icon: <Bike size={30} />,
                  title: "All Trails",
                  text: "60+ miles of off-road terrain",
                },
                {
                  icon: <Users size={30} />,
                  title: "Bring Friends",
                  text: "Includes 2 people & 1 machine",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[18px] bg-[#3f332f] p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-[#5a463c] hover:shadow-[0_0_35px_rgba(242,179,95,0.35)]"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2b35f]/70 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#f2b35f]">
                    {item.icon}
                  </div>

                  <h3 className="text-[20px] font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[16px] text-white/80">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[14px] bg-[#171717] px-6 py-6 md:px-8">
              <h3 className="mb-3 flex items-center gap-2 text-[18px] font-black text-white">
                <Sparkles size={22} className="text-[#f2b35f]" />
                Add More Riders & Machines
              </h3>

              <ul className="space-y-2 pl-4 text-[15px] font-medium text-white/85 md:pl-8">
                <li>• Additional people: +$50 each</li>
                <li>• Additional machines: +$100 each</li>
                <li>• Valid for 1 full year from purchase date</li>
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Link
                href="/purchase#membership"
                className="group flex h-[68px] w-full max-w-[300px] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#f2b35f] text-[18px] font-black text-black transition hover:scale-[1.03] hover:bg-[#ffd27a] hover:shadow-[0_0_30px_rgba(242,179,95,0.65)]"
              >
                Get Your Membership
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>

              <Link
                href="/purchase#day-pass"
                className="group flex h-[68px] w-full max-w-[300px] cursor-pointer items-center justify-center rounded-[10px] border border-white/20 bg-[#171717] text-[18px] font-black text-white transition-all duration-300 hover:bg-[#f2b35f] hover:text-black"
              >
                Try a Day Pass First
              </Link>
            </div>

            <p className="mt-8 text-center text-[14px] font-medium text-white/70">
              Questions about membership?{" "}
              <span className="font-bold text-[#f2b35f]">Contact us</span>
            </p>
          </div>
        </div>
      </section>

      {/* EPIC TRAILS */}
      <section id="epic-trails" className="scroll-mt-24 px-4 py-20 md:px-[6%] md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/2 h-[260px] w-[760px] -translate-x-1/2 rounded-full bg-[#f2b35f]/20 blur-[140px]" />
          <div className="absolute right-10 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#f2b35f]/10 blur-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-[34px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[46px]">
              EPIC TRAILS AWAIT
            </h2>

            <p className="mx-auto mt-6 max-w-[900px] text-[19px] font-medium leading-[1.7] text-white/80 md:text-[25px] md:leading-[1.9]">
              From winding forest paths to adrenaline-pumping mud bogs, our
              trails offer something for every rider.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="space-y-6 md:space-y-8">
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
                    className="group flex min-h-[135px] cursor-pointer items-center gap-5 rounded-[20px] border border-white/15 bg-[#141414]/92 px-5 py-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#27b99d] hover:bg-[#1a2421] hover:shadow-[0_0_40px_rgba(39,185,157,0.30)] md:min-h-[165px] md:gap-7 md:rounded-[24px] md:px-10 md:py-8"
                  >
                    <Icon
                      size={34}
                      className="shrink-0 text-[#27b99d] transition-all duration-300 group-hover:scale-125 group-hover:text-[#f6c35f] md:size-[38px]"
                    />

                    <div>
                      <h3 className="text-[22px] font-black tracking-[-0.5px] text-white md:text-[30px]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[15px] font-medium leading-[1.6] text-white/75 md:mt-3 md:text-[19px] md:leading-[1.8]">
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
                className="h-[320px] w-full rounded-[22px] object-cover shadow-[0_30px_100px_rgba(0,0,0,0.65)] md:h-[620px]"
              />

              <div className="absolute inset-0 rounded-[22px] bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* TRAIL MAP */}
      <section className="bg-[#0b0b0b] px-4 py-20 text-white md:px-[8%]">
        <div className="mb-10 text-center">
          <h2 className="text-[34px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[46px]">
            EXPLORE OUR TRAIL MAP
          </h2>

          <p className="mt-5 text-[18px] font-medium text-white/75 md:text-[20px]">
            Navigate 60+ miles of trails and plan your adventure
          </p>
        </div>

        <TrailMap />

        <div className="mx-auto mt-12 w-full max-w-[1180px] rounded-[18px] border border-white/[0.06] bg-[#101010]/80 px-5 py-10 text-center md:px-8 md:py-[54px]">
          <h2 className="mb-4 text-[24px] font-black uppercase leading-none tracking-[-0.5px] text-white md:text-[27px]">
            ALL SKILL LEVELS WELCOME
          </h2>

          <p className="mx-auto max-w-[720px] text-[16px] font-medium leading-[1.6] text-white/70 md:text-[18px]">
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