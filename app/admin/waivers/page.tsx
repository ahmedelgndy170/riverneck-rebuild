"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Search, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useNotify } from "@/context/NotificationContext";

type WaiverType = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  waiver_date: string;
  drivers_license: string;
  vehicle_description: string;
  minors: number;
  signature: string;
  created_at: string;
};

export default function AdminWaiversPage() {
  const { toast, confirm } = useNotify();
  const [waivers, setWaivers] = useState<WaiverType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchWaivers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("Waiver")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast(error.message, "error");
      setLoading(false);
      return;
    }

    setWaivers(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchWaivers();
  }, []);

  async function deleteWaiver(id: string) {
    const confirmed = await confirm({
      title: "Delete waiver",
      message: "Delete this waiver? This cannot be undone.",
      confirmLabel: "Delete",
      destructive: true,
    });

    if (!confirmed) return;

    const { error } = await supabase.from("Waiver").delete().eq("id", id);

    if (error) {
      toast(error.message, "error");
      return;
    }

    fetchWaivers();
  }

  const filteredWaivers = waivers.filter((waiver) => {
    const text = `${waiver.first_name} ${waiver.last_name} ${waiver.phone}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-8 text-white md:px-[8%] md:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-black text-white/75 transition hover:bg-white/10 active:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mb-8 rounded-[26px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25b99a]/10 text-[#25d0bd]">
            <FileText size={28} />
          </div>

          <h1 className="text-[34px] font-black uppercase tracking-[-1px] md:text-[54px]">
            Waivers Admin
          </h1>

          <p className="mt-2 text-[14px] font-semibold text-white/60 md:text-[16px]">
            View, search, and manage signed liability waivers.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
          <Search size={18} className="text-white/50" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="h-11 flex-1 bg-transparent text-[14px] font-semibold text-white outline-none placeholder:text-white/40"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center font-black text-white/70">
            Loading waivers...
          </div>
        ) : filteredWaivers.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center font-black text-white/70">
            No waivers found.
          </div>
        ) : (
          <section className="space-y-4">
            {filteredWaivers.map((waiver) => (
              <div
                key={waiver.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-[24px] font-black">
                      {waiver.first_name} {waiver.last_name}
                    </h2>

                    <p className="mt-1 text-[14px] font-bold text-[#25d0bd]">
                      {waiver.phone}
                    </p>

                    <div className="mt-4 grid gap-3 text-[13px] font-semibold text-white/70 md:grid-cols-2">
                      <p>
                        <span className="font-black text-white">Waiver Date:</span>{" "}
                        {waiver.waiver_date}
                      </p>

                      <p>
                        <span className="font-black text-white">Minors:</span>{" "}
                        {waiver.minors}
                      </p>

                      <p>
                        <span className="font-black text-white">License:</span>{" "}
                        {waiver.drivers_license}
                      </p>

                      <p>
                        <span className="font-black text-white">Vehicle:</span>{" "}
                        {waiver.vehicle_description}
                      </p>

                      <p>
                        <span className="font-black text-white">Signature:</span>{" "}
                        {waiver.signature}
                      </p>

                      <p>
                        <span className="font-black text-white">Submitted:</span>{" "}
                        {new Date(waiver.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteWaiver(waiver.id)}
                    className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-[14px] font-black text-white transition hover:bg-red-600 active:scale-95"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}