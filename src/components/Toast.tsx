import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, type = "error", onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    error: "bg-red-50 border-red-200",
    success: "bg-green-50 border-green-200",
    info: "bg-blue-50 border-blue-200",
  }[type];

  const textColor = {
    error: "text-red-800",
    success: "text-green-800",
    info: "text-blue-800",
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${bgColor} ${textColor} px-4 py-3 rounded border shadow-lg max-w-md flex items-start gap-3`}
      >
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
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
