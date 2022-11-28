import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from './src/constants';
import {Dashboard, DrawerLayout, Register, Report} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={RouteNames.Layout}>
        <Stack.Screen name={RouteNames.Layout} component={DrawerLayout} />
        <Stack.Screen name={RouteNames.Regsiter} component={Register} />
        <Stack.Screen name={RouteNames.Dashboard} component={Dashboard} />
        <Stack.Screen name={RouteNames.Report} component={Report} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
