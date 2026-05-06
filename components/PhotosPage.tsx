"use client";

import { useState } from "react";
import { Heart, Camera, Star, Clock, X } from "lucide-react";

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
  const [activeFilter, setActiveFilter] = useState<FilterType>("newest");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const filteredPhotos = photos.filter((photo) => photo.filter === activeFilter);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10100f] px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.35),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.20),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(35,126,96,0.25),transparent_40%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#63d6b8]">
            River Neck Acres
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
            Community Photos
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-white/75">
            Share your riding adventure with the River Neck community.
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl">
          <FilterButton
            active={activeFilter === "newest"}
            onClick={() => setActiveFilter("newest")}
            icon={<Clock size={18} />}
          >
            Newest
          </FilterButton>

          <FilterButton
            active={activeFilter === "liked"}
            onClick={() => setActiveFilter("liked")}
            icon={<Heart size={18} />}
          >
            Most Liked
          </FilterButton>

          <FilterButton
            active={activeFilter === "staff"}
            onClick={() => setActiveFilter("staff")}
            icon={<Star size={18} />}
          >
            Staff Picks
          </FilterButton>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedPhoto(photo.src)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-white/5 text-left shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-2 hover:border-[#f6c35f]/70 hover:shadow-[0_0_45px_rgba(246,195,95,0.22)] ${
                index === 0 ? "sm:col-span-2 xl:col-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "h-[420px]" : "h-[310px]"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-sm font-black backdrop-blur-md">
                  <Camera size={16} className="text-[#63d6b8]" />
                  Community
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-2xl font-black">{photo.title}</h3>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#1d6d54] px-4 py-2 text-sm font-black text-white">
                      {photo.filter === "newest"
                        ? "Newest"
                        : photo.filter === "liked"
                        ? "Most Liked"
                        : "Staff Pick"}
                    </span>

                    <span className="flex items-center gap-2 font-black text-[#f6c35f]">
                      <Heart size={18} />
                      {photo.likes}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 cursor-pointer rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={28} />
          </button>

          <img
            src={selectedPhoto}
            alt="Selected community photo"
            className="max-h-[88vh] max-w-[95vw] rounded-3xl object-contain shadow-[0_0_80px_rgba(0,0,0,0.7)]"
          />
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
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-black transition ${
        active
          ? "bg-[#1d6d54] text-white shadow-[0_0_25px_rgba(29,109,84,0.55)]"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}