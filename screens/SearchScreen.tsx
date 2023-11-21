import { useContext, useState } from "react"
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, TextInput, StyleSheet, ViewStyle, Pressable, Text } from "react-native"
import { GlobalStyles } from "../styles/GlobalStyles"
import AntDesign from "@expo/vector-icons/AntDesign"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LatestSearchResult from "./LatestSeachResult";
import AuthorSearchResult from "./AuthorSearchResult";
import { ParamListBase } from "@react-navigation/native";
import TopSearchResult from "./TopSearchResult";
import { AuthContext } from "../context/AuthContext";

const Tab = createMaterialTopTabNavigator<ParamListBase>();

const SearchScreen=()=>{
    const [searchQuery,setSearchQuery]=useState("")
    const [blogs,setBlogs]=useState<any>([])
    const [isLoading,setIsLoading]=useState(false)
    const AuthState=useContext(AuthContext)
    const token=AuthState?.token

    const handleCancelPress=()=>{
        setSearchQuery("")
        setBlogs([])
    }

    const handleChange=()=>{
        if(searchQuery.length<3){
            return null
        }
        setIsLoading(true)
        const searchRequest={
            query:`
                query{
                    searchBlog(searchQuery:"${searchQuery}"){
                        _id
                        blogImgUrl
                        title
                        subtitle
                        content
                        createdAt
                        views
                        author{
                          _id
                          fullName
                          username
                          profilePics
                        }
                    }
                }
            `
        }
        fetch("https://starnode-2bdi.onrender.com/graphql",{
            method:"POST",
            body:JSON.stringify(searchRequest),
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+token
            }
        }).then(res=>{
            if(res.status !==200 && res.status !==201){
                throw new Error("Failed") 
            }
            return res.json()
        }).then(resData=>{
            setBlogs(resData.data.searchBlog)
            setIsLoading(false)
        }).catch(e=>{
            console.log(e.message)
        })


    }
    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <AntDesign name="search1" size={20}/>
                <TextInput 
                    placeholder="Search for people and articles...."
                    onChangeText={value=>setSearchQuery(value)}
                    onChange={()=>handleChange()}
                    value={searchQuery}
                    style={styles.inputStyle}
                />
                {searchQuery.length>=3 &&
                    <AntDesign name="close" size={20} onPress={()=>handleCancelPress()} />
                }
            </View>
            <View style={styles.tab}>
                <Tab.Navigator>
                    <Tab.Screen name="Top" >{(props)=><TopSearchResult {...props} blogData={blogs}  isLoading={isLoading} searchQuery={searchQuery} />}</Tab.Screen>
                    <Tab.Screen name="Latest">{(props)=><LatestSearchResult {...props} blogData={blogs}  isLoading={isLoading} searchQuery={searchQuery} />}</Tab.Screen>
                    <Tab.Screen name="Author" >{(props)=><AuthorSearchResult {...props} searchQuery={searchQuery} />}</Tab.Screen>
                </Tab.Navigator>
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
    },
    inputContainer:{
        borderWidth:1,
        borderColor:"#e9ecef",
        width:"95%",
        height:40,
        borderRadius:50,
        flexDirection:"row",
        alignItems:"center",
        gap:4,
        paddingHorizontal:10,
        backgroundColor:"#f8f9fa",
    },
    inputStyle:{
        width:"85%"
    },
    tab:{
        flex:1,
        width:"100%",

    },
    

})