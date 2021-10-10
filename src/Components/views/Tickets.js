import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

function Tickets({fetchTickets, tickets, error, history}) {

    console.log(tickets)

    return (
        <div className="Tickets">
            <div className="container">
                <button onClick={() => history.push('/tickets/create')}>New Ticket</button>
                <div className="tickets-list">
                    <div className="header">
                        <h1>All Tickets</h1>
                    </div>
                    <div className="list">

                {tickets.map(ticket => 
                    <Link to={`/tickets/${ticket.id}`} className='list-item'>
                        <p className='title'>{ticket.title}</p>
                        <p className='date'>{new Date(ticket.created_date).toLocaleDateString()}</p>
                        {ticket.status? <p className='text-green status'>Open</p>: <p className='status'>Open</p> }
                    </Link>)}                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({tickets}) =>({
    tickets: tickets.tickets,
    error: tickets.error
})

export default connect(mapStateToProps)(withRouter(Tickets))
