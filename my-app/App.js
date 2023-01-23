import { StatusBar } from 'expo-status-bar';
import React, { useCallback, Fragment, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';

import { Svg } from 'expo'; 

import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
import ActionBarImage from './pages/ActionBarImage';

//https://icons8.com/license
//sf-black profile icons

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function StackScreen() {

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
        >
          <Stack.Screen
            name="HomeScreen"
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
                fontFamily: 'OpenSans_400Regular',
                fontSize: 28,
              },
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ 
              title: 'Your Profile',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'OpenSans_400Regular',
                fontSize: 28,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
