import { createContext, useContext, type ReactNode } from "react";
import { usePuzzleLogic } from "@/hooks/use-puzzle-logic";
import { Puzzle, Word } from "@/types/puzzle";



type PuzzleContextValues = ReturnType<typeof usePuzzleLogic>;

const PuzzleContext = createContext<PuzzleContextValues | null>(null);

export const PuzzleContextProvider = ({
  children,
  puzzle,
  initialShuffle,
}: {
  children: ReactNode;
  puzzle: Puzzle;
  initialShuffle: Word[];
}) => {
  const puzzleLogic = usePuzzleLogic(puzzle, initialShuffle);

  return (
    <PuzzleContext.Provider value={puzzleLogic}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context)
    throw new Error("usePuzzle must be used within a PuzzleContextProvider");
  return context;
};
