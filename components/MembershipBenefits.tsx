import { Calendar, Tent, Bike, Users, Sparkles } from "lucide-react";
import { MEMBERSHIP_BENEFITS, MEMBERSHIP_EXTRAS } from "@/lib/parkContent";

const icons = [Calendar, Tent, Bike, Users] as const;

export default function MembershipBenefits({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mt-6 space-y-5" : "space-y-6"}>
      <div
        className={`grid grid-cols-1 gap-3 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2 md:gap-4 lg:grid-cols-4"}`}
      >
        {MEMBERSHIP_BENEFITS.map((item, index) => {
          const Icon = icons[index] ?? Users;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center md:p-5"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2b35f]/75 text-white">
                <Icon size={22} />
              </div>
              <h4 className="text-[15px] font-black text-white md:text-[16px]">
                {item.title}
              </h4>
              <p className="mt-1 text-[13px] leading-snug text-white/75 md:text-[14px]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-[14px] border border-white/10 bg-[#171717]/90 px-4 py-4 md:px-5 md:py-5">
        <h4 className="mb-2 flex items-center gap-2 text-[15px] font-black text-white md:text-[16px]">
          <Sparkles size={18} className="shrink-0 text-[#f2b35f]" />
          Membership Benefits
        </h4>
        <ul className="space-y-1.5 text-[13px] font-medium leading-relaxed text-white/85 md:text-[14px]">
          {MEMBERSHIP_EXTRAS.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
