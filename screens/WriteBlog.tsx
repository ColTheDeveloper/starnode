import { useRef, useState } from "react"
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import * as ImagePicker from 'expo-image-picker';
import { RichEditor, RichEditorProps, RichToolbar, actions } from "react-native-pell-rich-editor"


const WriteBlog=({navigation}:any)=>{
    const [title,setTitle]=useState("")
    const [subtitle,setSubtitle]=useState("")
    const [content,setContent]=useState("")
    const [blogImgUrl, setBlogImgUrl]= useState("")
    const [useSubtitle,setUseSubtitle]=useState(false)
    const textEditorRef=useRef<RichEditor>(null)


    const handleHead1 = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>H1</Text>
    const handleHead2 = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>H2</Text>
    const handleHead3 = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>H3</Text>
    const handleText = ({tintColor}:any) => <Text style={{color: tintColor,fontSize:18}}>T</Text>

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
    const addBlogImg=()=>{
        
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={25} onPress={()=>navigation.goBack()} />
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <AntDesign name="save" size={15} color="#495057"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <AntDesign name="file1" size={15} color="#495057"/>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.publishBtn}>Publish</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={styles.mainContainer}>
                {blogImgUrl &&
                    <View>
                        <Image 
                            source={{uri: blogImgUrl}}
                        />
                    </View>
                }
                <View style={styles.addMainContainer}>
                    <View style={styles.addContainer}>
                        <AntDesign name="picture" size={16} />
                        <Text style={styles.addText}>Add Cover</Text>
                    </View>
                    <TouchableOpacity style={styles.addContainer} onPress={()=>setUseSubtitle(true)}>
                        <AntDesign name="paperclip" size={16} />
                        <Text style={styles.addText}>Add Subtitle</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    onChangeText={(value)=>setTitle(value)}
                    placeholder="Article Title..."
                    placeholderTextColor="#4c566a" 
                    style={styles.inputTitleStyle}
                />
                {useSubtitle &&
                    <View style={styles.subtitleContainer}>
                        <TextInput
                            onChangeText={(value)=>setSubtitle(value)}
                            placeholder="Article Subtitle" 
                            placeholderTextColor="#4c566a" 
                            style={styles.inputSubtitleStyle}
                        />
                        <AntDesign name="close" size={20} color={"#4c566a"} onPress={()=>setUseSubtitle(false)} />
                    </View>
                }
                <View style={styles.editorContainer}>
                    <ScrollView >
                        <RichEditor
                            placeholder="Type your markdown here..."
                            ref={textEditorRef}
                            style={styles.richTextEditorStyle}
                            initialHeight={700}
                            
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
    }
})



