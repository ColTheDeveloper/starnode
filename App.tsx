import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from "expo-splash-screen"
import AntDesign from "@expo/vector-icons/AntDesign"
import HomeStack from './routes/HomeStack';
import SearchStack from './routes/SearchStack';
import ProfileStack from './routes/ProfileStack';
import { useCallback, useEffect, useState } from 'react';
import {useFonts} from "expo-font"
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';

SplashScreen.preventAutoHideAsync()
const Tab= createBottomTabNavigator()
const Stack= createNativeStackNavigator()

export default function App(){
  const [user,setUser]=useState<string | null>(null)

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {user?(
          <Tab.Navigator screenOptions={{ headerShown: false,tabBarShowLabel:false,tabBarIconStyle:{color:"black",fontSize:100} }}>
            <Tab.Screen 
              name='Home' 
              component={HomeStack} 
              options={{tabBarIcon:(tabInfo)=>{
                return(
                  <AntDesign name="home" size={tabInfo.size} color={tabInfo.focused?"#0000FF":"black"} />
                )
              }}} 
            />
            <Tab.Screen 
              name='Search Page' 
              component={SearchStack}  
              options={{tabBarIcon:(tabInfo)=>{
                return(
                  <AntDesign name="search1" size={tabInfo.size} color={tabInfo.focused?"#0000FF":"black"} />
                )
              }}} 
            />
            <Tab.Screen 
              name='Profile Page' 
              component={ProfileStack}
              options={{tabBarIcon:(tabInfo)=>{
                return(
                  <AntDesign name="user" size={tabInfo.size} color={tabInfo.focused?"#0000FF":"black"} />
                )
              }}}   
            />
          </Tab.Navigator>

        ):(
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="signin" component={LoginScreen} />
            <Stack.Screen name="signup" component={RegisterScreen} />

          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:"100%"
  },
});
