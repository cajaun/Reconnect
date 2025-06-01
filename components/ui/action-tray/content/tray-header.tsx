import { Pressable, Text, View } from "react-native";
import { SFSymbol, SymbolView } from "expo-symbols";
import { PressableScale } from "../../utils/pressable-scale";

export default function TrayHeader({
  title,
  icon,
  iconColor,
  back,
  onPress,
}: {
  title?: string;
  icon?: SFSymbol;
  iconColor?: string;
  back?: boolean;
  onPress?: () => void;
}) {
  return (
    <View className={title ? "gap-y-6" : ""}>
      <View className="justify-center items-center pt-3">
        <View
          style={{
            width: 56,
            height: 6,
            borderRadius: 36,
            backgroundColor: "#DFDFDF",
          }}
        />
      </View>

      <View className="flex-row ">
        {back && (
          <View className="justify-start">
            <PressableScale
              onPress={onPress}
              className="w-10 h-10 rounded-full items-center bg-[#F2F2F2] justify-center "
            >
              <SymbolView
                name="chevron.left"
                tintColor={"black"}
                weight="bold"
                size={20}
              />
            </PressableScale>
          </View>
        )}

        <View className="flex-row gap-x-4 justify-center items-center">
          {icon && (
            <SymbolView
              size={25}
              name={icon}
              tintColor={iconColor}
              weight="bold"
            />
          )}
          <Text className="font-bold text-2xl">{title}</Text>
        </View>

        
      </View>
    </View>
  );
}
