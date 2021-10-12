import React, {useState, useEffect} from 'react';
import Loader from '../Components/common/Loader';
import {refreshToken, verifyToken, fetchUserData, signUpUser, logInUser} from '../api/ticketApi';


export const Context = React.createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const logIn = async (email, password) => {
        const onLogin = () => setIsSignedIn(true)
        return await logInUser(email, password, onLogin)
    }

    const signOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsSignedIn(false)
        setUser(null)
        return {status: 'success'}
    }

    useEffect(() => {
        (async () => {
            await refreshToken()
            if(!isSignedIn){
                const valid = await verifyToken()
                if (valid){
                    setIsSignedIn(true) && setLoading(false)
                }
                else{
                    setIsSignedIn(false) && setLoading(false)
                }
            }
            else{
                setLoading(true)
                setUser(await fetchUserData())
                setLoading(false)
            }
        })()
    }, [isSignedIn]);

    const value = {user, loading, signUp: signUpUser, logIn, signOut, isSignedIn}

    return(
        <Context.Provider value={value}>
            {loading ? <Loader/> : children}
        </Context.Provider>
    )
}