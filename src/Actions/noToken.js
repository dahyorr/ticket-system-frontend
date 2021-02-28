import {NO_TOKEN} from "./types";

const noToken = () =>{
    return{
        type: NO_TOKEN,
        payload: {
            isSignedIn: false,
        }
    }
}
export default noToken