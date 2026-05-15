"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#151515]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-[#25b99a]/50 hover:bg-[#25b99a] hover:text-black active:scale-95 md:bottom-8 md:right-8 md:h-14 md:w-14"
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} strokeWidth={2.5} />
    </button>
  );
}
