import React, {useState, useEffect} from 'react';
import Loader from '../Components/common/Loader';
import ticketApi from "../api/ticketApi";
import {login, userData, refresh} from "../api/apiRoutes";


export const Context = React.createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    
    
    const signUp = (name, email, password) => {
        return console.log('signup')
    }

    const logIn = async (email, password) => {
        try{
            const response = await ticketApi.post(login, { email, password})
            const {access, refresh} = response.data
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshToken', refresh)
            localStorage.setItem('tokenExpires', Date.now() + (1440 * 60))
            setIsSignedIn(true)
            return {status: 'success'}
        }
        catch(err){
            const message = err.response.data.detail || 'An Error has occurred, Check Your network connection'
            return {status: 'error', message}
        }
    }

    const signOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsSignedIn(false)
        setUser(null)
        return {status: 'success'}
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const expiryTime = parseInt(localStorage.getItem('tokenExpires'))

        if(expiryTime && Date.now() >= expiryTime){
            (async () => {
                try{
                    const refreshToken = localStorage.getItem('refreshToken')
                    const response = await ticketApi.post(refresh, {refresh: refreshToken})
                    localStorage.setItem('accessToken', response.data.access)

                }
                catch(err){
                    console.log(err)
                }
            })()
        }

        if(token && !isSignedIn){
            (async () => {
                try{
                    const response = await ticketApi.get(userData, {
                        headers: { 'Authorization': 'Bearer ' + token}
                    })
                    const {email, name} = response.data
                    setUser({email, name})
                    setIsSignedIn(true)
                }
                catch(err){
                    console.log(err)
                }
            })()
        }
        setLoading(false)
    }, [isSignedIn]);

    const value = {user, loading, signUp, logIn, signOut, isSignedIn}

    return(
        <Context.Provider value={value}>
            {loading ? <Loader/> : children}
        </Context.Provider>
    )
}