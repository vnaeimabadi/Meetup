import React from 'react';
import * as Screen from '../src/screens';
import {cleanup, fireEvent, render} from '@testing-library/react-native';
import MockedNavigator from '../src/testComponents/MockedNavigator';
import {RouteNames} from '../src/constants';
import {getButtonDisabled} from '../src/libs/testUtils';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

afterEach(cleanup);

const setup = ({routes = []}) => {
  const renderMethods: any = render(
    <MockedNavigator
      component={[
        {
          name: RouteNames.Regsiter,
          component: Screen.Register,
          params: {},
        },
        {
          name: RouteNames.Dashboard,
          component: Screen.Dashboard,
          params: {},
        },
        {
          name: RouteNames.Report,
          component: Screen.Report,
          params: {},
        },
        ...routes,
      ]}
      initialRouteName={RouteNames.Regsiter}
    />,
  );

  const references: any = {
    InputName: renderMethods.queryByTestId('name-regsiter'),
    InputAddress: renderMethods.queryByTestId('address-regsiter'),
    RegisterButton: renderMethods.queryByTestId('submit-regsiter'),
  };

  const fillForm = () => {
    fireEvent.changeText(references.InputName, 'vali naeimabadi');
    fireEvent.changeText(references.InputAddress, 'Yazd, Iran');
  };

  const submitForm = () => {
    fireEvent.press(renderMethods.queryByTestId('submit-regsiter'));
  };
  return {
    ...renderMethods,
    submitForm,
    fillForm,
    ...references,
  };
};

it('should have all input fields and buttons', () => {
  const {InputName, InputAddress, RegisterButton} = setup({});

  expect(InputName).toBeTruthy();
  expect(InputAddress).toBeTruthy();
  expect(RegisterButton).toBeTruthy();
});

it('check submit button to be Disabled for first time user comes to Register page', () => {
  const {RegisterButton} = setup({});
  expect(getButtonDisabled(RegisterButton)).toEqual(true);
});
