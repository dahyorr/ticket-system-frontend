import React, {useReducer} from 'react'
import TicketApi from "../api/ticketApi";
import { actions, actionTypes } from '../actions';

export const Context = React.createContext()

export const TicketProvider = ({children}) => {

    const initialState ={
        loading: false,
        tickets: [],
        error: null
    }

    const reducer = (state, action) => {
        switch(action){
            case actionTypes.clearTicketsError:
                return {...state, error: null}
            case actionTypes.fetchTickets:
                return {...state, loading: true}
            default: 
                return state
        }
    }
    
    const [data, dispatch] = useReducer(reducer, initialState)

    const fetchTickets = async () => {
        dispatch(actions.clearTicketsError)
        dispatch(actions.fetchTickets)

        try{
            // const res = await TicketApi.get()
        }
        catch(err){

        }
    }

    const value = {...data, fetchTickets}

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}