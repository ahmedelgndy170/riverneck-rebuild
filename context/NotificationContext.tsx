"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToastType = "error" | "success" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type NotificationContextValue = {
  toast: (message: string, type?: ToastType) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<
    (ConfirmOptions & { resolve: (value: boolean) => void }) | null
  >(null);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;

      setToasts((current) => [...current, { id, message, type }]);

      window.setTimeout(() => dismissToast(id), 5500);
    },
    [dismissToast]
  );

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ ...options, resolve });
    });
  }, []);

  const closeConfirm = useCallback((value: boolean) => {
    setConfirmState((current) => {
      current?.resolve(value);
      return null;
    });
  }, []);

  const value = useMemo(() => ({ toast, confirm }), [toast, confirm]);

  return (
    <NotificationContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-20 z-[10000] flex w-[min(100%,22rem)] flex-col gap-3 md:right-6 md:top-24"
      >
        {toasts.map((item) => (
          <ToastItem
            key={item.id}
            toast={item}
            onDismiss={() => dismissToast(item.id)}
          />
        ))}
      </div>

      {confirmState && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          <div className="w-full max-w-md rounded-[18px] border border-white/15 bg-[#151515] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
            <h2
              id="confirm-dialog-title"
              className="text-[18px] font-black uppercase tracking-tight text-white"
            >
              {confirmState.title ?? "Confirm"}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/75">
              {confirmState.message}
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => closeConfirm(false)}
                className="h-11 rounded-xl border border-white/15 bg-white/5 px-5 text-[14px] font-bold text-white transition hover:bg-white/10"
              >
                {confirmState.cancelLabel ?? "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => closeConfirm(true)}
                className={`h-11 rounded-xl px-5 text-[14px] font-black transition active:scale-[0.98] ${
                  confirmState.destructive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-[#d5965c] text-black hover:bg-[#f2b35f]"
                }`}
              >
                {confirmState.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const styles =
    toast.type === "error"
      ? "border-red-500/40 bg-[#1a1212]"
      : toast.type === "success"
        ? "border-[#25b99a]/40 bg-[#0f1a16]"
        : "border-white/15 bg-[#151515]";

  const Icon =
    toast.type === "error"
      ? AlertCircle
      : toast.type === "success"
        ? CheckCircle2
        : Info;

  const iconColor =
    toast.type === "error"
      ? "text-red-400"
      : toast.type === "success"
        ? "text-[#25b99a]"
        : "text-[#f2b35f]";

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-[14px] border p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ${styles}`}
      role="alert"
    >
      <Icon size={20} className={`mt-0.5 shrink-0 ${iconColor}`} />
      <p className="flex-1 text-[14px] font-semibold leading-snug text-white">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-lg p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function useNotify() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotify must be used within NotificationProvider");
  }

  return context;
}
