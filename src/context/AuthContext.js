import React, {useState, useEffect} from 'react';
import Loader from '../Components/common/Loader';


export const Context = React.createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(null)
    const [loading, setLoading] = useState(false)
    
    
    const signUp = (name, email, password) => {
        return console.log('signup')
    }

    const logIn = (email, password) => {
        return console.log('signin')
    }

    const signOut = () => {
        return console.log('signout')
    }

    useEffect(() => {
        console.log('check auth')
        return () => console.log('clear events')
    }, []);

    const value = {user, loading, signUp, logIn, signOut, isSignedIn}

    return(
        <Context.Provider value={value}>
            {loading ? <Loader/> : children}
        </Context.Provider>
    )
}