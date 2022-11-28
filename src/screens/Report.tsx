/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomMenuButton from '../components/CustomMenuButton';
import {Separator} from '../components/Layout/Separator';
import {Progressbar} from '../components/Progressbar';
import {COLORS} from '../constants';
import useClients from '../hooks/api/useClients';

const Report = ({navigation}: any) => {
  const [data, setData] = useState<any[]>([]);
  const [animateProgressbar, setAnimateProgressbar] = useState(false);
  const [age, setAge] = useState<any[]>([]);
  const [profession, setProfession] = useState<any[]>([]);
  const [locality, setLocality] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);

  const {isLoading, sendRequest} = useClients();
  const filterList = (type: string, response: any) => {
    return _.map(_.groupBy(response, type), function (item, key) {
      let obj: any = {};

      const positiveCount = _.countBy(item, function (i) {
        return i[type];
      });

      const percentagePossitive =
        (_.values(positiveCount)[0] / response.length) * 100;
      obj[key] = percentagePossitive.toFixed() || 0;
      return {key: key, value: obj[key], count: _.values(positiveCount)[0]};
    });
  };
  const filterList2 = (type: string, response: any) => {
    const itemsGroup = _.groupBy(response, function (p) {
      return p[type] >= 13 && p[type] < 18
        ? '13-18'
        : p[type] >= 18 && p[type] < 25
        ? '18-25'
        : '25+';
    });

    return _.map(_.keys(itemsGroup), el => {
      const positiveCount = itemsGroup[el].length;

      const percentagePossitive = (positiveCount / response.length) * 100;
      const value = percentagePossitive.toFixed() || 0;
      return {key: el, value: value, count: positiveCount};
    }).reverse();
  };

  const renderReports = ({type, title}: {type: any; title: string}) => {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: COLORS.WHITE,
          borderRadius: 5,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <View style={{overflow: 'hidden'}}>
          {!_.isEmpty(type) &&
            type.map((el: any, index: number) => {
              return (
                <View key={`${type}-${index}`} style={{marginTop: 5}}>
                  <Progressbar
                    label={`${el.key}(${el.count})`}
                    percentage={el.value}
                    activeAnimateProgressbar={animateProgressbar}
                    paddingHorizontal={50}
                  />
                  <Separator style={{marginTop: 5}} />
                </View>
              );
            })}
        </View>
      </View>
    );
  };
  useEffect(() => {
    sendRequest('*', (response: any) => {
      setAge(filterList2('Age', response));
      setProfession(filterList('Profession', response));
      setLocality(filterList('Locality', response));
      setGuests(filterList('Guests', response));

      setAnimateProgressbar(true);
      setData(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomMenuButton navigation={navigation} title="Report" />
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {isLoading && (
          <ActivityIndicator
            color={COLORS.BLUE400}
            size="small"
            style={{marginTop: 10}}
          />
        )}
        {!_.isEmpty(data) && (
          <ScrollView>
            {renderReports({title: 'Age', type: age})}
            {renderReports({title: 'Profession', type: profession})}
            {renderReports({title: 'Localities', type: locality})}
            {renderReports({
              title: 'Average group size of people attending the event',
              type: guests,
            })}
          </ScrollView>
        )}
      </View>
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

export default Report;
