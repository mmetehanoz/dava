import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle, ShoppingCart, Info } from 'lucide-react';

const ToastContext = createContext(null);

const TOAST_DURATION = 3500;

const styles = {
  success: {
    icon: CheckCircle2,
    ring: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
  cart: {
    icon: ShoppingCart,
    ring: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    bar: 'bg-teal-500',
  },
  error: {
    icon: AlertCircle,
    ring: 'border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    bar: 'bg-rose-500',
  },
  info: {
    icon: Info,
    ring: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    bar: 'bg-blue-500',
  },
};

function ToastItem({ toast, onClose }) {
  const style = styles[toast.type] || styles.info;
  const Icon = style.icon;

  return (
    <div className="pointer-events-auto relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100 p-4 pr-8 flex items-start gap-3 w-full max-w-sm animate-[slideInToast_.3s_ease-out]">
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar}`} />
      <div className={`w-10 h-10 ${style.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${style.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="font-bold text-gray-900 text-sm mb-0.5">{toast.title}</div>
        {toast.message && <div className="text-gray-500 text-xs leading-relaxed">{toast.message}</div>}
      </div>
      <button
        onClick={onClose}
        className="absolute right-3 top-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors"
        aria-label="Bildirimi kapat"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((toast) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const item = { id, ...toast };
    setToasts((prev) => [...prev.slice(-2), item]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || TOAST_DURATION);
    return id;
  }, []);

  const notify = useMemo(() => ({
    success: (title, message) => push({ type: 'success', title, message }),
    cart: (title, message) => push({ type: 'cart', title, message }),
    error: (title, message) => push({ type: 'error', title, message }),
    info: (title, message) => push({ type: 'info', title, message }),
  }), [push]);

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};