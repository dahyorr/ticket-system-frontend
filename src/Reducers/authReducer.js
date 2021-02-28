import {AUTH_ERROR, FETCH_USER_DATA, NO_TOKEN, REFRESH_LOGIN, SIGN_IN, SIGN_OUT, STORE_PATH} from "../Actions/types";

const TOKEN = localStorage.getItem("token")
const INITIAL_STATE = {
    isSignedIn: TOKEN ? true: null,
    token: TOKEN,
    error: null,
}
const authReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn: true, token: action.payload.token, error: null}
        // case SIGN_UP:
        //     TODO: create action
        //     return {...state, isSignedIn: true, token: action.payload.token, error: null}
        case AUTH_ERROR:
            return{...state, ...action.payload, isSignedIn: false}
        case FETCH_USER_DATA:
            return {...state, ...action.payload, isSignedIn: true, error: null}
        case REFRESH_LOGIN:
            return {...state, isSignedIn: true, error: null, token: action.payload.token}
        case SIGN_OUT:
            return {...state, ...action.payload}
        case NO_TOKEN:
            return {...state, ...action.payload}
        case STORE_PATH:
            if (action.payload === null){
                return {...state, preLoginPath: null}
            }
            return {...state, preLoginPath: action.payload}
        default:
            return state
    }
}
export default authReducer