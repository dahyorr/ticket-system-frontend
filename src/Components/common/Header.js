import React,{useState, useContext, useEffect, useRef} from 'react'
import {useAuth} from '../../hooks'
import {FaUser, FaBell} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import {Link, withRouter} from "react-router-dom";
import { Context as TicketContext } from '../../context/TicketContext';
import Notification from './Notification'

const Header = ({history, location})=> {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef('dropdown')
    const notificationRef = useRef('notification')
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [notifications, setNotifications] = useState([])
    const {isSignedIn, signOut, user } = useAuth()
    const {resetTickets} = useContext(TicketContext)

    const onSignOut = () => {
        resetTickets()
        signOut()
    }

    const dropdownMenu =  (
        <div className="dropdown" onClick={(e) => {e.stopPropagation()}} ref={dropdownRef}>
            {/* <Link to="#" className="dropdown-item">Settings</Link> */}
            {user && <div className="dropdown-item fixed">{user.email}</div>}
            <Link to="#" onClick={onSignOut} className="dropdown-item">Sign out</Link>
        </div>)

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
            if (notificationOpen && notificationRef.current && !notificationRef.current.contains(e.target)) {
                setNotificationOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [dropdownOpen, notificationOpen])

    return(
        <div className={'Header flex'}>
            
            <div className="nav">
                <div className="logo">
                    <h1>Ticketrr</h1>
                </div>
            </div>
            {isSignedIn ? <div className="user" >
                <>
                {location.pathname !== '/tickets/create' &&<button onClick={() => history.push('/tickets/create')}><GoPlus/></button>}
                <button 
                    onClick={() => setNotificationOpen(!notificationOpen)}
                >
                    <FaBell/>
                </button>
                {notificationOpen && <Notification el={notificationRef} notifications={notifications} setNotifications={setNotifications}/>}
                <button 
                    onClick={() =>setDropdownOpen(!dropdownOpen)}
                >
                    <FaUser/>
                </button>
                {dropdownOpen
                ?dropdownMenu
                : null}
                </>
            </div>: null}
            
        </div>
    )
}

export default withRouter(Header)