import { StyleSheet, Text, View } from "react-native"


const BlogDetailScreen=({route}:any)=>{
    const {blogId}=route.params
    console.log(blogId)
    return(
        <View style={styles.container}>
            <Text>{blogId}</Text>
        </View>
    )
}
export default BlogDetailScreen;

const styles=StyleSheet.create({
    container:{

    },

})