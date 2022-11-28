/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import {COLORS} from '../constants';

export type CustomInputProps = TextInputProps & {
  label?: string;
  contentContainerStyle?: TextInputProps['style'];
  defaultBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  // TODO: Split Phone Input other Input
  isMobileNumber?: boolean;
  phoneCountryCode?: string;
};

const CustomInput = React.forwardRef<TextInput, CustomInputProps>(
  function CustomInputRef(
    {
      label,
      keyboardType = 'default',
      placeholder,
      value,
      onChangeText,
      contentContainerStyle,
      secureTextEntry = false,
      editable = true,
      testID,
      defaultBorderColor = COLORS.GRAY100,
      placeholderTextColor = COLORS.GRAY600,
      borderColor = COLORS.BLUE400,
      borderWidth = 2,
      multiline = false,
      numberOfLines = 4,
      isMobileNumber = false,
      phoneCountryCode = '234',
      onKeyPress,
      ...props
    },
    ref,
  ) {
    const [focused, setFocus] = useState(false);
    const toggleFocus = (f: boolean) => !f;

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      props.onBlur && props.onBlur(e);
      setFocus(toggleFocus);
    };

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      props.onFocus && props.onFocus(e);
      setFocus(toggleFocus);
    };

    const textColor = COLORS.BLACK;
    // @ts-ignore
    const fontSize = contentContainerStyle?.fontSize || 16;

    return (
      <View style={{width: '100%'}}>
        {label && (
          <View style={{marginBottom: 8, alignItems: 'center'}}>
            <Text
              style={{
                color: COLORS.GRAY800,
                fontSize: 16,
              }}>
              {label}
            </Text>
          </View>
        )}

        <View style={{width: '100%'}}>
          <TextInput
            ref={ref}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onBlur={onBlur}
            onFocus={onFocus}
            testID={testID}
            editable={editable}
            keyboardType={isMobileNumber ? 'numeric' : keyboardType}
            placeholderTextColor={placeholderTextColor}
            style={[
              {
                paddingLeft: isMobileNumber ? 72 : 24,
                minHeight: 40,
                borderColor: focused ? borderColor : defaultBorderColor,
                borderWidth: editable ? borderWidth : 0,
                borderRadius: 6,
                paddingVertical: 0,
                width: '100%',
              },
              contentContainerStyle,
              {
                color: textColor,
                backgroundColor: editable ? COLORS.WHITE : COLORS.GRAY50,
              },
            ]}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            value={value}
            onChangeText={(text: string) =>
              onChangeText ? onChangeText(text) : null
            }
            onKeyPress={onKeyPress}
          />

          {isMobileNumber && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                top: 0,
                bottom: 0,
                position: 'absolute',
                minHeight: 40,
                left: 12,
              }}>
              <Text
                style={{
                  color: textColor,
                  fontSize,
                  lineHeight: fontSize,
                }}>
                {phoneCountryCode ?? '+234'}
              </Text>
              <View
                style={{
                  marginHorizontal: 12,
                  marginVertical: 12.5,
                  height: 26,
                  width: 1,
                  backgroundColor: '#E0E0E0',
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  },
);

export default CustomInput;
