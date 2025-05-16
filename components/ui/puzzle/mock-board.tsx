import { View, Text } from 'react-native';

const tileBase = 'flex items-center justify-center border border-red-500 rounded-md';
const tileSize = 'w-1/4 h-1/4 p-1';

const MockPuzzleBoard = () => {
  return (

    <View className = "relative w-full px-1">


    <View className="relative w-full aspect-square  ">
 
      <View className="absolute  w-1/4 h-1/4 p-1" style={{top: `${0 * 25}%`}} >

        <View className="h-full flex-col w-full items-center justify-center rounded-md bg-yellow-300 p-2">
          <Text className="text-xl font-bold uppercase text-black">Fruits</Text>
          <Text className="text-black">Apple, Banana, Orange, Pear</Text>
        </View>
      </View>

      {/* Row 2 — Some tiles selected */}
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-700`}>
          <Text className="text-white font-semibold uppercase">Dog</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Cat</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Tiger</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Elephant</Text>
        </View>
      </View>

      {/* Row 3 — Some tiles selected */}
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Brazil</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-700`}>
          <Text className="text-white font-semibold uppercase">India</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Germany</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Japan</Text>
        </View>
      </View>

      {/* Row 4 — One tile selected */}
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Mars</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-700`}>
          <Text className="text-white font-semibold uppercase">Venus</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Earth</Text>
        </View>
      </View>
      <View className={`${tileSize}`}>
        <View className={`${tileBase} bg-gray-200`}>
          <Text className="text-black font-semibold uppercase">Jupiter</Text>
        </View>
      </View>
    </View>
    </View>
  );
};

export default MockPuzzleBoard;
