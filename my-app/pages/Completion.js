import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Button, Modal} from 'react-native';  
  
export const WinPopup = (props) => {  
    return (  
      <>
      <View style = {styles.container}>  
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
        <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          {...props}
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          {/*All views of Modal*/}  
              <View style = {styles.modal}>  
                <Text style = {styles.text}>You Win!</Text>  
                <Text style = {styles.text}>Come back tomorrow to see a brand new riddle!</Text>  
                <Button title="Click To Close Modal" 
                onPress={() => setModalVisible(!modalVisible)}/>  
              </View>  
        </Modal>  
      </View>  
      </>
    );  
}  

export const LosePopup = (props) => {  
  return (  
    <>
    <View style = {styles.container}>  
      <Modal            
        animationType = {"fade"}  
        transparent = {false}  
        {...props}
        onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
        {/*All views of Modal*/}  
            <View style = {styles.modal}>  
              <Text style = {styles.text}>You ran out of Guesses! The word was " + answer </Text>
              <Text style = {styles.text}>Come back tomorrow to see a brand new riddle!</Text>  
              <Button title="Click To Close Modal" 
              onPress={() => setModalVisible(!modalVisible)}/>  
            </View>  
      </Modal>  
    </View>  
    </>
  );  
}  
  
const styles = StyleSheet.create({
  container: {  
    flex: 1,  
    alignItems: 'center',  
    justifyContent: 'center',  
    backgroundColor: '#ecf0f1',  
  },  
  modal: {  
  justifyContent: 'center',  
  alignItems: 'center',   
  backgroundColor : "#00BCD4",   
  height: 300 ,  
  width: '80%',  
  borderRadius:10,  
  borderWidth: 1,  
  borderColor: '#fff',    
  marginTop: 80,  
  marginLeft: 40,  
   
   },  
   text: {  
      color: '#3f2949',  
      marginTop: 10  
   }  
});  