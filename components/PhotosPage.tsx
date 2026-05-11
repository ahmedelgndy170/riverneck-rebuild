"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Camera,
  Star,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type FilterType = "all" | "newest" | "liked" | "staff";

type PhotoType = {
  id: string;
  src: string;
  title: string;
  filter: FilterType;
  likes: number;
};

function normalizeCategory(category: string | null): FilterType {
  if (category === "newest" || category === "liked" || category === "staff") {
    return category;
  }

  return "newest";
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  async function fetchPhotos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("Photo")
      .select("id,title,imageUrl,category,likes,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Photos fetch error:", error.message);
      setLoading(false);
      return;
    }

    const formattedPhotos: PhotoType[] =
      data?.map((photo) => ({
        id: photo.id,
        src: photo.imageUrl,
        title: photo.title || "River Neck Photo",
        filter: normalizeCategory(photo.category),
        likes: photo.likes || 0,
      })) || [];

    setPhotos(formattedPhotos);
    setLoading(false);
  }

  useEffect(() => {
    fetchPhotos();

    const savedLikes = localStorage.getItem("likedPhotos");

    if (savedLikes) {
      try {
        const parsed = JSON.parse(savedLikes);

        if (Array.isArray(parsed)) {
          setLikedPhotos(parsed);
        }
      } catch {
        localStorage.removeItem("likedPhotos");
      }
    }
  }, []);

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((photo) => photo.filter === activeFilter);

  useEffect(() => {
    setSelectedIndex(null);
  }, [activeFilter]);

  function nextPhoto() {
    if (selectedIndex === null || filteredPhotos.length === 0) return;

    setSelectedIndex(
      selectedIndex === filteredPhotos.length - 1 ? 0 : selectedIndex + 1
    );
  }

  function prevPhoto() {
    if (selectedIndex === null || filteredPhotos.length === 0) return;

    setSelectedIndex(
      selectedIndex === 0 ? filteredPhotos.length - 1 : selectedIndex - 1
    );
  }

  async function handleLike(photoId: string) {
    if (likedPhotos.includes(photoId)) return;

    const targetPhoto = photos.find((photo) => photo.id === photoId);

    if (!targetPhoto) return;

    const updatedLiked = [...likedPhotos, photoId];

    setLikedPhotos(updatedLiked);
    localStorage.setItem("likedPhotos", JSON.stringify(updatedLiked));

    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId
          ? {
              ...photo,
              likes: photo.likes + 1,
            }
          : photo
      )
    );

    const { error } = await supabase
      .from("Photo")
      .update({
        likes: targetPhoto.likes + 1,
      })
      .eq("id", photoId);

    if (error) {
      console.error("Like update error:", error.message);

      const rolledBackLikes = updatedLiked.filter((id) => id !== photoId);

      setLikedPhotos(rolledBackLikes);
      localStorage.setItem("likedPhotos", JSON.stringify(rolledBackLikes));

      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoId
            ? {
                ...photo,
                likes: Math.max(photo.likes - 1, 0),
              }
            : photo
        )
      );
    }
  }

  return (
    <section className="relative px-4 py-10 text-white md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
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

        <div className="mx-auto mb-8 grid max-w-5xl grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl sm:grid-cols-4 md:mb-12">
          <FilterButton
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
            icon={<Images size={17} />}
          >
            All
          </FilterButton>

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

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center text-[16px] font-black text-white/70">
            Loading photos...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center text-[16px] font-black text-white/70">
            No photos found yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-5">
            {filteredPhotos.map((photo, index) => {
              const isLiked = likedPhotos.includes(photo.id);

              return (
                <div
                  key={photo.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedIndex(index);
                    }
                  }}
                  className={`group relative cursor-pointer touch-manipulation overflow-hidden rounded-[22px] border border-white/15 bg-white/5 text-left shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-all duration-500 active:scale-[0.98] active:border-[#f6c35f]/70 hover:-translate-y-2 hover:border-[#f6c35f]/70 hover:shadow-[0_0_45px_rgba(246,195,95,0.22)] ${
                    index === 0 ? "sm:col-span-2 xl:col-span-2" : ""
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
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-black backdrop-blur-md md:left-5 md:top-5 md:px-4 md:text-sm">
                      <Camera size={14} className="text-[#63d6b8]" />
                      Community
                    </div>

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

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(photo.id);
                          }}
                          disabled={isLiked}
                          className={`flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-black transition md:text-base ${
                            isLiked
                              ? "bg-red-500 text-white"
                              : "bg-black/45 text-[#f6c35f] hover:bg-red-500 hover:text-white active:scale-95"
                          }`}
                        >
                          <Heart
                            size={16}
                            fill={isLiked ? "currentColor" : "none"}
                          />
                          {photo.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedIndex !== null && filteredPhotos[selectedIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 p-3 backdrop-blur-md md:p-4">
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-3 top-3 z-20 cursor-pointer touch-manipulation rounded-full bg-white/10 p-3 text-white transition active:scale-90 hover:bg-white/20 md:right-6 md:top-6"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={prevPhoto}
            className="absolute left-2 z-20 flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition active:scale-90 hover:bg-[#f6c35f] hover:text-black md:left-5 md:h-14 md:w-14"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            onClick={nextPhoto}
            className="absolute right-2 z-20 flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition active:scale-90 hover:bg-[#f6c35f] hover:text-black md:right-5 md:h-14 md:w-14"
          >
            <ChevronRight size={28} />
          </button>

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

              <button
                type="button"
                onClick={() => handleLike(filteredPhotos[selectedIndex].id)}
                disabled={likedPhotos.includes(filteredPhotos[selectedIndex].id)}
                className={`mx-auto mt-2 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[14px] font-black transition md:text-lg ${
                  likedPhotos.includes(filteredPhotos[selectedIndex].id)
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-[#f6c35f] hover:bg-red-500 hover:text-white active:scale-95"
                }`}
              >
                <Heart
                  size={18}
                  fill={
                    likedPhotos.includes(filteredPhotos[selectedIndex].id)
                      ? "currentColor"
                      : "none"
                  }
                />
                {filteredPhotos[selectedIndex].likes} Likes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
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