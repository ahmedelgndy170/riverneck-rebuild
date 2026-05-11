"use client";

import Link from "next/link";
import {
  CalendarDays,
  Camera,
  FileText,
  ShoppingBag,
  Users,
  QrCode,
} from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

export default function AdminPage() {
  const { email, role, canManageUsers } = useUserRole();

  const cards = [
    {
      title: "Events",
      text: "Create, edit, and manage event schedules.",
      href: "/admin/events",
      icon: CalendarDays,
      color: "from-[#25b99a]/30 to-[#0f2f2a]",
    },
    {
      title: "Photos",
      text: "Upload and manage community gallery photos.",
      href: "/admin/photos",
      icon: Camera,
      color: "from-[#f2c06b]/30 to-[#2f2110]",
    },
    {
      title: "Waivers",
      text: "Review signed waivers and rider records.",
      href: "/admin/waivers",
      icon: FileText,
      color: "from-[#8b5cf6]/30 to-[#211833]",
    },
    {
      title: "Orders",
      text: "View purchases, pending checkout orders, and ticket records.",
      href: "/admin/orders",
      icon: ShoppingBag,
      color: "from-[#38bdf8]/25 to-[#102737]",
    },
    {
      title: "Scanner",
      text: "Scan QR tickets, validate waivers, and check riders in.",
      href: "/admin/scan",
      icon: QrCode,
      color: "from-[#22c55e]/25 to-[#102414]",
    },
    ...(canManageUsers
      ? [
          {
            title: "Manage Users",
            text: "Add admins, staff, and control user permissions.",
            href: "/admin/users",
            icon: Users,
            color: "from-[#ef4444]/25 to-[#331616]",
          },
        ]
      : []),
  ];

  return (
    <section className="mx-auto max-w-[1180px] space-y-10">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#25b99a]">
          River Neck Acres
        </p>

        <h1 className="mt-3 text-[42px] font-black uppercase leading-none tracking-[-1px] text-white md:text-[64px]">
          Admin Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-base font-bold leading-7 text-white/60 md:text-lg">
          Manage events, photos, waivers, orders, users, scanner tools, and
          future website systems from one place.
        </p>

        {email && (
          <div className="mt-5 inline-flex rounded-full border border-[#25b99a]/25 bg-[#25b99a]/10 px-4 py-2 text-xs font-black uppercase text-[#25d0bd]">
            {email} • {role ?? "user"}
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className={`group min-h-[190px] rounded-[26px] border border-white/10 bg-gradient-to-br ${card.color} p-7 shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-[#25b99a]/45 hover:shadow-[0_0_45px_rgba(37,185,154,0.16)] active:scale-[0.98]`}
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-white">
                <Icon size={27} />
              </div>

              <h2 className="text-2xl font-black text-white">{card.title}</h2>

              <p className="mt-3 text-sm font-bold leading-6 text-white/65">
                {card.text}
              </p>

              <div className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-white/80">
                Open Panel →
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}