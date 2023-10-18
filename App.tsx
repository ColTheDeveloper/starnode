import * as SplashScreen from "expo-splash-screen"
import { useCallback} from 'react';
import {useFonts} from "expo-font"
import { StyleSheet, View } from 'react-native';
// import LoginScreen from './screens/LoginScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import RegisterScreen from './screens/RegisterScreen';
// import useAuth from './Hooks/useAuth';
// import { auth } from './firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
import AuthContextProvider from './context/AuthContext';

import MainScreen from './screens/Main';

SplashScreen.preventAutoHideAsync()


export default function App(){

  const [fontsLoaded]=useFonts({
    'poppins-light':require("./assets/fonts/Poppins-ExtraLight.ttf"),
    'poppins':require("./assets/fonts/Poppins-Regular.ttf"),
    'poppins-bold':require("./assets/fonts/Poppins-Bold.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if(!fontsLoaded){
    return null
  }

  return (
    <AuthContextProvider>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <MainScreen />
      </View>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height:"100%"
  },
});
