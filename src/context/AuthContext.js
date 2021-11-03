import React, {useState, useEffect} from 'react';
import Loader from '../Components/common/Loader';
import {verifyToken, fetchUserData, signUpUser, logInUser} from '../api/ticketApi';
import { history } from '../utils';


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
        history.push('/login')
    }

    useEffect(() => {
        (async () => {
            if(!isSignedIn){
                const valid = await verifyToken()
                if (valid){
                    const res = await fetchUserData()
                    res.status === 'success' && setUser(res.data)
                    setIsSignedIn(true)
                }
                setLoading(false)
            }
            else{
                const res = await fetchUserData()
                res.status === 'success' && setUser(res.data)
            }
        })()
    }, [isSignedIn]);

    const value = {user, signUp: signUpUser, logIn, signOut, isSignedIn}

    return(
        <Context.Provider value={value}>
            {loading ? <Loader/> : children}
        </Context.Provider>
    )
}