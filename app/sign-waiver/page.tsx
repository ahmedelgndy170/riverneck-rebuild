"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CalendarDays,
  PenLine,
  Shield,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useNotify } from "@/context/NotificationContext";

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

  return `${month} ${day}${suffix}, ${date.getFullYear()}`;
}

export default function SignWaiverPage() {
  return (
    <Suspense fallback={null}>
      <SignWaiverContent />
    </Suspense>
  );
}

function SignWaiverContent() {
  const { toast } = useNotify();
  const searchParams = useSearchParams();

  const popup = searchParams.get("popup") === "true";
  const defaultMode = searchParams.get("mode") === "new" ? "new" : "lookup";

  const [mode, setMode] = useState<"lookup" | "new">(defaultMode);
  const [minors, setMinors] = useState(0);
  const [date, setDate] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [signature, setSignature] = useState("");

  const [agreedRules, setAgreedRules] = useState(false);
  const [agreedMedia, setAgreedMedia] = useState(false);
  const [agreedPipeline, setAgreedPipeline] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
const [lookupLoading, setLookupLoading] = useState(false);

  async function submitWaiver(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !date ||
      !driversLicense ||
      !vehicleDescription ||
      !signature
    ) {
      toast("Please complete all required fields.", "error");
      return;
    }

    if (!agreedRules || !agreedMedia || !agreedPipeline) {
      toast("Please check all required agreement boxes.", "error");
      return;
    }

    setSubmitting(true);
    setSuccessMessage("");

    const { error } = await supabase.from("Waiver").insert([
      {
        first_name: firstName,
        last_name: lastName,
        phone,
        waiver_date: date,
        drivers_license: driversLicense,
        vehicle_description: vehicleDescription,
        minors,
        signature,
        agreed_rules: agreedRules,
        agreed_media: agreedMedia,
        agreed_pipeline: agreedPipeline,
      },
    ]);

    setSubmitting(false);

    if (error) {
      toast(error.message, "error");
      return;
    }

    setSuccessMessage("Waiver submitted successfully.");
    setTimeout(() => {
  window.location.href = "/";
}, 1800);

    setFirstName("");
    setLastName("");
    setPhone("");
    setDriversLicense("");
    setVehicleDescription("");
    setSignature("");
    setDate("");
    setMinors(0);
    setAgreedRules(false);
    setAgreedMedia(false);
    setAgreedPipeline(false);
  }
async function lookupWaiver() {
  if (!lookupPhone) {
    toast("Enter phone number.", "error");
    return;
  }

  setLookupLoading(true);

  const { data, error } = await supabase
    .from("Waiver")
    .select("*")
    .eq("phone", lookupPhone)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  setLookupLoading(false);

  if (error || !data) {
    toast("No waiver found.", "error");
    return;
  }

  setFirstName(data.first_name || "");
  setLastName(data.last_name || "");
  setPhone(data.phone || "");
  setDriversLicense(data.drivers_license || "");
  setVehicleDescription(data.vehicle_description || "");
  setSignature(data.signature || "");
  setMinors(data.minors || 0);

  setAgreedRules(true);
  setAgreedMedia(true);
  setAgreedPipeline(true);

  const today = new Date().toISOString().split("T")[0];
  setDate(today);

  setMode("new");
}
  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#101010] px-4 text-white selection:bg-[#f2c06b] selection:text-black ${
        popup ? "py-4 md:px-5 md:py-5" : "py-8 md:px-[6%] md:py-20"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.30),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative z-10">
        {mode !== "new" && (
          <div className="mb-8 text-center md:mb-14">
            <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#25b99a]/30 bg-[#25b99a]/10 shadow-[0_0_35px_rgba(37,185,154,0.18)] md:mb-5 md:h-[80px] md:w-[80px]">
              <Shield size={32} className="text-[#25b99a] md:size-[38px]" />
            </div>

            <h1 className="text-[30px] font-black leading-[0.95] tracking-tight md:text-[58px]">
              Sign Liability Waiver
            </h1>

            <p className="mx-auto mt-3 max-w-[760px] text-[14px] font-semibold leading-[1.65] text-white/75 md:mt-4 md:text-[22px]">
              Required before riding at River Neck Acres
            </p>
          </div>
        )}

        {mode === "lookup" ? (
          <section className="mx-auto max-w-[1100px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:rounded-[28px] md:p-10">
            <h2 className="flex items-center gap-3 text-[24px] font-black leading-tight md:mb-3 md:text-[38px]">
              <Search size={28} className="md:size-[34px]" />
              Already Signed Before?
            </h2>

            <p className="mb-6 mt-3 text-[14px] font-semibold leading-[1.65] text-white/75 md:mb-8 md:text-[20px]">
              Enter your phone number to quickly renew your waiver
            </p>

            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
             <input
  value={lookupPhone}
  onChange={(e) => setLookupPhone(e.target.value)}
  placeholder="Enter phone number"
                className="h-[54px] w-full rounded-xl border border-white/10 bg-[#151515] px-5 text-[15px] font-semibold outline-none transition focus:border-[#25b99a] md:h-[58px] md:text-[18px]"
              />

             <button
  onClick={lookupWaiver}
  disabled={lookupLoading}
  className="h-[54px] touch-manipulation rounded-xl bg-[#25d0bd] px-8 text-[15px] font-black text-black shadow-[0_0_25px_rgba(37,208,189,0.25)] transition active:scale-95 hover:bg-[#f2c06b] md:h-[58px]"
>
  {lookupLoading ? "Searching..." : "Look Up"}
</button>
            </div>

            <p className="mt-6 text-[14px] font-semibold text-white/75 md:mt-7 md:text-[18px]">
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
          <section
            className={`mx-auto max-w-[1120px] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05] shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl ${
              popup ? "p-4 md:p-6" : "p-5 md:p-8"
            }`}
          >
            <h2 className="text-[22px] font-black leading-tight md:text-[30px]">
              Liability Waiver Required
            </h2>

            <p className="mt-2 max-w-[1000px] text-[13px] font-semibold leading-[1.55] text-white/80 md:text-[16px]">
              Please read the waiver carefully, fill in your information, and
              sign to continue with your day pass purchase. This waiver is valid
              for 7 days.
            </p>

            {successMessage && (
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#25b99a]/30 bg-[#25b99a]/10 p-4 text-[14px] font-black text-[#8fffe5]">
                <CheckCircle size={20} />
                {successMessage}
              </div>
            )}

            <label className="mb-3 mt-6 block text-[14px] font-black md:text-[16px]">
              Liability Waiver <span className="text-[#ff6b8a]">*</span>
            </label>

            <div className="max-h-[430px] overflow-y-auto rounded-[14px] border border-white/15 bg-black/15 p-5 pr-6 text-[13px] font-bold leading-[1.65] text-white/90 md:max-h-[500px] md:p-7 md:pr-8 md:text-[15px]">
              <div className="text-center text-[18px] font-black uppercase leading-[1.7] md:text-[24px]">
                <p>STATE OF SOUTH CAROLINA</p>
                <p>COUNTY OF FLORENCE</p>
                <p>WAIVER OF LIABILITY AND LEGAL RELEASE OF</p>
                <p>G&amp;H Farms LLC, &amp;</p>
                <p>RIVER NECK ACRES, INC.</p>
              </div>

              <p className="mt-7 border-t border-white/10 pt-5 uppercase">
                THIS IS AN AGREEMENT TO G&amp;H Farms LLC, RIVER NECK ACRES,
                INC. AND ALL ACTIVITIES INCLUDING BUT NOT LIMITED TO: ATV RIDING
                — INCLUDING 4-WHEELERS, ATV&apos;S, UTV&apos;S SIDE-BY-SIDE,
                DIRT BIKES, GOLF CARTS, FISHING, HUNTING, CANOEING, KAYAKING,
                ALL EQUINE ACTIVITY, AND CAMPING ON PROPERTY OWNED BY THE SAID
                G&amp;H Farms LLC &amp; RIVER NECK ACRES, INC.
              </p>

              <p className="mt-5 border-t border-white/10 pt-5 uppercase">
                THIS ACTIVITY CONSTITUTES AN EXPRESS CONTRACTUAL ASSUMPTION OF
                ALL RISKS, AND BOTH A WAIVER AND RELEASE FROM ALL LIABILITY FROM
                ANY NEGLIGENCE OR DANGEROUS CONDITION OF PRIVATE PROPERTY AND
                INDEMNITY FOR ALL THIRD PARTY CLAIMS.
              </p>

              <p className="mt-5 border-t border-white/10 pt-5 normal-case">
                I acknowledge and accept that ATV riding — including
                4-wheelers, ATV&apos;s, UTV&apos;s side-by-side, dirt bikes, golf
                carts, fishing, hunting, canoeing, kayaking, all equine
                activity, and camping — involves the risk of personal injury. By
                my signature, I hereby waive all rights, if any, causes of action
                and lawsuits against G&amp;H Farms, LLC, River Neck Acres, INC.,
                its successors and assigns, or agents affiliated with any of them
                in any manner for any injury, liability, or damages which may
                occur while participating in the above mentioned activities.
              </p>

              <p className="mt-5 border-t border-white/10 pt-5 normal-case">
                I understand that the above activities involve being in remote
                areas for extended periods of time, far from communications,
                transportation, and medical facilities; that these areas have
                many natural and man-made hazards which may not be anticipated,
                identified, modified, or eliminated; and that accidents can happen
                to anyone at any time.
              </p>

              <p className="mt-5 border-t border-white/10 pt-5 normal-case">
                I further understand that these activities involve such things as
                crossing creeks, going over uneven terrain, and being in strange
                places under adverse weather conditions which could result in
                injury to myself and the horse/ATV/UTV I am riding.
              </p>

              <p className="mt-5 border-t border-white/10 pt-5 normal-case">
                I agree to take full responsibility for myself and any vehicle,
                animal, or activity I engage in. My signature below constitutes
                acceptance of the above terms and conditions. I have read and
                fully understand this liability release.
              </p>

              <p className="mt-6 border-t border-white/10 pt-5 font-black">
                Medical Release and Property Damages Release For Activities
              </p>

              <p className="mt-3 normal-case">
                I further agree to allow and be financially responsible for any
                necessary emergency medical treatment by any available physician
                or medical institution in the event of injury or illness. I agree
                and acknowledge that I am financially responsible for any physical
                damage to any horse/ATV/UTV that I ride.
              </p>
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={submitWaiver}
              noValidate
            >
              <h3 className="text-[15px] font-black">Personal Information</h3>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="First Name *"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={setFirstName}
                />

                <Field
                  label="Last Name *"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={setLastName}
                />
              </div>

              <Field
                label="Phone Number *"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={setPhone}
              />

              <div>
                <label className="mb-2 block text-[13px] font-black">
                  Date *
                </label>

                <div
                  onClick={() => {
                    const input = document.getElementById(
                      "hidden-date"
                    ) as HTMLInputElement;

                    input?.showPicker?.();
                    input?.focus();
                  }}
                  className="relative flex h-[48px] cursor-pointer items-center rounded-xl border border-white/10 bg-[#151515] px-4 pl-12 text-[13px] font-bold text-white transition hover:border-[#f2c06b] md:h-[52px] md:text-[15px]"
                >
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
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
                placeholder='If no license enter "passenger"'
                help='Enter your driver’s license number and state, or "passenger" if not driving'
                value={driversLicense}
                onChange={setDriversLicense}
              />

              <Field
                label="Vehicle Description & State *"
                placeholder='If no vehicle enter "passenger"'
                help='Enter your vehicle make/model and state, or "passenger" if not bringing a vehicle'
                value={vehicleDescription}
                onChange={setVehicleDescription}
              />

              <div>
                <label className="mb-3 block text-[13px] font-black">
                  Number of Minors (under 18)
                </label>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <button
                    type="button"
                    onClick={() => setMinors(Math.max(0, minors - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[22px] transition hover:bg-white/10 active:scale-90"
                  >
                    −
                  </button>

                  <div className="text-center">
                    <div className="text-[26px] font-black">{minors}</div>
                    <div className="text-[11px] text-white/60">
                      {minors === 0 ? "No minors" : "Minors"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMinors(Math.min(10, minors + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[22px] transition hover:bg-white/10 active:scale-90"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 text-[12px] font-semibold text-white/60">
                  Maximum 10 minors per waiver
                </p>
              </div>

              <CheckBox
                checked={agreedRules}
                onChange={setAgreedRules}
                label="By checking this box, I agree to abide by all South Carolina Laws and the rules of Riverneck Acres, INC."
              />

              <CheckBox
                checked={agreedMedia}
                onChange={setAgreedMedia}
                label="By checking this box, I understand I may appear on videos and promotional materials and I release all rights and claims."
              />

              <CheckBox
                checked={agreedPipeline}
                onChange={setAgreedPipeline}
                label="By checking this box, I am aware I cannot access the natural gas pipeline and I can ONLY cross at approved crossings."
              />

              <Field
                label="Electronic Signature *"
                placeholder="Type your full legal name"
                help="By typing your name, you agree that this constitutes a legal signature"
                value={signature}
                onChange={setSignature}
              />

              <div className="sticky bottom-0 -mx-4 mt-6 flex justify-end gap-3 border-t border-white/10 bg-[#151515]/95 px-4 py-3 backdrop-blur-md md:-mx-6 md:px-6">
                <button
                  type="button"
                  onClick={() => setMode("lookup")}
                  className="h-[44px] rounded-xl border border-white/10 px-6 text-[13px] font-black text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25b99a] px-6 text-[13px] font-black text-white transition hover:bg-[#2fd9b5] active:scale-95 disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <PenLine size={17} />
                  )}

                  {submitting ? "Submitting..." : "Sign Waiver"}
                </button>
              </div>
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
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-black">{label}</label>

      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[48px] w-full rounded-xl border border-white/10 bg-[#151515] px-4 text-[13px] font-semibold text-white outline-none transition focus:border-[#f2c06b] md:h-[52px] md:text-[15px]"
      />

      {help && (
        <p className="mt-2 text-[12px] font-semibold leading-[1.5] text-white/65">
          {help}
        </p>
      )}
    </div>
  );
}

function CheckBox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border-t border-white/10 pt-3 text-[12px] font-bold leading-[1.5] text-white/90 md:text-[13px]">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#25b99a]"
      />
      <span>{label}</span>
    </label>
  );
}