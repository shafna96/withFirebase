import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });

    GoogleSignin.configure({
      webClientId:
        '787157499724-or2q83vvf1sisv1im1sjfr4kh02867hq.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
