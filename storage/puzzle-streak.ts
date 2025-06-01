import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./keys";
import { getAllPuzzleData } from "./puzzle-data";
import { getFormattedDate } from "@/utils/dates-manager";

function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export const getCurrentStreak = async (): Promise<number> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETION_DATES);
    const dates: string[] = json ? JSON.parse(json) : [];
    const completedSet = new Set(dates);

    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);

    while (true) {
      const dateStr = getFormattedDate(current);
      if (completedSet.has(dateStr)) {
        streak++;
        current = subDays(current, 1);
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error("Failed to get current streak:", error);
    return 0;
  }
};

export const updateLongestStreak = async (
  currentStreak: number
): Promise<void> => {
  try {
    const longestStr = await AsyncStorage.getItem(STORAGE_KEYS.LONGEST_STREAK);
    const longest = longestStr ? parseInt(longestStr, 10) : 0;

    if (currentStreak > longest) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.LONGEST_STREAK,
        currentStreak.toString()
      );
    }
  } catch (error) {
    console.error("Error updating longest streak:", error);
  }
};

export const getLongestStreak = async (): Promise<number> => {
  try {
    const longestStr = await AsyncStorage.getItem(STORAGE_KEYS.LONGEST_STREAK);
    return longestStr ? parseInt(longestStr, 10) : 0;
  } catch (error) {
    console.error("Error fetching longest streak:", error);
    return 0;
  }
};

export const getCompletedDatesSet = async (): Promise<Set<string>> => {
  try {
    const datesStr = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETION_DATES);
    if (!datesStr) return new Set();

    const datesArr: string[] = JSON.parse(datesStr);
    return new Set(datesArr);
  } catch (error) {
    console.error("Failed to get completed dates set:", error);
    return new Set();
  }
};