import { useEffect, useState } from "react";
import { calculateUnlockDate } from "@/utils/dates-manager";

export const usePuzzleCountdown = (
  startDate: string | null,
  puzzleId: number,
  unlockDate: Date | null
) => {
  const [countdown, setCountdown] = useState("");
  
  const isNextToUnlock = (() => {
    if (!startDate || !unlockDate) return false;
    const previousUnlock = calculateUnlockDate(startDate, puzzleId - 1);
    return previousUnlock <= new Date() && unlockDate > new Date();
  })();

  useEffect(() => {
    if (!isNextToUnlock || !unlockDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const diff = unlockDate.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown("");
        return;
      }

      const minutes = Math.ceil(diff / (1000 * 60));
      if (minutes < 60) {
        setCountdown(`${minutes} ${minutes === 1 ? "min" : "mins"}`);
      } else {
        const hours = Math.ceil(diff / (1000 * 60 * 60));
        setCountdown(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isNextToUnlock, unlockDate]);

  return { countdown, isNextToUnlock };
};
