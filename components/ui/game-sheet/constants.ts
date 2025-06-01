import { Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export const GameSheetHeight = screenHeight * 0.55;

export const BaseOffset = (GameSheetHeight - 44) / 2;