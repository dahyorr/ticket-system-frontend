import {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import { fetchSingleTicket } from '../../api/ticketApi'
import Loader from '../common/Loader'

function TicketView({match: {params}}) {
    const id = parseInt(params.id)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{      
        (async () => {
            const res = await fetchSingleTicket(id)
            if (res.status === 'success'){
                setData(res.data)
            }
            else toast.error(res.error)
            setLoading(false)
        })()
    }, [id])

    console.log(data)

    if(loading) return <Loader/>

    else return (
        <div className="TicketView">
            <div className="container">
                <div className="platform">
                    {!data
                    ?<h3> Could not fetch Data</h3>
                    :(
                    <div className={'content'}>    
                        <h2>{data.title}</h2>
                        <div className="message">
                            {data.opening_text}
                        </div>
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default TicketView
