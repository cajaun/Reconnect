import { View, Text, Pressable, Animated} from "react-native";
import { difficultyToColor } from "@/types/difficulty";
import { Word } from "@/types/puzzle";
import { usePuzzle
  
 } from "@/context/puzzle-context";
import { useEffect, useMemo, useRef } from "react";


export const Puzzle = () => {
  const {
    status,
    onSubmit,
    initialShuffle,
    correctGuesses,
    guesses,
    shuffle,
    deselect,
  } = usePuzzle();

  return (
    <View className="relative w-full px-1">
      <View className="flex-col items-center  gap-6">
        <View className="relative flex w-full  aspect-square">
          {initialShuffle.map((word, idx) => (
            <WordOrCategory key={idx} wordObject={word} />
          ))}
        </View>
        <View className="flex-row items-center gap-2.5">
          <Text>Mistakes remaining:</Text>
          <View className="flex w-24 flex-row items-center gap-2.5">
            {Array.from(Array(4)).map((_, idx) => (
              <View
                key={idx}
                className={`h-4 w-4 rounded-full bg-darkGray transition-transform duration-300 d ${
                  idx + 1 > 4 - (guesses.length - correctGuesses.length)
                    ? "scale-0"
                    : "scale-100"
                }`}
              />
            ))}
          </View>
        </View>
        <View className="flex-row gap-2.5">
          <Pressable
            className="rounded-full border border-black px-4 py-3 active:bg-gray-300 dark:border-white"
            onPress={shuffle}
          >
            <Text>Shuffle</Text>
          </Pressable>
          <Pressable
            className="rounded-full border border-black px-4 py-3 active:bg-gray-300 dark:border-white"
            onPress={deselect}
          >
            <Text>Deselect All</Text>
          </Pressable>
          <Pressable
            className="rounded-full border bg-darkGray px-4 py-3 text-white active:bg-gray-600 disabled:border-gray-400 disabled:bg-white disabled:text-gray-400 dark:bg-white dark:text-black dark:disabled:bg-black"
            disabled={status !== "submittable"}
            onPress={onSubmit}
          >
            <Text>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

type WordOrCategoryProps = {
  wordObject: Word;
};

const WordOrCategory = ({ wordObject }: WordOrCategoryProps) => {
  const {
    shuffledWords,
    status,
    onWordClick,
    correctGuesses,
    categories,
    sortedSelectedWords,
  } = usePuzzle();
  const { difficulty, word } = wordObject;
  const location = useMemo(
    () => shuffledWords.indexOf(wordObject),
    [shuffledWords, wordObject]
  );


  const idxInSelected = sortedSelectedWords.indexOf(wordObject);
  const selected = idxInSelected !== -1;
  const correct = correctGuesses.find(({ words }) =>
    words.includes(wordObject)
  );


  const row = Math.floor(location / 4);
  const col = location % 4;
  
  const animatedTop = useRef(new Animated.Value(row * 25)).current;
  const animatedLeft = useRef(new Animated.Value(col * 25)).current;
  
  useEffect(() => {
    Animated.timing(animatedTop, {
      toValue: row * 25,
      duration: 425,
      useNativeDriver: false, // Must be false for layout properties like "top" and "left"
    }).start();
  
    Animated.timing(animatedLeft, {
      toValue: col * 25,
      duration: 425,
      useNativeDriver: false,
    }).start();
  }, [row, col]);
  
  
  const animatedStyle = {
    top: animatedTop.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    left: animatedLeft.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
  };



  if (correct) {
    if (location % 4 === 0) {
      const category = categories.find(
        ({ difficulty: categoryDifficulty }) =>
          categoryDifficulty === difficulty
      );

      const color = difficultyToColor[difficulty]
      return (
        <View
          className="absolute left-0 w-full h-1/4 p-1"
          style={{ top: `${row * 25}%` }}
        >
          <View
          
            className={` flex-col h-full w-full items-center justify-center rounded-md p-2`}
            style={{backgroundColor: color}}
          >
            <Text className="text-xl font-bold uppercase dark:text-black">
              {category?.description}
            </Text>
            <Text>{correct.words.map(({ word }) => word).join(", ")}</Text>
          </View>
        </View>
      );
    }
    return null;
  }

  return (
    <Animated.View
      className="absolute h-1/4 w-1/4 p-1"
      style={animatedStyle}
    >
      <Pressable
        className={`h-full w-full break-words rounded-md font-bold transition-transform ease-in-out placeholder:text-white focus:outline-none active:scale-90  ${
          selected
            ? "bg-darkGray  dark:bg-disabled-gray "
            : "bg-lightGray"
        } ${selected && status === "pending" && `animate-bounce-up`} ${
          selected && status === "failure" && `animate-shake`
        }`}
        onPress={() => {
          onWordClick(wordObject)}
        
        }
      >
        <Text className="text-center text-xl uppercase font-semibold text-black my-auto">
          {word}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
