import { useContext, useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext"
//import { AuthState } from "../context/AuthContext"


type signupProps={
    navigation:{
        goBack:()=>{}
    }
}

const RegisterScreen=({navigation}:signupProps)=>{
    const [isLoading,setIsLoading]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [fullName,setFullName]=useState("")
    const [username,setUsername]=useState("")
    const AuthState=useContext(AuthContext)
    


    const handleSignup=async()=>{
        setIsLoading(true)
        const signupRequest={
            query:`
                mutation{
                    signup(signupInput:{email:"${email.trim()}" fullName:"${fullName}" password:"${password}" username:"${username.trim()}"}){
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
            body:JSON.stringify(signupRequest),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            console.log(res.status)
            if(res.status !==200 && res.status !==201){
                throw new Error("Failed") 
            }
            return res.json()
        }).then(resData=>{
            AuthState?.setToken(resData.data.signup.token)
            AuthState?.setUser(resData.data.signup.user)
            AsyncStorage.setItem('token',resData.data.signup.token)
            AsyncStorage.setItem('user',JSON.stringify(resData.data.signup.user))
        }).catch(e=>{
            console.log(e.message)
        })


    }
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("../assets/Login.png")}
                    style={styles.image}
                    alt="login"
                />
            </View>
            <Text style={styles.headerText}>Create An Account</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Sign up with email address</Text>
                <TextInput
                    onChangeText={value=>setFullName(value)}
                    placeholder="Enter your full name"
                    style={styles.inputStyles}
                    />
                <TextInput 
                    onChangeText={value=>setUsername(value)}
                    placeholder="Enter your username"
                    style={styles.inputStyles}
                    />
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
                <TouchableOpacity onPress={()=>handleSignup()}>
                    <Text style={styles.button}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.googleMainContainer}>
                <Text style={styles.inputText}>or sign up with</Text>
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
                <Text style={styles.registerContainerText1}>Already have an account? </Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={styles.registerContainerText2}>Go back</Text></TouchableOpacity>
            </View>

        </View>
    )
}

export default RegisterScreen


const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        paddingHorizontal:15
        
    },
    imageContainer:{
        alignItems:'center'
    },
    image:{
        width:230,
        height:230
    },
    headerText:{
        fontFamily:"poppins-bold",
        textAlign:"center",
        fontSize:30
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