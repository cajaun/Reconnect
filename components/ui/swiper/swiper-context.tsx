import type React from "react";
import { createContext, useContext } from "react";
import type { FlatList, ViewToken } from "react-native";

export type SwiperContent = any;

export type SwiperContextValue = {
  content: SwiperContent[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  SwiperRef: React.RefObject<FlatList<SwiperContent>>;
  dotsListRef: React.RefObject<FlatList<string>>;
  isDotsPressed: boolean;
  setIsDotsPressed: (value: boolean) => void;
  onViewableItemsChanged: (info: { viewableItems: ViewToken<SwiperContent>[] }) => void;
  onScrollToIndexFailed: () => void;
  viewableItems?: ViewToken<SwiperContent>[];
};

export const SwiperContext = createContext<SwiperContextValue | undefined>(undefined);

export function useSwiper() {
  const context = useContext(SwiperContext);

  if (!context) {
    throw new Error("useSwiper must be used within a Swiper component");
  }

  return context;
}
