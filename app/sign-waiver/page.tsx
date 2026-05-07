"use client";

import { useState } from "react";
import {
  Search,
  CalendarDays,
  PenLine,
  Shield,
  AlertTriangle,
} from "lucide-react";

function formatUSDate(value: string) {
  if (!value) return "Select Date";

  const date = new Date(value + "T00:00:00");

  const day = date.getDate();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  const month = date.toLocaleString("en-US", {
    month: "long",
  });

  const year = date.getFullYear();

  return `${month} ${day}${suffix}, ${year}`;
}

export default function SignWaiverPage() {
  const [mode, setMode] =
    useState<"lookup" | "new">("lookup");

  const [minors, setMinors] = useState(0);

  const [date, setDate] = useState("");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#101010] px-4 py-10 text-white md:px-[6%] md:py-20">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.30),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-10 text-center md:mb-14">
          <div className="mx-auto mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-full border border-[#25b99a]/30 bg-[#25b99a]/10 shadow-[0_0_35px_rgba(37,185,154,0.18)]">
            <Shield
              size={38}
              className="text-[#25b99a]"
            />
          </div>

          <h1 className="text-[36px] font-black leading-none tracking-tight md:text-[58px]">
            Sign Liability Waiver
          </h1>

          <p className="mx-auto mt-4 max-w-[760px] text-[16px] font-semibold leading-[1.6] text-white/75 md:text-[22px]">
            Required before riding at River Neck Acres
          </p>
        </div>

        {mode === "lookup" ? (
          <section className="mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
            <h2 className="mb-3 flex items-center gap-3 text-[28px] font-black md:text-[38px]">
              <Search size={34} />
              Already Signed Before?
            </h2>

            <p className="mb-8 text-[16px] font-semibold leading-[1.6] text-white/75 md:text-[20px]">
              Enter your phone number to quickly renew your waiver
            </p>

            <div className="flex flex-col gap-4 md:flex-row">
              <input
                placeholder="Enter phone number"
                className="h-[58px] flex-1 rounded-xl border border-white/10 bg-[#151515] px-5 text-[16px] font-semibold outline-none transition-all duration-300 focus:border-[#25b99a] md:text-[18px]"
              />

              <button className="h-[58px] rounded-xl bg-[#25d0bd] px-8 text-[15px] font-black text-black shadow-[0_0_25px_rgba(37,208,189,0.25)] transition-all duration-300 active:scale-95 hover:scale-[1.02] hover:bg-[#f2c06b] hover:shadow-[0_0_35px_rgba(242,192,107,0.45)]">
                Look Up
              </button>
            </div>

            <p className="mt-7 text-[15px] font-semibold text-white/75 md:text-[18px]">
              First time?{" "}
              <button
                onClick={() => setMode("new")}
                className="font-black text-[#25b99a] underline transition hover:text-[#f2c06b]"
              >
                Fill out new waiver
              </button>
            </p>
          </section>
        ) : (
          <section className="mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
            <h2 className="text-[30px] font-black md:text-[40px]">
              Waiver Agreement
            </h2>

            <p className="mt-2 text-[15px] font-semibold leading-[1.6] text-white/75 md:text-[19px]">
              Please read carefully and fill out all fields
            </p>

            {/* ALERT */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#f2c06b]/30 bg-[#f2c06b]/10 p-4 md:p-5">
              <AlertTriangle
                size={22}
                className="mt-0.5 shrink-0 text-[#f2c06b]"
              />

              <p className="text-[14px] font-semibold leading-[1.7] text-white/90 md:text-[16px]">
                This is a legally binding liability waiver and release.
                Please read the agreement carefully before signing.
              </p>
            </div>

            {/* WAIVER */}
            <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-black/10 p-5 text-[14px] leading-7 text-white/90 md:p-8 md:text-[16px]">
              <div className="text-center font-black uppercase leading-8">
                <p>STATE OF SOUTH CAROLINA</p>
                <p>COUNTY OF FLORENCE</p>
                <p>WAIVER OF LIABILITY AND LEGAL RELEASE OF</p>
                <p>G&amp;H Farms LLC, &</p>
                <p>RIVER NECK ACRES, INC.</p>
              </div>

              <p className="font-bold uppercase">
                THIS IS AN AGREEMENT TO G&amp;H Farms LLC, RIVER NECK ACRES, INC.
                AND ALL ACTIVITIES INCLUDING BUT NOT LIMITED TO: ATV RIDING –
                INCLUDING 4-WHEELERS, ATV'S, UTV'S SIDE-BY-SIDE, DIRT BIKES,
                GOLF CARTS, FISHING, HUNTING, CANOEING, KAYAKING, ALL EQUINE
                ACTIVITY, AND CAMPING ON PROPERTY OWNED BY THE SAID G&amp;H Farms
                LLC &amp; RIVER NECK ACRES, INC.
              </p>

              <p className="font-bold uppercase">
                THIS ACTIVITY CONSTITUTES AND EXPRESS CONTRACTUAL ASSUMPTION OF
                ALL RISKS, AND BOTH A WAIVER AND RELEASE FROM ALL LIABILITY FROM
                ANY NEGLIGENCE OR DANGEROUS CONDITION OF PRIVATE PROPERTY AND
                INDEMNITY FOR ALL THIRD PARTY CLAIMS.
              </p>

              <p>
                I acknowledge and accept that ATV riding — including
                4-wheelers, ATV's, UTV's side-by-side, dirt bikes, golf carts,
                fishing, hunting, canoeing, kayaking, all equine activity, and
                camping — involves the risk of personal injury.
              </p>

              <p>
                I agree to indemnify, defend, and hold harmless G&amp;H Farms,
                LLC, River Neck Acres, INC., or any person or entity for any
                accident, injury, or loss.
              </p>

              <p>
                I understand that these activities may take place in remote
                areas far from communication, transportation, and medical
                facilities.
              </p>

              <p>
                I further understand that these activities include crossing
                creeks, uneven terrain, and exposure to adverse weather
                conditions.
              </p>

              <p>
                I agree to take full responsibility for myself and any vehicle,
                animal, or activity I engage in.
              </p>

              <p className="font-bold">
                Medical Release and Property Damages Release For Activities
              </p>

              <p>
                I agree to allow and be financially responsible for any
                emergency medical treatment provided by any physician or medical
                institution in the event of injury or illness.
              </p>
            </div>

            {/* FORM */}
            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Waiver submitted successfully!");
              }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="First Name *"
                  placeholder="Enter first name"
                />

                <Field
                  label="Last Name *"
                  placeholder="Enter last name"
                />
              </div>

              <Field
                label="Phone Number *"
                placeholder="(555) 123-4567"
              />

              {/* DATE */}
              <div>
                <label className="mb-3 block font-black">
                  Date *
                </label>

                <div
                  onClick={() => {
                    const input =
                      document.getElementById(
                        "hidden-date"
                      ) as HTMLInputElement;

                    input?.showPicker?.();
                    input?.focus();
                  }}
                  className="relative flex h-[58px] cursor-pointer items-center rounded-xl border border-white/10 bg-[#151515] px-5 pl-14 text-[15px] font-bold text-white transition-all duration-300 hover:bg-[#f2c06b] hover:text-black md:text-[16px]"
                >
                  <CalendarDays
                    size={20}
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2"
                  />

                  <span>{formatUSDate(date)}</span>

                  <input
                    id="hidden-date"
                    required
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>

              <Field
                label="Driver's License Number & State *"
                placeholder='If no license enter "passenger"'
                help='Enter your driver’s license number and state, or "passenger" if not driving'
              />

              <Field
                label="Vehicle Description & State *"
                placeholder='If no vehicle enter "passenger"'
                help='Enter your vehicle make/model and state, or "passenger" if not bringing a vehicle'
              />

              {/* MINORS */}
              <div>
                <label className="mb-4 block font-black">
                  Number of Minors (under 18)
                </label>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-6 py-5 md:px-8">
                  <button
                    type="button"
                    onClick={() =>
                      setMinors(
                        Math.max(0, minors - 1)
                      )
                    }
                    className="text-[32px] transition hover:text-[#f2c06b]"
                  >
                    −
                  </button>

                  <div className="text-center">
                    <div className="text-[34px] font-black">
                      {minors}
                    </div>

                    <div className="text-sm text-white/60">
                      {minors === 0
                        ? "No minors"
                        : "Minors"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMinors(
                        Math.min(10, minors + 1)
                      )
                    }
                    className="text-[32px] transition hover:text-[#f2c06b]"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 text-sm text-white/60">
                  Maximum 10 minors per waiver
                </p>
              </div>

              <CheckBox label="I agree to follow all laws and property rules" />

              <CheckBox label="I consent to media release" />

              <CheckBox label="I agree to follow pipeline rules" />

              <Field
                label="Electronic Signature *"
                placeholder="Type your full name to sign"
                help="By typing your name, you agree this is a legally binding electronic signature"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="flex h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-[#25d0bd] text-[16px] font-black text-black shadow-[0_0_30px_rgba(37,208,189,0.25)] transition-all duration-300 active:scale-95 hover:scale-[1.02] hover:bg-[#f2c06b] hover:shadow-[0_0_40px_rgba(242,192,107,0.45)] md:text-[18px]"
              >
                <PenLine size={22} />
                Sign Waiver
              </button>

              <button
                type="button"
                onClick={() => setMode("lookup")}
                className="mx-auto block rounded-xl px-6 py-3 text-center text-[15px] font-black text-white/80 transition-all duration-300 hover:bg-[#f2c06b] hover:text-black"
              >
                Back to lookup
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  help,
}: {
  label: string;
  placeholder: string;
  help?: string;
}) {
  return (
    <div>
      <label className="mb-3 block font-black">
        {label}
      </label>

      <input
        required
        placeholder={placeholder}
        className="h-[58px] w-full rounded-xl border border-white/10 bg-[#151515] px-5 text-[15px] font-semibold outline-none transition-all duration-300 focus:border-[#25b99a] md:text-[16px]"
      />

      {help && (
        <p className="mt-2 text-[13px] font-semibold leading-[1.6] text-white/60">
          {help}
        </p>
      )}
    </div>
  );
}

function CheckBox({
  label,
}: {
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[14px] font-bold transition-all duration-300 hover:border-[#25b99a]/45 hover:bg-[#25b99a]/10 md:text-[15px]">
      <input
        type="checkbox"
        required
        className="mt-1 h-5 w-5 shrink-0 accent-[#25b99a]"
      />

      <span>{label}</span>
    </label>
  );
}