import {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import { fetchSingleTicket, fetchQueues, createReply, updateTicketStatus } from '../../api/ticketApi'
import Loader from '../common/Loader'
import MessageDisplay from '../common/MessageDisplay'
import MessageReply from '../common/MessageReply'

function TicketView({match: {params}}) {
    const id = parseInt(params.id)

    const [data, setData] = useState(null)
    const [edit, setEdit] = useState(false)
    const [queues, setQueues] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectValues, setSelectValues] = useState({})

    useEffect(() =>{      
        (async () => {
            const res = await fetchSingleTicket(id)
            const resQueue = await fetchQueues()
            if (resQueue.status === 'success'){
                setQueues(resQueue.data)
            }
            if (res.status === 'success'){
                res.data.created_date = new Date(res.data.created_date)
                res.data.queue = resQueue.data.find(queue => res.data.queue === queue.id)
                setData(res.data)
            }
            else toast.error(res.error)
            setLoading(false)
        })()
    }, [id, edit])

    const onChange = (e) =>{
        setSelectValues(prev =>{
            const data = {...prev}
            if(e.target.name === 'queue'){
                data[e.target.name] =  parseInt(e.target.value)
            }
            else{
                data[e.target.name] = e.target.value
            }
            return data
        })
    }

    const handleSetReply = () => {
        setSelectValues({
            queue: data.queue.id,
            priority: data.priority,
            status: data.status,
        })
        setEdit(true)
    }
    
    const handleReply = async (value) => {
        setLoading(true)
        const res = await createReply({
            ticket: data.id,
            message: value,
        })
        setLoading(false)
        if(res.status === 'success'){
            toast.success('Reply Added Successfully')
            setEdit(false)
        }
        else{
            toast.error('An error occured')
        }
        // console.log(selectValues)
    }

    const changeTicketStatus = async () => {
        setLoading(true)
        const newStatus = data.status.toLowerCase() === 'open'
        ? 2 
        : 1
        const res = await updateTicketStatus(data.id, newStatus)
        if(res.status === 'success'){
            toast.success('Ticket status Updated')  
            setData(prev => ({
                ...res.data, 
                queue: prev.queue, 
                created_date: prev.created_date
            }))
        }
        else{
            toast.error('An error occured')
        }
        setLoading(false)
    }

    const displayMeta = () => {
        if(edit) return(
            <div className="meta">
                <p className={'created-by'}>{data.owner}</p>
                <p className={'date-created'}>{`${data.created_date.toLocaleString()}`}</p>
                <div className="edit-form">Queue: 
                    <select name="queue" id="queue" value={selectValues['queue']} onChange={onChange}>
                        <option value=''></option>
                        {queues.map(queue => 
                        (<option value={queue.id} key={queue.id}>{queue.title}</option>)
                        )}
                    </select>
                </div>
                <p className={'status'}>{data.status}</p>
                <div className="edit-form">Priority: 
                    <select name="priority" id="priority" onChange={onChange}>
                        <option value='Critical'>Critical</option>
                        <option value='High'>High</option>
                        <option value='Normal'>Normal</option>
                        <option value='Low'>Low</option>
                        <option value='Very Low'>Very Low</option>
                    </select>
                </div>
            </div>
        )
        return(
            <div className="meta">
                <p className={'created-by'}>{data.owner}</p>
                <p className={'date-created'}>{`${data.created_date.toLocaleString()}`}</p>
                {data.queue && <p className={'queue'}>{data.queue.title}</p>}
                <p className={'status'}>{data.status}</p>
                <p className={'priority'}>{data.priority}</p>
            </div>
        )
    }

    if(loading) return <Loader/>

    else return (
        <div className="TicketView">
            <div className="container">
                <div className="platform">
                    {!data
                    ?<h3> Could not fetch Data</h3>
                    :(
                    <div className={'content'}>    
                        <h2 className={'title'}>{data.title}</h2>
                        {displayMeta()}
                        <div className="message-list">
                            <MessageDisplay author={data.owner} message={data.opening_text} date={data.created_date}/>
                            {data.replies && data.replies.map(reply => <MessageDisplay 
                            author={reply.author} 
                            message={reply.message} 
                            key={reply.date}
                            date={reply.date}
                            reply/>)}
                            
                        </div>
                        

                        <div>
                            {!edit && <>
                                <button className='btn btn-dark' onClick={handleSetReply}>Add Reply</button>
                                <button className='btn btn-dark' onClick={changeTicketStatus}>
                                    {data.status.toLowerCase() === 'open'
                                    ?'Close Ticket'
                                    :'Re-open Ticket'
                                }
                                </button>
                            </>}
                        </div>


                        {edit && <MessageReply onCancel={() => setEdit(false)} handleReply={handleReply}/>}
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default TicketView
