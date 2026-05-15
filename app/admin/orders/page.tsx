"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Eye,
  FileDown,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useNotify } from "@/context/NotificationContext";

type OrderItem = {
  id: string;
  order_id: string;
  title: string;
  quantity: number;
  price: number;
  created_at: string;
};

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

  OrderItem?: OrderItem[];
};

type PurchaseTab = "day-passes" | "memberships" | "event-tickets";

export default function AdminOrdersPage() {
  const { toast, confirm } = useNotify();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<PurchaseTab>("day-passes");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("Order")
      .select("*, OrderItem(*)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Orders fetch error:", error);
      setOrders([]);
    } else {
      setOrders((data as Order[]) ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getConfirmationCode = (order: Order) => {
    return order.confirmation_code || order.id.slice(0, 8).toUpperCase();
  };

  const getOrderText = (order: Order) => {
    return `${order.customer_name ?? ""} ${order.customer_email ?? ""} ${
      order.customer_phone ?? ""
    } ${order.id ?? ""} ${order.payment_status ?? ""} ${
      order.confirmation_code ?? ""
    } ${order.qr_code ?? ""} ${
      order.OrderItem?.map((item) => item.title).join(" ") ?? ""
    }`.toLowerCase();
  };

  const getOrderType = (order: Order): PurchaseTab => {
    const text = getOrderText(order);

    if (
      text.includes("membership") ||
      text.includes("annual") ||
      text.includes("member")
    ) {
      return "memberships";
    }

    if (
      text.includes("event") ||
      text.includes("ticket") ||
      text.includes("summer") ||
      text.includes("spring") ||
      text.includes("concert") ||
      text.includes("weekend") ||
      text.includes("all week")
    ) {
      return "event-tickets";
    }

    return "day-passes";
  };

  const searchedOrders = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return orders;

    return orders.filter((order) => getOrderText(order).includes(q));
  }, [orders, search]);

  const dayPassOrders = searchedOrders.filter(
    (order) => getOrderType(order) === "day-passes"
  );

  const membershipOrders = searchedOrders.filter(
    (order) => getOrderType(order) === "memberships"
  );

  const eventTicketOrders = searchedOrders.filter(
    (order) => getOrderType(order) === "event-tickets"
  );

  const visibleOrders =
    activeTab === "day-passes"
      ? dayPassOrders
      : activeTab === "memberships"
      ? membershipOrders
      : eventTicketOrders;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const deleteOrder = async (orderId: string) => {
    const confirmed = await confirm({
      title: "Delete purchase",
      message: "Are you sure you want to delete this purchase?",
      confirmLabel: "Delete",
      destructive: true,
    });

    if (!confirmed) return;

    await supabase.from("OrderItem").delete().eq("order_id", orderId);

    const { error } = await supabase.from("Order").delete().eq("id", orderId);

    if (error) {
      toast("Purchase delete failed. Check Supabase RLS delete policies.", "error");
      console.error(error);
      return;
    }

    setSelectedOrder(null);
    fetchOrders();
  };

  const updatePaymentStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from("Order")
      .update({ payment_status: status })
      .eq("id", orderId);

    if (error) {
      toast("Could not update payment status.", "error");
      console.error(error);
      return;
    }

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, payment_status: status });
    }

    fetchOrders();
  };

  const exportCSV = () => {
    const rows = visibleOrders.map((order) => ({
      confirmation_code: getConfirmationCode(order),
      customer_name: order.customer_name ?? "",
      customer_email: order.customer_email ?? "",
      customer_phone: order.customer_phone ?? "",
      type: getOrderType(order),
      status: order.payment_status ?? "pending",
      subtotal: order.subtotal ?? 0,
      total: order.total ?? 0,
      created_at: order.created_at,
      qr_code: order.qr_code ?? "",
      items:
        order.OrderItem?.map(
          (item) => `${item.title} x${item.quantity} ($${item.price})`
        ).join(" | ") ?? "",
    }));

    const headers = Object.keys(
      rows[0] ?? {
        confirmation_code: "",
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        type: "",
        status: "",
        subtotal: "",
        total: "",
        created_at: "",
        qr_code: "",
        items: "",
      }
    );

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const value = String(row[header as keyof typeof row] ?? "");
            return `"${value.replaceAll('"', '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `riverneck-${activeTab}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const tabs = [
    {
      id: "day-passes" as const,
      label: "Day Passes",
      count: dayPassOrders.length,
    },
    {
      id: "memberships" as const,
      label: "Memberships",
      count: membershipOrders.length,
    },
    {
      id: "event-tickets" as const,
      label: "Event Tickets",
      count: eventTicketOrders.length,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1220px] space-y-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-[26px] font-black uppercase leading-none tracking-[-0.8px] text-white md:text-[34px]">
          All Purchases & Passes
        </h1>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex lg:items-center">
          <button
            type="button"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 text-sm font-black text-white transition hover:bg-white/[0.09] active:scale-95"
          >
            <Plus size={17} />
            Add Ticket
          </button>

          <button
            type="button"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#57e0d2] px-5 text-sm font-black text-black shadow-[0_0_24px_rgba(87,224,210,0.22)] transition hover:bg-[#72fff0] active:scale-95"
          >
            <Plus size={17} />
            Add Membership
          </button>

          <button
            type="button"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 text-sm font-black text-white transition hover:bg-white/[0.09] active:scale-95"
          >
            <Plus size={17} />
            Add Day Pass
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="flex h-13 items-center gap-3 rounded-2xl border border-white/12 bg-black/20 px-4">
          <Search size={19} className="shrink-0 text-white/55" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or confirmation code..."
            className="h-full w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/45"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex h-13 min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-sm font-black text-white transition hover:bg-white/[0.09] active:scale-95 lg:flex-none"
          >
            <FileDown size={17} />
            Email CSV
          </button>

          <button
            type="button"
            onClick={fetchOrders}
            className="inline-flex h-13 cursor-pointer items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-white transition hover:bg-white/[0.09] active:scale-95"
            aria-label="Refresh purchases"
          >
            <RefreshCw size={17} />
          </button>
        </div>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-white/12 bg-white/[0.08] md:grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`h-12 cursor-pointer px-4 text-sm font-black transition ${
              activeTab === tab.id
                ? "bg-[#2f2a33] text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)]"
                : "text-white/72 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.04]">
          <RefreshCw className="animate-spin text-[#57e0d2]" />
        </div>
      ) : visibleOrders.length === 0 ? (
        <div className="rounded-[22px] border border-white/10 bg-[#2b2b2f]/60 p-10 text-center">
          <p className="text-lg font-black">No purchases found</p>
          <p className="mt-2 text-sm font-bold text-white/45">
            Purchases will appear here after checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleOrders.map((order) => {
            const confirmationCode = getConfirmationCode(order);
            const itemCount =
              order.OrderItem?.reduce(
                (sum, item) => sum + Number(item.quantity || 0),
                0
              ) || 1;

            const status = order.payment_status || "pending";
            const isUsed = status === "used";
            const isActive =
              status === "paid" ||
              status === "completed" ||
              status === "active";

            return (
              <article
                key={order.id}
                className="rounded-[22px] border border-white/10 bg-[#303035]/85 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.25)] md:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[18px] font-black leading-tight text-white">
                      {order.customer_name || "Customer"}
                    </h2>

                    <p className="mt-1 text-sm font-bold text-white/55">
                      {order.customer_email || "No email"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-black uppercase ${
                        isUsed
                          ? "bg-white text-[#555]"
                          : isActive
                          ? "bg-[#18e6a8] text-black"
                          : status === "failed"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-white/15 text-white/70"
                      }`}
                    >
                      {status}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="cursor-pointer rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white/[0.08] px-4 py-4">
                  <p className="text-xs font-black text-white/70">
                    Confirmation Code:
                  </p>

                  <p className="mt-1 text-lg font-black tracking-[0.01em] text-white">
                    {confirmationCode}
                  </p>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-black text-white/70">
                        <CalendarDays size={15} />
                        Valid Date
                      </div>

                      <p className="mt-1 text-sm font-bold text-white">
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-black text-white/70">
                        Total Amount
                      </div>

                      <p className="mt-1 text-sm font-black text-[#57e0d2]">
                        ${Number(order.total || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-black text-white/70">
                        <Users size={15} />
                        Details
                      </div>

                      <p className="mt-1 text-sm font-bold text-white">
                        {itemCount} item{itemCount === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-black text-white/70">
                        Purchase Date
                      </div>

                      <p className="mt-1 text-sm font-bold text-white">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/[0.08] px-4 py-2 text-sm font-black text-white transition hover:bg-white/[0.14]"
                  >
                    View Receipt
                    <Eye size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteOrder(order.id)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-black text-red-300 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#151515] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">Purchase Receipt</h2>

                <p className="mt-1 text-sm font-bold text-white/45">
                  {getConfirmationCode(selectedOrder)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="cursor-pointer rounded-xl bg-white/10 p-3 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs font-black uppercase text-white/40">
                  Customer
                </p>

                <p className="mt-2 font-black">
                  {selectedOrder.customer_name || "Customer"}
                </p>

                <p className="text-sm text-white/55">
                  {selectedOrder.customer_email || "No email"}
                </p>

                <p className="text-sm text-white/55">
                  {selectedOrder.customer_phone || "No phone"}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs font-black uppercase text-white/40">
                  Payment
                </p>

                <p className="mt-2 text-2xl font-black text-[#57e0d2]">
                  ${Number(selectedOrder.total || 0).toFixed(2)}
                </p>

                <p className="text-sm text-white/55">
                  Status: {selectedOrder.payment_status || "pending"}
                </p>

                {selectedOrder.qr_code && (
                <div className="flex justify-center rounded-2xl bg-white p-4">
  <img
    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
      selectedOrder.qr_code || ""
    )}`}
    alt="QR Code"
    className="h-52 w-52"
  />
</div>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updatePaymentStatus(selectedOrder.id, "paid")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-black text-black transition hover:bg-green-400"
              >
                <CheckCircle size={16} />
                Mark Paid
              </button>

              <button
                type="button"
                onClick={() =>
                  updatePaymentStatus(selectedOrder.id, "pending")
                }
                className="cursor-pointer rounded-xl bg-[#f2c06b] px-4 py-3 text-sm font-black text-black transition hover:bg-[#ffd37a]"
              >
                Mark Pending
              </button>

              <button
                type="button"
                onClick={() => updatePaymentStatus(selectedOrder.id, "used")}
                className="cursor-pointer rounded-xl bg-white px-4 py-3 text-sm font-black text-black transition hover:bg-white/85"
              >
                Mark Used
              </button>

              <button
                type="button"
                onClick={() => updatePaymentStatus(selectedOrder.id, "failed")}
                className="cursor-pointer rounded-xl bg-red-500 px-4 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                Mark Failed
              </button>
            </div>

            <div className="mt-7">
              <h3 className="mb-3 text-lg font-black">Items</h3>

              <div className="space-y-3">
                {selectedOrder.OrderItem &&
                selectedOrder.OrderItem.length > 0 ? (
                  selectedOrder.OrderItem.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div>
                        <p className="font-black">{item.title}</p>

                        <p className="text-sm text-white/50">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-black text-[#57e0d2]">
                        ${Number(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/50">
                    No items found for this purchase.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}