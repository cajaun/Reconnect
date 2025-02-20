import { Difficulty } from "./difficulty";

export type Word = {
  id: string;
  word: string;
  difficulty: Difficulty;
  puzzleId: string;
};

export type Category = {
  description: string;
  difficulty: Difficulty;
};

export type Puzzle = {
  categories: Category[];
  name: string;
  words: Word[];
};

export type Guess = {
  words: Word[];
  correct: boolean;
};