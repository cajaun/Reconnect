import AsyncStorage from '@react-native-async-storage/async-storage';
import { allPuzzles } from './puzzle-data';

const FIRST_LAUNCH_KEY = 'hasLaunchedBefore';
const UNLOCKED_PUZZLES_KEY = 'unlockedPuzzles';

export async function initializePuzzlesOnFirstLaunch(): Promise<number[]> {
  const hasLaunched = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
  console.log('hasLaunched:', hasLaunched);

  if (hasLaunched) {
    const unlocked = await AsyncStorage.getItem(UNLOCKED_PUZZLES_KEY);
    console.log('Previously unlocked:', unlocked);
    return unlocked ? JSON.parse(unlocked) : [];
  }

  let today = new Date(); // actual current date

  // Override for testing/demo to June 15 of current year
  today = new Date(today.getFullYear(), 5, 15); // month is zero-based: 5 = June
  
  const currentDay = today.getDate(); // This will be 15

  console.log('Unlocking puzzles up to day:', currentDay);

  const unlockedIds = allPuzzles
    .slice(0, currentDay)
    .map(p => p.id);

  console.log(`Unlocked puzzle IDs as of ${today.toDateString()}:`, unlockedIds);

  await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
  await AsyncStorage.setItem(UNLOCKED_PUZZLES_KEY, JSON.stringify(unlockedIds));

  return unlockedIds;
}
