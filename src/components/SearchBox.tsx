import React from 'react';
import {Image, View, StyleSheet, TextInput} from 'react-native';
import AssetConstants from '../constants/asset-constants';
import Palette from '../constants/palette';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  selectSearchCriteria,
  selectSearchTerm,
  setSearchTerm,
  updateSearchStatus,
} from '../redux/appSlice';

export default function SearchBox() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  const searchCriteria = useAppSelector(selectSearchCriteria);

  return (
    <View style={searchBoxStyle.container}>
      <View style={[searchBoxStyle.icon, searchBoxStyle.prefix]}>
        <Image source={AssetConstants.search} />
      </View>
      <TextInput
        style={searchBoxStyle.input}
        placeholder={`Search by ${searchCriteria}`}
        value={searchTerm}
        onChangeText={value => dispatch(setSearchTerm(value))}
        onSubmitEditing={() => {
          dispatch(updateSearchStatus(true));
        }}
      />
      {/* {searchTerm && (
        <TouchableOpacity
          style={[searchBoxStyle.icon, searchBoxStyle.postfix]}
          onPress={handleClear}>
          <View style={searchBoxStyle.clear}>
            <Text>X</Text>
          </View>
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const searchBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: Palette.white,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
  },

  icon: {
    height: 56,
    justifyContent: 'center',
  },

  prefix: {
    width: 40,
    paddingLeft: 24,
  },

  postfix: {
    paddingRight: 8,
  },

  clear: {
    backgroundColor: Palette.primaryAccent,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 14,
  },
});
