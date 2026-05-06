"use client";

import { useState } from "react";
import { Search, CalendarDays, PenLine } from "lucide-react";

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

  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}${suffix}, ${year}`;
}

export default function SignWaiverPage() {
  const [mode, setMode] = useState<"lookup" | "new">("lookup");
  const [minors, setMinors] = useState(0);
  const [date, setDate] = useState("");

  return (
    <main className="min-h-screen bg-[#101010] px-[8%] py-20 text-white">
      <div className="mb-12 text-center">
        <h1 className="text-[52px] font-black leading-none">
          Sign Liability Waiver
        </h1>

        <p className="mt-4 text-[22px] text-white/75">
          Required before riding at River Neck Acres
        </p>
      </div>

      {mode === "lookup" ? (
        <section className="mx-auto max-w-[1180px] rounded-2xl border border-white/10 bg-white/[0.04] p-10 shadow-2xl">
          <h2 className="mb-2 flex items-center gap-3 text-[34px] font-black">
            <Search size={34} />
            Already Signed Before?
          </h2>

          <p className="mb-8 text-[20px] text-white/80">
            Enter your phone number to quickly renew your waiver
          </p>

          <div className="flex gap-4">
            <input
              placeholder="Enter phone number"
              className="h-[58px] flex-1 rounded-xl border border-white/10 bg-[#151515] px-5 text-[18px] outline-none transition focus:border-[#25b99a]"
            />

            <button className="rounded-xl bg-[#25d0bd] px-8 font-black text-black transition hover:scale-105 hover:bg-[#f2c06b]">
              Look Up
            </button>
          </div>

          <p className="mt-6 text-[18px]">
            First time?{" "}
            <button
              onClick={() => setMode("new")}
              className="font-bold text-[#25b99a] underline transition hover:text-[#f2c06b]"
            >
              Fill out new waiver
            </button>
          </p>
        </section>
      ) : (
        <section className="mx-auto max-w-[1050px] rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
          <h2 className="text-[32px] font-black">Waiver Agreement</h2>

          <p className="mt-1 text-[18px] text-white/75">
            Please read carefully and fill out all fields
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 p-8 text-[16px] leading-7 text-white/90 space-y-6">

  <div className="text-center font-black uppercase space-y-1">
    <p>STATE OF SOUTH CAROLINA</p>
    <p>COUNTY OF FLORENCE</p>
    <p>WAIVER OF LIABILITY AND LEGAL RELEASE OF</p>
    <p>G&amp;H Farms LLC, &</p>
    <p>RIVER NECK ACRES, INC.</p>
  </div>

  <p className="font-bold uppercase">
    THIS IS AN AGREEMENT TO G&amp;H Farms LLC, RIVER NECK ACRES, INC. AND ALL ACTIVITIES INCLUDING BUT NOT LIMITED TO: ATV RIDING – INCLUDING 4-WHEELERS, ATV'S, UTV'S SIDE-BY-SIDE, DIRT BIKES, GOLF CARTS, FISHING, HUNTING, CANOEING, KAYAKING, ALL EQUINE ACTIVITY, AND CAMPING ON PROPERTY OWNED BY THE SAID G&amp;H Farms LLC &amp; RIVER NECK ACRES, INC.
  </p>

  <p className="font-bold uppercase">
    THIS ACTIVITY CONSTITUTES AND EXPRESS CONTRACTUAL ASSUMPTION OF ALL RISKS, AND BOTH A WAIVER AND RELEASE FROM ALL LIABILITY FROM ANY NEGLIGENCE OR DANGEROUS CONDITION OF PRIVATE PROPERTY AND INDEMNITY FOR ALL THIRD PARTY CLAIMS.
  </p>

  <p>
    I acknowledge and accept that ATV riding — including 4-wheelers, ATV's, UTV's side-by-side, dirt bikes, golf carts, fishing, hunting, canoeing, kayaking, all equine activity, and camping — involves the risk of personal injury. By my signature (and in the case of a minor, the parent(s) or legal guardian(s) signature), I hereby waive all rights, causes of action, and lawsuits against G&amp;H Farms, LLC, its successors, assigns, or agents affiliated with any of them in any manner.
  </p>

  <p>
    I agree to indemnify, defend, and hold harmless G&amp;H Farms, LLC, River Neck Acres, INC., or any person or entity for any accident, injury, or loss. I understand that the above activities involve danger, and I participate in these activities at my own risk.
  </p>

  <p>
    I understand that these activities may take place in remote areas far from communication, transportation, and medical facilities. These environments contain natural and man-made hazards which may be unpredictable and uncontrollable. Accidents can happen at any time.
  </p>

  <p>
    I further understand that these activities include crossing creeks, uneven terrain, and exposure to adverse weather conditions, which may result in injury to myself or any vehicle or animal involved.
  </p>

  <p>
    I agree to take full responsibility for myself and any vehicle, animal, or activity I engage in. My signature below constitutes acceptance of all terms and conditions. I confirm that I have read and fully understand this liability release.
  </p>

  <p className="font-bold">
    Medical Release and Property Damages Release For Activities
  </p>

  <p>
    I agree to allow and be financially responsible for any emergency medical treatment provided by any physician or medical institution in the event of injury or illness. I also accept responsibility for any physical damage to any horse, ATV, or UTV I operate.
  </p>

</div>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Waiver submitted successfully!");
            }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="First Name *" placeholder="Enter first name" />
              <Field label="Last Name *" placeholder="Enter last name" />
            </div>

            <Field label="Phone Number *" placeholder="(555) 123-4567" />

            <div>
              <label className="mb-2 block font-black">Date *</label>

              <div
                onClick={() => {
                  const input = document.getElementById(
                    "hidden-date"
                  ) as HTMLInputElement;
                  input?.showPicker?.();
                  input?.focus();
                }}
                className="relative flex h-[56px] cursor-pointer items-center rounded-xl border border-white/10 bg-[#151515] px-5 pl-14 text-[16px] font-bold text-white transition hover:bg-[#f2c06b] hover:text-black"
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
                  onChange={(e) => setDate(e.target.value)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>

            <Field
              label="Driver's License Number & State *"
              placeholder={'If no license enter "passenger"'}
              help={'Enter your driver’s license number and state, or "passenger" if not driving'}
            />

            <Field
              label="Vehicle Description & State *"
              placeholder={'If no vehicle enter "passenger"'}
              help={'Enter your vehicle make/model and state, or "passenger" if not bringing a vehicle'}
            />

            <div>
              <label className="mb-4 block font-black">
                Number of Minors (under 18)
              </label>

              <div className="flex items-center justify-between rounded-xl bg-black/10 px-8 py-5">
                <button
                  type="button"
                  onClick={() => setMinors(Math.max(0, minors - 1))}
                  className="text-[28px] transition hover:text-[#f2c06b]"
                >
                  −
                </button>

                <div className="text-center">
                  <div className="text-[34px] font-black">{minors}</div>
                  <div className="text-sm text-white/60">
                    {minors === 0 ? "No minors" : "Minors"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMinors(Math.min(10, minors + 1))}
                  className="text-[28px] transition hover:text-[#f2c06b]"
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

            <button
              type="submit"
              className="flex h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-[#25d0bd] text-[18px] font-black text-black transition hover:scale-[1.02] hover:bg-[#f2c06b]"
            >
              <PenLine size={22} />
              Sign Waiver
            </button>

            <button
              type="button"
              onClick={() => setMode("lookup")}
              className="mx-auto block rounded-xl px-6 py-3 text-center font-black text-white/80 transition hover:bg-[#f2c06b] hover:text-black"
            >
              Back to lookup
            </button>
          </form>
        </section>
      )}
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
      <label className="mb-2 block font-black">{label}</label>

      <input
        required
        placeholder={placeholder}
        className="h-[56px] w-full rounded-xl border border-white/10 bg-[#151515] px-5 text-[16px] outline-none transition focus:border-[#25b99a]"
      />

      {help && <p className="mt-2 text-sm text-white/65">{help}</p>}
    </div>
  );
}

function CheckBox({ label }: { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 font-bold">
      <input type="checkbox" required className="h-5 w-5 accent-[#25b99a]" />
      {label}
    </label>
  );
}