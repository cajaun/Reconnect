import { View, Pressable, Text } from "react-native";
import { usePuzzle } from "@/context/puzzle-context";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "../utils/pressable-scale";
import React from "react";
import { resetMap } from "../action-tray/content/reset";
import { useActionTray } from "@/context/action-tray-context";

const PuzzleControls = () => {
  const { status, shuffle, deselect, onSubmit, reset } = usePuzzle();

  const { openTray, closeTray } = useActionTray();

  const handleReset = () => {
    closeTray();
    reset();
  };

  const contentMap = React.useMemo(() => {
    let map: Record<number, React.ReactNode> = {};
    map = resetMap(
      (step) => openTray(step, map),
      closeTray,
      map,
      handleReset,
      status
    );
    return map;
  }, [openTray, closeTray, handleReset, status]);

  return (
    <View className="flex-row justify-between items-center w-full px-6">
      <PressableScale
        onPress={() => openTray(0, contentMap)}
        className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center "
      >
        <SymbolView
          name="arrow.counterclockwise"
          weight="bold"
          tintColor={"black"}
          size={25}
        />
      </PressableScale>

      {status === "complete" ? (
        <PressableScale
          className="bg-black h-[50px]  justify-center items-center  "
          style={{ width: "60%", borderRadius: 16, borderCurve: "continuous" }}
        >
          <Text className="text-white text-xl font-semibold">Next</Text>
        </PressableScale>
      ) : (
        <View className="flex-row gap-2.5">
          <PressableScale
            onPress={shuffle}
            className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center"
          >
            <SymbolView
              name="shuffle"
              tintColor={"black"}
              weight="bold"
              size={25}
            />
          </PressableScale>

          <PressableScale
            onPress={deselect}
            className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center"
          >
            <SymbolView
              name="eraser.fill"
              size={25}
              tintColor={"black"}
              weight="bold"
            />
          </PressableScale>
        </View>
      )}

      {status === "complete" ? (
        <PressableScale className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center">
          <SymbolView
            name="square.and.arrow.up"
            size={25}
            tintColor={"black"}
            weight="bold"
          />
        </PressableScale>
      ) : (
        <PressableScale
          className="rounded-full w-16 h-16 items-center bg-[#F2F2F2]  justify-center"
          disabled={status !== "submittable"}
          onPress={onSubmit}
        >
          <SymbolView
            name="paperplane.fill"
            size={25}
            tintColor={"black"}
            weight="bold"
          />
        </PressableScale>
      )}
    </View>
  );
};

export default PuzzleControls;
