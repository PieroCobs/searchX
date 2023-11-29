import React from 'react';
import Styles from '../styles/styles';
import {StyleSheet, Text, View} from 'react-native';
import Palette from '../constants/palette';
import Typography from '../constants/typography';

export default function LoaderView() {
  return (
    <View style={loaderStyle.container}>
      <Text style={Styles.h2}>SearchX</Text>
      <Text style={loaderStyle.subText}>Initializing app</Text>
    </View>
  );
}

const loaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subText: {
    fontFamily: Typography.regular,
    color: Palette.subText,
    fontSize: 14,
  },
});
