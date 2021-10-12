export const actionTypes = {
    fetchTickets: 'FETCH_TICKETS',
    clearTicketsError: 'CLEAR_TICKETS_ERROR'
}

export const actions = {
    fetchTickets: {
        type: actionTypes.fetchTickets
    },
    clearTicketsError: {
        type: actionTypes.clearTicketsError
    }
}