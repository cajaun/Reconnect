export type Difficulty = (typeof difficultyArray)[number];

export const difficultyArray = [
  "Straightforward",
  "Medium",
  "Difficult",
  "Tricky",
] as const;

export const difficultyToColor: Record<Difficulty, string> = {
  [difficultyArray[0]]: "#F9DF6D",
  [difficultyArray[1]]: "#A0C35A",
  [difficultyArray[2]]: "#B0C4EF",
  [difficultyArray[3]]: "#BA81C5",
};


export const difficultyToEmoji: Record<Difficulty, string> = {
  [difficultyArray[0]]: "🟨",
  [difficultyArray[1]]: "🟩",
  [difficultyArray[2]]: "🟦",
  [difficultyArray[3]]: "🟪",
};
