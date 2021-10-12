const TicketList = () => {
    return (
        <div className="TicketsList">
            <div className="header">
                <h1>All Tickets</h1>
            </div>
            <div className="list">

        {/* {tickets.map(ticket => 
            <Link to={`/tickets/${ticket.id}`} className='list-item'>
                <p className='title'>{ticket.title}</p>
                <p className='date'>{new Date(ticket.created_date).toLocaleDateString()}</p>
                {ticket.status? <p className='text-green status'>Open</p>: <p className='status'>Open</p> }
            </Link>)}                         */}
            </div>
        </div>
    )
}

export default TicketList
