export interface Weekend {
  id: string;
  start: Date;
  end: Date;
  label: string;
}

export const availableWeekends: Weekend[] = [
  { id: "2026-06-12", start: new Date(2026, 5, 12), end: new Date(2026, 5, 14), label: "June 12–14" },
  { id: "2026-06-19", start: new Date(2026, 5, 19), end: new Date(2026, 5, 21), label: "June 19–21" },
  { id: "2026-06-26", start: new Date(2026, 5, 26), end: new Date(2026, 5, 28), label: "June 26–28" },
  { id: "2026-07-17", start: new Date(2026, 6, 17), end: new Date(2026, 6, 19), label: "July 17–19" },
  { id: "2026-07-24", start: new Date(2026, 6, 24), end: new Date(2026, 6, 26), label: "July 24–26" },
];
