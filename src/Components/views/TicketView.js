import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

function TicketView({match: {params: {id}}, tickets, error}) {
    if(tickets.length > 0){  
        const data = tickets.filter(ticket => parseInt(id, 10) === ticket.id)[0]
        return (
            <div className="TicketView">
                <div className="container">
                    {data.title}
                </div>
            </div>
        )
    }
    else return null
}

const mapStateToProps = ({tickets}) =>({
    tickets: tickets.tickets,
    error: tickets.error
})

export default connect(mapStateToProps)(withRouter(TicketView))
