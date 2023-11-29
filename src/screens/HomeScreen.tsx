import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import Styles from '../styles/styles';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import SearchResults from '../components/SearchResults';
import ErrorView from '../components/ErrorView';
import LoaderView from '../components/LoaderView';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {isLoading, error, refetch} = useFetch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={Styles.container} edges={['right', 'top', 'left']}>
      {isLoading ? (
        <LoaderView />
      ) : error != null ? (
        <ErrorView onRetry={() => refetch()} />
      ) : (
        <View style={[Styles.fullscreen]}>
          <Header />
          <Spacer height={24} />
          <SearchResults />
        </View>
      )}
    </SafeAreaView>
  );
}
