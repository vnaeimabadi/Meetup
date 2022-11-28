/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../constants';

const TextBox_ = (props: any, ref: any) => {
  const [focused, setFocused] = useState<any>();
  const onBlur = () => {
    setFocused(false);
  };
  const onFocus = () => {
    setFocused(true);
  };

  return (
    <TextInput
      {...props}
      ref={ref}
      multiline={true}
      value={props.value}
      autoCapitalize="sentences"
      numberOfLines={props.numberOfLines || 4}
      onBlur={() => {
        onBlur();
        if (props.onBlur) {
          props.onBlur();
        }
      }}
      onFocus={() => {
        onFocus();
        if (props.onFocus) {
          props.onFocus();
        }
      }}
      editable={!props?.disabled}
      style={[
        styles.textBox,
        {
          borderColor: focused
            ? COLORS.BLUE400
            : props.borderColor ?? COLORS.GRAY50,
          borderWidth: focused ? 2 : 1,
        },
        props.style,
      ]}
      placeholderTextColor={
        props.placeHolderColor ? props.placeHolderColor : COLORS.GRAY750
      }
      onChangeText={props.onChangeText || (() => {})}
    />
  );
};

const styles = StyleSheet.create({
  textBox: {
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: COLORS.GRAY900,
    backgroundColor: COLORS.GRAY100,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
});

export const TextBox = React.forwardRef(TextBox_);
