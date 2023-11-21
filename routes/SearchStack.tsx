import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SearchScreen from "../screens/SearchScreen"
import { StyleSheet } from "react-native"
import UserDetailScreen from "../screens/userDetailScreen"
import BlogDetailScreen from "../screens/BlogDetailScreen"

const Stack= createNativeStackNavigator()

const SearchStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShadowVisible:false,headerTitleStyle:{fontSize:16,fontFamily:"poppins-bold"}}}>
            <Stack.Screen name='Search' component={SearchScreen} />
            <Stack.Screen name='User' component={UserDetailScreen} />
            <Stack.Screen name='Blog' component={BlogDetailScreen} />
        </Stack.Navigator>
    )
}

export default SearchStack



const styles=StyleSheet.create({
    headerStyle:{
        backgroundColor:"white",
        
    },
})