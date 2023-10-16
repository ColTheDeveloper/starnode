import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

type signupProps={
    navigation:{
        goBack:()=>{}
    }
}

const RegisterScreen=({navigation}:signupProps)=>{
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
                    onChangeText={value=>value}
                    placeholder="Enter your email address"
                    style={styles.inputStyles}
                />
                <TextInput 
                    onChangeText={value=>value}
                    placeholder="Enter your first name"
                    style={styles.inputStyles}
                />
                <TextInput 
                    onChangeText={value=>value}
                    placeholder="Enter your last name"
                    style={styles.inputStyles}
                />
                <TextInput 
                    onChangeText={value=>value}
                    placeholder="Enter your password"
                    style={styles.inputStyles}
                    secureTextEntry
                />
                <TouchableOpacity>
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