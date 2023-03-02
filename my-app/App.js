import { StatusBar } from 'expo-status-bar';
import React, { useCallback, Fragment, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput,Modal } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import { Svg } from 'expo'; 
import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
import ActionBarImage from './pages/ActionBarImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

//https://icons8.com/license
//sf-black profile icons

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();


export default function StackScreen() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false)

  const [signupUsername, setSignupUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  async function loginUser() {
    await axios.post('https://riddlebackend-production.up.railway.app/loginUser',{
        username: email,
        password: password,
    }).then(response => {
      if(response.data.email) {
        AsyncStorage.setItem("riddle_user",JSON.stringify(response.data))
        setLoggedIn(true)


      } else {
        alert("Incorrect Email or Password")
      }
    })
    .catch(error => console.info(error))
  }
  async function startSignUp() {
    setShowModal(true)
  }

  async function signUpUser() {
    //Set sign up verifications here
  }
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
    if(loggedIn) {
    
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
    } else {
    return (
      <View style={styles.container}>
        
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username or Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View> 
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.loginBtn} onPress={loginUser}>
          <Text style={styles.loginText}>LOGIN</Text> 
        </TouchableOpacity>
        
        <Text>{'\n'}Dont have an account?</Text> 
        <TouchableOpacity onPress={startSignUp}>
          <Text>Sign Up</Text> 
        </TouchableOpacity>
        <Modal 
          visible = {showModal}
          
        >
          <View style = {{backgroundColor: "#ebab8f",flex: 1}}  >
            <View style = {{backgroundColor: "#ffffff", margin: 40, paddingTop: 100, marginTop: 150, borderTopLeftRadius: 10,borderTopRightRadius: 10, borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}}>
              <Text style = {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> 
                Create Your Account!
                {'\n'}
                {'\n'}
              </Text>
              <TextInput
                style={styles.signupInput}
                placeholder="Username"
                placeholderTextColor="#003f5c"
                onChangeText={(signupUsername) => setSignupUsername(signupUsername)}
              /> 
             <TextInput
                style={styles.signupInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(signupEmail) => setSignupEmail(signupEmail)}
              /> 
              <TextInput
                style={styles.signupInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(signupPassword) => setSignupPassword(signupPassword)}
              /> 
              <TouchableOpacity style={styles.signupBtn} onPress={signUpUser}>
                <Text style={styles.loginText}>SIGN UP</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> 
      );
    }
  } 
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 135,
    marginVertical:10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,

    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    justifyContent: "space-between",
    flex: 1, // TELLS YOU HOW MUch OF THE SCREEN IT TAKES UP, 1 = 100%
  },

  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  guessSquare: {
    borderColor: "#d3d6da",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },

  guessLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#878a8c",
  },

  // DASHES
  dashInputStyle:{
    height: 40, 
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
    flexWrap:"wrap"
  },
  dashEmptyContainer:{
    flex:0,
    padding:5,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItemContainer:{
    flex:0,
    padding:5,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderBottomColor:"black"
  },
  dashItem:{
    width:20,
    color: '#841584',
    fontSize:20,
    marginLeft: 4,
    borderBottomWidth:1,
    borderBottomColor:"black"
  },
  dashBlankItem:{
    width:20,
    fontSize:20,
  },

  // KEYBOARD
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

  //Login
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#f79b65",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 10,
    padding: 10,
    marginLeft: 10,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#fa8541",
  },
  //Sign up 
  signupInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  signupBtn: {
    width: "60%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 64,
    backgroundColor: "#fa8541",
  },
})
