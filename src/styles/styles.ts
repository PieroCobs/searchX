import {StyleSheet} from 'react-native';
import Palette from '../constants/palette';
import {FontSize} from '../constants/enums';
import Typography from '../constants/typography';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Palette.pageBackground,
  },

  pagePaddingX: {
    paddingHorizontal: 20,
  },

  pagePaddingXLg: {
    paddingHorizontal: 32,
  },

  paddingTop: {
    paddingTop: 20,
  },

  paddingBottom: {
    paddingBottom: 20,
  },

  h1: {
    fontSize: FontSize.xxLarge,
    fontFamily: Typography.bold,
    color: Palette.textBase,
  },

  h2: {
    fontSize: FontSize.xLarge,
    fontFamily: Typography.bold,
    color: Palette.textBase,
  },

  h3: {
    fontSize: FontSize.large,
    fontFamily: Typography.bold,
    color: Palette.textBase,
  },

  sectionHeading: {
    fontSize: FontSize.large,
    fontFamily: Typography.regular,
    color: Palette.textBase,
    textTransform: 'capitalize',
  },

  contentHeading: {
    fontSize: FontSize.medium,
    fontFamily: Typography.medium,
    color: Palette.textBase,
    textTransform: 'capitalize',
  },

  subText: {
    fontSize: FontSize.small,
    fontFamily: Typography.regular,
    color: Palette.subText,
  },

  textCapitalize: {
    textTransform: 'capitalize',
  },

  textCenter: {
    textAlign: 'center',
  },

  button: {
    height: 56,
    backgroundColor: Palette.primary,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: Palette.white,
    fontFamily: Typography.bold,
    fontSize: 14,
  },

  fullWidth: {
    width: '100%',
  },

  fullscreen: {
    flex: 1,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  alignCenter: {
    alignItems: 'center',
  },
});

export default Styles;
