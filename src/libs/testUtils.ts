import * as r from 'ramda';

export const getDisabledProp = r.path(['props', 'disabled']);

export const getButtonDisabled = r.path([
  'props',
  'accessibilityState',
  'disabled',
]);
export const getModalVisibled = r.path(['props', 'visible']);
