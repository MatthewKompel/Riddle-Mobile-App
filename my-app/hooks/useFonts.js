import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'Sans': require('my-app/assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf'),
  });