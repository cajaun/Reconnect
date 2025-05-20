
import AsyncStorage from '@react-native-async-storage/async-storage';

const puzzleKey = (id: number) => `connections:puzzle:${id}`;
const streakKey = 'connections:streak';

export const markPuzzleComplete = async (id: number) => {
  const today = new Date().toISOString();
  const data = { status: 'completed', completedAt: today, mistakes: [] };
  await AsyncStorage.setItem(puzzleKey(id), JSON.stringify(data));
  await updateStreak(today);
};

export const saveMistake = async (id: number, mistake: string) => {
  const key = puzzleKey(id);
  const existing = await AsyncStorage.getItem(key);
  let data = existing ? JSON.parse(existing) : { status: 'in-progress', mistakes: [] };
  data.status = 'in-progress';
  data.mistakes = [...new Set([...(data.mistakes || []), mistake])];
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getPuzzleStatus = async (id: number) => {
  const data = await AsyncStorage.getItem(puzzleKey(id));
  return data ? JSON.parse(data) : null;
};

export const resetPuzzle = async (id: number) => {
  await AsyncStorage.removeItem(puzzleKey(id));
};

export const getAllPuzzleStatuses = async (maxId: number) => {
  const result: Record<number, any> = {};
  for (let id = 1; id <= maxId; id++) {
    const val = await getPuzzleStatus(id);
    result[id] = val;
  }
  return result;
};


const updateStreak = async (todayIso: string) => {
  const prev = await AsyncStorage.getItem(streakKey);
  const today = todayIso.split('T')[0];
  if (!prev) {
    await AsyncStorage.setItem(streakKey, JSON.stringify({ last: today, count: 1 }));
    return;
  }

  const parsed = JSON.parse(prev);
  const yesterday = new Date(new Date(todayIso).setDate(new Date(todayIso).getDate() - 1)).toISOString().split('T')[0];

  let count = parsed.count;
  if (parsed.last === yesterday) count += 1;
  else if (parsed.last !== today) count = 1;

  await AsyncStorage.setItem(streakKey, JSON.stringify({ last: today, count }));
};

export const getStreak = async () => {
  const val = await AsyncStorage.getItem(streakKey);
  return val ? JSON.parse(val).count : 0;
};
