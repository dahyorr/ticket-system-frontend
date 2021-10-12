import axios from 'axios'

const TicketApi = axios.create({
    baseURL: '/api',
})

export const routes = {
    login: 'auth/login/',
    register: 'auth/register/',
    refresh: 'auth/refresh/',
    userData: 'auth/user/',
    verify: 'auth/verify/',
    allTickets: 'tickets/',
}

const getFromStore = (key) => localStorage.getItem(key)
const setInStore = (key, value) => localStorage.setItem(key, value)

export const refreshToken = async () => {   // TODO: Fix date check
    const expiryTime = parseInt(getFromStore('tokenExpires'))
    if(expiryTime && Date.now() >= expiryTime){
        try{
            const refreshToken = getFromStore('refreshToken')
            if(refreshToken){
                const response = await TicketApi.post(routes.refresh, {refresh: refreshToken})
                setInStore('accessToken', response.data.access)
                setInStore('tokenExpires', Date.now() + (5*60))
            }
        }
        catch(err){
            console.log(err)
            setInStore('accessToken', '')
            setInStore('refreshToken', '')
        }
    }
}

export const verifyToken = async () => {
    let token = getFromStore('accessToken')
    if(token){
        try{
            await TicketApi.post(routes.verify, {token})
            return true
        }
        catch(err){
            console.log(err)
            setInStore('accessToken', '')
            return false
        }
    }
    return false
}

export const fetchUserData = async () => {
    let token = getFromStore('accessToken')
    if(token){
        try{
            const response = await TicketApi.get(routes.userData, {
                headers: { 'Authorization': 'Bearer ' + token}
            })
            return response.data
        }
        catch(err){
            console.log(err)
            return null
        }
    }
    return null
}

export const signUpUser = async (name, email, password) => {
    try{
        const response  = await TicketApi.post(routes.register, {name, email, password})
        return {status: 'success', message: response.data.message}
    }
    catch(err){
        console.log(err)
        let message = 'An Error has occurred'
        if(err.response && err.response.data.email){
            message = 'This email has already been used'
        }
        return {status: 'error', message}
    }
}

export const logInUser = async (email, password, callback) => {
    try{
        const response = await TicketApi.post(routes.login, { email, password})
        const {access, refresh} = response.data
        setInStore('accessToken', access)
        setInStore('refreshToken', refresh)
        setInStore('tokenExpires', Date.now() + (5 * 60))
        callback()
        return {status: 'success'}
    }
    catch(err){
        console.log(err)
        const message = err.response.data.detail || 'An Error has occurred'
        return {status: 'error', message}
    }
}

export const fetchAllTickets = async () => {
    await refreshToken()
    const token = getFromStore('accessToken')
    if(token){
        try{
            const {data} = await TicketApi.get(routes.allTickets, {
                headers: { 'Authorization': 'Bearer ' + token}
            })
            return {status: 'success', data}
        }       
        catch(err){
            console.log(err)
            return {status: 'error', error: err}
        }
    }
    return 
}

export default TicketApi 