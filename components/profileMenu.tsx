import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"

type ProfileMenuProps={
    iconName:string
    name:string
    handleClick:()=>{}
}

const ProfileMenu=({iconName,name,handleClick}:ProfileMenuProps)=>{
    return(
        <TouchableOpacity onPress={()=>handleClick()} style={styles.menuContainer}>
            <View style={styles.innerContainer}>
                <AntDesign name={`${iconName}`} size={25} color="black" />
                <Text>{name}</Text>
            </View>
            <AntDesign name="right"  />
        </TouchableOpacity>
    )
}

export default ProfileMenu 


const styles=StyleSheet.create({
    menuContainer:{
        flexDirection:"row",
        paddingHorizontal:20,
        paddingVertical:15,
        justifyContent:"space-between",
        alignItems:"center"

    },
    innerContainer:{
        flexDirection:"row",
        gap:8,
        alignItems:"center"
    }
})