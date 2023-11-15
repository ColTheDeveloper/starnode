import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"



const WriteBlogHeader=()=>{
    return(
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <AntDesign name="save" size={15} color="#495057"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <AntDesign name="file1" size={15} color="#495057"/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.publishBtn}>Publish</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
export default WriteBlogHeader

const styles=StyleSheet.create({
    header:{
        alignItems:"flex-end",
        width:"90%"
    },
    headerContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        gap:20
    },
    publishBtn:{
        color:"white",
        backgroundColor:"#364fc7",
        paddingHorizontal:10,
        paddingVertical:8,
        borderRadius:20,
        fontSize:17,
    },
    iconContainer:{
        borderWidth:1,
        padding:10,
        borderRadius:20,
        borderColor:"#e9ecef"
    }

})