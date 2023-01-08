import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";
import * as Google from 'expo-auth-session/providers/google'
import { fetchUserInfoAsync } from "expo-auth-session";
import {Context as AuthContext} from './context/AuthContext';


// const { type, accessToken} = await Google.logInAsync(config)

export const AuthContextProvider = async ({children}) => {

    const {signin} = useContext(AuthContext)

    console.log(typeof signin)

    const config = {
        clientId: '118934681710-dkv57e064behptc84s572r57cfm5r9q3.apps.googleusercontent.com',
        androidClientId: '118934681710-d4b2hvofdkbt34b37cmbujh919mspji9.apps.googleusercontent.com',
        iosClientId: '118934681710-q87pluija2qn4gj0sh8obent5nj9f1h7.apps.googleusercontent.com',
        androidStandaloneAppClientId: '118934681710-d4b2hvofdkbt34b37cmbujh919mspji9.apps.googleusercontent.com',
        iosStandaloneAppClientId: '118934681710-q87pluija2qn4gj0sh8obent5nj9f1h7.apps.googleusercontent.com',
        
    }
   
   const [accessToken, setAcessToken] = useState(null)
   const [request, response, promtAsync] = Google.useIdTokenAuthRequest(config) 

    useEffect(() => {
        if(response?.type === 'success') {
            setAcessToken(response.authentication.accessToken)
            accessToken && fetchUserInfo()
        }
    },[response,accessToken])

    async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }) 

        const useInfo = await response.json()
        signin(useInfo)

    }
     

   return (
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
   )

} 

export default function useAuth() {
    return useContext(AuthContext)
}