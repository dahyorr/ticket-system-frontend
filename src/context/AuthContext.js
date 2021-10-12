import React, {useState, useEffect} from 'react';
import Loader from '../Components/common/Loader';
import TicketApi from "../api/ticketApi";
import {login, userData, refresh, register, verify} from "../api/apiRoutes";
import ticketApi from '../api/ticketApi';


export const Context = React.createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    
    
    const signUp = async (name, email, password) => {
        try{
            const response  = await TicketApi.post(register, {name, email, password})
            return {status: 'success', message: response.data.message}
        }
        catch(err){
            let message = 'An Error has occurred'
            console.log({...err})
            if(err.response && err.response.data.email){
                message = 'This email has already been used'
            }
            return {status: 'error', message}
        }
    }

    const logIn = async (email, password) => {
        try{
            const response = await TicketApi.post(login, { email, password})
            const {access, refresh} = response.data
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshToken', refresh)
            localStorage.setItem('tokenExpires', Date.now() + (5 * 60))
            setIsSignedIn(true)
            return {status: 'success'}
        }
        catch(err){
            const message = err.response.data.detail || 'An Error has occurred'
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
        let token = localStorage.getItem('accessToken')
        const expiryTime = parseInt(localStorage.getItem('tokenExpires'))

        if(expiryTime && Date.now() >= expiryTime){
            (async () => {
                try{
                    const refreshToken = localStorage.getItem('refreshToken')
                    if(refreshToken){
                        const response = await TicketApi.post(refresh, {refresh: refreshToken})
                        localStorage.setItem('accessToken', response.data.access)
                        localStorage.setItem('tokenExpires', Date.now() + (5*60))
                        token = response.data.access
                    }
                }
                catch(err){
                    console.log(err)
                    localStorage.setItem('accessToken', '')
                }
            })()
        }

        if(token && !isSignedIn){
            (async () => {
                try{
                    const res = await ticketApi.post(verify, {token})
                    res.status === 200 && setIsSignedIn(true) && setLoading(false) 
                }
                catch(err){
                    setIsSignedIn(false) && setLoading(false)
                }
            })()
        }
        else if(!token){
            localStorage.setItem('accessToken', '')
            setLoading(false)
        }

        if(isSignedIn){
            (async () => {
                setLoading(true)
                try{
                    const response = await TicketApi.get(userData, {
                        headers: { 'Authorization': 'Bearer ' + token}
                    })
                    const {email, name} = response.data
                    setUser({email, name})
                }
                catch(err){
                    console.log(err)
                }
            })()
            setLoading(false)
        }

    }, [isSignedIn]);

    const value = {user, loading, signUp, logIn, signOut, isSignedIn}

    return(
        <Context.Provider value={value}>
            {loading ? <Loader/> : children}
        </Context.Provider>
    )
}