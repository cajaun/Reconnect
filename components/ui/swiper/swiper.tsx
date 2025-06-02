import type React from "react";
import { useCallback, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import { FlatList, View, type ViewToken } from "react-native";
import { SwiperContext, SwiperContent } from "./swiper-context";


export interface SwiperProps extends PropsWithChildren {
  content: any[];
  className?: string;
}

export function Swiper({ content, children, className }: SwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDotsPressed, setIsDotsPressed] = useState(false);
  const [viewableItems, setViewableItems] = useState<
    ViewToken<SwiperContent>[]
  >([]);

  const SwiperRef = useRef<FlatList<SwiperContent>>(null);
  const dotsListRef = useRef<FlatList<string>>(null);
  const refIndex = useRef(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<SwiperContent>[] }) => {
      setViewableItems(viewableItems);

      if (viewableItems.length > 0) {
        const currentIndex = viewableItems[0].index ?? 0;

        if (!isDotsPressed) {
          setCurrentIndex(currentIndex);
        }

        if (currentIndex - refIndex.current > 2) {
          refIndex.current = currentIndex - 2;
          dotsListRef.current?.scrollToIndex({
            animated: true,
            index: currentIndex - 2,
          });
        }

        if (currentIndex - refIndex.current < 0) {
          refIndex.current = currentIndex;
          dotsListRef.current?.scrollToIndex({
            animated: true,
            index: currentIndex,
          });
        }
      }
    },
    [isDotsPressed]
  );

  const onScrollToIndexFailed = useCallback(() => {
    SwiperRef.current?.scrollToIndex({
      animated: false,
      index: currentIndex,
    });
  }, [currentIndex]);

  const value = {
    content,
    currentIndex,
    setCurrentIndex,
    SwiperRef,
    dotsListRef,
    isDotsPressed,
    setIsDotsPressed,
    onViewableItemsChanged,
    onScrollToIndexFailed,
    viewableItems,
  };

  return (
    <SwiperContext.Provider value={value}>
      <View className={className}>{children}</View>
    </SwiperContext.Provider>
  );
}

export { useSwiper } from "./swiper-context";
export type { SwiperContent } from "./swiper-context";
export { Content } from "./swiper-content";
export { SwiperPagination } from "./swiper-pagination";


