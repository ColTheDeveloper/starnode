import { initializeApp } from 'firebase/app';
//import {getAuth, initializeAuth} from "firebase/auth"
import {getAuth,initializeAuth, getReactNativePersistence} from "firebase/auth"
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";

const firebaseConfig = {

    apiKey: "AIzaSyCopxfgMw_qrUtvQ2nT9TBSok5ebfnWDqs",
  
    authDomain: "col-starnode.firebaseapp.com",
  
    projectId: "col-starnode",
  
    storageBucket: "col-starnode.appspot.com",
  
    messagingSenderId: "280855421843",
  
    appId: "1:280855421843:web:7addd41bdb053365f07e66"
  
};
  

const app = initializeApp(firebaseConfig);

initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const auth=getAuth(app)