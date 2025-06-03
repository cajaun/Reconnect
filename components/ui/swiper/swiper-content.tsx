import React, { FC } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { SwiperContent, useSwiper } from "./swiper-context";

type Props = {
  renderItem: ListRenderItem<SwiperContent>;
  width: number;
};

export const Content: FC<Props> = ({ renderItem, width }) => {
  const { content, SwiperRef, onViewableItemsChanged, onScrollToIndexFailed } =
    useSwiper();

  return (
<View style={{ width, flex: 1 }}>
      <FlatList
        ref={SwiperRef}
        data={content}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        viewabilityConfig={{
          itemVisiblePercentThreshold: 55,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};
