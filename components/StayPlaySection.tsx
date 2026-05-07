"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Caravan, Tent } from "lucide-react";

export default function StayPlaySection() {
  const router = useRouter();

  const [tab, setTab] = useState<"cabin" | "clubhouse">("cabin");
  const [slide, setSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  function prevSlide() {
    setSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function nextSlide() {
    setSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  }

  return (
    <section
      id="stay-play"
      className="relative scroll-mt-24 overflow-hidden px-4 py-16 text-white md:px-[7%] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.26),transparent_32%),radial-gradient(circle_at_85%_5%,rgba(246,195,95,0.12),transparent_30%),linear-gradient(180deg,#10100f_0%,#1a1713_50%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10 mb-9 text-center md:mb-14">
        <h2 className="text-[30px] font-black uppercase leading-none tracking-[-1px] md:text-[52px]">
          STAY & PLAY
        </h2>

        <p className="mx-auto mt-4 max-w-[720px] text-[15px] font-medium leading-[1.65] text-white/75 md:mt-6 md:text-[24px] md:leading-[1.35]">
          Make it a weekend! Choose from cabins, RV sites, or tent camping to
          extend your adventure.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1420px] grid-cols-1 gap-5 md:gap-8 lg:grid-cols-3">
        {/* CABINS / CLUBHOUSE */}
        <div className="group overflow-hidden rounded-[18px] border border-white/15 bg-[#151515]/85 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/60 active:scale-[0.99] active:border-[#f6c35f]/60">
          <div
            className="relative h-[235px] touch-pan-y overflow-hidden md:h-[300px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[slide]}
              alt={tab === "cabin" ? "Cozy Cabins" : "Clubhouse"}
              className="h-full w-full select-none object-cover transition-all duration-700 group-hover:scale-105 group-active:scale-105"
              draggable={false}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`h-2.5 cursor-pointer touch-manipulation rounded-full transition-all duration-300 active:scale-90 ${
                    slide === i
                      ? "w-8 bg-[#f6c35f]"
                      : "w-2.5 bg-white/45 hover:bg-white active:bg-white"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold text-white/80 backdrop-blur-md md:hidden">
              Swipe
            </div>
          </div>

          <div className="flex flex-col p-5 md:min-h-[580px] md:p-7">
            <div className="mb-4 flex items-center gap-3 md:mb-5 md:gap-4">
              <Home className="shrink-0 text-[#63d6b8]" size={23} />
              <h3 className="text-[21px] font-black uppercase leading-none md:text-[26px]">
                COZY CABINS
              </h3>
            </div>

            <div className="mb-5 flex rounded-[12px] bg-white/10 p-1 md:mb-7">
              <button
                type="button"
                onClick={() => changeTab("cabin")}
                className={`flex-1 cursor-pointer touch-manipulation rounded-[10px] py-3 text-[14px] font-bold transition-all duration-300 active:scale-95 md:text-[15px] ${
                  tab === "cabin"
                    ? "bg-[#1d6d54] text-white shadow-[0_0_18px_rgba(29,109,84,0.55)]"
                    : "text-white/70 hover:bg-[#f6c35f] hover:text-black active:bg-[#f6c35f] active:text-black"
                }`}
              >
                Cabin
              </button>

              <button
                type="button"
                onClick={() => changeTab("clubhouse")}
                className={`flex-1 cursor-pointer touch-manipulation rounded-[10px] py-3 text-[14px] font-bold transition-all duration-300 active:scale-95 md:text-[15px] ${
                  tab === "clubhouse"
                    ? "bg-[#1d6d54] text-white shadow-[0_0_18px_rgba(29,109,84,0.55)]"
                    : "text-white/70 hover:bg-[#f6c35f] hover:text-black active:bg-[#f6c35f] active:text-black"
                }`}
              >
                ClubHouse
              </button>
            </div>

            {tab === "cabin" ? (
              <>
                <p className="mb-4 text-[14px] font-medium leading-[1.65] text-white/70 md:mb-6 md:text-[18px] md:leading-[1.55]">
                  Comfortable cabin sleeping up to 4 with modern amenities.
                  Perfect for families looking for a home away from home.
                </p>

                <ul className="mb-5 space-y-2 text-[14px] font-bold leading-[1.6] text-white/80 md:mb-6 md:space-y-3 md:text-[16px]">
                  <li>• Sleeps 4</li>
                  <li>• Full kitchen</li>
                  <li>• Hot shower</li>
                  <li>• Climate control</li>
                </ul>

                <p className="mb-6 text-[19px] font-black text-[#63d6b8] md:mb-7 md:text-[22px]">
                  $140 per night
                </p>
              </>
            ) : (
              <>
                <p className="mb-4 text-[14px] font-medium leading-[1.65] text-white/70 md:mb-6 md:text-[18px] md:leading-[1.55]">
                  Spacious clubhouse option for gatherings, groups, and special
                  weekends at River Neck.
                </p>

                <ul className="mb-5 space-y-2 text-[14px] font-bold leading-[1.6] text-white/80 md:mb-6 md:space-y-3 md:text-[16px]">
                  <li>• Great for groups</li>
                  <li>• Indoor space</li>
                  <li>• Close to amenities</li>
                  <li>• Perfect for events</li>
                </ul>

                <p className="mb-6 text-[19px] font-black text-[#63d6b8] md:mb-7 md:text-[22px]">
                  Book for availability
                </p>
              </>
            )}

            <button
              type="button"
              onClick={goToSignIn}
              className="mt-auto h-[52px] w-full cursor-pointer touch-manipulation rounded-[10px] bg-[#1d6d54] text-[15px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f6c35f] hover:text-black hover:shadow-[0_0_35px_rgba(246,195,95,0.55)] active:scale-95 active:bg-[#f6c35f] active:text-black md:h-[56px] md:text-[16px]"
            >
              Sign In to Book
            </button>
          </div>
        </div>

        {/* RV */}
        <div className="group overflow-hidden rounded-[18px] border border-white/15 bg-[#151515]/85 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/60 active:scale-[0.99] active:border-[#f6c35f]/60">
          <div className="h-[235px] overflow-hidden md:h-[300px]">
            <img
              src="/images/stay/rv-hookups.jpg"
              alt="RV Hookups"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-active:scale-105"
            />
          </div>

          <div className="flex flex-col p-5 md:min-h-[580px] md:p-7">
            <div className="mb-4 flex items-center gap-3 md:mb-5 md:gap-4">
              <Caravan className="shrink-0 text-[#63d6b8]" size={24} />
              <h3 className="text-[21px] font-black uppercase leading-none md:text-[26px]">
                RV HOOKUPS
              </h3>
            </div>

            <p className="mb-4 text-[14px] font-medium leading-[1.65] text-white/70 md:mb-6 md:text-[18px] md:leading-[1.55]">
              Full-service RV sites with electric, water, and electric hookups
              in a scenic wooded setting.
            </p>

            <ul className="mb-5 space-y-2 text-[14px] font-bold leading-[1.6] text-white/80 md:mb-6 md:space-y-3 md:text-[16px]">
              <li>• 30/50 amp service</li>
              <li>• Water & electric</li>
              <li>• Level sites</li>
            </ul>

            <p className="mb-6 text-[19px] font-black text-[#63d6b8] md:text-[22px]">
              $45 per night
            </p>

            <button
              type="button"
              onClick={goToSignIn}
              className="mt-auto h-[52px] w-full cursor-pointer touch-manipulation rounded-[10px] bg-[#1d6d54] text-[15px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f6c35f] hover:text-black hover:shadow-[0_0_35px_rgba(246,195,95,0.55)] active:scale-95 active:bg-[#f6c35f] active:text-black md:h-[56px] md:text-[16px]"
            >
              Sign In to Book
            </button>
          </div>
        </div>

        {/* TENT */}
        <div className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-white/15 bg-[#151515]/85 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/60 active:scale-[0.99] active:border-[#f6c35f]/60">
          <div className="h-[235px] overflow-hidden md:h-[300px]">
            <img
              src="/images/stay/tent-camping.jpg"
              alt="Tent Camping"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-active:scale-105"
            />
          </div>

          <div className="flex flex-col p-5 md:min-h-[580px] md:p-7">
            <div className="mb-4 flex items-center gap-3 md:mb-5 md:gap-4">
              <Tent className="shrink-0 text-[#63d6b8]" size={24} />
              <h3 className="text-[21px] font-black uppercase leading-none md:text-[26px]">
                TENT CAMPING
              </h3>
            </div>

            <p className="mb-4 text-[14px] font-medium italic leading-[1.65] text-white/70 md:mb-6 md:text-[18px] md:leading-[1.55]">
              Traditional camping experience with designated tent sites close to
              trails and facilities.
            </p>

            <ul className="mb-5 space-y-2 text-[14px] font-bold leading-[1.6] text-white/80 md:mb-6 md:space-y-3 md:text-[16px]">
              <li>• Fire pits</li>
              <li>• Picnic tables</li>
              <li>• Restroom access</li>
              <li>• Trail access</li>
            </ul>

            <p className="mb-6 text-[19px] font-black text-[#63d6b8] md:text-[22px]">
              $11 per night
            </p>

            <button
              type="button"
              onClick={goToSignIn}
              className="mt-auto h-[52px] w-full cursor-pointer touch-manipulation rounded-[10px] bg-[#1d6d54] text-[15px] font-black text-white shadow-[0_0_24px_rgba(29,109,84,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f6c35f] hover:text-black hover:shadow-[0_0_35px_rgba(246,195,95,0.55)] active:scale-95 active:bg-[#f6c35f] active:text-black md:h-[56px] md:text-[16px]"
            >
              Sign In to Book
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex justify-center md:mt-10">
        <button
          type="button"
          onClick={goToSignIn}
          className="h-[54px] w-full max-w-[320px] cursor-pointer touch-manipulation rounded-[12px] bg-[#f6c35f] px-8 text-[16px] font-black text-black shadow-[0_0_32px_rgba(246,195,95,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1d6d54] hover:text-white hover:shadow-[0_0_40px_rgba(29,109,84,0.55)] active:scale-95 active:bg-[#1d6d54] active:text-white md:h-[60px] md:w-auto md:max-w-none md:px-10 md:text-[18px]"
        >
          Sign Up to Book
        </button>
      </div>
    </section>
  );
}