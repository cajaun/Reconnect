import { useMemo } from "react";
import { allPuzzles } from "@/data/puzzle-data";

export const useFormattedUnlockedPuzzles = (
  unlockedPuzzles: Record<string, any>
) => {
  return useMemo(() => {
    const unlockedIds = Object.keys(unlockedPuzzles).map(Number);
    const unlockedSet = new Set(unlockedIds);

    const formatted = allPuzzles
      .filter((puzzle) => unlockedSet.has(puzzle.id))
      .map((puzzle) => ({
        ...puzzle,
        id: String(puzzle.id),
      }));

 
    const nextPuzzleId = Math.max(...unlockedIds, 0) + 1;
    const nextPuzzle = allPuzzles.find((p) => p.id === nextPuzzleId);

    if (nextPuzzle) {
      formatted.push({
        ...nextPuzzle,
        id: String(nextPuzzle.id),
      });
    }

    return formatted;
  }, [unlockedPuzzles]);
};
