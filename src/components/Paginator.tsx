import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/redux';
import {
  selectCurentPage,
  selectNumberOfPages,
  selectLastPage,
  decrementCurrentPage,
  incrementCurrentPage,
} from '../redux/searchResultSlice';
import Palette from '../constants/palette';
import {PAGE_SIZE} from '../constants/numeric_constants';
import Styles from '../styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Paginator() {
  const currentPage = useAppSelector(selectCurentPage);
  const numberOfPages = useAppSelector(selectNumberOfPages);
  const lastPage = useAppSelector(selectLastPage);
  const dispatch = useAppDispatch();
  const min = (currentPage! - 1) * PAGE_SIZE + 1;

  const determineButtonState = (isActive: boolean): StyleProp<ViewStyle> => {
    if (isActive) {
      return styles.activeBackground;
    }
    return styles.defaultBackground;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>
          Page {currentPage} of {numberOfPages}
        </Text>
        <Text style={Styles.subText}>
          Showing {min} to {min + PAGE_SIZE - 1} of {numberOfPages * PAGE_SIZE}{' '}
          records
        </Text>
      </View>

      <View style={styles.pager}>
        <TouchableOpacity
          style={[styles.button, determineButtonState(currentPage! > 1)]}
          onPress={() => {
            return dispatch(decrementCurrentPage(null));
          }}>
          <Text>&laquo;</Text>
        </TouchableOpacity>

        <Text style={Styles.contentHeading}>{currentPage}</Text>

        <TouchableOpacity
          style={[styles.button, determineButtonState(currentPage! < lastPage)]}
          onPress={() => {
            return dispatch(incrementCurrentPage(null));
          }}>
          <Text>&raquo;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: Palette.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: Palette.primary,
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 4},
  },

  pager: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeBackground: {
    backgroundColor: Palette.primary,
  },

  defaultBackground: {
    backgroundColor: Palette.primaryAccent,
  },
});
