import Link from "next/link";

const QUALITIES = [
  "Kind",
  "Intelligent",
  "Sporty & outdoorsy",
  "Excellent taste in nerdy, sporty mathematicians ;)",
];

export default function WhyPage() {
  return (
    <main className="min-h-screen bg-[#F9F5F0] px-6 py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4704F]" />

      <div className="max-w-xl mx-auto">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-widest text-[#ABABAB] hover:text-[#C4704F] transition-colors mb-8 inline-block"
        >
          ← Back
        </Link>

        <p className="text-sm font-semibold uppercase tracking-widest text-[#C4704F] mb-4">
          Why this website exists
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] leading-tight mb-6">
          I don&apos;t build a whole website for just anyone.
        </h1>

        <div className="space-y-4 text-[#444] text-lg leading-relaxed mb-8">
          <p>
            Confession: long-distance chatting is not easy. But somehow your
            spontaneity and your messages made me smile every single time — so I
            did what any self-respecting nerd does when something seems
            promising. I ran the analysis.
          </p>
          <p>The results were... conclusive.</p>
        </div>

        {/* Geeky "evaluation" card */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 font-mono text-sm text-[#E8E4DC] shadow-sm mb-8">
          <p className="text-[#8FB89B] mb-4">
            <span className="text-[#ABABAB]">$</span> ./evaluate --candidate=&quot;Rose&quot;
          </p>
          <ul className="space-y-2">
            {QUALITIES.map((q) => (
              <li key={q} className="flex items-start gap-2">
                <span className="text-[#8FB89B]">✓</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[#E8E4DC]">
            <span className="text-[#ABABAB]">&gt;</span> match confidence:{" "}
            <span className="text-[#E0A05E] font-bold">99.9%</span>
          </p>
          <p className="text-[#E8E4DC]">
            <span className="text-[#ABABAB]">&gt;</span> recommendation:{" "}
            <span className="text-[#C4704F] font-bold">take the weekend getaway.</span>
          </p>
        </div>

        <p className="text-[#444] text-lg leading-relaxed mb-10">
          So consider this my token of appreciation — built the only way a sporty
          mathematician knows how: with a little code, a little maths, and a lot
          of looking forward to it. 🤓
        </p>

        <Link
          href="/destinations"
          className="inline-block px-10 py-4 bg-[#C4704F] text-white text-lg font-bold rounded-xl hover:bg-[#A85E3E] transition-colors shadow-sm"
        >
          Ok, show me the trips 🌍
        </Link>
      </div>
    </main>
  );
}
