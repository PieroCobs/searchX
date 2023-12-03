import React from 'react';
import Styles from '../styles/styles';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Palette from '../constants/palette';
import Typography from '../constants/typography';
import Spacer from './Spacer';

export default function LoaderView() {
  return (
    <View style={loaderStyle.container}>
      <View
        style={[Styles.fullscreen, Styles.alignCenter, Styles.centerContent]}>
        <ActivityIndicator size="large" color={Palette.primary} />
        <Text style={Styles.h2}>SearchX</Text>
      </View>
      <Text style={loaderStyle.subText}>Initializing app...</Text>
      <Text style={loaderStyle.subText}>this may take a while</Text>
      <Spacer height={32} />
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
