import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const MockedNavigator = ({component, initialRouteName}: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {component.map((item: any) => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            initialParams={item.params}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockedNavigator;
