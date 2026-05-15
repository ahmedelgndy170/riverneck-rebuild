"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImageIcon,
  Trash2,
  Upload,
  Loader2,
  Pencil,
  Save,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { useNotify } from "@/context/NotificationContext";

type PhotoType = {
  id: string;
  title: string | null;
  imageUrl: string;
  category: string | null;
  likes: number;
};

export default function AdminPhotosPage() {
  const { toast, confirm } = useNotify();
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("newest");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("newest");
  const [editLikes, setEditLikes] = useState("0");

  async function fetchPhotos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("Photo")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      toast(error.message, "error");
      setLoading(false);
      return;
    }

    setPhotos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  function startEdit(photo: PhotoType) {
    setEditingId(photo.id);
    setEditTitle(photo.title || "");
    setEditCategory(photo.category || "newest");
    setEditLikes(String(photo.likes || 0));
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditCategory("newest");
    setEditLikes("0");
  }

  async function saveEdit(id: string) {
    setSavingEdit(true);

    const { error } = await supabase
      .from("Photo")
      .update({
        title: editTitle || "River Neck Photo",
        category: editCategory,
        likes: Number(editLikes) || 0,
      })
      .eq("id", id);

    setSavingEdit(false);

    if (error) {
      toast(error.message, "error");
      return;
    }

    cancelEdit();
    fetchPhotos();
  }

  async function uploadPhoto() {
    if (!selectedFile) {
      toast("Please select an image.", "error");
      return;
    }

    setUploading(true);

    const fileExt = selectedFile.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}.${fileExt}`;

    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(filePath, selectedFile);

    if (uploadError) {
      toast(uploadError.message, "error");
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("photos")
      .getPublicUrl(filePath);

    const imageUrl = publicData.publicUrl;

    const { error: insertError } = await supabase.from("Photo").insert([
      {
        id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        title: title || "River Neck Photo",
        imageUrl,
        category,
        likes: Math.floor(Math.random() * 200),
      },
    ]);

    setUploading(false);

    if (insertError) {
      toast(insertError.message, "error");
      return;
    }

    setTitle("");
    setCategory("newest");
    setSelectedFile(null);

    fetchPhotos();
  }

  async function deletePhoto(id: string) {
    const confirmDelete = await confirm({
      title: "Delete photo",
      message: "Delete this photo?",
      confirmLabel: "Delete",
      destructive: true,
    });

    if (!confirmDelete) return;

    const { error } = await supabase.from("Photo").delete().eq("id", id);

    if (error) {
      toast(error.message, "error");
      return;
    }

    fetchPhotos();
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
              Photos Admin
            </h1>

            <p className="mt-2 text-[14px] font-semibold text-white/60 md:text-[16px]">
              Upload, edit, and manage community photos.
            </p>
          </div>
        </div>

        <section className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25b99a]/10 text-[#25d0bd]">
              <ImageIcon size={26} />
            </div>

            <div>
              <h2 className="text-[24px] font-black">Upload Photo</h2>

              <p className="text-[13px] font-semibold text-white/55">
                Add new community photos.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Photo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#25d0bd]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-[56px] rounded-xl border border-white/10 bg-[#121212] px-4 text-[15px] font-semibold text-white outline-none transition focus:border-[#25d0bd]"
            >
              <option value="newest">Newest</option>
              <option value="liked">Most Liked</option>
              <option value="staff">Staff Picks</option>
            </select>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="mt-4 block w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-4 text-[14px] font-semibold text-white"
          />

          <button
            onClick={uploadPhoto}
            disabled={uploading}
            className="mt-5 inline-flex h-[56px] items-center justify-center gap-2 rounded-xl bg-[#25d0bd] px-7 text-[15px] font-black text-black transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}

            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </section>

        <section>
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center text-[16px] font-black text-white/70">
              Loading Photos...
            </div>
          ) : photos.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center text-[16px] font-black text-white/70">
              No photos found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {photos.map((photo) => {
                const isEditing = editingId === photo.id;

                return (
                  <div
                    key={photo.id}
                    className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative h-[260px] overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title || "Photo"}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="h-[48px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] font-semibold text-white outline-none focus:border-[#25d0bd]"
                          />

                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="h-[48px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] font-semibold text-white outline-none focus:border-[#25d0bd]"
                          >
                            <option value="newest">Newest</option>
                            <option value="liked">Most Liked</option>
                            <option value="staff">Staff Picks</option>
                          </select>

                          <input
                            type="number"
                            value={editLikes}
                            onChange={(e) => setEditLikes(e.target.value)}
                            className="h-[48px] w-full rounded-xl border border-white/10 bg-[#121212] px-4 text-[14px] font-semibold text-white outline-none focus:border-[#25d0bd]"
                          />

                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(photo.id)}
                              disabled={savingEdit}
                              className="inline-flex h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#25d0bd] px-4 text-[13px] font-black text-black transition active:scale-95 disabled:opacity-60"
                            >
                              <Save size={16} />
                              Save
                            </button>

                            <button
                              onClick={cancelEdit}
                              className="inline-flex h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-[13px] font-black text-white transition active:scale-95"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mb-3 inline-flex rounded-full bg-[#25b99a]/10 px-3 py-1 text-[12px] font-black text-[#25b99a]">
                            {photo.category}
                          </div>

                          <h2 className="text-[20px] font-black">
                            {photo.title}
                          </h2>

                          <p className="mt-2 text-[13px] font-bold text-white/50">
                            {photo.likes || 0} likes
                          </p>

                          <div className="mt-5 flex gap-2">
                            <button
                              onClick={() => startEdit(photo)}
                              className="inline-flex h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#f2c06b] px-4 text-[13px] font-black text-black transition hover:brightness-110 active:scale-95"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              onClick={() => deletePhoto(photo.id)}
                              className="inline-flex h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 text-[13px] font-black text-white transition hover:bg-red-600 active:scale-95"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}