import { Guess, Word } from "@/types/puzzle";

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const shuffle = <T>(array: T[], startIndex = 0) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > startIndex; i--) {
    const j = Math.floor(Math.random() * (i + 1 - startIndex)) + startIndex;
    [newArray[i], newArray[j]] = [newArray[j]!, newArray[i]!];
  }
  return newArray;
};

export const applyCorrectGuessesToShuffledWords = (
  shuffledWords: Word[],
  correctGuesses: Guess[]
): Word[] => {
  const newShuffled = [...shuffledWords];

  correctGuesses.forEach((guess, rowIndex) => {
    guess.words.forEach((word, i) => {
      const fromIndex = newShuffled.findIndex((w) => w.id === word.id);
      const toIndex = rowIndex * 4 + i;

      if (fromIndex !== -1 && fromIndex !== toIndex) {
        [newShuffled[toIndex], newShuffled[fromIndex]] = [
          newShuffled[fromIndex],
          newShuffled[toIndex],
        ];
      }
    });
  });

  return newShuffled;
};

export const shuffleUnsolvedWords = (
  shuffledWords: Word[],
  correctGuesses: Guess[]
): Word[] => {
  const solvedCount = correctGuesses.length * 4;
  const solved = shuffledWords.slice(0, solvedCount);
  const unsolved = shuffledWords.slice(solvedCount);

  const shuffledUnsolved = shuffle(unsolved, 0);

  return [...solved, ...shuffledUnsolved];
};

export const getPuzzleWordLayout = (
  shuffledWords: Word[],
  correctGuesses: Guess[]
) => {
  
  const solvedGroups = correctGuesses
    .filter((group) => group.correct)
    .map((group, index) => {
      const difficulty = group.words?.[0]?.difficulty;
      return {
        correct: group,
        difficulty,
        row: index,
      };
    });

  const solvedWordIds = correctGuesses.flatMap((g) => g.words.map((w) => w.id));

  const unsolvedWords = shuffledWords.filter(
    (word) => !solvedWordIds.includes(word.id)
  );

  const occupiedRows = new Set(solvedGroups.map((group) => group.row));

  const unsolvedWordsWithIndex = shuffledWords
    .map((word, index) => ({ word, index }))
    .filter(({ word }) => !solvedWordIds.includes(word.id));

  const adjustedWordPositions: {
    word: (typeof unsolvedWords)[0]; // coudl also be  word: Word;
    row: number;
    col: number;
  }[] = [];

  let currentRow = 0;
  let wordIndex = 0;

  while (wordIndex < unsolvedWordsWithIndex.length) {
    if (occupiedRows.has(currentRow)) {
      currentRow++;
      continue;
    }
    for (
      let col = 0;
      col < 4 && wordIndex < unsolvedWordsWithIndex.length;
      col++
    ) {
      const { word } = unsolvedWordsWithIndex[wordIndex];
      adjustedWordPositions.push({
        word,
        row: currentRow,
        col,
      });
      wordIndex++;
    }
    currentRow++;
  }

  return {
    solvedGroups,
    adjustedWordPositions,
    solvedWordIds,
  };
};
