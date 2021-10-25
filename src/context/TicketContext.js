import React, {useReducer, useMemo} from 'react'
import {fetchAllTickets, fetchTicketsForUser, fetchOpenTickets, fetchQueues} from "../api/ticketApi";
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
            case actionTypes.resetTickets:
                return initialState
            default: 
                return state
        }
    }
    
    const [data, dispatch] = useReducer(reducer, initialState)

    const fetchTickets = useMemo(() => async () => {
        dispatch(actions.startFetchTickets())
        const res = await fetchAllTickets()
        const resQueue = await fetchQueues()
        if (res.status === 'success' && resQueue.status === 'success'){
            res.data.map(ticket => {
                if(ticket.queue){
                    ticket.queue = resQueue.data.find(queue => ticket.queue === queue.id).title
                }
                return ticket
            })
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
        const resQueue = await fetchQueues()
        if (res.status === 'success' && resQueue.status === 'success'){
            res.data.map(ticket => {
                if(ticket.queue){
                    ticket.queue = resQueue.data.find(queue => ticket.queue === queue.id).title
                }
                return ticket
            })
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
        const resQueue = await fetchQueues()
        if (res.status === 'success' && resQueue.status === 'success'){
            res.data.map(ticket => {
                if(ticket.queue){
                    ticket.queue = resQueue.data.find(queue => ticket.queue === queue.id).title
                }
                return ticket
            })            
            dispatch(actions.fetchOpenTickets(res.data))
        }
        else{
            if(res.error){
                toast.error('An Error has occurred')
            }
        }
        dispatch(actions.endFetchTickets())
    }, [])

    const resetTickets = useMemo(() => () => {
        dispatch(actions.resetTickets())
    }, [])

    const value = {...data, fetchTickets, fetchUserTickets, fetchAllOpenTickets, resetTickets}

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}