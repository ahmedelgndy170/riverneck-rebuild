"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  ShoppingCart,
  Menu,
  X,
  Ticket,
  QrCode,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";
import { useUserRole } from "@/hooks/useUserRole";

export default function SiteHeader() {
  const { cartCount } = useCart();
  const { canAccessAdmin } = useUserRole();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email ?? null);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setMobileMenuOpen(false);
    setQuickOpen(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-[68px] w-full items-center justify-between border-b border-white/10 bg-[#151515]/95 px-4 backdrop-blur-md md:h-[86px] md:px-[9%]">
        <Link
          href={canAccessAdmin ? "/admin" : "/"}
          onClick={() => {
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
        </Link>

        <div className="hidden items-center gap-8 text-[16px] font-bold lg:flex">
          <a href="/about" className="transition hover:text-[#25b99a]">
            About Us
          </a>

          <a href="/about?tab=rules" className="transition hover:text-[#25b99a]">
            Rules
          </a>

          <a href="/#stay-play" className="transition hover:text-[#f6c35f]">
            Accommodations
          </a>

          <a href="/purchase" className="transition hover:text-[#25b99a]">
            Day Pass & More
          </a>

          <a href="/#events" className="cursor-pointer transition hover:text-[#25b99a]">
            Events
          </a>

          <a href="/photos" className="transition hover:text-[#25b99a]">
            Photos
          </a>

          {canAccessAdmin && (
            <Link
              href="/admin"
              className="rounded-xl border border-[#25b99a]/25 bg-[#25b99a]/10 px-4 py-2 text-[14px] font-black text-[#25d0bd] transition hover:bg-[#25b99a] hover:text-black active:scale-95"
            >
              Admin Dashboard
            </Link>
          )}

          <Link
            href="/cart"
            className="relative text-white transition hover:text-[#25b99a]"
          >
            <ShoppingCart size={20} strokeWidth={2.2} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f2c06b] px-1 text-[11px] font-black text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {userEmail ? (
            <div className="flex items-center gap-4">
              <div className="max-w-[180px] truncate rounded-xl border border-[#25b99a]/20 bg-[#25b99a]/10 px-4 py-2 text-[14px] font-black text-[#25b99a]">
                {userEmail}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600 active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth?tab=signin"
                className="rounded-xl px-4 py-2 font-bold transition duration-200 hover:scale-105 hover:bg-[#f2c06b] hover:text-black"
              >
                Log In
              </Link>

              <Link
                href="/auth?tab=signup"
                className="rounded-xl bg-[#d5965c] px-6 py-3 font-bold text-black transition hover:opacity-90 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
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
            {userEmail && (
              <div className="mb-1 rounded-2xl border border-[#25b99a]/25 bg-[#25b99a]/10 px-5 py-4">
                <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/50">
                  Signed in
                </p>

                <p className="mt-1 truncate text-[14px] font-black text-[#25b99a]">
                  {userEmail}
                </p>
              </div>
            )}

            {[
              { label: "About Us", href: "/about" },
              { label: "Rules", href: "/about?tab=rules" },
              { label: "Accommodations", href: "/#stay-play" },
              { label: "Purchase", href: "/purchase" },
              { label: "Events", href: "/#events" },
              { label: "Photos", href: "/photos" },
              ...(canAccessAdmin
                ? [{ label: "Admin Dashboard", href: "/admin" }]
                : []),
              {
                label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}`,
                href: "/cart",
              },
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

            {userEmail ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 rounded-2xl bg-red-500 py-4 text-center text-[18px] font-black text-white transition active:scale-[0.97]"
              >
                Logout
              </button>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <a
                  href="/auth?tab=signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] py-4 text-center text-[16px] font-black text-white transition active:scale-[0.97]"
                >
                  Log In
                </a>

                <a
                  href="/auth?tab=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl bg-[#d89b2b] py-4 text-center text-[16px] font-black text-black transition active:scale-[0.97]"
                >
                  Sign Up
                </a>
              </div>
            )}
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
                Cart{cartCount > 0 ? ` (${cartCount})` : ""}
              </span>

              <span className="relative flex h-13 w-13 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl">
                <ShoppingCart size={23} />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f2c06b] px-1 text-[11px] font-black text-black">
                    {cartCount}
                  </span>
                )}
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

            {canAccessAdmin && (
              <Link
                href="/admin"
                className="flex touch-manipulation items-center gap-2 transition active:scale-95"
              >
                <span className="rounded-full bg-black/90 px-3 py-2 text-[13px] font-bold text-white shadow-xl">
                  Admin
                </span>

                <span className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25b99a] text-black shadow-xl">
                 <QrCode size={23} />
                </span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                setQuickOpen(false);
                window.location.href = "/#stay-play";
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
          type="button"
          onClick={() => setQuickOpen(!quickOpen)}
          className="flex h-16 w-16 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-[#3c9677] text-[34px] leading-none text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition hover:scale-105 active:scale-90 active:bg-[#f2c06b] active:text-black md:h-20 md:w-20 md:text-[42px]"
          aria-label="Open quick actions"
        >
          {quickOpen ? "×" : "+"}
        </button>
      </div>
    </>
  );
}
