import { Dimensions } from 'react-native';

// Get screen height
const { height: screenHeight } = Dimensions.get('window');


export const MiniPlayerHeight = screenHeight * 0.55;