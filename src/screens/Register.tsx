/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomMenuButton from '../components/CustomMenuButton';
import {COLORS} from '../constants';
import useRegister from '../hooks/api/useRegister';
import {CustomInput, Dropdown} from '../components';
import {TextBox} from '../components/Form/TextBox';
import {ScrollView} from 'react-native-gesture-handler';
import _ from 'lodash';
import {EMIRATE_CITIES, GUEST, PROFESSION} from '../helpers/utils';

interface dropDownProps {
  label: string;
  value: string;
}
const now = new Date();
const ages = new Array(150).fill(0);

const Register = ({navigation}: any) => {
  const {isLoading, sendRequest} = useRegister();

  const [selectedAge, setSelectedAge] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [date, setDate] = useState(new Date(now.getFullYear() - 13, 11, 31));
  const [show, setShow] = useState(false);
  const [profession, setProfession] = useState<dropDownProps | undefined>(
    undefined,
  );
  const [locality, setLocality] = useState<dropDownProps | undefined>(
    undefined,
  );
  const [guests, setGuests] = useState<dropDownProps | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);

  const [disabled, setDisabled] = useState<boolean>(true);

  const checkIsOk = () => {
    const body = {
      Name: name,
      Age: selectedAge,
      DOB: date,
      Profession: profession?.value,
      Locality: locality?.value,
      Guests: guests?.value,
      Address: address,
    };
    if (_.values(body).some(x => x === undefined)) {
      if (disabled) {
        setDisabled(true);
      }
    } else {
      if (!disabled) {
        setDisabled(false);
      }
    }
  };

  const updateAddress = (text: any) => {
    if (text.length <= 50) {
      setAddress(text);
    }
  };

  const registerClient = async () => {
    const body = {
      Name: name,
      Age: selectedAge,
      DOB: date,
      Profession: profession?.value,
      Locality: locality?.value,
      Guests: guests?.value,
      Address: address,
    };

    console.log(body);

    if (_.values(body).some(x => x === undefined)) {
      Alert.alert('Error', 'All items should be Complete!!', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return;
    }

    sendRequest(body, () => {
      setName(undefined);
      setAddress(undefined);
      setLocality(undefined);
      setGuests(undefined);
      setProfession(undefined);
      setDate(new Date(now.getFullYear() - 13, 11, 31));
      setSelectedAge(undefined);
      Alert.alert('Success', 'Client is registered', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    });
  };

  const renderInputs = ({
    testIDInput = '',
    placeholder = '',
    keyboardType = 'default',
    value,
    onChangeText,
    title,
    contentContainerStyle = {},
  }: {
    testIDInput?: string;
    placeholder: string;
    keyboardType?: any;
    value: any;
    onChangeText: any;
    title: string;
    contentContainerStyle?: any;
  }) => {
    return (
      <View style={{width: '100%'}}>
        <View
          style={[
            contentContainerStyle,
            {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
          ]}>
          <Text
            style={{
              color: COLORS.GRAY800,
            }}>
            {title}
          </Text>
        </View>

        <View style={{marginTop: 5, justifyContent: 'center', width: '100%'}}>
          <CustomInput
            testID={testIDInput}
            placeholder={placeholder}
            keyboardType={keyboardType}
            contentContainerStyle={{
              backgroundColor: COLORS.WHITE,
              height: 50,
              borderRadius: 10,
              paddingLeft: 10,
              fontSize: 16,
              width: '100%',
            }}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
    );
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const renderDate = () => {
    return (
      <TouchableOpacity
        onPress={() => setShow(false)}
        style={{
          position: 'absolute',
          zIndex: 100,
          top: 0,
          backgroundColor: COLORS.GRAY600,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'flex-end',
        }}>
        <View style={{backgroundColor: COLORS.WHITE, paddingBottom: 20}}>
          <DateTimePicker
            maximumDate={new Date(now.getFullYear() - 13, 11, 31)}
            minimumDate={new Date(now.getFullYear() - 150, 0, 1)}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            display="spinner"
          />
          <Button onPress={() => setShow(false)} title="Done!" />
        </View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    checkIsOk();
  }, [name, locality, profession, date, guests, address]);

  React.useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => handler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomMenuButton navigation={navigation} title="Register" />

      <View style={{width: '100%', paddingHorizontal: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 10}}>
            {renderInputs({
              testIDInput: 'name-regsiter',
              placeholder: '',
              onChangeText: (newText: any) => setName(newText),
              value: name,
              title: 'Name',
            })}
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                color: COLORS.GRAY600,
              }}>
              Guests
            </Text>
            <Dropdown
              label="Select Item"
              data={GUEST}
              onSelect={setGuests}
              initial={guests}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.WHITE,
              borderRadius: 20,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text>Age</Text>
              <Text>years old</Text>
            </View>
            <FlatList
              data={ages}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({index}) => (
                <TouchableOpacity
                  onPress={() => setSelectedAge(index + 13)}
                  style={{marginRight: 5}}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: selectedAge === index + 13 ? 30 : 16,
                        fontWeight:
                          selectedAge === index + 1 ? 'bold' : 'normal',
                      }}>
                      {index + 13}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                color: COLORS.GRAY600,
              }}>
              D.O.B
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.WHITE,
                borderRadius: 10,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={showDatepicker}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {/* <Button onPress={showDatepicker} title="Pick Date" /> */}
                <Text>
                  {date.toDateString().includes('1/1/1970')
                    ? ''
                    : date.toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                color: COLORS.GRAY600,
              }}>
              Profession
            </Text>
            <Dropdown
              label="Select Item"
              data={PROFESSION}
              onSelect={setProfession}
              initial={profession}
            />
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                color: COLORS.GRAY600,
              }}>
              Locality
            </Text>
            <Dropdown
              label="Select Item"
              data={EMIRATE_CITIES}
              onSelect={setLocality}
              initial={locality}
            />
          </View>
          <View style={{marginTop: 10, width: '100%', alignItems: 'stretch'}}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                color: COLORS.GRAY600,
              }}>
              Address
            </Text>
            <TextBox
              testID="address-regsiter"
              placeholder=""
              numberOfLines={4}
              value={address}
              onChangeText={updateAddress}
              placeHolderColor={COLORS.GRAY500}
              borderColor="transparent"
              style={{
                backgroundColor: COLORS.WHITE,
                borderWidth: 2,
                borderColor: COLORS.GRAY100,
                minHeight: 60,
                maxHeight: 115,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 16,
                fontWeight: '400',
                textAlignVertical: 'top',
              }}
            />
          </View>

          <TouchableOpacity
            testID="submit-regsiter"
            onPress={registerClient}
            disabled={isLoading || disabled}
            style={{
              width: '100%',
              height: 65,
              marginTop: 20,
              backgroundColor:
                isLoading || disabled ? COLORS.GRAY100 : COLORS.BLUE400,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {isLoading && (
              <ActivityIndicator
                color={COLORS.BLUE400}
                size="small"
                style={{marginRight: 5}}
              />
            )}
            <Text
              style={{
                color: isLoading || disabled ? COLORS.BLUE400 : COLORS.WHITE,
              }}>
              submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {show && renderDate()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY200,
    justifyContent: 'flex-start',
    paddingTop: 66,
    alignItems: 'flex-start',
  },
});

export default Register;
