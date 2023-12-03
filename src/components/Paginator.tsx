import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Palette from '../constants/palette';
import {PAGE_SIZE} from '../constants/numeric_constants';
import Styles from '../styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  currentPage: number;
  numberOfPages: number;
  decrementCurrentPage: () => void;
  incrementCurrentPage: () => void;
};

export default function Paginator({
  currentPage,
  numberOfPages,
  decrementCurrentPage,
  incrementCurrentPage,
}: Props) {
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
          onPress={decrementCurrentPage}>
          <Text style={styles.buttonText(currentPage! > 1)}>&laquo;</Text>
        </TouchableOpacity>

        <Text style={Styles.contentHeading}>{currentPage}</Text>

        <TouchableOpacity
          style={[
            styles.button,
            determineButtonState(currentPage! < numberOfPages),
          ]}
          onPress={incrementCurrentPage}>
          <Text style={styles.buttonText(currentPage! < numberOfPages)}>
            &raquo;
          </Text>
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

  buttonText: (shouldColor: boolean): StyleProp<TextStyle> => ({
    color: shouldColor ? Palette.white : Palette.textBase,
    fontSize: 20,
  }),
});
