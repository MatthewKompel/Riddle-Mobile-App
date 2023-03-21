import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput,Modal, Image} from 'react-native';
import ActionBarProfile from './ActionBarProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from "react-native-chart-kit";
import { Dimensions, Pressable, StyleSheet} from "react-native";
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
const screenWidth = Dimensions.get("window").width;



const chartConfig = {
  backgroundGradientFrom: "#000000",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#000000",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 197, 31, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false // optional
};

const HomeScreen = ({ navigation }) => {
  const [loggedIn,setLoggedIn] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [0,0,0,0,0,0]
      }
    ]
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ActionBarProfile />,
    });
  }, [navigation]);
  const [userData,setUserData] = useState({
    username: "",
    statistics: {
      total_wins: ""
    }
  })
  async function getUser() {
      try{
        const user = await AsyncStorage.getItem("riddle_user")
        const jsonUser = JSON.parse(user)
        if(jsonUser && jsonUser.game_history) {
          setLoggedIn(true)
          setUserData(jsonUser)
          var guessCounts = [0,0,0,0,0,0]
          for (const x of jsonUser.game_history) {
            guessCounts[x.num_guesses-1] = guessCounts[x.num_guesses-1] + 1
          }
          setTableData({
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [
              {
                data: [guessCounts[0],guessCounts[1],guessCounts[2],guessCounts[3],guessCounts[4],guessCounts[5]]
              }
            ]
          })
        }
      } catch(e) {
        throw(e)
      }
    }
  useEffect(() => {
    getUser()
  },[]);

  async function loginUser() {
    setLoading(true)
    await axios.post('https://riddlebackend-production.up.railway.app/loginUser',{
        username: email,
        password: password,
    }).then(response => {
      if(response.data.email) {
        AsyncStorage.setItem("riddle_user",JSON.stringify(response.data))
        setLoggedIn(true)
        getUser()
        setShowModal(false)
      } else {
        alert("Incorrect Email or Password")
      }
      setLoading(false)
    })
    .catch(error => console.info(error))
  }
  async function getUser() {
    try{
     
      const user = await AsyncStorage.getItem("riddle_user")
      const jsonUser = JSON.parse(user)
      if(jsonUser && jsonUser.game_history) {
        
        setUserData(jsonUser)
        var guessCounts = [0,0,0,0,0,0]
        for (const x of jsonUser.game_history) {
          guessCounts[x.num_guesses-1] = guessCounts[x.num_guesses-1] + 1
        }
        setTableData({
          labels: ["1", "2", "3", "4", "5", "6"],
          datasets: [
            {
              data: [guessCounts[0],guessCounts[1],guessCounts[2],guessCounts[3],guessCounts[4],guessCounts[5]]
            }
          ]
        })
        setLoggedIn(true)
      }
    } catch(e) {
      throw(e)
    }
  }
  async function signUpUser() {

  }
  async function startSignUp() {
    setShowModal(true)
  }
  async function logoutUser() {
    console.log("logging out user")
    AsyncStorage.removeItem("riddle_user")
    setLoggedIn(false)
  }
  if(loggedIn) {
    return (
      
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginVertical: 10,
            display: loading? 'none': ''
          }}>
          Your Name: {userData.username ? userData.username: ""}
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
            display: loading? 'none': ''
          }}>
          Statistics
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginVertical: 10,
            display: loading? 'none': ''
          }}>
          Number of Wins: {userData.total_wins ? userData.total_wins : ""}
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginVertical: 10,
            display: loading? 'none': ''
          }}>
          Number of Plays: {userData.total_plays ? userData.total_plays : ""}
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginVertical: 10,
            display: loading? 'none': ''
          }}>
          Current Winstreak: {userData.winstreak ? userData.winstreak : 0}
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginVertical: 10,
            display: loading? 'none': ''
          }}>
          Longest Winstreak: {userData.longest_winstreak ? userData.longest_winstreak : ""}
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
            marginTop: 50,
            display: loading? 'none': ''
          }}>
          Guess Distribution
        </Text>
        <BarChart
          style={{paddingRight: 0, display: loading? 'none': ''}}
          data={tableData}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          fromZero={true}
          chartConfig={chartConfig}
          withHorizontalLabels={false}
          showValuesOnTopOfBars={true}
        />
        {/* <Text style={{ textAlign: 'center', color: 'black', marginTop: 20 }}>
          Invite Your Friends!
        </Text> */}
        <Pressable 
        
          style={[styles.button, {backgroundColor:'#ba1c21', display: loading? 'none': ''}]}
          onPress = {logoutUser}
        >
          <Text style={[styles.text, {display: loading? 'none': ''}]}>Logout</Text>
        </Pressable>
      </SafeAreaView>
      
      );
    } else {
      return (
        <View style={styles.container}>
          <View style ={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', display: loading? '': 'none'}}>
          <Image
              source={require('my-app/assets/loading.gif')}
              style={{
                width: 120,
                height: 120,
                borderRadius: 40 / 2,
              }}
            />
          </View>
          <StatusBar style="auto" />
          
          <View style={[styles.inputView,{display: loading? 'none': ''}]}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username or Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            /> 
          </View> 
          <View style={[styles.inputView,{display: loading? 'none': ''}]}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            /> 
          </View> 
          <TouchableOpacity style = {{display: loading? 'none': ''}}>
            <Text style={styles.forgot_button}>Forgot Password?</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={[styles.loginBtn,{display: loading? 'none': ''}]} onPress={loginUser}>
            <Text style={styles.loginText}>LOGIN</Text> 
          </TouchableOpacity>
          
          <Text style = {{display: loading? 'none': ''}}>{'\n'}Dont have an account?</Text> 
          <TouchableOpacity style = {{display: loading? 'none': ''}} onPress={startSignUp}>
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
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 135,
    marginVertical:10,
    marginTop: 50
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
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
export default HomeScreen;