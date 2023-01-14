import React from 'react';

import { View, Image } from 'react-native';

const ActionBarImage = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={require('my-app/assets/images/icons8-registration-64.png')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginRight: 15,
        }}
      />
    </View>
  );
};

export default ActionBarImage;