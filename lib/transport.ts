import { format } from "date-fns";

export interface TransportLink {
  label: string;
  href: string;
  emoji: string;
}

export function getTransportLink(
  destinationId: string,
  weekendStart: Date
): TransportLink | null {
  const omioDate = format(weekendStart, "yyyy-MM-dd");
  // Skyscanner format: YYMMDD
  const skyscannerDate = format(weekendStart, "yyMMdd");

  switch (destinationId) {
    case "zurich":
      return {
        emoji: "🚆",
        label: "Paris → Zurich by train",
        href: `https://www.omio.com/results/Paris/Zurich/${omioDate}?adults=1`,
      };
    case "crans":
      return {
        emoji: "🚆",
        label: "Paris → Geneva by train",
        href: `https://www.omio.com/results/Paris/Geneva/${omioDate}?adults=1`,
      };
    case "milan":
      return {
        emoji: "✈️",
        label: "Paris → Milan by plane",
        href: `https://www.skyscanner.net/transport/flights/par/mil/${skyscannerDate}/`,
      };
    case "paris":
      return null;
    default:
      return null;
  }
}
