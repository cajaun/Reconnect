import { useMemo } from "react";
import { allPuzzles } from "@/data/puzzle-data";

export const useFormattedUnlockedPuzzles = (unlockedPuzzles: Record<string, any>) => {
  return useMemo(() => {
    const unlockedSet = new Set(Object.keys(unlockedPuzzles).map(Number));
    return allPuzzles
      .filter((puzzle) => unlockedSet.has(puzzle.id))
      .map((puzzle) => ({
        ...puzzle,
        id: String(puzzle.id),
      }));
  }, [unlockedPuzzles]);
};
