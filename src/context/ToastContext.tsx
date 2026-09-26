/*"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "info" | "error";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = ++toastId;

      setToasts((previous) => [...previous, { id, message, variant }]);

      setTimeout(() => {
        dismissToast(id);
      }, 2600);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex flex-col items-center gap-2 px-4 sm:left-auto sm:right-5 sm:items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            onClick={() => dismissToast(toast.id)}
            className={`pointer-events-auto flex max-w-sm cursor-pointer items-center gap-3 border bg-[#101114] px-4 py-3 text-[11px] font-bold uppercase tracking-wide shadow-lg transition ${
              toast.variant === "success"
                ? "border-[#ccff00] text-[#ccff00]"
                : toast.variant === "error"
                  ? "border-[#ff4d4d] text-[#ff4d4d]"
                  : "border-[#3b3e44] text-[#d7d8da]"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}*/