export type PuzzleListItem = {
  id: string;
  date: string;
  categories: {
    description: string;
    difficulty: string;
  }[];
  words: {
    id: string;
    word: string;
    difficulty: string;
    puzzleId: string;
  }[];
};
