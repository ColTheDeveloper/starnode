import { ActivityIndicator, StyleSheet, View } from "react-native"


const ContentLoading=()=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="black" />
        </View>
    )
}
export default ContentLoading

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingTop:10
    }
})