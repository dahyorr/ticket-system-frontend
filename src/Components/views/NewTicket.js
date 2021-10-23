import NewTicketForm from "../forms/NewTicketForm"
import { useEffect, useState } from "react"
import { fetchQueues, fetchUserList } from "../../api/ticketApi"
import { toast } from "react-toastify"
import Loader from '../common/Loader';

const NewTicket = () => {
    
    const [queueList, setQueueList] = useState([])
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const resQueue = await fetchQueues()
            const resUser = await fetchUserList()
            if (resQueue.status === 'success' && resUser.status === 'success'){
                setQueueList(resQueue.data)
                setUserList(resUser.data)
            }
            else{
                toast.error("An Error Occured")
            }
            setLoading(false)
        })()
    }, [])
    
    if (loading) return <Loader/>
    else return(
        <div>
            <NewTicketForm queueList={queueList} userList={userList}/>
        </div>
    )
}
export default NewTicket