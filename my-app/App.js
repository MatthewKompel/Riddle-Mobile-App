import React, {useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Righteous_400Regular,
} from '@expo-google-fonts/righteous';
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
    Righteous_400Regular,
  });

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return (
      <NavigationContainer >
        
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            cardStyle: { backgroundColor: '#AEB8FE' }
        }}
          
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen }
            
            options={{ 
              title: 'Riddle',
              headerStyle: {
                backgroundColor: '#27187E',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: 'Righteous_400Regular',
                fontSize: 28,
              },
              
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ 
              title: 'Your Profile', //ghetto fix
              headerStyle: {
                backgroundColor: '#27187E',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'right',
              headerTitleStyle: {
                fontFamily: 'Righteous_400Regular',
                fontSize: 28,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
    
  } 
}