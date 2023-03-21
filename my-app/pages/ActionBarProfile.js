import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, View, Image, TouchableOpacity } from 'react-native';


const ActionBarProfile = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
        <Text> { userData.username } </Text>
    </View>
  );
};


export default ActionBarProfile;