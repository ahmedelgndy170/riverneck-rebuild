"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Trash2,
  Plus,
  Pencil,
  Save,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

type EventType = {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  imageUrl: string | null;
  dateLabel?: string | null;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [details, setDetails] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function fetchEvents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .order("startDate", { ascending: true });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setEvents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function resetForm() {
    setEditingId(null);

    setTitle("");
    setDateLabel("");
    setDetails("");
    setStart("");
    setEnd("");
    setImageUrl("");
  }

  async function createEvent() {
    if (!title || !start) {
      alert("Please fill required fields.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("Event").insert([
      {
        id: crypto.randomUUID(),

        title,
        description: details,

        startDate: start,
        endDate: end || null,

        dateLabel,

        imageUrl: imageUrl || DEFAULT_IMAGE,
      },
    ]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    fetchEvents();
  }

  function startEdit(event: EventType) {
    setEditingId(event.id);

    setTitle(event.title || "");
    setDateLabel(event.dateLabel || "");
    setDetails(event.description || "");
    setStart(event.startDate || "");
    setEnd(event.endDate || "");
    setImageUrl(event.imageUrl || "");
  }

  async function saveEdit() {
    if (!editingId) return;

    if (!title || !start) {
      alert("Please fill required fields.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("Event")
      .update({
        title,
        description: details,

        startDate: start,
        endDate: end || null,

        dateLabel,

        imageUrl: imageUrl || DEFAULT_IMAGE,
      })
      .eq("id", editingId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    fetchEvents();
  }

  async function deleteEvent(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("Event")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchEvents();
  }

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-8 text-white md:px-[8%] md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-black text-white/75 transition hover:bg-white/10 active:scale-95"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-[34px] font-black uppercase tracking-[-1px] md:text-[54px]">
              Events Admin
            </h1>

            <p className="mt-2 text-[14px] font-semibold text-white/60 md:text-[16px]">
              Create, edit, and manage events.
            </p>
          </div>
        </div>

        <section className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25b99a]/10 text-[#25d0bd]">
              {editingId ? <Pencil size={26} /> : <Plus size={26} />}
            </div>

            <div>
              <h2 className="text-[24px] font-black">
                {editingId ? "Edit Event" : "Create Event"}
              </h2>

              <p className="text-[13px] font-semibold text-white/55">
                Manage your live events page.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#25d0bd]"
            />

            <input
              placeholder="Date Label"
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#f2c06b]"
            />

            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#25d0bd]"
            />

            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#25d0bd]"
            />

            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#f2c06b] md:col-span-2"
            />
          </div>

          <textarea
            placeholder="Event Description"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-4 h-36 w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#f2c06b]"
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {editingId ? (
              <>
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="inline-flex h-[56px] items-center justify-center gap-2 rounded-xl bg-[#25d0bd] px-7 text-[15px] font-black text-black transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                >
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={resetForm}
                  className="inline-flex h-[56px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-7 text-[15px] font-black text-white transition hover:bg-white/10 active:scale-95"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={createEvent}
                disabled={saving}
                className="inline-flex h-[56px] items-center justify-center gap-2 rounded-xl bg-[#25d0bd] px-7 text-[15px] font-black text-black transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              >
                <Plus size={18} />
                {saving ? "Creating..." : "Create Event"}
              </button>
            )}
          </div>
        </section>

        <section className="space-y-5">
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center text-[16px] font-black text-white/70">
              Loading Events...
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center text-[16px] font-black text-white/70">
              No events found.
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="grid lg:grid-cols-[320px_1fr]">
                  <div className="relative h-[220px] overflow-hidden lg:h-full">
                    <img
                      src={event.imageUrl || DEFAULT_IMAGE}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5 md:p-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#25b99a]/10 px-3 py-1 text-[12px] font-black text-[#25b99a]">
                          <CalendarDays size={14} />

                          {event.dateLabel ||
                            `${event.startDate}${
                              event.endDate
                                ? ` - ${event.endDate}`
                                : ""
                            }`}
                        </div>

                        <h2 className="text-[26px] font-black leading-tight">
                          {event.title}
                        </h2>

                        {event.description && (
                          <p className="mt-3 max-w-4xl text-[14px] font-semibold leading-[1.8] text-white/65 md:text-[15px]">
                            {event.description}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(event)}
                          className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl bg-[#f2c06b] px-5 text-[14px] font-black text-black transition hover:brightness-110 active:scale-95"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-[14px] font-black text-white transition hover:bg-red-600 active:scale-95"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}