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
  id: number; 
  date: string; 
  categories: Category[];
  words: Word[];
};

export type Guess = {
  words: Word[];
  correct: boolean;
};