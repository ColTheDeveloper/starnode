import { useContext, useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import ContentLoading from "../components/contentLoading"
import { AuthContext } from "../context/AuthContext"
import UserComponent from "../components/UserComponet"
import ListEndComponent from "../components/ListEndComponent"

const AuthorSearchResult=({searchQuery}:any)=>{
    const [isLoading,setIsLoading]=useState(false)
    const [userData,setUserData]=useState([])
    const AuthState=useContext(AuthContext)
    const token=AuthState?.token

    const loadSearchUser=()=>{
        if(searchQuery.length<3){
            return null
        }
        setIsLoading(true)
        const searchRequest={
            query:`
                query{
                    searchUser(searchQuery:"${searchQuery}"){
                        _id
                        fullName
                        username
                        profilePics
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
            setUserData(resData.data.searchUser)
            setIsLoading(false)
        }).catch(e=>{
            console.log(e.message)
        })
    }

    useEffect(()=>{
        loadSearchUser()
    },[searchQuery])

    return(
        <>
        {searchQuery.length<3?
            <View style={styles.container}>
                <Text style={styles.textStyle}>Start typing to search...</Text>
                <Image 
                    source={require("../assets/Search.png")}
                    style={styles.imageStyle}
                />
            </View>
        :
            <>
            {isLoading?
                <ContentLoading />
            :
                
                <>
                {userData.length==0?
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>User not Found!</Text>
                        <Image 
                            source={require("../assets/Error.png")}
                            style={styles.imageStyle}
                        />

                    </View>
                :
                    <View style={styles.mainContainer}>
                        <FlatList
                            data={userData}
                            renderItem={({item})=><UserComponent data={item} />}
                            ListFooterComponent={<ListEndComponent />}
                        />
                    </View>
                }
                </>
            }
            </>
        }
        </>
    )
}
export default AuthorSearchResult

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center",
        paddingTop:30

    },
    mainContainer:{
        backgroundColor:"white",
        flex:1
    },
    textStyle:{
        fontFamily:"poppins-bold",
        fontSize:23
    },
    imageStyle:{
        width:300,
        height:300,
        marginTop:40
    }
})