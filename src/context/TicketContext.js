import React, {useReducer, useMemo} from 'react'
import {fetchAllTickets} from "../api/ticketApi";
import { actions, actionTypes } from '../actions';
import {toast} from 'react-toastify'
import _ from 'lodash'

export const Context = React.createContext()

export const TicketProvider = ({children}) => {

    const initialState ={
        loading: false,
        tickets: [],
    }

    const reducer = (state, action) => {
        switch(action.type){
            case actionTypes.startFetchTickets:
                return {...state, loading: true}
            case actionTypes.fetchTickets:
                const newArr = [...state.tickets, ...action.payload]
                return {...state, tickets: _.uniqBy(newArr, 'id')}
            case actionTypes.endFetchTickets:
                return {...state, loading: false}
            default: 
                return state
        }
    }
    
    const [data, dispatch] = useReducer(reducer, initialState)

    const fetchTickets = useMemo(() => async () => {
        dispatch(actions.startFetchTickets())
        const res = await fetchAllTickets()
        if (res.status === 'success'){
            dispatch(actions.fetchTickets(res.data))
        }
        else{
            if(res.error){
                toast.error('An Error has occurred')
            }
        }
        dispatch(actions.endFetchTickets())
    }, [])

    const value = {...data, fetchTickets}

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}