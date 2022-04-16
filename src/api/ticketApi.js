import axios from 'axios'
const HOST = 'https://ticketrr.herokuapp.com'
const TicketApi = axios.create({
    baseURL: `${HOST}/api`,
})

export const routes = {
    login: 'auth/login/',
    register: 'auth/register/',
    refresh: 'auth/refresh/',
    userData: 'auth/user/',
    userList: 'auth/users/',
    authorizedUserList: 'auth/users/?authorized=1',
    verify: 'auth/verify/',
    tickets: 'tickets/',
    queues: 'queues/',
    userTickets: `tickets/?user=1`,
    openTickets: 'tickets/?status=1',
    replies: 'replies/',
    notifications: 'notifications/',
    allNotifications: 'notifications/?all=1',
    // notificationWebSocket: `${HOST.replace(/^http/, 'ws')}/ws/tickets/`,
}

const getFromStore = (key) => localStorage.getItem(key)
const setInStore = (key, value) => localStorage.setItem(key, value)

const getData = async (route, options) => await TicketApi.get(route, options)
const postData = async (route, data, options) => await TicketApi.post(route, data, options)
// const putData = async (route, data, options) => await TicketApi.put(route, data, options)
const patchData = async (route, data, options) => await TicketApi.patch(route, data, options)

const defaultRequest = async (route, requestType, requestData=null) =>{
    await refreshToken()
    const token = getFromStore('accessToken')
    const defaultOptions = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }
    if(token){
        try{
            const {data} = requestData
                ? await requestType(route, requestData, defaultOptions)
                : await requestType(route, defaultOptions) 
            return {status: 'success', data}
        }       
        catch(err){
            console.log(err)
            return {status: 'error', error: err}
        }
    }
    return {status: 'error', error: "No Token"}
}

const defaultFetchData = async (route) => {
    return await defaultRequest(route, getData)
}

const defaultSendData = async (route, data) => {
    return await defaultRequest(route, postData, data)
}

// const defaultUpdateData = async (route, data) => {
//     return await defaultRequest(route, putData, data)
// }

const defaultPartialUpdateData = async (route, data) => {
    return await defaultRequest(route, patchData, data)
}

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
export const fetchAuthorizedUserList = async () => await defaultFetchData(routes.authorizedUserList)
export const fetchQueues = async () => await defaultFetchData(routes.queues)
export const fetchUserNotifications = async () => await defaultFetchData(routes.notifications)
export const fetchAllUserNotifications = async () => await defaultFetchData(routes.allNotifications)

export const createTicket = async (data) => await defaultSendData(routes.tickets, data)
export const createReply = async (data) => await defaultSendData(routes.replies, data)

export const updateTicketStatus = async (id, status) => await defaultPartialUpdateData(`${routes.tickets}${id}/`, {status})
export const updateTicket = async (id, data) => await defaultPartialUpdateData(`${routes.tickets}${id}/`, data)

// export class NotificationSocket {
//     constructor(onReceive){
//         this.onReceive = onReceive
//         this.initialize()

//     }

//     async initialize(){
//         await refreshToken()
//         let token = getFromStore('accessToken')
//         if(token){
//             this.ws = new WebSocket(`${routes.notificationWebSocket}?token=${token}`)

//             this.ws.onopen = (e) => {
//                 console.log('connected to socket')
//             };

//             this.ws.onmessage = function(event) {
//                 console.debug("WebSocket message received:", event);
//                 this.onReceive(event)
//             };
//         }
//     }

//     close(){
//         if(this.ws){
//             console.log('closing connection')
//             this.ws.close()
//         }
//     }
// }

export default TicketApi 