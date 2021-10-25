export const actionTypes = {
    startFetchTickets: 'START_FETCH_TICKETS',
    endFetchTickets: 'END_FETCH_TICKETS',
    fetchTickets: 'FETCH_TICKETS',
    fetchUserTickets: 'FETCH_USER_TICKETS',
    fetchOpenTickets: 'FETCH_OPEN_TICKETS',
    resetTickets: 'RESET_TICKETS'
}

export const actions = {

    startFetchTickets: () => ({
        type: actionTypes.startFetchTickets
    }),
    endFetchTickets: () => ({
        type: actionTypes.endFetchTickets
    }),
    fetchTickets: (tickets) => ({
        type: actionTypes.fetchTickets,
        payload: tickets
    }),
    fetchUserTickets: (tickets) => ({
        type: actionTypes.fetchUserTickets,
        payload: tickets
    }),
    fetchOpenTickets: (tickets) => ({
        type: actionTypes.fetchOpenTickets,
        payload: tickets
    }),
    resetTickets: () => ({
        type: actionTypes.resetTickets,
    }),
}