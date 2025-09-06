"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PopupMessageProps {
  type: "success" | "error";
  title: string;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const PopupMessage = ({ type, title, message, isVisible, onClose, duration = 4000 }: PopupMessageProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Auto close after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-50" : "bg-red-50";
  const borderColor = isSuccess ? "border-green-200" : "border-red-200";
  const textColor = isSuccess ? "text-green-800" : "text-red-800";
  const iconColor = isSuccess ? "text-green-500" : "text-red-500";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className={`
            max-w-md w-full mx-4 shadow-2xl rounded-xl border-2 p-6
            transform transition-all duration-300 ease-out
            ${bgColor} ${borderColor}
            ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {isSuccess ? (
                <CheckCircleIcon className={`h-8 w-8 ${iconColor}`} />
              ) : (
                <ExclamationCircleIcon className={`h-8 w-8 ${iconColor}`} />
              )}
            </div>

            <div className="ml-4 flex-1">
              <h3 className={`text-lg font-bold ${textColor} mb-1`}>{title}</h3>
              {message && <p className={`text-sm ${textColor}/80`}>{message}</p>}
            </div>

            <div className="ml-4">
              <button
                onClick={handleClose}
                className={`inline-flex rounded-md p-2 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${textColor}`}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isSuccess ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Hook for easy usage
export const usePopupMessage = () => {
  const [popup, setPopup] = useState<{
    type: "success" | "error";
    title: string;
    message?: string;
    isVisible: boolean;
  }>({
    type: "success",
    title: "",
    message: "",
    isVisible: false,
  });

  const showSuccess = (title: string, message?: string) => {
    setPopup({
      type: "success",
      title,
      message,
      isVisible: true,
    });
  };

  const showError = (title: string, message?: string) => {
    setPopup({
      type: "error",
      title,
      message,
      isVisible: true,
    });
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isVisible: false }));
  };

  return {
    popup,
    showSuccess,
    showError,
    closePopup,
  };
};
