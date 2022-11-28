/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-remix-icon';
import {DrawerItemList} from '@react-navigation/drawer';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {version} from '../../package.json';
import {COLORS, SIZES} from '../constants';
import {Separator} from './Layout/Separator';

const CustomDrawer = (props: any) => {
  const renderMenuItems = () => {
    return (
      <ScrollView contentContainerStyle={styles.menuItemsContainer}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 25,
            }}>
            <DrawerItemList
              {...props}
              activeTintColor={COLORS.WHITE}
              activeBackgroundColor={COLORS.BLUE300}
              inactiveTintColor={COLORS.GRAY1000}
              itemStyle={{
                marginVertical: 2,
                marginHorizontal: -4,
                borderRadius: 12,
              }}
              labelStyle={{
                fontSize: 16,
                marginLeft: -12,
                paddingVertical: 4,
              }}
            />
          </View>
        </ScrollView>
      </ScrollView>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footerSeparator}>
          <Separator />
        </View>

        <View style={styles.footerVersion}>
          <Icon name="git-branch-fill" color={COLORS.PRIMARY} size={24} />
          <Text style={styles.footerFont}>Version: {version}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* content */}
      {renderMenuItems()}
      {/* footer */}
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  menuItemsContainer: {height: '100%', flex: 1, paddingTop: SIZES.padding},
  footerContainer: {
    paddingBottom: 19,
  },
  footerSeparator: {
    width: '100%',
    marginBottom: 19,
    paddingVertical: SIZES.padding,
  },
  footerVersion: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: SIZES.large,
  },
  footerFont: {
    fontSize: 12,
  },
});

export default CustomDrawer;
