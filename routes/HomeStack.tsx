import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import UserDetailScreen from "../screens/userDetailScreen"
import BlogDetailScreen from "../screens/BlogDetailScreen"

const Stack= createNativeStackNavigator()

const HomeStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShadowVisible:false,headerTitleStyle:{fontSize:16,fontFamily:"poppins-bold"}}}>
            <Stack.Screen name='Feed' component={Home} />
            <Stack.Screen name='User' component={UserDetailScreen} />
            <Stack.Screen name='Blog' component={BlogDetailScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack