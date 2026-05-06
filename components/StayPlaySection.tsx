"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Caravan, Tent } from "lucide-react";

export default function StayPlaySection() {
  const router = useRouter();

  const [tab, setTab] = useState<"cabin" | "clubhouse">("cabin");
  const [slide, setSlide] = useState(0);

  const cabinImages = [
    "/images/stay/cabin-1.jpg",
    "/images/stay/cabin-2.jpg",
    "/images/stay/cabin-3.jpg",
    "/images/stay/cabin-4.jpg",
    "/images/stay/cabin-5.jpg",
    "/images/stay/cabin-6.jpg",
  ];

  const clubhouseImages = [
    "/images/stay/clubhouse-1.jpg",
    "/images/stay/clubhouse-2.jpg",
    "/images/stay/clubhouse-3.jpg",
    "/images/stay/clubhouse-4.jpg",
    "/images/stay/clubhouse-5.jpg",
  ];

  const images = tab === "cabin" ? cabinImages : clubhouseImages;

  function changeTab(value: "cabin" | "clubhouse") {
    setTab(value);
    setSlide(0);
  }

  function goToSignIn() {
    router.push("/auth");
  }

  return (
    <section
      id="stay-play"
      className="relative scroll-mt-24 overflow-hidden px-[7%] py-28 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.32),transparent_32%),radial-gradient(circle_at_85%_5%,rgba(246,195,95,0.18),transparent_30%),linear-gradient(180deg,#10100f_0%,#1a1713_50%,#0b1110_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10 mb-14 text-center">
        <h2 className="text-[52px] font-black uppercase leading-none tracking-[-1px]">
          STAY & PLAY
        </h2>

        <p className="mx-auto mt-6 max-w-[760px] text-[24px] font-medium leading-[1.35] text-white/75">
          Make it a weekend! Choose from cabins, RV sites, or tent camping to
          extend your adventure.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1420px] grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="overflow-hidden rounded-[18px] border border-white/15 bg-[#151515]/85 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/60">
          <div className="relative h-[300px] overflow-hidden">
            <img
              src={images[slide]}
              alt="Cozy Cabins"
              className="h-full w-full object-cover transition-all duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <button
              type="button"
              onClick={() =>
                setSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-[#f6c35f] hover:text-black"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() =>
                setSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-[#f6c35f] hover:text-black"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                    slide === i
                      ? "w-8 bg-[#f6c35f]"
                      : "w-2.5 bg-white/45 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex min-h-[580px] flex-col p-7">
            <div className="mb-5 flex items-center gap-4">
              <Home className="text-[#63d6b8]" size={24} />
              <h3 className="text-[26px] font-black uppercase">COZY CABINS</h3>
            </div>

            <div className="mb-7 flex rounded-[12px] bg-white/10 p-1">
              <button
                type="button"
                onClick={() => changeTab("cabin")}
                className={`flex-1 cursor-pointer rounded-[10px] py-3 text-[15px] font-bold transition-all duration-300 ${
                  tab === "cabin"
                    ? "bg-[#1d6d54] text-white shadow-[0_0_18px_rgba(29,109,84,0.55)]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Cabin
              </button>

              <button
                type="button"
                onClick={() => changeTab("clubhouse")}
                className={`flex-1 cursor-pointer rounded-[10px] py-3 text-[15px] font-bold transition-all duration-300 ${
                  tab === "clubhouse"
                    ? "bg-[#1d6d54] text-white shadow-[0_0_18px_rgba(29,109,84,0.55)]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                ClubHouse
              </button>
            </div>

            {tab === "cabin" ? (
              <>
                <p className="mb-6 text-[18px] font-medium leading-[1.5] text-white/70">
                  Comfortable cabin sleeping up to 4 with modern amenities.
                  Perfect for families looking for a home away from home.
                </p>

                <ul className="mb-6 space-y-3 text-[16px] font-bold text-white/80">
                  <li>• Sleeps 4</li>
                  <li>• Full kitchen</li>
                  <li>• Hot shower</li>
                  <li>• Climate control</li>
                </ul>

                <p className="mb-7 text-[22px] font-black text-[#63d6b8]">
                  $140 per night
                </p>
              </>
            ) : (
              <>
                <p className="mb-6 text-[18px] font-medium leading-[1.5] text-white/70">
                  Spacious clubhouse option for gatherings, groups, and special
                  weekends at River Neck.
                </p>

                <ul className="mb-6 space-y-3 text-[16px] font-bold text-white/80">
                  <li>• Great for groups</li>
                  <li>• Indoor space</li>
                  <li>• Close to amenities</li>
                  <li>• Perfect for events</li>
                </ul>

                <p className="mb-7 text-[22px] font-black text-[#63d6b8]">
                  Book for availability
                </p>
              </>
            )}

            <button
              type="button"
              onClick={goToSignIn}
              className="mt-auto h-[58px] w-full cursor-pointer rounded-[10px] bg-[#1d6d54] text-[16px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition hover:bg-[#f6c35f] hover:text-black"
            >
              Sign In to Book
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-white/15 bg-[#151515]/85 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/60">
          <div className="h-[300px] overflow-hidden">
            <img
              src="/images/stay/rv-hookups.jpg"
              alt="RV Hookups"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="flex min-h-[580px] flex-col p-7">
            <div className="mb-5 flex items-center gap-4">
              <Caravan className="text-[#63d6b8]" size={25} />
              <h3 className="text-[26px] font-black uppercase">RV HOOKUPS</h3>
            </div>

            <p className="mb-6 text-[18px] font-medium leading-[1.5] text-white/70">
              Full-service RV sites with electric, water, and electric hookups
              in a scenic wooded setting.
            </p>

            <ul className="mb-6 space-y-3 text-[16px] font-bold text-white/80">
              <li>• 30/50 amp service</li>
              <li>• Water & electric</li>
              <li>• Level sites</li>
            </ul>

            <p className="mb-6 text-[22px] font-black text-[#63d6b8]">
              $45 per night
            </p>

            <button
              type="button"
              onClick={goToSignIn}
              className="mt-auto h-[58px] w-full cursor-pointer rounded-[10px] bg-[#1d6d54] text-[16px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition hover:bg-[#f6c35f] hover:text-black"
            >
              Sign In to Book
            </button>
          </div>
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-white/15 bg-[#151515]/85 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/60">
          <div className="h-[300px] overflow-hidden">
            <img
              src="/images/stay/tent-camping.jpg"
              alt="Tent Camping"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="flex min-h-[580px] flex-col p-7">
            <div className="mb-5 flex items-center gap-4">
              <Tent className="text-[#63d6b8]" size={25} />
              <h3 className="text-[26px] font-black uppercase">
                TENT CAMPING
              </h3>
            </div>

            <p className="mb-6 text-[18px] font-medium italic leading-[1.5] text-white/70">
              Traditional camping experience with designated tent sites close to
              trails and facilities.
            </p>

            <ul className="mb-6 space-y-3 text-[16px] font-bold text-white/80">
              <li>• Fire pits</li>
              <li>• Picnic tables</li>
              <li>• Restroom access</li>
              <li>• Trail access</li>
            </ul>

            <p className="text-[22px] font-black text-[#63d6b8]">
              $11 per night
            </p>

            <button
              type="button"
              onClick={goToSignIn}
              className="mt-auto h-[58px] w-full cursor-pointer rounded-[10px] bg-[#1d6d54] text-[16px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition hover:bg-[#f6c35f] hover:text-black"
            >
              Sign In to Book
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <button
          type="button"
          onClick={goToSignIn}
          className="h-[60px] cursor-pointer rounded-[12px] bg-[#f6c35f] px-10 text-[18px] font-black text-black shadow-[0_0_32px_rgba(246,195,95,0.35)] transition duration-300 hover:bg-[#1d6d54] hover:text-white hover:shadow-[0_0_32px_rgba(29,109,84,0.45)]"
        >
          Sign Up to Book
        </button>
      </div>
    </section>
  );
}