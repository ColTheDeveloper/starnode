import { StyleSheet, Text, View } from "react-native"


const UserDetailScreen=({route}:any)=>{
    const {userId}=route.params
    console.log(route.params)
    return(
        <View style={styles.container}>
            <Text>{userId}</Text>
        </View>
    )
}
export default UserDetailScreen;

const styles=StyleSheet.create({
    container:{

    },

})