function TicketView({match: {params: {id}}, tickets}) {
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

export default TicketView
