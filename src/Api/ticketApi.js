import axios from 'axios'

const TicketApi = axios.create({
    baseURL: '/api',
})

export const routes = {
    login: 'auth/login/',
    register: 'auth/register/',
    refresh: 'auth/refresh/',
    userData: 'auth/user/',
    userList: 'auth/users/',
    verify: 'auth/verify/',
    tickets: 'tickets/',
    queues: 'queues/',
    userTickets: `tickets?user=1`,
    openTickets: 'tickets?status=1',
}

const getFromStore = (key) => localStorage.getItem(key)
const setInStore = (key, value) => localStorage.setItem(key, value)

const getData = async (route, options) => await TicketApi.get(route, options)
const postData = async (route, data, options) => await TicketApi.post(route, data, options={})


const defaultFetchData = async (route) => {
    await refreshToken()
    const token = getFromStore('accessToken')
    if(token){
        try{
            const {data} = await getData(route, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    // 'Content-Type': 'Application/JSON'
                }
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

// const defaultSendData = async (route, data) => {
//     await refreshToken()
//     const token = getFromStore('accessToken')
//     if(token){
//         try{
//             const res = await getData(route, data, {
//                 headers: {
//                     'Authorization': 'Bearer ' + token,
//                     // 'Content-Type': 'Application/JSON'
//                 }
//             })
//             return {status: 'success', data: res} // TODO: return required Data
//         }       
//         catch(err){
//             console.log(err)
//             return {status: 'error', error: err} 
//         }
//     }
//     return 
// }

export const refreshToken = async () => {  
    const expiryTime = parseInt(getFromStore('tokenExpires'))
    if(expiryTime && Date.now() >= expiryTime){
        try{
            const refreshToken = getFromStore('refreshToken')
            if(refreshToken){
                const response = await postData(routes.refresh, {refresh: refreshToken})
                setInStore('accessToken', response.data.access)
                setInStore('tokenExpires', Date.now() + (5*60000))
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
    await refreshToken()
    let token = getFromStore('accessToken')
    if(token){
        try{
            await postData(routes.verify, {token})
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

export const signUpUser = async (name, email, password) => {
    try{
        const response  = await postData(routes.register, {name, email, password})
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
        const {data} = await postData(routes.login, { email, password})
        const {access, refresh} = data
        setInStore('accessToken', access)
        setInStore('refreshToken', refresh)
        setInStore('tokenExpires', Date.now() + (5 * 60000))
        callback()
        return {status: 'success'}
    }
    catch(err){
        console.log(err)
        const message = err.response.data.detail || 'An Error has occurred'
        return {status: 'error', message}
    }
}

export const fetchUserData = async () => await defaultFetchData(routes.userData)
export const fetchAllTickets = async () => await defaultFetchData(routes.tickets)
export const fetchTicketsForUser = async () => await defaultFetchData(routes.userTickets)
export const fetchOpenTickets = async () => await defaultFetchData(routes.openTickets)
export const fetchSingleTicket = async (id) => await defaultFetchData(`${routes.tickets}${id}/`)
export const fetchUserList = async () => await defaultFetchData(routes.userList)
export const fetchQueues = async () => await defaultFetchData(routes.queues)


export default TicketApi 