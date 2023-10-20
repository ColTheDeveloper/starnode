import { StyleSheet, Text, TouchableOpacity } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"

type EditProfileProps={
    isOpen:boolean
    handlePress:()=>void
    headerText:string
}

const EditProfileMenuHeader=({isOpen, handlePress,headerText}:EditProfileProps)=>{
    return(
        <TouchableOpacity style={styles.showMenu} onPress={handlePress}>
            <Text style={styles.headerText}>{headerText}</Text>
            <AntDesign name={isOpen?"down" :"right"} size={20} />
        </TouchableOpacity>
    )
}

export default EditProfileMenuHeader

const styles=StyleSheet.create({
    showMenu:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:10
    },
    headerText:{
        fontFamily:"poppins-bold",
        fontSize:25,
        color:"#4c566a"
    }
})