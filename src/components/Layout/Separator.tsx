/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {COLORS} from '../../constants';

export const Separator = ({
  style,
  ...props
}: Partial<{my: number; mt: number; mb: number}> & {style?: ViewStyle}) => {
  return (
    <View
      {...props}
      style={[
        {
          height: 1,
          width: '100%',
          backgroundColor: COLORS.GRAY100,
        },
        {...style},
      ]}
    />
  );
};
