"use client";

import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

export function Modal({ children, onClose, title }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8] shrink-0">
          <h3 className="font-bold text-[#1C1C1C] text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#1C1C1C] text-2xl leading-none transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0EBE3]"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
