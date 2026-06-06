import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5F0] px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4704F]" />

      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">🌍</div>

        <p className="text-sm font-semibold uppercase tracking-widest text-[#C4704F] mb-4">
          You&apos;re in
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4">
          Rose, you&apos;re the best.
          <br />
          See you there.
        </h1>

        <p className="text-[#6B6B6B] text-lg mb-10">
          A confirmation is on its way to your inbox. Marco will follow up with
          the details soon — get excited.
        </p>

        <Link
          href="/"
          className="text-sm font-semibold text-[#C4704F] hover:underline"
        >
          ← Back to the beginning
        </Link>
      </div>

      <p className="absolute bottom-6 text-xs text-[#ABABAB]">
        Made with care by Marco
      </p>
    </main>
  );
}
