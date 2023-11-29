import React from 'react';
import {Dimensions, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {FilterItem, filters} from '../types/filter';
import Palette from '../constants/palette';
import FilterParam from '../types/filter';

type Props = {
  value?: FilterParam;
  onChange: (item: FilterItem) => void;
  buttonStyle: StyleProp<ViewStyle>;
  renderRightIcon?: (
    visible?: boolean | undefined,
  ) => JSX.Element | null | undefined;
  renderLeftIcon?: (
    visible?: boolean | undefined,
  ) => JSX.Element | null | undefined;
};

export default function FilterDropdown({
  value,
  onChange,
  buttonStyle,
  renderRightIcon,
  renderLeftIcon,
}: Props) {
  return (
    <Dropdown
      style={buttonStyle}
      data={filters}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={onChange}
      selectedTextStyle={styles.buttonText}
      containerStyle={styles.listContainer}
      itemTextStyle={styles.itemTextStyle}
      renderRightIcon={renderRightIcon}
      renderLeftIcon={renderLeftIcon}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: 120,
    left: Dimensions.get('window').width - (120 + 20),
    shadowColor: Palette.primary,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 4},
  },

  itemTextStyle: {
    textTransform: 'capitalize',
  },

  buttonText: {
    fontSize: 14,
    color: Palette.white,
    textTransform: 'capitalize',
    // display: 'none',
  },
});
