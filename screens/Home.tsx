import { useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { AuthContext } from "../context/AuthContext"


const Home=()=>{
    const AuthState=useContext(AuthContext)

    return(
        <View>
            <Text>Hello</Text>
            <TouchableOpacity onPress={()=>AuthState?.logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home