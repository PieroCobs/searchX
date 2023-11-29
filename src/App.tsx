/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './screens/HomeScreen';
import RootStackParamList from './routing/parameterList';
import {Provider} from 'react-redux';
import {store} from './store';
import UserDetailsScreen from './screens/UserDetailsScreen';

const RootStack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
              cardStyle: {
                backgroundColor: 'transparent',
                opacity: 0.99,
              },
            }}
          />
        </RootStack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
