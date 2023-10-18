import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import ProfileScreen from "../screens/ProfileScreen"
import UserScreen from "../screens/profileScreens/userScreen"
import ProfileEdit from "../screens/profileScreens/profileEdit"

const Stack= createNativeStackNavigator()

const ProfileStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShadowVisible:false,headerTitleStyle:{fontSize:16,fontFamily:"poppins-bold"}}}>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='User' component={UserScreen} options={{headerTitle:""}}/>
            <Stack.Screen name='Edit Profile' component={ProfileEdit} />
        </Stack.Navigator>
    )
}

export default ProfileStack