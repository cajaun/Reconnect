import { View, Text, Pressable, Dimensions } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { Word } from "@/types/puzzle";
import { difficultyToColor } from "@/types/difficulty";
import useShuffleAnimation from "@/hooks/use-shuffle-animation";
import { FadeIn } from "../utils/fade-in";
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";


type WordTileProps = {
  wordObject: Word;
  disabled?: boolean;
  progress: SharedValue<number>;
};

const WordTile = ({ wordObject, disabled, progress }: WordTileProps) => {
  const {
    shuffledWords,
    status,
    onWordClick,
    correctGuesses,
    categories,
    sortedSelectedWords,
  } = usePuzzle();

  const { difficulty, word } = wordObject;
  const location = shuffledWords.findIndex((w) => w.id === wordObject.id);

  const selected = sortedSelectedWords.some(
    (w) => w.word === wordObject.word && w.difficulty === wordObject.difficulty
  );

  const correct = correctGuesses.find(({ words }) =>
    words.includes(wordObject)
  );

  const { row, animatedStyle } = useShuffleAnimation(location);

  const flipState = useSharedValue(0);

  const EasingsUtils = {
    inOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  };
  
  useDerivedValue(() => {
    flipState.value = withTiming(progress.value >= 0.6 ? 1 : 0, {
      duration: 250,
      easing: EasingsUtils.inOut,
    });
  }, [progress]);

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(flipState.value, [0, 1], [0, 180])}deg`,
        },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(flipState.value, [0, 1], [-180, 0])}deg`,
        },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    };
  });

  if (correct) {
    if (location % 4 === 0) {
      const category = categories.find(
        ({ difficulty: categoryDifficulty }) =>
          categoryDifficulty === difficulty
      );

      const color = difficultyToColor[difficulty];
      return (
        <View
          className="absolute left-0 w-full h-1/4 p-1"
          style={{ top: `${row * 25}%` }}
        >
          <View
            className="flex-col h-full w-full items-center justify-center rounded-md p-2"
            style={{ backgroundColor: color }}
          >
            <FadeIn>
              <Text className="text-xl font-bold uppercase text-black mx-auto">
                {category?.description}
              </Text>
              <Text className="mx-auto">
                {correct.words.map(({ word }) => word).join(", ")}
              </Text>
            </FadeIn>
          </View>
        </View>
      );
    }
    return null;
  }

  return (
    <Animated.View
      className="absolute h-1/4 w-1/4 p-1"
      style={[animatedStyle, { perspective: 1000 } as any]}
    > 
      <Pressable
        disabled={disabled}
        className={`h-full w-full rounded-lg transition-transform ease-in-out active:scale-90 ${
          selected ? "bg-[#BFBFBF]" : "bg-[#F2F2F2]"
        } ${
          selected && status === "pending" ? "animate-bounce-up" : ""
        } ${
          selected && status === "failure" ? "animate-shake" : ""
        }`}
        onPress={() => onWordClick(wordObject)}
      
      >

        <Animated.View style={frontStyle}>
          <Text
            className={`text-center text-xl uppercase font-semibold ${
              selected ? "text-white" : "text-black"
            }`}
          >
            {word.charAt(0)}
          </Text>
        </Animated.View>


        <Animated.View style={backStyle}>
          <Text className="text-center text-xl uppercase font-semibold text-black">
            {word}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default WordTile;
