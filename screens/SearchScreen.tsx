import { useState } from "react"
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, TextInput, StyleSheet, ViewStyle, Pressable } from "react-native"
import { GlobalStyles } from "../styles/GlobalStyles"
import AntDesign from "@expo/vector-icons/AntDesign"

const SearchScreen=()=>{
    const [searchQuery,setSearchQuery]=useState("")
    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <AntDesign name="search1" size={20}/>
                <TextInput 
                    placeholder="Search for people and articles...."
                    onChangeText={value=>setSearchQuery(value)}
                />
            </View>
        </View>
    )
}

export default SearchScreen


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:'white',
        paddingHorizontal:15
    },
    inputContainer:{
        borderWidth:1,
        borderColor:"#e9ecef",
        width:"100%",
        height:40,
        borderRadius:50,
        flexDirection:"row",
        alignItems:"center",
        gap:4,
        paddingHorizontal:10,
        backgroundColor:"#f8f9fa",
    }

})