import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { fetchUserNotifications } from "../../api/ticketApi"

const NotificationItem = ({data}) => {
    const date = new Date(data.date)
    return (
        <div className={'NotificationItem'}>
            <div className={'pointer'}></div>
            <div className="content">
                <p>{data.content}</p>
                <small>{date.toUTCString()}</small>
            </div>
        </div>
    )
}

const Notification = ({el, notifications, setNotifications, ...props}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await fetchUserNotifications()
            if(res.status === 'success'){
                console.log(res.data)
                setNotifications(res.data)
            }
            else{
                toast.error(res.error)
            }
            setLoading(false)
        })()
    }, [setNotifications])

    console.log(notifications)
    return (
        <div  {...props} className='Notification' ref={el}>
            {
                loading && notifications.length < 1
                ?<p>loading...</p>

                : notifications.length > 0
                ? notifications.map((data) => <NotificationItem data={data}/>)

                :<p className="no-notification">No Notifications available</p>
            }
            
        </div>
    )
}

export default Notification
