import React,{useState} from 'react'
import {useAuth} from '../../hooks'
import {FaUser, FaBell} from 'react-icons/fa'
import {Link, withRouter} from "react-router-dom";

const Header = ({location: {pathname}})=> {
    // const menuRef = useRef('menu')
    // const dropdownRef = useRef('dropdown')
    // const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const {isSignedIn, signOut } = useAuth()
    
    // const renderedNavLinks = (links) => links.map((link, index) =>(
    //     <li key={index}>
    //         <Link to={link.path} className={`nav-item ${pathname === link.path? 'active': ''}`}>{link.title}</Link>
    //     </li>
    // ))

    return(
        <div className={'Header flex'}>
            
            <div className="nav">
                <div className="logo">
                    <h1>Ticketrr</h1>
                </div>
                <ul>
                    {/* { isSignedIn ? renderedNavLinks(
                        [
                            {title: 'DashBoard', path:'/'},
                            {title: 'Tickets', path:'/'},
                            {title: 'Created Tickets', path:'/'},
                            {title: 'Users And Groups', path:'/'},

                        ]
                    ): null} */}
                </ul>
            </div>
            {isSignedIn ? <div className="user" >
                <>
                <button><FaBell/></button>
                <button onClick={() =>setDropdownOpen(!dropdownOpen)}><FaUser/></button>
                {dropdownOpen?(<div className="dropdown" onClick={(e) => {e.stopPropagation(); setDropdownOpen(false)}}>
                    <Link to="#" className="dropdown-item">Your Profile</Link>

                    <Link to="#" className="dropdown-item">Settings</Link>

                    <Link to="#" onClick={signOut} className="dropdown-item">Sign out</Link>
                </div>): null}
                </>
            </div>: null}
            
        </div>
    )
}

export default withRouter(Header)