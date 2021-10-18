import { useContext, useEffect } from 'react'
import { Context as TicketContext } from '../../context/TicketContext';
import Loader from '../common/Loader';
import TicketsTable from '../common/TicketsTable';

const OpenTickets = ({history}) => {
    const { loading, fetchAllOpenTickets, openTickets} = useContext(TicketContext)

    useEffect(() =>{
        fetchAllOpenTickets()
    }, [fetchAllOpenTickets])    

    return (
        <div className="Tickets">
            <div className="container">
                {loading
                ?<Loader/>
                :<TicketsTable data={openTickets} onRefresh={fetchAllOpenTickets} onAdd={() => history.push('/tickets/create')} title={"All Tickets"}/>
                }
            </div>
        </div>
    )
}

export default OpenTickets
