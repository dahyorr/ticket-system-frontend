import React, {useReducer, useMemo} from 'react'
import {fetchAllTickets, fetchTicketsForUser, fetchOpenTickets} from "../api/ticketApi";
import { actions, actionTypes } from '../actions';
import {toast} from 'react-toastify'
import _ from 'lodash'

export const Context = React.createContext()

export const TicketProvider = ({children}) => {

    const initialState ={
        loading: false,
        tickets: [],
        userTickets: [],
        openTickets: [],
    }

    const reducer = (state, action) => {
        switch(action.type){
            case actionTypes.startFetchTickets:
                return {...state, loading: true}
            case actionTypes.fetchTickets:
                return {...state, tickets:_.uniqBy([...action.payload, ...state.tickets], 'id')}
            case actionTypes.fetchUserTickets:
                return {...state, userTickets: _.uniqBy([ ...action.payload, ...state.userTickets,], 'id')}
            case actionTypes.fetchOpenTickets:
                return {...state, openTickets: _.uniqBy([ ...action.payload, ...state.openTickets,], 'id')}
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

    const fetchUserTickets = useMemo(() => async () => {
        dispatch(actions.startFetchTickets())
        const res = await fetchTicketsForUser()
        if (res.status === 'success'){
            dispatch(actions.fetchUserTickets(res.data))
        }
        else{
            if(res.error){
                toast.error('An Error has occurred')
            }
        }
        dispatch(actions.endFetchTickets())
    }, [])

    const fetchAllOpenTickets = useMemo(() => async () => {
        dispatch(actions.startFetchTickets())
        const res = await fetchOpenTickets()
        if (res.status === 'success'){
            dispatch(actions.fetchOpenTickets(res.data))
        }
        else{
            if(res.error){
                toast.error('An Error has occurred')
            }
        }
        dispatch(actions.endFetchTickets())
    }, [])

    const value = {...data, fetchTickets, fetchUserTickets, fetchAllOpenTickets}

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}