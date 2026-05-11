"use client";

import Link from "next/link";
import Footer from "../../components/Footer";
import { ShoppingCart, Trash2, Minus, Plus, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
  } = useCart();

  const tax = subtotal * 0.05;
  const processingFee = subtotal * 0.05;
  const total = subtotal + tax + processingFee;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#101010] text-white selection:bg-[#f2c06b] selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(29,109,84,0.28),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(246,195,95,0.16),transparent_32%),linear-gradient(180deg,#111312_0%,#201a13_45%,#0b1110_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <section className="relative z-10 px-4 pb-20 pt-[110px] md:px-[8%] md:pb-28 md:pt-[150px]">
        {cart.length === 0 ? (
          <div className="mx-auto max-w-[860px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] p-5 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:rounded-[24px] md:p-14">
            <div className="mx-auto mb-6 flex h-[92px] w-[92px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.06)] md:mb-7 md:h-[130px] md:w-[130px]">
              <ShoppingCart
                size={48}
                strokeWidth={1.8}
                className="text-[#25b99a] md:size-[70px]"
              />
            </div>

            <h1 className="text-[28px] font-black leading-[0.95] tracking-tight md:text-[52px]">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-5 max-w-[620px] text-[14px] font-semibold leading-[1.7] text-white/70 md:mt-6 md:text-[19px]">
              Add bookings, day passes, memberships, or event tickets to get
              started!
            </p>

            <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:items-center md:justify-center md:gap-5">
              <Link
                href="/purchase"
                className="flex h-[54px] w-full touch-manipulation items-center justify-center rounded-xl bg-[#25b99a] px-8 text-[14px] font-black text-white shadow-[0_0_28px_rgba(37,185,154,0.35)] transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:bg-[#2ed9b7] hover:shadow-[0_0_38px_rgba(37,185,154,0.55)] md:h-[58px] md:w-auto md:text-[15px]"
              >
                Browse Options
              </Link>

              <Link
                href="/"
                className="flex h-[54px] w-full touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-8 text-[14px] font-black text-white transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:bg-white/10 md:h-[58px] md:w-auto md:text-[15px]"
              >
                Go Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_390px]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7">
              <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#25b99a]">
                    River Neck Acres
                  </p>

                  <h1 className="mt-2 text-[32px] font-black uppercase leading-none tracking-[-1px] md:text-[52px]">
                    Your Cart
                  </h1>

                  <p className="mt-2 text-[14px] font-semibold text-white/65">
                    {cartCount} item{cartCount === 1 ? "" : "s"} ready for
                    checkout.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-5 text-[13px] font-black text-red-200 transition hover:bg-red-500 hover:text-white active:scale-95"
                >
                  <Trash2 size={16} />
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[20px] border border-white/10 bg-black/20 p-4 transition hover:border-[#25b99a]/45 md:p-5"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <h2 className="text-[20px] font-black leading-tight md:text-[24px]">
                          {item.title}
                        </h2>

                        <p className="mt-2 text-[14px] font-bold text-[#25d0bd]">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-[46px] items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.05]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-full w-12 items-center justify-center transition hover:bg-white/10 active:scale-95"
                          >
                            <Minus size={16} />
                          </button>

                          <div className="flex h-full min-w-12 items-center justify-center px-4 text-[15px] font-black">
                            {item.quantity}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-full w-12 items-center justify-center transition hover:bg-white/10 active:scale-95"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="min-w-[105px] text-right text-[18px] font-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-red-500/15 text-red-200 transition hover:bg-red-500 hover:text-white active:scale-95"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/purchase"
                  className="inline-flex h-[52px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-6 text-[14px] font-black text-white transition hover:bg-white/10 active:scale-95"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7">
              <h2 className="text-[26px] font-black uppercase tracking-[-0.5px]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-white/10 pb-5">
                <SummaryRow label="Subtotal" value={subtotal} />
                <SummaryRow label="Admission Tax" value={tax} />
                <SummaryRow label="Processing Fee" value={processingFee} />
              </div>

              <div className="mt-5 flex items-center justify-between text-[22px] font-black">
                <span>Total</span>
                <span className="text-[#25d0bd]">${total.toFixed(2)}</span>
              </div>

      <Link
  href="/checkout"
  className="mt-6 inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[#25b99a] px-6 text-[15px] font-black text-white shadow-[0_0_28px_rgba(37,185,154,0.35)] transition hover:-translate-y-1 hover:bg-[#2ed9b7] active:scale-95"
>
  <CreditCard size={18} />
  Checkout
</Link>

              <p className="mt-4 text-center text-[12px] font-semibold leading-[1.6] text-white/55">
                Secure checkout will be handled through Square.
              </p>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
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