import React from 'react'
import {connect} from 'react-redux'
import {Transition} from "@headlessui/react";
import signOut from "../../Actions/signOut";
import {Link} from "react-router-dom";
import RenderPermission from "./RenderPermission";


class Header extends React.Component{
    menuRef = React.createRef()
    dropdownRef = React.createRef()
    state = {menuOpen: false, dropdownOpen: false }
    componentDidMount() {
        document.addEventListener("mouseup", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleClickOutside);
    }
    handleClickOutside = (event)=>{
        if(this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)){
            this.setState({dropdownOpen: false})
        }
        if(this.menuRef.current && !this.menuRef.current.contains(event.target)){
            this.setState({menuOpen: false})
        }
    }
    openMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen})
    }
    openDropdown = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    renderLinks = (title, to) =>{
            if (this.props.page === title) {
                return <Link to={to}
                             className="block bg-steel-dark text-white px-3 py-2 rounded-md text-sm font-medium">{title}</Link>
            } else {
                return <Link to={to}
                             className="block text-space hover:bg-steel hover:text-white px-3 py-2 rounded-md text-sm font-medium">{title}</Link>
            }
    }
    renderUser = () =>{
        if(this.props.isSignedIn){
            return(
                <>
                <button
                    className="bg-steel-dark p-1 rounded-full text-steel hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </button>
            <div ref={this.dropdownRef} className="ml-3 relative">
                <div>
                    <button
                        className="bg-steel-dark p-1 rounded-full text-steel hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white flex items-center"
                        id="user-menu" aria-haspopup="true" onClick={this.openDropdown}>
                        <span className="sr-only">Open user menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={'currentColor'}
                             className={'h-6 w-6 rounded-full'} stroke={'currentColor'}>
                            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                        </svg>
                    </button>
                </div>

            <Transition
             show={this.state.dropdownOpen}
             enter="transition ease-out duration-100 "
             enterFrom="transform opacity-0 scale-95"
             enterTo="transform opacity-100 scale-100"
             leave="transition ease-in duration-75 "
             leaveFrom="transform opacity-100 scale-100"
             leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 `}
                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem">{this.props.auth.email}</p>

                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                       role="menuitem">Your Profile</Link>

                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                       role="menuitem">Settings</Link>

                    <Link to={'#'} onClick={this.props.signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                       role="menuitem">Sign out</Link>
                </div>
                </Transition>
            </div></>
            )
        }
        else{
            return(<>
                {this.renderLinks('Login', '/login')}
                {this.renderLinks('Register', '/register')}
                </>
            )
        }
    }

    renderUserMobile = () =>{
        if(this.props.isSignedIn){
            return(
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={'currentColor'}
                                 className={'h-6 w-6 rounded-full'} stroke={'currentColor'}>
                                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                            </svg>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-steel-dark ">{this.props.auth.email}</div>
                        </div>
                        <button
                            className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Link to="#"
                              className="block px-3 py-2 rounded-md text-base font-medium text-steel-dark hover:text-white hover:bg-steel">Your
                            Profile</Link>

                        <Link to="#"
                              className="block px-3 py-2 rounded-md text-base font-medium text-steel-dark hover:text-white hover:bg-steel">Settings</Link>

                        <Link to="#" onClick={this.props.signOut}
                              className="block px-3 py-2 rounded-md text-base font-medium text-steel-dark hover:text-white hover:bg-steel">Sign
                            out</Link>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="pt-4 pb-3 border-t border-gray-700">
                    {this.renderLinks('Login', '/login')}
                    {this.renderLinks('Register', '/register')}
            </div>
            )
        }
    }

    render() {
        return(
            <div className="Header">
                <nav className="bg-peach mb-2">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={this.menuRef}>
                        <div className="navContent flex items-center justify-between h-16">

                            <div className=" logo flex items-center">
                                <div className="flex-shrink-0">
                                    <Link to={'/'} className={'logo text-space text-4xl font-bold font-dancingScript hover:text-space-dark'}>Ticketrr</Link>
                                </div>

                                <div className=" hidden md:block">
                                    <div className="navButtons ml-10 flex items-baseline space-x-4">
                                        <RenderPermission>
                                        {this.renderLinks('Dashboard', '/')}
                                        {this.renderLinks('Tickets', '/')}
                                        {this.renderLinks('Created Tickets', '/')}
                                        {this.renderLinks('Users And Groups', '/')}
                                        </RenderPermission>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    {this.renderUser()}
                                </div>
                            </div>


                            <div className="-mr-2 flex md:hidden" >
                                {/*Mobile menu button*/}
                                <div >
                                <button type="button" onClick={this.openMenu}
                                        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>

                                    <svg className={`${this.state.menuOpen ? "hidden":"block"} block h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>

                                    <svg className={`${this.state.menuOpen ? "block":"hidden"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </div>

                    {/*Mobile menu, show/hide based on menu state.*/}
                    <Transition
                        show={this.state.menuOpen}
                        enter="transition ease-out duration-100 "
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75 "
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                    <div  className={`md:hidden block`} id="mobile-menu">
                        <div  className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <RenderPermission>
                                {this.renderLinks('Dashboard', '/')}
                                {this.renderLinks('Tickets', '/')}
                                {this.renderLinks('Created Tickets', '/')}
                                {this.renderLinks('Users And Groups', '/')}
                            </RenderPermission>
                        </div>
                        {this.renderUserMobile()}
                    </div>
                    </Transition>

                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        auth: state.auth,
        isSignedIn: state.auth.isSignedIn,
        page: state.page
    }
}
export default connect(mapStateToProps, {signOut})(Header)