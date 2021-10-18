import {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import { fetchSingleTicket, fetchQueues } from '../../api/ticketApi'
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
            if (res.status === 'success'){
                res.data.created_date = new Date(res.data.created_date)
                setData(res.data)
            }
            if (resQueue.status === 'success'){
                setQueues(resQueue.data)
            }
            else toast.error(res.error)
            setLoading(false)
        })()
    }, [id, edit])

    // console.log(data)
    // console.log(queues)

    const onChange = (e) =>{
        setSelectValues(prev =>{
            const data = {...prev}
            data[e.target.name] = e.target.value
            return data
        })
    }

    const handleSetReply = () => {
        setSelectValues({
            queue: data.queue,
            priority: data.priority,
            status: data.status,
        })
        setEdit(true)
    }
    
    const handleReply = (value) => {
        console.log(value)
        console.log(selectValues)
        setEdit(false)
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
                        (<option value={queue.title} key={queue.id}>{queue.title}</option>)
                        )}
                    </select>
                </div>
                <div className="edit-form">Status:
                    <select name="status" id="status" onChange={onChange}>
                        <option value='Open'>Open</option>
                        <option value='Closed'>Closed</option>
                    </select>
                </div>
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
                <p className={'queue'}>{data.queue}</p>
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
                            <MessageDisplay author={data.owner} message={data.opening_text}/>
                            <MessageDisplay reply/>
                        </div>
                        

                        <div>
                            {!edit && <button className='btn btn-dark' onClick={handleSetReply}>Add Reply</button>}
                        </div>


                        {edit && <MessageReply handleReply={handleReply}/>}
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default TicketView
