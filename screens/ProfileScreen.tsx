import { useContext } from "react"
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AuthContext } from "../context/AuthContext"
import ProfileMenu from "../components/profileMenu"
import AntDesign from "@expo/vector-icons/AntDesign"
import Hr from "../components/Hr"

type navigateProps={
    navigation:{
        navigate:(value:string)=>{}
    }
}
const ProfileScreen=({navigation}:navigateProps)=>{
    const AuthState=useContext(AuthContext)
    const user=AuthState?.user
    return(
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image 
                    source={{uri:user?.profilePics}}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.fullName}>{user?.fullName}</Text>
                    <Text style={styles.username}>@{user?.username}</Text>
                </View>
            </View>
            <View style={styles.profileMenu}>
                {/* my reading history, my blogs, setting and write blog */}
                <ProfileMenu 
                    iconName="user"
                    name="Profile"
                    handleClick={()=>navigation.navigate("User")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="edit"
                    name="Write blog"
                    handleClick={()=>navigation.navigate("Write Blog")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="addfile"
                    name="My blogs"
                    handleClick={()=>navigation.navigate("My blogs")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="clockcircleo"
                    name="My recent history"
                    handleClick={()=>navigation.navigate("My blogs")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="setting"
                    name="About"
                    handleClick={()=>navigation.navigate("My blogs")}
                />

            </View>
            <View style={styles.profileMenu}>
                {/* social media  */}
                <ProfileMenu 
                    iconName="github"
                    name="GitHub"
                    handleClick={async()=>await Linking.openURL("https://github.com/colthedeveloper")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="twitter"
                    name="Twitter"
                    handleClick={async()=>await Linking.openURL("https://x.com/colthedeveloper")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="linkedin-square"
                    name="Linkedin"
                    handleClick={async()=> await Linking.openURL("https://linkedin.com/in/colthedeveloper")}
                />
                <Hr />
                <ProfileMenu 
                    iconName="earth"
                    name="My Portfolio"
                    handleClick={async()=> await Linking.openURL("")}
                />
            </View>
            <View style={styles.logoutProfileMenu }>
                {/* Log out */}
                <TouchableOpacity onPress={()=>AuthState?.logout()} style={styles.logout}>
                    <AntDesign name="logout" size={25} color="red" />
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default ProfileScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:15,
    },
    profileContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:15
    },
    profileImage:{
        width:70,
        height:70,
        borderRadius:50,
    },
    fullName:{
        fontFamily:"poppins-bold",
        fontSize:18,
        lineHeight:20
        
    },
    username:{
        color:"grey",
        fontSize:14,
        lineHeight:16
    },
    profileMenu:{
        backgroundColor:"white",
        marginTop:20,
        borderRadius:7
    },
    logoutProfileMenu:{
        backgroundColor:"white",
        marginTop:20,
        marginBottom:40,
        borderRadius:7
    },
    logout:{
        paddingHorizontal:20,
        paddingVertical:15,
        flexDirection:"row",
        gap:7,
        alignItems:"center"
    },
    logoutText:{
        color:"red"
    }
})