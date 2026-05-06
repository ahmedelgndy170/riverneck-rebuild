"use client"
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
} from "lucide-react";
import TrailMap from "@/components/TrailMap";
import StayPlaySection from "@/components/StayPlaySection";
import EventsSection from "@/components/EventsSection";
import PlanYourVisit from "@/components/PlanYourVisit";
import Footer from "@/components/Footer";
import PurchaseSection from "@/components/PurchaseSection";
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
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      {/* NAVBAR */}
      <nav className="fixed left-0 top-0 z-50 flex h-[86px] w-full items-center justify-between border-b border-white/10 bg-[#151515]/95 px-[9%]">
<button
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="group flex cursor-pointer items-center gap-2 text-[#25b99a]"
>
  <HomeIcon
    size={25}
    strokeWidth={2.4}
    className="transition duration-300 group-hover:scale-110"
  />

  <span className="relative text-[26px] font-black uppercase tracking-[-1px]">
    RIVER NECK ACRES

    <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-[#25b99a] transition-transform duration-75 group-hover:scale-x-100"></span>
  </span>
</button>
    <div className="hidden items-center gap-9 text-[16px] font-bold lg:flex">
  <a href="/about" className="hover:text-[#25b99a] transition">About Us</a>
<a href="/#stay-play" className="transition hover:text-[#f6c35f]">
  Accommodations
</a>
  <a href="/purchase" className="hover:text-[#25b99a] transition">Day Pass & More</a>
<a
  href="#events"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("events")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="cursor-pointer hover:text-[#25b99a] transition"
>
  Events
</a>
<a href="/photos" className="hover:text-[#25b99a] transition">
  Photos
</a>
<Link
  href="/cart"
className="text-white transition hover:text-[#25b99a]">
  <ShoppingCart size={20} strokeWidth={2.2} />
</Link>
<a
  href="/auth"
  className="px-4 py-2 rounded-xl font-bold transition duration-200 
             hover:bg-[#f2c06b] hover:text-black hover:scale-105"
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
      </nav>

     {/* HERO */}
<section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-[86px] text-center">
  <img
    src="/hero.jpg"
    alt="ATV rider"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-black/45" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/65" />

  <div className="relative z-10 mx-auto max-w-[1180px] px-4">
    <h1 className="font-black uppercase leading-[0.95] tracking-[-2px] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
      <span className="block text-[44px] md:text-[64px]">
        60+ MILES OF OFF-ROAD FREEDOM AT
      </span>

      <span className="mt-2 block text-[44px] text-[#f2a24a] drop-shadow-[0_3px_0_rgba(80,35,10,0.45)] md:text-[64px]">
        RIVER NECK ACRES
      </span>
    </h1>

    <p className="mt-8 text-[30px] font-black tracking-[-1px] text-white md:text-[36px]">
      💗 Ride. Camp. Fall in Love. 💗
    </p>

    <p className="mt-5 text-[20px] font-extrabold text-white md:text-[23px]">
      The ultimate outdoor playground for couples & friends!
    </p>

    <div className="mt-6 flex items-center justify-center">
      <div className="flex items-center gap-3 rounded-full bg-black/70 px-5 py-2 text-[14px] text-white backdrop-blur-md">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            parkStatus.label === "OPEN"
              ? "bg-green-500/20 text-green-400 shadow-[0_0_16px_rgba(34,197,94,0.45)]"
              : "bg-red-500/20 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.45)]"
          }`}
        >
          <Clock size={16} strokeWidth={2.4} />
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

        <span className="font-bold text-white/85">
          {parkStatus.text}
        </span>
      </div>
    </div>

    <div className="mx-auto mt-11 flex w-full max-w-[1120px] items-center justify-center gap-4 px-4">
      <Link
        href="/sign-waiver"
        className="group flex h-[76px] min-w-[250px] animate-pulse items-center justify-center gap-3 rounded-2xl bg-[#d72f45] px-6 text-white shadow-[0_0_32px_rgba(215,47,69,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ee3b55] hover:shadow-[0_0_42px_rgba(238,59,85,0.8)]"
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
        className="group flex h-[76px] min-w-[250px] cursor-pointer items-center justify-center gap-3 rounded-2xl bg-white px-6 text-[#5d8f86] shadow-[0_18px_35px_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(255,255,255,0.55)]"
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
        className="group flex h-[76px] min-w-[250px] items-center justify-center gap-3 rounded-2xl bg-[#f6c35f] px-6 text-[#241507] shadow-[0_18px_35px_rgba(246,195,95,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffd37a] hover:shadow-[0_0_34px_rgba(246,195,95,0.65)]"
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
        className="group flex h-[76px] min-w-[250px] cursor-pointer items-center justify-center gap-3 rounded-2xl border border-white/40 bg-black/20 px-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_34px_rgba(255,255,255,0.35)]"
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
<section id="summer" className="scroll-mt-24 bg-[#0b0b0b] px-[9%] py-28 text-white">
  <div className="mb-16 text-center">
    <div className="mb-4 inline-block rounded-full bg-[#f2a24a] px-5 py-1 text-sm font-semibold text-black">
      May 11-17, 2026
    </div>

    <h2 className="text-[48px] font-black uppercase tracking-[-1px] text-[#f2a24a]">
      SUMMER KICK OFF
    </h2>

    <p className="mt-3 text-lg text-white/70">
      A Week of Riding, Music & Campground Fun!
    </p>
  </div>

<div className="grid items-center gap-14 md:grid-cols-2">
      <img
      src="/summer-event.jpg"
      alt="Summer Event"
      className="w-full rounded-2xl object-cover shadow-2xl"
    />

<div className="space-y-6 pt-20">
        <div className="rounded-2xl border border-white/10 bg-[#151515] p-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
          🎵 Concert & Events
        </h3>
        <p className="text-sm text-white/70">
          Saturday, May 16 — Activities and music all day. Night ride starts 11:30 PM.
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
          Card payments incur a 5% fee. Memberships & gift cards not accepted.
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
  className="bg-[#0b0b0b] px-[8%] py-28 text-white"
>        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#3a2618] px-4 py-2 text-[14px] font-bold text-[#f2b35f]">
            <Crown size={16} />
            Best Value
          </div>

          <h2 className="text-[42px] font-black uppercase leading-none tracking-[-1px] text-white">
            ANNUAL MEMBERSHIP
          </h2>

          <p className="mt-5 text-[20px] font-medium text-white/85">
            Get unlimited year-round access to all trails and dry camping
          </p>
        </div>


 <div className="mx-auto max-w-[1120px] overflow-hidden rounded-[18px] border border-[#6b523d]/55"
>          <div className="bg-[#6b4a34] px-8 py-12 text-center">
            <div className="text-[64px] font-black leading-none text-white">
              $500 <span className="text-[26px] font-medium">/year</span>
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

          <div className="bg-[#111111] px-10 py-10">
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

  <p className="mt-2 text-[16px] text-white/80">
    {item.text}
  </p>
</div>
    ))}
            </div>
            

            <div className="mt-8 rounded-[14px] bg-[#171717] px-8 py-6">
              <h3 className="mb-3 flex items-center gap-2 text-[18px] font-black text-white">
                <Sparkles size={22} className="text-[#f2b35f]" />
                Add More Riders & Machines
              </h3>

              <ul className="space-y-2 pl-8 text-[15px] font-medium text-white/85">
                <li>• Additional people: +$50 each</li>
                <li>• Additional machines: +$100 each</li>
                <li>• Valid for 1 full year from purchase date</li>
              </ul>
            </div>

<div className="mt-10 flex flex-wrap justify-center gap-5">
  <Link
  href="/purchase#membership"
  className="group flex h-[68px] w-[280px] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#f2b35f] text-[18px] font-black text-black transition hover:scale-[1.03] hover:bg-[#ffd27a] hover:shadow-[0_0_30px_rgba(242,179,95,0.65)]"
>
  Get Your Membership

  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-2"
  />
</Link>

  <Link
    href="/purchase#day-pass"
    className="group flex h-[68px] w-[250px] cursor-pointer items-center justify-center rounded-[10px] border border-white/20 bg-[#171717] text-[18px] font-black text-white transition-all duration-300 hover:bg-[#f2b35f] hover:text-black"
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
<section id="epic-trails" className="scroll-mt-24 px-[6%] py-28">
            <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 h-[260px] w-[760px] -translate-x-1/2 rounded-full bg-[#f2b35f]/20 blur-[140px]" />
          <div className="absolute right-10 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#f2b35f]/10 blur-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-[46px] font-black uppercase leading-none tracking-[-1px] text-white">
              
         EPIC TRAILS AWAIT
</h2>

<p className="mx-auto mt-6 max-w-[900px] text-[25px] font-medium leading-[1.9] text-white/80">
  From winding forest paths to adrenaline-pumping mud bogs, our
  trails offer something for every rider.
</p>
</div>

<div className="mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
  <div className="space-y-8">

    {/* CARD 1 */}
    <div className="group flex min-h-[165px] cursor-pointer items-center gap-7 rounded-[24px] border border-white/15 bg-[#141414]/92 px-10 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#27b99d] hover:bg-[#1a2421] hover:shadow-[0_0_40px_rgba(39,185,157,0.30)]">

      <Mountain
        size={38}
        className="shrink-0 text-[#27b99d] transition-all duration-300 group-hover:scale-125 group-hover:text-[#f6c35f]"
      />

      <div>
        <h3 className="text-[30px] font-black tracking-[-0.5px] text-white">
          60+ Miles of Trails
        </h3>

        <p className="mt-3 text-[19px] font-medium leading-[1.8] text-white/75">
          Explore diverse terrain with trails for all skill levels,
          from beginner-friendly paths to expert challenges.
        </p>
      </div>
    </div>


    {/* CARD 2 */}
    <div className="group flex min-h-[165px] cursor-pointer items-center gap-7 rounded-[24px] border border-white/15 bg-[#141414]/92 px-10 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#27b99d] hover:bg-[#1a2421] hover:shadow-[0_0_40px_rgba(39,185,157,0.30)]">

      <Bike
        size={38}
        className="shrink-0 text-[#27b99d] transition-all duration-300 group-hover:scale-125 group-hover:text-[#f6c35f]"
      />

      <div>
        <h3 className="text-[30px] font-black tracking-[-0.5px] text-white">
          Dirt Bike Friendly
        </h3>

        <p className="mt-3 text-[19px] font-medium leading-[1.8] text-white/75">
          Purpose-built tracks and trails designed specifically for
          dirt bike riders seeking thrills and technical challenges.
        </p>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="group flex min-h-[165px] cursor-pointer items-center gap-7 rounded-[24px] border border-white/15 bg-[#141414]/92 px-10 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#27b99d] hover:bg-[#1a2421] hover:shadow-[0_0_40px_rgba(39,185,157,0.30)]">

      <Truck
        size={38}
        className="shrink-0 text-[#27b99d] transition-all duration-300 group-hover:scale-125 group-hover:text-[#f6c35f]"
      />

      <div>
        <h3 className="text-[30px] font-black tracking-[-0.5px] text-white">
          ATV & UTV Paradise
        </h3>

        <p className="mt-3 text-[19px] font-medium leading-[1.8] text-white/75">
          Wide trails and mud pits perfect for ATVs and
          side-by-sides. Bring the whole crew for an unforgettable
          ride.
        </p>
      </div>
    </div>

  </div>

  <div className="relative">
    <img
      src="/trails.jpg"
      alt="ATV trail rider"
      className="h-[620px] w-full rounded-[22px] object-cover shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
    />

    <div className="absolute inset-0 rounded-[22px] bg-black/10" />
  </div>
</div>
            </div>
      </section>
      {/* TRAIL MAP */}
<section className="bg-[#0b0b0b] px-[8%] py-20 text-white">
  <div className="mb-10 text-center">
    <h2 className="text-[46px] font-black uppercase leading-none tracking-[-1px] text-white">
      EXPLORE OUR TRAIL MAP
    </h2>

    <p className="mt-5 text-[20px] font-medium text-white/75">
      Navigate 60+ miles of trails and plan your adventure
    </p>
  </div>

<TrailMap key={Date.now()} />
  <div className="mx-auto mt-12 w-full max-w-[1180px] rounded-[18px] border border-white/[0.06] bg-[#101010]/80 px-8 py-[54px] text-center">
    <h2 className="mb-4 text-[27px] font-black uppercase leading-none tracking-[-0.5px] text-white">
      ALL SKILL LEVELS WELCOME
    </h2>

    <p className="mx-auto max-w-[720px] text-[18px] font-medium leading-[1.55] text-white/70">
      Whether you're a seasoned pro or just starting out, River Neck Acres has the perfect trail
      for you. Our marked trail system ensures you can find routes that match your experience
      and comfort level.
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