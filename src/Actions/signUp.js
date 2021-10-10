import ticketApi from "../Api/ticketApi"
import fetchUserData from "./fetchUserData";
import history from "../history";
import {AUTH_ERROR, SIGN_IN, STORE_PATH} from "./types";

const signIn = (formValues, preLoginPath) => async dispatch => {
    try {
        const r = await ticketApi.post('/auth/user/login/', {
            email: formValues.email,
            password: formValues.password
        })
        localStorage.setItem('token',r.data.token)
        let expiryDate = new Date()
        expiryDate.setSeconds(expiryDate.getSeconds() + 43200)
        localStorage.setItem('expiryDate', JSON.stringify(expiryDate))
        dispatch({
            type: SIGN_IN,
            payload: r.data
        })
        dispatch(fetchUserData(r.data.token))
        history.push(preLoginPath ? preLoginPath: '/')
        if(preLoginPath){
            dispatch({
                type: STORE_PATH,
                payload: null
            })
        }
    }catch (e) {
        if (e.message === 'Network Error'){
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    error: "Check your Network Connection",
                    isSignedIn: false
                }
            })
        }
        else if(e.response) {
            if (e.response.status === 400) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        error: e.response.data.non_field_errors[0],
                        isSignedIn: false
                    }
                })
            }
            else if (e.response.status === 401) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        error: e.response.data.non_field_errors[0],
                        isSignedIn: false
                    }
                })
            } else {dispatch({
                type: AUTH_ERROR,
                payload: {
                    error: 'An error occurred, Please try again later',
                    isSignedIn: false
                }
            })
            }
        }
    }
}
export default signIn