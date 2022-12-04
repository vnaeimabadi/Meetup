import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {COLORS} from '../constants';

interface Props {
  label: string;
  data: Array<{label: string; value: any}>;
  onSelect: (item: {label: string; value: any}) => void;
  initial: any;
  containerStyle?: any;
  testID: string;
}

const Dropdown: FC<Props> = ({
  label,
  data,
  onSelect,
  initial,
  containerStyle,
  testID,
}) => {
  const DropdownButton = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (_fx: any, _fy: any, _w: any, h: any, _px: any, py: any) => {
        setDropdownTop(py + h);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal
        testID={`${testID}-modal`}
        visible={visible}
        transparent
        animationType="none">
        <TouchableOpacity
          style={[styles.overlay, {...containerStyle}]}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  useEffect(() => {
    if (initial === undefined) {
      setSelected(undefined);
    }
  }, [initial]);

  return (
    <TouchableOpacity
      testID={testID}
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
      <Icon style={styles.icon} name="arrow-down-s-line" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    height: 50,
    zIndex: 1,
    borderRadius: 10,
  },
  buttonText: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    // position: 'absolute',
    backgroundColor: '#fff',
    // width: '100%',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: 200,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0,
  },
});

export default Dropdown;
