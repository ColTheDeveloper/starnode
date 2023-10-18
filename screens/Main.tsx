import AntDesign from "@expo/vector-icons/AntDesign"
import HomeStack from '../routes/HomeStack';
import SearchStack from '../routes/SearchStack';
import ProfileStack from '../routes/ProfileStack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Tab= createBottomTabNavigator()
const Stack= createNativeStackNavigator()

const MainScreen=()=>{
    const AuthState=useContext(AuthContext)
    return(
        <NavigationContainer>
          {AuthState?.user?(
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
    )
}

export default MainScreen