import { useContext, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../context/AuthContext"
import BlogComponent from "../components/BlogComponent"
import ContentLoading from "../components/contentLoading"
import ListEndComponent from "../components/ListEndComponent"


const MyBlogScreen=()=>{
    const [isLoading,setIsLoading]=useState(true)
    const [myBlogs,setMyBlogs]=useState([])
    const [isRefreshing, setIsRefreshing]=useState(false)
    const AuthState=useContext(AuthContext)
    const token=AuthState?.token

    const LoadMyBlog=()=>{
        const request={
            query:`
                query{
                    getMyBlogs{
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
            body:JSON.stringify(request),
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
            setMyBlogs(resData.data.getMyBlogs)
            setIsLoading(false)
        }).catch(e=>{
            console.log(e.message)
        })
    }

    useEffect(()=>{
        LoadMyBlog()
    },[])
    if(isLoading){
        return(
            <ContentLoading />
        )
    }else{
        return(
            <View style={styles.container} >
                <FlatList 
                data={myBlogs}
                renderItem={({item})=><BlogComponent data={item} />}
                ListFooterComponent={<ListEndComponent />}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={()=>LoadMyBlog()}
                        colors={["black"]} 
                    />
                }
                />
                
            </View>
        )

    }
}
export default MyBlogScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    }
})