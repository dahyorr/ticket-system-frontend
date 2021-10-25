import NewTicketForm from "../forms/NewTicketForm"
import { useEffect, useState } from "react"
import { fetchQueues, fetchAuthorizedUserList } from "../../api/ticketApi"
import { toast } from "react-toastify"
import Loader from '../common/Loader';
import { createTicket } from '../../api/ticketApi'

const NewTicket = ({history}) => {
    
    const [queueList, setQueueList] = useState([])
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const resQueue = await fetchQueues()
            const resUser = await fetchAuthorizedUserList()
            if (resQueue.status === 'success' && resUser.status === 'success'){
                setQueueList(resQueue.data)
                setUserList(resUser.data.filter((user) => user.is_authorized))
            }
            else{
                toast.error("An Error Occured")
            }
            setLoading(false)
        })()
    }, [])

    const onCreateTicket = async (data) => {
        const res = await createTicket(data);
        if(res.status === 'success'){
            toast.success('Ticket Created Successfully')
            history.push(`/tickets/${res.data.id}`)
        }
        else{
            toast.error('An error occured')
        }
    }
    
    if (loading) return <Loader/>
    else return(
        <div>
            <NewTicketForm queueList={queueList} userList={userList} onFormSubmit={onCreateTicket}/>
        </div>
    )
}
export default NewTicket