import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Styles from '../styles/styles';
import Spacer from './Spacer';
import AssetConstants from '../constants/asset-constants';
import Palette from '../constants/palette';
import FilterDropdown from './Filter';
import SearchBox from './SearchBox';
import {
  selectSearchCriteria,
  selectSearchTerm,
  setSearchCriteria,
  updateSearchStatus,
} from '../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../hooks/redux';

export default function Header() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  const searchCriteria = useAppSelector(selectSearchCriteria);

  return (
    <View style={Styles.pagePaddingX}>
      <Text style={[Styles.h2, Styles.paddingTop]}>SearchX</Text>
      <Spacer height={12} />
      <Text style={Styles.subText}>
        Search records based on these criteria: name, age, email or address.
      </Text>

      <Spacer height={20} />
      <View style={styles.container}>
        <SearchBox />

        <FilterDropdown
          value={searchCriteria}
          onChange={item => {
            dispatch(setSearchCriteria(item.value));
            if (searchTerm.trim().length > 0) {
              dispatch(updateSearchStatus(true));
            }
          }}
          buttonStyle={[styles.button]}
          renderRightIcon={() => {
            return <Image source={AssetConstants.settingsSliders} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },

  button: {
    backgroundColor: Palette.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
