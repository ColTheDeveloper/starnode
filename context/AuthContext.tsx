import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps={
    children:React.ReactNode
}

type AuthContextType={
    user:User | null
    token:String
    setToken:React.Dispatch<React.SetStateAction<string>>
    setUser:any
    logout:()=>{}

}

type User={
    _id:String
    email:String
    fullName:String
    username:String
    profilePics:any

}

export const AuthContext=createContext<AuthContextType | null>(null)

const AuthContextProvider=({children}:AuthContextProps)=>{
    const [user,setUser]=useState<User | null>(null)
    const [token,setToken]=useState("")

    const logout = async () => {
        try {
          await AsyncStorage.clear()
          setUser(null)
          setToken("")

        } catch(e) {
            console.log(e)
        }
      
    }

    
    // console.log([user])

    useEffect(()=>{
        const getData = async () => {
            
            try {
                const jsonValue = await AsyncStorage.getItem('user');
              jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
        
              const tokenValue=await AsyncStorage.getItem('token');
              tokenValue != null ? setToken(tokenValue) :null
    
            } catch (e) {
              console.log(e)
            }
        };

        getData()

    },[])



    return(
        <AuthContext.Provider value={{user,token,setToken,setUser,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const AuthState=()=>{
    return useContext<any>(AuthContext)
}