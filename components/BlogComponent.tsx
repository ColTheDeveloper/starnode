import { Image, StyleSheet, Text, Touchable, TouchableWithoutFeedback, View } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import { WebView } from 'react-native-webview';

const BlogComponent=({data,navigation}:any)=>{
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("User",{userId:data.author._id})}>
                <View style={styles.authorDetailsContainer}>
                    <Image 
                        source={{uri:data.author.profilePics}}
                        style={styles.authorImageStyle}
                    />
                    <View>
                        <Text style={styles.authorName}>{data.author.fullName}</Text>
                        <Text style={styles.blogCreatedDate}>{data.createdAt}</Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("Blog",{blogId:data._id})}>
                <View style={styles.blogDetailsContainer}>
                    <Text style={styles.titleStyle}>{data.title}</Text>
                    <View style={styles.innerBlogDetailsContainer} >
                        <Text style={styles.usernameStyle}>{data.author.username}</Text>
                        <View style={styles.dotStyle}></View>
                        <View style={styles.viewStyle}>
                            <AntDesign name="linechart" size={10} color={"grey"}/>
                            <Text style={styles.usernameStyle}>{data.views} views</Text>
                        </View>
                    </View>
                    {/* <WebView
                        source={{html: data.content}} 
                        style={{width:"100%",height:200}}
                    /> */}
                    <Image 
                        source={{uri:data.blogImgUrl}}
                        style={styles.blogImgStyle}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.hr}></View>
        </View>
    )
}
export default BlogComponent

const styles=StyleSheet.create({
    container:{
        paddingVertical:10,

    },
    authorDetailsContainer:{
        paddingHorizontal:15,
        flexDirection:"row",
        alignItems:"center",
        gap:10,

    },
    authorImageStyle:{
        width:50,
        height:50,
        borderRadius:50

    },
    authorName:{
        fontFamily:"poppins-bold",
        fontSize:20,
        padding:0
    },
    blogCreatedDate:{
        color:"grey",
        fontFamily:"poppins",
        padding:0
        
    },
    blogDetailsContainer:{
        paddingHorizontal:15,
        marginBottom:10

    },
    titleStyle:{
        fontFamily:"poppins-bold",
        fontSize:25,
    },
    innerBlogDetailsContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:4
    },
    usernameStyle:{
        color:"grey",
        fontFamily:"poppins-light"

    },
    dotStyle:{
        width:3,
        height:3,
        borderRadius:50,
        backgroundColor:"grey"
    },
    viewStyle:{
        flexDirection:"row",
        alignItems:"center",
        gap:4
    },
    blogImgStyle:{
        width:"100%",
        height:200,
        borderRadius:5
    },
    hr:{
        width:"100%",
        height:1,
        backgroundColor:"grey"
    }

})