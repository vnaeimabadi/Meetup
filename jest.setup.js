/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';
import 'react-native-url-polyfill/auto';

jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated/lib/reanimated2/jestUtils');
