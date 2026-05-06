import Footer from "../../components/Footer";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <section className="px-[8%] pt-[150px] pb-28">
        <div className="mx-auto max-w-[820px] rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-14 text-center shadow-2xl">
          <ShoppingCart
            size={88}
            strokeWidth={1.8}
            className="mx-auto mb-6 text-white/80"
          />

          <h1 className="text-[32px] font-black leading-none">
            Your Cart is Empty
          </h1>

          <p className="mx-auto mt-5 max-w-[620px] text-[17px] text-white/70">
            Add bookings, day passes, memberships, or event tickets to get started!
          </p>

          <div className="mt-9 flex items-center justify-center gap-5">
            <a
              href="/purchase"
              className="rounded-xl bg-[#25b99a] px-8 py-3 text-sm font-black text-white transition hover:scale-105"
            >
              Browse Options
            </a>

            <a
              href="/"
              className="rounded-xl bg-white/5 px-8 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Go Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}