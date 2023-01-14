import { StatusBar } from 'expo-status-bar';
import React, { useCallback, Fragment } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Svg } from 'expo'; 
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './pages/HomeScreen';
import ActionBarImage from './pages/ActionBarImage';

//https://icons8.com/license

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();


export default function StackScreen() {
  const [fontsLoaded] = useFonts({
    'Sans': require('./assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <React.Fragment>
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
              headerTitleStyle: {
                fontFamily: 'Sans', 
                fontSize: 27 ,
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
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
