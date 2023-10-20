import { useContext, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { AuthContext } from "../../context/AuthContext"
import AntDesign from "@expo/vector-icons/AntDesign"
import * as ImagePicker from 'expo-image-picker';
import EditProfileMenuHeader from "../../components/EditProfileMenuHeader";
import Hr from "../../components/Hr";
import AsyncStorage from '@react-native-async-storage/async-storage';

type navigationProps={
    navigation:{
        navigate:(value:string)=>{}
    }
}

const ProfileEdit=({navigation}:navigationProps)=>{
    const AuthState=useContext(AuthContext)
    const user=AuthState?.user

    const [image,setImage]=useState<any>(null)
    const [isBasicInfoOpen,setIsBasicInfoOpen]=useState(false)
    const [isSocialOpen,setIsSocialOpen]=useState(false)
    const [isAboutOpen,setIsAboutOpen]=useState(false)

    const [fullName,setFullName]=useState(user?.fullName)
    const [profilePics,setprofilePics]=useState(user?.profilePics)
    const [about,setAbout]=useState(user?.about)
    const [profileTagline,setProfileTagline]=useState(user?.profileTagline)
    const [facebookUrl,setFacebookUrl]=useState(user?.facebookUrl)
    const [githubUrl,setGithubUrl]=useState(user?.githubUrl)
    const [linkedinUrl,setLinkedinUrl]=useState(user?.linkedinUrl)
    const [youtubeUrl,setYoutubeUrl]=useState(user?.youtubeUrl)
    const [twitterUrl,setTwitterUrl]=useState(user?.twitterUrl)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
          base64:true
        });
    
        //console.log(result);
    
        if (!result.canceled) {
            const uri=result.assets[0].uri
            const base64=result.assets[0].base64
            const source = {
                uri,
                base64
            }
          setImage(source);
        }
    };

    const updateUser=()=>{
        console.log(AuthState?.token)
        console.log("called");

        
        
        const updateRequest={
            query:`
                mutation{
                    editUser(userInput:{fullName:"${fullName}" profileTagline:"${profileTagline}" profilePics:"${profilePics}" about:"${about}" facebookUrl:"${facebookUrl}" githubUrl:"${githubUrl}" linkedinUrl:"${linkedinUrl}" youtubeUrl:"${youtubeUrl}" twitterUrl:"${twitterUrl}"}){
                        user{
                            _id
                            email
                            fullName
                            profilePics
                            username
                            about
                            profileTagline
                            facebookUrl
                            githubUrl
                            linkedinUrl
                            youtubeUrl
                            twitterUrl
                        }
                        token
                        exp
                    }
                }
            `
        }

        if(image){
            const uriArr = image.uri.split('.');
            const fileType = uriArr[uriArr.length - 1]
            const file = `data:${fileType};base64,${image.base64}`


            const imageData= new FormData()
            imageData.append("file",file)
            imageData.append("upload_preset","starnode")
            imageData.append("cloud_name","djlvd6m7k")
            fetch("https://api.cloudinary.com/v1_1/djlvd6m7k/upload",{
                method:"POST",
                body:imageData,
            }).then(res=>res.json()).then(data=>{
                setprofilePics(data.secure_url)
            }).catch(err=>{
                console.log(err.message)
            })
        }
        console.log("lets go")


        fetch("https://starnode-2bdi.onrender.com/graphql",{
            method:"POST",
            body:JSON.stringify(updateRequest),
            headers:{
                'Content-Type':'application/json',
                "Authorization":'Bearer '+AuthState?.token
            }
        }).then(res=>{
            console.log(res.status)
            if(res.status !==200 && res.status !==201){
                throw new Error("Failed") 
            }
            return res.json()
        }).then(resData=>{
            AuthState?.setToken(resData.data.editUser.token)
            AuthState?.setUser(resData.data.editUser.user)
            AsyncStorage.setItem('token',resData.data.editUser.token)
            AsyncStorage.setItem('user',JSON.stringify(resData.data.editUser.user))
            navigation.navigate("Profile")
        }).catch(e=>{
            console.log(e.message)
        })

    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={image?{uri:image.uri}:{uri:user?.profilePics}}
                    style={styles.imageStyle} 
                />
                <TouchableOpacity onPress={()=>pickImage()} style={styles.overlayIcon}>
                    <AntDesign name="camerao" size={40} />
                </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
                <EditProfileMenuHeader 
                    isOpen={isBasicInfoOpen}
                    headerText="Basic Info"
                    handlePress={()=>setIsBasicInfoOpen(!isBasicInfoOpen)}
                />
                <Hr />
                {isBasicInfoOpen &&
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full name</Text>
                            <TextInput 
                                value={fullName}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setFullName(value)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Profile Tagline</Text>
                            <TextInput 
                                value={user?.profileTagline}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setProfileTagline(value)}
                            />
                        </View>
                    </View>
                }
            </View>
            <View>
                <EditProfileMenuHeader 
                    isOpen={isAboutOpen}
                    headerText="About You"
                    handlePress={()=>setIsAboutOpen(!isAboutOpen)}
                />
                <Hr />
                {isAboutOpen &&
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full name</Text>
                            <View style={styles.inputStyle2}>
                                <TextInput 
                                    value={user?.about}
                                    multiline={true}
                                    numberOfLines={5}
                                    onChangeText={(value)=>setAbout(value)}
                                />

                            </View>
                        </View>
                    </View>
                }
            </View>
            <View>
                <EditProfileMenuHeader 
                    isOpen={isSocialOpen}
                    headerText="Socials"
                    handlePress={()=>setIsSocialOpen(!isSocialOpen)}
                />
                <Hr />
                {isSocialOpen &&
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Twitter Profile</Text>
                            <TextInput 
                                value={twitterUrl}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setTwitterUrl(value)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>YouTube Profile</Text>
                            <TextInput 
                                value={youtubeUrl}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setYoutubeUrl(value)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Facebook Profile</Text>
                            <TextInput 
                                value={facebookUrl}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setFacebookUrl(value)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>GitHub Profile</Text>
                            <TextInput 
                                value={githubUrl}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setGithubUrl(value)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>LinkedIn Profile</Text>
                            <TextInput 
                                value={linkedinUrl}
                                style={styles.inputStyle}
                                onChangeText={(value)=>setLinkedinUrl(value)}
                            />
                        </View>
                    </View>
                }
            </View>
            <TouchableOpacity onPress={()=>updateUser()} style={styles.updateBtn}>
                <Text style={styles.updateBtnText}>Update</Text>
            </TouchableOpacity>
            
        </ScrollView>
    )
}
export default ProfileEdit

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:"white"

    },
    imageContainer:{
        position:"relative",
        alignItems:"center",
        marginBottom:30
    },
    imageStyle:{
        width:100,
        height:100,
        borderRadius:50

    },
    overlayIcon:{
        position:"absolute",
        width:100,
        height:100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        opacity:.4,
        borderRadius:50
    },
    menuContainer:{

    },
    inputContainer:{
        marginTop:20
    },
    label:{
        fontFamily:"poppins-bold",
        fontSize:16
    },
    inputStyle:{
        borderWidth:1,
        paddingHorizontal:12,
        paddingVertical:7,
        borderRadius:5,
        borderColor:"#e9ecef",
        backgroundColor:"#f8f9fa",
    },
    inputStyle2:{
        borderWidth:1,
        paddingHorizontal:12,
        paddingVertical:7,
        borderRadius:5,
        borderColor:"#e9ecef",
        backgroundColor:"#f8f9fa",


    },
    updateBtn:{
        backgroundColor:"#0000ff",
        marginTop:15,
        marginBottom:35,
        padding:10,
        borderRadius:25,
        alignItems:"center"
    },
    updateBtnText:{
        fontFamily:"poppins-bold",
        color:"white",
        fontSize:18
    }

    

})