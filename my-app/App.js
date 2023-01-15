import { StatusBar } from 'expo-status-bar';
import React, { useCallback, Fragment, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useFonts from './hooks/useFonts';

import { Svg } from 'expo'; 

import HomeScreen from './pages/HomeScreen';
import ActionBarImage from './pages/ActionBarImage';

//https://icons8.com/license

const Stack = createStackNavigator();

export default function StackScreen() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Riddle',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Sans',
              fontSize: 28,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
