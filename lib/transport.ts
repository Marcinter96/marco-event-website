import { format } from "date-fns";

export interface TransportLink {
  label: string;
  href: string;
  emoji: string;
}

// CFF/SBB online timetable deeplink (French site). The webshop reads the
// `von`/`nach`/`datum` query params and pre-fills the search. Date format is
// DD.MM.YYYY. Station names are fuzzy-matched, so plain city names resolve.
function cffTrainLink(from: string, to: string, weekendStart: Date): string {
  const datum = format(weekendStart, "dd.MM.yyyy");
  const params = new URLSearchParams({
    von: from,
    nach: to,
    datum,
    suche: "true",
  });
  return `https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml?${params.toString()}`;
}

export function getTransportLink(
  destinationId: string,
  weekendStart: Date
): TransportLink | null {
  // Skyscanner format: YYMMDD
  const skyscannerDate = format(weekendStart, "yyMMdd");

  switch (destinationId) {
    case "zurich":
      return {
        emoji: "🚆",
        label: "Paris → Zurich by train",
        href: cffTrainLink("Paris", "Zürich", weekendStart),
      };
    case "crans":
      return {
        emoji: "🚆",
        label: "Paris → Geneva by train",
        href: cffTrainLink("Paris", "Genève", weekendStart),
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
