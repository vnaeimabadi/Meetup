/* eslint-disable react-native/no-inline-styles */
import React, {Text, View} from 'react-native';
import {MotiView} from 'moti';
import {CountSetInterval} from './CountSetInterval';
import {SIZES} from '../constants';

export const Progressbar = ({
  label,
  percentage,
  activeAnimateProgressbar,
  paddingHorizontal,
}: {
  label: string;
  percentage: number;
  activeAnimateProgressbar: boolean;
  paddingHorizontal: number;
}) => {
  const pers = -(SIZES.width - paddingHorizontal) * ((100 - percentage) / 100);
  return (
    <View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text>{label}</Text>
        {!activeAnimateProgressbar && <Text>0%</Text>}
        {activeAnimateProgressbar && (
          <CountSetInterval label={'%'} number={percentage} duration={2} />
        )}
      </View>
      {activeAnimateProgressbar && (
        <MotiView
          from={{translateX: -(SIZES.width - paddingHorizontal)}}
          animate={{translateX: pers}}
          transition={{type: 'timing', duration: 2000, delay: 0}}
          style={{
            height: 10,
            marginTop: 10,
            backgroundColor: '#d65050',
            overflow: 'hidden',
            borderRadius: 5,
          }}
        />
      )}
    </View>
  );
};
