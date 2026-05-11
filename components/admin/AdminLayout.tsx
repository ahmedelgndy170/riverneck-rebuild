"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BadgePercent,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  QrCode,
  RefreshCw,
  Settings,
  ShoppingBag,
  Ticket,
  Users,
  WalletCards,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUserRole } from "@/hooks/useUserRole";

type AdminLayoutProps = {
  children: ReactNode;
};

const primaryAdminLinks = [
  {
    label: "Admin",
    href: "/admin",
    icon: Settings,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Staff Scanner",
    href: "/admin/scan",
    icon: QrCode,
    roles: ["supervisor", "admin", "staff"],
  },
  {
    label: "Reservations",
    href: "/admin/reservations",
    icon: CalendarDays,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Calendar",
    href: "/admin/calendar",
    icon: CalendarDays,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Requests",
    href: "/admin/requests",
    icon: FileText,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Purchases",
    href: "/admin/orders",
    icon: ShoppingBag,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Loyalty",
    href: "/admin/loyalty",
    icon: Ticket,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Waivers",
    href: "/admin/waivers",
    icon: FileText,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Transactions",
    href: "/admin/transactions",
    icon: WalletCards,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Photos",
    href: "/admin/photos",
    icon: Camera,
    roles: ["supervisor", "admin"],
  },
];

const secondaryAdminLinks = [
  {
    label: "Events",
    href: "/admin/events",
    icon: CalendarDays,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Community Photos",
    href: "/admin/community-photos",
    icon: Camera,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Discount Codes",
    href: "/admin/discount-codes",
    icon: BadgePercent,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["supervisor"],
  },
  {
    label: "Activity Log",
    href: "/admin/activity-log",
    icon: Activity,
    roles: ["supervisor"],
  },
  {
    label: "Errors",
    href: "/admin/errors",
    icon: AlertTriangle,
    roles: ["supervisor"],
  },
  {
    label: "Abandoned Carts",
    href: "/admin/abandoned-carts",
    icon: CreditCard,
    roles: ["supervisor", "admin"],
  },
  {
    label: "Business Hours",
    href: "/admin/business-hours",
    icon: Clock,
    roles: ["supervisor"],
  },
  {
    label: "Flyer Generator",
    href: "/admin/flyer-generator",
    icon: BriefcaseBusiness,
    roles: ["supervisor", "admin"],
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { email, role, loading, canAccessAdmin } = useUserRole();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const protectAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(`/auth?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      if (!loading && !canAccessAdmin && role !== "staff") {
        router.replace("/");
        return;
      }

      setChecking(false);
    };

    protectAdmin();
  }, [router, pathname, loading, canAccessAdmin, role]);

  const allowedPrimaryLinks = useMemo(() => {
    return primaryAdminLinks.filter((item) =>
      role ? item.roles.includes(role) : false
    );
  }, [role]);

  const allowedSecondaryLinks = useMemo(() => {
    return secondaryAdminLinks.filter((item) =>
      role ? item.roles.includes(role) : false
    );
  }, [role]);

  const currentPageLabel =
    [...allowedPrimaryLinks, ...allowedSecondaryLinks].find((item) => {
      if (item.href === "/admin") return pathname === "/admin";
      return pathname.startsWith(item.href);
    })?.label ?? "Admin";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  };

  if (loading || checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101010] text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-7 text-center shadow-2xl">
          <RefreshCw className="mx-auto mb-4 animate-spin text-[#25b99a]" />
          <p className="text-lg font-black">Loading admin...</p>
          <p className="mt-2 text-sm text-white/55">
            Checking your permissions
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#151515]/95 backdrop-blur-xl">
        <div className="flex h-[72px] items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#25b99a] transition hover:text-[#35e0bd]"
          >
            <Home size={24} />
            <span className="hidden text-[20px] font-black uppercase tracking-[-0.6px] md:block">
              River Neck Acres
            </span>
            <span className="text-[20px] font-black uppercase md:hidden">
              RNA
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white/90 transition hover:border-[#25b99a]/40 hover:text-[#25b99a] md:flex"
            >
              <BarChart3 size={16} />
              Diagnostics
            </button>

            <div className="hidden max-w-[240px] truncate rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 md:block">
              {email}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-300 transition hover:bg-red-500 hover:text-white"
            >
              <span className="hidden md:inline">Logout</span>
              <LogOut className="md:hidden" size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-white/10">
          <div className="flex min-w-max items-center gap-1 px-3 py-2 md:px-8">
            {allowedPrimaryLinks.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
                    active
                      ? "bg-[#25b99a]/15 text-[#25d0bd]"
                      : "text-white/78 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto border-t border-white/10">
          <div className="flex min-w-max items-center gap-1 px-3 py-2 md:px-8">
            {allowedSecondaryLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
                    active
                      ? "bg-[#25b99a]/15 text-[#25d0bd]"
                      : "text-white/72 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-[#121212] px-4 py-4 md:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white/60">
          <Link href="/" className="hover:text-[#25b99a]">
            Dashboard
          </Link>
          <ChevronRight size={16} />
          <Link href="/admin" className="hover:text-[#25b99a]">
            Admin
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">{currentPageLabel}</span>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 md:py-10">{children}</section>
    </main>
  );
}