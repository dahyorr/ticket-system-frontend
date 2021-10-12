import { useContext, useEffect } from 'react'
import { Context as TicketContext } from '../../context/TicketContext';
import Loader from '../common/Loader';
import TicketsTable from '../common/TicketsTable';

function Tickets({history}) {

    const {tickets, loading, fetchTickets} = useContext(TicketContext)

    useEffect(() =>{
        fetchTickets()
    }, [fetchTickets])
    console.log(tickets)
    

    return (
        <div className="Tickets">
            <div className="container">
                {loading
                ?<Loader/>
                :<TicketsTable data={tickets} onRefresh={fetchTickets} onAdd={() => history.push('/tickets/create')}/>
                }
            </div>
        </div>
    )
}

export default Tickets
