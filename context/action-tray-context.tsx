import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";
import { ActionTray, ActionTrayRef } from "@/components/ui/action-tray";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type ActionTrayContextType = {
  openTray: (
    step: number,
    dynamicContentMap?: Record<number, ReactNode>
  ) => void;
  closeTray: () => void;
};

const ActionTrayContext = createContext<ActionTrayContextType | undefined>(
  undefined
);

export const useActionTray = () => {
  const context = useContext(ActionTrayContext);
  if (!context) {
    throw new Error("useActionTray must be used within an ActionTrayProvider");
  }
  return context;
};

export const ActionTrayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const trayRef = useRef<ActionTrayRef>(null);
  const [contentMap, setContentMap] = useState<Record<number, ReactNode>>({});
  const [step, setStep] = useState(0);

  const openTray = (
    step: number,
    dynamicContentMap?: Record<number, ReactNode>
  ) => {
    if (dynamicContentMap) {
      setContentMap(dynamicContentMap);
    }
    setStep(step);
    trayRef.current?.open();
  };

  const closeTray = () => {
    trayRef.current?.close();
    setStep(0);
  };

  const rBackgroundStyle = useAnimatedStyle(() => {
    const p = trayRef.current?.progress?.value ?? 0;
    return {
      transform: [
        {
          translateY: interpolate(p, [0, 1], [0, 0.05]),
        },
        {
          scale: interpolate(p, [0, 1], [1, 0.97]),
        },
      ],
    };
  });

  return (
    <ActionTrayContext.Provider value={{ openTray, closeTray }}>
      <Animated.View style={[{ flex: 1 }, rBackgroundStyle]}>
        {children}
      </Animated.View>

      <ActionTray
        ref={trayRef}
        step={step}
        contentMap={contentMap}
        onClose={closeTray}
      />
    </ActionTrayContext.Provider>
  );
};
