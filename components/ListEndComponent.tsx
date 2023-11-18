import { StyleSheet, Text, View } from "react-native"


const ListEndComponent=()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>You've reached the end 👋</Text>
        </View>
    )
}

export default ListEndComponent

const styles=StyleSheet.create({
    container:{
        alignItems:"center",
        marginVertical:20
    },
    textStyle:{
        fontSize:18
    }

})