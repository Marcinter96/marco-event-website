"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [noCount, setNoCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleNo = () => {
    if (noCount >= 2) return;
    const btn = noButtonRef.current;
    if (btn) {
      btn.classList.remove("shake");
      void btn.offsetWidth;
      btn.classList.add("shake");
    }
    setNoCount((c) => c + 1);
  };

  const noLabel =
    noCount === 0
      ? "No thanks"
      : noCount === 1
      ? "Really? Are you sure? 🤔"
      : "Ok... I'll ask again later 😄";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5F0] px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4704F]" />

      <div className="text-center max-w-xl w-full">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C4704F] mb-6">
          A proposal of sorts
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-6">
          Hey Rose,
          <br />
          would you like to go on a
          <br />
          getaway weekend together?
        </h1>

        <p className="text-[#6B6B6B] text-lg mb-12 max-w-sm mx-auto">
          No pressure. Just good vibes, good food, and a change of scenery.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => router.push("/destinations")}
            className="px-10 py-4 bg-[#C4704F] text-white text-lg font-bold rounded-xl hover:bg-[#A85E3E] transition-colors shadow-sm"
          >
            Yes, let&apos;s go! 🌍
          </button>

          <button
            ref={noButtonRef}
            onClick={handleNo}
            disabled={noCount >= 2}
            className={`px-10 py-4 border-2 border-[#1C1C1C] text-[#1C1C1C] text-lg rounded-xl hover:bg-[#F0EBE3] transition-all ${
              noCount >= 2 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {noLabel}
          </button>
        </div>
      </div>

      <p className="absolute bottom-6 text-xs text-[#ABABAB]">
        Made with care by Marco
      </p>
    </main>
  );
}
