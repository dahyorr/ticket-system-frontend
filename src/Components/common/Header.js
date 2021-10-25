import React,{useState, useContext} from 'react'
import {useAuth} from '../../hooks'
import {FaUser, FaBell} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import {Link, withRouter} from "react-router-dom";
import { Context as TicketContext } from '../../context/TicketContext';

const Header = ({history, location})=> {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const {isSignedIn, signOut } = useAuth()
    const {resetTickets} = useContext(TicketContext)

    const onSignOut = () => {
        resetTickets()
        signOut()
    }

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
                <button><FaBell/></button>
                <button onClick={() =>setDropdownOpen(!dropdownOpen)}><FaUser/></button>
                {dropdownOpen?(<div className="dropdown" onClick={(e) => {e.stopPropagation(); setDropdownOpen(false)}}>
                    {/* <Link to="#" className="dropdown-item">Settings</Link> */}

                    <Link to="#" onClick={onSignOut} className="dropdown-item">Sign out</Link>
                </div>): null}
                </>
            </div>: null}
            
        </div>
    )
}

export default withRouter(Header)