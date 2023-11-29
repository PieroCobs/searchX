import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import Palette from '../constants/palette';

type LabelTransform = 'capitalize' | undefined;

type Props = {
  label: string;
  icon: ImageSourcePropType;
  textTransform?: LabelTransform;
};

export default function UserDetailListItem({
  label,
  icon,
  textTransform,
}: Props) {
  return (
    <View style={style.container}>
      <View style={style.iconView}>
        <Image source={icon} />
      </View>
      <Text style={style.label(textTransform)}>{label}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  iconView: {
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.primaryAccent,
  },

  label: (textTransform: LabelTransform): StyleProp<TextStyle> => ({
    fontSize: 14,
    textTransform: textTransform,
  }),
});
