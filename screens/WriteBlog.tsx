import { useRef, useState, useEffect, useContext } from "react"
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import * as ImagePicker from 'expo-image-picker';
import { RichEditor, RichEditorProps, RichToolbar, actions } from "react-native-pell-rich-editor"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext";

type navigationProps={
    navigation:{
        navigate:(value:string)=>{}
        goBack:()=>{}
    }
}


const WriteBlog=({navigation}:navigationProps)=>{
    const [title,setTitle]=useState("")
    const [subtitle,setSubtitle]=useState("")
    const [content,setContent]=useState("")
    const [blogImgUrl, setBlogImgUrl]= useState("")
    const [useSubtitle,setUseSubtitle]=useState(false)
    const [isUploaded,setIsUploaded]=useState(false)
    const textEditorRef=useRef<RichEditor>(null)
    const AuthState=useContext(AuthContext)
    const token=AuthState?.token


    const handleHead1 = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>H1</Text>
    const handleHead2 = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>H2</Text>
    const handleHead3 = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>H3</Text>
    const handleText = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>T</Text>

    useEffect(() => {
        const restoreBlog=async()=>{
            try {
                const value= await AsyncStorage.getItem("blog")
                if(value){
                    const blog=JSON.parse(value)
                    console.log(blog.title)
                    setTitle(blog.title)
                    setBlogImgUrl(blog.blogImgUrl)
                    setSubtitle(blog.subtitle)
                    setContent(blog.content)
                    setUseSubtitle(blog.useSubtitle)
                }
            } catch (error) {
                console.log(error)
            }
        }
        restoreBlog()
      
    }, [])
    

    const handleAddImage=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64:true
        });
        if (!result.canceled) {
            const uri=result.assets[0].uri
            const base64=result.assets[0].base64
            // const source = {
            //     uri,
            //     base64
            // }
            
            const uriArr = uri.split('.');
            const fileType = uriArr[uriArr.length - 1]
            const file = `data:${fileType};base64,${base64}`


            const imageData= new FormData()
            imageData.append("file",file)
            imageData.append("upload_preset","starnode")
            imageData.append("cloud_name","djlvd6m7k")
            fetch("https://api.cloudinary.com/v1_1/djlvd6m7k/upload",{
                method:"POST",
                body:imageData,
            }).then(res=>res.json()).then(data=>{
                textEditorRef.current?.insertImage(data.secure_url)
            }).catch(err=>{
                console.log(err.message)
            })
            
        }
    }

    const handleSubtitle=()=>{
        setSubtitle("")
        setUseSubtitle(false)
    }
    const addBlogImg=async()=>{
        let result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64:true
        })

        if(!result.canceled){
            const uri=result.assets[0].uri
            const base64=result.assets[0].base64

            const uriArr = uri.split('.');
            const fileType = uriArr[uriArr.length - 1]
            const file = `data:${fileType};base64,${base64}`

            const imageData= new FormData()
            imageData.append("file",file)
            imageData.append("upload_preset","starnode")
            imageData.append("cloud_name","djlvd6m7k")
            fetch("https://api.cloudinary.com/v1_1/djlvd6m7k/upload",{
                method:"POST",
                body:imageData,
            }).then(res=>res.json()).then(data=>{
                setBlogImgUrl(data.secure_url)
            }).catch(err=>{
                console.log(err.message)
            })

        }
        
    }

    const saveBlog=async()=>{
        const blog={
            title,
            subtitle,
            blogImgUrl,
            content,
            useSubtitle
        }
        console.log(blog)

        try {
            await AsyncStorage.setItem('blog',JSON.stringify(blog))
            setIsUploaded(true)
            setTimeout(()=>setIsUploaded(false),500)
        } catch (error) {
            console.log(error)
        }

    }

    const publishBlog=()=>{
        if(blogImgUrl==""){
            Alert.alert("Details is not provided","You need to provide the blog image!");
        }else if(title==""){
            Alert.alert("Details is not complete","You need to provide the blog title!");
        }else if(content==""){
            Alert.alert("Details is not complete","You need to provide the blog content!");
        }else{
            const publishBlogRequest={
                query:`
                    mutation{
                        createBlog(blogInput:{title:"${title}" subtitle:"${subtitle}" blogImgUrl:"${blogImgUrl}" content:"${content}"}){
                            _id
                        }
                    }
                `
            }
            fetch("https://starnode-2bdi.onrender.com/graphql",{
                method:"POST",
                body:JSON.stringify(publishBlogRequest),
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
                console.log(resData)
                console.log("successful")
                AsyncStorage.removeItem("blog")
                setTitle("")
                setBlogImgUrl("")
                setSubtitle("")
                setContent("")
                setUseSubtitle(false)
                navigation.navigate("Profile")
            }).catch(e=>{
                console.log(e.message)
            })
        }
        
        
        
    }
    
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={25} onPress={()=>navigation.goBack()} />
                <View style={styles.headerContainer}>
                    {isUploaded &&
                        <AntDesign name="clouduploado" size={25} color="#2b8a3e"/>
                    }
                    <TouchableOpacity onPress={()=>saveBlog()} style={styles.iconContainer}>
                        <AntDesign name="save" size={15} color="#495057"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>console.log("show blog")} style={styles.iconContainer}>
                        <AntDesign name="file1" size={15} color="#495057"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>publishBlog()} >
                        <Text style={styles.publishBtn}>Publish</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.addMainContainer}>
                    <TouchableOpacity onPress={()=>addBlogImg()} style={styles.addContainer}>
                        <AntDesign name="picture" size={16} />
                        <Text style={styles.addText}>Add Cover</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addContainer} onPress={()=>setUseSubtitle(true)}>
                        <AntDesign name="paperclip" size={16} />
                        <Text style={styles.addText}>Add Subtitle</Text>
                    </TouchableOpacity>
                </View>
                {blogImgUrl&&
                    <View style={styles.blogImgContainer}>
                        <AntDesign name="close" style={styles.blogImgCancelIcon} onPress={()=>setBlogImgUrl("")} size={16}/>
                        <Image 
                            source={{uri: blogImgUrl}}
                            style={styles.blogImgStyle}
                        />
                    </View>
                }
                <TextInput
                    onChangeText={(value)=>setTitle(value)}
                    placeholder="Article Title..."
                    placeholderTextColor="#4c566a" 
                    style={styles.inputTitleStyle}
                    value={title}
                />
                {useSubtitle &&
                    <View style={styles.subtitleContainer}>
                        <TextInput
                            onChangeText={(value)=>setSubtitle(value)}
                            placeholder="Article Subtitle" 
                            placeholderTextColor="#4c566a" 
                            style={styles.inputSubtitleStyle}
                            value={subtitle}
                        />
                        <AntDesign name="close" size={20} color={"#4c566a"} onPress={()=>handleSubtitle()} />
                    </View>
                }
                <View style={styles.editorContainer}>
                    <ScrollView >
                        <RichEditor
                            placeholder="Type your markdown here..."
                            ref={textEditorRef}
                            style={styles.richTextEditorStyle}
                            initialHeight={700}
                            onChange={(value)=>setContent(value)}
                            initialContentHTML={content}
                        />
                    </ScrollView>
                    <RichToolbar 
                        editor={textEditorRef}
                        selectedIconTint="black"
                        iconTint="grey"
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.setStrikethrough,
                            actions.insertImage,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink,
                            actions.heading1,
                            actions.heading2,
                            actions.heading3,
                            actions.setParagraph,
                            actions.fontSize,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.undo,
                            actions.redo,

                        ]}
                        onPressAddImage={()=>handleAddImage()}
                        iconMap={{ [actions.heading1]: handleHead1,[actions.heading2]:handleHead2,[actions.heading3]:handleHead3,[actions.setParagraph]:handleText }}
                        style={styles.richToolbarStyle}

                    />

                    
                </View>      
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default WriteBlog;

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    mainContainer:{
        flex:1,
        backgroundColor:"white",
        paddingHorizontal:30,
        paddingTop:80,
    },
    header:{
        width:"100%",
        position:"absolute",
        top:"0%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"white",
        paddingTop:30,
        paddingHorizontal:15,
        zIndex:2
    },
    headerContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:20,
    },
    publishBtn:{
        color:"white",
        backgroundColor:"#364fc7",
        paddingHorizontal:10,
        paddingVertical:8,
        borderRadius:20,
        fontSize:17,
    },
    iconContainer:{
        borderWidth:1,
        padding:10,
        borderRadius:20,
        borderColor:"#e9ecef"
    },
    blogImgContainer:{
        position:"relative",
    },
    blogImgCancelIcon:{
        position:"absolute",
        top:"12%",
        right:"3%",
        zIndex:2,
        backgroundColor:"white",
        padding:3,
        borderRadius:50,
    },
    subtitleContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"

    },
    addMainContainer:{
        flexDirection:"row",
        gap:30
    },
    addContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    addText:{
        fontSize:16
    },
    inputTitleStyle:{
        fontSize:30,
        fontFamily:"poppins-bold",
        marginTop:20,
        height:50
    },
    inputSubtitleStyle:{
        fontSize:30,
        fontFamily:"poppins-light",
        fontWeight:"200",
        height:50
    },
    editorContainer:{
        flexDirection:"column-reverse",
        marginTop:20,
        marginBottom:100
    },
    richToolbarStyle:{
        padding:0,
        margin:0,
        
    },
    richTextEditorStyle:{
        padding:0,
        margin:0,
    },
    blogImgStyle:{
        width:"100%",
        height:200,
        borderRadius:5,
        marginVertical:20

    },
})



