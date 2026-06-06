"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { destinations } from "@/lib/destinations";
import { availableWeekends } from "@/lib/weekends";

interface Props {
  initialDestinationId: string;
  initialWeekendId: string;
  initialParisNote: string;
}

export function ConfirmForm({
  initialDestinationId,
  initialWeekendId,
  initialParisNote,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState("Rose");
  const [email, setEmail] = useState("");
  const [destinationId, setDestinationId] = useState(initialDestinationId);
  const [weekendId, setWeekendId] = useState(initialWeekendId);
  const [parisNote, setParisNote] = useState(initialParisNote);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedDestination = destinations.find((d) => d.id === destinationId);
  const selectedWeekend = availableWeekends.find((w) => w.id === weekendId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !destinationId || !weekendId) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          destinationId,
          weekendId,
          parisNote,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#C4704F] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
          Your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] placeholder-[#ABABAB] focus:outline-none focus:border-[#C4704F] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
          Destination
        </label>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          required
          className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#C4704F] transition-colors bg-white"
        >
          <option value="">Select a destination...</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
          Weekend
        </label>
        <select
          value={weekendId}
          onChange={(e) => setWeekendId(e.target.value)}
          required
          className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] focus:outline-none focus:border-[#C4704F] transition-colors bg-white"
        >
          <option value="">Select a weekend...</option>
          {availableWeekends.map((w) => (
            <option key={w.id} value={w.id}>
              {w.label}
            </option>
          ))}
        </select>
      </div>

      {/* Paris note — show if Paris selected */}
      {selectedDestination?.isRosesCity && (
        <div>
          <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
            What would we do in Paris? 🗺️
          </label>
          <textarea
            value={parisNote}
            onChange={(e) => setParisNote(e.target.value)}
            placeholder="Your city, your plan — what would you want to show Marco?"
            rows={3}
            className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] placeholder-[#ABABAB] resize-none focus:outline-none focus:border-[#C4704F] transition-colors"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">
          Anything else? <span className="font-normal text-[#ABABAB]">(optional)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Questions, conditions, allergies..."
          rows={3}
          className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-[#1C1C1C] placeholder-[#ABABAB] resize-none focus:outline-none focus:border-[#C4704F] transition-colors"
        />
      </div>

      {/* Summary */}
      {selectedDestination && selectedWeekend && (
        <div className="bg-[#F0EBE3] rounded-xl px-4 py-3 text-sm text-[#1C1C1C]">
          <p className="font-semibold">Your pick:</p>
          <p className="text-[#6B6B6B] mt-1">
            {selectedDestination.name} · {selectedWeekend.label}
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !email || !destinationId || !weekendId}
        className="w-full py-4 bg-[#C4704F] text-white font-bold rounded-xl hover:bg-[#A85E3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? "Sending..." : "Count me in! →"}
      </button>
    </form>
  );
}
