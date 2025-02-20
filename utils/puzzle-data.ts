// Puzzle-Data.ts

import { Puzzle } from "@/types/puzzle";
import { Difficulty } from "@/types/difficulty";

export const puzzle1: Puzzle = {
  name: "Puzzle 1",
  categories: [
    {
      description: "WET WEATHER",
      difficulty: "Straightforward" as Difficulty,
    },
    {
      description: "NBA TEAMS",
      difficulty: "Medium" as Difficulty,
    },
    {
      description: "KEYBOARD KEYS",
      difficulty: "Difficult" as Difficulty,
    },
    {
      description: "PALINDROMES",
      difficulty: "Tricky" as Difficulty,
    },
  ],
  words: [
    { id: "word1", word: "HAIL", difficulty: "Straightforward", puzzleId: "puzzle-1" },
    { id: "word2", word: "RAIN", difficulty: "Straightforward", puzzleId: "puzzle-1" },
    { id: "word3", word: "SLEET", difficulty: "Straightforward", puzzleId: "puzzle-1" },
    { id: "word4", word: "SNOW", difficulty: "Straightforward", puzzleId: "puzzle-1" },
    { id: "word5", word: "BUCKS", difficulty: "Medium", puzzleId: "puzzle-1" },
    { id: "word6", word: "HEAT", difficulty: "Medium", puzzleId: "puzzle-1" },
    { id: "word7", word: "JAZZ", difficulty: "Medium", puzzleId: "puzzle-1" },
    { id: "word8", word: "NETS", difficulty: "Medium", puzzleId: "puzzle-1" },
    { id: "word9", word: "OPTION", difficulty: "Difficult", puzzleId: "puzzle-1" },
    { id: "word10", word: "RETURN", difficulty: "Difficult", puzzleId: "puzzle-1" },
    { id: "word11", word: "SHIFT", difficulty: "Difficult", puzzleId: "puzzle-1" },
    { id: "word12", word: "TAB", difficulty: "Difficult", puzzleId: "puzzle-1" },
    { id: "word13", word: "KAYAK", difficulty: "Tricky", puzzleId: "puzzle-1" },
    { id: "word14", word: "LEVEL", difficulty: "Tricky", puzzleId: "puzzle-1" },
    { id: "word15", word: "MOM", difficulty: "Tricky", puzzleId: "puzzle-1" },
    { id: "word16", word: "RACECAR", difficulty: "Tricky", puzzleId: "puzzle-1" },
  ],
};

export const puzzle2: Puzzle = {
  name: "Puzzle 2",
  categories: [
    {
      description: "FOOTWEAR",
      difficulty: "Straightforward" as Difficulty,
    },
    {
      description: "UNITS OF LENGTH",
      difficulty: "Medium" as Difficulty,
    },
    {
      description: "MAGAZINES",
      difficulty: "Difficult" as Difficulty,
    },
    {
      description: "LETTER HOMOPHONES",
      difficulty: "Tricky" as Difficulty,
    },
  ],
  words: [
    { id: "word1", word: "BOOT", difficulty: "Straightforward", puzzleId: "puzzle-2" },
    { id: "word2", word: "LOAFER", difficulty: "Straightforward", puzzleId: "puzzle-2" },
    { id: "word3", word: "PUMP", difficulty: "Straightforward", puzzleId: "puzzle-2" },
    { id: "word4", word: "SNEAKER", difficulty: "Straightforward", puzzleId: "puzzle-2" },
    { id: "word5", word: "FOOT", difficulty: "Medium", puzzleId: "puzzle-2" },
    { id: "word6", word: "LEAGUE", difficulty: "Medium", puzzleId: "puzzle-2" },
    { id: "word7", word: "MILE", difficulty: "Medium", puzzleId: "puzzle-2" },
    { id: "word8", word: "YARD", difficulty: "Medium", puzzleId: "puzzle-2" },
    { id: "word9", word: "ESSENCE", difficulty: "Difficult", puzzleId: "puzzle-2" },
    { id: "word10", word: "PEOPLE", difficulty: "Difficult", puzzleId: "puzzle-2" },
    { id: "word11", word: "TIME", difficulty: "Difficult", puzzleId: "puzzle-2" },
    { id: "word12", word: "US", difficulty: "Difficult", puzzleId: "puzzle-2" },
    { id: "word13", word: "ARE", difficulty: "Tricky", puzzleId: "puzzle-2" },
    { id: "word14", word: "QUEUE", difficulty: "Tricky", puzzleId: "puzzle-2" },
    { id: "word15", word: "SEA", difficulty: "Tricky", puzzleId: "puzzle-2" },
    { id: "word16", word: "WHY", difficulty: "Tricky", puzzleId: "puzzle-2" },
  ],
};

export const puzzle3: Puzzle = {
  name: "Puzzle 3",
  categories: [
    {
      description: "FACIAL FEATURES",
      difficulty: "Straightforward" as Difficulty,
    },
    {
      description: "SYNONYMS FOR EAT",
      difficulty: "Medium" as Difficulty,
    },
    {
      description: "DOG BREEDS, INFORMALLY",
      difficulty: "Difficult" as Difficulty,
    },
    {
      description: "MEMBERS OF A TRIO",
      difficulty: "Tricky" as Difficulty,
    },
  ],
  words: [
    { id: "word1", word: "CHEEK", difficulty: "Straightforward", puzzleId: "puzzle-3" },
    { id: "word2", word: "EYE", difficulty: "Straightforward", puzzleId: "puzzle-3" },
    { id: "word3", word: "MOUTH", difficulty: "Straightforward", puzzleId: "puzzle-3" },
    { id: "word4", word: "NOSE", difficulty: "Straightforward", puzzleId: "puzzle-3" },
    { id: "word5", word: "CHOW", difficulty: "Medium", puzzleId: "puzzle-3" },
    { id: "word6", word: "GOBBLE", difficulty: "Medium", puzzleId: "puzzle-3" },
    { id: "word7", word: "SCARF", difficulty: "Medium", puzzleId: "puzzle-3" },
    { id: "word8", word: "WOLF", difficulty: "Medium", puzzleId: "puzzle-3" },
    { id: "word9", word: "LAB", difficulty: "Difficult", puzzleId: "puzzle-3" },
    { id: "word10", word: "PEKE", difficulty: "Difficult", puzzleId: "puzzle-3" },
    { id: "word11", word: "PIT", difficulty: "Difficult", puzzleId: "puzzle-3" },
    { id: "word12", word: "POM", difficulty: "Difficult", puzzleId: "puzzle-3" },
    { id: "word13", word: "AMIGO", difficulty: "Tricky", puzzleId: "puzzle-3" },
    { id: "word14", word: "KING", difficulty: "Tricky", puzzleId: "puzzle-3" },
    { id: "word15", word: "STOOGE", difficulty: "Tricky", puzzleId: "puzzle-3" },
    { id: "word16", word: "TENOR", difficulty: "Tricky", puzzleId: "puzzle-3" },
  ],
};

export const puzzle4: Puzzle = {
  name: "Puzzle 4",
  categories: [
    {
      description: "SNEAKER BRANDS",
      difficulty: "Straightforward" as Difficulty,
    },
    {
      description: "MUSICALS BEGINNING WITH 'C'",
      difficulty: "Medium" as Difficulty,
    },
    {
      description: "CLEANING VERBS",
      difficulty: "Difficult" as Difficulty,
    },
    {
      description: "___ MAN SUPERHEROES",
      difficulty: "Tricky" as Difficulty,
    },
  ],
  words: [
    { id: "word1", word: "ADIDAS", difficulty: "Straightforward", puzzleId: "puzzle-4" },
    { id: "word2", word: "NIKE", difficulty: "Straightforward", puzzleId: "puzzle-4" },
    { id: "word3", word: "PUMA", difficulty: "Straightforward", puzzleId: "puzzle-4" },
    { id: "word4", word: "REEBOK", difficulty: "Straightforward", puzzleId: "puzzle-4" },
    { id: "word5", word: "CABARET", difficulty: "Medium", puzzleId: "puzzle-4" },
    { id: "word6", word: "CAROUSEL", difficulty: "Medium", puzzleId: "puzzle-4" },
    { id: "word7", word: "CATS", difficulty: "Medium", puzzleId: "puzzle-4" },
    { id: "word8", word: "CHICAGO", difficulty: "Medium", puzzleId: "puzzle-4" },
    { id: "word9", word: "DUST", difficulty: "Difficult", puzzleId: "puzzle-4" },
    { id: "word10", word: "MOP", difficulty: "Difficult", puzzleId: "puzzle-4" },
    { id: "word11", word: "SWEEP", difficulty: "Difficult", puzzleId: "puzzle-4" },
    { id: "word12", word: "VACUUM", difficulty: "Difficult", puzzleId: "puzzle-4" },
    { id: "word13", word: "BAT", difficulty: "Tricky", puzzleId: "puzzle-4" },
    { id: "word14", word: "IRON", difficulty: "Tricky", puzzleId: "puzzle-4" },
    { id: "word15", word: "SPIDER", difficulty: "Tricky", puzzleId: "puzzle-4" },
    { id: "word16", word: "SUPER", difficulty: "Tricky", puzzleId: "puzzle-4" },
  ],
};

export const puzzle5: Puzzle = {
  name: "Puzzle 5",
  categories: [
    {
      description: "STREAMING SERVICES",
      difficulty: "Straightforward" as Difficulty,
    },
    {
      description: "CONDIMENTS",
      difficulty: "Medium" as Difficulty,
    },
    {
      description: "ANCIENT CITIES",
      difficulty: "Difficult" as Difficulty,
    },
    {
      description: "MOUNTAIN RANGES",
      difficulty: "Tricky" as Difficulty,
    },
  ],
  words: [
    { id: "word1", word: "NETFLIX", difficulty: "Straightforward", puzzleId: "puzzle-5" },
    { id: "word2", word: "HULU", difficulty: "Straightforward", puzzleId: "puzzle-5" },
    { id: "word3", word: "DISNEY", difficulty: "Straightforward", puzzleId: "puzzle-5" },
    { id: "word4", word: "AMAZON", difficulty: "Straightforward", puzzleId: "puzzle-5" },
    { id: "word5", word: "MAYO", difficulty: "Medium", puzzleId: "puzzle-5" },
    { id: "word6", word: "MUSTARD", difficulty: "Medium", puzzleId: "puzzle-5" },
    { id: "word7", word: "KETCHUP", difficulty: "Medium", puzzleId: "puzzle-5" },
    { id: "word8", word: "SOYA", difficulty: "Medium", puzzleId: "puzzle-5" },
    { id: "word9", word: "ROME", difficulty: "Difficult", puzzleId: "puzzle-5" },
    { id: "word10", word: "ATHENS", difficulty: "Difficult", puzzleId: "puzzle-5" },
    { id: "word11", word: "CARTAGE", difficulty: "Difficult", puzzleId: "puzzle-5" },
    { id: "word12", word: "BABEL", difficulty: "Difficult", puzzleId: "puzzle-5" },
    { id: "word13", word: "HIMALAYAS", difficulty: "Tricky", puzzleId: "puzzle-5" },
    { id: "word14", word: "ANDES", difficulty: "Tricky", puzzleId: "puzzle-5" },
    { id: "word15", word: "ALPS", difficulty: "Tricky", puzzleId: "puzzle-5" },
    { id: "word16", word: "ROCKIES", difficulty: "Tricky", puzzleId: "puzzle-5" },
  ],
};

// Exporting all puzzles
export const allPuzzles = [puzzle1, puzzle2, puzzle3, puzzle4, puzzle5];
