import ticketApi from "../Api/ticketApi"
import fetchUserData from "./fetchUserData";
import noToken from "./noToken";
import {AUTH_ERROR, REFRESH_LOGIN} from "./types";

const refreshLogin = (token) => async dispatch => {
    try {
        let expiryDate = JSON.parse(localStorage.getItem('expiryDate'))
        if(expiryDate > Date()) {
            const r = await ticketApi.post('/auth/user/refresh/', {
                token: token
            })
            localStorage.setItem('token', r.data.token)
            dispatch({
                type: REFRESH_LOGIN,
                payload: r.data
            })
            dispatch(fetchUserData(r.data.token))
        }
        else{
            localStorage.removeItem('token')
            localStorage.removeItem('expiryDate')
            dispatch(noToken())
        }
    }catch (e) {
        if (e.message === 'Network Error'){
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    isSignedIn: false,
                    error: "Check your Network Connection"
                }
            })
        }
        else if(e.response) {
            if (e.response.status === 400) {
                localStorage.setItem('token', '')
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        isSignedIn: false,
                        error: e.response.data.non_field_errors[0]
                    }
                })
            }
            else {
                localStorage.setItem('token', '')
                dispatch({
                type: AUTH_ERROR,
                payload: {
                    isSignedIn: false,
                    error: 'An error occurred, Please try again later'
                }
            })
            }
        }
    }
}
export default refreshLogin