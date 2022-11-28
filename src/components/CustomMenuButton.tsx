/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../constants';

const CustomMenuButton = ({
  navigation,
  title,
  disabled = false,
}: {
  navigation: any;
  title: string;
  disabled?: boolean;
}) => {
  const {top, left} = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        top: top + 8,
        left: left + 16,
        right: 46,
        zIndex: 40,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={{
          width: 46,
          height: 46,
          opacity: disabled ? 0.3 : 1,
        }}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <View
          style={{
            width: 46,
            height: 46,
            elevation: 12,
            shadowRadius: 2,
            borderRadius: 12,
            shadowOpacity: 0.2,
            alignItems: 'center',
            shadowColor: 'black',
            justifyContent: 'center',
            backgroundColor: COLORS.WHITE,
            shadowOffset: {width: 0, height: 2},
          }}>
          <Icon name="menu-fill" color={COLORS.GRAY800} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default CustomMenuButton;
