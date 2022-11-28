import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  TRANSPARENT: 'rgba(0, 0, 0, 0)',
  BLACK160: 'rgba(0, 0, 0, 0.16)',
  WHITE: '#FFF',
  BLACK: '#000',
  PRIMARY: '#03053D',

  GRAY1000: '#1B2F5D',
  GRAY900: '#23355F',
  GRAY850: '#2C2C2C',
  GRAY800: '#49597D',
  GRAY750: '#4A5155',
  GRAY700: '#455A64',
  GRAY600: 'rgba(27, 47, 93, 0.6)',
  GRAY500: 'rgba(27, 47, 93, 0.5)',
  GRAY450: '#979797',
  GRAY400: '#9FA5C0',
  GRAY300: '#C4C4C4',
  GRAY200: '#E8E8E8',
  GRAY100: '#F0F0F0',
  GRAY50: '#F0F0F0',

  PINK200: 'hotpink',

  ORANGE100: '#FDA57D',
  ORANGE200: 'orange',

  BROWN300: '#EDECE7',

  BLUE50: '#D9E3FF',
  Blue200: '#2F88FC',
  BLUE300: '#2E5BFF',
  BLUE400: '#0251E1',
};

export const SIZES = {
  //global size
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // spacing
  xsmall: 8,
  small: 16,
  medium: 24,
  large: 36,

  //font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  h6: 10,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 10,

  //app dimensions
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
