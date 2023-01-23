import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ActionBarImage from './ActionBarImage';

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ActionBarImage />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Number of Wins: 10
      </Text>
      <Text style={{ textAlign: 'center', color: 'black' }}>
        Invite Your Friends!
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;