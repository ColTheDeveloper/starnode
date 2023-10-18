import { useContext } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AuthContext } from "../../context/AuthContext"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import AntDesign from "@expo/vector-icons/AntDesign"


type navigationProps={
    navigation:{
        navigate:(value:string)=>{}
    }
}

const UserScreen=({navigation}:navigationProps)=>{
    const AuthState=useContext(AuthContext)
    const user=AuthState?.user
    return(
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{uri:user?.profilePics}}
                    style={styles.profileImage} 
                />
                <Text style={styles.fullName}>{user?.fullName}</Text>
                <Text style={styles.username}>@{user?.username}</Text>
                <TouchableOpacity style={styles.editBtn} onPress={()=>navigation.navigate("Edit Profile")}>
                    <EvilIcons name="pencil" size={20} color={"white"} />
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.aboutContainer}>
                <Text style={styles.header}>About me</Text>
                <Text>{user?.fullName}</Text>
            </View>
            <View >
                <Text style={styles.header}>My Socials</Text>
                <View style={styles.socialContainer}>
                    <View style={styles.socialIcon}>
                        <AntDesign name="github" size={25} />
                    </View>

                    <View style={styles.socialIcon}>
                        <AntDesign name="facebook-square" size={25} /> 
                    </View>

                    <View style={styles.socialIcon}>
                        <AntDesign name="twitter" size={25} />
                    </View>

                    <View style={styles.socialIcon}>
                        <AntDesign name="linkedin-square" size={25} />
                    </View>
                    <View style={styles.socialIcon}>
                        <AntDesign name="youtube" size={25} />
                    </View>
                </View>
            </View>
            
        </ScrollView>
    )
}

export default UserScreen


const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:"white"
    },
    profileContainer:{
        alignItems:"center",
        gap:5
    },
    profileImage:{
        width:100,
        height:100,
        borderRadius:50,
    },
    fullName:{
        fontFamily:"poppins-bold",
        fontSize:25,
        lineHeight:27,
        marginTop:10
    },
    username:{
        color:"#495057",
        fontFamily:"poppins",
        lineHeight:18
    },
    editBtn:{
        backgroundColor:"#0000ff",
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:13,
        flexDirection:"row",
        gap:5,
        marginTop:10,
        justifyContent:"center"
    },
    editBtnText:{
        color:"white",
        fontFamily:"poppins-bold",

    },
    aboutContainer:{
        marginVertical:25
    },
    header:{
        fontFamily:"poppins-bold",
        fontSize:20,
        marginBottom:20
    },
    socialContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    socialIcon:{
        padding:20,
        borderWidth:1,
        borderRadius:50,        
    }
})