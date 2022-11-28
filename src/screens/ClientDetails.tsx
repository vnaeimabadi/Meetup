/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {COLORS, SIZES} from '../constants';
import Icon from 'react-native-remix-icon';

type ClientDetailsProps = {
  detials: any;
  onClose: () => void;
};

const ClientDetails: React.FC<ClientDetailsProps> = ({detials, onClose}) => {
  //State
  const translateY = useRef(new Animated.Value(SIZES.height)).current;
  const [Padding, setPadding] = useState(-1);
  //Hooks
  const inset = useSafeAreaInsets();
  const onLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    const screenHeight =
      height > SIZES.height ? 0 : SIZES.height - height - 150;
    setPadding(screenHeight);
    Animated.timing(translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      delay: 500,
    }).start();
  };

  const onCloseDialog = () => {
    Animated.timing(translateY, {
      toValue: SIZES.height,
      useNativeDriver: true,
      duration: 300,
      delay: 500,
    }).start(onClose);
  };

  const renderText = ({title, label}: {title: any; label: string}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          borderWidth: 2,
          borderColor: COLORS.GRAY100,
          minHeight: 60,
          borderRadius: 10,
          paddingLeft: 10,
          marginBottom: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 12,
          }}>
          {label}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 5,
            marginTop: 5,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: COLORS.BLACK160,
          marginTop: inset.top,
          paddingTop: Padding,
          transform: [
            {
              translateY: translateY,
            },
          ],
          zIndex: 2000,
        },
      ]}>
      <View
        style={{
          flex: 1,
          paddingBottom: 0,
          backgroundColor: COLORS.WHITE,
          borderRadius: 20,
          padding: 10,
        }}>
        <View
          style={{
            marginBottom: 10,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={onCloseDialog}>
            <View
              style={{
                width: 33,
                height: 33,
                backgroundColor: COLORS.GRAY300,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="ri-close-line" size={21} color={COLORS.BLUE400} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            flex: 1,
            paddingBottom: 0,
            backgroundColor: COLORS.WHITE,
            borderRadius: 20,
            padding: 10,
          }}
          contentContainerStyle={{
            paddingBottom: SIZES.padding,
          }}
          showsVerticalScrollIndicator={true}>
          <View onLayout={onLayout}>
            {renderText({title: detials.Name, label: 'Name'})}
            {renderText({title: detials.Profession, label: 'Profession'})}
            {renderText({title: detials.Locality, label: 'Locality'})}
            {renderText({title: detials.Guests, label: 'Guests'})}
            {renderText({title: detials.DOB, label: 'D.O.B'})}
            {renderText({title: detials.Age, label: 'Age'})}
            {renderText({title: detials.Address, label: 'Address'})}
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default ClientDetails;
