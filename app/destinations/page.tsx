import Link from "next/link";
import { destinations } from "@/lib/destinations";
import { DestinationCard } from "@/components/DestinationCard";

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#F9F5F0]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4704F]" />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-widest text-[#ABABAB] hover:text-[#C4704F] transition-colors mb-6 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mt-2">
            Pick your destination
          </h1>
          <p className="text-[#6B6B6B] mt-3 text-lg">
            Browse the options, pick a weekend, and hit{" "}
            <span className="font-semibold text-[#C4704F]">I&apos;m in</span>.
          </p>
        </div>

        {/* How it works */}
        <div className="flex gap-6 justify-center flex-wrap mb-12">
          {[
            { step: "1", label: "Browse destinations" },
            { step: "2", label: "Pick a weekend" },
            { step: "3", label: "Hit “I’m in”" },
          ].map(({ step, label }) => (
            <div key={step} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <span className="w-6 h-6 rounded-full bg-[#C4704F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {step}
              </span>
              {label}
            </div>
          ))}
        </div>

        {/* Destination grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </main>
  );
}
