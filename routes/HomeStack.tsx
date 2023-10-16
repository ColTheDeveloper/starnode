import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"

const Stack= createNativeStackNavigator()

const HomeStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShadowVisible:false,headerTitleStyle:{fontSize:16,fontFamily:"poppins-bold"}}}>
            <Stack.Screen name='Feed' component={Home} />
        </Stack.Navigator>
    )
}

export default HomeStack