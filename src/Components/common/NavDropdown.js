import React from 'react'
import {useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom";

const NavDropdown = () =>{
    const [dropdownOpen, setDropdownOpen]  = useState(false)
    const dropdownRef = useRef()

    return(
        <div ref={this.dropdownRef}
             className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 ${this.state.dropdownOpen ? "block":"hidden"}`}
             role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem">{this.props.auth.email}</p>

            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">Your Profile</Link>

            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">Settings</Link>

            <Link to={'#'} onClick={this.props.signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">Sign out</Link>
        </div>
    )
}
export default NavDropdown