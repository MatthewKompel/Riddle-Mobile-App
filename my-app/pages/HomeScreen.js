import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Button, Vibration, Pressable, TextInput} from 'react-native';
import ActionBarImage from './ActionBarImage';
import axios from 'axios';
import { StatusBar } from "expo-status-bar";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
]

const Block = ({ letter }: { letter: string }) => (
  <View style={styles.guessSquare}>
    <Text style={styles.guessLetter}>{letter}</Text>
  </View>
)

const GuessRow = ({ guess }: { guess: string }) => {
  const letters = guess.split("")

  return (
    <View style={styles.guessRow}>
      <Block letter={letters[0]} />
      <Block letter={letters[1]} />
      <Block letter={letters[2]} />
      <Block letter={letters[3]} />
      <Block letter={letters[4]} />
      <Block letter={letters[5]} />
      <Block letter={letters[6]} />
    </View>
  )
}

const KeyboardRow = ({
  letters,
  onKeyPress,
}: {
  letters: string[],
  onKeyPress: (letter: string) => void,
}) => (
  <View style={styles.keyboardRow}>
    {letters.map(letter => (
      <TouchableOpacity onPress={() => onKeyPress(letter)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

const Keyboard = ({ onKeyPress }: { onKeyPress: (letter: string) => void }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"]
  
  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={() => onKeyPress("ENTER")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>ENTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// MAIN SCREEN
const HomeScreen = ({ navigation }) => {
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => <ActionBarImage />,
      });
    }, [navigation]);
  

  const [riddle, setRiddle] = React.useState("Riddle Placeholder")
  const [answer,setAnswer] = useState("")
  const [guess, setGuess] = React.useState("")
  const [usedHint, setUsedHint] = useState(false)
  const [guessCounter, setGuessCounter] = useState(0)
  const [guessHistory, setHistory] = useState("")
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(loggedIn) {
      getRiddle()
    }
  },[loggedIn]);
  async function loginUser() {
    await axios.post('https://riddlebackend-production.up.railway.app/loginUser',{
        username: email,
        password: password
    }).then(response => {
      console.log("RES",response.data)
      if(response.data == "successful login") {
        setLoggedIn(true)
      } else {
        alert("Incorrect Email or Password")
      }
    })
    .catch(error => console.info(error))
  }
  async function getRiddle() {
    console.log('getting riddle')
    await axios.get('https://riddlebackend-production.up.railway.app/getRiddle').then(response => {
      setRiddle(response.data.Question)
      console.log(response.data.Answer)
      console.log(response.data.Answer.length)
      setAnswer(response.data.Answer)
    })
    .catch(error => console.info(error))
  }
  async function getHint() {
    console.log("getting hint")
    setGuess(answer[0])
    setUsedHint(true)
  }
  const handleKeyPress = (letter: string) => {

    if (letter === "ENTER") {
      if (guess.length < answer.length) {
        alert("Word too short.")
        return
      }
      else if (guess.length > answer.length) {
        alert("Word too long.")
        return
      }
      else if(guess.toUpperCase() !== answer.toUpperCase()) {
        alert("Incorrect")
        setGuessCounter(guessCounter+1)

        if(guessCounter === 5) {
          alert("You lose! The word was" + {answer})
        }
        if(usedHint) {
          setGuess(answer[0])
        } else {
          setGuess("")
        }

        return
      } else if (guess.toUpperCase() == answer.toUpperCase()) {
        alert("You Win! Come back tomorrow to see a brand new riddle!")
        setGuessCounter(guessCounter+1)
        setGuess("")
        handleWin()
        return
      }
    }

    async function handleWin() {
      console.log("GUESSES USED",guessCounter)
    }
    /*
    if (!words.includes(guess)) {
      alert("Not a valid word.")
      return
    }

    if (guess === activeWord) {
      alert("You win!")
      Vibration.vibrate(PATTERN)
      return
    }
    */

    if (letter === "⌫") {
      setGuess(guess.slice(0, -1))
      return
    }

    setGuess(guess + letter)
    
  }
  if(loggedIn) {
    return (
    
      <SafeAreaView style={{ flex: 1 }}>
        
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          {riddle}
        </Text>

        <View style={ styles.dashes }>
          <GuessRow guess={guess}/>
        </View>

        <Text style={{ textAlign: 'center', color: 'black' }}>
          Guesses Made: {guessHistory}
        </Text>
        <Pressable 
          disabled = {usedHint}
          style={[styles.button, {backgroundColor: usedHint ? '#607D8B' : 'green'}]}
          onPress = {getHint}
        >
          <Text style={styles.text}>Hint</Text>
        </Pressable>
        
        <Keyboard onKeyPress={handleKeyPress} />
      </SafeAreaView>

      
    );
  } else {
    return (
      <View style={styles.container}>
        
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Password"
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
})

export default HomeScreen;