import { View, Text } from "react-native";
import React from "react";
import PuzzleCard from "@/components/ui/puzzle/puzzle-cards";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabOverflow, useTopTabOverflow } from "@/components/ui/utils/body-scroll-view";

const PuzzleScreen = () => {

const paddingBottom = useBottomTabOverflow()
  return (
<View>
   
   {/* Tab Bar */}
   {/* <TabBar
     tabs={TabData}
     onChangeTab={setActiveTab}
     activeTab={activeTab}
     tabBarContainerStyle={styles.tabBarContainerStyle}
     tabStyle={[styles.tabStyle]}
     indicatorStyle={[styles.indicatorStyle]}
     tabBarTextStyle={[styles.tabBarTextStyle]}
   /> */}


       <PuzzleCard />

       


 </View>
  );
};

export default PuzzleScreen;
