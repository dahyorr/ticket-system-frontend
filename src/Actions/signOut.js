import history from "../history";
import {SIGN_OUT} from "./types";
const signOut = () => async dispatch => {
    localStorage.setItem('token','')
    dispatch({
        type: SIGN_OUT,
        payload: {
            isSignedIn: false,
            token: null,
            email: null,
            name: null,
            is_staff: null,
            is_authorized: null,
            error: null
        }
    })
    // TODO: invalidate token on back end
    history.push('/login')
}
export default signOut