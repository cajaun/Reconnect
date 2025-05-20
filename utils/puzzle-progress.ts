import { Guess } from "@/types/puzzle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_KEY = "puzzleProgress";

export type PuzzleProgress = {
  completed: boolean;
  mistakes: number;
  guesses: Guess[];
  lastUpdated: number;
};

export const savePuzzleProgress = async (
  puzzleId: number,
  progress: Partial<PuzzleProgress>
): Promise<void> => {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    const allProgress: Record<number, PuzzleProgress> = raw ? JSON.parse(raw) : {};

    const existing = allProgress[puzzleId] || { completed: false, mistakes: 0, guesses: [], lastUpdated: 0 };

    allProgress[puzzleId] = {
      ...existing,
      ...progress,
      lastUpdated: Date.now(),
    };

    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error("Error saving puzzle progress:", error);
  }
};

export const getPuzzleProgress = async (
  puzzleId: number
): Promise<PuzzleProgress | null> => {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;

    const allProgress: Record<number, PuzzleProgress> = JSON.parse(raw);
    return allProgress[puzzleId] || null;
  } catch (error) {
    console.error("Error fetching puzzle progress:", error);
    return null;
  }
};

export const getAllPuzzleProgress = async (): Promise<Record<number, PuzzleProgress>> => {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Error fetching all puzzle progress:", error);
    return {};
  }
};
