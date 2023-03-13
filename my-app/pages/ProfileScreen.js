import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import ActionBarImage from './ActionBarImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from "react-native-chart-kit";
import { Dimensions, Pressable, StyleSheet} from "react-native";
const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [5, 6, 12, 14, 20, 22]
    }
  ]
};

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

  async function logoutUser() {
    console.log("logging out user")
    AsyncStorage.removeItem("riddle_user")
  }
  
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
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Statistics
      </Text>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Number of Wins: {userData.statistics.total_wins ? userData.statistics.total_wins : ""}
      </Text>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Number of Plays: {userData.statistics.total_plays ? userData.statistics.total_plays : ""}
      </Text>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Current Winstreak: {userData.statistics.winstreak ? userData.statistics.winstreak : ""}
      </Text>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Longest Winstreak: {userData.statistics.longest_winstreak ? userData.statistics.longest_winstreak : ""}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 10,
          marginTop: 50
        }}>
        Guess Distribution
      </Text>
      <BarChart
        style={{paddingRight: 0}}
        data={data}
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
       
        style={[styles.button, {backgroundColor:'#ba1c21'}]}
        onPress = {logoutUser}
      >
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </SafeAreaView>
    
  );
};
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
  }
})
export default HomeScreen;