import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import ActionBarImage from './ActionBarImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ActionBarImage />,
    });
  }, [navigation]);
  const [userData,setUserData] = useState({
    username: "",
    statistics: {
      total_wins: ""
    }
  })
  useEffect(() => {
  
    async function getUser() {
      try{
        const user = await AsyncStorage.getItem("riddle_user")
        setUserData(JSON.parse(user))
      } catch(e) {
        throw(e)
      }
    }
    getUser()
  },[]);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Your Name: {userData.username ? userData.username: ""}
      </Text>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Number of Wins: {userData.statistics.total_wins ? userData.statistics.total_wins : ""}
      </Text>
      <Text style={{ textAlign: 'center', color: 'black' }}>
        Invite Your Friends!
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;