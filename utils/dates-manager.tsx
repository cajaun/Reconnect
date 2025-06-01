export const calculateUnlockDate = (startDate: string, puzzleId: number): Date => {
  const [year, month, day] = startDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  start.setDate(start.getDate() + (puzzleId - 1));
  return start;
};

export const getUnlockedDateInfo = (
  startDate: string | null,
  puzzleId: number,
  truncate: boolean = true
) => {
  if (!startDate) {
    return { unlockDate: null, dayName: "", dayNumber: null, monthName: "" };
  }

  const unlockDate = calculateUnlockDate(startDate, puzzleId);

  const dayName = unlockDate
    ? unlockDate.toLocaleDateString("en-US", {
        weekday: truncate ? "short" : "long",
      })
    : "";

  const dayNumber = unlockDate ? unlockDate.getDate() : null;

  const monthName = unlockDate
    ? unlockDate.toLocaleDateString("en-US", {
        month: truncate ? "short" : "long",
      })
    : "";

  return { unlockDate, dayName, dayNumber, monthName };
};

export const getFormattedDate = (date: Date): string => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0); 
  return `${normalized.getFullYear()}-${String(normalized.getMonth() + 1).padStart(2, "0")}-${String(normalized.getDate()).padStart(2, "0")}`;
};
