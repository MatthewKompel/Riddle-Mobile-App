import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Button } from 'react-native';
import ActionBarImage from './ActionBarImage';
import axios from 'axios';

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

const words = ["LIGHT", "WRUNG", "COULD", "PERKY", "MOUNT", "WHACK", "SUGAR"]

interface IGuess {
  [key: number]: string;
}

const defaultGuess: IGuess = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
}

// MAIN SCREEN
const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ActionBarImage />,
    });
  }, [navigation]);

  const [riddle, setRiddle] = React.useState("Riddle Placeholder")
  const [activeWord] = React.useState(words[0])
  const [guess, setGuess] = React.useState("")
  const [guessIndex, setGuessIndex] = React.useState(0)
  // const [guesses, setGuesses] = React.useState < IGuess > defaultGuess

  async function getRiddle() {
    console.log('getting riddle')
    await axios.get('https://riddlebackend-production.up.railway.app/getRiddle').then(response => {
      setRiddle(response.data.Question)
    })
    .catch(error => console.info(error))
  }

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex]

    if (!words.includes(guess)) {
      alert("Not a valid word.")
      return
    }

    if (guess === activeWord) {
      alert("You win!")
      return
    }

    if (letter === "⌫") {
      setGuess(guess.slice(0, -1))
      return
    }

    setGuess(guess + letter)
    
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        onPress={getRiddle}
        title="Get Riddle"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        {riddle}
      </Text>
      <View>
        <GuessRow guess={guess} />
        <GuessRow guess="" />
        <GuessRow guess="" />
        <GuessRow guess="" />
        <GuessRow guess="" />
        <GuessRow guess="" />
      </View>
      <View style={ styles.dashes }>
        <View style={styles.dashEmptyContainer} ><Text style={styles.dashBlankItem}>  </Text></View>
        <View style={styles.dashItemContainer} ><Text style={styles.dashItem}>E</Text></View>
        <View style={styles.dashItemContainer} ><Text style={styles.dashItem}>G</Text></View>
        <View style={styles.dashItemContainer} ><Text style={styles.dashItem}>G</Text></View>
        <View style={styles.dashEmptyContainer} ><Text style={styles.dashBlankItem}>  </Text></View>
      </View>
      <Text style={{ textAlign: 'center', color: 'black' }}>
        ROD
      </Text>
      <Keyboard onKeyPress={handleKeyPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    justifyContent: "space-between",
    flex: 1,
  },

  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
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
})

export default HomeScreen;