import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import ProfileScreen from "../screens/ProfileScreen"
import UserScreen from "../screens/profileScreens/userScreen"
import ProfileEdit from "../screens/profileScreens/profileEdit"
import WriteBlog from "../screens/WriteBlog"
import WriteBlogHeader from "../components/WriteBlogHeader"
import MyBlogScreen from "../screens/MyBlogScreen"

const Stack= createNativeStackNavigator()

const ProfileStack=()=>{
    return(
        <Stack.Navigator screenOptions={{headerShadowVisible:false,headerTitleStyle:{fontSize:16,fontFamily:"poppins-bold"}}}>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='User' component={UserScreen} options={{headerTitle:""}}/>
            <Stack.Screen name='Edit Profile' component={ProfileEdit} />
            <Stack.Screen name='Write Blog' component={WriteBlog}  options={{headerShown:false}}/>
            <Stack.Screen name='My Blogs' component={MyBlogScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack