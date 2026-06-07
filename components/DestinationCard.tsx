"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { track } from "@vercel/analytics";
import { type Destination } from "@/lib/destinations";
import { type Weekend } from "@/lib/weekends";
import { getTransportLink } from "@/lib/transport";
import { Modal } from "./Modal";
import { WeekendCalendar } from "./WeekendCalendar";

interface Props {
  destination: Destination;
}

export function DestinationCard({ destination }: Props) {
  const [showAbout, setShowAbout] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedWeekend, setSelectedWeekend] = useState<Weekend | null>(null);
  const [parisNote, setParisNote] = useState("");

  const transportLink = selectedWeekend
    ? getTransportLink(destination.id, selectedWeekend.start)
    : null;

  const confirmUrl = selectedWeekend
    ? `/confirm?destination=${destination.id}&weekend=${format(selectedWeekend.start, "yyyy-MM-dd")}${
        destination.isRosesCity && parisNote
          ? `&note=${encodeURIComponent(parisNote)}`
          : ""
      }`
    : null;

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        {/* Hero image */}
        <div className="relative h-52 overflow-hidden bg-[#E5E0D8]">
          <Image
            src={destination.heroImage}
            alt={destination.city}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Header */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C4704F]">
              {destination.tag}
            </span>
            <h2 className="text-xl font-bold text-[#1C1C1C] mt-1">
              {destination.name}
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-1">{destination.tagline}</p>
          </div>

          {/* About / Photos buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                track("plan_opened", { destination: destination.id });
                setShowAbout(true);
              }}
              className="px-4 py-2 text-sm font-medium border border-[#E5E0D8] rounded-lg hover:bg-[#F0EBE3] hover:border-[#C4704F] transition-colors text-[#1C1C1C]"
            >
              The plan
            </button>
            <button
              onClick={() => {
                track("photos_opened", { destination: destination.id });
                setShowPhotos(true);
              }}
              className="px-4 py-2 text-sm font-medium border border-[#E5E0D8] rounded-lg hover:bg-[#F0EBE3] hover:border-[#C4704F] transition-colors text-[#1C1C1C]"
            >
              Photos
            </button>
          </div>

          {/* Paris special: she fills in the plan */}
          {destination.isRosesCity && (
            <div>
              <p className="text-sm font-medium text-[#1C1C1C] mb-2">
                It's your city — what would we do? 🗺️
              </p>
              <textarea
                value={parisNote}
                onChange={(e) => setParisNote(e.target.value)}
                placeholder="The best restaurant you know, a secret spot, a Sunday market..."
                className="w-full text-sm border border-[#E5E0D8] rounded-xl p-3 text-[#1C1C1C] placeholder-[#ABABAB] resize-none focus:outline-none focus:border-[#C4704F] transition-colors"
                rows={3}
              />
            </div>
          )}

          {/* Calendar */}
          <div>
            <p className="text-sm font-semibold text-[#1C1C1C] mb-2">
              📅 Pick a weekend:
            </p>
            <WeekendCalendar
              selectedWeekend={selectedWeekend}
              onSelect={(weekend) => {
                if (weekend) {
                  track("weekend_selected", {
                    destination: destination.id,
                    weekend: weekend.id,
                  });
                }
                setSelectedWeekend(weekend);
              }}
            />
          </div>

          {/* Transport link */}
          {transportLink && (
            <a
              href={transportLink.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("transport_clicked", { destination: destination.id })
              }
              className="text-sm text-[#C4704F] hover:underline flex items-center gap-2 font-medium"
            >
              {transportLink.emoji} {transportLink.label} →
            </a>
          )}
          {destination.isRosesCity && selectedWeekend && (
            <p className="text-sm text-[#6B6B6B] italic">
              Marco will handle his own travel — you just show up 😄
            </p>
          )}

          {/* I'm in button */}
          <div className="mt-auto pt-2">
            {confirmUrl ? (
              <Link
                href={confirmUrl}
                onClick={() =>
                  track("destination_chosen", {
                    destination: destination.id,
                    weekend: selectedWeekend?.id ?? "",
                  })
                }
                className="block text-center px-6 py-3 bg-[#C4704F] text-white font-semibold rounded-xl hover:bg-[#A85E3E] transition-colors"
              >
                I'm in →
              </Link>
            ) : (
              <p className="text-sm text-[#ABABAB] text-center py-3">
                Select a weekend to continue
              </p>
            )}
          </div>
        </div>
      </div>

      {/* About modal */}
      {showAbout && (
        <Modal
          onClose={() => setShowAbout(false)}
          title={destination.isRosesCity ? "Your call, your city" : `The plan: ${destination.city}`}
        >
          {destination.isRosesCity ? (
            <div className="space-y-4 text-[#1C1C1C]">
              <p className="text-[#6B6B6B]">
                You know Paris better than anyone — this weekend is yours to
                design. Fill in the card below with what you'd want to do and
                Marco will make it happen.
              </p>
              <p className="text-sm text-[#C4704F] font-medium">
                Marco only asks for one thing: at least one good croissant.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {destination.about.map((item, i) => (
                <li key={i} className="flex gap-3 text-[#1C1C1C]">
                  <span className="text-[#C4704F] font-bold shrink-0 mt-0.5">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}

      {/* Photos modal */}
      {showPhotos && (
        <Modal
          onClose={() => setShowPhotos(false)}
          title={`${destination.city} — a taste`}
        >
          <div className="grid grid-cols-2 gap-3">
            {destination.photos.map((photo, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#E5E0D8]"
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
