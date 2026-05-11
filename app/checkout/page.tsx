"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CreditCard, Loader2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const tax = subtotal * 0.05;
  const processingFee = subtotal * 0.05;
  const total = subtotal + tax + processingFee;

  async function createOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      alert("Please complete customer information.");
      return;
    }

    setSubmitting(true);

    const confirmationCode =
      "RNA-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const qrCode = JSON.stringify({
      type: "order",
      confirmationCode,
      customerName,
      customerEmail,
      customerPhone,
      total: Number(total.toFixed(2)),
    });

    const { data: orderData, error: orderError } = await supabase
      .from("Order")
      .insert([
        {
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          subtotal: Number(subtotal.toFixed(2)),
          total: Number(total.toFixed(2)),
          payment_status: "pending",
          confirmation_code: confirmationCode,
          qr_code: qrCode,
        },
      ])
      .select("id, confirmation_code")
      .single();

    if (orderError || !orderData) {
      setSubmitting(false);
      alert(orderError?.message || "Could not create order.");
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: orderData.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("OrderItem")
      .insert(orderItems);

    setSubmitting(false);

    if (itemsError) {
      alert(itemsError.message);
      return;
    }

    clearCart();

    window.location.href = `/checkout/success?orderId=${orderData.id}`;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#101010] px-4 py-8 text-white selection:bg-[#f2c06b] selection:text-black md:px-[8%] md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.28),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          href="/cart"
          className="mb-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-black text-white/75 transition hover:bg-white/10 active:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <div className="mb-8">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#25b99a]">
            River Neck Acres
          </p>

          <h1 className="mt-3 text-[36px] font-black uppercase leading-none tracking-[-1px] md:text-[64px]">
            Checkout
          </h1>

          <p className="mt-3 max-w-2xl text-[14px] font-semibold leading-[1.7] text-white/65 md:text-[17px]">
            Enter customer information and create your order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <section className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7">
            <h2 className="mb-5 text-[24px] font-black uppercase">
              Customer Information
            </h2>

            <div className="grid gap-4">
              <Field
                label="Full Name"
                value={customerName}
                onChange={setCustomerName}
                placeholder="Enter full name"
              />

              <Field
                label="Email"
                value={customerEmail}
                onChange={setCustomerEmail}
                placeholder="customer@email.com"
                type="email"
              />

              <Field
                label="Phone"
                value={customerPhone}
                onChange={setCustomerPhone}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="mt-7 rounded-2xl border border-[#25b99a]/25 bg-[#25b99a]/10 p-4 text-[13px] font-semibold leading-[1.7] text-white/75">
              Payment integration with Square is the next step. For now, this
              creates a real pending order in Supabase.
            </div>
          </section>

          <aside className="h-fit rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <ShoppingCart className="text-[#25d0bd]" size={24} />

              <h2 className="text-[24px] font-black uppercase">
                Order Summary
              </h2>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center text-[14px] font-black text-white/60">
                Your cart is empty.
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-[15px] font-black leading-tight">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[12px] font-bold text-white/55">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-[14px] font-black text-[#25d0bd]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
              <SummaryRow label="Subtotal" value={subtotal} />
              <SummaryRow label="Admission Tax" value={tax} />
              <SummaryRow label="Processing Fee" value={processingFee} />
            </div>

            <div className="mt-5 flex items-center justify-between text-[22px] font-black">
              <span>Total</span>
              <span className="text-[#25d0bd]">${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={createOrder}
              disabled={submitting || cart.length === 0}
              className="mt-6 inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[#25b99a] px-6 text-[15px] font-black text-white shadow-[0_0_28px_rgba(37,185,154,0.35)] transition hover:-translate-y-1 hover:bg-[#2ed9b7] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <CreditCard size={18} />
              )}

              {submitting ? "Creating Order..." : "Create Order"}
            </button>

            <p className="mt-4 text-center text-[12px] font-semibold leading-[1.6] text-white/55">
              Square payment button will be connected after this step.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-black">{label}</label>

      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[54px] w-full rounded-xl border border-white/10 bg-[#151515] px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#25d0bd]"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-[14px] font-bold text-white/75">
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}