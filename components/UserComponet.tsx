import { Image, StyleSheet, Text, View } from "react-native"

const UserComponent=({data}:any)=>{
    return(
        <>
            <View style={styles.container}>
                <Image 
                    source={{uri:data.profilePics}}
                    style={styles.imageStyle}
                />
                <View style={styles.nameContainer}>
                    <Text style={styles.fullNameStyle}>{data.fullName}</Text>
                    <Text style={styles.usernameStyle}>@{data.username}</Text>
                </View>
            </View>
            <View style={styles.hr}></View>
        </>
    )
}
export default UserComponent

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        paddingHorizontal:15,
        paddingVertical:15
    },
    imageStyle:{
        width:50,
        height:50,
        borderRadius:50
    },
    nameContainer:{

    },
    fullNameStyle:{
        fontFamily:"poppins-bold",
        fontSize:18,
        lineHeight:20
    },
    usernameStyle:{
        color:"grey",
        fontSize:14,
        lineHeight:16
    },
    hr:{
        width:"100%",
        height:1,
        backgroundColor:"grey"
    }

})