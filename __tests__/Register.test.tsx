import React from 'react';
import * as Screen from '../src/screens';
import {cleanup, fireEvent, render} from '@testing-library/react-native';
import MockedNavigator from '../src/testComponents/MockedNavigator';
import {RouteNames} from '../src/constants';
import {getButtonDisabled, getModalVisibled} from '../src/libs/testUtils';

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
    AgeSelector: renderMethods.queryByTestId('age-regsiter'),
    DobSelector: renderMethods.queryByTestId('dob-regsiter'),
    RegisterButton: renderMethods.queryByTestId('submit-regsiter'),

    guestsDropdown: renderMethods.queryByTestId('guests-dropdown'),
    guestsDropdownModal: renderMethods.queryByTestId('guests-dropdown-modal'),

    professionDropdown: renderMethods.queryByTestId('profession-dropdown'),
    professionDropdownModal: renderMethods.queryByTestId(
      'profession-dropdown-modal',
    ),

    localityDropdown: renderMethods.queryByTestId('locality-dropdown'),
    localityDropdownModal: renderMethods.queryByTestId(
      'locality-dropdown-modal',
    ),
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
  const {
    InputName,
    guestsDropdown,
    AgeSelector,
    DobSelector,
    professionDropdown,
    localityDropdown,
    InputAddress,
    RegisterButton,
  } = setup({});

  expect(InputName).toBeTruthy();
  expect(guestsDropdown).toBeTruthy();
  expect(AgeSelector).toBeTruthy();
  expect(DobSelector).toBeTruthy();
  expect(professionDropdown).toBeTruthy();
  expect(localityDropdown).toBeTruthy();
  expect(InputAddress).toBeTruthy();
  expect(RegisterButton).toBeTruthy();
});

it('check submit button to be Disabled for first time user comes to Register page', () => {
  const {RegisterButton} = setup({});
  expect(getButtonDisabled(RegisterButton)).toEqual(true);
});

beforeEach(async () => {
  jest.useFakeTimers();
});

it('renders a list of ages', async () => {
  const {queryByTestId, getByTestId} = setup({});
  expect(getByTestId('age-row-13')).toBeTruthy();
  expect(queryByTestId('age-row-23')).toBeNull();
});

it('check all dropdowns to be hidden when form is loaded', () => {
  const {professionDropdownModal, guestsDropdownModal, localityDropdownModal} =
    setup({});
  expect(getModalVisibled(guestsDropdownModal)).toEqual(false);
  expect(getModalVisibled(professionDropdownModal)).toEqual(false);
  expect(getModalVisibled(localityDropdownModal)).toEqual(false);
});

it('check guests dropdown to be visible when user clicks on it', () => {
  const {guestsDropdown, guestsDropdownModal} = setup({});
  fireEvent.press(guestsDropdown);
  expect(getModalVisibled(guestsDropdownModal)).toEqual(true);
});

it('check profession dropdown to be visible when user clicks on it', () => {
  const {professionDropdown, professionDropdownModal} = setup({});
  fireEvent.press(professionDropdown);
  expect(getModalVisibled(professionDropdownModal)).toEqual(true);
});

it('check locality dropdown to be visible when user clicks on it', () => {
  const {localityDropdown, localityDropdownModal} = setup({});
  fireEvent.press(localityDropdown);
  expect(getModalVisibled(localityDropdownModal)).toEqual(true);
});
