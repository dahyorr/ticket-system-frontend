import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';
import {auth} from '../helpers/firebase'

export const Context = React.createContext({})
const firebaseAuth = auth.getAuth();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    
    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const logIn = (email, password) => {
        return auth.signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signOut = () => {
        return auth.signOut(firebaseAuth)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(firebaseAuth, (currentUser => {
            setUser(currentUser)
            setLoading(false)
        }))
    }, []);

    const value = {user, loading, signUp, logIn, signOut}

    return(
        <Context.Provider value={value}>
            {loading ? <Loader/> : children}
        </Context.Provider>
    )
}