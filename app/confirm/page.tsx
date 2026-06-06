import Link from "next/link";
import { ConfirmForm } from "@/components/ConfirmForm";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{
    destination?: string;
    weekend?: string;
    note?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#F9F5F0] py-16 px-4 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C4704F]" />

      <div className="max-w-lg mx-auto">
        <Link
          href="/destinations"
          className="text-xs font-semibold uppercase tracking-widest text-[#ABABAB] hover:text-[#C4704F] transition-colors mb-8 inline-block"
        >
          ← Back to destinations
        </Link>

        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">
          Almost there!
        </h1>
        <p className="text-[#6B6B6B] mb-8">
          Leave your email and Marco will be in touch to confirm the details.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <ConfirmForm
            initialDestinationId={params.destination ?? ""}
            initialWeekendId={params.weekend ?? ""}
            initialParisNote={params.note ?? ""}
          />
        </div>
      </div>
    </main>
  );
}
