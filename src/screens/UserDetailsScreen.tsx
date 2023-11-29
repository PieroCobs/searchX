import React, {useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Palette from '../constants/palette';
import Styles from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';
import Spacer from '../components/Spacer';
import UserDetailListItem from '../components/UserDetailListItem';
import AssetConstants from '../constants/asset-constants';

export default function UserDetailsScreen() {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {user} = params;
  const [firstName, setFirstName] = useState();
  const [otherNames, setOtherNames] = useState();

  useEffect(() => {
    const [fn, ...others] = user.name?.split(' ');
    setFirstName(fn);
    setOtherNames(others.join(' '));
  }, [user]);

  const goBack = (e: GestureResponderEvent) => {
    e.stopPropagation();
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={1}
      onPress={goBack}>
      <View
        style={style.content}
        onStartShouldSetResponder={() => true}
        onTouchEnd={e => e.stopPropagation()}>
        <View style={style.top}>
          <Text style={[Styles.h1, Styles.textCapitalize]}>{firstName}</Text>
          {otherNames && (
            <Text style={[Styles.h1, Styles.textCapitalize]}>{otherNames}</Text>
          )}

          <ScrollView>
            <Spacer height={24} />
            <Text style={Styles.contentHeading}>Age: {user?.age}</Text>
            <Spacer height={36} />

            <UserDetailListItem label={user.email} icon={AssetConstants.mail} />
            <Spacer height={12} />

            <UserDetailListItem
              label={user.address}
              icon={AssetConstants.location}
              textTransform="capitalize"
            />
            <Spacer height={12} />

            <UserDetailListItem
              label={user?.phone}
              icon={AssetConstants.phone}
            />
          </ScrollView>
        </View>

        <TouchableOpacity onPress={goBack} style={Styles.button}>
          <Text style={Styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  content: {
    flex: 0.5,
    backgroundColor: Palette.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 52,
    paddingBottom: 32,
  },

  top: {
    flex: 1,
  },
});
