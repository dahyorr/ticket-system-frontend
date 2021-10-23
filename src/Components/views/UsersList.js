import { useState, useEffect } from 'react'
import Loader from '../common/Loader';
import { fetchUserList } from '../../api/ticketApi';
import UserTable from '../common/UserTable';
import {toast} from 'react-toastify'

const UsersList = ({history}) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() =>{
        (async () => {
            const res = await fetchUserList()
            if (res.status === 'success'){
                setData(res.data)
            }
            else{
                toast.error(res.error.message)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <div className="Tickets">
            <div className="container">
                {loading
                ?<Loader/>
                :<UserTable data={data} title={"Users"}/>
                }
            </div>
        </div>
    )
}

export default UsersList
