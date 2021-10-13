import { useContext, useEffect } from 'react'
import { Context as TicketContext } from '../../context/TicketContext';
import Loader from '../common/Loader';
import TicketsTable from '../common/TicketsTable';

function Tickets({history}) {

    const {userTickets,  loading, fetchUserTickets} = useContext(TicketContext)

    useEffect(() =>{
        fetchUserTickets()
    }, [fetchUserTickets])

    return (
        <div className="Tickets">
            <div className="container">
                {loading
                ?<Loader/>
                :<TicketsTable data={userTickets} onRefresh={fetchUserTickets} onAdd={() => history.push('/tickets/create')} title={"My Created Tickets"}/>
                }
            </div>
        </div>
    )
}

export default Tickets
