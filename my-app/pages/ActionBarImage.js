import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Image, TouchableOpacity } from 'react-native';


const ActionBarImage = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen')}
        activeOpacity={0.5}>
        <Image
          source={require('my-app/assets/images/icons8-registration-48.png')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginRight: 15,
          }}
        />
        <View/>
      </TouchableOpacity>
    </View>
  );
};


export default ActionBarImage;