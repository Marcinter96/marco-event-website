"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

// Each extra "No" tries a little harder to talk Rose into it. After the third
// no, we drop the persuasion and ask her what would turn it into a yes.
const NO_MESSAGES = [
  "Are you sure? Marco is kind and generous — and genuinely looking forward to it.",
  "Marco promises you a weekend of great fun, full of laughter and good food.",
];

const FEEDBACK_QUESTIONS = [
  "What's the main reason it's a no (for now)?",
  "Which destination came closest to tempting you — and why?",
  "What would turn this into a definite yes?",
  "Is the timing the issue? When would actually work for you?",
  "Anything else Marco should know or do better next time?",
];

export default function LandingPage() {
  const router = useRouter();
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const [noCount, setNoCount] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(FEEDBACK_QUESTIONS.length).fill("")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleNo = () => {
    if (noCount >= 3) return;
    track("no_clicked", { stage: noCount + 1 });
    const btn = noButtonRef.current;
    if (btn) {
      btn.classList.remove("shake");
      void btn.offsetWidth;
      btn.classList.add("shake");
    }
    setNoCount((c) => c + 1);
  };

  const handleYes = () => {
    track("yes_clicked");
    router.push("/destinations");
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Rose",
          answers: FEEDBACK_QUESTIONS.map((question, i) => ({
            question,
            answer: answers[i],
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      track("feedback_submitted");
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again?"
      );
    } finally {
      setLoading(false);
    }
  };

  // Final state: the lights go out.
  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <p className="text-center text-2xl md:text-3xl font-bold text-white/90 leading-snug max-w-md">
          You just missed the best trip of your life.
        </p>
      </main>
    );
  }

  // Third no: stop persuading, start listening.
  if (noCount >= 3) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5F0] px-6 py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4704F]" />

        <div className="max-w-xl w-full">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C4704F] mb-4 text-center">
            Ok, point taken
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] leading-tight mb-4 text-center">
            Marco is surprised — but ready to improve.
          </h1>
          <p className="text-[#6B6B6B] text-lg mb-10 text-center max-w-md mx-auto">
            Tell him why it&apos;s a no, and what would make the next version a yes.
            Your answers go straight to Marco.
          </p>

          <form onSubmit={handleSubmitFeedback} className="space-y-6">
            {FEEDBACK_QUESTIONS.map((question, i) => (
              <div key={i}>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
                  {i + 1}. {question}
                </label>
                <textarea
                  value={answers[i]}
                  onChange={(e) =>
                    setAnswers((prev) => {
                      const next = [...prev];
                      next[i] = e.target.value;
                      return next;
                    })
                  }
                  rows={2}
                  className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] placeholder-[#ABABAB] resize-none focus:outline-none focus:border-[#C4704F] transition-colors bg-white"
                  placeholder="Your honest answer..."
                />
              </div>
            ))}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C4704F] text-white font-bold rounded-xl hover:bg-[#A85E3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? "Sending..." : "Send Marco my feedback →"}
            </button>
          </form>
        </div>
      </main>
    );
  }

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

        <p className="text-[#6B6B6B] text-lg mb-8 max-w-sm mx-auto">
          No pressure. Just good vibes, good food, and a change of scenery.
        </p>

        {/* Persuasion message after each no */}
        <div className="h-14 mb-4 flex items-center justify-center">
          {noCount > 0 && (
            <p className="text-[#C4704F] font-semibold text-lg max-w-md mx-auto">
              {NO_MESSAGES[noCount - 1]}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleYes}
            className="px-10 py-4 bg-[#C4704F] text-white text-lg font-bold rounded-xl hover:bg-[#A85E3E] transition-colors shadow-sm"
          >
            Yes, let&apos;s go! 🌍
          </button>

          <button
            ref={noButtonRef}
            onClick={handleNo}
            className="px-10 py-4 border-2 border-[#1C1C1C] text-[#1C1C1C] text-lg rounded-xl hover:bg-[#F0EBE3] transition-all cursor-pointer"
          >
            {noCount === 0
              ? "No thanks"
              : noCount === 1
              ? "Still no 🤔"
              : "Really, no 😅"}
          </button>
        </div>

        <a
          href="/why"
          className="inline-block mt-8 text-sm text-[#ABABAB] hover:text-[#C4704F] transition-colors underline underline-offset-4 decoration-[#D8CFC2]"
        >
          psst… why did I build you a whole website? →
        </a>
      </div>

      <p className="absolute bottom-6 text-xs text-[#ABABAB]">
        Made with care by Marco
      </p>
    </main>
  );
}
