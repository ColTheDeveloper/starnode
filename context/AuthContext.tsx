import { createContext, useContext, useState } from "react";

type AuthContextProps={
    children:React.ReactNode
}

type AuthContextType={
    user:User | null
    token:String


}

type User={
    userId:String
    email:String
    fullName:String

}

const AuthContext=createContext<AuthContextType | null>(null)

const AuthContextProvider=({children}:AuthContextProps)=>{
    const [user,setUser]=useState<User | null>(null)
    const [token,setToken]=useState("")
    return(
        <AuthContext.Provider value={{user,token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const AuthState=()=>{
    return useContext(AuthContext)
}