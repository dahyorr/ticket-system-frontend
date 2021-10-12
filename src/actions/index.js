export const actionTypes = {
    startFetchTickets: 'START_FETCH_TICKETS',
    endFetchTickets: 'END_FETCH_TICKETS',
    fetchTickets: 'FETCH_TICKETS',
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
}