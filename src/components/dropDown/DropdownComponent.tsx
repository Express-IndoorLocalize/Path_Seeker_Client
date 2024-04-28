import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = (props:any) => {
  const value = props.locationValue;
  const setValue = props.setLocation;
  const [isFocus, setIsFocus] = useState(false);
  const data = props.locations;
  const placeHolder = props.isDestination ? 'Chose destination' : 'choose current location'
  return (
    <View style={{...props.style}}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeHolder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <></>
          // <AntDesign
          //   style={styles.icon}
          //   color={isFocus ? 'blue' : 'black'}
          //   name="Safety"
          //   size={20}
          // />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 3,
  },
  dropdown: {
    width: '50%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    textDecorationColor: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 10,
    color: 'black',
  },
  itemStyle: {
    fontSize: 10,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 10,
    color: 'black',
    textDecorationColor: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 10,
    color: 'black',
  },
});