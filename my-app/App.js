import React, {useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

//https://icons8.com/license
//sf-black profile icons

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();


export default function StackScreen() {

  const [signupUsername, setSignupUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  useEffect(() => {
    async function findUser() {
      const user = await AsyncStorage.getItem("riddle_user")
      console.log("is user in", user)
      if (user) {
        setLoggedIn(true)
      }
    }
    findUser()

  })
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return (
      <NavigationContainer >
        
        <Stack.Navigator
          initialRouteName="HomeScreen"
          
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen }
            
            options={{ 
              title: 'Riddle',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'OpenSans_700Bold',
                fontSize: 28,
              },
              
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ 
              title: 'Your Profile    ', //ghetto fix
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'OpenSans_700Bold',
                fontSize: 28,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
    
  } 
}