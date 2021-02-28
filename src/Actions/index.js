import {STORE_PATH} from "./types";

export const storePath = path =>{
    return{
        type: STORE_PATH,
        payload: path
    }
}
