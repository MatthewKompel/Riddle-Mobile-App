import { StatusBar } from 'expo-status-bar';
import React, { useCallback, Fragment, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useFonts from './hooks/useFonts';

import { Svg } from 'expo'; 

import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
import ActionBarImage from './pages/ActionBarImage';

//https://icons8.com/license
//sf-black profile icons

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
              fontFamily: 'Sans',
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
    justifyContent: "space-between",
    flex: 1,
  },
  keyboard: { flexDirection: "column" },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "#d3d6da",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: "500",
    fontSize: 15,
  },
});
