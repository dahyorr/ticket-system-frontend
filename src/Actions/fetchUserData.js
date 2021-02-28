import ticketApi from "../Api/ticketApi"
import {AUTH_ERROR, FETCH_USER_DATA} from "./types";

const fetchUserData = () => async dispatch => {
    try {
        const r = await ticketApi.get('/auth/user/',{
            headers:{
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        dispatch({
            type: FETCH_USER_DATA,
            payload: r.data
        })
    }catch (e) {
        if (e.message === 'Network Error'){
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    error: "Check your Network Connection"
                }
            })
        }
        else if(e.response) {
            if (e.response.status === 400) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        error: e.response.data.non_field_errors[0]
                    }
                })
            }
            else {dispatch({
                type: AUTH_ERROR,
                payload: {
                    error: 'An error occurred, Please try again later'
                }
            })
            }
        }
    }
}
export default fetchUserData