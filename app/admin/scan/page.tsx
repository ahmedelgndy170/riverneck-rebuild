"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  CheckCircle2,
  Loader2,
  Printer,
  QrCode,
  Search,
  XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Tab = "scan" | "manual" | "print";

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  subtotal: number;
  total: number;
  payment_status: string;
  confirmation_code?: string;
  qr_code?: string;
  created_at: string;
};

type Waiver = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  waiver_date: string;
  drivers_license: string;
  vehicle_description: string;
  minors: string;
  signature: string;
  created_at: string;
};

type LookupResult =
  | { type: "order"; data: Order }
  | { type: "waiver"; data: Waiver }
  | null;

export default function StaffScannerPage() {
  const scannerRef = useRef<any>(null);

  const [activeTab, setActiveTab] = useState<Tab>("scan");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanRunning, setScanRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<LookupResult>(null);
  const [waiverQr, setWaiverQr] = useState("");

  const waiverUrl = useMemo(() => {
    if (typeof window === "undefined") return "/sign-waiver";
    return `${window.location.origin}/sign-waiver`;
  }, []);

  const logoUrl = useMemo(() => {
    if (typeof window === "undefined") return "/logo.png";
    return `${window.location.origin}/logo.png`;
  }, []);

  useEffect(() => {
    QRCode.toDataURL(waiverUrl, {
      width: 520,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }).then(setWaiverQr);
  }, [waiverUrl]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const getConfirmationCode = (order: Order) => {
    return order.confirmation_code || order.id.slice(0, 8).toUpperCase();
  };

  const cleanSearch = (value: string) => {
    return value.trim().replaceAll(",", "").replaceAll("'", "");
  };

  const extractLookupValue = (value: string) => {
    const cleaned = cleanSearch(value);

    try {
      const parsed = JSON.parse(cleaned);

      if (parsed?.confirmationCode) {
        return String(parsed.confirmationCode);
      }

      if (parsed?.confirmation_code) {
        return String(parsed.confirmation_code);
      }

      if (parsed?.orderId) {
        return String(parsed.orderId);
      }

      if (parsed?.id) {
        return String(parsed.id);
      }
    } catch {
      // Not JSON, use text directly.
    }

    return cleaned;
  };

  const runLookup = async (value = query) => {
    const raw = cleanSearch(value);
    const q = extractLookupValue(value);

    setMessage("");
    setResult(null);

    if (!q) {
      setMessage("Please enter a confirmation code, phone number, or name.");
      return;
    }

    setLoading(true);

    const { data: orderData } = await supabase
      .from("Order")
      .select("*")
      .or(
        [
          `id.ilike.%${q}%`,
          `confirmation_code.ilike.%${q}%`,
          `qr_code.ilike.%${q}%`,
          `customer_email.ilike.%${q}%`,
          `customer_phone.ilike.%${q}%`,
          `customer_name.ilike.%${q}%`,
          `id.ilike.%${raw}%`,
          `confirmation_code.ilike.%${raw}%`,
          `qr_code.ilike.%${raw}%`,
          `customer_email.ilike.%${raw}%`,
          `customer_phone.ilike.%${raw}%`,
          `customer_name.ilike.%${raw}%`,
        ].join(",")
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (orderData) {
      setResult({ type: "order", data: orderData as Order });
      setLoading(false);
      return;
    }

    const nameParts = q.split(" ").filter(Boolean);
    const first = nameParts[0] ?? q;
    const last = nameParts[nameParts.length - 1] ?? q;

    const { data: waiverData } = await supabase
      .from("Waiver")
      .select("*")
      .or(
        `id.ilike.%${q}%,phone.ilike.%${q}%,first_name.ilike.%${first}%,last_name.ilike.%${last}%`
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (waiverData) {
      setResult({ type: "waiver", data: waiverData as Waiver });
      setLoading(false);
      return;
    }

    setMessage("No ticket, pass, booking, or waiver found.");
    setLoading(false);
  };

  const startScanner = async () => {
    setMessage("");
    setResult(null);
    setActiveTab("scan");

    try {
      const target = document.getElementById("qr-reader");

      if (!target) {
        setMessage("Scanner area is not ready yet. Try again.");
        return;
      }

      const { Html5Qrcode } = await import("html5-qrcode");

      if (scannerRef.current) {
        await stopScanner();
      }

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 260, height: 260 },
        },
        async (decodedText: string) => {
          await stopScanner();
          setActiveTab("manual");
          setQuery(decodedText);
          runLookup(decodedText);
        },
        () => {}
      );

      setScanRunning(true);
    } catch (error) {
      console.error(error);
      setMessage(
        "Camera could not start. Allow camera permission and use HTTPS or localhost."
      );
      setScanRunning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (error) {
      console.error(error);
    }

    setScanRunning(false);
  };

  const markOrderUsed = async () => {
    if (!result || result.type !== "order") return;

    const { error } = await supabase
      .from("Order")
      .update({ payment_status: "used" })
      .eq("id", result.data.id);

    if (error) {
      setMessage("Could not mark this ticket as used.");
      return;
    }

    setResult({
      type: "order",
      data: {
        ...result.data,
        payment_status: "used",
      },
    });
  };

  const printQr = () => {
    if (!waiverQr) return;

    const printWindow = window.open("", "", "width=950,height=1000");

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>River Neck Waiver QR</title>
          <style>
            @page {
              size: letter portrait;
              margin: 0;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #111111;
              font-family: Arial, Helvetica, sans-serif;
            }

            .page {
              width: 8.5in;
              min-height: 11in;
              margin: 0 auto;
              padding: 0.72in 0.55in 0.45in;
              background: white;
              text-align: center;
            }

            .logo {
              width: 78px;
              height: 78px;
              object-fit: contain;
              display: block;
              margin: 0 auto 20px;
            }

            .title {
              font-size: 34px;
              line-height: 1;
              font-weight: 900;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              margin: 0 0 22px;
            }

            .top-row {
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              align-items: center;
              gap: 24px;
              width: 100%;
              margin: 0 auto 13px;
              font-size: 12px;
              color: #555;
            }

            .brand {
              display: flex;
              align-items: center;
              gap: 7px;
              justify-content: flex-start;
              font-weight: 700;
              text-transform: uppercase;
            }

            .home-icon {
              width: 15px;
              height: 15px;
              display: inline-block;
              border: 1.5px solid #555;
              border-radius: 3px;
              position: relative;
            }

            .home-icon:before {
              content: "";
              position: absolute;
              width: 8px;
              height: 8px;
              border-left: 1.5px solid #555;
              border-top: 1.5px solid #555;
              transform: rotate(45deg);
              top: -5px;
              left: 2px;
              background: white;
            }

            .diagnostics {
              min-width: 125px;
              border: 1.5px solid #555;
              border-radius: 12px;
              padding: 12px 22px;
              font-size: 13px;
              color: #777;
            }

            .email {
              text-align: right;
              font-size: 13px;
              color: #777;
            }

            .divider {
              width: 100%;
              border: 0;
              border-top: 1.5px solid #222;
              margin: 0 0 34px;
            }

            .qr {
              width: 315px;
              height: 315px;
              object-fit: contain;
              display: block;
              margin: 0 auto 48px;
            }

            .main-text {
              font-size: 17px;
              font-weight: 700;
              margin: 0 0 10px;
            }

            .sub-text {
              font-size: 13px;
              color: #555;
              margin: 0 0 25px;
            }

            .small-divider {
              width: 245px;
              border: 0;
              border-top: 1px solid #999;
              margin: 0 auto 20px;
            }

            .url {
              font-size: 12px;
              color: #555;
              margin: 0;
            }

            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              .page {
                margin: 0;
              }
            }
          </style>
        </head>

        <body>
          <main class="page">
            <img src="${logoUrl}" class="logo" />

            <h1 class="title">RIVER NECK ACRES</h1>

            <div class="top-row">
              <div class="brand">
                <span class="home-icon"></span>
                <span>RIVER NECK ACRES</span>
              </div>

              <div class="diagnostics">Diagnostics</div>

              <div class="email">hicksjamey27@yahoo.com</div>
            </div>

            <hr class="divider" />

            <img src="${waiverQr}" class="qr" />

            <p class="main-text">All riders must sign before riding</p>
            <p class="sub-text">Point your phone camera at the QR code</p>

            <hr class="small-divider" />

            <p class="url">${waiverUrl}</p>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.type === "order") {
      const order = result.data;
      const status = order.payment_status || "pending";
      const used = status === "used";
      const valid =
        status === "paid" || status === "completed" || status === "active";

      return (
        <div className="rounded-[22px] border border-white/10 bg-[#25252a]/90 p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-2">
                {used ? (
                  <XCircle className="text-red-300" size={24} />
                ) : (
                  <CheckCircle2 className="text-[#57e0d2]" size={24} />
                )}

                <h3 className="text-[28px] font-black">
                  {used
                    ? "Already Used"
                    : valid
                    ? "Valid Purchase"
                    : "Purchase Found"}
                </h3>
              </div>

              <p className="mt-2 text-sm font-bold text-white/50">
                {getConfirmationCode(order)}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-black uppercase ${
                used
                  ? "bg-red-500/20 text-red-300"
                  : valid
                  ? "bg-[#57e0d2] text-black"
                  : "bg-[#f2c06b]/20 text-[#f2c06b]"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-black/25 p-5">
              <p className="text-xs font-black uppercase text-white/40">
                Customer
              </p>

              <p className="mt-2 text-lg font-black">
                {order.customer_name || "Customer"}
              </p>

              <p className="text-sm font-bold text-white/55">
                {order.customer_email || "No email"}
              </p>

              <p className="text-sm font-bold text-white/55">
                {order.customer_phone || "No phone"}
              </p>
            </div>

            <div className="rounded-2xl bg-black/25 p-5">
              <p className="text-xs font-black uppercase text-white/40">
                Purchase
              </p>

              <p className="mt-2 text-2xl font-black text-[#57e0d2]">
                ${Number(order.total || 0).toFixed(2)}
              </p>

              <p className="text-sm font-bold text-white/55">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {order.qr_code && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-black uppercase text-white/40">
                QR Data
              </p>

              <p className="mt-2 break-all text-xs font-bold text-white/50">
                {order.qr_code}
              </p>
            </div>
          )}

          {!used && (
            <button
              type="button"
              onClick={markOrderUsed}
              className="mt-6 h-14 w-full cursor-pointer rounded-2xl bg-[#57e0d2] text-sm font-black text-black transition hover:bg-[#74fff1]"
            >
              Mark Ticket As Used
            </button>
          )}
        </div>
      );
    }

    const waiver = result.data;
    const signedDate = new Date(waiver.created_at);
    const expires = new Date(signedDate);
    expires.setDate(expires.getDate() + 7);
    const expired = expires < new Date();

    return (
      <div className="rounded-[22px] border border-white/10 bg-[#25252a]/90 p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-2">
              {expired ? (
                <XCircle className="text-red-300" size={24} />
              ) : (
                <CheckCircle2 className="text-[#57e0d2]" size={24} />
              )}

              <h3 className="text-[28px] font-black">
                {expired ? "Expired Waiver" : "Valid Waiver"}
              </h3>
            </div>

            <p className="mt-2 text-sm font-bold text-white/50">
              Waiver ID: {waiver.id}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-black uppercase ${
              expired ? "bg-red-500/20 text-red-300" : "bg-[#57e0d2] text-black"
            }`}
          >
            {expired ? "expired" : "valid"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-black/25 p-5">
            <p className="text-xs font-black uppercase text-white/40">Rider</p>

            <p className="mt-2 text-lg font-black">
              {waiver.first_name} {waiver.last_name}
            </p>

            <p className="text-sm font-bold text-white/55">{waiver.phone}</p>

            <p className="text-sm font-bold text-white/55">
              DL: {waiver.drivers_license || "N/A"}
            </p>
          </div>

          <div className="rounded-2xl bg-black/25 p-5">
            <p className="text-xs font-black uppercase text-white/40">Waiver</p>

            <p className="mt-2 text-sm font-bold text-white/70">
              Signed: {signedDate.toLocaleString()}
            </p>

            <p className="text-sm font-bold text-white/70">
              Expires: {expires.toLocaleString()}
            </p>

            <p className="text-sm font-bold text-white/70">
              Minors: {waiver.minors || "0"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-6 px-2 pb-10 text-white">
      <Link
        href="/admin"
        className="inline-flex cursor-pointer items-center gap-2 text-[18px] font-black text-white/90 transition hover:text-[#57e0d2]"
      >
        <ArrowLeft size={22} />
        Back to Dashboard
      </Link>

      <div className="h-[66px] rounded-[18px] bg-white px-6 shadow-[0_12px_35px_rgba(0,0,0,0.25)]">
        <input
          type="text"
          placeholder="Staff Scanner: Scan tickets, passes, bookings, or waivers"
          className="h-full w-full bg-transparent text-[17px] font-bold text-black outline-none placeholder:text-black/25"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setActiveTab("manual");
              runLookup();
            }
          }}
        />
      </div>

      <div className="grid h-[54px] grid-cols-3 overflow-hidden rounded-[16px] bg-[#343439]">
        <button
          type="button"
          onClick={() => setActiveTab("scan")}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-[14px] text-[17px] font-black ${
            activeTab === "scan"
              ? "border border-white/12 bg-[#111113] text-white"
              : "text-white/65"
          }`}
        >
          <Camera size={20} />
          <span className="hidden sm:inline">Scan QR</span>
          <span className="sm:hidden">Scan</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("manual")}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-[14px] text-[17px] font-black ${
            activeTab === "manual"
              ? "border border-white/12 bg-[#111113] text-white"
              : "text-white/65"
          }`}
        >
          <Search size={20} />
          <span className="hidden sm:inline">Manual Lookup</span>
          <span className="sm:hidden">Lookup</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("print")}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-[14px] text-[17px] font-black ${
            activeTab === "print"
              ? "border border-white/12 bg-[#111113] text-white"
              : "text-white/65"
          }`}
        >
          <Printer size={20} />
          <span className="hidden sm:inline">Print QR</span>
          <span className="sm:hidden">Print</span>
        </button>
      </div>

      {message && activeTab !== "manual" && (
        <div className="flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-black text-red-300">
          <AlertTriangle size={18} />
          {message}
        </div>
      )}

      {activeTab === "scan" && (
        <>
          <div className="pt-2 text-center">
            <h1 className="text-[42px] font-black leading-none tracking-[-1px] md:text-[52px]">
              Staff Scanner
            </h1>

            <p className="mt-4 text-[18px] font-black text-white/70 md:text-[23px]">
              Scan QR codes for tickets, passes, bookings, or waivers
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[#25252a]/85 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] md:p-8">
            <div className="flex items-start gap-4">
              <QrCode size={34} className="mt-1 shrink-0 text-white" />

              <div>
                <h2 className="text-[31px] font-black leading-none md:text-[40px]">
                  QR Code Scanner
                </h2>

                <p className="mt-3 text-[17px] font-black text-white/70 md:text-[21px]">
                  Position the QR code within the camera frame
                </p>
              </div>
            </div>

            <div className="my-7 border-t border-dashed border-white/15" />

            <div
              id="qr-reader"
              className="mb-5 min-h-[320px] overflow-hidden rounded-[20px] border border-white/10 bg-black"
            />

            <button
              type="button"
              onClick={scanRunning ? stopScanner : startScanner}
              className={`flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] text-[16px] font-black transition md:h-[66px] md:text-[19px] ${
                scanRunning
                  ? "bg-red-300 text-black hover:bg-red-200"
                  : "bg-[#57e0d2] text-black hover:bg-[#70fff0]"
              }`}
            >
              <Camera size={22} />
              {scanRunning ? "Stop Scanner" : "Start Scanner"}
            </button>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[#25252a]/85 p-6 md:p-8">
            <h3 className="text-[22px] font-black md:text-[27px]">
              Supported QR Codes
            </h3>

            <ul className="mt-5 list-disc space-y-2 pl-6 text-[15px] font-bold leading-7 text-white/78 md:text-[18px]">
              <li>Day Passes — Mark as used, check waiver status</li>
              <li>Event Tickets — Mark as used, verify event details</li>
              <li>Memberships — Verify active status and expiration</li>
              <li>Bookings — Check reservation and payment details</li>
              <li>Waivers — Verify signature and expiration</li>
            </ul>
          </div>
        </>
      )}

      {activeTab === "manual" && (
        <>
          <div className="pt-2 text-center">
            <h1 className="text-[42px] font-black leading-none tracking-[-1px] md:text-[52px]">
              Manual Lookup
            </h1>

            <p className="mt-4 text-[18px] font-black text-white/70 md:text-[23px]">
              Search by confirmation code, phone number, or customer name
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[#25252a]/85 p-6 md:p-8">
            <h2 className="flex items-center gap-3 text-[31px] font-black leading-none md:text-[40px]">
              <Search size={34} />
              Search Passes & Waivers
            </h2>

            <p className="mt-3 text-[17px] font-bold text-white/70 md:text-[20px]">
              Enter a confirmation code, phone number, or customer name
            </p>

            <label className="mt-7 block text-[16px] font-black text-white">
              Confirmation Code, Phone, or Name
            </label>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="RNA-ABC123, (555) 123-4567, or John Smith"
              className="mt-3 h-[58px] w-full rounded-xl border border-white/10 bg-black/35 px-5 text-[17px] font-bold text-white outline-none placeholder:text-white/45"
            />

            {message && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-black text-red-300">
                <AlertTriangle size={18} />
                {message}
              </div>
            )}

            <button
              type="button"
              onClick={() => runLookup()}
              className="mt-5 flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] bg-[#57e0d2] text-[16px] font-black text-black transition hover:bg-[#70fff0] md:h-[66px] md:text-[19px]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <Search size={22} />
              )}
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {renderResult()}

          <div className="rounded-[22px] border border-white/10 bg-[#25252a]/85 p-6 md:p-8">
            <h3 className="text-[22px] font-black md:text-[27px]">
              What You Can Search
            </h3>

            <ul className="mt-5 list-disc space-y-2 pl-6 text-[15px] font-bold leading-7 text-white/78 md:text-[18px]">
              <li>Confirmation codes — RNA-xxxx, order ID, ticket ID</li>
              <li>QR code data — JSON ticket QR from checkout</li>
              <li>Phone numbers — Find waivers or purchases by phone</li>
              <li>Customer names — Search waiver first or last name</li>
              <li>Email addresses — Find purchases by customer email</li>
            </ul>
          </div>
        </>
      )}

      {activeTab === "print" && (
        <>
          <div className="pt-2 text-center">
            <h1 className="text-[42px] font-black leading-none tracking-[-1px] md:text-[52px]">
              Waiver QR Code
            </h1>

            <p className="mt-4 text-[18px] font-black text-white/70 md:text-[23px]">
              Print this QR code for guests to scan and sign their waiver
            </p>
          </div>

          <div className="mx-auto max-w-[720px] rounded-[26px] border border-white/10 bg-[#25252a]/85 p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
            <img
              src="/logo.png"
              alt="River Neck Acres"
              className="mx-auto h-24 w-24 object-contain"
            />

            <h2 className="mt-5 text-[42px] font-black uppercase text-white">
              RIVER NECK ACRES
            </h2>

            <p className="mt-2 text-xl font-bold text-white/70">
              Scan to Sign Your Waiver
            </p>

            {waiverQr && (
              <img
                src={waiverQr}
                alt="Waiver QR Code"
                className="mx-auto mt-8 w-[320px] rounded-[22px] bg-white p-5"
              />
            )}

            <p className="mt-8 text-lg font-black text-white/80">
              All riders must sign before riding
            </p>

            <p className="mt-2 text-sm font-bold text-white/45">
              Point your phone camera at the QR code
            </p>

            <p className="mt-6 text-xs font-bold text-white/35">{waiverUrl}</p>

            <button
              type="button"
              onClick={printQr}
              className="mt-8 inline-flex h-[60px] min-w-[280px] cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#57e0d2] px-8 text-[17px] font-black text-black transition hover:bg-[#70fff0]"
            >
              <Printer size={20} />
              Print QR Code
            </button>
          </div>
        </>
      )}
    </section>
  );
}