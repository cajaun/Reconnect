import { Pressable, Text, View } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import WordTile from "./word-tile";
import MistakesTracker from "./mistakes";
import PuzzleControls from "./puzzle-controls";
import WelcomeView from "../drawer/default";
import GetStartedView from "../drawer/key-view";
import HowItWorksView from "../drawer/remove-view";
import { useState } from "react";
import BottomDrawer from "../drawer/bottom-drawer";

const PuzzleBoard = () => {
  const { initialShuffle } = usePuzzle();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const handleOpen = () => {
    setIsOpen(true);
  };

  const contentMap = {
    default: (
      <WelcomeView
        title="Welcome to Connections"
        heading="Connections Game challenges you to find groups of four related items. Test your ability to identify patterns"
        setView={setView}
        onClose={() => setIsOpen(false)}
      />
    ),
    remove: (
      <HowItWorksView
        title="About Connections"
        heading="The Connections Game challenges you to find groups of four related items. Test your ability to identify patternsin a fun and engaging way!"
        setView={() => setView("default")}
        onClose={() => setIsOpen(false)}
      />
    ),
    phrase: (
      <GetStartedView
        title="Secret Recovery Phrase"
        heading="Your Secret Recovery Phrase is the key used to back up all your wallet. Keep it secret and secure at all times."
        setView={() => setView("default")}
        onClose={() => setIsOpen(false)}
      />
    ),
    key: (
      <GetStartedView
         title="Private Key"
            heading="Your Private Key is the key used to back up your wallet. Keep it secret and secure at all times."
        setView={() => setView("default")}
        onClose={() => setIsOpen(false)}
      />
    ),
  };

  return (
    <View className="relative w-full px-1 ">
      <View className="flex-col  ">
<View className = "flex-fol gap-y-">




        <View className="relative flex w-full aspect-square">
          {initialShuffle.map((word, idx) => (
            <WordTile key={idx} wordObject={word} />
          ))}
        </View>
    
        </View>
      

        {/* <Pressable    onPress={handleOpen}>
          <Text>Open me</Text>
        </Pressable> */}

        <BottomDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        view={view}
        contentMap={contentMap}
      />
      </View>
    </View>
  );
};

export default PuzzleBoard;
