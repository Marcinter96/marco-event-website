"use client";

import { DayPicker } from "react-day-picker";
import { eachDayOfInterval } from "date-fns";
import { availableWeekends, type Weekend } from "@/lib/weekends";

interface Props {
  selectedWeekend: Weekend | null;
  onSelect: (weekend: Weekend | null) => void;
}

const allAllowedDays = availableWeekends.flatMap((w) =>
  eachDayOfInterval({ start: w.start, end: w.end })
);

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getWeekendForDate(date: Date): Weekend | null {
  return (
    availableWeekends.find(
      (w) =>
        date.getTime() >= w.start.getTime() &&
        date.getTime() <= w.end.getTime()
    ) ?? null
  );
}

export function WeekendCalendar({ selectedWeekend, onSelect }: Props) {
  const isDisabled = (date: Date): boolean =>
    !allAllowedDays.some((d) => isSameDay(d, date));

  const selectedDays = selectedWeekend
    ? eachDayOfInterval({ start: selectedWeekend.start, end: selectedWeekend.end })
    : [];

  return (
    <div>
      <DayPicker
        onDayClick={(date) => {
          if (isDisabled(date)) return;
          onSelect(getWeekendForDate(date));
        }}
        disabled={isDisabled}
        modifiers={selectedDays.length > 0 ? { selected: selectedDays } : {}}
        modifiersStyles={{
          selected: {
            backgroundColor: "#C4704F",
            color: "white",
            borderRadius: "4px",
          },
        }}
        startMonth={new Date(2026, 5, 1)}
        endMonth={new Date(2026, 7, 31)}
        defaultMonth={new Date(2026, 5, 1)}
      />
      {selectedWeekend && (
        <p className="text-sm text-[#C4704F] font-medium mt-1 text-center">
          ✓ {selectedWeekend.label} selected
        </p>
      )}
    </div>
  );
}
