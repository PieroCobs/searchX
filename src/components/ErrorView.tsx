import React from 'react';
import Styles from '../styles/styles';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Palette from '../constants/palette';
import Typography from '../constants/typography';
import Spacer from './Spacer';

type Props = {
  onRetry: () => void;
};

export default function ErrorView({onRetry}: Props) {
  return (
    <View style={style.container}>
      <Text style={[Styles.h2, Styles.paddingTop, style.gray]}>SearchX</Text>
      <Text style={[style.subText, style.gray]}>
        An error occured when loading data
      </Text>
      <Spacer height={24} />
      <TouchableOpacity
        style={[Styles.button, Styles.fullWidth]}
        onPress={onRetry}>
        <Text style={Styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 56,
  },

  gray: {
    color: Palette.subText,
  },

  subText: {
    fontFamily: Typography.regular,
    fontSize: 14,
  },
});
