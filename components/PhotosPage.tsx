"use client";

import { useEffect, useState } from "react";
import { Heart, Camera, Star, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";

type FilterType = "newest" | "liked" | "staff";

const photos = [
  { src: "/images/photos/community-01.jpg", title: "Mud Launch", filter: "staff", likes: 248 },
  { src: "/images/photos/community-03.jpg", title: "Bounty Hole Action", filter: "newest", likes: 219 },
  { src: "/images/photos/community-04.jpg", title: "Golden Mud Ride", filter: "staff", likes: 205 },
  { src: "/images/photos/community-05.jpg", title: "Deep Mud Run", filter: "liked", likes: 231 },
  { src: "/images/photos/community-06.jpg", title: "Jump Zone", filter: "newest", likes: 184 },
  { src: "/images/photos/community-07.jpg", title: "Trail Runner", filter: "staff", likes: 176 },
  { src: "/images/photos/community-08.jpg", title: "Water Trail", filter: "liked", likes: 169 },
  { src: "/images/photos/community-09.jpg", title: "Mud Machine", filter: "newest", likes: 158 },
  { src: "/images/photos/community-10.jpg", title: "Family Ride", filter: "staff", likes: 151 },
  { src: "/images/photos/community-11.jpg", title: "Evening Trail", filter: "liked", likes: 144 },
  { src: "/images/photos/community-12.jpg", title: "Forest Ride", filter: "newest", likes: 139 },
  { src: "/images/photos/community-13.jpg", title: "Hard Pull", filter: "staff", likes: 132 },
  { src: "/images/photos/community-14.jpg", title: "Costume Ride", filter: "liked", likes: 126 },
  { src: "/images/photos/community-15.jpg", title: "Recovery Moment", filter: "newest", likes: 119 },
  { src: "/images/photos/community-16.jpg", title: "Fun Run", filter: "staff", likes: 113 },
  { src: "/images/photos/community-17.jpg", title: "Night Crew", filter: "liked", likes: 108 },
  { src: "/images/photos/community-18.jpg", title: "Arrival Line", filter: "newest", likes: 101 },
  { src: "/images/photos/community-19.jpg", title: "Loaded Up", filter: "staff", likes: 94 },
  { src: "/images/photos/community-20.jpg", title: "Big Sky Ride", filter: "newest", likes: 88 },
];

export default function PhotosPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("newest");

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const filteredPhotos = photos.filter(
    (photo) => photo.filter === activeFilter
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowRight") {
        nextPhoto();
      }

      if (e.key === "ArrowLeft") {
        prevPhoto();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredPhotos]);

  const nextPhoto = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === filteredPhotos.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  const prevPhoto = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? filteredPhotos.length - 1
        : selectedIndex - 1
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10100f] px-4 py-10 text-white selection:bg-[#f2c06b] selection:text-black md:px-6 md:py-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.35),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.20),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(35,126,96,0.25),transparent_40%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <section className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 text-center md:mb-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#63d6b8] md:text-sm">
            River Neck Acres
          </p>

          <h1 className="mt-4 text-[32px] font-black leading-none tracking-tight md:text-7xl">
            Community Photos
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[14px] font-semibold leading-[1.65] text-white/75 md:mt-5 md:text-lg">
            Share your riding adventure with the River Neck community.
          </p>
        </div>

        {/* FILTERS */}
        <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl sm:grid-cols-3 md:mb-12">
          <FilterButton
            active={activeFilter === "newest"}
            onClick={() => setActiveFilter("newest")}
            icon={<Clock size={17} />}
          >
            Newest
          </FilterButton>

          <FilterButton
            active={activeFilter === "liked"}
            onClick={() => setActiveFilter("liked")}
            icon={<Heart size={17} />}
          >
            Most Liked
          </FilterButton>

          <FilterButton
            active={activeFilter === "staff"}
            onClick={() => setActiveFilter("staff")}
            icon={<Star size={17} />}
          >
            Staff Picks
          </FilterButton>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-5">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`group relative cursor-pointer touch-manipulation overflow-hidden rounded-[22px] border border-white/15 bg-white/5 text-left shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-all duration-500 active:scale-[0.98] active:border-[#f6c35f]/70 active:shadow-[0_0_45px_rgba(246,195,95,0.22)] hover:-translate-y-2 hover:border-[#f6c35f]/70 hover:shadow-[0_0_45px_rgba(246,195,95,0.22)] ${
                index === 0
                  ? "sm:col-span-2 xl:col-span-2"
                  : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0
                    ? "h-[250px] md:h-[420px]"
                    : "h-[240px] md:h-[310px]"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-active:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* TOP BADGE */}
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-black backdrop-blur-md md:left-5 md:top-5 md:px-4 md:text-sm">
                  <Camera size={14} className="text-[#63d6b8]" />
                  Community
                </div>

                {/* BOTTOM */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5">
                  <h3 className="text-[18px] font-black leading-tight md:text-2xl">
                    {photo.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#1d6d54] px-3 py-2 text-[10px] font-black text-white md:px-4 md:text-sm">
                      {photo.filter === "newest"
                        ? "Newest"
                        : photo.filter === "liked"
                        ? "Most Liked"
                        : "Staff Pick"}
                    </span>

                    <span className="flex items-center gap-2 text-[13px] font-black text-[#f6c35f] md:text-base">
                      <Heart size={16} />
                      {photo.likes}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 p-3 backdrop-blur-md md:p-4">
          {/* CLOSE */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-3 top-3 z-20 cursor-pointer touch-manipulation rounded-full bg-white/10 p-3 text-white transition-all duration-300 active:scale-90 hover:bg-white/20 md:right-6 md:top-6"
          >
            <X size={24} />
          </button>

          {/* PREV */}
          <button
            type="button"
            onClick={prevPhoto}
            className="absolute left-2 z-20 flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition active:scale-90 hover:bg-[#f6c35f] hover:text-black md:left-5 md:h-14 md:w-14"
          >
            <ChevronLeft size={28} />
          </button>

          {/* NEXT */}
          <button
            type="button"
            onClick={nextPhoto}
            className="absolute right-2 z-20 flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition active:scale-90 hover:bg-[#f6c35f] hover:text-black md:right-5 md:h-14 md:w-14"
          >
            <ChevronRight size={28} />
          </button>

          {/* IMAGE */}
          <div className="flex w-full max-w-[1500px] flex-col items-center">
            <img
              src={filteredPhotos[selectedIndex].src}
              alt={filteredPhotos[selectedIndex].title}
              className="max-h-[80vh] w-auto max-w-[95vw] rounded-[22px] object-contain shadow-[0_0_80px_rgba(0,0,0,0.7)] md:max-h-[88vh]"
            />

            <div className="mt-4 text-center md:mt-5">
              <h3 className="text-[20px] font-black md:text-[28px]">
                {filteredPhotos[selectedIndex].title}
              </h3>

              <div className="mt-2 flex items-center justify-center gap-2 text-[14px] font-black text-[#f6c35f] md:text-lg">
                <Heart size={18} />
                {filteredPhotos[selectedIndex].likes} Likes
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-black transition-all duration-300 active:scale-95 md:py-4 md:text-sm ${
        active
          ? "bg-[#1d6d54] text-white shadow-[0_0_25px_rgba(29,109,84,0.55)]"
          : "text-white/75 hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}