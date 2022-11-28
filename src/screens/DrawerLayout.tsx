/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-remix-icon';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {COLORS, RouteNames} from '../constants';
import {CustomDrawer} from '../components';
import {View} from 'react-native';
import Register from './Register';
import Dashboard from './Dashboard';
import Report from './Report';

const Drawer = createDrawerNavigator();

type DrawerPage = [
  RouteNames,
  ({navigation, route}: any) => JSX.Element,
  string,
  string,
];

const pages: DrawerPage[] = [
  [RouteNames.Regsiter, Register, 'home-7', 'Regsiter'],
  [RouteNames.Dashboard, Dashboard, 'qr-scan-2', 'Dashboard'],
  [RouteNames.Report, Report, 'history', 'Report'],
];

const DrawerLayout = () => {
  //Hooks

  //useEffect or useLayoutEffect

  const drawerIcon = React.useCallback(
    ({iconName}: {iconName: string}) =>
      ({focused}: {focused: boolean}) =>
        (
          <View style={{paddingLeft: 6}}>
            <Icon
              name={focused ? `${iconName}-fill` : `${iconName}-line`}
              size={24}
              color={focused ? COLORS.WHITE : COLORS.PRIMARY}
            />
          </View>
        ),
    [],
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        unmountOnBlur: true,
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={RouteNames.Regsiter}>
      {pages.map(([routeKey, ScreenComponent, iconName, routeTitle], index) => (
        <Drawer.Screen
          key={index}
          name={(routeTitle || routeKey) as string}
          options={{
            swipeEnabled: false,
            drawerIcon: drawerIcon({iconName}),
          }}
          component={ScreenComponent}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
