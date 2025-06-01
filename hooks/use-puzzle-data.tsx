import { useState, useEffect } from "react";
import {
  unlockPuzzles,
  getUnlockedPuzzles,
  getStartDate,
} from "@/storage/puzzle-init";

export function usePuzzleData() {
  const [unlockedPuzzles, setUnlockedPuzzles] = useState<{
    [key: number]: boolean;
  }>({});
  const [startDate, setStartDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await unlockPuzzles();
      const puzzles = await getUnlockedPuzzles();
      setUnlockedPuzzles(puzzles);

      const storedStartDate = await getStartDate();
      setStartDate(storedStartDate);
    };

    fetchData();
  }, []);

  return { unlockedPuzzles, startDate };
}
