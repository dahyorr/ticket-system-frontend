import {ASSIGN_PAGE, STORE_PATH} from "./types";

export const storePath = path =>{
    return{
        type: STORE_PATH,
        payload: path
    }
}
export const storePage = page =>{
    return{
        type: ASSIGN_PAGE,
        payload: page
    }
}
