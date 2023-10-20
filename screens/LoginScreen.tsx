import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useContext, useState } from "react"
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext";


type loginprops={
    navigation:{
        navigate:(value:string)=>{}
    }
}

const LoginScreen=({navigation}:loginprops)=>{
    const [isLoading,setIsLoading]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const AuthState=useContext(AuthContext)
    

    const handleSignin=()=>{
        setIsLoading(true)
        console.log(email , password)
        const signinRequest={
            query:`
                query{
                    signin(email:"${email}" password:"${password}"){
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
        fetch("https://starnode-2bdi.onrender.com/graphql",{
            method:"POST",
            body:JSON.stringify(signinRequest),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.status !==200 && res.status !==201){
                throw new Error("Failed") 
            }
            return res.json()
        }).then(resData=>{
            AuthState?.setToken(resData.data.signin.token)
            AuthState?.setUser(resData.data.signin.user)
            AsyncStorage.setItem('token',resData.data.signin.token)
            AsyncStorage.setItem('user',JSON.stringify(resData.data.signin.user))
        }).catch(e=>{
            console.log(e.message)
        })

    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("../assets/Login.png")}
                    style={styles.image}
                    alt="login"
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Create an account or</Text>
                <Text style={styles.textStyle}>Sign in to your Starnode account</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Sign in with email address</Text>
                <TextInput 
                    onChangeText={value=>setEmail(value)}
                    placeholder="Enter your email address"
                    style={styles.inputStyles}
                />
                <TextInput 
                    onChangeText={value=>setPassword(value)}
                    placeholder="Enter your password"
                    style={styles.inputStyles}
                    secureTextEntry
                />
                <TouchableOpacity onPress={()=>handleSignin()}>
                    <Text style={styles.button}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.googleMainContainer}>
                <Text style={styles.inputText}>or sign in with</Text>
                <TouchableOpacity>
                    <View style={styles.googleContainer}>
                        <Image 
                            source={require("../assets/google-icon.png")}
                            alt="google"
                            style={styles.googleIcon}
                        />
                        <Text style={styles.googleText}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.registerContainerText1}>Don't have an account? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={styles.registerContainerText2}>Create One</Text></TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default LoginScreen

const styles=StyleSheet.create({
    container:{
        paddingHorizontal:15
    },
    imageContainer:{
        marginTop:70,
        alignItems:'center'
    },
    image:{
        width:250,
        height:250
    },
    textContainer:{
        alignItems:"center",
        marginTop:20
    },
    textStyle:{
        fontFamily:'poppins-bold',
        fontSize:22,
        lineHeight:30
    },
    inputContainer:{
        alignItems:"center",
        marginTop:20
    },
    inputText:{
        fontFamily:"poppins",
        marginBottom:10,
        fontSize:16
    },
    inputStyles:{
        borderWidth:1,
        width:"100%",
        textAlign:"center",
        borderColor:"#e9ecef",
        backgroundColor:"#f8f9fa",
        height:40,
        borderRadius:50,
        marginBottom:15

    },
    button:{
        color:"white",
        backgroundColor:"#0000ff",
        fontFamily:'poppins-bold',
        paddingHorizontal:70,
        paddingVertical:10,
        borderRadius:50

    },
    googleMainContainer:{
        marginTop:20,
        alignItems:"center"

    },
    googleContainer:{
        borderWidth:1,
        flexDirection:"row",
        alignItems:"center",
        gap:20,
        borderColor:"#e9ecef",
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:5



    },
    googleIcon:{
        width:30,
        height:30
    },
    googleText:{
        fontFamily:"poppins",
        fontSize:20
    },
    registerContainer:{
        marginTop:40,
        flexDirection:"row",
        justifyContent:"center"
    },
    registerContainerText1:{
        fontSize:16
    },
    registerContainerText2:{
        fontSize:16,
        color:"#0000ff"
    },
})