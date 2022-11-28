/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomInput} from '../components';
import CustomMenuButton from '../components/CustomMenuButton';
import {COLORS} from '../constants';
import useClients from '../hooks/api/useClients';
import ClientDetails from './ClientDetails';

const Dashboard = ({navigation}: any) => {
  const [data, setData] = useState<any[]>([]);
  const [cientList, setClientList] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedClient, setSelectedClient] = useState(undefined);
  const {isLoading, sendRequest} = useClients();
  useEffect(() => {
    sendRequest('*', (response: any) => {
      setData(response);
      setClientList(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderInputs = ({
    placeholder = '',
    keyboardType = 'default',
    value,
    onChangeText,
    title,
    contentContainerStyle = {},
  }: {
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

  const searchHandler = () => {
    setClientList(
      _.map(
        _.filter(
          data,
          item =>
            item.Name.includes(searchInput) ||
            item.Locality.includes(searchInput),
        ),
      ),
    );
  };

  useEffect(() => {
    if (_.isEmpty(data)) {
      return;
    }
    const handler = setTimeout(() => {
      searchHandler();
    }, 500);
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomMenuButton navigation={navigation} title="Dashboard" />
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <View style={{marginTop: 10, marginBottom: 10}}>
          {renderInputs({
            placeholder: 'Name or Locality',
            onChangeText: (newText: any) => setSearchInput(newText),
            value: searchInput,
            title: 'Search',
          })}
        </View>
        {isLoading && <ActivityIndicator color={COLORS.BLUE400} size="small" />}
        <FlatList
          data={cientList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 90}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={`${item.id}`}
              onPress={() => {
                setSelectedClient(item);
              }}
              style={{
                backgroundColor:
                  index % 2 === 0 ? COLORS.BLUE400 : COLORS.BLUE300,
                marginBottom: 5,
                borderRadius: 5,
              }}>
              <View
                style={{
                  marginHorizontal: 10,
                  height: 50,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 5,
                      color: COLORS.WHITE,
                    }}>
                    Name
                  </Text>
                  <Text style={{marginLeft: 5, color: COLORS.GRAY200}}>
                    {item.Name}
                  </Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 5,
                      color: COLORS.WHITE,
                    }}>
                    Locality
                  </Text>
                  <Text style={{marginLeft: 5, color: COLORS.GRAY200}}>
                    {item.Locality}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {!_.isEmpty(selectedClient) && (
        <ClientDetails
          detials={selectedClient}
          onClose={() => {
            setSelectedClient(undefined);
          }}
        />
      )}
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

export default Dashboard;
