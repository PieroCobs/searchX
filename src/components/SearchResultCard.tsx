import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Palette from '../constants/palette';
import User from '../types/user';
import Styles from '../styles/styles';
import Spacer from './Spacer';
import {useNavigation} from '@react-navigation/native';

type Props = {
  user: User;
};

export default function SearchResultCard({user}: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.main}
        onPress={() => {
          navigation.navigate('UserDetails', {user: user});
        }}>
        <Text style={Styles.contentHeading}>{user.name}</Text>
        <Spacer height={8} />
        <Text style={Styles.subText}>{user.email}</Text>
        <Spacer height={4} />
        <Text style={[Styles.subText, Styles.textCapitalize]}>
          {user.address}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  main: {
    backgroundColor: Palette.white,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
  },
});
