import { useEffect, useRef } from "react";

type ToastProps = {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  duration?: number;
};

const TOAST_STYLES = {
  error: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    button: "text-red-400 hover:text-red-600",
  },
  success: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-800",
    button: "text-green-400 hover:text-green-600",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    button: "text-blue-400 hover:text-blue-600",
  },
} as const;

export function Toast({ message, type = "error", onClose, duration = 5000 }: ToastProps) {
  const onCloseRef = useRef(onClose);
  
  // Keep ref up to date
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const styles = TOAST_STYLES[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={`${styles.bg} ${styles.text} px-4 py-3 rounded border shadow-lg max-w-md flex items-start gap-3`}
      >
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${styles.button} transition-colors`}
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
