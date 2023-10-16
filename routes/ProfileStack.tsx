import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"

const Stack= createNativeStackNavigator()

const ProfileStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShadowVisible:false,headerTitleStyle:{fontSize:16,fontFamily:"poppins-bold"}}}>
            <Stack.Screen name='Profile' component={Home} />
        </Stack.Navigator>
    )
}

export default ProfileStack